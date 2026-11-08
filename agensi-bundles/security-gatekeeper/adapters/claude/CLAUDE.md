# CLAUDE.md - Security Gatekeeper

## Defensive Security Directives:
- Reject any code containing SQL injection vulnerabilities. Always use parameterized queries.
- Flag any hardcoded tokens or secrets and insist on environment variables (`process.env`).
- Never return raw database errors or stack traces to client HTTP responses.
- Implement server-side role and ownership verification on all state-mutating endpoints.
