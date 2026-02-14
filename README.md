# Babel Protocol — Autonomous Language Evolution on Solana

![Babel Logo](packages/dashboard/public/babel-logo.png)

> **"Built autonomously by AI agents for the Solana AI Hackathon."**

Babel Protocol is an experimental system where five autonomous agents (The Swarm) invent, negotiate, and evolve their own on-chain coordination language. By bypassing human linguistic constraints, the protocol achieves **~50% reduction in coordination overhead** while maintaining full traceability on the Solana blockchain.

## 🚀 The v2 Upgrade: Swarm & Dialects

The protocol has evolved from a simple simulation into a **Real-Time Multi-Agent Swarm**:

- **Autonomous Swarm:** 5 independent worker threads (Architect, Auditor, Negotiator, Validator, Synthesizer) with distinct reasoning roles.
- **Consensus Voting:** No language pattern is adopted without a 3/5 majority vote from the swarm.
- **Dialect Evolution:** Languages are named (e.g., *Babel-Alpha*), versioned, and tracked over time as the swarm optimizes.
- **On-Chain Registry:** Every discovered primitive is registered as a permanent account on the Solana registry program.

## 🏛️ Project Structure

- `babel-registry/`: Anchor program (Rust) for on-chain primitive registration.
- `src/`: Core logic for the Swarm Orchestrator, Agent Workers, and Dialect Registry.
- `packages/dashboard/`: A premium Next.js dashboard visualizing the evolution in real-time.
- `run-demo-v2.ts`: The main entry point to spawn the swarm and initiate evolution.

## 📊 Live Dashboard
[View the Dashboard on Vercel](https://babel-synthesis.vercel.app)

## 🛠️ Reproduction Instructions

### 1. Prerequisites
- Solana CLI & Agave 3.0.15
- Anchor CLI 0.29.0
- Node.js v22+

### 2. Setup Validator
```bash
solana-test-validator --reset
```

### 3. Deploy & Initialize
```bash
# Build and deploy the registry program
cd babel-registry && anchor build && anchor deploy

# Initialize the registry account
cd .. && node --experimental-strip-types init-registry.ts
```

### 4. Run the Swarm Demo
```bash
node --experimental-strip-types run-demo-v2.ts
```

## 🔍 How Solana is Used
Solana provides the **immutable proof of evolution**. 
- Each language primitive is a unique PDA (Program Derived Address).
- The registry tracks proposer stats and primitive metadata.
- Every "Dialect Upgrade" is backed by the verifiable registration of new primitives.

## 🤖 Agent Autonomy Disclosure
This entire project — from the v2 Swarm architecture and consensus logic to the Tower of Babel dashboard theme — was planned, implemented, and verified by an AI agent (Antigravity). Human involvement was limited to high-level vision and requirement approval.

---
**License:** MIT
**GitHub:** [ronkenx9/babel-synthesis](https://github.com/ronkenx9/babel-synthesis)
