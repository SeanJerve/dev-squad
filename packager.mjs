/**
 * DEV-SQUAD MARKETPLACE PACKAGER
 * Transforms internal SDD skills into cross-agent compatible marketplace packages
 * Compatible with Agensi.io, Claude Code, Cursor, Copilot, Windsurf, and Antigravity.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SKILL_METADATA = {
  'sdd-pipeline': {
    title: 'Universal Spec-Driven Development (SDD) Agent Harness',
    description: 'Enforces rigorous Spec-Driven Development on any AI coding agent. Stops AI hallucinations, generates ERDs and API contracts before coding, and enforces defensive testing.',
    price_usd: 19,
    category: 'Engineering Architecture & Workflow',
    tags: ['spec-driven-development', 'claude-code', 'cursor', 'copilot', 'architecture', 'anti-hallucination'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Windsurf', 'Antigravity', 'Aider']
  },
  'iso-security-privacy': {
    title: 'ISO 27001 & OWASP ASVS Automated Security Gatekeeper',
    description: 'Autonomous security auditor for AI coding agents. Automatically checks for SQL injection, hardcoded secrets, CSRF/XSS, broken access control, and GDPR / RA 10173 privacy compliance.',
    price_usd: 24,
    category: 'Security & Compliance',
    tags: ['security', 'owasp', 'iso27001', 'gdpr', 'privacy', 'auditing'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Windsurf', 'Antigravity']
  },
  'conversion-craft': {
    title: 'Conversion Rate Optimization (CRO) & Local Business Architecture',
    description: 'High-converting layout and copy architecture for service businesses and gyms. Enforces 3-second hook heuristics, pricing tier matrices, mobile thumb-zones, and friction-free CTAs.',
    price_usd: 19,
    category: 'Frontend & Growth Engineering',
    tags: ['cro', 'landing-pages', 'conversion', 'local-business', 'gym', 'ui-ux'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'Copilot', 'Antigravity']
  },
  'ui-motion-craft': {
    title: 'Physics-Based UI Motion & Micro-Interactions Standard',
    description: 'Design engineering motion standard based on Emil Kowalski principles. Enforces spring physics, zero-sluggishness 60fps transitions, interruptible gestures, and anti-AI slop feel.',
    price_usd: 15,
    category: 'Design Engineering',
    tags: ['animation', 'motion', 'framer-motion', 'micro-interactions', 'frontend'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'Copilot', 'Antigravity']
  },
  'geo-technical-marketing': {
    title: 'Generative Engine Optimization (GEO) & Schema.org Suite',
    description: 'Advanced technical SEO and Generative Engine Optimization (GEO - KDD 24). Automatically injects valid JSON-LD LocalBusiness schemas, citation hooks, and Perplexity/SearchGPT discoverability.',
    price_usd: 19,
    category: 'SEO & Technical Marketing',
    tags: ['seo', 'geo', 'schema-org', 'searchgpt', 'perplexity', 'marketing'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'Copilot', 'Antigravity']
  },
  'design-engineer-taste': {
    title: 'Design Engineering Taste & Anti-AI Slop Heuristics',
    description: 'Craftsmanship rules that prevent generic AI design. Enforces optical hierarchy, consistent spatial scales, bespoke typography pairings, and tactile micro-states.',
    price_usd: 15,
    category: 'Design Engineering',
    tags: ['design-systems', 'typography', 'tailwind', 'craftsmanship', 'anti-slop'],
    version: '1.0.0',
    author: 'Sean Jerve (https://github.com/SeanJerve)',
    supported_agents: ['Claude Code', 'Cursor', 'Copilot', 'Antigravity']
  }
};

export function packageSingleSkill(skillName, baseDir = __dirname) {
  const skillsSrcDir = path.join(baseDir, '.agent', 'skills');
  const skillPath = path.join(skillsSrcDir, skillName);
  
  if (!fs.existsSync(skillPath)) {
    throw new Error(`Skill "${skillName}" not found at: ${skillPath}`);
  }

  const skillMdFile = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMdFile)) {
    throw new Error(`SKILL.md missing in ${skillPath}`);
  }

  const skillContent = fs.readFileSync(skillMdFile, 'utf8');
  const meta = SKILL_METADATA[skillName] || {
    title: skillName.replace(/-/g, ' ').toUpperCase(),
    description: `Specialized engineering skill: ${skillName}`,
    price_usd: 19,
    category: 'Engineering & Agent Skills',
    tags: [skillName, 'agent-skill'],
    version: '1.0.0',
    author: 'Sean Jerve',
    supported_agents: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Antigravity']
  };

  const marketplaceDir = path.join(baseDir, 'marketplace', skillName);
  const distDir = path.join(baseDir, 'dist', 'marketplace');
  
  fs.mkdirSync(marketplaceDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Generate agensi.json manifest
  const agensiManifest = {
    manifest_version: '1.0',
    id: `seanjerve/${skillName}`,
    name: skillName,
    title: meta.title,
    version: meta.version,
    description: meta.description,
    author: meta.author,
    category: meta.category,
    pricing: {
      type: 'paid',
      amount_usd: meta.price_usd,
      currency: 'USD'
    },
    supported_agents: meta.supported_agents,
    tags: meta.tags,
    entrypoints: {
      antigravity: 'SKILL.md',
      cursor: 'adapters/cursor/.cursorrules',
      cursor_rules: `adapters/cursor/rules/${skillName}.mdc`,
      claude: 'adapters/claude/CLAUDE.md',
      copilot: 'adapters/copilot/instructions.md',
      windsurf: 'adapters/windsurf/.windsurfrules'
    },
    created_at: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(marketplaceDir, 'agensi.json'),
    JSON.stringify(agensiManifest, null, 2)
  );

  // 2. Write core SKILL.md
  fs.writeFileSync(path.join(marketplaceDir, 'SKILL.md'), skillContent);

  // 3. Generate Multi-Agent Adapters
  // A. Cursor
  const cursorDir = path.join(marketplaceDir, 'adapters', 'cursor', 'rules');
  fs.mkdirSync(cursorDir, { recursive: true });
  const cursorMdc = `---
description: ${meta.title}
globs: *
alwaysApply: true
---

# ${meta.title}
${meta.description}

## Core Rules & Execution Directives
${skillContent}
`;
  fs.writeFileSync(path.join(cursorDir, `${skillName}.mdc`), cursorMdc);
  fs.writeFileSync(path.join(marketplaceDir, 'adapters', 'cursor', '.cursorrules'), `# Cursor Rules: ${meta.title}\n\n${skillContent}`);

  // B. Claude Code (CLAUDE.md)
  const claudeDir = path.join(marketplaceDir, 'adapters', 'claude');
  fs.mkdirSync(claudeDir, { recursive: true });
  const claudeMd = `# CLAUDE.md - ${meta.title}
Author: ${meta.author}
Category: ${meta.category}

## Instructions for Claude Code:
${skillContent}
`;
  fs.writeFileSync(path.join(claudeDir, 'CLAUDE.md'), claudeMd);

  // C. GitHub Copilot
  const copilotDir = path.join(marketplaceDir, 'adapters', 'copilot');
  fs.mkdirSync(copilotDir, { recursive: true });
  fs.writeFileSync(path.join(copilotDir, 'instructions.md'), `# GitHub Copilot Custom Instructions\n\n${skillContent}`);

  // D. Windsurf
  const windsurfDir = path.join(marketplaceDir, 'adapters', 'windsurf');
  fs.mkdirSync(windsurfDir, { recursive: true });
  fs.writeFileSync(path.join(windsurfDir, '.windsurfrules'), `# Windsurf Rules: ${meta.title}\n\n${skillContent}`);

  // 4. Generate Customer-Facing README.md
  const readmeContent = `# ${meta.title}

> **Official Marketplace Package** &bull; Distributed via Agensi.io &bull; Developed by Sean Jerve

${meta.description}

---

## ⚡ Instant Setup for Any Coding Agent

### 1. Claude Code
Copy \`adapters/claude/CLAUDE.md\` to the root of your project:
\`\`\`bash
cp adapters/claude/CLAUDE.md ./CLAUDE.md
\`\`\`

### 2. Cursor IDE
Copy \`adapters/cursor/.cursorrules\` or \`adapters/cursor/rules/${skillName}.mdc\` into your \`.cursor/rules/\` folder:
\`\`\`bash
cp adapters/cursor/.cursorrules ./.cursorrules
\`\`\`

### 3. Google Antigravity
Place this directory inside your workspace's \`.agent/skills/${skillName}/\`:
\`\`\`bash
cp -r . ./.agent/skills/${skillName}
\`\`\`

### 4. GitHub Copilot
Add to \`.github/copilot-instructions.md\`.

### 5. Windsurf
Copy to \`.windsurfrules\`.

---

## 📜 License & Support
Commercial single-seat or team developer license. Non-exclusive. Support: https://github.com/SeanJerve/dev-squad
`;
  fs.writeFileSync(path.join(marketplaceDir, 'README.md'), readmeContent);

  // 5. Build ZIP archive for instant distribution
  const zipDest = path.join(distDir, `${skillName}.zip`);
  try {
    const psCmd = `Compress-Archive -Path "${marketplaceDir}\\*" -DestinationPath "${zipDest}" -Force`;
    execSync(`powershell -NoProfile -Command "${psCmd}"`);
  } catch (err) {
    console.warn(`Warning: Could not create zip archive: ${err.message}`);
  }

  return {
    skillName,
    title: meta.title,
    price_usd: meta.price_usd,
    dir: marketplaceDir,
    zip: fs.existsSync(zipDest) ? zipDest : null
  };
}

export function packageAllSkills(baseDir = __dirname) {
  const skillsSrcDir = path.join(baseDir, '.agent', 'skills');
  if (!fs.existsSync(skillsSrcDir)) {
    throw new Error(`Skills source directory not found: ${skillsSrcDir}`);
  }

  const entries = fs.readdirSync(skillsSrcDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  const results = [];
  for (const name of entries) {
    try {
      const res = packageSingleSkill(name, baseDir);
      results.push(res);
    } catch (e) {
      console.error(`Skipping ${name}: ${e.message}`);
    }
  }

  return results;
}
