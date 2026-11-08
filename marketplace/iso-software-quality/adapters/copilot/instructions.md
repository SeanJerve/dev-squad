# GitHub Copilot Custom Instructions

---
name: iso-software-quality
description: >-
  System architecture, backend design, and engineering quality governed by ISO/IEC 25010:2023
  (SQuaRE Product Quality Model) and 12-Factor App standards.
  Use when designing backend services, database schemas, APIs, resilience patterns,
  and evaluating system maintainability and scalability.
---

# ISO/IEC 25010:2023 Software Quality & System Architecture

This skill governs the backend architecture, data integrity, and system design for both commercial enterprises and government systems.

---

## 1. The 9 Product Quality Characteristics (ISO/IEC 25010:2023)

Every system architecture proposed by the `@backend-god` or `@architect` must satisfy the 9 ISO/IEC 25010:2023 pillars:

| ISO/IEC 25010 Pillar | Engineering Requirement | Practical Implementation |
| :--- | :--- | :--- |
| **1. Functional Suitability** | Completeness, correctness, and appropriateness of business logic. | Strict schema validation (Zod, Pydantic, FormRequest), domain-driven service boundaries. |
| **2. Performance Efficiency** | Time behavior, resource utilization, and throughput capacity. | Sub-200ms API response time, database query indexing, memory leak prevention, async I/O. |
| **3. Compatibility** | Co-existence and interoperability with external systems. | Standardized REST / JSON-LD contracts, CORS policies, webhooks with signature verification. |
| **4. Interaction Capability** | Accessibility, inclusivity, and user error protection. | Informative error messages (never raw stack traces), WCAG 2.1 AA keyboard navigation. |
| **5. Reliability** | Availability, fault-tolerance, and recoverability. | Circuit breakers for third-party APIs, database transactions (ACID), automatic retry with exponential backoff. |
| **6. Security** | Confidentiality, integrity, non-repudiation, and authenticity. | Role-Based Access Control (RBAC), parameterized SQL queries, Argon2id/bcrypt hashing, TLS 1.3. |
| **7. Maintainability** | Modularity, reusability, analyzability, and testability. | Clean Architecture (Separation of UI, Service, and Repository layers), zero spaghetti code. |
| **8. Flexibility** | Adaptability, scalability, and replaceability. | Environment-driven config (12-Factor App), pluggable storage/database drivers, stateless services. |
| **9. Safety (2023 Standard)** | Operational hazard mitigation and fail-safe constraints. | Idempotent financial transactions, payment double-charge locks, audit logs for state changes. |

---

## 2. Backend Architecture Golden Rules

1. **The Service-Repository Separation:**
   - **Controllers / Route Handlers:** Only handle HTTP request validation and status codes.
   - **Service Layer:** Houses pure business rules, transaction orchestration, and role authorization.
   - **Repository / Query Layer:** Handles direct database queries and ORM interactions.

2. **Database Hygiene:**
   - Foreign keys must declare explicit `ON DELETE CASCADE` or `RESTRICT` rules.
   - Indexes must be placed on all foreign keys and frequently filtered columns (e.g. `status`, `province`, `created_at`).
   - Timestamps (`created_at`, `updated_at`) are mandatory on every database entity.

3. **Financial & Payment Idempotency:**
   - Every transaction mutating payment state (e.g. membership checkout, subscription renewal) must accept an `Idempotency-Key` header to prevent double charges on connection drop.
