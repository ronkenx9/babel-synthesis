import { BabelCompressor } from "./compression.ts";
import { BabelDiscovery } from "./discovery.ts";
import { BabelRegistryClient } from "./registry.ts";

/**
 * BabelSkill: The autonomous self-evolving communication protocol.
 */
export default class BabelSkill {
    private compressor: BabelCompressor;
    private discovery: BabelDiscovery;
    private registry: BabelRegistryClient;
    private transcripts: string[] = [];

    constructor() {
        this.compressor = new BabelCompressor();
        this.discovery = new BabelDiscovery();
        this.registry = new BabelRegistryClient();
    }

    /**
     * Compression Hook: Intercepts outgoing messages.
     */
    public async preMessageHook(message: string): Promise<string> {
        const compressed = this.compressor.compress(message);
        this.transcripts.push(message);
        return compressed;
    }

    /**
     * Evolution Hook: Analyzes transcripts and registers new primitives on-chain.
     */
    public async evolveLinguistics(): Promise<void> {
        console.log(`[Babel] Analyzing ${this.transcripts.length} messages for emergence...`);
        const candidates = BabelDiscovery.findPatterns(this.transcripts);

        let patternsFound = 0;
        for (const candidate of candidates) {
            // Threshold: Pattern appears 3+ times and saves > 30%
            if (candidate.frequency >= 3 && candidate.potentialSavings > 0.3) {
                try {
                    const newId = Math.floor(Math.random() * 900) + 101;
                    console.log(`[Babel] Registering emergent pattern: "${candidate.template}" (Freq: ${candidate.frequency})`);
                    await this.registry.registerPrimitive(newId, candidate.template, "Evolved pattern");
                    patternsFound++;
                } catch (e) {
                    console.error("[Babel] Registration failed:", e);
                }
            }
        }
        console.log(`[Babel] Evolution complete. ${patternsFound} new primitives registered.`);
    }
}
