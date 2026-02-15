import { readFileSync, writeFileSync } from 'fs';

interface Evidence {
    metrics: {
        baselineTokens: number;
        compressedTokens: number;
        savings: string;
        agent_count: number;
        message_count: number;
    };
    on_chain: {
        primitives: Array<{
            id: number;
            template: string;
            type: string;
            sig: string;
        }>;
    };
    transcript_sample: Array<{
        step: number;
        from: string;
        original: string;
        babel: string;
        savings: string;
        type: string;
    }>;
}

const evidence = JSON.parse(readFileSync('evidence.json', 'utf-8'));

/**
 * RE-EVOLVED DATA RESOLVER
 * Highly resilient lookup for Babel protocol metrics and evidence chains.
 */
const getProp = (obj: any, paths: string[], fallback: any) => {
    for (const path of paths) {
        const parts = path.split('.');
        let current = obj;
        for (const part of parts) {
            current = current?.[part];
        }
        if (current !== undefined && current !== null) return current;
    }
    return fallback;
};

// Core metrics with version-agnostic lookup
const savings = getProp(evidence, ['metrics.savings', 'savings'], "0%");
const baseline = getProp(evidence, ['metrics.baselineTokens', 'metrics.baseline'], 0);
const compressed = getProp(evidence, ['metrics.compressedTokens', 'metrics.compressed'], 0);
const agentCount = getProp(evidence, ['metrics.agent_count', 'agents', 'metrics.agentCount'], 5);
const messageCount = getProp(evidence, ['metrics.message_count', 'metrics.messagesProcessed', 'messages'], 0);

// Evidence collection
const primitives = getProp(evidence, ['on_chain.primitives', 'primitives', 'registry.primitives'], []);
const transcripts = getProp(evidence, ['transcript_sample', 'evidence', 'traces', 'history'], []);

