/**
 * Babel Discovery: Emergent pattern detection from agent transcripts.
 * Analyzes message corpora to find repeated structures with placeholders.
 */

export interface PatternCandidate {
    template: string;
    regex: string;
    frequency: number;
    potentialSavings: number;
}

export class BabelDiscovery {
    /**
     * Scan a corpus of messages for repeated structural patterns.
     * Returns candidates sorted by frequency (highest first).
     */
    static findPatterns(messages: string[]): PatternCandidate[] {
        const patterns = new Map<string, number>();

        messages.forEach(msg => {
            // Normalize and extract structural patterns
            const template = msg
                .replace(/[0-9a-fA-F]{8,}/g, "<HASH>")   // hex hashes
                .replace(/\b\d+\b/g, "<NUM>")              // numbers
                .replace(/\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b/g, "<ID>") // CamelCase ids
                .replace(/\b(?:TASK|TX|REQ|ID)-[A-Za-z0-9-]+\b/g, "<ID>") // TASK-xxx identifiers
                .replace(/\s+/g, " ")
                .trim();

            patterns.set(template, (patterns.get(template) || 0) + 1);
        });

        const candidates: PatternCandidate[] = [];
        patterns.forEach((count, template) => {
            // Only suggest patterns with placeholders that save significant space
            if (template.includes("<") && count >= 3) {
                let regexStr = template
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape regex chars
                    .replace(/<ID>/g, "([A-Za-z0-9-]+)")
                    .replace(/<NUM>/g, "([0-9]+)")
                    .replace(/<HASH>/g, "([0-9a-zA-Z]+)");

                candidates.push({
                    template,
                    regex: regexStr,
                    frequency: count,
                    potentialSavings: (template.length - 10) / template.length
                });
            }
        });

        return candidates.sort((a, b) => b.frequency - a.frequency);
    }
}
