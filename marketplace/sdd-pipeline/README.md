# Universal Spec-Driven Development (SDD) Agent Harness

> **Official Marketplace Package** &bull; Distributed via Agensi.io &bull; Developed by Sean Jerve

Enforces rigorous Spec-Driven Development on any AI coding agent. Stops AI hallucinations, generates ERDs and API contracts before coding, and enforces defensive testing.

---

## ⚡ Instant Setup for Any Coding Agent

### 1. Claude Code
Copy `adapters/claude/CLAUDE.md` to the root of your project:
```bash
cp adapters/claude/CLAUDE.md ./CLAUDE.md
```

### 2. Cursor IDE
Copy `adapters/cursor/.cursorrules` or `adapters/cursor/rules/sdd-pipeline.mdc` into your `.cursor/rules/` folder:
```bash
cp adapters/cursor/.cursorrules ./.cursorrules
```

### 3. Google Antigravity
Place this directory inside your workspace's `.agent/skills/sdd-pipeline/`:
```bash
cp -r . ./.agent/skills/sdd-pipeline
```

### 4. GitHub Copilot
Add to `.github/copilot-instructions.md`.

### 5. Windsurf
Copy to `.windsurfrules`.

---

## 📜 License & Support
Commercial single-seat or team developer license. Non-exclusive. Support: https://github.com/SeanJerve/dev-squad
