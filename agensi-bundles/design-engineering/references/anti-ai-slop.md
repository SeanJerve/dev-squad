# Anti-AI-Slop Design Heuristics

1. **Destroy the Centered Hero Card:** AI default is a centered card with a giant generic gradient border. Use asymmetric, editorial layouts with intentional whitespace.
2. **Eliminate 0.3s Linear Transitions:** Linear transitions look robotic. Use spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Respect Corner Radius Math:** Child radius = Parent radius - Padding. Nested identical radii look amateurish.
4. **Kill Generic Gradient Text:** Never put rainbow or purple-to-blue gradient text unless explicitly mandated by client branding.
5. **No Fake Shadows:** AI loves `shadow-2xl` on every card. Use subtle 1px border lines (`border border-zinc-800`) with minimal drop shadows.
6. **Support Active States:** Buttons must press in (`scale-[0.98]` or `translate-y-[1px]`) on click.
7. **No Empty State Dead Ends:** Every empty state must have a single primary call to action.
