# Scientific & Engineering Pedigree: Comprehensive Reference Library

This document compiles the exhaustive scientific, architectural, legal, and open-source foundations behind the **`dev-squad`** and **Spec-Driven Development (SDD)** multi-agent system.

When you enter DOST Region V, you are not using ungrounded internet hacks. Every pattern in this suite is derived from peer-reviewed AI research, open-source industry toolkits from GitHub and Anthropic, statutory Philippine laws, and enterprise software engineering classics.

---

## Tier 1: Seminal AI Agent Research Papers & Protocols

### 1. ReAct: Synergizing Reasoning and Acting in Language Models
* **Authors:** Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao (Princeton University & Google Research, 2022 / ICLR 2023)
* **ArXiv Citation:** [arXiv:2210.03629](https://arxiv.org/abs/2210.03629)
* **Core Contribution to Our Suite:** The foundational architecture that interleaves internal chain-of-thought "Thoughts" with external "Actions" (tool executions) and "Observations". Used in our `@builder` and `@auditor` execution loops.

### 2. SWE-bench: Can Language Models Resolve Real-World GitHub Issues?
* **Authors:** Carlos E. Jimenez, John Yang, Alexander Wettig, Shunyu Yao, Kexin Pei, Ofir Press, Karthik Narasimhan (Princeton University, 2023 / ICLR 2024)
* **ArXiv Citation:** [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **Official Benchmark Repo:** [github.com/princeton-nlp/SWE-bench](https://github.com/princeton-nlp/SWE-bench)
* **Core Contribution to Our Suite:** Demonstrates that agents fail when given unbounded codebases without precise scoping. Established the necessity of task decomposition, reproducible reproduction scripts, and automated evaluation harnesses before merging code.

### 3. Reflexion: Language Agents with Verbal Reinforcement Learning
* **Authors:** Noah Shinn, Federico Cassano, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao (Northeastern University & Princeton University, 2023 / NeurIPS 2023)
* **ArXiv Citation:** [arXiv:2303.11366](https://arxiv.org/abs/2303.11366)
* **Core Contribution to Our Suite:** The self-reflection loop used in our Stage 4 (`@auditor`). Instead of blindly accepting agent code, the agent dynamically critiques errors and writes self-corrective patches before human review.

### 4. Model Context Protocol (MCP) Specification
* **Author / Organization:** Anthropic PBC (Open Standard, November 2024)
* **Specification & Documentation:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
* **Official GitHub Organization:** [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
* **Core Contribution to Our Suite:** Standardized protocol connecting AI agents securely to local filesystems, relational databases, git version control, and development tools without brittle custom API wrappers.

---

## Tier 2: State-of-the-Art Industry Engineering Guides & Open-Source Repositories

### 1. "Building Effective Agents" (Anthropic Engineering Guide)
* **Authors:** Erik Schluntz & Barry Zhang (Anthropic, December 2024)
* **Official Publication:** [anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)
* **Core Concepts Adopted:**
  * **Workflows vs. Autonomous Agents:** Why deterministic prompt chaining and orchestrator-worker patterns vastly outperform chaotic autonomous loops in production.
  * **Evaluator-Optimizer Workflow:** Separation of code generation (`@builder`) from adversarial evaluation (`@auditor`).

### 2. GitHub `spec-kit` & Spec-Driven Development (SDD)
* **Author / Organization:** GitHub & Microsoft Azure Architecture Teams (2024–2025)
* **Official Repository:** [github.com/github/spec-kit](https://github.com/github/spec-kit)
* **Core Concepts Adopted:**
  * The transition from conversational "vibe coding" to **Specifications as Living Contracts**.
  * The strict 5-stage lifecycle: *Constitution &rarr; Specify &rarr; Plan &rarr; Tasks &rarr; Implement &rarr; Converge*.

### 3. BMAD-METHOD (Agile AI-Driven Development - AiDD)
* **Organization:** BMAD Code Organization
* **Official Repository:** [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
* **Core Concepts Adopted:** Structured human-in-the-loop task breakdown, edge-case clarification questioning, and stopping conditions for multi-agent loops.

### 4. `spec-kitty` & Parallel Git Worktree Agent Orchestration
* **Repository:** [github.com/spec-kitty/spec-kitty](https://github.com/spec-kitty/spec-kitty)
* **Core Concepts Adopted:** Git-native isolation where features are branched cleanly and developed with independent specification artifacts.

---

## Tier 3: Philippine Legal, Security, & Government Frameworks

### 1. Republic Act No. 10173: Data Privacy Act of 2012 (DPA)
* **Enacted by:** Congress of the Philippines (August 15, 2012)
* **Regulatory Authority:** National Privacy Commission (NPC)
* **Official Statutory Link:** [privacy.gov.ph/data-privacy-act](https://privacy.gov.ph/data-privacy-act/)
* **Key Provisions Implemented in Our Suite:**
  * **Section 11 (General Data Privacy Principles):** Transparency, legitimate purpose, and proportionality.
  * **Section 20 (Security of Personal Information):** Mandates technical measures against accidental or unlawful destruction, alteration, or disclosure. Implemented in our `starter-core/privacy/masker.mjs` (masking PhilSys, phone numbers, and citizen identifiers).
  * **NPC Circular 16-01 & 16-03:** Guidelines on Personal Data Breach Management and mandatory security of personal data in government agencies.

### 2. DICT Department Circular No. 2017-002 (Philippine Government Interoperability Framework - GIF)
* **Issuing Agency:** Department of Information and Communications Technology (DICT)
* **Official Reference:** DICT Technical Information Security Policy Guidelines for Government Agencies
* **Core Provisions Implemented:** Standardized REST APIs, strict data validation, defense against unauthorized public access to government datasets.

### 3. DOST Region V (Bicol) Strategic Science & Technology Plan
* **Scope:** Provincial Science and Technology Offices (PSTOs) in:
  1. Albay (Legazpi City)
  2. Camarines Norte (Daet)
  3. Camarines Sur (Naga City / Pili)
  4. Catanduanes (Virac)
  5. Masbate (Masbate City)
  6. Sorsogon (Sorsogon City)
* **Flagship Programs:**
  * **SETUP:** Small Enterprise Technology Upgrading Program
  * **GIA:** Grants-in-Aid Research & Development
  * **CEST:** Community Empowerment through Science & Technology
  * **Scholarships:** Science Education Institute (SEI) Regional Scholarship Tracking

---

## Tier 4: Cybersecurity & Defensive Engineering Standards

### 1. OWASP Top 10 Web Application Security Risks (2021 & Beyond)
* **Organization:** Open Web Application Security Project (OWASP Foundation)
* **Official Standard:** [owasp.org/Top10](https://owasp.org/Top10/)
* **Vulnerabilities Prevented in Our Scanner (`scanner.mjs`):**
  * **A01:2021 - Broken Access Control:** Server-side role checks (never trust client UI).
  * **A02:2021 - Cryptographic Failures:** Deprecation of MD5/SHA1 in favor of bcrypt/Argon2.
  * **A03:2021 - Injection:** Parameterized queries and ORM bindings to eliminate SQLi.
  * **A07:2021 - Identification & Authentication Failures:** Protection against hardcoded API tokens.

### 2. OWASP Application Security Verification Standard (ASVS 4.0)
* **Official Standard:** [owasp.org/www-project-application-security-verification-standard](https://owasp.org/www-project-application-security-verification-standard/)
* **Focus:** Level 2 (Standard Enterprise & Government Applications) requirements for input validation, sanitization, and session security.

---

## Tier 5: Classical Software Architecture & Engineering Foundations

### 1. Enterprise Architecture & Clean Code
* **Martin Fowler:** *Patterns of Enterprise Application Architecture* (Addison-Wesley, 2002)
  * Concepts: Service Layer, Repository Pattern, Separated Interface.
* **Robert C. Martin ("Uncle Bob"):** *Clean Architecture: A Craftsman's Guide to Software Structure and Design* (Prentice Hall, 2017)
  * Concepts: Independent of UI, independent of Database, Dependency Inversion Principle (DIP).
* **Eric Evans:** *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Addison-Wesley, 2003)
  * Concepts: Bounded Contexts, Ubiquitous Language (e.g. Region V Provinces, DOST Grant Models).

### 2. Version Control & Handover Standards
* **Conventional Commits Specification (v1.0.0):** [conventionalcommits.org](https://www.conventionalcommits.org/)
  * Structural formatting for automated changelog generation and professional commit hygiene (`feat:`, `fix:`, `docs:`, `refactor:`).

---

## Tier 6: High-Impact Video Lectures & Tech Talks

1. **Andrej Karpathy (Former Director of AI at Tesla / OpenAI Founder):**
   * *"Software 2.0 and the State of AI"* & *"Building LLM Agents from First Principles"*
   * Key takeaway: LLMs are reasoning engines, not factual knowledge vaults; they must be provided with structured scaffolding and tools.
2. **Harrison Chase (CEO, LangChain) & Eugene Yan:**
   * *"Design Patterns for LLM Systems in Production"*
   * Key takeaway: Deterministic workflow chains beat open-ended autonomous agent loops every time in mission-critical systems.
3. **Anthropic Official Release Briefing (Nov 2024):**
   * *"Introducing the Model Context Protocol"*
   * Key takeaway: Standardizing IDE-to-tool context boundaries to eliminate brittle one-off connectors.

---

### How to Cite This When Defending Your Work

When your DOST supervisor, lead engineer, or a commercial client asks:
> *"Why did you design the system with this workflow?"*

You can confidently answer:
> *"We based our development lifecycle on **Spec-Driven Development** (documented by GitHub and Anthropic's agent architecture guidelines), combined with **OWASP ASVS** and **Philippine Data Privacy Act (RA 10173)** technical safeguards. Every requirement is documented as a contract first, implemented with clean service-layer separation, and audited for security before committing."*

---

## Tier 7: International ISO/IEC Standards & Generative Engine Optimization (GEO)

### 1. ISO/IEC 25010:2023 (Software Product Quality Model - SQuaRE)
* **Standard:** Systems and software engineering — Software product quality model (Updated 2023).
* **The 9 Quality Characteristics:** Functional Suitability, Performance Efficiency, Compatibility, Interaction Capability, Reliability, Security, Maintainability, Flexibility, and Safety.
* **Application in Suite:** Governs the backend architecture, service boundaries, and system robustness checks of @backend-god and @architect.

### 2. ISO/IEC 27001:2022 & ISO/IEC 27701:2019 (ISMS & PIMS)
* **Standard:** Information Security Management Systems (ISMS) & Privacy Information Management Systems (PIMS).
* **Application in Suite:** Technological controls for identity management, cryptographic standards (Argon2id/TLS 1.3), data minimization, dynamic PII masking, and data retention compliance.

### 3. GEO: Generative Engine Optimization (KDD '24)
* **Authors:** Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan, Ameet Deshpande (Princeton University & IIT Delhi, 2024)
* **ArXiv Citation:** https://arxiv.org/abs/2311.09735
* **Application in Suite:** Content and schema optimization ensuring business properties are cited and recommended by AI engines (ChatGPT Search, Perplexity, Google AI Overviews) up to 40% more often.

