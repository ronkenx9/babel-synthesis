export interface PatternCandidate {
    template: string;
    regex: string;
    frequency: number;
    potentialSavings: number;
}

export class BabelDiscovery {
    /**
     * Discovers linguistic patterns in a set of messages.
     * Replaces dynamic IDs, amounts, and hashes with placeholders.
     */
    public static findPatterns(messages: string[]): PatternCandidate[] {
        const patterns = new Map<string, number>();

        messages.forEach(msg => {
            // Abstraction Logic:
            // 1. Project Names/IDs (ProjectAlpha, TASK-123)
            // 2. Numbers (100, 250)
            // 3. Hashes/Public Keys (5fG7h9j2kL8m)
            const template = msg
                .replace(/[A-Z][A-Za-z0-9-]+-[0-9A-Z]+/g, "<ID>") // Matches TASK-123-ABC
                .replace(/[A-Z]{2,}[a-z]*/g, (match) => {
                    // Matches ProjectAlpha, ProjectBeta (if they start with 2+ uppercase or similar)
                    // Actually let's be simpler:
                    if (match.startsWith("Project") || match.startsWith("TASK")) return "<ID>";
                    return match;
                })
                .replace(/[0-9a-zA-Z]{10,}/g, "<HASH>") // Matches hashes
                .replace(/\b[0-9]+\b/g, "<NUM>") // Matches numbers
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
