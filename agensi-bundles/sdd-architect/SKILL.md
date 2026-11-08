---
name: sdd-architect
description: Universal Spec-Driven Development (SDD) harness for AI coding agents. Enforces unambiguous user story contracts, architectural schemas, and defensive task breakdowns before writing code.
version: 1.0.0
author: Sean Jerve
pricing: $19.00 USD
category: Workflow & Architecture
tags: [spec-driven-development, claude-code, cursor, copilot, windsurf, architecture]
---

# SDD Architect &bull; Spec-Driven Development Engine

Transform your AI coding agent from an erratic, guessing chatbot into a disciplined Senior Software Architect. 

Based on peer-reviewed research (**Princeton SWE-bench & ReAct**, **Anthropic's 'Building Effective Agents'**, and **GitHub's Spec-Driven Development**), this skill stops agents from writing unstructured code, preventing architectural drift, broken assumptions, and costly hallucinations.

---

## ⚡ The 4-Stage SDD Protocol

Whenever the user requests a new feature, refactor, or complex task, execute these 4 strict stages sequentially:

### Stage 1: Specification Contract (`spec.md`)
Never write implementation code without first generating and verifying the specification contract:
1. **User Story:** "As a [role], I want [action], so that [business value]."
2. **Acceptance Criteria (Gherkin):** Given [context], When [action], Then [observable outcome].
3. **Edge Cases & Failure Modes:** Define at least 3 edge cases (e.g. network timeout, empty payload, rate-limits, unauthenticated requests).
4. **Data Privacy & Scope:** Define sensitive fields and compliance boundaries upfront.

### Stage 2: Technical Architecture & Schemas (`plan.md`)
Architect the system before touching application code:
1. **Entity-Relationship Data Models:** Define database tables, foreign keys, constraints, and indexes.
2. **API Endpoint Contracts:** Method, route, request payload JSON schema, response status codes, and error responses.
3. **State Management & Data Flow:** Component hierarchy, state transitions, loading states, and optimistic updates.
4. **Resilience Patterns:** Error boundaries, retry policies, and fallback views.

### Stage 3: Incremental Testable Implementation (`tasks.md`)
Break implementation into small, atomic, verifiable steps:
- `[ ] Task 1.1: Data migration / schema definition`
- `[ ] Task 1.2: Repository / Data Access Object with parameterized queries`
- `[ ] Task 1.3: Service layer with business validation`
- `[ ] Task 1.4: API route handler with HTTP status codes`
- `[ ] Task 1.5: UI view with loading, error, and empty states`

### Stage 4: Defensive Verification & Review
1. **Security Gate:** Run automated static analysis for SQL injection, hardcoded secrets, and unvalidated inputs.
2. **Code Review:** Ensure no unused imports, proper error boundaries, and zero console logs in production paths.
3. **Conventional Commit:** Generate atomic, conventional commit messages (`feat:`, `fix:`, `refactor:`).

---

## 🛠️ Included Assets & Templates
- `templates/spec.template.md` — Complete industry-standard specification template.
- `templates/plan.template.md` — Relational schema & API contract template.
- `templates/tasks.template.md` — Atomic task tracking checklist.
- `scripts/sdd.js` — Zero-dependency Node.js feature scaffolder (`node scripts/sdd.js new <name>`).
