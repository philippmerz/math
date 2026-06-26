### DELETE ITEMS THAT ARE DONE

### feature agent

- brainstorm nicer ways to display isomorophic structures (like construction of reals) without cluttering the graph unnecessarily
  - INVESTIGATION (preserved for later — not yet implemented):
    - Pattern: a canonical object C (e.g. ℝ) with several equivalent constructions {K1,K2,…}, each with its OWN prerequisites, all proven isomorphic → parallel chains that clutter as the corpus grows. Recurs beyond ℝ: free groups, completions, tensor products, von-Neumann-vs-Zermelo ordinals, etc.
    - Options weighed:
      - A. Collapse-by-default variants ⭐ — constructions are nodes flagged as variants, hidden by default; canonical shows a "⇲ N constructions" badge; click to expand them + their UNIQUE prereqs. Keeps dependency structure on demand. Cost: expand/collapse state + relayout.
      - B. Panel-only — only C is a node; constructions become tabs inside C's panel. Trivial, but LOSES the construction subtrees as navigable graph.
      - C. Keep + "≅" styling — variants stay, drawn dashed/lighter with double-stroke ≅ edges + a cluster hull. Low cost, density unchanged.
      - D. Global toggle — one toolbar switch "Show constructions" folds/unfolds all clusters.
      - E. Role filter — treat "construction" as a filterable role (reuses the focus-by-tag feature).
    - RECOMMENDATION: A as the core, C's ≅ styling on expand, D as a global override.
      - Default: a single ℝ node + a badge for the hidden constructions.
      - Expand: reveals dedekind-reals, cauchy-reals AND only their EXCLUSIVE prereqs — hide a prereq only when ALL its dependents are hidden (dedekind-cut unfolds; shared quotient-set stays).
      - Draw expanded variant→canonical as a dashed ≅ edge.
    - KEY (coordination): needs NO nodes.ts edits — keep the grouping in a feature-owned src/data/variants.ts map, e.g. { 'dedekind-reals': 'real-numbers', 'cauchy-reals': 'real-numbers' }. Can migrate into the node schema later.
- brainstorm problem: right now, the nodes are mostly organized but sometimes wildly jumbled. for example, the measure theory nodes are all nicely grouped but then 'unit circle' appears right within that visual group. is there a way to separate them more nicely? the groups should be unnecessarily far apart so they can fit into as little space as possible (without squashing edges or overlapping, of course), but they should be farther spaced than within-group items

INVESTIGATION — area clustering (jumbled groups): dagre places nodes purely by dependency rank with no area awareness, so cross-area nodes sharing a rank interleave (hence 'unit circle' amid measure theory). Options:
A. dagre compound clusters [recommended start] — g.setParent(nodeId, 'cluster:'+primaryTag) keeps each area contiguous and separated; tune nodesep (tight within) vs cluster margin / ranksep (looser between) for the within-vs-between spacing. One change in layout.ts, no data edits.
B. ELK (elkjs) layered + partitioning — stronger grouping, scales to 1000s; heavier (web worker, async, bigger dep). The long-term engine if A frays.
C. per-area sub-layouts then pack the area-blocks + route cross-area edges after — most control, most code.
D. post-process nudge by area — quick but risks overlaps/crossings; brittle.
RECOMMENDATION: start with A; graduate to B if needed. Tension: area != dependency depth; compound layout reconciles by keeping clusters contiguous while still honoring ranks.

- brainstorm: right now, there are very few theorems in the graph as nodes. i would like all of the important ones and perhaps important propositions to be in there too, but that would of course mix the node types and increase graph size massively. is there a nice way to organize theorems and results generally in there?

INVESTIGATION — theorems/results at scale: make theorems & propositions FIRST-CLASS nodes (so 'which result uses which' is a real, navigable structure) but hidden by default — progressive disclosure. Options:
A. kind/role filter [recommended now] — a "show theorems/propositions" toggle + a distinct node style for theorems (kind is already in the data). Default view = the definition/axiom skeleton; flip on to layer in results. Reuses the focus-by-tag machinery (filter by kind instead of tag).
B. semantic zoom / level-of-detail [recommended later] — zoomed out shows core concepts; zooming into an area reveals its theorems. Scales indefinitely; more work (per-zoom visibility).
C. theorems-in-panel — list results inside the related concept's panel, not as nodes. Near-zero graph growth, but loses the theorem→theorem graph.
D. importance tiers (core/important/detailed) + a slider.
RECOMMENDATION: A now, B later. UNIFYING THEME: iso-collapse + theorem-filter + focus-by-tag are the same lever — progressive disclosure (clean skeleton; reveal variants/theorems/detail on demand via toggle/focus/zoom). Worth designing as ONE small 'view' state, not three bolt-ons.

### content agent

> If a concept needs prior concepts that don't strictly belong to the area you're working on currently, add them anyway under their respective tags

- finish linear algebra
- differential equations (ordinary & partial)
- continuous optimizationi saw you focused on the structures first. can you also add the standard theorems / results generally to the graph? add another field to the json 'category' so we can filter them for now, but just so we have them