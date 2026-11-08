---
name: ui-motion-craft
description: >-
  Strict UI motion design, animation decision frameworks, and physics-based easing curves.
  Based directly on Emil Kowalski's animation philosophy (animations.dev).
  Use whenever adding, critiquing, or refining animations, transitions, modals, toasts,
  or micro-interactions to ensure zero sluggishness and 60fps performance.
---

# UI Motion Craft & Animation Standards

Based on Emil Kowalski's animation engineering rules and `animations.dev`.

---

## 1. The 3-Step Animation Decision Framework

Before writing a single line of CSS transition or Framer Motion code, answer these questions in strict sequence:

### Step 1: Should this animate at all? (The Frequency Gate)

| Frequency of Interaction | Motion Rule | Example |
| :--- | :--- | :--- |
| **100+ times / day** | **NO ANIMATION. EVER.** | Keyboard shortcuts, command palettes (Raycast/Spotlight), tab switching. |
| **Tens of times / day** | Near-imperceptible (<150ms) or none. | List item hover, row selection. |
| **Occasional** | Standard animation (180ms – 250ms). | Modals, notification toasts, dropdown menus, drawers. |
| **Rare / First-time** | The Delight Budget lives here (300ms – 500ms). | Onboarding celebration, checkout success, reward unlock. |

> [!CAUTION]
> **Never animate keyboard-initiated actions.** Keyboard actions demand instantaneous reaction. Adding motion to keyboard shortcuts creates perceived input lag.

---

### Step 2: What is the purpose of the motion?
Every animation must have a verifiable functional purpose:
* **Feedback:** Confirming the interface registered a click/tap (e.g. `:active` scale down).
* **Spatial Consistency:** Showing where an element originated from (e.g. popover expanding from its trigger).
* **State Indication:** Making an asynchronous toggle or loading state clear.
* **Preventing Jarring Teleportation:** Bridging content that would otherwise flash abruptly.

*If the only reason is "it looks cool" on an element users see often &rarr; DO NOT ANIMATE IT.*

---

### Step 3: What easing curve and duration must be used?

1. **Entering Elements (Modals, Toasts, Dropdowns):**
   * Must use **`ease-out`** (starts fast, decelerates gracefully).
   * **Never use `ease-in` for entering elements.** `ease-in` starts slowly, making the UI feel laggy.
   * Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy spring-like curve) or `cubic-bezier(0, 0, 0.2, 1)`.
   * Duration: **180ms to 240ms** (keep under 300ms maximum).

2. **Exiting Elements:**
   * Must use **`ease-in`** or fast `ease-out`. Elements exiting should get out of the user's way faster than they entered (150ms – 180ms).

3. **Scale Transformations:**
   * **Never use `transform: scale(0)`.** In the physical world, objects do not materialize from a microscopic zero-point.
   * Use **`transform: scale(0.95); opacity: 0;`** entering to **`transform: scale(1); opacity: 1;`**.

---

## 2. The Golden Performance Rules

- **GPU Composite Layer Only:** Only animate `transform` and `opacity`. Never animate `width`, `height`, `margin`, `top`, or `left` (these trigger expensive browser reflow and layout recalculations).
- **No `transition: all`:** Explicitly declare the animated property: `transition: transform 200ms ease-out, opacity 180ms ease-out`.
- **Blur Limits:** If using animated backdrop blur, keep blur values under `20px` to avoid GPU frame drops on mobile devices.
- **Respect User Accessibility:** Always include `@media (prefers-reduced-motion: reduce)` to disable non-essential motion.

---

## 3. Mandatory Review Format

When reviewing or refactoring UI motion, always use a markdown table with Before/After/Why columns:

| Before | After | Why |
| :--- | :--- | :--- |
| `transition: all 300ms` | `transition: transform 200ms ease-out, opacity 180ms ease-out` | Avoid `all`; animate GPU compositor properties only. |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Physical realism; objects scale from near-full size. |
| `ease-in` on dropdown menu | `ease-out` with custom snappy bezier | `ease-in` feels sluggish; `ease-out` provides instant feedback. |
| Command palette with 300ms fade | Instant zero-motion open | Keyboard actions must be instantaneous. |
