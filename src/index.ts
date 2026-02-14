import { BabelCompressor } from "./compression.ts";
import { BabelRegistryClient, RegistrationResult } from "./registry.ts";
import { BabelDiscovery } from "./discovery.ts";

export default class BabelSkill {
    private compressor: BabelCompressor;
    private registry: BabelRegistryClient;
    private transcripts: string[] = [];

    constructor() {
        this.compressor = new BabelCompressor();
        this.registry = new BabelRegistryClient();
    }

    public async preMessageHook(message: string): Promise<string> {
        this.transcripts.push(message);
        return this.compressor.compress(message);
    }

    public decompress(compressed: string): string {
        return this.compressor.decompress(compressed);
    }

    public getTranscripts(): string[] {
        return this.transcripts;
    }

    /**
     * Evolves the agent's language by discovering and registering new patterns.
     * Returns structured results: how many succeeded vs failed on-chain.
     */
    public async evolveLinguistics(): Promise<{ succeeded: number; failed: number; results: RegistrationResult[] }> {
        console.log(`[Babel] Analyzing ${this.transcripts.length} messages for emergence...`);
        const candidates = BabelDiscovery.findPatterns(this.transcripts);

        let succeeded = 0;
        let failed = 0;
        const results: RegistrationResult[] = [];

        for (const candidate of candidates) {
            if (candidate.frequency >= 3 && candidate.potentialSavings > 0.3) {
                const newId = Math.floor(Math.random() * 900) + 101;
                console.log(`[Babel] Discovering pattern: "${candidate.template}" (Freq: ${candidate.frequency})`);

                const result = await this.registry.registerPrimitive(newId, candidate.template, "Evolved pattern");
                results.push(result);

                if (result.success) {
                    succeeded++;
                    const sigPreview = result.sig ? result.sig.substring(0, 12) + "..." : "sim";
                    console.log(`  ✓ On-chain: ${sigPreview}`);
                } else {
                    failed++;
                    console.log(`  ✗ Failed: ${result.error}`);
                }
            }
        }

        console.log(`[Babel] Evolution complete. ${succeeded} registered, ${failed} failed.`);
        return { succeeded, failed, results };
    }
}
