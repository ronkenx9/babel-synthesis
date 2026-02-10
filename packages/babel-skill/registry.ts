import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { readFileSync, existsSync } from "fs";

export class BabelRegistryClient {
    private connection: Connection;
    private program: anchor.Program | null = null;
    private provider: anchor.AnchorProvider | null = null;

    constructor(rpcUrl: string = "http://127.0.0.1:8899", walletPath: string = "~/.config/solana/id.json") {
        this.connection = new Connection(rpcUrl, "confirmed");
        const actualWalletPath = walletPath.replace(/^~/, process.env.HOME || "");

        if (existsSync(actualWalletPath)) {
            const walletData = JSON.parse(readFileSync(actualWalletPath, "utf-8"));
            const keypair = Keypair.fromSecretKey(new Uint8Array(walletData));
            const wallet = new anchor.Wallet(keypair);

            this.provider = new anchor.AnchorProvider(this.connection, wallet, {
                commitment: "confirmed",
            });

            const idlPath = "/home/tega/babel-synthesis/babel-registry/target/idl/babel_registry.json";
            if (existsSync(idlPath)) {
                const idl = JSON.parse(readFileSync(idlPath, "utf-8"));
                this.program = new anchor.Program(idl, this.provider);
            }
        }
    }

    public async registerPrimitive(id: number, template: string, description: string): Promise<void> {
        if (!this.program || !this.provider) {
            console.log(`[Babel-Sim] Registering Primitive ${id}: ${template}`);
            return;
        }

        try {
            const [registryPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("registry")],
                this.program.programId
            );

            const [primitivePDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("primitive"), Buffer.from(new Uint8Array(new Uint16Array([id]).buffer))],
                this.program.programId
            );

            const [proposerStatsPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposer"), this.provider.publicKey.toBuffer()],
                this.program.programId
            );

            await this.program.methods
                .registerPrimitive(id, template, description)
                .accounts({
                    primitive: primitivePDA,
                    registry: registryPDA,
                    proposerStats: proposerStatsPDA,
                    proposer: this.provider.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .rpc();

            console.log(`[Babel-OnChain] Registered Primitive ${id}`);
        } catch (e) {
            console.error("[Babel] Registry Error:", e);
        }
    }
}
