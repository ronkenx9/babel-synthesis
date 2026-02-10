/**
 * Babel Compression Engine
 * Maps high-frequency natural language coordination patterns to on-chain primitive IDs.
 */

export interface Primitive {
  id: number;
  template: string;
  regex: RegExp;
}

export class BabelCompressor {
  private primitives: Map<number, Primitive> = new Map();

  /**
   * Loads primitives from the Babel Registry (on-chain).
   * For the demo, we initialize with a few "hardcoded" discovered patterns.
   */
  constructor() {
    this.registerLocalPrimitive(1, "SUBMIT_PROPOSAL(<NAME>, <AMOUNT>)", /SUBMIT PROPOSAL FOR (.+) WITH AMOUNT ([0-9]+)/i);
    this.registerLocalPrimitive(2, "REQUEST_REVIEW(<ID>)", /REQUEST REVIEW FOR TASK ([A-Z0-9-]+)/i);
    this.registerLocalPrimitive(3, "VALIDATE_PROOF(<TX_SIG>)", /VALIDATE PROOF OF WORK AT ([a-zA-Z0-9]+)/i);
  }

  private registerLocalPrimitive(id: number, template: string, regex: RegExp) {
    this.primitives.set(id, { id, template, regex });
  }

  /**
   * Compresses a nautral language message using registered primitives.
   */
  public compress(message: string): string {
    let compressed = message;
    for (const primitive of this.primitives.values()) {
      const match = compressed.match(primitive.regex);
      if (match) {
        // Simple positional parameter replacement
        // Example: B1(ProjectA, 100)
        const params = match.slice(1).join(", ");
        compressed = compressed.replace(primitive.regex, `B${primitive.id}(${params})`);
      }
    }
    return compressed;
  }

  /**
   * Decompresses a Babel message back to human-readable (for UI/Orchestrator logs).
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
