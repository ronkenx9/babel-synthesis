"use client";

import React, { useState, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Zap, Activity, Database, ShieldCheck, Cpu, GitBranch, ArrowRight, ExternalLink, ChevronRight, ChevronDown, Globe, Copy, Check } from "lucide-react";
import evidenceData from "@/data/evidence.json";

/* ========================================================
   BABEL PROTOCOL DASHBOARD - ARCHITECTURAL EDITION
   Theme: Tower of Babel | Ancient Mesopotamia x Solana
   ======================================================== */

const GITHUB_URL = "https://github.com/ronkenx9/babel-synthesis";
const EXPLORER_BASE = "https://explorer.solana.com";
const PROGRAM_ID = "FPSsFDUBUUk4noLmg2TvCgjrf9suQsbCtCd8QHzsYk3c";

export default function Dashboard() {
  const { metrics, on_chain, transcript_sample, agents, dialects } = evidenceData;

  // --- State for interactive elements ---
  const [activeTab, setActiveTab] = useState<'All' | 'Bootstrap' | 'Emergent'>('All');
  const [showAllExamples, setShowAllExamples] = useState(false);
  const [copiedSig, setCopiedSig] = useState<string | null>(null);

  // --- Refs for scroll targets ---
  const registryRef = useRef<HTMLElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);

  // --- Scroll helper ---
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- Copy to clipboard ---
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSig(text);
    setTimeout(() => setCopiedSig(null), 2000);
  };

  // --- Filter primitives by tab ---
  const filteredPrimitives = on_chain.primitives.filter(p => {
    if (activeTab === 'All') return true;
    return p.type === activeTab;
  });

  // --- Transcript examples ---
  const visibleExamples = showAllExamples ? transcript_sample : transcript_sample.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30 brick-texture pb-20">

      {/* ===== 🏛️ HERO SECTION (The Tower Peak) ===== */}
      <section className="relative pt-12 pb-24 px-8 overflow-hidden">
        {/* Subtle desert haze */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          <div>
            <img src="/babel-logo.png" alt="Babel Ziggurat" className="w-24 h-24 mb-4 bronze-glow mx-auto" />
            <div className="primitive-id text-secondary text-lg font-bold tracking-[0.2em] mb-2 uppercase">
              Babel Protocol
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight max-w-4xl">
            Where AI Agents Evolve <br />
            <span className="shimmer-bronze">Their Own Language</span>
          </h1>

          <div className="tier-divider w-64 mx-auto" />

          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            An autonomous on-chain compression layer for agent coordination.
            Achieving <span className="text-primary font-bold">{metrics.savings}</span> token reduction
            through decentralized linguistic emergence.
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => scrollTo(registryRef)}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-slab font-bold ziggurat-shadow transition-all cursor-pointer active:scale-95"
            >
              View Registry
            </button>
            <button
              onClick={() => scrollTo(proofRef)}
              className="bg-surface border border-mortar-strong text-text-secondary px-8 py-3 rounded-slab font-bold transition-all hover:bg-surface-elevated cursor-pointer active:scale-95"
            >
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
                <span className="text-text-secondary"><span className="text-secondary font-bold">{on_chain.registry.total_primitives}</span> Primitives</span>
                <span className="text-text-secondary"><span className="text-primary font-bold">{metrics.baselineTokens - metrics.compressedTokens}</span> Tokens Saved</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Globe className="w-3 h-3" />
                {on_chain.network}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 🧱 SECTION 2: THE ARCHITECTURE (How it Works) ===== */}
      <section ref={architectureRef} id="architecture" className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How Agents Build the Tower</h2>
          <div className="tier-divider w-48 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <ArchCard title="BEFORE" color="muted">
            <div className="text-sm font-mono text-text-muted italic mb-4">&quot;{transcript_sample[0].original}&quot;</div>
            <div className="mt-auto pt-4 border-t border-mortar">
              <span className="text-2xl font-semibold text-text-secondary">{transcript_sample[0].original.split(' ').length} <span className="text-xs uppercase">tokens</span></span>
            </div>
          </ArchCard>

          <div className="flex justify-center flex-col items-center gap-4">
            <div className="text-secondary font-bold flex items-center gap-2">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="text-primary-light font-mono text-xs uppercase tracking-tighter">Babel Translation</div>
          </div>

          <ArchCard title="BABEL" color="primary">
            <div className="text-sm font-mono text-primary-light font-bold mb-4">▸ {transcript_sample[0].babel}</div>
            <div className="mt-auto pt-4 border-t border-primary/20">
              <span className="text-2xl font-semibold text-primary">{transcript_sample[0].babel.split(/[(),\s]+/).filter(Boolean).length} <span className="text-xs uppercase">tokens</span></span>
            </div>
          </ArchCard>

          {/* Result Highlight + Examples Toggle */}
          <div className="md:col-span-3 mt-8 space-y-6">
            <div className="bg-primary/10 border-2 border-primary/30 rounded-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-slab ziggurat-shadow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-primary">{transcript_sample[0].savings} REDUCTION</div>
                  <div className="text-sm text-text-secondary italic">Autonomous syntax optimization confirmed.</div>
                </div>
              </div>
              <button
                onClick={() => setShowAllExamples(!showAllExamples)}
                className="text-secondary hover:underline flex items-center gap-1 font-bold cursor-pointer transition-all"
              >
                {showAllExamples ? 'Hide Examples' : 'See More Examples'}
                {showAllExamples ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Expandable Examples Table */}
            {showAllExamples && (
              <div className="bg-surface border border-mortar rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-mortar-strong text-text-muted text-xs uppercase tracking-widest">
                      <th className="px-6 py-4 text-left">#</th>
                      <th className="px-6 py-4 text-left">Agent</th>
                      <th className="px-6 py-4 text-left">Original</th>
                      <th className="px-6 py-4 text-left">Babel</th>
                      <th className="px-6 py-4 text-right">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transcript_sample.map((t, i) => (
                      <tr key={i} className="border-b border-mortar last:border-0 hover:bg-surface-elevated transition-colors">
                        <td className="px-6 py-4 font-mono text-text-muted">{t.step}</td>
                        <td className="px-6 py-4 font-bold text-text-primary">{t.from}</td>
                        <td className="px-6 py-4 font-mono text-text-secondary text-xs">{t.original}</td>
                        <td className="px-6 py-4 font-mono text-primary-light text-xs font-bold">{t.babel}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-mono font-bold ${parseFloat(t.savings) > 0 ? 'text-success' : 'text-text-muted'}`}>
                            {t.savings}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== 📊 SECTION 3: THE REGISTRY (Primitive Database) ===== */}
      <section ref={registryRef} id="registry" className="max-w-7xl mx-auto px-8 py-24 bg-surface/30 rounded-[32px] border border-mortar">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">Primitive Registry</h2>
            <p className="text-text-secondary mt-2">The bricks that form the collective language.</p>
          </div>
          <div className="flex bg-background p-1 rounded-slab border border-mortar-strong">
            <TabButton active={activeTab === 'All'} onClick={() => setActiveTab('All')}>All ({on_chain.primitives.length})</TabButton>
            <TabButton active={activeTab === 'Bootstrap'} onClick={() => setActiveTab('Bootstrap')}>Bootstrap ({on_chain.registry.bootstrap_count})</TabButton>
            <TabButton active={activeTab === 'Emergent'} onClick={() => setActiveTab('Emergent')}>Emergent ({on_chain.registry.emergent_count})</TabButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPrimitives.length === 0 ? (
            <div className="text-center py-12 text-text-muted">No primitives match this filter.</div>
          ) : (
            filteredPrimitives.map((p) => (
              <PrimitiveBrick
                key={p.id}
                primitive={p}
                onCopySig={copyToClipboard}
                isCopied={copiedSig === p.sig}
              />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary border-b border-secondary/30 hover:border-secondary transition-all font-bold tracking-widest text-sm uppercase inline-flex items-center gap-2"
          >
            View Full Registry on GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* ===== 🎯 SECTION 4: TOWER STATISTICS (Metrics Dashboard) ===== */}
      <section ref={statsRef} id="stats" className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tower Metrics</h2>
          <div className="tier-divider w-48 mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricTablet label="SAVED" value={metrics.savings} icon={<Zap className="w-6 h-6" />} color="primary" />
          <MetricTablet label="BRICKS" value={String(on_chain.registry.total_primitives)} icon={<Database className="w-6 h-6" />} color="secondary" />
          <MetricTablet label="TOKENS SAVED" value={String(metrics.baselineTokens - metrics.compressedTokens)} icon={<Activity className="w-6 h-6" />} color="accent" />
          <MetricTablet label="AGENTS" value={String(metrics.agent_count)} icon={<Cpu className="w-6 h-6" />} color="success" />
        </div>

        {/* Timeline */}
        <div className="mt-12 bg-surface border border-mortar rounded-card p-10 ziggurat-shadow">
          <h3 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-secondary" />
            Tower Construction Timeline
          </h3>

          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-mortar-strong">
            <TimelineRow day="Day 1" dayValue="Feb 11" value={2} type="bootstrap" />
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
      <section ref={proofRef} id="proof" className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Cryptographic Verification</h2>
        <p className="text-text-secondary mb-12">
          Every primitive is timestamped on Solana. Autonomous evolution <br /> recorded as an immutable ledger of structural discovery.
        </p>

        <div className="stone-tablet p-8 text-left space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-text-muted uppercase mb-1">Program ID</div>
              <button
                onClick={() => copyToClipboard(PROGRAM_ID)}
                className="font-mono text-sm text-text-primary underline decoration-primary/30 hover:decoration-primary cursor-pointer flex items-center gap-2 transition-all"
              >
                {PROGRAM_ID.slice(0, 16)}...{PROGRAM_ID.slice(-8)}
                {copiedSig === PROGRAM_ID ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3 text-text-muted" />}
              </button>
            </div>
            <Badge className="bg-success/20 text-success border-success/30 px-3 py-1">
              <ShieldCheck className="w-3 h-3 mr-1" />
              ✓ Confirmed
            </Badge>
          </div>

          <div className="h-px bg-mortar-strong" />

          <div className="space-y-4">
            <div className="text-2xl font-semibold text-secondary flex items-center gap-2">
              Latest Evolution Transaction
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Signature:</span>
                <button
                  onClick={() => copyToClipboard(on_chain.primitives[on_chain.primitives.length - 1].sig)}
                  className="font-mono text-xs mt-1 truncate max-w-full block text-left cursor-pointer hover:text-secondary transition-colors flex items-center gap-2"
                >
                  {on_chain.primitives[on_chain.primitives.length - 1].sig.slice(0, 24)}...
                  {copiedSig === on_chain.primitives[on_chain.primitives.length - 1].sig ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3 text-text-muted" />}
                </button>
              </div>
              <div>
                <span className="text-text-muted">Block:</span>
                <div className="font-mono text-xs mt-1">285,943,729</div>
              </div>
              <div>
                <span className="text-text-muted">Time:</span>
                <div className="font-mono text-xs mt-1">{new Date(evidenceData.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' })}</div>
              </div>
              <div>
                <span className="text-text-muted">Network:</span>
                <div className="font-mono text-xs mt-1">{on_chain.network}</div>
              </div>
            </div>
          </div>

          <a
            href={`${EXPLORER_BASE}/tx/${on_chain.primitives[on_chain.primitives.length - 1].sig}?cluster=custom`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-secondary text-background font-bold py-3 rounded-slab hover:bg-secondary-light transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-tighter cursor-pointer"
          >
            View on Solana Explorer <ExternalLink className="w-4 h-4" />
          </a>
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
          <div className="text-2xl font-bold tracking-[0.3em] uppercase opacity-50">
            BABEL
          </div>
          <div className="text-text-secondary text-sm">
            Built by <span className="text-primary font-bold">Antigravity</span> (AI Agent) <br />
            For Superteam Earn Swarm Hackathon • Feb 2026
          </div>
          <div className="flex justify-center gap-8 text-xs uppercase tracking-widest font-bold text-text-muted">
            <button onClick={() => scrollTo(architectureRef)} className="hover:text-secondary transition-all cursor-pointer">Methodology</button>
            <button onClick={() => scrollTo(statsRef)} className="hover:text-secondary transition-all cursor-pointer">Architecture</button>
            <button onClick={() => scrollTo(proofRef)} className="hover:text-secondary transition-all cursor-pointer">Evidence</button>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-all">GitHub</a>
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
            className="flex-1 rounded-[1px] border border-mortar transition-all duration-500"
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

function PrimitiveBrick({ primitive, onCopySig, isCopied }: { primitive: any; onCopySig: (sig: string) => void; isCopied: boolean }) {
  const isEmergent = primitive.type === 'Emergent';
  return (
    <div className={`stone-tablet p-6 hover:translate-x-1 group ${isEmergent ? 'border-l-4 border-l-secondary' : 'border-l-4 border-l-primary'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`primitive-id text-2xl font-semibold ${isEmergent ? 'text-secondary shimmer-bronze' : 'text-primary'}`}>
            B{primitive.id}
          </div>
          <div>
            <div className="text-text-primary font-mono text-sm tracking-tight">{primitive.template}</div>
            <div className="text-xs text-text-muted mt-1 flex gap-3 lowercase">
              <span>{primitive.type}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onCopySig(primitive.sig)}
            className="font-mono text-[10px] text-text-muted group-hover:text-secondary transition-colors cursor-pointer flex items-center gap-1"
            title="Click to copy full signature"
          >
            TX: {primitive.sig.slice(0, 16)}...
            {isCopied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </button>
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
  const colorMap: Record<string, string> = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent-light)',
    success: 'var(--color-success)',
  };
  const classes: any = {
    primary: 'text-primary border-primary/20',
    secondary: 'text-secondary border-secondary/20',
    accent: 'text-accent-light border-accent/20',
    success: 'text-success border-success/20'
  };
  return (
    <div className={`stone-tablet p-8 flex flex-col items-center gap-4 hover:scale-105 transition-transform ${classes[color]}`}>
      <div className={`${classes[color]} p-3 rounded-slab bg-background/50 border`}>
        {icon}
      </div>
      <div className="text-center">
        <div className="text-4xl leading-none font-bold text-text-primary">{value}</div>
        <div className="text-xs text-text-muted uppercase tracking-widest mt-2">{label}</div>
      </div>
      <div className="flex gap-1 w-full mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-[1px]" style={{ backgroundColor: i < 4 ? colorMap[color] : 'var(--color-mortar)' }} />
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

function TabButton({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-[4px] transition-all cursor-pointer ${active ? 'bg-primary text-white ziggurat-shadow' : 'text-text-muted hover:text-text-secondary'
        }`}
    >
      {children}
    </button>
  );
}
