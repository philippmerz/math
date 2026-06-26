# Brief: a raw declaration-reference graph from Lean / mathlib

**For:** a separate exploration project. **Goal:** mechanically extract the
dependency graph of a Lean library and *see what it looks like raw*, then judge
how much of a hand-curated conceptual map (nodes = concepts, edges = curated
"built from") is recoverable automatically.

This is the analog of a JS import graph (`GraphView` imports `NodeElement`), but
at **declaration** granularity: nodes = declarations (definitions, theorems,
axioms), edges = "declaration A references declaration B".

## The one real subtlety: type vs. value

Every Lean declaration has a **type** and a **value** (for a theorem, the value
*is* its proof). Walk each as an `Expr` and collect the constants it references:

- **type references** ≈ what you need just to *state* the thing → conceptual
  prerequisites.
- **value/proof references** ≈ what the *derivation* actually invokes →
  entailment edges.

Keep these as two edge colors — it's the most interesting output, and it's the
prereq-vs-proof distinction a hand-drawn graph usually blurs.

Know the bias of each: **proof references over-count** (tactics like `simp`/`ring`
and typeclass inference pull in many lemmas/instances the author never typed);
**type references under-count** relative to "intuitive prerequisites". Neither is
wrong — just be clear which graph you're looking at.

## Extractor (illustrative — adapt to current Lean API)

```lean
import Mathlib            -- or a smaller import to scope a sub-theory
open Lean

/-- Edges `A → B` tagged by where the reference occurs. -/
def refEdges (env : Environment) : Array (Name × Name × String) := Id.run do
  let mut out := #[]
  for (n, ci) in env.constants.toList do
    if n.isInternal then continue                 -- skip compiler-internal names
    for b in ci.type.getUsedConstants do
      out := out.push (n, b, "type")
    if let some v := ci.value? then               -- the proof term, if any
      for b in v.getUsedConstants do
        out := out.push (n, b, "proof")
  return out
```

`Lean.Expr.getUsedConstants : Expr → Array Name`, `ConstantInfo.type`, and
`ConstantInfo.value?` are the load-bearing primitives. Dump to JSON/CSV/DOT.

## Knobs that turn the hairball into something legible

- **Drop machine-generated names**: `*.proof_<n>`, `*._eq_<n>`, `*.match_<n>`,
  `.rec` / `.casesOn` / projections, anonymous `inst…` instances, anything
  `Name.isInternal`.
- **Cluster by namespace** to reach concept-granularity: collapse all
  `Subgroup.*` into one node `Subgroup`. mathlib's naming convention *is* its
  concept grouping, so this is a surprisingly good proxy for "what a human would
  call one node".
- **Prune by weight**: in-degree / PageRank-style centrality, edge frequency, or
  proof-term size; hide low-centrality leaves.
- **Tag non-constructive commitments**: `#print axioms foo` (or
  `Lean.CollectAxioms`) shows which results bottom out at `Classical.choice`,
  `propext`, `Quot.sound`. Attaching each node's axiom set is a cheap, genuinely
  novel layer — it shows *which* classical commitments each result inherits.

## Suggested output

```json
{ "nodes": [{ "id": "...", "kind": "def|thm|axiom", "namespace": "..." }],
  "edges": [{ "from": "...", "to": "...", "via": "type|proof" }] }
```

Feeds D3 / Gephi / Cytoscape directly, and is easy to diff against a curated
graph.

## Prior art — check before building

- **leanblueprint** (Patrick Massot) — builds a *curated* declaration dependency
  graph (defs/theorems with "uses" edges + informal statements), rendered as the
  "blueprint" of projects like the Liquid Tensor Experiment, sphere eversion, and
  PFR. The closest existing thing to a human-readable version — **start here**.
- **import-graph** (`lake exe graph`, `#min_imports`) — the *file-level* import
  graph + transitive-dependency utilities for mathlib. Coarser (file, not
  declaration) but a ready-made tool.
- **`#print axioms` / `Lean.CollectAxioms`** — the axiom-dependency view.
- **doc-gen4** — mathlib's doc generator already parses declarations and types to
  build hyperlinks; a usable data source for references.

A polished "raw declaration graph of *all* of mathlib" as a downloadable dataset
isn't obviously off-the-shelf, but the extractor above is short and these tools
cover most of the plumbing.

## What to report back

- Node/edge counts: raw, then after dropping internals, after namespace
  clustering, after weight-pruning.
- A rendered picture of one self-contained corner (e.g. everything under
  `Mathlib.GroupTheory` or `Mathlib.SetTheory`) at both granularities.
- How close the clustered graph gets to a sensible concept map — and what the
  irreducible noise (automation lemmas, instance plumbing) actually looks like.
