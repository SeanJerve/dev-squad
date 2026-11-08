#!/usr/bin/env node

/**
 * SDD ARCHITECT CLI HELPER
 * Lightweight, zero-dependency feature contract scaffolder.
 * Usage: node scripts/sdd.js new <feature-name>
 */

const fs = require('fs');
const path = require('path');

const [,, command, featureName] = process.argv;

if (command !== 'new' || !featureName) {
  console.log(`\nUsage:`);
  console.log(`  node scripts/sdd.js new <feature-name>\n`);
  console.log(`Example:`);
  console.log(`  node scripts/sdd.js new user-auth\n`);
  process.exit(0);
}

const cleanName = featureName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
const targetDir = path.join(process.cwd(), 'features', cleanName);
const templateDir = path.join(__dirname, '..', 'templates');

if (fs.existsSync(targetDir)) {
  console.error(`Error: Feature directory "features/${cleanName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

function copyTemplate(templateName, targetFile) {
  const src = path.join(templateDir, templateName);
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf8');
    content = content.replace(/\[Feature Name\]/g, cleanName);
    fs.writeFileSync(path.join(targetDir, targetFile), content);
  }
}

copyTemplate('spec.template.md', 'spec.md');
copyTemplate('plan.template.md', 'plan.md');
copyTemplate('tasks.template.md', 'tasks.md');

console.log(`\n======================================================`);
console.log(`✅ [SDD CONTRACT SCAFFOLDED] features/${cleanName}/`);
console.log(`======================================================`);
console.log(`• features/${cleanName}/spec.md   (Specification Contract)`);
console.log(`• features/${cleanName}/plan.md   (Schemas & API Architecture)`);
console.log(`• features/${cleanName}/tasks.md  (Implementation Tasks)`);
console.log(`\nInstruct your AI Agent: "Act as @sdd-architect. Fill out features/${cleanName}/spec.md."\n`);
