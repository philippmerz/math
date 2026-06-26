# Alternative foundations in a consequence-flowing graph

**Status:** OPEN — design agreed in principle; awaiting decisions (§8) before any implementation.
**Depends on:** the iso-construction-collapse mechanism (shipped — see `archived/iso-construction-collapse.md`).
**Origin:** "I want the graph to flow through consequences, so I'm not sure we can add e.g. type-theoretic foundations. Most concepts don't care about foundations though, so duplicating the entire graph to change ~5% scattered throughout isn't elegant either. Is there a middle way?"

---

## TL;DR — yes, there's a middle way

Keep **one foundation-agnostic trunk authored once**, add a **thin foundation-tagged realizer layer beneath it**, and an **orthogonal logic overlay on top** — all routed through the single `hidden: Set<string>` chokepoint the iso-collapse already uses. **Duplication then scales with the ~5–6% foundation-sensitive seam, never with the graph.**

---

## 1. The reframe

The dilemma assumes the graph is *global* — ZFC at the bottom, everything built on it all the way up. It isn't: the graph is **local**. An edge records what a concept *immediately* cites, and almost nothing immediately cites a ZFC axiom.

The census confirms it: of **319 nodes, only a handful outside `set-theory.ts` cite a deep ZFC-root id** — `sigma-algebra → power-set`, `metric-space`/`topological-space → set`, `natural-number-arithmetic → recursion-theorem` (≈4–8, depending on whether the shared primitives `set`/`function` are counted as roots). Everything else depends on an **interface** — `function`, `real-numbers`, `group`, `ring` — never on `power-set` or `regularity`. Pythagoras cites field/metric structure; "every PID is a UFD" cites the ring axioms and an ACC argument. Neither ever inspects what a real number *is as a set*.

So foundation-dependence is not smeared across the graph. It **concentrates in a thin interface layer** (~14 nodes: ℕ, ℝ, function, equality, quotient, ordered pair, …) that every foundation must supply but each builds differently, sitting above a ~24-node root cluster.

**We already built foundation-swapping in miniature.** [variants.ts](../../src/data/variants.ts): `real-numbers` is a canonical interface node; `dedekind-reals`/`cauchy-reals` are two constructions collapsed under it; the bulk depends on `real-numbers`, never on the cut. A foundation switch is *structurally the same operation*, generalized from one canonical to several and keyed by foundation, re-rooting through the existing `hidden → visibleNodes → relayout` path in [layout.ts](../../src/graph/layout.ts).

## 2. Three kinds of divergence (do not conflate them)

The single biggest design trap is treating these as one thing. Each needs its own mechanism:

- **(a) Same concept, different construction.** ℕ = von Neumann ω (ZFC) / inductive type (MLTT) / NNO (categorical); ℝ via Dedekind vs Cauchy. → the **variants.ts / IsoGroup** mechanism, generalized.
- **(b) Foundation-exclusive nodes.** Univalence, higher inductive types, ∞-groupoid/path structure (type theory only); cumulative hierarchy, regularity, proper classes (material set theory only). No faithful counterpart elsewhere — **never merge** them with an "analogue" (a Grothendieck universe and a type universe play analogous *roles*; they are not the same object). → **inclusion/exclusion**.
- **(c) Logic-axis conditional validity.** "Every vector space has a basis", Zorn, Hahn–Banach: *valid classically, unavailable constructively*; a few statements even *flip truth* ("all ℝ→ℝ continuous"). This is about a proof's **logical cost** and a statement's **truth status**, not how objects are built. → a **per-node/edge principle annotation, recolor not hide**.

**Why the two obvious options both fail.** *Duplicate the graph*: forks the ~90% agnostic bulk to change a concentrated ~10%, desyncs on every content fix, and still can't represent "valid but needs AC" (both forks just *assert* their theorems hold). *A single foundation enum*: collapses two **orthogonal** axes — ontology × logic — into one line (classical HoTT and constructive set theory both exist); handles only kind (b); and mismodels (c) as edge-deletion, erasing *which* principle a proof costs.

