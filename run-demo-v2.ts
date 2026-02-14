/**
 * Babel Protocol v2: Multi-Agent Coordination Benchmark
 * 
 * 5 independent agent Workers coordinate via the SwarmOrchestrator.
 * Patterns discovered through consensus voting → On-chain registration.
 * Language evolution tracked via named Dialects (Babel-Alpha, Beta, etc.).
 */
import { SwarmOrchestrator } from "./src/swarm-orchestrator.ts";
import { writeFileSync } from "fs";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated multi-agent coordination messages
const coordinationLoop = [
    // Agent coordination scenarios — governance, auditing, validating
    "SUBMIT PROPOSAL FOR ProjectAlpha WITH AMOUNT 100",
    "REQUEST REVIEW FOR TASK-123-ABC",
    "VALIDATE PROOF OF WORK AT 5fG7h9j2kL8m",
    "AUDIT LOGS FOR TRANSACTION TX-999-RE",
    "STAKEHOLDER APPROVAL GRANTED FOR PHASE 1",
    "SUBMIT PROPOSAL FOR ProjectBeta WITH AMOUNT 250",
    "REQUEST REVIEW FOR TASK-456-DEF",
    "VALIDATE PROOF OF WORK AT 8xY3z1w5qR9p",
    "AUDIT LOGS FOR TRANSACTION TX-888-AB",
    "REJECTION: INVALID DATA",
    "SUBMIT PROPOSAL FOR ProjectGamma WITH AMOUNT 500",
    "REQUEST REVIEW FOR TASK-789-GHI",
    "VALIDATE PROOF OF WORK AT 2mN4o6p8sT0u",
    "AUDIT LOGS FOR TRANSACTION TX-777-CD",
    "STAKEHOLDER APPROVAL GRANTED FOR PHASE 2",
    "SUBMIT PROPOSAL FOR ProjectDelta WITH AMOUNT 75",
    "REQUEST REVIEW FOR TASK-321-JKL",
    "VALIDATE PROOF OF WORK AT 9aB1c3d5eF7g",
    "AUDIT LOGS FOR TRANSACTION TX-666-EF",
    "REJECTION: DUPLICATE DATA",
    "SUBMIT PROPOSAL FOR ProjectEpsilon WITH AMOUNT 1000",
    "REQUEST REVIEW FOR TASK-654-MNO",
    "VALIDATE PROOF OF WORK AT 4hI6j8k0lM2n",
    "AUDIT LOGS FOR TRANSACTION TX-555-GH",
    "STAKEHOLDER APPROVAL GRANTED FOR PHASE 3",
    "SUBMIT PROPOSAL FOR ProjectZeta WITH AMOUNT 300",
    "REQUEST REVIEW FOR TASK-987-PQR",
    "VALIDATE PROOF OF WORK AT 7oP9q1r3sT5u",
    "AUDIT LOGS FOR TRANSACTION TX-444-IJ",
    "REJECTION: STALE DATA",
    "SUBMIT PROPOSAL FOR ProjectEta WITH AMOUNT 150",
    "REQUEST REVIEW FOR TASK-246-STU",
    "VALIDATE PROOF OF WORK AT 0vW2x4y6zA8b",
    "AUDIT LOGS FOR TRANSACTION TX-333-KL",
    "STAKEHOLDER APPROVAL GRANTED FOR PHASE 4",
    "SUBMIT PROPOSAL FOR ProjectTheta WITH AMOUNT 800",
    "REQUEST REVIEW FOR TASK-135-VWX",
    "VALIDATE PROOF OF WORK AT 3cD5e7f9gH1i",
    "AUDIT LOGS FOR TRANSACTION TX-222-MN",
    "REJECTION: EXPIRED DATA",
    "SUBMIT PROPOSAL FOR ProjectIota WITH AMOUNT 425",
    "REQUEST REVIEW FOR TASK-864-YZA",
    "VALIDATE PROOF OF WORK AT 6jK8l0m2nO4p",
    "AUDIT LOGS FOR TRANSACTION TX-111-OP",
    "STAKEHOLDER APPROVAL GRANTED FOR PHASE 5",
    "SUBMIT PROPOSAL FOR ProjectKappa WITH AMOUNT 600",
    "REQUEST REVIEW FOR TASK-579-BCD",
    "VALIDATE PROOF OF WORK AT 1qR3s5t7uV9w",
    "AUDIT LOGS FOR TRANSACTION TX-000-QR",
    "REJECTION: CORRUPTED DATA",
];

