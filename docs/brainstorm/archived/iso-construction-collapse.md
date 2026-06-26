# Iso-construction collapse

**Status:** DONE — shipped as `f15c09b` (fold equivalent constructions under their canonical).

## Problem

Equivalent constructions of one canonical object (ℝ via Dedekind cuts vs. Cauchy sequences) clutter the graph with parallel dependency chains. Most of the graph only cares about the canonical object, not which construction realizes it. We wanted to declutter without losing the constructions, and ideally without editing the content-agent-owned node data.

## Options

- **A. Collapse-by-default with a per-canonical expand badge** — constructions are hidden under the canonical; a `+N` badge expands just that canonical.
- **B. A theorem/kind filter** that happens to hide constructions — wrong axis; constructions aren't a `kind`.
- **C. Distinct ≅ styling** for construction→canonical edges so they read as isomorphisms, not prerequisites.
- **D. A global toggle** to reveal/hide all constructions at once.

## Decision

**A (core) + C (styling) + D (global toggle).** A feature-owned overlay (`variants.ts`) declares iso-groups; no node-data edits. The key correctness call: only list **exclusively-used** scaffolding as private to a construction. Verified against the real dependency graph — `cauchy-sequence` is also used by `banach-fixed-point`, and `rationals`/`quotient-set` are shared, so a naive "hide everything only the constructions use" rule would wrongly hide ℚ (core skeleton). Only `dedekind-cut` is genuinely private and hides with the Dedekind construction.

## Outcome

- `src/data/variants.ts` — feature-owned iso-group declarations (canonical + variants + private scaffold).
- Layout computes over the *visible subset*; expanding/collapsing relayouts via the `hidden: Set<string>` → `visibleNodes` chokepoint.
- A `+N` / `−` badge on the canonical expands/collapses just it; a global Settings toggle ("Constructions: Collapsed / Shown") reveals all and hides the badges.
- Construction→canonical edges render **dashed** (an isomorphism, not a prerequisite).
- The camera frames the canonical + revealed constructions instead of refitting the whole graph.

## Legacy

This mechanism is the foundation for the **alternative-foundations** design (see `../alt-foundations.md`): a foundation switch is the same operation generalized from one canonical to several, keyed by foundation instead of an expand-toggle.