## 3. The spectrum of options considered

| # | Approach | Core trade-off |
|---|---|---|
| 1 | **Membership tags** (exclude-lists per foundation, unioned into the hidden set) | Trivial, flow- and boundary-clean — but solves **only kind (b)**; can't express alt-constructions or truth-flips. |
| 2 | **Interface + per-foundation constructions** (generalized variants.ts) | Soundest committed model; right trichotomy — but gated on authoring real construction nodes; its logic half needs to be more than a flat list. |
| 3 | **Base + named patches** (`add`/`hide`/`rewire` diffs) | Can carry per-foundation *definition text* — but a diff can't flip a truth value, `rewire function→Π` closes a layout cycle, and it desyncs the derived indexes in `graph.ts`. |
| 4 | **Two-axis conditional-validity recolor** | Best *vocabulary* (two real axes, `refutedBy`, serializable "why greyed?") — but logic is not a linear chain. |
| 5 | **Convergent bases** (two roots → one trunk, no switch) | Most pedagogically honest ("same math, different foundations") — but a single trunk over-asserts uniform validity, and it's not a pure overlay. |

The recommendation **layers the best of each**, using each only for the divergence it actually models.

## 4. Recommended design — a three-layer overlay

### Layer 0 — Neutral interfaces (the one content-agent prerequisite)

Today `natural-numbers` *is* the von Neumann construction (it carries the ω definition and `dependencies: ['infinity', …]`) — it is construction-**fused**, and you cannot foundation-swap a node that is already one specific construction. So the only content-agent task is to **cleave the ~4 fused interface nodes**:

- `natural-numbers` → **neutral interface**, definition = the *universal property* (Peano/induction/NNO; unique up to unique iso), `dependencies: []`.
- `natural-numbers-vn` → ZFC realizer (existing ω text moves here verbatim), deps `['infinity','successor', …]`.
- `natural-numbers-nat` → type-theoretic realizer, deps `['inductive-type']`.

`real-numbers` is **already cleaved this way** via variants.ts — it is the working template. Also decouple `lambda-calculus → function` so it depends on Π-types, not the set-theoretic `function`. (This is narrow: only the `lambda-calculus` node currently hangs off set-theoretic `function` — the rest of the type-theory subgraph already routes through `martin-lof-type-theory`/`dependent-type`/`inductive-type` — but left as-is it makes the type root visibly hang off ZFC and lets rewire-style designs close a layout cycle.) This edits **no schema** (the 7 `MathNode` fields are preserved) and is small (~4 splits + ~8 realizer nodes — roughly what variants.ts already did once for ℝ).

### Layer 1 — Construction / exclusive overlay (feature-owned `foundations.ts`, twin of variants.ts)

Two **independent** selector axes — never one enum:

```ts
export type Ontology = 'material' | 'structural' | 'type'
export type Principle = 'lem' | 'ac-set' | 'dc' | 'countable-choice' | 'funext' | 'uip' | 'univalence'
export type FoundationPoint = { ontology: Ontology; logic: Principle[] }

// Foundation points are VALIDATED/NORMALIZED at construction (see invariant 3):
//   ac-set ⇒ lem (Diaconescu) auto-promotes; proof-relevant lem under univalence is rejected.
export const FOUNDATIONS: Record<string, FoundationPoint & { label: string }> = {
  zfc:  { ontology: 'material',   logic: ['lem', 'ac-set'], label: 'ZFC (material set)' },
  etcs: { ontology: 'structural', logic: ['lem', 'ac-set'], label: 'ETCS (structural)' },
  mltt: { ontology: 'type',       logic: [],                label: 'MLTT (constructive type)' },
  hott: { ontology: 'type',       logic: ['univalence'],    label: 'HoTT (univalent)' },
  // classical HoTT, IZF/CZF, topos … all expressible because the axes are independent
}
```

