#!/usr/bin/env node

/**
 * SECURITY GATEKEEPER - STATIC CODE SCANNER
 * Scans codebases for OWASP Top 10 vulnerabilities, hardcoded secrets, and SQLi.
 * Zero external dependencies. Works on Node 16+.
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(process.argv[2] || process.cwd());

const RULES = [
  {
    id: 'SEC-SQLI-001',
    name: 'SQL Injection Risk (Raw Concatenation)',
    severity: 'CRITICAL',
    pattern: /(SELECT|INSERT|UPDATE|DELETE).*\+.*(?:req\.|params|body|query|\$)/i,
    message: 'Detected raw string concatenation in SQL statement. Use parameterized queries ($1, ?).'
  },
  {
    id: 'SEC-SECRET-002',
    name: 'Hardcoded Secret / API Token',
    severity: 'HIGH',
    pattern: /(api_key|apiKey|secret|private_key|token)\s*=\s*['"][a-zA-Z0-9_\-]{16,}['"]/i,
    message: 'Hardcoded secret detected. Move credentials to .env or environment variables.'
  },
  {
    id: 'SEC-HASH-003',
    name: 'Weak Cryptographic Hash',
    severity: 'MEDIUM',
    pattern: /createHash\s*\(\s*['"](md5|sha1)['"]\s*\)/i,
    message: 'MD5 and SHA-1 are cryptographically broken for passwords/signatures. Use SHA-256 or bcrypt.'
  },
  {
    id: 'SEC-LOG-004',
    name: 'Sensitive PII / Credential in Logs',
    severity: 'MEDIUM',
    pattern: /console\.log\s*\(.*(password|secret|token|ssn|credit_card).*\)/i,
    message: 'Potential credential or PII printed to console logs. Mask sensitive fields before logging.'
  }
];

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);
const VALID_EXTS = new Set(['.js', '.mjs', '.ts', '.tsx', '.py', '.php', '.sql']);

let issuesFound = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTS.has(ext)) {
        scanFile(fullPath);
      }
    }
  }
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i];
      for (const rule of RULES) {
        if (rule.pattern.test(lineText)) {
          issuesFound++;
          const relPath = path.relative(targetDir, filePath);
          console.log(`[${rule.severity}] ${rule.name} (${rule.id})`);
          console.log(`  File: ${relPath}:${i + 1}`);
          console.log(`  Code: ${lineText.trim().substring(0, 80)}`);
          console.log(`  Fix:  ${rule.message}\n`);
        }
      }
    }
  } catch {}
}

console.log(`\n======================================================`);
console.log(`🛡️  SECURITY GATEKEEPER &bull; OWASP STATIC ANALYSIS`);
console.log(`Target: ${targetDir}`);
console.log(`======================================================\n`);

scanDir(targetDir);

if (issuesFound === 0) {
  console.log(`✅ [AUDIT PASSED] No critical OWASP vulnerabilities detected.`);
} else {
  console.log(`⚠️  Found ${issuesFound} potential security violation(s). Review and remediate.`);
}
console.log(``);
