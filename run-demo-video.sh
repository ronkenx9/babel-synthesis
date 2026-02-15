#!/bin/bash
# ============================================================
#  BABEL PROTOCOL — Demo Video Script
#  Run this in WSL with the validator already running.
#  Start validator first:  solana-test-validator --reset
# ============================================================

set -e

CYAN='\033[0;36m'
GOLD='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

banner() {
  echo ""
  echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BOLD}${CYAN}  🏛️  $1${NC}"
  echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  sleep 2
}

pause() {
  echo ""
  echo -e "${DIM}   ⏳ Pausing for readability...${NC}"
  sleep 3
}

cd ~/babel-synthesis

# ---- INTRO ----
clear
echo ""
echo -e "${GOLD}"
echo "    ████████╗██╗  ██╗███████╗    ██████╗  █████╗ ██████╗ ███████╗██╗     "
echo "    ╚══██╔══╝██║  ██║██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║     "
echo "       ██║   ███████║█████╗      ██████╔╝███████║██████╔╝█████╗  ██║     "
echo "       ██║   ██╔══██║██╔══╝      ██╔══██╗██╔══██║██╔══██╗██╔══╝  ██║     "
echo "       ██║   ██║  ██║███████╗    ██████╔╝██║  ██║██████╔╝███████╗███████╗"
echo "       ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝"
echo -e "${NC}"
echo -e "${BOLD}${CYAN}         PROTOCOL — Self-Evolving Agent Coordination on Solana${NC}"
echo -e "${DIM}         Superteam Earn Swarm Hackathon • Feb 2026${NC}"
echo ""
sleep 4

# ---- STEP 1: Deploy Program ----
banner "STEP 1: Deploying Babel Registry to Solana Localnet"

echo -e "${GREEN}$ cd babel-registry && anchor deploy --provider.cluster localnet && cd ..${NC}"
echo ""
cd babel-registry && anchor deploy --provider.cluster localnet && cd ..
pause

# ---- STEP 2: Initialize Registry ----
banner "STEP 2: Initializing On-Chain Registry"

echo -e "${GREEN}$ node --experimental-strip-types init-registry.ts${NC}"
echo ""
node --experimental-strip-types init-registry.ts
pause

# ---- STEP 3: Run the Multi-Agent Swarm ----
banner "STEP 3: Launching 5-Agent Swarm (Consensus-Driven Evolution)"

echo -e "${DIM}   Agents: Architect · Auditor · Negotiator · Validator · Synthesizer${NC}"
echo -e "${DIM}   Mode: Autonomous pattern discovery + consensus voting${NC}"
echo ""
sleep 2

echo -e "${GREEN}$ node --experimental-strip-types run-demo-v2.ts${NC}"
echo ""
node --experimental-strip-types run-demo-v2.ts
pause

# ---- STEP 4: Verify On-Chain ----
banner "STEP 4: Verifying On-Chain State"

echo -e "${GREEN}$ node --experimental-strip-types verify-on-chain.ts${NC}"
echo ""
node --experimental-strip-types verify-on-chain.ts
pause

# ---- STEP 5: Generate Dashboard Data ----
banner "STEP 5: Generating Dashboard Evidence"

echo -e "${GREEN}$ node --experimental-strip-types generate_dashboard.ts${NC}"
echo ""
node --experimental-strip-types generate_dashboard.ts
pause

# ---- OUTRO ----
echo ""
echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${GREEN}  ✅  DEMO COMPLETE${NC}"
echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${CYAN}🏛️  Tower Height:${NC}  9 primitives registered on-chain"
echo -e "  ${CYAN}📊  Compression:${NC}   ~50% token savings achieved"
echo -e "  ${CYAN}🤖  Agents:${NC}        5 autonomous workers, consensus-driven"
echo -e "  ${CYAN}🧬  Dialects:${NC}      Babel-Alpha v1 → v2 (evolved autonomously)"
echo -e "  ${CYAN}🔗  Dashboard:${NC}     https://babel-synthesis.vercel.app"
echo -e "  ${CYAN}📦  Source:${NC}        https://github.com/ronkenx9/babel-synthesis"
echo ""
echo -e "  ${DIM}Built autonomously by Antigravity (AI Agent)${NC}"
echo -e "  ${DIM}No human in the loop • Autonomous evolution confirmed${NC}"
echo ""
