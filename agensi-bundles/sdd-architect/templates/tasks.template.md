# Implementation Task Checklist: [Feature Name]

**Spec:** `spec.md` | **Plan:** `plan.md`  

---

### Phase 1: Database & Persistence Layer
- [ ] 1.1 Draft migration file with schema tables, indexes, and constraints.
- [ ] 1.2 Implement Repository / Data Access Object with parameterized queries.
- [ ] 1.3 Write integration test verifying basic CRUD operations.

### Phase 2: Service Layer & Validation
- [ ] 2.1 Implement Zod / Joi validation schema for incoming payloads.
- [ ] 2.2 Implement service logic with business rule checks and authorization gates.
- [ ] 2.3 Write unit tests covering both valid inputs and known edge cases.

### Phase 3: API & Route Handlers
- [ ] 3.1 Define HTTP route handler with standard status code mappings.
- [ ] 3.2 Add rate-limiting and defensive error catch boundaries.
- [ ] 3.3 Test with mock HTTP requests.

### Phase 4: UI & Frontend Experience
- [ ] 4.1 Build responsive component hierarchy following 4px/8px optical grid.
- [ ] 4.2 Wire optimistic state updates and loading spinners / skeletons.
- [ ] 4.3 Implement error toast notifications and keyboard navigation (Tab/Esc).

### Phase 5: Verification & Release
- [ ] 5.1 Run static security scan for secrets, SQLi, and unsanitized HTML.
- [ ] 5.2 Execute test suite and verify clean test passes.
- [ ] 5.3 Generate conventional commit: `feat([scope]): implement [feature-name]`.