Generalized `IsoGroup` (additive superset of today's type, so the existing reals group keeps working):

```ts
export type Realizer = {
  node: string
  scaffold?: string[]          // nodes used EXCLUSIVELY by this realizer (variants.ts contract)
  coincidesIff?: Principle[]   // [] = unconditional iso to the canonical; ['countable-choice'] = the reals case
}
export type InterfaceGroup = {
  canonical: string                          // neutral interface node, never hidden
  realizers: Record<string /* ontology */, Realizer>
}
```

Foundation-exclusive map for kind (b):

```ts
// Keys marked (new) don't exist in the node data yet — author or drop them; the rest are existing ids to tag.
export const ONTOLOGY_ONLY: Record<string, Ontology[]> = {
  'homotopy-type-theory': ['type'], 'identity-type': ['type'], 'higher-inductive-type': ['type'], // last: (new)
  'regularity': ['material'], 'cumulative-hierarchy': ['material'], 'proper-class': ['material'],  // last two: (new)
}
```

Both maps compile to **one `Set<string>` of ids to hide** — deselected realizers (+ their `scaffold`) and ontology-mismatched exclusives (hidden via a `dependentsById` reachability walk that stops at nodes with other support). That set is **unioned with `collapsedConstructionIds(...)`** and handed to `visibleNodes(hidden)` — the identical composition variants.ts uses today. **Zero layout-engine changes**; the bulk re-roots through the surviving realizer for free. The active realizer→canonical edge switches from dashed (`data.iso`, the "show all constructions" view) to a **solid derivation edge** when a single foundation is selected (it is now the root of the cascade).

### Layer 2 — Logic overlay (feature-owned, recolor not hide)

The logic axis is orthogonal and must not be folded into ontology. Model it as a **serializable per-node requirement** (a declarative object, not a function — so the "why greyed?" tooltip can cite the exact principle):

```ts
type Requirement = {
  needs?: Principle[]                    // checked by ENTAILMENT in a small poset (not a >= level)
  refutedBy?: Partial<FoundationPoint>[] // node is provably FALSE here — a DISTINCT status from "unavailable"
  note?: string                          // 'Equivalent to AC over ZF; constructively unavailable.'
}
export const NODE_REQ: Record<string, Requirement> = {
  'zorns-lemma':           { needs: ['ac-set'], note: 'Equivalent to AC over ZF.' },
  'well-ordering-theorem': { needs: ['ac-set'] },
  'hahn-banach-theorem':   { needs: ['ac-set'], note: 'Full generality needs choice.' },
  'basis':                 { needs: ['ac-set'], note: 'Only the infinite-dimensional case needs AC/Zorn.' },
}
```

Logic-conditional nodes are **recolored in place, never hidden** — so consequence chains stay visible-but-flagged ("needs AC — unavailable constructively"), preserving flow. Recolor is a UI-only annotation on `ConceptNodeData` (the graph-layer type), **not** on `MathNode` — exactly like the existing `iso`/`expand` flags.

## 5. Worked examples

| Concept | Representation |
|---|---|
| **ℕ** | Neutral interface (universal property); realizers `material: natural-numbers-vn`, `type: natural-numbers-nat`, `structural: nno`, all `coincidesIff: []` (provably iso). Select MLTT → vn/nno hidden, `nat`'s solid edge feeds the interface, all arithmetic/algebra above re-roots unchanged. The vn realizer's *definition text* flags junk theorems (`2 ∈ 3`) as encoding artifacts; the interface node never asserts them. |
| **ℝ** | Reuses today's iso-group verbatim. `canonical: real-numbers`, realizers `material: dedekind-reals/cauchy-reals` (classically coincident); a constructive `type: cauchy-reals-hit` flagged **`coincidesIff: ['countable-choice']`** — distinct node, because constructively the Cauchy reals need not equal the Dedekind reals without countable choice. Tooltip falls out of the data. |
| **function** | Neutral interface (domain/codomain/application). Realizers `material: function-graph` (set of pairs), `type: function-pi` (Π-type term). Function *equality* is a separate logic node `needs: ['funext']` — in intensional MLTT funext is not provable, so `function-pi` satisfies the extensional interface only given funext; never silently assert interface equivalence. |
| **equality** | The deepest interface — extensional proposition (ZFC) vs intensional identity type, UIP-unprovable (MLTT) vs proof-relevant path with h-levels (HoTT) are *different objects*, **not** iso constructions of one. Model as ontology-locked nodes with **no coincidence link** (do **not** put them in an `InterfaceGroup` — that record implies they realize one interface); `funext`/`uip` are separate annotated principles. (There is no `equality` node today — closest are the ZFC axiom `extensionality` and the MLTT `identity-type`; the neutral `equality` interface would be newly authored.) |
| **basis / dimension** (infinite-dim case needs AC/Zorn) | One bulk node (`basis`), never duplicated. `NODE_REQ['basis'] = { needs: ['ac-set'] }`. Valid + normal under ZFC/ETCS; **greyed but still in its consequence chain** under MLTT/HoTT. Its `zorns-lemma → choice` edge is kept as an ordinary prerequisite, *not deleted*. |
| **univalence** | Kind (b), type-only. It is a concept inside `homotopy-type-theory` today, so `ONTOLOGY_ONLY['homotopy-type-theory'] = ['type']`. Select any non-type ontology → it and its type-only dependents vanish via the reachability walk; never merged with the set-theoretic universe. Symmetrically `regularity`/`cumulative-hierarchy`/`proper-class` are `['material']` and vanish under MLTT/HoTT. |

## 6. What actually gets duplicated

Against the ~5% intuition (~319 nodes):

Using one consistent decomposition of the 319 nodes: ~24 ZFC root + ~14 interface + ~281 agnostic bulk.

- **~281 nodes (~88%) authored once, touched zero times** — depend on neutral interface ids, absent from every overlay map, default-valid everywhere. **No definitions are forked.**
- **Newly authored (the irreducible divergence):** ~4 interface splits (text *moves*, not copied) + ~8 realizer nodes (genuine math the foundations differ on; the ~13 type-theory nodes already exist) + ~120 lines of overlay tables.
- **Net ≈ 5–6% of nodes duplicated.** The *foundation-sensitive seam* is ~12% (the ~14 interface nodes that get *cleaved* + the ~24 ZFC root that gets *hidden* under other foundations + a few leaf couplings ≈ 38/319) — but cleaving and hiding are not copying.

**Duplication scales with the seam, never with the graph** — the property the request asked for. The "~5%" intuition is right about *duplication*; "~12%" is the right figure for *foundation-sensitivity*.

## 7. Incremental migration

**Ship first (pure feature-overlay, no second foundation, no content blocker):**
1. Add `foundations.ts` with the two-axis registry and a single `zfc` point = identity selection. Default = empty hidden set = today's graph exactly → opt-in, non-breaking.
2. Tag the existing ZFC root cluster (`ONTOLOGY_ONLY`) and author `NODE_REQ` for the handful of AC/LEM-sensitive nodes that already exist. Delivers immediate value ("what does this theorem cost?" recolor) with zero content-agent dependency.
3. Wire selector state + the grey-vs-hide composition into `visibleNodes`/`isDimmed`.

**Then slot in a type-theory base:**
4. Content agent splits the ~4 fused interface nodes and fixes `lambda-calculus → function` (reals are the template).
5. Add the `type`-ontology realizers + the `mltt`/`hott` points. Because the bulk already depends on the now-neutral interface ids, **nothing above the interface changes**.
6. Layer the `coincidesIff` / `refutedBy` nuances last.

## 8. Open decisions (need your call before building)

*The §4 design already presupposes #1 (two axes) and #2 tier (ii); genuinely still-open are #3 (node- vs edge-granularity), #4 (truth-flip timing), and #5 (modal vs. both-roots).*

1. **One switch or two axes?** Recommended **two** (ontology × logic are genuinely orthogonal; classical HoTT is real). Cost: a slightly richer selector.
2. **How far to model constructive validity?** (i) binary classical/constructive recolor; (ii) **a small principle poset with entailment** (recommended for v1 — the minimum that is *correct*); (iii) full reverse-math degrees with Diaconescu/univalence enforcement.
3. **Logical cost on nodes or edges?** Per-node is simpler; per-edge is more honest (one consequence-edge can be the choice-using step while the node is otherwise constructive — e.g. PID→UFD needs only DC, in the factorization step). Undecided.
4. **Truth-flips now or later?** Rare (≈1–2 nodes); needs a distinct "refuted" visual. Defer is fine — but then **do not grey refuted nodes** (greying asserts "meaningless"; leave them normal-but-noted).
5. **Modal switch vs. always-show-both-roots?** Recommended hybrid: modal selector as the primary control + an opt-in "show all foundations" mode (the existing `showAllConstructions` toggle, dashed parallel chains) for side-by-side comparison; badge the interfaces that constructively bifurcate rather than asserting convergence.

## Appendix — mathematical invariants any correct design MUST respect

These came out of an adversarial math-accuracy audit; violating one makes the tool *assert a falsehood*.

1. **Ontology ⟂ logic.** Two independent axes; all four corners exist. Never a single enum.
2. **Two distinct choice tokens.** The Π/Σ "type-theoretic axiom of choice" is a *theorem* of MLTT and is **never** a requirement token. Only the truncated, set-level `ac-set` is a requirement — and never imply "type theory lacks choice."
3. **Cross-axis entailment is enforced at construction, not optional.** `ac-set ⇒ lem` (Diaconescu) auto-promotes a constructive point to classical; proof-relevant LEM under univalence is rejected. Freely-combinable axes assert coherence that doesn't exist.
4. **Logic is a partial order, not a chain or boolean.** DC ≠ AC ≠ countable choice; Brouwerian continuity is *anti-classical* (off-chain). Check `needs` by entailment in a poset, not by a level comparison. Use one poset to both validate `FOUNDATIONS` and check `NODE_REQ.needs`.
5. **ℝ coincidence is conditional, not flat.** Dedekind ≅ Cauchy *iff* countable choice — model with `coincidesIff`, not a boolean.
6. **Equality does not get a cross-foundation iso edge.** Extensional / intensional / path equality are different objects, not constructions of one.
7. **Three statuses stay visually distinct:** *not-expressible* (hidden) / *unprovable-but-meaningful* (greyed, in-chain) / *refuted* (a "false here" style). Conflating any two asserts a falsehood; a refuted realizer must never become the cascade root.
8. **Structural (ETCS) is not "ZFC minus membership."** It is a different primitive setup (morphisms + universal properties); if offered, it cannot be a purely subtractive patch over the ZFC base.

## Notes / risks

- **Boundary:** no `MathNode` schema field is ever added. Layer 0 (node splits + the definition-text requests, e.g. "flag `2 ∈ 3` as an encoding artifact", "the reals coincide iff countable choice") is **content-agent work** — those prose strings are *requests to the content agent*, not feature-owned strings. Layers 1–2 are fully feature-owned (mirroring the variants.ts boundary).
- **Relayout cost:** a foundation swap changes the visible-id set *wholesale*, so the first swap to each foundation is a **cold relayout of ~287 nodes** (not an incremental diff like collapse-toggle). Confirm dagre/ELK is within budget on ~290 nodes, or pre-warm the N foundation layouts, before advertising instant switching. ELK's cache key is the visible-id set, so each foundation caches separately after its first layout.
- **Composition precedence:** when a node is both filter-hidden and logic-greyed, **hidden dominates**. Search runs over the full `MATH_NODES` corpus, so a hidden realizer stays findable (selecting it can auto-expand its canonical or auto-switch foundation). The overlay-hide design never invents or rewires nodes, so the derived indexes in `graph.ts` (`nodeById`, `dependentsById`, `allTags`, `frequentTags`, `searchNodes`) never go stale — the decisive reason to prefer overlay-hide over diff-patch.
