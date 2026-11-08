---
name: security-gatekeeper
description: Enterprise automated security & privacy auditor based on OWASP ASVS 4.0 Level 2 and ISO/IEC 27001. Scans code for SQL injection, hardcoded secrets, broken access controls, and privacy leaks.
version: 1.0.0
author: Sean Jerve
pricing: $24.00 USD
category: Security & Compliance
tags: [security, owasp, asvs, iso27001, audit, privacy, static-analysis]
---

# Security Gatekeeper &bull; OWASP & ISO 27001 Automated Auditor

Autonomous defensive cybersecurity and privacy gatekeeper for AI coding agents.

Coding agents frequently generate vulnerable code: unescaped SQL queries, hardcoded API tokens, unvalidated endpoints, and client-exposed PII. **Security Gatekeeper** embeds OWASP ASVS 4.0 Level 2 and ISO/IEC 27001 controls directly into your agent's thinking process.

---

## 🛡️ Core Verification Gates

Whenever code is generated or reviewed, execute these defensive checks:

### 1. Injection & Defensive SQL (OWASP A03:2021)
- **Zero Raw String Concatenation:** All SQL statements must strictly use parameterized queries (`$1`, `?`, or ORM binding).
- **ORM Escaping:** Verify that raw queries (`prisma.$queryRawUnsafe`, `sequelize.literal`) do not interpolate user variables.
- **Path Traversal:** Validate that file paths from user inputs are sanitized with `path.basename` and resolved against authorized boundaries.

### 2. Cryptographic Storage & Secrets (OWASP A02:2021)
- **Zero Hardcoded Secrets:** No API keys, JWT secrets, passwords, or bearer tokens in source code.
- **Environment Isolation:** All sensitive credentials must be read via `process.env` or secret managers.
- **Modern Hashing:** Deprecate MD5 and SHA-1 for passwords; mandate bcrypt, Argon2id, or PBKDF2 with unique salts.

### 3. Server-Side Authorization & Access Control (OWASP A01:2021)
- **No Client-Side Authorization Gates:** UI hiding is not security. Verify that every sensitive API route inspects user roles and entity ownership server-side.
- **IDOR Protection:** Insecure Direct Object References must verify that the requesting user owns the requested record (`WHERE id = $1 AND user_id = $2`).

### 4. Data Privacy & PII Masking (ISO 27701 & GDPR)
- **Log Sanitization:** Sensitive PII (national IDs, credit card numbers, plain passwords, personal phone numbers) must be masked in log streams.
- **Defensive Error Leaks:** Never return raw database errors or stack traces to client HTTP responses. Return sanitized error codes (`{ error: 'INTERNAL_ERROR', code: 'ERR_500' }`).

---

## 🛠️ Standalone Static Analysis Scanner
Run the included zero-dependency security scanner directly from your terminal:
\`\`\`bash
node scripts/audit.js .
\`\`\`
Scans all JS, TS, Python, PHP, and SQL files in your project and prints file-and-line remediation guidance.
