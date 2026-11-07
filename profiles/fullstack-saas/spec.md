# Feature Specification: [Feature Name]

**Profile:** Modern Full-Stack SaaS  
**Stack:** Next.js / TypeScript / Tailwind CSS / Prisma / PostgreSQL  

---

## 1. Product Requirements & User Flow
* **Feature:** [e.g. Multi-Tenant Workspace Switching / Real-time Analytics]
* **User Flow:**
  1. User navigates to `/[workspace]/[feature]`
  2. System verifies session and tenant membership
  3. UI displays optimistic state and streams asynchronous data

---

## 2. Technical Acceptance Criteria
- [ ] 100% Type-Safe: Zod schemas on API input & database mutations.
- [ ] Optimistic UI with rollback on network failure.
- [ ] Zero unhandled errors; Toast notifications for feedback.
- [ ] Performance: First Contentful Paint < 1.2s.
