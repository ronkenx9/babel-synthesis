const fs = require('fs');

try {
    console.log('Reading evidence.json...');
    const raw = fs.readFileSync('evidence.json', 'utf-8');
    console.log('Parsing JSON...');
    const evidence = JSON.parse(raw);

    console.log('Evidence keys:', Object.keys(evidence));
    if (evidence.on_chain) {
        console.log('On-chain keys:', Object.keys(evidence.on_chain));
    } else {
        console.error('CRITICAL: evidence.on_chain is undefined!');
        console.log('Full evidence object:', JSON.stringify(evidence, null, 2));
        process.exit(1);
    }

    const primitives = evidence.on_chain.primitives || [];
    const transcript = evidence.transcript_sample || [];

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Babel Protocol Dashboard</title>
    <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 10px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; }
        .metric { font-size: 2.5em; font-weight: bold; color: #4ade80; }
        .label { color: #94a3b8; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.05em; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #334155; }
        th { color: #94a3b8; font-weight: 600; }
        code { background: #0f172a; padding: 4px 8px; border-radius: 4px; color: #f472b6; font-family: 'Fira Code', monospace; }
        .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold; }
        .badge.Bootstrap { background: #3b82f6; color: white; }
        .badge.Emergent { background: #a855f7; color: white; }
        .sig { font-family: monospace; font-size: 0.8em; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🟣 Babel Protocol Dashboard</h1>
        
        <div class="grid">
            <div class="card">
                <div class="label">Token Savings</div>
                <div class="metric">${evidence.metrics.savings}</div>
                <div class="sub">Reduced from ${evidence.metrics.baselineTokens} to ${evidence.metrics.compressedTokens} tokens</div>
            </div>
            <div class="card">
                <div class="label">Active Primitives</div>
                <div class="metric">${primitives.length}</div>
                <div class="sub">3 Bootstrap + 6 Emergent</div>
            </div>
            <div class="card">
                <div class="label">Agents Active</div>
                <div class="metric">${evidence.metrics.agent_count}</div>
                <div class="sub">Processing ${evidence.metrics.message_count} messages</div>
            </div>
        </div>

        <h2>⛓️ On-Chain Registry (Solana)</h2>
        <div class="card">
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
                    ${primitives.map(p => `
                    <tr>
                        <td>#${p.id}</td>
                        <td><span class="badge ${p.type}">${p.type}</span></td>
                        <td><code>${p.template}</code></td>
                        <td class="sig">${p.sig.substring(0, 12)}...${p.sig.substring(p.sig.length - 12)}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <h2>💬 Live Transcript Analysis</h2>
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Agent</th>
                        <th>Original Message</th>
                        <th>Babel Compression</th>
                        <th>Savings</th>
                    </tr>
                </thead>
                <tbody>
                    ${transcript.map(t => `
                    <tr>
                        <td>${t.step}</td>
                        <td>${t.from}</td>
                        <td>${t.original}</td>
                        <td><code>${t.babel}</code></td>
                        <td style="color: ${parseFloat(t.savings) > 50 ? '#4ade80' : '#e2e8f0'}">${t.savings}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #64748b;">
            Generated by Babel Autonomous Agent • ${new Date().toISOString()}
        </div>
    </div>
</body>
</html>
`;

    fs.writeFileSync('dashboard.html', html);
    console.log('Dashboard generated at dashboard.html');

} catch (err) {
    console.error('Error generating dashboard:', err);
    process.exit(1);
}