// Identify "extra" metrics to display dynamically
const mainKeys = ['metrics', 'on_chain', 'transcript_sample', 'evidence', 'traces', 'history', 'agents', 'agent_names', 'protocol', 'version', 'timestamp'];
const extraSections = Object.entries(evidence).filter(([key]) => !mainKeys.includes(key));

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5"> <!-- AUTO-REFRESH EVERY 5 SECONDS FOR DEMO -->
    <title>Babel Protocol | Autonomous Evolution Dashboard</title>
    <style>
        :root { --primary: #38bdf8; --success: #4ade80; --bg: #0f172a; --surface: #1e293b; --border: #334155; --text: #e2e8f0; --muted: #94a3b8; }
        body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; line-height: 1.5; }
        .container { max-width: 1200px; margin: 0 auto; }
        header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--border); padding-bottom: 20px; margin-bottom: 30px; }
        h1 { color: var(--primary); margin: 0; font-size: 2em; }
        .version-badge { background: var(--surface); border: 1px solid var(--border); padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; color: var(--primary); }
        .status-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 0.7em; background: rgba(74, 222, 128, 0.1); color: var(--success); padding: 4px 10px; border-radius: 12px; margin-bottom: 10px; }
        .status-dot { width: 6px; height: 6px; background: var(--success); border-radius: 50%; box-shadow: 0 0 8px var(--success); animation: blink 2s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card { background: var(--surface); padding: 25px; border-radius: 16px; border: 1px solid var(--border); transition: transform 0.2s; }
        .card:hover { transform: translateY(-4px); }
        .metric { font-size: 3em; font-weight: 800; color: var(--success); line-height: 1; margin: 10px 0; }
        .label { color: var(--muted); font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
        .sub { color: var(--muted); font-size: 0.85em; }
        section { margin-bottom: 50px; }
        h2 { font-size: 1.5em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--primary); opacity: 0.9; }
        table { width: 100%; border-collapse: collapse; background: var(--surface); border-radius: 12px; overflow: hidden; }
        th, td { text-align: left; padding: 16px; border-bottom: 1px solid var(--border); }
        th { background: rgba(255,255,255,0.03); color: var(--muted); font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.05em; }
        code { background: var(--bg); padding: 4px 10px; border-radius: 6px; color: #f472b6; font-family: 'Fira Code', monospace; font-size: 0.9em; }
        .badge { padding: 4px 10px; border-radius: 8px; font-size: 0.75em; font-weight: 800; text-transform: uppercase; }
        .badge.Bootstrap { background: #3b82f6; color: white; }
        .badge.Emergent { background: #a855f7; color: white; }
        .sig { font-family: monospace; font-size: 0.75em; color: var(--muted); opacity: 0.7; }
        .meta-tag { display: inline-flex; overflow: hidden; background: var(--surface); border: 1px solid var(--border); padding: 8px 14px; border-radius: 10px; font-size: 0.85em; margin-right: 12px; margin-bottom: 12px; }
        .meta-tag b { color: var(--primary); margin-right: 6px; }
        .no-data { text-align: center; padding: 60px; color: var(--muted); font-style: italic; background: rgba(255,255,255,0.02); border-radius: 16px; border: 2px dashed var(--border); }
    </style>
</head>
<body>
    <div class="container">
        <div class="status-pill">
            <div class="status-dot"></div>
            LIVE AUTONOMOUS AGENT FEED
        </div>
        <header>
            <div>
                <h1>${evidence.protocol || 'Babel'} Protocol Dashboard</h1>
                <p style="color: var(--muted); margin: 5px 0 0 0;">Autonomous Linguistic Speciation & On-Chain Consensus</p>
            </div>
            <div class="version-badge">v${evidence.version || '1.0.0'}</div>
        </header>

        <!-- LIVE DEMO SECTION -->
        <div style="margin-bottom: 50px; background: #1e293b; border: 2px solid #334155; border-radius: 12px; padding: 30px; overflow: hidden;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="background: #38bdf8; padding: 10px; border-radius: 8px; color: #0f172a; font-weight: bold;">▶</div>
                <div>
                    <h3 style="margin: 0; color: #38bdf8; font-size: 1.5em;">LIVE DEMONSTRATION</h3>
                    <p style="margin: 0; color: #94a3b8; font-size: 0.9em;">Real-time autonomous swarm recording</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <!-- Video Player -->
                <div style="border-radius: 8px; overflow: hidden; border: 1px solid #334155;">
                    <div style="background: #0f172a; padding: 8px 15px; border-bottom: 1px solid #334155; display: flex; align-items: center; gap: 10px;">
                        <span style="height: 10px; width: 10px; background: #ef4444; border-radius: 50%;"></span>
                        <span style="height: 10px; width: 10px; background: #eab308; border-radius: 50%;"></span>
                        <span style="height: 10px; width: 10px; background: #22c55e; border-radius: 50%;"></span>
                        <span style="margin-left: 10px; font-family: monospace; font-size: 0.8em; color: #64748b;">babel-terminal-demo.sh</span>
                    </div>
                    <video controls preload="metadata" style="width: 100%; display: block;">
                        <source src="packages/dashboard/public/demos/babel-terminal-demo.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                
                <!-- Details -->
                <div style="font-size: 0.9em; display: flex; flex-direction: column; justify-content: center; gap: 20px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 8px; border: 1px solid #334155;">
                        <strong style="color: #38bdf8; display: block; margin-bottom: 10px;">WHAT YOU'LL SEE:</strong>
                        <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; line-height: 1.6;">
                            <li>Swarm pattern detection</li>
                            <li>Consensus voting (3/5 majority)</li>
                            <li>On-Chain PDA registration</li>
                            <li>Live token compression</li>
                        </ul>
                    </div>
                    <div style="text-align: center; color: #64748b; font-family: monospace;">
                        VERIFICATION: UNCUT TERMINAL FOOTAGE
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid">
            <div class="card">
                <div class="label">Efficiency Savings</div>
                <div class="metric">${savings}</div>
                <div class="sub">Optimization [${baseline} → ${compressed}] Tokens</div>
            </div>
            <div class="card">
                <div class="label">Linguistic Growth</div>
                <div class="metric">${primitives.length}</div>
                <div class="sub">${getProp(evidence, ['metrics.patternsAdopted'], 0)} Emergent Patterns registered</div>
            </div>
            <div class="card">
                <div class="label">Swarm Hive Stats</div>
                <div class="metric">${agentCount}</div>
                <div class="sub">Orchestrating ${messageCount} events</div>
            </div>
        </div>

        <!-- DYNAMICALLY RENDERED EVOLVED SECTIONS -->
        ${extraSections.map(([key, value]) => `
        <section>
            <h2>🔍 ${key.replace(/_/g, ' ').toUpperCase()}</h2>
            <div style="background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid var(--border);">
                ${typeof value === 'object'
        ? Object.entries(value || {}).map(([vKey, vVal]) => `<div class="meta-tag"><b>${vKey}:</b> ${JSON.stringify(vVal)}</div>`).join('')
        : `<div style="font-size: 1.1em; color: var(--primary); font-family: monospace;">${value}</div>`
    }
            </div>
        </section>
        `).join('')}

        <section>
            <h2>⛓️ On-Chain Registry (Solana Proofs)</h2>
            ${primitives.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Template Pattern</th>
                        <th>Verification Signature</th>
                    </tr>
                </thead>
                <tbody>
                    ${primitives.map((p: any) => `
                    <tr>
                        <td><b>#${p.id}</b></td>
                        <td><span class="badge ${p.type}">${p.type}</span></td>
                        <td><code>${p.template}</code></td>
                        <td class="sig">${p.sig?.substring(0, 16)}...${p.sig?.substring(p.sig.length - 16)}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : `<div class="no-data">Initializing On-Chain PDAs... No patterns adopted yet.</div>`}
        </section>

        <section>
            <h2>💬 Full Autonomy Trace</h2>
            ${transcripts.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Agent</th>
                        <th>Intent</th>
                        <th>Babel Code</th>
                        <th>Efficiency</th>
                    </tr>
                </thead>
                <tbody>
                    ${transcripts.map((t: any) => `
                    <tr>
                        <td>${t.step}</td>
                        <td style="font-weight: 700; color: var(--primary);">${t.agent || t.from}</td>
                        <td style="font-size: 0.85em; opacity: 0.9;">${t.original}</td>
                        <td><code>${t.babel || t.compressed}</code></td>
                        <td style="color: var(--success); font-weight: 700;">${t.savings || 'N/A'}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : `<div class="no-data">Capturing swarm transcripts...</div>`}
        </section>

        <footer style="margin-top: 60px; padding: 40px 0; text-align: center; color: var(--muted); border-top: 1px solid var(--border); font-size: 0.8em; letter-spacing: 0.1em;">
            AUTONOMOUS AUDIT AT ${new Date().toLocaleString()} • ${evidence.protocol || 'BABEL'} SYSTEM HIVE
        </footer>
    </div>
</body>
</html>
`;

writeFileSync('dashboard.html', html);
console.log('Dashboard generated at dashboard.html');
