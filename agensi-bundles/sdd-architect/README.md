# SDD Architect &bull; Spec-Driven Development Engine

> Stop AI coding agent hallucinations. Force your agent to architect before coding.

Compatible with **Claude Code**, **Cursor**, **GitHub Copilot**, **Windsurf**, and **Antigravity**.

---

## ⚡ 30-Second Quickstart

### 1. Claude Code
Add to your project root as `CLAUDE.md`:
\`\`\`bash
cp adapters/claude/CLAUDE.md ./CLAUDE.md
\`\`\`

### 2. Cursor IDE
Drop into `.cursorrules` or `.cursor/rules/sdd-architect.mdc`:
\`\`\`bash
cp adapters/cursor/.cursorrules ./.cursorrules
\`\`\`

### 3. Scaffold Features
\`\`\`bash
node scripts/sdd.js new user-authentication
\`\`\`
This creates:
- `features/user-authentication/spec.md`
- `features/user-authentication/plan.md`
- `features/user-authentication/tasks.md`

Then tell your agent: *"Fill out the spec in features/user-authentication/spec.md before writing code."*
