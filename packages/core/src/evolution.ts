/**
 * The Babel Synthesis: Brain Orchestrator
 * 
 * This module simulates the evolution of agent-to-agent coordination.
 * It measures the "Token Density" of tasks before and after compression.
 */

interface BabelPrimitive {
    id: number;
    template: string;
    usage: number;
}

class EvolutionEngine {
    private registry: Map<number, BabelPrimitive> = new Map();
    private nextId: number = 0x10; // Start with some hex range for IDs

    constructor() {
        // Pre-seed with some basic "Registry" patterns
        this.seedInitialPatterns();
    }

    private seedInitialPatterns() {
        this.register(0x01, "SOL_TRANSFER:{A}->{B}:VAL:{V}");
        this.register(0x02, "JUP_SWAP:{A}->{B}:AMT:{V}");
    }

    public register(id: number, template: string) {
        this.registry.set(id, { id, template, usage: 0 });
        console.log(`[Babel Brain] Registry Evolved: New Primitive registered at 0x${id.toString(16)}`);
    }

    /**
     * Simulates a "Natural Language" intent from an agent.
     */
    public simulateIntent(intent: string): { original: string, compressed: string, savings: number } {
        const originalTokens = intent.split(' ').length * 1.5; // Roughly 1.5 tokens per word

        let compressed = intent;

        // Simple regex-based replacement for demo purposes
        this.registry.forEach((prim, id) => {
            const pattern = this.getSearchPatternForTemplate(prim.template);
            if (pattern.test(intent)) {
                compressed = `BABEL(0x${id.toString(16)})`;
                prim.usage++;
            }
        });

        const compressedTokens = compressed.startsWith("BABEL") ? 4 : originalTokens; // A Babel call is fixed small token count
        const savings = ((originalTokens - compressedTokens) / originalTokens) * 100;

        return {
            original: intent,
            compressed,
            savings: Math.max(0, parseFloat(savings.toFixed(2)))
        };
    }

    private getSearchPatternForTemplate(template: string): RegExp {
        // Very naive: just check if the "Verb" matches. In a real system, this would be LLM-backed.
        if (template.includes("SOL_TRANSFER")) return /transfer.*sol/i;
        if (template.includes("JUP_SWAP")) return /swap.*jupiter/i;
        return /nothing-matches/;
    }

    /**
     * The "Discovery" phase where the brain finds a NEW recurring pattern and stabilizes it.
     */
    public discoverNewPrimitive(tasks: string[]): string | null {
        // Logic to find common patterns in a list of tasks
        // For the demo, we assume the agent found a "Stake" pattern
        const stakePattern = "DRIFT_STAKE:USDC:AMT:{V}";
        this.register(++this.nextId, stakePattern);
        return stakePattern;
    }

    public getStats() {
        return Array.from(this.registry.values()).map(p => ({
            id: `0x${p.id.toString(16)}`,
            pattern: p.template,
            usage: p.usage
        }));
    }
}

// --- Example Execution Loop ---

const engine = new EvolutionEngine();

console.log("--- Phase 1: Baseline Communication ---");
const task1 = "I need to transfer 5 SOL from my wallet to your treasury";
const res1 = engine.simulateIntent(task1);
console.log(`Intent: "${res1.original}"`);
console.log(`Compressed: ${res1.compressed} | Savings: ${res1.savings}%`);

console.log("\n--- Phase 2: Agent Discovery ---");
console.log("Agent observed recurring stake pattern in Drift protocol...");
engine.discoverNewPrimitive(["Stake 100 USDC in Drift", "I want to stake my USDC balance"]);

console.log("\n--- Phase 3: Optimized Coordination ---");
const task2 = "Stake 100 USDC in Drift";
const res2 = engine.simulateIntent(task2); // Note: Simple regex might miss this without better patterns
// In a real demo, we'd show the LLM recognizing the new Babel ID.
console.log(`Intent: "${task2}" -> ${res2.compressed} | Savings: ${res2.savings}%`);

console.log("\n--- Final Registry State ---");
console.table(engine.getStats());
