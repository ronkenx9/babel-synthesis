"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShieldCheck, Zap, Activity, Database, GitBranch, Cpu, Terminal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from "framer-motion";
import evidenceData from "@/data/evidence.json";

export default function Dashboard() {
  const { metrics, on_chain, transcript_sample } = evidenceData;
  const savings = parseFloat(metrics.savings);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <Cpu className="w-10 h-10 text-purple-400" />
              Babel Protocol
            </h1>
            <p className="text-slate-400 text-lg">Autonomous Agent Coordination & Compression Registry</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-4 py-2 border-purple-500/30 text-purple-400 bg-purple-500/10">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2" />
              Agave 3.0.15 (Local)
            </Badge>
            <a
              href="https://github.com/ronkenx9/babel-synthesis"
              target="_blank"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              View Source
            </a>
          </div>
        </header>

        {/* Hero Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Token Savings"
            value={metrics.savings}
            icon={<Zap className="w-5 h-5 text-yellow-400" />}
            sub={`Reduced from ${metrics.baselineTokens} to ${metrics.compressedTokens}`}
            trend="up"
          />
          <MetricCard
            title="Registry State"
            value={on_chain.registry.total_primitives}
            icon={<Database className="w-5 h-5 text-blue-400" />}
            sub="Active Language Primitives"
          />
          <MetricCard
            title="Agent Swarm"
            value={metrics.agent_count}
            icon={<Users className="w-5 h-5 text-green-400" />}
            sub="Autonomous Nodes"
          />
          <MetricCard
            title="Verified Proofs"
            value={on_chain.primitives.length}
            icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
            sub="On-Chain Signatures"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="registry" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-900 border border-slate-800">
            <TabsTrigger value="registry" className="data-[state=active]:bg-slate-800">Use "On-Chain Registry"</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-800">Live Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="registry" className="space-y-6 mt-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  Active Language Primitives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400">
                      <tr>
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Template Pattern</th>
                        <th className="p-4 font-medium">Verification Signature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {on_chain.primitives.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-mono text-blue-400">#{p.id}</td>
                          <td className="p-4">
                            <Badge className={p.type === 'Bootstrap' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}>
                              {p.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <code className="bg-slate-950 px-2 py-1 rounded text-pink-300 font-mono text-xs">
                              {p.template}
                            </code>
                          </td>
                          <td className="p-4 font-mono text-xs text-slate-500">
                            {p.sig.slice(0, 12)}...{p.sig.slice(-12)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visual Chart */}
              <Card className="bg-slate-900 border-slate-800">
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
                      { name: 'Optimized', value: metrics.compressedTokens }
                    ]}>
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {[{ name: 'Baseline', color: '#64748b' }, { name: 'Optimized', color: '#a855f7' }].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Transcript Feed */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-400" />
                    Live Transcript feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {transcript_sample.map((msg, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-sm space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span className="font-mono text-purple-400">{msg.from}</span>
                        <span className="bg-slate-900 px-2 py-0.5 rounded">Step {msg.step}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Original</div>
                          <div className="text-slate-300">{msg.original}</div>
                        </div>
                        <div className="border-l border-slate-800 pl-2">
                          <div className="text-xs text-slate-500 mb-1">Compressed</div>
                          <code className="text-pink-300 font-mono text-xs block">{msg.babel}</code>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Badge variant="outline" className={parseFloat(msg.savings) > 50 ? "text-green-400 border-green-900" : "text-slate-500 border-slate-800"}>
                          {msg.savings} Savings
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm pt-8">
          <p>Generated autonomously by Babel Agent Swarm • Verified on Solana Localnet</p>
        </footer>
      </div>
    </div>
  );
}

function MetricCard({ title, value, sub, icon, trend }: any) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-100">{value}</div>
        <p className="text-xs text-slate-500 mt-1">{sub}</p>
      </CardContent>
    </Card>
  )
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
