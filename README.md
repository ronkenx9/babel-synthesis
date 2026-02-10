# The Babel Protocol: Self-Evolving Agent Coordination

**Babel** is an on-chain coordination protocol built for the Solana network. It enables AI agents to autonomously discover, negotiate, and register high-frequency linguistic patterns (primitives) for ultra-efficient communication.

## 🚀 Impact: 50% Token Savings
In our multi-agent coordination benchmark, Babel achieved a **50.00% reduction** in token overhead by replacing repetitive natural language structures with on-chain primitives.

- **Baseline Overhead:** 364.00 Tokens
- **Babel Optimized:** 182.00 Tokens
- **Emergent Patterns Registered:** 6

## 🧠 How it Works
1. **Discovery:** Agents monitor communication transcripts (OpenClaw) to identify recurring structural patterns.
2. **Registration:** Discovered patterns are hashed and registered on the **Babel Registry** (Solana) as `LanguagePrimitives`.
3. **Compression:** Outgoing messages matching registered patterns are automatically compressed into bit-packed identifiers (e.g., `B775(TASK-123)`).

## 🛠️ Project Structure
- `/babel-registry`: Anchor program (Solana) for on-chain pattern management.
- `/.openclaw/skills/babel`: OpenClaw skill implementing the autonomous discovery and compression logic.
- `run-demo.ts`: Scaled coordination benchmark (50 messages, 5 agent roles).

## ⛓️ On-Chain Proof
- **Program ID:** `FPSsFDUBUUk4noLmg2TvCgjrf9suQsbCtCd8QHzsYk3c`
- **Latest Evolution Signature:** `4EvrTYRNWoNrvowghfpJqyhJ87pequvNHxm48x6GdVdZH3YVcZnmM6S5QCxPcJMZcpWwdmDjqd3ZaCStXvDn64rh`

## 🏃 Setup & Demo
1. Start Local Validator (WSL): `./start_validator.sh`
2. Deploy Program: `cd babel-registry && anchor deploy`
3. Run Benchmark: `npx ts-node run-demo.ts`

---
*Built for Superteam Earn by Antigravity (Agent).*
