#!/usr/bin/env node

/**
 * DEV-SQUAD: Universal Multi-Agent Spec-Driven Development (SDD) Engine
 * Works across ANY repository, framework, or client type.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { scanCodebase } from './scanner.mjs';
import { packageSingleSkill, packageAllSkills } from './packager.mjs';
import { startDevServer } from './server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOOL_DIR = __dirname;
const CWD = process.cwd();

const [,, command, ...args] = process.argv;

function banner() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║   DEV-SQUAD CLI &bull; Universal Multi-Agent Engineering Suite v2.5      ║
║   Spec-Driven Development &bull; OWASP & Privacy Audits &bull; Pitch Ready  ║
╚════════════════════════════════════════════════════════════════════════╝
`);
}

function getActiveProfile() {
  const configPath = path.join(CWD, 'dev-squad.config.json');
  if (fs.existsSync(configPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return cfg.profile || 'dost-gov';
    } catch {
      return 'dost-gov';
    }
  }
  return 'dost-gov';
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(question, ans => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

async function handleInit(requestedProfile) {
  banner();
  console.log(`🚀 Initializing Universal DEV-SQUAD in: ${CWD}\n`);

  let profile = requestedProfile;
  if (!profile) {
    console.log(`Select the engineering profile for this project:`);
    console.log(`  [1] dost-gov          DOST Region V / Philippine Government (RA 10173, Bicol Scope)`);
    console.log(`  [2] commercial-client Commercial / Freelance Client (Business ROI, Payments, SEO)`);
    console.log(`  [3] fullstack-saas    Modern Full-Stack SaaS (Next.js, TypeScript, Type-Safety)\n`);

    const ans = await prompt('Enter profile [1, 2, or 3] (default: 1): ');
    if (ans === '2' || ans.toLowerCase() === 'commercial-client') {
      profile = 'commercial-client';
    } else if (ans === '3' || ans.toLowerCase() === 'fullstack-saas') {
      profile = 'fullstack-saas';
    } else {
      profile = 'dost-gov';
    }
  }

  console.log(`\n⚙️  Configuring profile: [${profile}]...`);

  // 1. Create config file
  const config = {
    name: path.basename(CWD),
    profile: profile,
    initialized_at: new Date().toISOString(),
    version: '2.5.0'
  };
  fs.writeFileSync(path.join(CWD, 'dev-squad.config.json'), JSON.stringify(config, null, 2));

  // 2. Setup .agent directory with rules and templates
  const agentDir = path.join(CWD, '.agent', 'rules');
  const templatesDir = path.join(CWD, '.agent', 'templates');
  fs.mkdirSync(agentDir, { recursive: true });
  fs.mkdirSync(templatesDir, { recursive: true });

  // Copy rule
  const globalRule = path.join(TOOL_DIR, 'profiles', 'AGENTS.md');
  if (fs.existsSync(globalRule)) {
    fs.copyFileSync(globalRule, path.join(agentDir, 'AGENTS.md'));
  }

  // Copy profile spec
  const profileSpec = path.join(TOOL_DIR, 'profiles', profile, 'spec.md');
  if (fs.existsSync(profileSpec)) {
    fs.copyFileSync(profileSpec, path.join(templatesDir, 'spec.md'));
  }

  // Create features folder
  fs.mkdirSync(path.join(CWD, 'features'), { recursive: true });

  // Copy dashboard
  const dashSrc = path.join(path.resolve(TOOL_DIR, '..', '..', 'scratch', 'dost-dev-agent-kit'), 'dashboard.html');
  if (fs.existsSync(dashSrc)) {
    fs.copyFileSync(dashSrc, path.join(CWD, 'dashboard.html'));
  }

  console.log(`✅ Project successfully initialized with DEV-SQUAD!`);
  console.log(`\n📁 Injected files into your repository:`);
  console.log(`  &bull; dev-squad.config.json        (Active profile: ${profile})`);
  console.log(`  &bull; .agent/rules/AGENTS.md       (Antigravity multi-agent squad rules)`);
  console.log(`  &bull; .agent/templates/spec.md     (Tailored ${profile} specification template)`);
  console.log(`  &bull; dashboard.html               (Interactive visual management command center)`);
  console.log(`  &bull; features/                    (Directory for feature specifications)\n`);

  console.log(`💡 Next Steps:`);
  console.log(`  &bull; Run: dev-squad new <feature-name> to scaffold your first feature`);
  console.log(`  &bull; Run: dev-squad audit to scan for security & privacy issues`);
  console.log(`  &bull; Run: dev-squad dashboard to launch the visual interface\n`);
}

function handleNew(featureName) {
  if (!featureName) {
    console.error('❌ Error: Please specify a feature name. (e.g. dev-squad new grant-portal)');
    process.exit(1);
  }

  const cleanName = featureName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const targetDir = path.join(CWD, 'features', cleanName);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Error: Feature folder "${cleanName}" already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  const profile = getActiveProfile();

  let specContent = `# Feature Specification: ${cleanName}\n\n**Profile:** ${profile}\n`;
  const templatePath = path.join(CWD, '.agent', 'templates', 'spec.md');
  const fallbackPath = path.join(TOOL_DIR, 'profiles', profile, 'spec.md');

  if (fs.existsSync(templatePath)) {
    specContent = fs.readFileSync(templatePath, 'utf8').replace(/\[Feature Name\]/g, cleanName);
  } else if (fs.existsSync(fallbackPath)) {
    specContent = fs.readFileSync(fallbackPath, 'utf8').replace(/\[Feature Name\]/g, cleanName);
  }

  fs.writeFileSync(path.join(targetDir, 'spec.md'), specContent);
  fs.writeFileSync(path.join(targetDir, 'plan.md'), `# Architecture & Plan: ${cleanName}\n\n**Spec Ref:** features/${cleanName}/spec.md\n\n## 1. Database Schema\n\n## 2. API Endpoints\n\n## 3. Tasks\n- [ ] Task 1: Setup data model\n- [ ] Task 2: Implement service\n- [ ] Task 3: Build UI view\n`);
  fs.writeFileSync(path.join(targetDir, 'audit.md'), `# Security & Privacy Audit: ${cleanName}\n\n- [ ] OWASP SQLi Parameterized\n- [ ] Authorization Server-Side Checked\n- [ ] Input Validation\n- [ ] Compliance verified\n`);

  console.log(`\n✅ Feature "${cleanName}" scaffolded!`);
  console.log(`  &bull; features/${cleanName}/spec.md`);
  console.log(`  &bull; features/${cleanName}/plan.md`);
  console.log(`  &bull; features/${cleanName}/audit.md\n`);
  console.log(`Prompt in Antigravity: "Act as @spec. Let's fill out features/${cleanName}/spec.md"\n`);
}

function handleAudit(targetDir) {
  const profile = getActiveProfile();
  const scanTarget = targetDir ? path.resolve(targetDir) : CWD;

  console.log(`\n🛡️  Running DEV-SQUAD Security & Privacy Audit...`);
  console.log(`Profile: [${profile}] | Target: ${scanTarget}\n`);

  const issues = scanCodebase(scanTarget, profile);

  if (issues.length === 0) {
    console.log(`✅ [AUDIT PASSED] No critical security or compliance violations detected.`);
    console.log(`🎉 Ready for review or release!`);
  } else {
    console.log(`⚠️  Found ${issues.length} potential issue(s):\n`);
    for (const issue of issues) {
      const relPath = path.relative(CWD, issue.filePath);
      console.log(`[${issue.severity}] ${issue.name} (${issue.ruleId})`);
      console.log(`  File: ${relPath}:${issue.line}`);
      console.log(`  Code: ${issue.codeSnippet}`);
      console.log(`  Fix:  ${issue.message}\n`);
    }
  }
}

function handlePitch(featureName) {
  if (!featureName) {
    console.error('❌ Error: Specify feature name. (e.g. dev-squad pitch grant-portal)');
    process.exit(1);
  }

  const profile = getActiveProfile();
  const specPath = path.join(CWD, 'features', featureName, 'spec.md');
  let title = featureName;

  if (fs.existsSync(specPath)) {
    const content = fs.readFileSync(specPath, 'utf8');
    const match = content.match(/# Feature Specification:\s*(.+)/);
    if (match) title = match[1].trim();
  }

  console.log(`\n🎙️  2-Minute Presentation Pitch for "${title}" (${profile})\n`);
  console.log(`═══════════════════════════════════════════════════════════════════`);

  if (profile === 'dost-gov') {
    console.log(`1. REGIONAL VALUE (30s):`);
    console.log(`"Good day Sir/Ma'am! Today I'm presenting the ${title} module.`);
    console.log(`This feature directly supports DOST Region V operations by giving staff`);
    console.log(`real-time tracking across our 6 Bicol provinces and cutting down manual reporting."\n`);

    console.log(`2. ARCHITECTURE & COMPLIANCE (45s):`);
    console.log(`"We followed strict Spec-Driven Development: the relational schema uses`);
    console.log(`parameterized queries to prevent SQL injection, and all personal citizen`);
    console.log(`data is masked according to the Philippine Data Privacy Act (RA 10173)."\n`);

    console.log(`3. RELIABILITY & NEXT STEPS (45s):`);
    console.log(`"The interface has defensive error boundaries to gracefully handle network`);
    console.log(`drops in island provinces like Catanduanes or Masbate without losing form data."\n`);
  } else {
    console.log(`1. BUSINESS IMPACT (30s):`);
    console.log(`"Hi team! Today I'm showing the ${title} feature.`);
    console.log(`This directly tackles user friction, streamlines the experience, and ensures`);
    console.log(`fast load times and high conversion."\n`);

    console.log(`2. ENGINEERING QUALITY (45s):`);
    console.log(`"Under the hood, this is built with clean separation of concerns, end-to-end`);
    console.log(`input validation, and strict error handling so edge cases won't crash the app."\n`);

    console.log(`3. USER EXPERIENCE (45s):`);
    console.log(`"It's fully responsive, optimized for mobile, and has passed automated security`);
    console.log(`audits. Let me walk you through the live demonstration."\n`);
  }
  console.log(`═══════════════════════════════════════════════════════════════════\n`);
}

function handleStatus() {
  const featDir = path.join(CWD, 'features');
  if (!fs.existsSync(featDir)) {
    console.log(`ℹ️  No features found. Run: dev-squad new <feature-name>`);
    return;
  }

  const entries = fs.readdirSync(featDir, { withFileTypes: true }).filter(e => e.isDirectory());
  console.log(`\n📊 DEV-SQUAD Project Feature Status (${getActiveProfile()}):\n`);
  console.log(`Feature Name                 Spec   Plan   Audit`);
  console.log(`─────────────────────────────────────────────────`);

  for (const entry of entries) {
    const fPath = path.join(featDir, entry.name);
    const hasSpec = fs.existsSync(path.join(fPath, 'spec.md')) ? '✅' : '❌';
    const hasPlan = fs.existsSync(path.join(fPath, 'plan.md')) ? '✅' : '❌';
    const hasAudit = fs.existsSync(path.join(fPath, 'audit.md')) ? '✅' : '❌';

    const padded = entry.name.padEnd(28, ' ');
    console.log(`${padded} ${hasSpec}     ${hasPlan}     ${hasAudit}`);
  }
  console.log(``);
}

function handleDashboard() {
  const dashPath = path.join(CWD, 'dashboard.html');
  const fallback = path.join(path.resolve(TOOL_DIR, '..', '..', 'scratch', 'dost-dev-agent-kit'), 'dashboard.html');
  const target = fs.existsSync(dashPath) ? dashPath : fallback;

  console.log(`\n🌐 Opening DEV-SQUAD Visual Command Dashboard...`);
  try {
    execSync(`powershell Start-Process "${target}"`);
    console.log(`✅ Dashboard launched in default browser.`);
  } catch {
    console.log(`Please open this file manually: ${target}`);
  }
}

function handleGym(subcmd, arg1, arg2, arg3) {
  const engineDir = path.join(TOOL_DIR, 'agency', 'gym-engine');
  if (subcmd === 'brief') {
    const templatePath = path.join(engineDir, 'client-brief.template.json');
    const dest = path.join(CWD, 'client-brief.json');
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, dest);
      console.log(`\n✅ Generated client brief template at: client-brief.json`);
      console.log(`Fill out the client's information, then run: dev-squad gym build client-brief.json\n`);
    } else {
      console.log(`Template not found at: ${templatePath}`);
    }
  } else if (subcmd === 'build') {
    const brief = arg1 || path.join(CWD, 'client-brief.json');
    import('./agency/gym-engine/orchestrator.mjs').then(mod => {
      mod.buildGymProject(brief);
    });
  } else if (subcmd === 'proposal') {
    const biz = arg1 || 'Legazpi Iron Gym';
    const owner = arg2 || 'Club Owner';
    const tier = arg3 || 'tier1';
    import('./agency/gym-engine/orchestrator.mjs').then(mod => {
      mod.generateProposal(biz, owner, tier);
    });
  } else {
    console.log(`\nGym Agency Engine Commands:`);
    console.log(`  dev-squad gym brief                           Generate client-brief.json questionnaire`);
    console.log(`  dev-squad gym build [brief.json]              Autonomously build the client's website/system`);
    console.log(`  dev-squad gym proposal [biz] [owner] [tier]   Generate printable commercial client proposal\n`);
  }
}

function handleRefs() {
  const refPath = path.join(TOOL_DIR, 'REFERENCES.md');
  console.log(`\n📚 DEV-SQUAD Scientific & Engineering Reference Library`);
  console.log(`File: ${refPath}\n`);
  console.log(`Core Pillars:`);
  console.log(`  1. AI Research: SWE-bench (Jimenez/Yao 2024), ReAct (Yao 2023), Reflexion (Shinn 2023)`);
  console.log(`  2. Industry SOTA: Anthropic 'Building Effective Agents', GitHub 'spec-kit', Model Context Protocol (MCP)`);
  console.log(`  3. Philippine Law: Republic Act No. 10173 (Data Privacy Act of 2012), NPC Circulars 16-01/03, DICT GIF`);
  console.log(`  4. Security: OWASP Top 10 (2021), OWASP ASVS 4.0 (Application Security Verification)`);
  console.log(`  5. Architecture: Clean Architecture (Martin), Enterprise Patterns (Fowler), Domain-Driven Design (Evans)\n`);
  console.log(`Opening full reference document in your default markdown reader...\n`);
  try {
    execSync(`powershell Start-Process "${refPath}"`);
  } catch {
    console.log(`You can view the full file at: ${refPath}`);
  }
}

function handlePackage(skillName) {
  banner();
  console.log(`📦 Packaging DEV-SQUAD Skills for Agensi.io & Cross-Agent Marketplaces...\n`);
  try {
    if (skillName && skillName !== '--all') {
      const res = packageSingleSkill(skillName, TOOL_DIR);
      console.log(`✅ Packaged skill: ${res.skillName} ($${res.price_usd})`);
      console.log(`   Directory: ${res.dir}`);
      console.log(`   ZIP Archive: ${res.zip || 'N/A'}\n`);
    } else {
      const results = packageAllSkills(TOOL_DIR);
      console.log(`✅ Successfully packaged ${results.length} marketplace skills:\n`);
      for (const res of results) {
        console.log(` • [${res.skillName}] $${res.price_usd} USD`);
        console.log(`   Target: ${res.zip ? 'ZIP Built' : 'Directory Ready'}`);
      }
      console.log(`\n🎉 Distribution bundles ready in: ${path.join(TOOL_DIR, 'dist', 'marketplace')}\n`);
    }
  } catch (err) {
    console.error(`❌ Packaging error: ${err.message}`);
  }
}

function handleServe(portArg) {
  const port = parseInt(portArg || '3333', 10);
  startDevServer(port);
  try {
    execSync(`powershell Start-Process "http://localhost:${port}/dashboard"`);
  } catch {}
}

function showHelp() {
  banner();
  console.log(`Usage:
  dev-squad <command> [arguments]

Commands:
  init [profile]       Initialize any project repository with DEV-SQUAD.
                       Profiles: dost-gov | commercial-client | fullstack-saas
  new <feature-name>   Scaffold a new feature with spec, plan, and audit gates.
  audit [path]         Run automated OWASP & Data Privacy (RA 10173/GDPR) security scan.
  pitch <feature-name> Generate an audience-tailored 2-minute spoken demo script.
  package [skill|--all] Bundle skills into Agensi.io / Claude / Cursor distribution packages.
  serve [port]         Start local visual command server & API (default port: 3333).
  status               Display status of all features and compliance gates.
  dashboard            Launch the offline visual command dashboard in your browser.
  refs                 Show the scientific, legal, and industry references & bibliography.
  gym <brief|build>    Autonomous Gym Agency Factory (build Tier 1/2/3 from a brief).
  help                 Display this help guide.

Examples:
  dev-squad init
  dev-squad package --all
  dev-squad serve
  dev-squad gym brief
  dev-squad gym build client-brief.json
  dev-squad audit
  dev-squad refs
`);
}

switch (command) {
  case 'init':
    handleInit(args[0]);
    break;
  case 'gym':
    handleGym(args[0], args[1], args[2], args[3]);
    break;
  case 'new':
    handleNew(args[0]);
    break;
  case 'audit':
  case 'scan':
    handleAudit(args[0]);
    break;
  case 'pitch':
    handlePitch(args[0]);
    break;
  case 'package':
    handlePackage(args[0]);
    break;
  case 'serve':
    handleServe(args[0]);
    break;
  case 'status':
    handleStatus();
    break;
  case 'dashboard':
    handleDashboard();
    break;
  case 'refs':
  case 'docs':
  case 'references':
    handleRefs();
    break;
  case 'help':
  default:
    showHelp();
    break;
}
