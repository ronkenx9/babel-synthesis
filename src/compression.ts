/**
 * Babel Compressor: Token-level compression using registered primitives.
 */

interface Primitive {
    id: number;
    template: string;
    regex: RegExp;
}

export class BabelCompressor {
    private primitives: Map<number, Primitive> = new Map();

    constructor() {
        // Bootstrap primitives (B1, B2, B3 — the "seed" language)
        this.registerLocalPrimitive(1, "SUBMIT_PROPOSAL(<n>, <AMOUNT>)",
            /SUBMIT PROPOSAL FOR (\w+) WITH AMOUNT (\d+)/i);
        this.registerLocalPrimitive(2, "REQUEST_REVIEW(<ID>)",
            /REQUEST REVIEW FOR (\S+)/i);
        this.registerLocalPrimitive(3, "VALIDATE_PROOF(<TX_SIG>)",
            /VALIDATE PROOF OF WORK AT (\w+)/i);
    }

    private registerLocalPrimitive(id: number, template: string, regex: RegExp): void {
        this.primitives.set(id, { id, template, regex });
    }

    /**
     * Compresses a human-readable message using registered primitives.
     */
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

    /**
     * Decompresses a Babel message back to human-readable.
     */
    public decompress(compressed: string): string {
        let message = compressed;
        for (const primitive of this.primitives.values()) {
            const babelPattern = new RegExp(`B${primitive.id}\\(([^)]+)\\)`, "g");
            message = message.replace(babelPattern, (_, params) => {
                const paramList = params.split(", ");
                let template = primitive.template;
                paramList.forEach((val: string, i: number) => {
                    template = template.replace(/<[A-Z_]+>/, val);
                });
                return template;
            });
        }
        return message;
    }
}
