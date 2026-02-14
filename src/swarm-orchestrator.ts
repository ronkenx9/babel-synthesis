/**
 * Babel Swarm Orchestrator: Coordinates multiple agent Workers.
 * 
 * - Spawns N Worker threads (each running agent-worker.ts).
 * - Distributes coordination messages to agents round-robin.
 * - Aggregates results.
 * - Runs pattern discovery on combined transcripts.
 * - Holds consensus votes among agents (3/5 majority to adopt).
 * - Registers adopted patterns on-chain.
 * - Tracks dialect evolution.
 */
import { Worker } from "worker_threads";
import { BabelRegistryClient } from "./registry.ts";
import { BabelDiscovery } from "./discovery.ts";
import { DialectRegistry } from "./dialect.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AGENT_NAMES = ["Architect", "Auditor", "Negotiator", "Validator", "Synthesizer"];

interface CompressedResult {
    agentId: number;
    agentName: string;
    step: number;
    original: string;
    compressed: string;
    originalTokens: number;
    compressedTokens: number;
}

interface Vote {
    agentId: number;
    agentName: string;
    accept: boolean;
}

export class SwarmOrchestrator {
    private workers: Worker[] = [];
    private registry: BabelRegistryClient;
    private dialectRegistry: DialectRegistry;
    private agentCount: number;
    private readyCount: number = 0;
    private pendingResults: Map<number, CompressedResult[]> = new Map();
    private pendingVotes: Map<string, Vote[]> = new Map();
    private allTranscripts: string[] = [];
    private allResults: CompressedResult[] = [];

    constructor(agentCount: number = 5) {
        this.agentCount = agentCount;
        this.registry = new BabelRegistryClient();
        this.dialectRegistry = new DialectRegistry();
    }

    /**
     * Spawn all agent workers and wait for them to be ready.
     */
    public async spawn(): Promise<void> {
        console.log(`\n[Swarm] Spawning ${this.agentCount} agents...`);

        const workerPath = join(__dirname, "agent-worker.ts");
        const readyPromises: Promise<void>[] = [];

        for (let i = 0; i < this.agentCount; i++) {
            const worker = new Worker(workerPath, {
                workerData: { agentId: i, agentName: AGENT_NAMES[i] },
                execArgv: ["--experimental-strip-types"],
            });

            const readyPromise = new Promise<void>((resolve) => {
                worker.on("message", (msg: any) => {
                    if (msg.type === "ready") {
                        console.log(`  [Agent-${msg.agentId}] ${msg.agentName} online ✓`);
                        resolve();
                    }
                });
            });

            this.workers.push(worker);
            readyPromises.push(readyPromise);
        }

        await Promise.all(readyPromises);
        console.log(`[Swarm] All ${this.agentCount} agents ready.\n`);

        // Create genesis dialect from bootstrap primitives
        this.dialectRegistry.createGenesis([1, 2, 3], 0.5);
    }

    /**
     * Process a single coordination message through the swarm.
     * Assigns to a specific agent (round-robin) and collects the result.
     */
    public async processMessage(step: number, message: string): Promise<CompressedResult> {
        const agentIdx = step % this.agentCount;
        const worker = this.workers[agentIdx];

        this.allTranscripts.push(message);

        return new Promise((resolve) => {
            const handler = (msg: any) => {
                if (msg.type === "compressed" && msg.step === step) {
                    worker.off("message", handler);
                    this.allResults.push(msg);
                    resolve(msg as CompressedResult);
                }
            };
            worker.on("message", handler);
            worker.postMessage({ type: "compress", payload: message, step });
        });
    }

