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
    console.log(`  &bull; clients/${clientSlug}/${file}`);
  }
  console.log(`  &bull; clients/${clientSlug}/HANDOVER.md\n`);
  console.log(`🎉 Next Step: Double click clients/${clientSlug}/index.html to view your client's live website!`);
}

if (command === 'build') {
  buildGymProject(briefPathArg);
} else {
  banner();
  console.log(`Usage:`);
  console.log(`  node orchestrator.mjs build [path-to-brief.json]`);
  console.log(`\nExample:`);
  console.log(`  node orchestrator.mjs build client-brief.template.json\n`);
}
