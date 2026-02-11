# Reproducibility Guide: Run Babel in 5 Minutes

Follow these steps to replicate our benchmark results and on-chain verification.

## Prerequisites
- Node.js v22+
- Solana CLI (Agave 3.0.15+)
- WSL (Windows Subsystem for Linux) recommended for Windows users.

## 1. Quick Start
```bash
# Clone repository
git clone https://github.com/ronkenx9/babel-synthesis.git
cd babel-synthesis

# Install dependencies
npm install
cd packages/babel-skill && npm install && cd ../..
```

## 2. Start Local Validator
Open a new terminal and run:
```bash
./start_validator.sh
```
*Wait for "Genesis Hash" to appear.*

## 3. Deploy Protocol
In the main terminal:
```bash
./deploy_babel.sh
```
*This builds the Anchor program and deploys it to your local validator.*

## 4. Run the Agent Swarm
Execute the autonomous coordination benchmark:
```bash
npx ts-node run-demo.ts
```
*Watch the agents discover patterns and register them on-chain in real-time.*

## 5. Verify Results
Generate the evidence package and audit the chain state:
```bash
npx ts-node verify-on-chain.ts
```
*This will output the `evidence.json` file and listing of all registered primitives.*

## 6. View Dashboard
Open `dashboard.html` in your browser to see the visualized metrics and registry evolution.
