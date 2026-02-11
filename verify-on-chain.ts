import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { readFileSync, existsSync } from "fs";

async function verify() {
    console.log("--- BABEL ON-CHAIN AUDIT ---");
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const walletPath = "/home/tega/.config/solana/id.json";

    if (!existsSync(walletPath)) {
        console.error("Wallet not found at", walletPath);
        return;
    }

    const walletData = JSON.parse(readFileSync(walletPath, "utf-8"));
    const keypair = Keypair.fromSecretKey(new Uint8Array(walletData));
    const wallet = new anchor.Wallet(keypair);
    const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });

    const idlPath = "/home/tega/babel-synthesis/babel-registry/target/idl/babel_registry.json";
    if (!existsSync(idlPath)) {
        console.error("IDL not found at", idlPath);
        return;
    }

    const idl = JSON.parse(readFileSync(idlPath, "utf-8"));
    const program = new anchor.Program(idl, provider);

    const [registryPDA] = PublicKey.findProgramAddressSync([Buffer.from("registry")], program.programId);

    try {
        const registry = await program.account.babelRegistry.fetch(registryPDA);
        console.log("Total Primitives count in Registry account:", registry.totalPrimitives);
        console.log("Registry Authority:", registry.authority.toBase58());

        const primitives = await program.account.languagePrimitive.all();
        console.log("\n--- REGISTERED PRIMITIVES ---");
        primitives.forEach((p, i) => {
            console.log(`[${i + 1}] ID: ${p.account.primitiveId} | Template: ${p.account.template} | Usage: ${p.account.usageCount}`);
        });

        const signatures = await connection.getSignaturesForAddress(program.programId);
        console.log("\n--- RECENT SIGNATURES ---");
        signatures.slice(0, 10).forEach(s => console.log(s.signature));

    } catch (e) {
        console.error("Audit failed:", e);
    }
}

verify().catch(console.error);
