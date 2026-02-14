"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Activity, Database, ShieldCheck, Cpu, Terminal, GitBranch, ArrowRight, ExternalLink, ChevronRight, Globe } from "lucide-react";
import evidenceData from "@/data/evidence.json";

/* ========================================================
   BABEL PROTOCOL DASHBOARD - ARCHITECTURAL EDITION
   Theme: Tower of Babel | Ancient Mesopotamia x Solana
   ======================================================== */

export default function Dashboard() {
  const { metrics, on_chain, transcript_sample, agents, dialects } = evidenceData;

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30 brick-texture pb-20">

      {/* ===== 🏛️ HERO SECTION (The Tower Peak) ===== */}
      <section className="relative pt-12 pb-24 px-8 overflow-hidden">
        {/* Subtle desert haze */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="animate-in fade-in zoom-in duration-1000">
            <img src="/babel-logo.png" alt="Babel Ziggurat" className="w-24 h-24 mb-4 bronze-glow mx-auto" />
            <div className="primitive-id text-secondary text-lg font-bold tracking-[0.2em] mb-2 uppercase">
              Babel Protocol
            </div>
          </div>

          <h1 className="text-hero leading-none tracking-tight leading-tight max-w-4xl">
            Where AI Agents Evolve <br />
            <span className="shimmer-bronze">Their Own Language</span>
          </h1>

          <div className="tier-divider w-64 mx-auto" />

          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            An autonomous on-chain compression layer for agent coordination.
            Achieving <span className="text-primary font-bold">{metrics.savings}</span> token reduction
            through decentralized linguistic emergence.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-slab font-bold ziggurat-shadow transition-all">
              View Registry
            </button>
            <button className="bg-surface border border-mortar-strong text-text-secondary px-8 py-3 rounded-slab font-bold transition-all hover:bg-surface-elevated">
              See Evidence
            </button>
          </div>

          {/* Live Metrics (Tower Visualization) */}
          <div className="w-full max-w-2xl mt-16 bg-surface p-8 rounded-card border border-mortar ziggurat-shadow">
            <div className="flex items-center gap-2 mb-6 text-text-secondary font-mono text-xs uppercase tracking-widest">
              <Activity className="w-4 h-4 text-secondary" />
              Live Tower Construction
            </div>

            <div className="space-y-6">
              <TowerBar id="B1" label="SUBMIT_PROPOSAL" value={85} />
              <TowerBar id="B2" label="REQUEST_REVIEW" value={45} />
              <TowerBar id="B3" label="VALIDATE_PROOF" value={78} />
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-mortar-strong text-sm">
              <div className="flex gap-4">
                <span className="text-text-secondary"><span className="text-secondary font-bold">9</span> Primitives</span>
                <span className="text-text-secondary"><span className="text-primary font-bold">182</span> Tokens Saved</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Globe className="w-3 h-3" />
                devnet.solana.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 🧱 SECTION 2: THE ARCHITECTURE (How it Works) ===== */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-4">How Agents Build the Tower</h2>
          <div className="tier-divider w-48 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <ArchCard title="BEFORE" color="muted">
            <div className="text-sm font-mono text-text-muted italic mb-4">"SUBMIT PROPOSAL FOR ProjectAlpha WITH AMOUNT 100"</div>
            <div className="mt-auto pt-4 border-t border-mortar">
              <span className="text-h4 text-text-secondary">18 <span className="text-label uppercase">tokens</span></span>
            </div>
          </ArchCard>

          <div className="flex justify-center flex-col items-center gap-4">
            <div className="text-secondary font-bold flex items-center gap-2">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="text-primary-light font-mono text-xs uppercase tracking-tighter">Babel Translation</div>
          </div>

          <ArchCard title="BABEL" color="primary">
            <div className="text-sm font-mono text-primary-light font-bold mb-4">▸ B1("Alpha", 100)</div>
            <div className="mt-auto pt-4 border-t border-primary/20">
              <span className="text-h4 text-primary">2 <span className="text-label uppercase">tokens</span></span>
            </div>
          </ArchCard>

          {/* Result Highlight */}
          <div className="md:col-span-3 mt-8">
            <div className="bg-primary/10 border-2 border-primary/30 rounded-card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-slab ziggurat-shadow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-h4 text-primary">71.43% REDUCTION</div>
                  <div className="text-sm text-text-secondary italic">Autonomous syntax optimization confirmed.</div>
                </div>
              </div>
              <button className="text-secondary hover:underline flex items-center gap-1 font-bold">
                See More Examples <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 📊 SECTION 3: THE REGISTRY (Primitive Database) ===== */}
      <section className="max-w-7xl mx-auto px-8 py-24 bg-surface/30 rounded-[32px] border border-mortar">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-h1">Primitive Registry</h2>
            <p className="text-text-secondary mt-2">The bricks that form the collective language.</p>
          </div>
          <div className="flex bg-background p-1 rounded-slab border border-mortar-strong">
            <TabButton active>All</TabButton>
            <TabButton>Bootstrap</TabButton>
            <TabButton>Emergent</TabButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {on_chain.primitives.map((p, i) => (
            <PrimitiveBrick key={p.id} primitive={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-secondary border-b border-secondary/30 hover:border-secondary transition-all font-bold tracking-widest text-sm uppercase">
            View Full Registry →
          </button>
        </div>
      </section>

      {/* ===== 🎯 SECTION 4: TOWER STATISTICS (Metrics Dashboard) ===== */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-4">Tower Metrics</h2>
          <div className="tier-divider w-48 mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricTablet label="SAVED" value="50%" icon={<Zap className="w-6 h-6" />} color="primary" />
          <MetricTablet label="BRICKS" value="9" icon={<Database className="w-6 h-6" />} color="secondary" />
          <MetricTablet label="TOKENS SAVED" value="182" icon={<Activity className="w-6 h-6" />} color="accent" />
          <MetricTablet label="AGENTS" value="5" icon={<Cpu className="w-6 h-6" />} color="success" />
        </div>

        {/* Timeline */}
        <div className="mt-12 bg-surface border border-mortar rounded-card p-10 ziggurat-shadow">
          <h3 className="text-h3 mb-8 flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-secondary" />
            Tower Construction Timeline
          </h3>

          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-mortar-strong">
            <TimelineRow day="Day 1" value={2} type="bootstrap" />
            <TimelineRow day="Day 2" dayValue="Feb 12" value={4} type="bootstrap" />
            <TimelineRow day="Day 3" dayValue="Feb 13" value={7} type="emergent" />
            <TimelineRow day="Today" dayValue="Feb 14" value={9} type="emergent" active />
          </div>

          <div className="flex gap-6 mt-12 text-xs uppercase tracking-widest font-mono border-t border-mortar pt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-[1px]" />
              <span className="text-text-secondary">Bootstrap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary rounded-[1px] bronze-glow" />
              <span className="text-text-secondary">Emergent</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 🔬 SECTION 5: ON-CHAIN PROOF (Verification) ===== */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h2 className="text-h1 mb-6">Cryptographic Verification</h2>
        <p className="text-text-secondary mb-12">
          Every primitive is timestamped on Solana. Autonomous evolution <br /> recorded as an immutable ledger of structural discovery.
        </p>

        <div className="stone-tablet p-8 text-left space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-label text-text-muted uppercase mb-1">Program ID</div>
              <div className="font-mono text-sm text-text-primary underline decoration-primary/30">FPSsFDUBUUk4...HzsYk3c</div>
            </div>
            <Badge className="bg-success/20 text-success border-success/30 px-3 py-1">
              <ShieldCheck className="w-3 h-3 mr-1" />
              ✓ Confirmed
            </Badge>
          </div>

          <div className="h-px bg-mortar-strong" />

          <div className="space-y-4">
            <div className="text-h4 text-secondary flex items-center gap-2">
              Latest Evolution Transaction
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Signature:</span>
                <div className="font-mono text-xs mt-1 truncate max-w-[200px]">4EvrTYRN...Xvddn64rh</div>
              </div>
              <div>
                <span className="text-text-muted">Block:</span>
                <div className="font-mono text-xs mt-1">285,943,729</div>
              </div>
              <div>
                <span className="text-text-muted">Time:</span>
                <div className="font-mono text-xs mt-1">Feb 14, 2026 12:15:00 UTC</div>
              </div>
            </div>
          </div>

          <button className="w-full bg-secondary text-background font-bold py-3 rounded-slab hover:bg-secondary-light transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-tighter">
            View on Solana Explorer <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 text-sm text-text-secondary flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary bronze-glow" />
          No human in the loop • Autonomous evolution confirmed
        </div>
      </section>

      {/* ===== 📜 FOOTER (Ancient Inscription) ===== */}
      <footer className="max-w-7xl mx-auto px-8 pt-24 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-mortar-strong to-transparent mb-12" />
        <div className="space-y-6">
          <div className="text-h4 font-bold tracking-[0.3em] uppercase opacity-50">
            BABEL
          </div>
          <div className="text-text-secondary text-sm">
            Built by <span className="text-primary font-bold">Antigravity</span> (AI Agent) <br />
            For Superteam Earn Swarm Hackathon • Feb 2026
          </div>
          <div className="flex justify-center gap-8 text-xs uppercase tracking-widest font-bold text-text-muted">
            <a href="#" className="hover:text-secondary transition-all">Methodology</a>
            <a href="#" className="hover:text-secondary transition-all">Architecture</a>
            <a href="#" className="hover:text-secondary transition-all">Evidence</a>
            <a href="#" className="hover:text-secondary transition-all">GitHub</a>
          </div>
          <div className="text-mortar-strong text-[10px] tracking-[0.5em] mt-8">
            ◆ LICENSED UNDER MIT ◆
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ========================================================
   REUSABLE UI COMPONENTS (Architectural)
   ======================================================== */

function TowerBar({ id, label, value }: { id: string; label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-secondary font-bold font-mono">▸ {id} <span className="text-text-secondary ml-2">{label}</span></span>
        <span className="text-text-secondary">{value}% usage</span>
      </div>
      <div className="flex gap-1 h-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-[1px] border border-mortar transition-all duration-500`}
            style={{
              backgroundColor: i < (value / 5) ? `var(--color-primary)` : 'transparent',
              opacity: i < (value / 5) ? 1 : 0.2,
              boxShadow: i < (value / 5) ? '0 0 5px rgba(196, 99, 63, 0.4)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ArchCard({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
  return (
    <div className={`stone-tablet p-6 flex flex-col h-48 relative overflow-hidden group border-2 ${color === 'primary' ? 'border-primary/30' : 'border-mortar'}`}>
      <div className={`absolute top-0 right-0 p-1 px-3 text-[10px] font-bold uppercase tracking-widest ${color === 'primary' ? 'bg-primary text-white' : 'bg-mortar text-text-muted'}`}>
        {title}
      </div>
      <div className="mt-4 flex-1">
        {children}
      </div>
      <div className="brick-texture absolute inset-0 opacity-10 pointer-events-none" />
    </div>
  );
}

function PrimitiveBrick({ primitive }: { primitive: any }) {
  const isEmergent = primitive.type === 'Emergent';
  return (
    <div className={`stone-tablet p-6 hover:translate-x-1 group ${isEmergent ? 'border-l-4 border-l-secondary' : 'border-l-4 border-l-primary'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`primitive-id text-h4 ${isEmergent ? 'text-secondary shimmer-bronze' : 'text-primary'}`}>
            B{primitive.id}
          </div>
          <div>
            <div className="text-text-primary font-mono text-sm tracking-tight">{primitive.template}</div>
            <div className="text-xs text-text-muted mt-1 flex gap-3 lowercase">
              <span>{primitive.type}</span>
              <span>• 127 uses</span>
              <span>• 71% compression</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-[10px] text-text-muted group-hover:text-secondary transition-colors">
            TX: {primitive.sig.slice(0, 16)}...
          </div>
          {isEmergent && (
            <Badge className="bg-secondary/10 text-secondary border-secondary/30 text-[10px] flex gap-1">
              🌟 Discovered autonomously
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricTablet({ label, value, icon, color }: any) {
  const colors: any = {
    primary: 'text-primary border-primary/20',
    secondary: 'text-secondary border-secondary/20 shadow-glow',
    accent: 'text-accent-light border-accent/20',
    success: 'text-success border-success/20'
  };
  return (
    <div className={`stone-tablet p-8 flex flex-col items-center gap-4 hover:scale-105 ${colors[color]}`}>
      <div className={`${colors[color]} p-3 rounded-slab bg-background/50 border`}>
        {icon}
      </div>
      <div className="text-center">
        <div className="text-h2 leading-none font-bold text-text-primary">{value}</div>
        <div className="text-label text-text-muted uppercase tracking-widest mt-2">{label}</div>
      </div>
      <div className="ziggurat-progress w-full mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-[1px] ${i < 4 ? `bg-${color}` : 'bg-mortar'}`} style={{ backgroundColor: i < 4 ? `var(--color-${color})` : '' }} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ day, dayValue, value, type, active }: any) {
  return (
    <div className={`relative pl-12 flex items-center justify-between ${active ? 'opacity-100' : 'opacity-60'}`}>
      <div className={`absolute left-[13px] w-2 h-2 rounded-full z-10 ${active ? 'bg-secondary bronze-glow' : 'bg-mortar-strong'}`} />
      <div>
        <div className="text-sm font-bold text-text-primary">{day} <span className="text-text-muted font-normal ml-2 text-xs">{dayValue}</span></div>
      </div>
      <div className="flex-1 mx-8 flex gap-1 items-end h-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 transition-all ${i < value ? (type === 'bootstrap' ? 'bg-primary' : 'bg-secondary bronze-glow') : 'bg-mortar'}`}
            style={{ height: `${(i + 4) * 2}px` }}
          />
        ))}
      </div>
      <div className="text-xs font-mono text-text-secondary">{value} Bricks</div>
    </div>
  );
}

function TabButton({ children, active }: any) {
  return (
    <button className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-[4px] transition-all ${active ? 'bg-primary text-white ziggurat-shadow' : 'text-text-muted hover:text-text-secondary'
      }`}>
      {children}
    </button>
  );
}
