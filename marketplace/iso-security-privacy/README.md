# ISO 27001 & OWASP ASVS Automated Security Gatekeeper

> **Official Marketplace Package** &bull; Distributed via Agensi.io &bull; Developed by Sean Jerve

Autonomous security auditor for AI coding agents. Automatically checks for SQL injection, hardcoded secrets, CSRF/XSS, broken access control, and GDPR / RA 10173 privacy compliance.

---

## ⚡ Instant Setup for Any Coding Agent

### 1. Claude Code
Copy `adapters/claude/CLAUDE.md` to the root of your project:
```bash
cp adapters/claude/CLAUDE.md ./CLAUDE.md
```

### 2. Cursor IDE
Copy `adapters/cursor/.cursorrules` or `adapters/cursor/rules/iso-security-privacy.mdc` into your `.cursor/rules/` folder:
```bash
cp adapters/cursor/.cursorrules ./.cursorrules
```

### 3. Google Antigravity
Place this directory inside your workspace's `.agent/skills/iso-security-privacy/`:
```bash
cp -r . ./.agent/skills/iso-security-privacy
```

### 4. GitHub Copilot
Add to `.github/copilot-instructions.md`.

### 5. Windsurf
Copy to `.windsurfrules`.

---

## 📜 License & Support
Commercial single-seat or team developer license. Non-exclusive. Support: https://github.com/SeanJerve/dev-squad
