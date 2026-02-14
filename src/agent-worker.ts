/**
 * Babel Agent Worker: Each agent runs as an independent thread.
 * 
 * Communication:
 * - Receives messages from the orchestrator via parentPort.
 * - Compresses them using its own BabelCompressor instance.
 * - Sends results back.
 * - Votes on discovered patterns.
 */
import { parentPort, workerData } from "worker_threads";

// Simple inline compressor (each agent has its own instance)
class AgentCompressor {
    private primitives: Map<number, { id: number; template: string; regex: RegExp }> = new Map();

    constructor() {
        // Bootstrap primitives (shared across all agents at genesis)
        this.register(1, "SUBMIT_PROPOSAL(<n>, <AMOUNT>)",
            /SUBMIT PROPOSAL FOR (\w+) WITH AMOUNT (\d+)/i);
        this.register(2, "REQUEST_REVIEW(<ID>)",
            /REQUEST REVIEW FOR (\S+)/i);
        this.register(3, "VALIDATE_PROOF(<TX_SIG>)",
            /VALIDATE PROOF OF WORK AT (\w+)/i);
    }

    private register(id: number, template: string, regex: RegExp) {
        this.primitives.set(id, { id, template, regex });
    }

    public adoptPrimitive(id: number, template: string, regex: RegExp) {
        this.primitives.set(id, { id, template, regex });
    }

    public compress(message: string): string {
        let compressed = message;
        for (const primitive of this.primitives.values()) {
            const match = compressed.match(primitive.regex);
            if (match) {
                const params = match.slice(1).join(", ");
                compressed = compressed.replace(primitive.regex, `B${primitive.id}(${params})`);
            }
        }
        return compressed;
    }

    public estimateTokens(text: string): number {
        return text.split(/\s+/).length;
    }
}

// ---- Worker Entry Point ----
const agentId: number = workerData.agentId;
const agentName: string = workerData.agentName;
const compressor = new AgentCompressor();

parentPort?.on("message", (msg: any) => {
    switch (msg.type) {
        case "compress": {
            const original = msg.payload;
            const compressed = compressor.compress(original);
            const originalTokens = compressor.estimateTokens(original);
            const compressedTokens = compressor.estimateTokens(compressed);

            parentPort?.postMessage({
                type: "compressed",
                agentId,
                agentName,
                step: msg.step,
                original,
                compressed,
                originalTokens,
                compressedTokens,
            });
            break;
        }

        case "vote_pattern": {
            // Each agent votes on whether to adopt a discovered pattern.
            // Simple heuristic: adopt if frequency > 4 and savings > 40%
            const accept = msg.payload.frequency > 4 || msg.payload.potentialSavings > 0.4;
            parentPort?.postMessage({
                type: "vote_result",
                agentId,
                agentName,
                patternTemplate: msg.payload.template,
                accept,
            });
            break;
        }

        case "adopt_primitive": {
            // Orchestrator tells this agent to add a new primitive
            const { id, template } = msg.payload;
            // Build a simple regex from the template
            let regexStr = template
                .replace(/</g, "(?:")
                .replace(/>/g, ")");
            // Fallback: just match the literal words
            try {
                compressor.adoptPrimitive(id, template, new RegExp(regexStr, "i"));
            } catch {
                // If regex fails, use a basic matcher
            }
            parentPort?.postMessage({ type: "adopted", agentId, primitiveId: id });
            break;
        }

        case "shutdown": {
            process.exit(0);
        }
    }
});

// Signal ready
parentPort?.postMessage({ type: "ready", agentId, agentName });