async function runBenchmark() {
    console.log("╔══════════════════════════════════════════════════════╗");
    console.log("║  BABEL PROTOCOL v2: MULTI-AGENT COORDINATION DEMO  ║");
    console.log("║  Scale: 50 Messages | 5 Agent Threads | On-Chain   ║");
    console.log("╚══════════════════════════════════════════════════════╝\n");

    const swarm = new SwarmOrchestrator(5);

    try {
        // Phase 1: Spawn agents
        await swarm.spawn();

        // Phase 2: Process coordination loop
        console.log("=== PHASE 1: COORDINATION LOOP (Bootstrap Language) ===\n");

        let totalOriginalTokens = 0;
        let totalCompressedTokens = 0;
        const traces: any[] = [];

        for (let i = 0; i < coordinationLoop.length; i++) {
            const step = coordinationLoop[i];
            const result = await swarm.processMessage(i, step);

            totalOriginalTokens += result.originalTokens;
            totalCompressedTokens += result.compressedTokens;

            // Visual output with agent attribution
            if (i % 5 === 0 || i < 5) {
                console.log(`  [${result.agentName}] Step ${i + 1}/${coordinationLoop.length}`);
                console.log(`    IN:  "${step.substring(0, 50)}${step.length > 50 ? '...' : ''}"`);
                console.log(`    OUT: "${result.compressed}"`);
                console.log(`    Tokens: ${result.originalTokens} → ${result.compressedTokens}\n`);
            } else if (i % 10 === 0) {
                console.log(`  [${result.agentName}] [${i + 1}/${coordinationLoop.length}] Processing...\n`);
            }

            traces.push({
                step: i + 1,
                agent: result.agentName,
                original: step,
                compressed: result.compressed,
                originalTokens: result.originalTokens,
                compressedTokens: result.compressedTokens,
            });

            // Visual delay for demo recording
            await sleep(200);
        }

        const bootstrapSavings = ((1 - totalCompressedTokens / totalOriginalTokens) * 100);
        console.log(`\n  Bootstrap Phase Complete: ${bootstrapSavings.toFixed(1)}% savings\n`);

        // Phase 3: Evolution with consensus
        console.log("=== PHASE 2: EMERGENT LANGUAGE EVOLUTION ===");
        const evolution = await swarm.runEvolution();

        // Phase 4: Final metrics
        const finalSavings = ((1 - totalCompressedTokens / totalOriginalTokens) * 100);

        const report = {
            protocol: "Babel Protocol v2",
            methodology: "Multi-Agent Coordination with Consensus Voting",
            agents: 5,
            agent_names: ["Architect", "Auditor", "Negotiator", "Validator", "Synthesizer"],
            metrics: {
                baselineTokens: totalOriginalTokens.toFixed(2),
                compressedTokens: totalCompressedTokens.toFixed(2),
                savings: finalSavings.toFixed(2) + "%",
                messagesProcessed: coordinationLoop.length,
                patternsDiscovered: evolution.adopted + evolution.rejected,
                patternsAdopted: evolution.adopted,
                patternsRejected: evolution.rejected,
                onChainFailures: evolution.failed,
            },
            dialects: swarm.getDialectEvidence(),
            evidence: traces.slice(0, 10),
            timestamp: new Date().toISOString()
        };

        console.log("\n╔══════════════════════════════════════╗");
        console.log("║       FINAL BENCHMARK METRICS        ║");
        console.log("╠══════════════════════════════════════╣");
        console.log(`║  Baseline Tokens:  ${report.metrics.baselineTokens.padStart(16)} ║`);
        console.log(`║  Compressed:       ${report.metrics.compressedTokens.padStart(16)} ║`);
        console.log(`║  Savings:          ${report.metrics.savings.padStart(16)} ║`);
        console.log(`║  Patterns Adopted: ${String(report.metrics.patternsAdopted).padStart(16)} ║`);
        console.log(`║  On-Chain Fails:   ${String(report.metrics.onChainFailures).padStart(16)} ║`);
        console.log("╚══════════════════════════════════════╝");

        writeFileSync("evidence.json", JSON.stringify(report, null, 2));
        console.log("\nEvidence package exported to evidence.json");

        // Cleanup
        await swarm.shutdown();

    } catch (err) {
        console.error("Benchmark Failure:", err);
        await swarm.shutdown();
    }
}

runBenchmark().catch(console.error);
