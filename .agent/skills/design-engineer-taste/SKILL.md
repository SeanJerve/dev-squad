---
name: design-engineer-taste
description: >-
  Design engineering taste, UI polish, micro-interactions, and visual craftsmanship.
  Synthesizes Emil Kowalski's design engineering philosophy with anti-AI-slop principles.
  Use whenever designing, refining, or reviewing user interfaces, components, typography,
  or layout aesthetics to ensure software feels handcrafted and premium.
---

# Design Engineering Craft & Taste

## Core Philosophy (Adapted from Emil Kowalski & Vercel/Linear Craft)

### 1. Taste is Trained, Not Innate
In a world where generic AI code produces mediocre, bootstrap-like "AI slop" (flat blue buttons, generic cards, boring layouts), **taste is the primary competitive differentiator**.
- Don't just make an interface work; study why the world's best interfaces feel tactile, responsive, and alive.
- Good software feels invisible: when every detail behaves exactly as the user intuitively expects, they never have to think about the UI.

### 2. Unseen Details Compound
> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham

The difference between amateur and elite web design lies in micro-adjustments:
- Typography tracking on large headings.
- Tabular figures for fluctuating numbers.
- Sub-pixel borders and layered ambient shadows.
- Active feedback (`:active` scale down) confirming the UI heard the user.

---

## The UI Polish Cheatsheet (Golden Rules)

| Issue / Flaw | The "Taste" Fix | Why It Matters |
| :--- | :--- | :--- |
| **Numbers jitter when changing** | `font-variant-numeric: tabular-nums` | Monospaced digits prevent layout shifts during counter updates. |
| **Large headings look disconnected** | `letter-spacing: -0.02em` to `-0.03em` | Display typography requires tighter kerning to hold visual tension. |
| **Body text feels exhausting to read** | `max-width: 65ch` | Human eyes fatigue when line length exceeds ~65–75 characters. |
| **Buttons feel stiff and dead** | `transform: scale(0.97)` on `:active` | Gives instant tactile feedback that the button was physically pressed. |
| **Avatars/Icons squished into ovals** | `flex-shrink: 0` | Prevents flexbox containers from crushing fixed-ratio media. |
| **Gradient fade has a sharp, visible line** | Eased color stops (3+ progressive opacity steps) | Eliminates harsh banding at gradient boundaries. |
| **Dropdown / Modal feels sluggish** | `ease-out` with custom bezier, duration `< 250ms` | `ease-in` feels delayed; `ease-out` reacts immediately to user input. |
| **Popover expands from the wrong place** | `transform-origin: var(--trigger-anchor)` | Popovers scale from their trigger button; modals scale from viewport center. |
| **Singular/Plural errors ("1 members")** | `Intl.PluralRules` formatting | Polished software never ships lazy grammar strings. |
| **Timestamps reading "340 days ago"** | Switch to absolute date (`Oct 14, 2025`) after 7 days | Relative time is only useful for recent events. |

---

## Anti-AI-Slop Visual Standards

When generating UI, the agent must **NEVER**:
1. Use raw flat background colors without subtle borders (`border border-slate-800` or `border-white/10`).
2. Use pure black (`#000000`) for text or backgrounds; use deep rich zinc/stone/slate (`#09090b` or `#0c0a09`).
3. Use generic, uninspired hero layouts with a stock centered heading and two identical flat buttons.
4. Animate layout properties (`width`, `height`, `top`, `left`, or `transition: all`). Only animate `transform` and `opacity`.
