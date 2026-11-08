#!/usr/bin/env node

/**
 * DEV-SQUAD Gym Agency Engine - Autonomous Project Generator
 * Takes a SINGLE client-brief.json and builds the complete Tier 1, Tier 2, or Tier 3 project.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENGINE_DIR = __dirname;
const CWD = process.cwd();

const [,, command, briefPathArg] = process.argv;

function banner() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║   DEV-SQUAD &bull; Autonomous Gym & Local Business Agency Engine v1.0       ║
║   Single-Prompt Build &bull; Tier 1 (Static) | Tier 2 (CMS) | Tier 3 (Gym OS)║
╚══════════════════════════════════════════════════════════════════════════╝
`);
}

export function buildGymProject(briefFilePath) {
  banner();
  const briefPath = briefFilePath ? path.resolve(briefFilePath) : path.join(ENGINE_DIR, 'client-brief.template.json');

  if (!fs.existsSync(briefPath)) {
    console.error(`❌ Error: Brief file not found at: ${briefPath}`);
    process.exit(1);
  }

  const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));
  const tier = (brief.tier || 'tier1').toLowerCase();
  const clientSlug = brief.business_name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const outputDir = path.join(CWD, 'clients', clientSlug);

  console.log(`🚀 Building autonomous solution for: "${brief.business_name}"`);
  console.log(`📦 Selected Tier: [${tier.toUpperCase()}]`);
  console.log(`📂 Output Directory: ${outputDir}\n`);

  fs.mkdirSync(outputDir, { recursive: true });

  // 1. Copy template files based on Tier
  let sourceDir = path.join(ENGINE_DIR, 'tier1-static');
  if (tier === 'tier2' || tier.includes('dynamic')) {
    sourceDir = path.join(ENGINE_DIR, 'tier2-dynamic');
  } else if (tier === 'tier3' || tier.includes('system') || tier.includes('os')) {
    sourceDir = path.join(ENGINE_DIR, 'tier3-system');
  }

  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    let content = fs.readFileSync(path.join(sourceDir, file), 'utf8');

    // Replace business variables
    content = content
      .replace(/Apex Iron Gym & Fitness/g, brief.business_name)
      .replace(/Apex Iron/g, brief.business_name)
      .replace(/APEX IRON/g, brief.business_name.toUpperCase())
      .replace(/Rizal St\., Old Albay District, Legazpi City, 4500 Albay, Philippines/g, brief.contact?.address || 'Legazpi City, Albay')
      .replace(/Rizal St\., Old Albay District/g, brief.contact?.address || 'Legazpi City, Albay')
      .replace(/\+63 917 123 4567/g, brief.contact?.phone || '+63 900 000 0000')
      .replace(/contact@apexirongym\.ph/g, brief.contact?.email || 'info@gym.ph');

    fs.writeFileSync(path.join(outputDir, file), content);
  }

  // 2. Generate Handover & Client Elevator Pitch
  const handoverContent = `# Client Handover & Deployment Dossier: ${brief.business_name}

**Tier Delivered:** ${tier.toUpperCase()}  
**Target Client:** ${brief.business_name}  
**Contact:** ${brief.contact?.phone} | ${brief.contact?.email}  

---

## 🚀 Live Demo & Testing
- Main Web Interface: \`clients/${clientSlug}/index.html\`
${tier !== 'tier1' ? `- Management Portal: \`clients/${clientSlug}/admin.html\`` : ''}

## 🌐 1-Click Zero-Cost Hosting Deployment
- **Static Hosting (Free):** Drop the \`clients/${clientSlug}\` folder into Vercel, Netlify, or Cloudflare Pages.
- **Custom Domain Setup:** Point their GoDaddy / Namecheap DNS (A Record) to Vercel/Netlify.

## 🎙️ Your Pitch to the Gym Owner
"Good afternoon Sir/Ma'am! We built this specifically for ${brief.business_name}.
Notice how fast it loads on your phone, how prominent your pricing plans and WhatsApp/Call buttons are,
and how easy it is for visitors in ${brief.contact?.address?.split(',')[1] || 'your city'} to find your gym on Google Maps."
`;

  fs.writeFileSync(path.join(outputDir, 'HANDOVER.md'), handoverContent);

  console.log(`✅ [BUILD COMPLETE] The entire package has been generated autonomously!`);
  console.log(`📁 Generated Assets in: clients/${clientSlug}/`);
  for (const file of files) {
    console.log(`  • clients/${clientSlug}/${file}`);
  }
  console.log(`  • clients/${clientSlug}/HANDOVER.md\n`);
  console.log(`🎉 Next Step: Double click clients/${clientSlug}/index.html to view your client's live website!`);
}

export function generateProposal(businessName = 'Local Fitness Club', clientOwner = 'Gym Owner', tierArg = 'tier1') {
  banner();
  const tier = tierArg.toLowerCase();
  const clientSlug = businessName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const outputDir = path.join(CWD, 'clients', clientSlug);
  fs.mkdirSync(outputDir, { recursive: true });

  const pricing = {
    tier1: { name: 'Tier 1: High-Converting Digital Showcase', pricePhp: '₱15,000', priceUsd: '$270', days: '3 Days' },
    tier2: { name: 'Tier 2: Dynamic Member Growth CMS', pricePhp: '₱45,000', priceUsd: '$800', days: '7 Days' },
    tier3: { name: 'Tier 3: Complete Gym OS & Cloud Management', pricePhp: '₱95,000', priceUsd: '$1,700', days: '14 Days' }
  };

  const selected = pricing[tier] || pricing.tier1;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Commercial Web Engineering Proposal — ${businessName}</title>
  <style>
    :root {
      --bg: #09090b;
      --card: #18181b;
      --border: #27272a;
      --primary: #f59e0b;
      --text: #f4f4f5;
      --muted: #a1a1aa;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 48px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .badge {
      background: rgba(245, 158, 11, 0.15);
      color: var(--primary);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    h1 { margin: 0 0 8px 0; font-size: 28px; }
    h2 { font-size: 20px; border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-top: 36px; }
    .meta { color: var(--muted); font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid var(--border); }
    th { color: var(--muted); font-size: 13px; text-transform: uppercase; }
    .price-box {
      background: #121215;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .price-amount { font-size: 32px; font-weight: 700; color: var(--primary); }
    .sign-section {
      margin-top: 48px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .sign-box { border-top: 1px solid var(--border); padding-top: 12px; font-size: 14px; color: var(--muted); }
    @media print {
      body { background: #fff; color: #000; padding: 0; }
      .container { border: none; box-shadow: none; padding: 20px; background: #fff; }
      .price-box { border: 1px solid #ccc; background: #f9f9f9; }
      .price-amount { color: #000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="badge">Official Client Proposal</div>
        <h1>${businessName}</h1>
        <div class="meta">Prepared for: <strong>${clientOwner}</strong> &bull; Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; font-size: 18px; color: var(--primary);">DEV-SQUAD AGENCY</div>
        <div class="meta">Lead Engineer: Sean Jerve</div>
      </div>
    </div>

    <h2>1. Executive Objective</h2>
    <p>This proposal outlines the high-performance digital modernization of <strong>${businessName}</strong>. Our architecture is engineered to capture local search traffic from Google Maps, convert mobile visitors into walk-in members via zero-friction WhatsApp/Call triggers, and establish market dominance in your territory.</p>

    <h2>2. Scope of Deliverables (${selected.name})</h2>
    <table>
      <thead>
        <tr><th>Deliverable</th><th>Specification</th><th>Impact</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mobile-First Architecture</strong></td>
          <td>Sub-second load speed, optimized for iPhone & Android thumb zones</td>
          <td>Zero visitor drop-off</td>
        </tr>
        <tr>
          <td><strong>Local SEO & GEO Schema</strong></td>
          <td>JSON-LD LocalBusiness schema registered for Google Search & AI engines</td>
          <td>Top search placement</td>
        </tr>
        <tr>
          <td><strong>Conversion Funnels</strong></td>
          <td>Sticky floating WhatsApp booking button & instant call CTAs</td>
          <td>Immediate lead inquiries</td>
        </tr>
        <tr>
          <td><strong>Transparent Membership Grid</strong></td>
          <td>Interactive Daily / Monthly / VIP pricing tier breakdown</td>
          <td>Friction-free signups</td>
        </tr>
        <tr>
          <td><strong>Zero-Cost Hosting Setup</strong></td>
          <td>Configured on global CDN with SSL certificate included ($0/mo hosting)</td>
          <td>Zero recurring host costs</td>
        </tr>
      </tbody>
    </table>

    <h2>3. Investment & Timeline</h2>
    <div class="price-box">
      <div>
        <div style="font-weight: 600; font-size: 18px;">${selected.name}</div>
        <div class="meta">Guaranteed Turnaround: <strong>${selected.days}</strong> from deposit</div>
      </div>
      <div class="price-amount">${selected.pricePhp} <span style="font-size: 16px; color: var(--muted); font-weight: 400;">(${selected.priceUsd})</span></div>
    </div>

    <h2>4. Payment Terms & Milestone Schedule</h2>
    <ul>
      <li><strong>50% Initial Deposit:</strong> Mobilization, design engineering, and layout scaffolding.</li>
      <li><strong>50% Handover Balance:</strong> Upon client approval, domain DNS connection, and final walkthrough.</li>
    </ul>

    <div class="sign-section">
      <div class="sign-box">
        <div>Client Acceptance: <strong>${clientOwner}</strong></div>
        <div style="margin-top: 30px;">Signature: __________________________</div>
        <div style="margin-top: 8px;">Date: _______________________________</div>
      </div>
      <div class="sign-box">
        <div>Lead Engineer: <strong>Sean Jerve</strong></div>
        <div style="margin-top: 30px;">Signature: <em>Sean Jerve (Dev-Squad)</em></div>
        <div style="margin-top: 8px;">Date: ${new Date().toLocaleDateString()}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const proposalPath = path.join(outputDir, 'PROPOSAL.html');
  fs.writeFileSync(proposalPath, html);

  console.log(`✅ [PROPOSAL GENERATED] Ready for presentation or PDF export!`);
  console.log(`📄 Saved to: clients/${clientSlug}/PROPOSAL.html\n`);
  try {
    execSync(`powershell Start-Process "${proposalPath}"`);
  } catch {}
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (command === 'build') {
    buildGymProject(briefPathArg);
  } else if (command === 'proposal') {
    const [,,, biz, owner, tier] = process.argv;
    generateProposal(biz, owner, tier);
  } else {
    banner();
    console.log(`Usage:`);
    console.log(`  node orchestrator.mjs build [path-to-brief.json]`);
    console.log(`  node orchestrator.mjs proposal [business-name] [owner-name] [tier]`);
    console.log(`\nExample:`);
    console.log(`  node orchestrator.mjs proposal "Legazpi Fitness Lab" "Mark Ramos" tier1\n`);
  }
}