    /**
     * Run the discovery + consensus cycle.
     * 1. Find patterns in aggregated transcripts.
     * 2. Each agent votes on each candidate.
     * 3. Patterns with 3/5 majority get registered on-chain.
     * 4. Adopted patterns are pushed to all agents.
     */
    public async runEvolution(): Promise<{ adopted: number; rejected: number; failed: number }> {
        console.log(`\n=== BABEL EVOLUTION: MULTI-AGENT CONSENSUS ===`);
        console.log(`[Swarm] Analyzing ${this.allTranscripts.length} messages across ${this.agentCount} agents...\n`);

        const candidates = BabelDiscovery.findPatterns(this.allTranscripts);
        let adopted = 0;
        let rejected = 0;
        let failed = 0;
        const adoptedIds: number[] = [];

        for (const candidate of candidates) {
            if (candidate.frequency < 3 || candidate.potentialSavings <= 0.3) continue;

            console.log(`[Discovery] Candidate: "${candidate.template}" (freq: ${candidate.frequency})`);

            // Consensus vote across all agents
            const votes = await this.holdVote(candidate);
            const acceptCount = votes.filter(v => v.accept).length;
            const threshold = Math.ceil(this.agentCount / 2); // Majority

            console.log(`  Votes: ${votes.map(v => `${v.agentName}:${v.accept ? "✓" : "✗"}`).join(" | ")}`);
            console.log(`  Result: ${acceptCount}/${this.agentCount} (need ${threshold}) → ${acceptCount >= threshold ? "ADOPTED" : "REJECTED"}`);

            if (acceptCount >= threshold) {
                // Register on-chain
                const newId = Math.floor(Math.random() * 900) + 101;
                const result = await this.registry.registerPrimitive(newId, candidate.template, `Consensus-adopted (${acceptCount}/${this.agentCount} votes)`);

                if (result.success) {
                    adopted++;
                    adoptedIds.push(newId);
                    const sigPreview = result.sig ? result.sig.substring(0, 16) + "..." : "sim";
                    console.log(`  ✓ On-chain: ${sigPreview}`);

                    // Broadcast to all agents
                    for (const worker of this.workers) {
                        worker.postMessage({ type: "adopt_primitive", payload: { id: newId, template: candidate.template } });
                    }
                } else {
                    failed++;
                    console.log(`  ✗ On-chain failed: ${result.error}`);
                }
            } else {
                rejected++;
            }
            console.log(""); // spacing
        }

        // Evolve the dialect if patterns were adopted
        if (adoptedIds.length > 0) {
            const currentDialect = this.dialectRegistry.getLatest("Babel-Alpha");
            if (currentDialect) {
                const newEfficiency = this.calculateEfficiency();
                this.dialectRegistry.evolve("Babel-Alpha", adoptedIds, newEfficiency);
            }
        }

        console.log(`[Swarm] Evolution complete: ${adopted} adopted, ${rejected} rejected, ${failed} on-chain failures.`);
        return { adopted, rejected, failed };
    }

    /**
     * Hold a vote across all agents for a pattern candidate.
     */
    private async holdVote(candidate: any): Promise<Vote[]> {
        const votes: Vote[] = [];
        const votePromises = this.workers.map((worker, i) => {
            return new Promise<Vote>((resolve) => {
                const handler = (msg: any) => {
                    if (msg.type === "vote_result" && msg.patternTemplate === candidate.template) {
                        worker.off("message", handler);
                        resolve(msg as Vote);
                    }
                };
                worker.on("message", handler);
                worker.postMessage({ type: "vote_pattern", payload: candidate });
            });
        });

        return Promise.all(votePromises);
    }

    /**
     * Calculate overall compression efficiency from collected results.
     */
    private calculateEfficiency(): number {
        if (this.allResults.length === 0) return 0;
        const totalOriginal = this.allResults.reduce((sum, r) => sum + r.originalTokens, 0);
        const totalCompressed = this.allResults.reduce((sum, r) => sum + r.compressedTokens, 0);
        return totalOriginal > 0 ? 1 - (totalCompressed / totalOriginal) : 0;
    }

    /**
     * Get all collected results for evidence export.
     */
    public getResults(): CompressedResult[] {
        return this.allResults;
    }

    /**
     * Get dialect evolution data for evidence export.
     */
    public getDialectEvidence(): object {
        return this.dialectRegistry.toEvidence();
    }

    /**
     * Shutdown all workers.
     */
    public async shutdown(): Promise<void> {
        for (const worker of this.workers) {
            worker.postMessage({ type: "shutdown" });
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`[Swarm] All agents terminated.`);
    }
}
