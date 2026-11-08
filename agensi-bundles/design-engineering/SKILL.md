---
name: design-engineering
description: Design engineering taste, UI craftsmanship, and physics-based motion. Synthesizes Emil Kowalski principles with anti-AI-slop heuristics to make web applications feel bespoke, polished, and tactile.
version: 1.0.0
author: Sean Jerve
pricing: $19.00 USD
category: Frontend & Design Engineering
tags: [design-engineering, animation, tailwind, motion, micro-interactions, anti-slop, emil-kowalski]
---

# Design Engineering & Craft &bull; Anti-AI-Slop Standard

Elevate your AI coding agent from generating generic, soul-less "AI slop" interfaces into crafting bespoke, responsive, and tactile software.

Synthesizes the design engineering philosophy of **Emil Kowalski (animations.dev)** with rigorous optical hierarchy and micro-interaction engineering.

---

## 🎨 The 5 Pillars of Design Engineering

Whenever designing, reviewing, or generating frontend components, enforce these 5 craftsmanship rules:

### 1. Zero Linear Animations (Spring Physics Only)
- **The Rule:** Nature does not move in linear or rigid cubic-bezier curves.
- **Implementation:** Use damped springs or rapid-deceleration curves:
  - Rapid enter: `cubic-bezier(0.16, 1, 0.3, 1)` (Duration: 200ms - 300ms max).
  - Subtle exits: `cubic-bezier(0.7, 0, 0.84, 0)` (Duration: 150ms).
- **Zero Sluggishness:** Never use animations longer than 350ms for basic state transitions. Modals and dropdowns must feel instantaneous.

### 2. The 4px / 8px Spatial Scale
- **Optical Consistency:** Padding and margins must strictly adhere to the 4px/8px scale (`p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8`).
- **Inner vs. Outer Radius:** Child corner radius must be proportional to parent corner radius:
  $$\text{Radius}_{\text{inner}} = \max(0, \text{Radius}_{\text{outer}} - \text{Padding})$$
  *(Prevents awkward nested border curves that scream AI-generated).*

### 3. Tactile Micro-Interactions
- Every interactive element (button, card, toggle, tab) must have:
  - Hover state (subtle brightness shift or border glow).
  - Active / Press state (`scale-[0.98]` or `translate-y-[1px]`).
  - Focus-visible ring with optical offset (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  - Disabled state with `cursor-not-allowed` and lowered opacity.

### 4. Typography Hierarchy & Contrast (WCAG 2.1 AA)
- Never pair generic system fonts without purposeful hierarchy.
- Contrast ratio between text and background must meet minimum **4.5:1** for regular text and **3:1** for large headings.
- Restrict typography to 3 sizes per view: Title (Semibold), Body (Regular), and Monospace / Caption (Muted).

### 5. Defensive State Engineering
- Every asynchronous component must support 4 distinct visual states:
  1. **Loading:** Skeleton loader matching component geometry (no layout shifting).
  2. **Empty:** High-signal empty state with actionable recovery CTA.
  3. **Error:** Non-destructive error message with inline retry trigger.
  4. **Success:** Smooth transition into populated data view.

---

## 🛠️ Included Assets & Templates
- `templates/motion-curves.css` — High-performance spring curves and micro-interaction classes.
- `templates/component-craft.tsx` — Reference React/Tailwind component with tactile feedback.
- `references/anti-ai-slop.md` — 10 heuristics to spot and destroy AI-generated design slop.
