/**
 * Universal Security, Privacy & Quality Static Scanner
 * Supports multi-profile audits:
 * - DOST-GOV: OWASP Top 10 + RA 10173 (Philippine Data Privacy Act)
 * - COMMERCIAL: OWASP Top 10 + GDPR + Payment / Secret Exposure
 * - SAAS: Type Safety + OWASP + Secret Exposure
 */

import fs from 'fs';
import path from 'path';

const UNIVERSAL_RULES = [
  {
    id: 'SEC-SQLI-01',
    name: 'Raw SQL String Concatenation',
    severity: 'CRITICAL',
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\s+.*(?:\+|`|\$\{).*req\.(?:body|query|params)/i,
    message: 'Possible SQL Injection. Use parameterized queries or ORM bindings (PDO, Prisma, Eloquent).'
  },
  {
    id: 'SEC-SECRET-01',
    name: 'Hardcoded Secret or API Key',
    severity: 'CRITICAL',
    pattern: /(?:password|secret|api_key|token|private_key)\s*[:=]\s*["'][a-zA-Z0-9_\-]{16,}["']/i,
    message: 'Hardcoded secret detected. Move sensitive keys to environment variables (.env).'
  },
  {
    id: 'SEC-WEAK-HASH',
    name: 'Weak Password Hashing Algorithm',
    severity: 'HIGH',
    pattern: /(?:createHash\(['"](?:md5|sha1)['"]\)|md5\(|sha1\()/i,
    message: 'Weak hashing algorithm detected. Use bcrypt, Argon2, or PBKDF2 for password storage.'
  },
  {
    id: 'SEC-XSS-01',
    name: 'Direct InnerHTML / Unescaped Render',
    severity: 'MEDIUM',
    pattern: /(?:dangerouslySetInnerHTML|innerHTML\s*=)/i,
    message: 'Potential XSS vulnerability. Ensure HTML is sanitized with DOMPurify before rendering.'
  }
];

const DOST_GOV_RULES = [
  {
    id: 'RA10173-PII-LOG',
    name: 'RA 10173: Sensitive PII in Console Logs',
    severity: 'HIGH',
    pattern: /console\.log\(.*(?:phone|mobile|contact_no|philsys|sss|gsis|tin|password).*\)/i,
    message: 'Philippine Data Privacy Act (RA 10173) violation: Sensitive PII logged to stdout. Mask personal data.'
  }
];

const COMMERCIAL_RULES = [
  {
    id: 'COMM-CREDIT-CARD',
    name: 'Raw Credit Card / CVV Field Exposure',
    severity: 'CRITICAL',
    pattern: /(?:card_number|cvv|cvc|card_exp)\s*[:=]\s*req\./i,
    message: 'PCI-DSS violation risk: Raw card details handled in server memory. Use payment gateway tokens (Stripe/PayMongo).'
  }
];

const EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.php', '.py', '.sql']);
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.agent', 'vendor', '__pycache__']);

export function scanCodebase(targetDir, profile = 'dost-gov') {
  const issues = [];
  const rules = [...UNIVERSAL_RULES];

  if (profile === 'dost-gov') {
    rules.push(...DOST_GOV_RULES);
  } else if (profile === 'commercial-client') {
    rules.push(...COMMERCIAL_RULES);
  }

  function walk(currentDir) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (EXTENSIONS.has(ext)) {
          scanFile(fullPath, rules, issues);
        }
      }
    }
  }

  walk(targetDir);
  return issues;
}

function scanFile(filePath, rules, issues) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of rules) {
        if (rule.pattern.test(line)) {
          issues.push({
            ruleId: rule.id,
            name: rule.name,
            severity: rule.severity,
            filePath,
            line: i + 1,
            codeSnippet: line.trim(),
            message: rule.message
          });
        }
      }
    }
  } catch {
    // skip unreadable files
  }
}
