# DEV-SQUAD 🚀
### Universal Multi-Agent Spec-Driven Development (SDD) Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Spec-Driven Development](https://img.shields.io/badge/Methodology-SDD-purple.svg)](./REFERENCES.md)
[![Security Standard](https://img.shields.io/badge/Security-OWASP%20ASVS%204.0-red.svg)](https://owasp.org/)

**DEV-SQUAD** is an open-source, framework-agnostic engineering toolkit designed to move software development away from unstructured "vibe coding" (blind prompting and guessing) toward **Spec-Driven Development (SDD)** orchestrated by specialized AI agent personas.

Built on research from **Princeton University (SWE-bench & ReAct)**, **Anthropic's "Building Effective Agents"**, and **GitHub's Spec-Kit**.

---

## 🌟 Core Features

* 📜 **Spec-Driven Development (SDD):** Define unambiguous specification contracts (`spec.md`) and architectural plans (`plan.md`) before writing any code.
* 🛡️ **Automated Security & Privacy Scanner:** Scans your codebase for SQL injection risks, hardcoded secrets, weak cryptographic hashes, and unmasked PII.
* 🎙️ **Automated Demo Pitch Generator:** Automatically converts your feature specifications into crisp 2-minute elevator pitches for supervisors and clients.
* 🌐 **Offline Visual Command Dashboard:** Zero-dependency, single-file HTML dashboard with a live spec generator, compliance calculator, and defense flashcards.
* 🔌 **Pluggable Multi-Profile Engine:**
  * `commercial-client` — Freelance & SME projects (Payments, SEO, client sign-off).
  * `fullstack-saas` — Modern SaaS (Next.js, TypeScript, type-safety, optimistic UI).
  * `enterprise-compliance` — Regulated projects (PII masking, audit logging, OWASP ASVS).

---

## ⚡ Quick Start

### 1. Installation

Clone this repository or run directly with Node.js:

```bash
# Clone the repository
git clone https://github.com/SeanJerve/dev-squad.git
cd dev-squad

# (Optional) Link globally so `dev-squad` command is available everywhere:
npm link
```

### 2. Basic Workflow

```bash
# 1. Initialize any project repository with DEV-SQUAD
dev-squad init

# 2. Scaffold a new feature contract
dev-squad new user-authentication

# 3. Scan codebase for OWASP & privacy vulnerabilities
dev-squad audit

# 4. Generate a 2-minute spoken demo script for code reviews
dev-squad pitch user-authentication

# 5. Open the visual command center in your browser
dev-squad dashboard

# 6. View the scientific research papers and legal foundations
dev-squad refs
```

---

## 🔄 The 5-Stage Engineering Lifecycle

```
  [User Intent / Request]
             │
             ▼
    1. SPECIFY (`@spec`)        ──> Generate unambiguous contract (`spec.md`)
             │
             ▼
    2. ARCHITECT (`@architect`) ──> Relational schemas, API routes, task breakdown (`plan.md`)
             │
             ▼
    3. BUILD (`@builder`)       ──> Incremental, testable implementation
             │
             ▼
    4. AUDIT (`@auditor`)       ──> Automated OWASP & Privacy static analysis
             │
             ▼
    5. SHIP (`@scribe`)         ──> Conventional Commits & 2-minute demo pitch
```

---

## 📚 Scientific & Engineering Pedigree

DEV-SQUAD is built upon peer-reviewed computer science research and enterprise standards:

* **AI Agent Research:** 
  * *SWE-bench* (Jimenez et al., Princeton / ICLR 2024)
  * *ReAct* (Yao et al., Google / Princeton / ICLR 2023)
  * *Reflexion* (Shinn et al., NeurIPS 2023)
* **Industry Frameworks:** 
  * Anthropic's *"Building Effective Agents"* (Dec 2024)
  * GitHub's *Spec-Kit* & Spec-Driven Development
  * Anthropic's *Model Context Protocol (MCP)*
* **Defensive Cybersecurity:** 
  * OWASP Top 10 (2021) & OWASP Application Security Verification Standard (ASVS 4.0)

*(See [`REFERENCES.md`](./REFERENCES.md) for the complete bibliography, paper citations, and direct links).*

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

**Developed with precision by [Sean Jerve](https://github.com/SeanJerve)**
