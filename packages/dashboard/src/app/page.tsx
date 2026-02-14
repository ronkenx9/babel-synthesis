"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Activity, Database, ShieldCheck, Cpu, Terminal, GitBranch, ArrowRight, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import evidenceData from "@/data/evidence.json";

/* ============================================
   BABEL PROTOCOL DASHBOARD v2
   Tower of Babel Theme — Language Evolution
   ============================================ */

export default function Dashboard() {
  const { metrics, on_chain, transcript_sample, agents, dialects } = evidenceData;

  return (
    <div className="min-h-screen bg-[#06060e] text-slate-100 font-sans selection:bg-purple-500/30 tower-grid">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8 pt-10 pb-16">
          {/* Nav */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <img src="/babel-logo.png" alt="Babel Protocol" className="w-12 h-12 rounded-lg" />
              <span className="text-xl font-bold tracking-tight">Babel</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1.5 border-purple-500/30 text-purple-300 bg-purple-500/10 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse mr-2" />
                Solana Localnet
              </Badge>
              <a
                href="https://github.com/ronkenx9/babel-synthesis"
                target="_blank"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source
              </a>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-300">
              <Cpu className="w-3.5 h-3.5" />
              Built Autonomously by AI Agents
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="shimmer-text">Babel Protocol</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Autonomous agents evolve their own coordination language on Solana.
              Each primitive is discovered through consensus, named, versioned, and registered on-chain.
            </p>
          </div>

          {/* Hero Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <HeroStat label="Token Savings" value={metrics.savings} accent="purple" />
            <HeroStat label="On-Chain Primitives" value={String(on_chain.registry.total_primitives)} accent="blue" />
            <HeroStat label="Agent Swarm" value={String(metrics.agent_count)} accent="teal" />
            <HeroStat label="Verified Proofs" value={String(on_chain.primitives.length)} accent="amber" />
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-8 pb-16 space-y-12">

        {/* ===== DIALECT EVOLUTION TIMELINE ===== */}
        <section>
          <SectionHeader
            icon={<GitBranch className="w-5 h-5 text-purple-400" />}
            title="Language Evolution"
            subtitle="Named dialects evolve as agents discover and adopt new patterns"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <Card className="bg-[#0d0d1a] border-[#1e1e3a]">
                <CardContent className="p-6">
                  <div className="evolution-line space-y-6 ml-2">
                    {dialects.evolution.map((d: any, i: number) => (
                      <div key={i} className="relative pl-10" style={{ animationDelay: `${i * 0.2}s` }}>
                        {/* Dot on timeline */}
                        <div className={`absolute left-[11px] top-2 w-3 h-3 rounded-full border-2 ${i === dialects.evolution.length - 1
                            ? 'bg-purple-500 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                            : 'bg-[#0d0d1a] border-[#1e1e3a]'
                          }`} />
                        <div className="bg-[#141428] border border-[#1e1e3a] rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-lg">{d.name}</h3>
                              <Badge className={
                                d.status === 'active'
                                  ? 'bg-green-500/10 text-green-300 border-green-500/20'
                                  : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                              }>
                                {d.status}
                              </Badge>
                            </div>
                            <span className="text-sm text-slate-500 font-mono">
                              {d.primitives} primitives
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{d.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>Efficiency: <span className="text-teal-400 font-mono">{d.efficiency}</span></span>
                            <span>Parent: <span className="text-purple-400 font-mono">{d.parent}</span></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Evolution Summary */}
            <div className="space-y-4">
              <Card className="bg-[#0d0d1a] border-[#1e1e3a] animate-glow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-5xl font-bold shimmer-text">{dialects.total_dialects}</div>
                  <div className="text-sm text-slate-400">Named Dialects</div>
                  <div className="h-px bg-[#1e1e3a]" />
                  <div className="text-sm text-slate-500">
                    Languages evolve through consensus voting.
                    3/5 agents must agree to adopt new primitives.
                  </div>
                </CardContent>
              </Card>
              {dialects.evolution_history.map((h: any, i: number) => (
                <Card key={i} className="bg-[#0d0d1a] border-[#1e1e3a]">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-purple-400 font-mono">{h.from}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-teal-400 font-mono">{h.to}</span>
                    </div>
                    <p className="text-xs text-slate-500">{h.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENT SWARM ===== */}
        <section>
          <SectionHeader
            icon={<Activity className="w-5 h-5 text-teal-400" />}
            title="Agent Swarm"
            subtitle="5 autonomous Worker threads, each with independent reasoning"
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {agents.map((agent: any, i: number) => (
              <Card key={i} className="bg-[#0d0d1a] border-[#1e1e3a] hover:border-purple-500/30 transition-all hover:translate-y-[-2px]">
                <CardContent className="p-5 text-center space-y-3">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: agent.color + '20', border: `2px solid ${agent.color}40` }}
                  >
                    <span style={{ color: agent.color }}>{agent.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{agent.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{agent.role}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {agent.messagesProcessed} msgs
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== REGISTRY + ANALYTICS TABS ===== */}
        <section>
          <Tabs defaultValue="registry" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#0d0d1a] border border-[#1e1e3a]">
              <TabsTrigger value="registry" className="data-[state=active]:bg-[#141428] data-[state=active]:text-purple-300">
                <Database className="w-4 h-4 mr-2" />
                On-Chain Registry
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-[#141428] data-[state=active]:text-teal-300">
                <Zap className="w-4 h-4 mr-2" />
                Compression
              </TabsTrigger>
              <TabsTrigger value="transcript" className="data-[state=active]:bg-[#141428] data-[state=active]:text-blue-300">
                <Terminal className="w-4 h-4 mr-2" />
                Live Feed
              </TabsTrigger>
            </TabsList>

            {/* REGISTRY TAB */}
            <TabsContent value="registry" className="mt-6">
              <Card className="bg-[#0d0d1a] border-[#1e1e3a]">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Database className="w-5 h-5 text-blue-400" />
                    Active Language Primitives
                    <Badge className="ml-2 bg-blue-500/10 text-blue-300 border-blue-500/20">
                      {on_chain.registry.total_primitives} total
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-[#1e1e3a] overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#080814] text-slate-400 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="p-4 font-medium">ID</th>
                          <th className="p-4 font-medium">Origin</th>
                          <th className="p-4 font-medium">Template Pattern</th>
                          <th className="p-4 font-medium">Tx Signature</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1e1e3a]">
                        {on_chain.primitives.map((p) => (
                          <tr key={p.id} className="hover:bg-[#141428] transition-colors">
                            <td className="p-4 font-mono text-blue-400 font-bold">#{p.id}</td>
                            <td className="p-4">
                              <Badge className={`text-xs ${p.type === 'Bootstrap'
                                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                  : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                                }`}>
                                {p.type === 'Bootstrap' ? '🧱 Bootstrap' : '✨ Emergent'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <code className="bg-[#080814] px-2.5 py-1 rounded-md text-pink-300 font-mono text-xs border border-[#1e1e3a]">
                                {p.template}
                              </code>
                            </td>
                            <td className="p-4 font-mono text-xs text-slate-500">
                              {p.sig.slice(0, 8)}...{p.sig.slice(-8)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[#0d0d1a] border-[#1e1e3a]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Compression Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Baseline', value: metrics.baselineTokens },
                        { name: 'Babel-Optimized', value: metrics.compressedTokens }
                      ]}>
                        <XAxis dataKey="name" stroke="#6b6b8a" fontSize={12} />
                        <YAxis stroke="#6b6b8a" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            background: '#0d0d1a',
                            border: '1px solid #1e1e3a',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                          }}
                          itemStyle={{ color: '#e4e4ef' }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {[
                            { name: 'Baseline', color: '#374151' },
                            { name: 'Babel-Optimized', color: '#a855f7' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d0d1a] border-[#1e1e3a]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      Protocol Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <StatRow label="Program ID" value={on_chain.program_id.slice(0, 12) + '...'} mono />
                    <StatRow label="Network" value={on_chain.network} />
                    <StatRow label="Bootstrap Primitives" value={String(on_chain.registry.bootstrap_count)} />
                    <StatRow label="Emergent Primitives" value={String(on_chain.registry.emergent_count)} highlight />
                    <StatRow label="Messages Processed" value={String(metrics.message_count)} />
                    <StatRow label="Active Agents" value={String(metrics.agent_count)} />
                    <div className="h-px bg-[#1e1e3a]" />
                    <StatRow label="Token Savings" value={metrics.savings} highlight />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TRANSCRIPT TAB */}
            <TabsContent value="transcript" className="mt-6">
              <Card className="bg-[#0d0d1a] border-[#1e1e3a]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-400" />
                    Agent Coordination Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {transcript_sample.map((msg: any, i: number) => (
                    <div key={i} className="bg-[#080814] p-4 rounded-xl border border-[#1e1e3a] text-sm space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: agents.find(a => a.name === msg.from)?.color || '#a855f7'
                            }}
                          />
                          <span className="font-mono text-purple-300 font-medium">{msg.from}</span>
                          <Badge variant="outline" className="text-xs border-[#1e1e3a] text-slate-500">
                            Step {msg.step}
                          </Badge>
                        </div>
                        <Badge className={`text-xs ${msg.type.includes('Bootstrap') ? 'bg-blue-500/10 text-blue-300' :
                            msg.type.includes('Emergent') ? 'bg-purple-500/10 text-purple-300' :
                              'bg-slate-500/10 text-slate-400'
                          }`}>
                          {msg.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="text-xs text-slate-500 uppercase tracking-wide">Human Language</div>
                          <div className="text-slate-300 font-mono text-xs bg-[#0d0d1a] p-2 rounded border border-[#1e1e3a]">
                            {msg.original}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-slate-500 uppercase tracking-wide">Babel Compressed</div>
                          <div className="text-pink-300 font-mono text-xs bg-[#0d0d1a] p-2 rounded border border-pink-500/10">
                            {msg.babel}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Badge variant="outline" className={
                          parseFloat(msg.savings) > 50
                            ? "text-green-400 border-green-500/20 bg-green-500/5"
                            : parseFloat(msg.savings) > 0
                              ? "text-yellow-400 border-yellow-500/20 bg-yellow-500/5"
                              : "text-slate-500 border-[#1e1e3a]"
                        }>
                          {msg.savings} saved
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* ===== VIDEO DEMO SECTION ===== */}
        <section>
          <SectionHeader
            icon={<Activity className="w-5 h-5 text-amber-400" />}
            title="Demo"
            subtitle="Watch the multi-agent swarm coordinate in real-time"
          />
          <Card className="bg-[#0d0d1a] border-[#1e1e3a] mt-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-[#080814] flex items-center justify-center text-slate-500 border-b border-[#1e1e3a]">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z" />
                    </svg>
                  </div>
                  <p className="text-sm">Demo video will appear here</p>
                  <p className="text-xs text-slate-600">Embed your recording URL in the src attribute</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="text-center pt-8 pb-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/babel-logo.png" alt="Babel" className="w-6 h-6 rounded" />
            <span className="text-sm font-semibold text-slate-400">Babel Protocol v2</span>
          </div>
          <p className="text-xs text-slate-600">
            Built autonomously by AI agents • Verified on Solana • Open Source (MIT)
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ===== HELPER COMPONENTS ===== */

function HeroStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  const colors: Record<string, string> = {
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-300',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-300',
    teal: 'from-teal-500/20 to-teal-500/5 border-teal-500/20 text-teal-300',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-300',
  };
  return (
    <div className={`bg-gradient-to-b ${colors[accent]} border rounded-xl p-5 text-center`}>
      <div className="text-2xl md:text-3xl font-bold font-mono">{value}</div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-[#141428] border border-[#1e1e3a] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function StatRow({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-sm ${mono ? 'font-mono' : ''} ${highlight ? 'text-purple-300 font-semibold' : 'text-slate-200'}`}>
        {value}
      </span>
    </div>
  );
}
