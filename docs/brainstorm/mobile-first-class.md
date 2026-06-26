# First-class mobile UX

**Status:** OPEN — brainstorm only; nothing here is implemented yet.

## Problem

The mobile experience is still desktop-shaped with patches. We've added touch
gestures (pinch, double-tap-drag zoom, pan momentum), moved the action buttons to
the lower-right, and given the detail panel a bottom Close — all via media
queries layered onto the desktop layout. It works, but it doesn't *feel* native:
the graph is a sprawling desktop canvas squeezed onto a phone, hover affordances
don't exist on touch, targets are small, and the entry experience (a 370-node
graph zoomed out to illegibility) is poor on a small screen.

## How do the big apps actually do it?

Worth being precise, because "do they just use media queries?" has a real answer:

- **Native apps are separate.** Instagram/Facebook on a phone are native (React
  Native / Swift / Kotlin) codebases, not the website. So their *best* mobile UX
  isn't a responsive website at all. We're a pure-frontend web app, so that path
  means a PWA, not parity with their native apps.
- **Their mobile *web* is responsive + adaptive, not media-queries alone.** Two
  distinct techniques, usually combined:
  - **Responsive** (media/container queries): same DOM, CSS reflows it. Great for
    *layout* — column counts, spacing, hiding chrome. Cheap. But it can't change
    *interaction models* or swap a sidebar for a bottom tab bar cleanly.
  - **Adaptive** (a breakpoint read in JS): a `useIsMobile()`-style hook branches
    the **component tree** — render a bottom tab bar on mobile and a sidebar on
    desktop, a full-screen sheet instead of a popover, a different navigation
    altogether. This is how the "mobile view is completely different" feeling is
    achieved. Facebook's web does this heavily (different nav, composer, modals).
- **Touch-first interaction** is the third leg: bottom-anchored controls (thumb
  reach), full-screen sheets with drag-to-dismiss, larger hit targets (≥44px), no
  reliance on hover, gesture navigation.

**Takeaway:** media queries handle layout; an adaptive breakpoint hook swaps the
*surfaces that differ in kind*; touch-first principles guide both. We should do
all three, not pick one.

## Where this app stands

Done: pinch zoom, double-tap-drag zoom, pan momentum, bottom-right action stack,
full-width search, single-row field bar, bottom panel-close, hidden +/- controls.

Lacking:
1. **Entry experience** — opening on a zoomed-out 370-node graph is meaningless
   on a phone. No legible starting point. (The desktop field-tour is desktop-only.)
2. **Detail panel** is a full-screen overlay that animates from the right; it
   isn't a proper bottom sheet (no drag handle, no snap points, no peek).
3. **Hover-only affordances** — the node tooltip and edge-highlight are hover
   features with no touch equivalent; long-press is the only bridge and it's rough.
4. **Discovery** — filters/search/index are buried behind small icons; on mobile
   the primary task is probably *search → read*, not *pan a graph*.
5. **Targets & legibility** — nodes are small; tapping precisely is hard.

## Options

- **A. Pure responsive (media queries only).** Keep one component tree, restyle
  with breakpoints. *Pro:* simplest, no JS branching. *Con:* can't fix the
  interaction-model gaps (sheet vs panel, tab bar vs icons, search-first entry);
  this is the "patches" path we're already on.
- **B. Adaptive surfaces via a `useIsMobile()` breakpoint hook.** Keep the shared
  graph canvas and data, but branch the *chrome*: render mobile-specific
  components for the detail panel (bottom sheet), actions (bottom bar / sheet),
  search (full-screen overlay), and a mobile entry. *Pro:* matches how real apps
  feel "completely different" without a second codebase; surgical. *Con:* some
  duplicated component logic; must keep a single source of truth for state.
- **C. Separate mobile-first entry route.** A `#/m` (or UA/breakpoint redirect)
  that opens **search-first / list-first** — the index or a search field front
  and center — and treats the graph as a secondary "explore" mode. *Pro:* best
  task fit for phones. *Con:* two front doors to maintain; risks divergence.
- **D. PWA polish (orthogonal).** Manifest, installable, standalone display,
  safe-area insets, theme-color. Cheap, complements any of the above, makes it
  feel app-like when added to home screen.

## Leaning

**B as the spine, a dash of C for entry, D as a free win.** Concretely:

1. **`useIsMobile()`** — one hook (`matchMedia('(pointer: coarse)')` or a width
   breakpoint, SSR-safe), the single switch the app branches on. Avoid scattering
   raw media queries for *behavioral* differences; keep CSS media queries only for
   pure layout.
2. **Detail panel → bottom sheet** on mobile: drag handle, snap points
   (peek / half / full), swipe-down to dismiss (we already have the velocity
   machinery from `usePanMomentum` to reuse for the sheet fling). Replaces the
   right-overlay.
3. **Actions → a single bottom bar** (search · filter · settings) with sheets
   that slide up, instead of corner icons + upward popovers.
4. **Mobile entry** — on first load, open **focused on one field at a legible
   zoom** (reuse `planFieldTour`'s per-cluster framing for a static first frame,
   no auto-pan), or open the search overlay. Never the zoomed-out whole graph.
5. **Touch affordances** — tap a node = open sheet directly (skip hover tooltip);
   bigger effective hit area; selected/related edges highlight on tap.
6. **PWA** — `manifest.webmanifest`, `theme-color`, `display: standalone`,
   `env(safe-area-inset-*)` everywhere (we already use it for the panel close).

## Open questions

- Is the graph even the right *primary* surface on a phone, or is it
  "search/read first, explore-graph second"? (Leaning the latter — drives C.)
- Bottom-sheet library vs. hand-rolled? Hand-rolled keeps the zero-dependency
  ethos and we already have the gesture/momentum primitives.
- One breakpoint, or distinguish phone vs tablet? Start with one (`coarse`
  pointer), revisit if tablet layout warrants a third column.

## Cost sketch

- `useIsMobile` + branch the three chrome surfaces: ~medium.
- Bottom sheet (hand-rolled, reusing momentum): ~medium, the bulk of the work.
- Mobile entry frame: ~small (reuses `planFieldTour`).
- PWA manifest + safe-area sweep: ~small.
