import type { MathNode } from '../types'

export const GRAPH_THEORY_NODES: MathNode[] = [
  // ── Basic objects ──────────────────────────────────────────────────────────
  {
    id: 'graph',
    label: 'Graph',
    title: 'Graph',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['set', 'cardinality'],
    description: String.raw`A **graph** models a network of pairwise relationships — social ties, road maps, molecules, dependencies — by recording a set of points and which pairs of them are linked. It is the most basic combinatorial structure, and graph theory studies the patterns such links can form. The default here is **simple**: edges are unordered pairs of *distinct* vertices, so there are no loops and no repeated edges; permitting those gives a *multigraph*.`,
    definition: String.raw`A **(simple) graph** is a pair $G = (V, E)$ where $V$ is a set of **vertices** and $E$ is a set of **edges**, each edge being a two-element subset of $V$:
$$E \subseteq \binom{V}{2} := \{\,\{u, v\} : u, v \in V,\ u \neq v\,\}.$$
Vertices $u, v$ are **adjacent** when $\{u, v\} \in E$, and the edge $\{u, v\}$ is **incident** to each of $u$ and $v$. The graph is **finite** when $V$ is finite, in which case $|V|$ is its **order** and $|E|$ its **size**; unless stated otherwise, graphs here are finite.`,
  },
  {
    id: 'subgraph',
    label: 'Subgraph',
    title: 'Subgraph & Induced Subgraph',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'subset'],
    description: String.raw`A **subgraph** is a graph sitting inside another: keep some of the vertices and some of the edges, dropping the rest. Removing a vertex forces the removal of every edge touching it. When we keep *all* edges among the chosen vertices we get the **induced** subgraph — the natural restriction of $G$ to a vertex set — which is what one obtains by simply deleting the other vertices.`,
    definition: String.raw`A graph $H = (V', E')$ is a **subgraph** of $G = (V, E)$, written $H \subseteq G$, when $V' \subseteq V$ and $E' \subseteq E \cap \binom{V'}{2}$ (so each edge of $H$ joins two vertices of $H$). It is a **spanning** subgraph when $V' = V$. For $S \subseteq V$, the **induced subgraph** $G[S]$ has vertex set $S$ and keeps every edge of $G$ with both endpoints in $S$:
$$G[S] := \bigl(S,\ E \cap \tbinom{S}{2}\bigr).$$`,
  },
  {
    id: 'directed-graph',
    label: 'Directed Graph',
    title: 'Directed Graph',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'relation'],
    description: String.raw`A **directed graph** (digraph) gives each edge a direction, turning it into an **arc** that points from one vertex to another. Direction captures one-way relationships — flows, precedence, web links, state transitions — and splits a vertex's degree into an **in-degree** (arcs arriving) and an **out-degree** (arcs leaving). This dependency map of mathematics is itself a directed graph.`,
    definition: String.raw`A **directed graph** is a pair $D = (V, A)$ where $A \subseteq V \times V$ is a set of ordered pairs called **arcs**; the arc $(u, v)$ points from its **tail** $u$ to its **head** $v$. Thus $A$ is exactly a binary relation on $V$. The **out-degree** of $v$ is $\deg^{+}(v) = |\{u : (v, u) \in A\}|$ and its **in-degree** is $\deg^{-}(v) = |\{u : (u, v) \in A\}|$.`,
  },

  // ── Degree ────────────────────────────────────────────────────────────────
  {
    id: 'degree',
    label: 'Degree',
    title: 'Degree of a Vertex',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'cardinality'],
    description: String.raw`The **degree** of a vertex counts how many edges touch it — in a simple graph, equivalently how many neighbours it has. Degrees are the most basic numerical data attached to a graph; sorting them gives the *degree sequence*, the coarsest fingerprint of a graph's local structure.`,
    definition: String.raw`The **neighbourhood** of a vertex $v$ in $G = (V, E)$ is $N(v) := \{u \in V : \{u, v\} \in E\}$, and the **degree** of $v$ is the number of incident edges,
$$\deg(v) := |\{e \in E : v \in e\}| = |N(v)|,$$
the two counts agreeing because in a simple graph distinct edges at $v$ have distinct other endpoints. A vertex of degree $0$ is **isolated**; $\delta(G) = \min_v \deg(v)$ and $\Delta(G) = \max_v \deg(v)$ are the minimum and maximum degrees.`,
  },
  {
    id: 'handshaking-lemma',
    label: 'Handshaking Lemma',
    title: 'Handshaking Lemma',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['degree', 'graph'],
    description: String.raw`The **handshaking lemma** is the first counting identity of graph theory: adding up how many edges touch each vertex counts every edge exactly twice, once for each of its two endpoints. So the sum of all degrees is always even — it equals $2|E|$. Trivial to state, it is the prototype of the *double-counting* argument and has the memorable corollary that any gathering has an even number of people who shook an odd number of hands.`,
    statement: String.raw`For any finite graph $G = (V, E)$,
$$\sum_{v \in V} \deg(v) = 2\,|E|.$$`,
    proof: String.raw`Count the set of **incidences** $I = \{(v, e) \in V \times E : v \in e\}$ — pairs of a vertex and an edge containing it — in two ways.

*Sum over vertices.* For each $v$, the pairs $(v, e) \in I$ are in bijection with the edges incident to $v$, of which there are $\deg(v)$ by the definition of **degree**. Hence $|I| = \sum_{v \in V} \deg(v)$.

*Sum over edges.* For each edge $e$, the pairs $(v, e) \in I$ are in bijection with the vertices of $e$; since $G$ is simple, every edge is a two-element set, so it contributes exactly $2$. Hence $|I| = \sum_{e \in E} 2 = 2|E|$.

Equating the two counts gives $\sum_{v \in V} \deg(v) = 2|E|$. $\square$`,
  },
  {
    id: 'odd-degree-even',
    label: 'Odd-Degree Vertices',
    title: 'The Number of Odd-Degree Vertices is Even',
    kind: 'corollary',
    tags: ['Graph Theory'],
    dependencies: ['handshaking-lemma'],
    description: String.raw`An immediate consequence of the handshaking lemma: in any finite graph the vertices of *odd* degree come in even number. Because the degrees sum to the even quantity $2|E|$, the odd contributions must cancel out in parity — there is no way to have a single, or any odd count of, odd-degree vertices.`,
    statement: String.raw`In any finite graph $G = (V, E)$, the number of vertices of odd degree is even.`,
    proof: String.raw`Split the degree sum by parity:
$$\sum_{v \in V} \deg(v) = \sum_{\deg(v)\ \text{even}} \deg(v) \;+\; \sum_{\deg(v)\ \text{odd}} \deg(v).$$
By the **handshaking lemma** the left side equals $2|E|$, which is even. The first sum on the right is even, being a sum of even numbers. Hence the second sum is even. A sum of odd numbers is even precisely when there is an even count of them; therefore the number of odd-degree vertices is even. $\square$`,
  },

  // ── Walks, paths, connectivity ──────────────────────────────────────────────
  {
    id: 'path-and-cycle',
    label: 'Path & Cycle',
    title: 'Walks, Paths & Cycles',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph'],
    description: String.raw`A **walk** is the act of travelling along edges from vertex to vertex; a **path** is a walk that never revisits a vertex, and a **cycle** is a closed loop that returns to its start without otherwise repeating. These notions formalize getting from one place to another and the loops a graph contains, and they underlie distance, connectivity, and the gulf between trees and tangled networks.`,
    definition: String.raw`A **walk** of length $k$ in $G$ is a sequence $v_0, v_1, \dots, v_k$ of vertices with $\{v_{i-1}, v_i\} \in E$ for each $i$; it joins $v_0$ to $v_k$. A **trail** is a walk with no repeated edge; a **path** is a walk with no repeated vertex. A walk is **closed** when $v_0 = v_k$; a **cycle** is a closed walk of length $k \ge 3$ whose vertices $v_0, \dots, v_{k-1}$ are distinct. The cycle's **length** is its number of edges $k$; a cycle is **odd** or **even** according to the parity of $k$.`,
  },
  {
    id: 'walk-implies-path',
    label: 'Walk ⇒ Path',
    title: 'A Walk Contains a Path',
    kind: 'lemma',
    tags: ['Graph Theory'],
    dependencies: ['path-and-cycle'],
    description: String.raw`If you can get from $u$ to $v$ at all — by any wandering walk that may double back and revisit vertices — then you can get there by a genuine path that never repeats a vertex: simply cut out every detour. This small lemma lets connectivity be defined via walks or via paths interchangeably, and it is used constantly to clean up arguments.`,
    statement: String.raw`If there is a walk from $u$ to $v$ in $G$, then there is a path from $u$ to $v$ in $G$.`,
    proof: String.raw`Among all walks from $u$ to $v$ choose one of minimum length, say $w = (v_0 = u, v_1, \dots, v_k = v)$; a shortest walk exists since walk lengths are non-negative integers and at least one walk exists. We claim $w$ is a path. If not, some vertex repeats: $v_i = v_j$ with $i < j$. Splice out the intermediate segment by deleting $v_{i+1}, \dots, v_j$, giving the sequence
$$v_0, \dots, v_i, v_{j+1}, \dots, v_k.$$
This is again a walk from $u$ to $v$: each retained consecutive pair was already an edge, and the only new junction is $v_i \,(= v_j) \to v_{j+1}$, which uses the edge $\{v_j, v_{j+1}\} \in E$ — present when $j < k$. If instead $j = k$ (the repetition is at the very end, e.g. $u = v$), the spliced sequence is simply $v_0, \dots, v_i$, ending at $v_i = v_k = v$, a walk from $u$ to $v$ needing no new junction. Either way the result is strictly shorter (at least the vertex $v_j$ is removed), contradicting minimality. So no vertex repeats and $w$ is a **path** from $u$ to $v$. $\square$`,
  },
  {
    id: 'connectivity',
    label: 'Connectivity',
    title: 'Connectivity & Components',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['path-and-cycle', 'walk-implies-path', 'equivalence-relation'],
    description: String.raw`A graph is **connected** when you can travel between any two vertices. In general a graph falls apart into **connected components** — its maximal connected pieces — and it is connected exactly when there is a single piece. The relation "there is a path from $u$ to $v$" is an equivalence relation, and the components are its classes. Vertex- and edge-connectivity then measure how robust the network is by counting how much must be removed to break it.`,
    definition: String.raw`Define $u \sim v$ on $V$ to mean there is a walk (equivalently, by the walk-to-path lemma, a path) from $u$ to $v$. This $\sim$ is an **equivalence relation**: reflexive (the length-$0$ walk $v$), symmetric (reverse the walk), and transitive (concatenate walks). Its equivalence classes are the **connected components** of $G$, and the induced subgraph on each is connected. $G$ is **connected** when it is non-empty with exactly one component, i.e. $u \sim v$ for all $u, v \in V$. A graph is **$k$-(vertex-)connected** when $|V| > k$ and deleting any fewer than $k$ vertices leaves it connected.`,
    proof: String.raw`**$\sim$ is an equivalence relation.** Reflexivity: the single-vertex sequence $v$ is a walk from $v$ to $v$. Symmetry: if $v_0, \dots, v_k$ is a walk from $u$ to $v$, the reversed sequence $v_k, \dots, v_0$ is a walk from $v$ to $u$, each edge $\{v_{i-1}, v_i\}$ being unordered. Transitivity: a walk from $u$ to $v$ followed by a walk from $v$ to $w$ (identifying the shared endpoint $v$) is a walk from $u$ to $w$. Thus $\sim$ satisfies the three axioms of an **equivalence relation**, and its classes partition $V$. $\square$`,
  },

  // ── Trees ──────────────────────────────────────────────────────────────────
  {
    id: 'tree',
    label: 'Tree',
    title: 'Tree',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['connectivity', 'path-and-cycle', 'degree'],
    description: String.raw`A **tree** is a connected graph with no cycles — the leanest possible connected structure. Equivalently, any two vertices are joined by a *unique* path: there is exactly one way to get anywhere, with no redundancy and no loops. Trees model hierarchies, parse structures, file systems, and search spaces, and are among the most fundamental objects in computer science.`,
    definition: String.raw`A **tree** is a connected graph containing no cycle (an **acyclic** connected graph). A vertex of degree $1$ in a tree is a **leaf**. A graph that is acyclic but not necessarily connected — a disjoint union of trees — is a **forest**.`,
  },
  {
    id: 'tree-unique-path',
    label: 'Unique Tree Paths',
    title: 'Trees Have Unique Paths',
    kind: 'proposition',
    tags: ['Graph Theory'],
    dependencies: ['tree', 'path-and-cycle', 'connectivity'],
    description: String.raw`The defining property of a tree, recast: between any two of its vertices there runs exactly one path. Connectedness gives *at least* one path; acyclicity forbids a *second*, since two distinct paths between the same endpoints would enclose a cycle. This is why a tree has no redundancy — remove any edge and it disconnects.`,
    statement: String.raw`A graph $G$ is a tree if and only if for every pair of vertices $u, v$ there is exactly one path from $u$ to $v$.`,
    proof: String.raw`($\Rightarrow$) Let $G$ be a **tree**. It is connected, so at least one path joins any $u$ and $v$. Suppose two distinct paths $P = (u = x_0, \dots, x_m = v)$ and $Q = (u = y_0, \dots, y_n = v)$ existed. Let $i$ be the first index where they diverge, so $x_{i-1} = y_{i-1} =: a$ but the edges out of $a$ differ. Following $P$ from $a$ and $Q$ from $a$, let $b$ be the first vertex after $a$ that the two share again (it exists, as both reach $v$). The segment of $P$ from $a$ to $b$ together with the reversed segment of $Q$ from $b$ to $a$ is a closed walk that repeats no vertex except its endpoints and has length $\ge 3$ (the first edges differ, so it is not a single back-and-forth) — a **cycle**, contradicting acyclicity. Hence the path is unique.

($\Leftarrow$) Suppose every pair is joined by exactly one path. Then $G$ is connected (at least one path always exists). If $G$ had a cycle $v_0, v_1, \dots, v_k = v_0$, then $v_0$ and $v_1$ would be joined both by the edge $\{v_0, v_1\}$ and by the path $v_1, v_2, \dots, v_k = v_0$ around the rest of the cycle — two distinct paths, contradiction. So $G$ is acyclic and connected, i.e. a tree. $\square$`,
  },
  {
    id: 'tree-edge-count',
    label: 'Tree Edge Count',
    title: 'A Tree on n Vertices Has n − 1 Edges',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['tree', 'connectivity', 'path-and-cycle', 'degree'],
    description: String.raw`Every tree is as sparse as a connected graph can be: a tree on $n$ vertices has exactly $n - 1$ edges. One fewer would disconnect it; one more would create a cycle. The count is proved by peeling off a leaf — every finite tree has one — which removes exactly one vertex and one edge, reducing to a smaller tree.`,
    statement: String.raw`Every finite tree with $n \ge 1$ vertices has exactly $n - 1$ edges.`,
    proof: String.raw`We first note that every finite tree $T$ with $n \ge 2$ vertices has a **leaf**. Consider a path of maximum length in $T$ (one exists, as $T$ is finite), with an endpoint $x$. If $x$ had a neighbour $y$ outside the path, the path could be extended, contradicting maximality; and every neighbour of $x$ on the path other than its successor would create a **cycle** with the path, impossible in a **tree**. So $x$ has exactly one neighbour: $\deg(x) = 1$.

Now induct on $n$. For $n = 1$ the tree is a single vertex with $0 = n - 1$ edges. For $n \ge 2$, take a leaf $x$ and let $T' = T - x$ be the induced subgraph on the remaining $n - 1$ vertices. Deleting a degree-$1$ vertex removes exactly its one incident edge, so $T'$ has $|E(T)| - 1$ edges. Moreover $T'$ is still a tree: it remains acyclic (deleting a vertex cannot create a cycle), and it is connected, since any path through $x$ would have had $x$ as an interior vertex of degree $\ge 2$, so paths between vertices of $T'$ avoid $x$ entirely. By the induction hypothesis $T'$ has $(n-1) - 1$ edges, hence $T$ has $(n-1) - 1 + 1 = n - 1$ edges. $\square$`,
  },
  {
    id: 'spanning-tree',
    label: 'Spanning Tree',
    title: 'Spanning Tree',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['tree', 'subgraph', 'connectivity', 'path-and-cycle', 'walk-implies-path'],
    description: String.raw`A **spanning tree** of a connected graph is a minimal skeleton that keeps it connected: a subgraph that touches every vertex, is connected, and has no cycles. Every connected graph has one — keep deleting edges that lie on a cycle until none remain. A **minimum spanning tree** minimizes total edge weight and is found greedily by Kruskal's or Prim's algorithm, with applications from network design to clustering.`,
    definition: String.raw`A **spanning tree** of a graph $G = (V, E)$ is a spanning subgraph $T = (V, E')$ with $E' \subseteq E$ that is a tree.`,
    proof: String.raw`**Existence (for $G$ connected).** Among all *connected* spanning subgraphs of $G$ — a non-empty finite family, since $G$ itself is one — choose one, $T = (V, E')$, with the fewest edges. We claim $T$ is acyclic, hence a **tree** and so a spanning tree. If $T$ contained a cycle $C$, pick any edge $e = \{u, v\}$ of $C$. Then $T - e$ is still connected: any path in $T$ that used $e$ can be rerouted along the remaining edges of $C$ (which still join $u$ to $v$), so every pair of vertices remains joined by a walk, hence by a path. But $T - e$ is a connected spanning subgraph with fewer edges, contradicting minimality. Therefore $T$ is acyclic and connected — a spanning tree. $\square$`,
  },

  // ── Bipartite graphs ────────────────────────────────────────────────────────
  {
    id: 'bipartite-graph',
    label: 'Bipartite Graph',
    title: 'Bipartite Graph',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph'],
    description: String.raw`A graph is **bipartite** when its vertices split into two camps so that every edge runs *between* the camps and none *within* one — equivalently, the vertices can be two-coloured with no edge joining same-coloured vertices. Bipartite graphs model relationships between two kinds of object (students and courses, jobs and machines) and are the natural home of matching problems.`,
    definition: String.raw`A graph $G = (V, E)$ is **bipartite** when its vertex set admits a partition $V = X \sqcup Y$ (with $X \cap Y = \varnothing$) such that every edge has one endpoint in $X$ and the other in $Y$:
$$\forall\, \{u, v\} \in E,\quad (u \in X \wedge v \in Y)\ \text{or}\ (u \in Y \wedge v \in X).$$
The pair $(X, Y)$ is a **bipartition**; equivalently, $G$ is bipartite iff its vertices can be coloured with $2$ colours so that adjacent vertices differ.`,
  },
  {
    id: 'bipartite-odd-cycle',
    label: 'Bipartite ⇔ No Odd Cycle',
    title: 'König: Bipartite iff No Odd Cycle',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['bipartite-graph', 'path-and-cycle', 'connectivity', 'spanning-tree'],
    description: String.raw`A graph is bipartite exactly when it contains no cycle of odd length. One direction is easy: a cycle alternates sides as it goes, so a *closed* cycle must use an even number of steps to return. The converse builds a bipartition explicitly by colouring each vertex according to the parity of its distance from a chosen root — odd cycles are precisely the obstruction that makes this colouring consistent.`,
    statement: String.raw`A graph $G$ is bipartite if and only if it contains no cycle of odd length.`,
    proof: String.raw`($\Rightarrow$) Let $G$ be **bipartite** with bipartition $V = X \sqcup Y$, and let $v_0, v_1, \dots, v_k = v_0$ be a cycle. Each edge crosses between $X$ and $Y$, so the side of $v_i$ alternates with each step. After $k$ steps we return to $v_0$, on its original side, which requires $k$ to be even. Hence no cycle is odd.

($\Leftarrow$) Suppose $G$ has no odd cycle. It suffices to bipartition each **connected component** separately and take the union, so assume $G$ is connected. Fix a vertex $r$ and let $d(v)$ be the length of a shortest path from $r$ to $v$ (finite, by connectedness). Colour $X = \{v : d(v)\ \text{even}\}$, $Y = \{v : d(v)\ \text{odd}\}$. We show every edge crosses. Suppose, for contradiction, an edge $\{u, v\}$ had $d(u) \equiv d(v) \pmod 2$. Take shortest paths $P_u$ from $r$ to $u$ and $P_v$ from $r$ to $v$, and let $w$ be their last common vertex. Since a subpath of a shortest path is shortest and $w$ lies on $P_u$ and on $P_v$, the segment of $P_u$ from $w$ to $u$ has length $a = d(u) - d(w)$ and that of $P_v$ from $w$ to $v$ has length $b = d(v) - d(w)$. By the choice of $w$ as the *last* common vertex, these two segments meet only at $w$ (are internally disjoint). Together with the edge $\{u, v\}$ they therefore form a single **cycle** through $w$, $u$, $v$ with all other vertices distinct, of length $a + b + 1$. Since $d(u) \equiv d(v) \pmod 2$, $a + b$ is even, so the cycle has odd length $a + b + 1$ (and $u \neq v$ forces this length to be $\ge 3$) — contradicting the hypothesis of no odd cycle. Hence every edge joins $X$ to $Y$, and $(X, Y)$ is a bipartition. $\square$`,
  },

  // ── Eulerian and Hamiltonian ────────────────────────────────────────────────
  {
    id: 'eulerian-path',
    label: 'Eulerian Trail',
    title: 'Eulerian Trail & Circuit',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['connectivity', 'degree', 'handshaking-lemma', 'path-and-cycle'],
    description: String.raw`An **Eulerian circuit** traces a route that uses every edge exactly once and returns to its start; an **Eulerian trail** does so without necessarily returning. Euler's 1736 analysis of the seven bridges of Königsberg — the founding result of graph theory — settles exactly when they exist. The criterion is purely local: a connected graph has an Eulerian circuit precisely when every vertex has even degree, the parity bookkeeping ensuring each visit can also be a departure.`,
    statement: String.raw`Let $G$ be a connected graph with at least one edge. Then $G$ has an **Eulerian circuit** (a closed trail using every edge exactly once) if and only if every vertex has even degree. Consequently $G$ has an **Eulerian trail** (using every edge once, not necessarily closed) if and only if at most two vertices have odd degree.`,
    proof: String.raw`($\Rightarrow$, necessity.) Suppose $G$ has an Eulerian circuit $W$. Traverse it; each time $W$ passes through a vertex $v$ it enters along one edge and leaves along another, pairing up the edges at $v$, and the starting/ending vertex is likewise entered and left. Since $W$ uses every edge of $G$ exactly once, the edges incident to $v$ are partitioned into such pairs, so $\deg(v)$ is even for every $v$.

($\Leftarrow$, sufficiency.) Suppose $G$ is connected with every degree even; induct on $|E|$. First, $G$ contains a **cycle**: starting from any vertex and repeatedly walking out along an unused edge, we never get stuck at a vertex other than the start, because each even-degree vertex entered has an unused edge to leave by; being finite, the trail must eventually revisit a vertex, closing a cycle $C$. Remove the edges of $C$ to get $G'$. In $G'$ every vertex has even degree again, since $C$ removes exactly two edges at each of its vertices. Each connected component of $G'$ that has edges is connected and all-even, so by the induction hypothesis has an Eulerian circuit; and each such component shares a vertex with $C$ (as $G$ was connected). Splice: traverse $C$, and on first reaching a vertex of a component, detour through that component's Eulerian circuit before continuing along $C$. The result is a closed trail using every edge of $C$ and of every component exactly once — an Eulerian circuit of $G$.

(Trail, sufficiency.) If no vertex has odd degree, an Eulerian circuit is already an Eulerian trail. If exactly two vertices $a, b$ have odd degree, add a new auxiliary edge $\{a, b\}$ (or a parallel one); now all degrees are even and the graph is connected, so it has an Eulerian circuit; deleting the auxiliary edge from the circuit leaves an Eulerian trail from $a$ to $b$.

(Trail, necessity.) Conversely, suppose $G$ has an Eulerian trail $W$ from $a$ to $b$. For any vertex $v \notin \{a, b\}$, each passage of $W$ through $v$ enters along one edge and leaves along another, pairing up the edges at $v$; since $W$ uses every incident edge exactly once, $\deg(v)$ is even. If $a \neq b$, at each of $a$ and $b$ exactly one edge is left unpaired — the first edge out of $a$ and the last edge into $b$ — so $\deg(a)$ and $\deg(b)$ are odd; thus exactly two vertices have odd degree. If $a = b$ the trail is closed, every edge at every vertex is paired, and no vertex has odd degree. In either case at most two vertices have odd degree. (Consistently with the **handshaking lemma**, the number of odd-degree vertices is even, so it is indeed $0$ or $2$.) $\square$`,
  },
  {
    id: 'hamiltonian-path',
    label: 'Hamiltonian Path',
    title: 'Hamiltonian Path & Cycle',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['path-and-cycle'],
    description: String.raw`A **Hamiltonian path** visits every *vertex* exactly once; a **Hamiltonian cycle** does so and returns to its start. Superficially the twin of the Eulerian question (edges versus vertices), it is profoundly harder: no efficient local criterion is known, and deciding whether a Hamiltonian cycle exists is **NP-complete**. It is a vivid lesson that a small change in a problem can carry it across the boundary of computational tractability.`,
    definition: String.raw`A **Hamiltonian path** in $G = (V, E)$ is a path $v_0, v_1, \dots, v_{n-1}$ that visits every vertex exactly once, i.e. $\{v_0, \dots, v_{n-1}\} = V$ with all $v_i$ distinct and $n = |V|$. A **Hamiltonian cycle** is a cycle $v_0, v_1, \dots, v_{n-1}, v_0$ with $\{v_0, \dots, v_{n-1}\} = V$ and the $v_i$ distinct; a graph possessing one is **Hamiltonian**.`,
  },

  // ── Colouring ───────────────────────────────────────────────────────────────
  {
    id: 'graph-coloring',
    label: 'Graph Colouring',
    title: 'Graph Colouring & Chromatic Number',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'function'],
    description: String.raw`A **proper colouring** paints the vertices so that no edge joins two vertices of the same colour; the least number of colours that suffices is the **chromatic number** $\chi(G)$. Colouring models conflict-free scheduling, register allocation, and frequency assignment — colours are time slots or channels, edges are conflicts. The question of when few colours suffice runs from the trivial ($\chi \le 2$ exactly for bipartite graphs) to some of the deepest problems in the field.`,
    definition: String.raw`A **proper $k$-colouring** of $G = (V, E)$ is a function $c : V \to \{1, \dots, k\}$ such that $c(u) \neq c(v)$ whenever $\{u, v\} \in E$. The graph is **$k$-colourable** if such a $c$ exists, and the **chromatic number** is
$$\chi(G) := \min\{\, k \in \mathbb{N} : G \text{ is } k\text{-colourable}\,\}.$$
A colouring is exactly a partition of $V$ into $k$ **independent sets** (colour classes), where a set is independent when it spans no edge.`,
  },
  {
    id: 'greedy-coloring',
    label: 'Greedy Bound',
    title: 'Greedy Colouring Bound',
    kind: 'proposition',
    tags: ['Graph Theory'],
    dependencies: ['graph-coloring', 'degree'],
    description: String.raw`Colouring vertices one at a time, always grabbing the lowest colour not already used by a coloured neighbour, never needs more than $\Delta + 1$ colours, where $\Delta$ is the maximum degree: when a vertex's turn comes, its at-most-$\Delta$ neighbours block at most $\Delta$ colours, so one of the first $\Delta + 1$ is free. This simple greedy argument gives the basic universal bound $\chi(G) \le \Delta(G) + 1$.`,
    statement: String.raw`For every graph $G$, $\chi(G) \le \Delta(G) + 1$, where $\Delta(G)$ is the maximum degree.`,
    proof: String.raw`List the vertices in any order $v_1, v_2, \dots, v_n$ and colour them in turn from the palette $\{1, 2, \dots, \Delta + 1\}$: assign to $v_i$ the smallest colour not used by any already-coloured neighbour. When $v_i$ is coloured, its forbidden colours come only from its neighbours, of which there are at most $\deg(v_i) \le \Delta$ by the definition of maximum **degree**. So at most $\Delta$ colours are forbidden, leaving at least one of the $\Delta + 1$ available; $v_i$ receives a colour. Adjacent vertices never collide: when the later of two adjacent vertices is coloured, the earlier one's colour is excluded. The result is a proper colouring with at most $\Delta + 1$ colours, so $\chi(G) \le \Delta(G) + 1$. $\square$`,
  },

  // ── Planarity ───────────────────────────────────────────────────────────────
  {
    id: 'planar-graph',
    label: 'Planar Graph',
    title: 'Planar Graph & Euler’s Formula',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'connectivity', 'spanning-tree', 'tree-edge-count', 'path-and-cycle'],
    description: String.raw`A **planar graph** is one that can be drawn in the plane with no two edges crossing. Such a drawing carves the plane into regions, or **faces**. **Euler's formula** binds the three counts together: for a connected planar drawing, vertices minus edges plus faces always equals $2$ — a combinatorial shadow of the topology of the sphere, independent of how the graph is drawn. It is proved by building the graph up from a spanning tree, each added edge closing off exactly one new face.`,
    statement: String.raw`For any connected graph drawn in the plane without edge crossings, with $V$ vertices, $E$ edges, and $F$ faces (the connected regions of the plane's complement, including the unbounded outer face),
$$V - E + F = 2.$$`,
    proof: String.raw`Fix such a drawing of the connected graph $G$. Since $G$ is connected it has a **spanning tree** $T$ using all $V$ vertices and, by the tree edge-count theorem, exactly $V - 1$ edges. The drawing of $T$ alone has no cycles, so it does not enclose any bounded region: it has a single face, $F_T = 1$. Indeed $V - (V - 1) + 1 = 2$, so Euler's relation holds for $T$.

Now add the remaining $E - (V - 1)$ edges of $G$ back one at a time, in the same plane drawing. We maintain the invariant that the current subgraph is connected and satisfies $V - E_i + F_i = 2$, where $E_i, F_i$ are its edge and face counts after $i$ additions; this holds at $i = 0$ (the tree). Add an edge $e$. Because the drawing has no crossings, $e$ is an arc whose interior meets no other edge or vertex; hence its interior lies in a single open face $f$, and its two endpoints (already-present vertices) lie on the frontier of $f$. Such an arc — interior in the open connected region $f$, both endpoints on its frontier — is a *crosscut* of $f$, and a crosscut divides the region it cuts into exactly two connected pieces while leaving every other face untouched. (This is the standard planar consequence of the **Jordan curve theorem**, a named topological input: complete $e$ to a simple closed curve by appending a simple arc through the exterior of $f$; the theorem partitions the plane into an interior and an exterior, which meet $f$ in exactly the two pieces into which $e$ cuts it.) Hence adding $e$ raises both the edge count and the face count by exactly $1$:
$$V - (E_i + 1) + (F_i + 1) = V - E_i + F_i = 2.$$
After all edges are restored we have the full graph $G$ with $V - E + F = 2$. $\square$

*Topological input.* The face-splitting step rests on the Jordan curve property of the plane (a simple closed curve separates the plane into exactly two regions, an inside and an outside), here taken as a cited topological fact about plane drawings.`,
  },
  {
    id: 'planar-edge-bound',
    label: 'Planar Edge Bound',
    title: 'Edge Bound for Planar Graphs',
    kind: 'corollary',
    tags: ['Graph Theory'],
    dependencies: ['planar-graph', 'handshaking-lemma'],
    description: String.raw`Planar graphs are necessarily sparse: a simple planar graph on $n \ge 3$ vertices has at most $3n - 6$ edges. Each face is bounded by at least three edges, and each edge borders at most two faces, so a double count pins the number of faces, which Euler's formula then converts into a ceiling on edges. This is the standard tool for proving graphs *non*-planar — it shows $K_5$ cannot be planar.`,
    statement: String.raw`A simple connected planar graph with $n \ge 3$ vertices and $E$ edges satisfies $E \le 3n - 6$.`,
    proof: String.raw`If $G$ has at most $2$ edges then $E \le 2 \le 3n - 6$ for $n \ge 3$ (here $3n - 6 \ge 3$), so we may assume $E \ge 3$.

*Reduction to the 2-connected case.* Adding edges only increases $E$, so it suffices to prove $E \le 3n - 6$ for an edge-maximal simple planar graph $G$ on its $n \ge 3$ vertices (no further edge can be drawn without a crossing); the bound then descends to the original graph, which has no more edges. Such a $G$ is **2-connected**: it is connected (otherwise an edge could join two components through a shared face), and it has no cut vertex $v$ — if it did, two vertices lying in different components of $G - v$ would sit on a common face incident to $v$ and could be joined by a crossing-free edge, contradicting maximality. In particular $G$ has no bridge. In a $2$-connected plane graph every face is bounded by a **cycle** (a standard structural fact: each face's boundary walk is a simple cycle), and since $G$ is simple every cycle has length $\ge 3$; hence each face boundary uses at least $3$ edges.

*The double count.* Take a plane drawing of the edge-maximal $G$; by **Euler's formula** $n - E + F = 2$. Count, over all faces, the lengths of their boundary walks. Every edge has exactly two sides, each lying on the boundary walk of exactly one face (the two sides of a bridge belong to the same face, both still counted), so
$$\sum_{\text{faces}} (\text{boundary-walk length}) = 2E \quad\text{exactly}.$$
Each boundary walk has length $\ge 3$ (shown above), so $3F \le 2E$, giving $F \le \tfrac{2}{3} E$. Substituting into Euler's formula, $2 = n - E + F \le n - E + \tfrac{2}{3} E = n - \tfrac{1}{3} E$, hence $\tfrac{1}{3} E \le n - 2$, i.e. $E \le 3n - 6$. As this holds for the edge-maximal supergraph, it holds for $G$. $\square$`,
  },
  {
    id: 'five-color-theorem',
    label: 'Five Colour Theorem',
    title: 'Five Colour Theorem',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['planar-graph', 'planar-edge-bound', 'graph-coloring', 'path-and-cycle', 'connectivity'],
    description: String.raw`Every planar graph can be properly coloured with five colours. Unlike the four-colour theorem, this has a short, fully human-checkable proof: the edge bound guarantees a vertex of degree at most five, and a clever Kempe-chain argument frees up a colour for it even in the degree-five case. It captures most of the difficulty of map colouring while remaining elementary.`,
    statement: String.raw`Every simple planar graph is $5$-colourable; that is, $\chi(G) \le 5$ for planar $G$.`,
    proof: String.raw`We may assume $G$ is connected: a graph is properly $5$-colourable iff each of its **connected components** is, since distinct components share no edge, so a colouring of each component (using the same palette $\{1, \dots, 5\}$) assembles to a colouring of $G$. So assume $G$ is connected and induct on $n = |V|$. For $n \le 5$ colour each vertex differently. For $n > 5$: by the **planar edge bound** (applicable since $G$ is simple, planar, connected, with $n \ge 3$) $E \le 3n - 6$, so the average degree is $2E/n < 6$, whence some vertex $v$ has $\deg(v) \le 5$. The graph $G - v$ is planar with $n - 1$ vertices (not necessarily connected, but that is handled by the first reduction applied to the inductive hypothesis), so by induction it has a proper $5$-colouring $c$.

If the neighbours of $v$ use at most $4$ colours, give $v$ a missing colour and we are done. Otherwise $\deg(v) = 5$ and the five neighbours, in the cyclic order they appear around $v$ in a plane drawing, carry five distinct colours; label them $v_1, \dots, v_5$ with colours $1, \dots, 5$. Consider the subgraph $H_{13}$ induced by colours $1$ and $3$ (the **Kempe chain** construction). If $v_1$ and $v_3$ lie in different connected components of $H_{13}$, swap colours $1 \leftrightarrow 3$ throughout $v_1$'s component; this keeps the colouring proper and now frees colour $1$ at $v$. If instead $v_1$ and $v_3$ are joined by a path in $H_{13}$, that path together with $v$ encloses either $v_2$ or $v_4$ inside a closed region (by the cyclic order and the planar drawing), so $v_2$ and $v_4$ lie in *different* components of the colour-$2$-and-$4$ subgraph $H_{24}$; swapping colours $2 \leftrightarrow 4$ in $v_2$'s component frees colour $2$ at $v$. Either way a colour becomes available for $v$, completing the $5$-colouring of $G$. $\square$`,
  },
  {
    id: 'four-color-theorem',
    label: 'Four Colour Theorem',
    title: 'Four Colour Theorem',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['planar-graph', 'planar-edge-bound', 'graph-coloring', 'five-color-theorem', 'handshaking-lemma'],
    description: String.raw`Every planar graph can be properly coloured with four colours — equivalently, the regions of any map can be coloured with four colours so that bordering regions differ. Conjectured in 1852 and proved by Appel and Haken in 1976, it was the first major theorem whose proof relied essentially on a computer, verifying that a large but finite catalogue of "reducible configurations" is unavoidable. The result provoked lasting debate about what counts as a proof; the easier five-colour bound, by contrast, is elementary.`,
    statement: String.raw`Every simple planar graph is $4$-colourable: $\chi(G) \le 4$ for planar $G$.`,
    proof: String.raw`The proof is by the **discharging / reducibility** method of Appel–Haken (later streamlined by Robertson–Sanders–Seymour–Thomas), and its decisive step is a finite verification carried out by computer; we describe its genuine structure rather than reproduce the machine check.

Suppose, for contradiction, a minimal counterexample exists: a planar graph $G$, with the fewest vertices, that is not $4$-colourable. As in the **five colour theorem**, the **planar edge bound** forces low-degree vertices, and minimality forbids certain local patterns: a **configuration** (a small subgraph with its surrounding structure) is **reducible** if any $4$-colouring of the rest of the graph can be extended across it — so a minimal counterexample can contain *no* reducible configuration. One exhibits an explicit finite set $\mathcal{C}$ of configurations and proves two things:

1. **Reducibility.** Every configuration in $\mathcal{C}$ is reducible. Each case is a finite combinatorial check on $4$-colourings of a bounded region (via Kempe-chain interchanges as in the five-colour argument); there are $1{,}476$ configurations in the original proof, and this is the step performed and verified by computer.

2. **Unavoidability.** Every planar graph (hence the minimal counterexample) must contain at least one configuration from $\mathcal{C}$. This is shown by a *discharging* argument: assign each vertex the "charge" $6 - \deg(v)$. By the **handshaking lemma** $\sum_v (6 - \deg(v)) = 6V - 2E$, which by the **planar edge bound** $E \le 3V - 6$ is at least $6V - 2(3V - 6) = 12 > 0$ — the total charge is strictly positive. Charge is then redistributed by fixed local rules (preserving the total); if a planar graph contained *no* configuration of $\mathcal{C}$, these rules would leave every vertex with non-positive final charge, contradicting the positive total. Hence every planar graph contains some configuration of $\mathcal{C}$.

A minimal counterexample would thus contain a configuration that is both unavoidable and reducible — but reducibility says it cannot occur in a minimal counterexample. The contradiction shows no counterexample exists, so every planar graph is $4$-colourable. $\square$`,
  },

  // ── Matching ────────────────────────────────────────────────────────────────
  {
    id: 'matching',
    label: 'Matching',
    title: 'Matching',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph'],
    description: String.raw`A **matching** pairs up vertices using disjoint edges — a set of edges no two of which share an endpoint, so each vertex is matched to at most one partner. A **perfect matching** pairs everyone. Matchings model assignment, scheduling, and pairing problems (workers to jobs, organs to recipients), and the central questions ask how large a matching can be and when a complete pairing exists.`,
    definition: String.raw`A **matching** in $G = (V, E)$ is a set $M \subseteq E$ of pairwise disjoint edges: no two edges of $M$ share a vertex. A vertex incident to an edge of $M$ is **matched** (or saturated) by $M$, the others **unmatched**. $M$ is a **maximum** matching if no matching has more edges, and a **perfect** matching if it saturates every vertex (so $|M| = |V|/2$).`,
  },
  {
    id: 'halls-theorem',
    label: 'Hall’s Theorem',
    title: 'Hall’s Marriage Theorem',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['matching', 'bipartite-graph'],
    description: String.raw`Hall's marriage theorem gives the exact condition for matching one side of a bipartite graph completely into the other: it can be done precisely when no set of vertices is "over-subscribed" — every subset $S$ of one side must have at least $|S|$ neighbours on the other. The condition is obviously necessary (you cannot match $k$ vertices into fewer than $k$ partners); the content is that this single, checkable obstruction is the only one.`,
    statement: String.raw`Let $G$ be a bipartite graph with bipartition $(X, Y)$. There is a matching saturating $X$ if and only if **Hall's condition** holds:
$$|N(S)| \ge |S| \quad \text{for every } S \subseteq X,$$
where $N(S) = \bigcup_{x \in S} N(x)$ is the set of all neighbours of vertices in $S$.`,
    proof: String.raw`($\Rightarrow$) If a **matching** $M$ saturates $X$, then for any $S \subseteq X$ the partners $\{M(x) : x \in S\}$ are $|S|$ distinct vertices of $Y$ (distinct because $M$ pairs disjointly), all lying in $N(S)$; hence $|N(S)| \ge |S|$.

($\Leftarrow$) Suppose Hall's condition holds; induct on $|X|$. If $|X| \le 1$ a single edge (which exists since $|N(\{x\})| \ge 1$) matches $X$. Otherwise distinguish two cases.

*Case A: every non-empty proper subset $S \subsetneq X$ has the slack $|N(S)| \ge |S| + 1$.* Pick any $x \in X$ and any neighbour $y \in N(x)$, match them, and delete both. For any $S \subseteq X \setminus \{x\}$, deleting $y$ removes at most one neighbour, so its neighbourhood in the smaller graph has size $\ge |N(S)| - 1 \ge |S|$ (using the slack). Hall's condition holds for the smaller **bipartite graph**, which by induction has a matching saturating $X \setminus \{x\}$; adding $\{x, y\}$ saturates $X$.

*Case B: some non-empty proper $S \subsetneq X$ is tight, $|N(S)| = |S|$.* By induction Hall's condition restricted to $S$ (with neighbourhoods inside $N(S)$) gives a matching $M_1$ saturating $S$ into $N(S)$. Consider the rest, $X' = X \setminus S$ matched into $Y' = Y \setminus N(S)$. For any $T \subseteq X'$, the neighbours of $S \cup T$ satisfy $|N(S \cup T)| \ge |S \cup T| = |S| + |T|$; since neighbours of $T$ outside $N(S)$ number $|N(S \cup T)| - |N(S)| \ge |T|$, Hall's condition holds for $(X', Y')$. By induction it has a matching $M_2$ saturating $X'$, disjoint from $M_1$. Then $M_1 \cup M_2$ saturates $X$. $\square$`,
  },
  {
    id: 'vertex-cover',
    label: 'Vertex Cover',
    title: 'Vertex Cover',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph'],
    description: String.raw`A **vertex cover** is a set of vertices that touches every edge — a guard placement where each edge has a guard at one of its ends. It is the natural dual to a matching: a matching is edges that avoid sharing vertices, a cover is vertices that meet all edges. Minimizing a cover and maximizing a matching turn out to be tightly linked, especially in bipartite graphs.`,
    definition: String.raw`A **vertex cover** of $G = (V, E)$ is a set $C \subseteq V$ such that every edge has at least one endpoint in $C$:
$$\forall\, \{u, v\} \in E,\quad u \in C \ \text{or}\ v \in C.$$
A **minimum vertex cover** is one of smallest size.`,
  },
  {
    id: 'konigs-theorem',
    label: 'König’s Theorem',
    title: 'König’s Theorem',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['matching', 'vertex-cover', 'bipartite-graph', 'halls-theorem'],
    description: String.raw`In a bipartite graph the largest matching and the smallest vertex cover have exactly the same size. One inequality is universal — every edge of a matching needs its own cover vertex, so a cover is at least as big as any matching. König's theorem says that in the bipartite case equality is always achieved, a clean min-max identity that is the combinatorial heart of bipartite matching and a special case of LP duality and max-flow min-cut.`,
    statement: String.raw`In any bipartite graph $G$, the size of a maximum matching equals the size of a minimum vertex cover:
$$\max_{M\ \text{matching}} |M| \;=\; \min_{C\ \text{vertex cover}} |C|.$$`,
    proof: String.raw`($\ge$ for covers, i.e. $|M| \le |C|$ always.) Each edge of a **matching** $M$ must be covered by some vertex of a **vertex cover** $C$, and distinct edges of $M$ are vertex-disjoint, so they require distinct cover vertices; hence $|C| \ge |M|$. Thus $\min |C| \ge \max |M|$.

($\le$, the bipartite equality.) Let $(X, Y)$ be the bipartition and let $M$ be a maximum matching, of size $m$. We build a vertex cover of size exactly $m$. Let $U \subseteq X$ be the $M$-unmatched vertices of $X$. Let $Z$ be the set of all vertices reachable from $U$ by **alternating paths** (paths starting at $U$ whose edges alternate between non-matching and matching edges). Put
$$C := (X \setminus Z) \cup (Y \cap Z).$$
*Every edge is covered.* Take an edge $e = \{x, y\}$ with $x \in X$, $y \in Y$. If $x \notin Z$ then $x \in X \setminus Z \subseteq C$ and $e$ is covered. So suppose $x \in Z$; we show $y \in Z$. There is an alternating path $P$ from $U$ to $x$. If $x$ is unmatched then $x \in U$ and $P$ is trivial; appending the non-matching edge $e$ extends it to reach $y$. If $x$ is matched then, since an alternating path from $U \subseteq X$ leaves $X$-vertices by non-matching edges and enters $X$-vertices by matching edges, $P$ arrives at $x$ via a matching edge; hence $e \notin M$ (else $e$ would be that matching edge and $y$ already lies on $P$), and appending the non-matching edge $e$ extends $P$ to reach $y$. In every case $y$ is reachable, so $y \in Y \cap Z \subseteq C$ and $e$ is covered.
*Size.* $C$ contains no $M$-unmatched vertex: $X \setminus Z$ excludes $U$ (which lies in $Z$), and any unmatched $y \in Y$ in $Z$ would close an **augmenting path** from $U$, contradicting maximality of $M$ (an augmenting path would yield a larger matching, as in the proof of **Hall's theorem**). So every vertex of $C$ is matched. Finally, no edge of $M$ has *both* endpoints in $C$: if $\{x, y\} \in M$ with $x \in X \setminus Z$ and $y \in Y \cap Z$, the matching edge $\{x,y\}$ would let the alternating path reaching $y$ continue to $x$, forcing $x \in Z$ — contradiction. These two facts give an injection $C \to M$ sending each (matched) vertex of $C$ to its matching edge — well defined because every vertex of $C$ is matched, and injective because no matching edge has both endpoints in $C$ — so $|C| \le m$. Since $C$ is a vertex cover, weak duality gives $|C| \ge |M| = m$. Therefore $|C| = m$, so $C$ is a minimum vertex cover and $\min_C |C| = \max_M |M|$. $\square$`,
  },

  // ── Flows ───────────────────────────────────────────────────────────────────
  {
    id: 'network-flow',
    label: 'Flow Network',
    title: 'Flow Network',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['directed-graph'],
    description: String.raw`A **flow network** is a directed graph whose arcs have capacities, with a designated **source** producing material and **sink** consuming it — a model of pipes, traffic, or data. A **flow** routes material from source to sink, never exceeding any pipe's capacity and conserving material at every intermediate node (whatever flows in flows out). The **value** of the flow is the net amount leaving the source, and the basic problem is to maximize it.`,
    definition: String.raw`A **flow network** is a directed graph $D = (V, A)$ with a **capacity** $c : A \to [0, \infty)$ and two distinguished vertices, the **source** $s$ and **sink** $t$. A **flow** is a function $f : A \to [0, \infty)$ satisfying
$$0 \le f(a) \le c(a)\ \text{for every arc } a \quad\text{(capacity)},$$
$$\sum_{a \ \text{into}\ v} f(a) \;=\; \sum_{a \ \text{out of}\ v} f(a)\quad\text{for every } v \neq s, t \quad\text{(conservation)}.$$
The **value** of $f$ is the net flow out of the source, $|f| := \sum_{a\ \text{out of}\ s} f(a) - \sum_{a\ \text{into}\ s} f(a)$.`,
  },
  {
    id: 'max-flow-min-cut',
    label: 'Max-Flow Min-Cut',
    title: 'Max-Flow Min-Cut Theorem',
    kind: 'theorem',
    tags: ['Graph Theory'],
    dependencies: ['network-flow', 'directed-graph'],
    description: String.raw`The **max-flow min-cut theorem** equates the most you can push from source to sink with the cheapest way to sever them. A **cut** splits the vertices into the source's side and the sink's side; its capacity is the total capacity of arcs crossing forward. Every flow is bounded by every cut (all material must cross), and the theorem says these two bounds meet: the maximum flow value equals the minimum cut capacity — a cornerstone of combinatorial optimization, realized algorithmically by Ford–Fulkerson.`,
    statement: String.raw`In any flow network with source $s$ and sink $t$, the maximum value of a flow equals the minimum capacity of an $s$–$t$ cut, where an **$s$–$t$ cut** is a partition $V = S \sqcup T$ with $s \in S$, $t \in T$, of capacity $\operatorname{cap}(S, T) = \sum_{a \text{ from } S \text{ to } T} c(a)$.`,
    proof: String.raw`*Weak duality: every flow value is at most every cut capacity.* Fix a flow $f$ and a cut $(S, T)$. Summing the conservation equation over all $v \in S \setminus \{s\}$ and adding the source term, the value $|f|$ equals the net flow across the cut: $|f| = \sum_{a: S \to T} f(a) - \sum_{a: T \to S} f(a)$. Since $0 \le f(a) \le c(a)$, the first sum is $\le \operatorname{cap}(S, T)$ and the second is $\ge 0$, so $|f| \le \operatorname{cap}(S, T)$. In particular $\max |f| \le \min \operatorname{cap}(S, T)$.

*Equality.* Let $f$ be a flow of maximum value (one exists: the value is bounded above by any cut capacity, and the feasible flows form a compact set on which $|f|$ is continuous). Build the **residual** notion: an arc $a = (u, v)$ admits residual capacity $c(a) - f(a) > 0$ forward, and each arc carrying $f(a) > 0$ admits residual capacity backward. Let $S$ be the set of vertices reachable from $s$ along residual capacity. Then $t \notin S$: a residual path from $s$ to $t$ would be an **augmenting path** along which $f$ could be increased, contradicting maximality. So $(S, V \setminus S)$ is an $s$–$t$ cut. By the definition of $S$, every arc from $S$ to $T = V \setminus S$ has *no* forward residual capacity, i.e. $f(a) = c(a)$ (it is saturated), and every arc from $T$ to $S$ has no backward residual capacity, i.e. $f(a) = 0$. Substituting into the cut identity,
$$|f| = \sum_{a: S \to T} f(a) - \sum_{a: T \to S} f(a) = \sum_{a: S \to T} c(a) - 0 = \operatorname{cap}(S, T).$$
Thus this flow's value equals this cut's capacity. By weak duality no flow can exceed and no cut can fall below this common number, so it is simultaneously the maximum flow value and the minimum cut capacity. $\square$`,
  },

  // ── Algebraic graph theory ──────────────────────────────────────────────────
  {
    id: 'adjacency-matrix',
    label: 'Adjacency Matrix',
    title: 'Adjacency Matrix',
    kind: 'definition',
    tags: ['Graph Theory'],
    dependencies: ['graph', 'matrix', 'eigenvalue-eigenvector'],
    description: String.raw`The **adjacency matrix** turns a graph into a square matrix, recording a $1$ wherever two vertices are joined and $0$ otherwise. This algebraic encoding is surprisingly powerful: matrix powers count walks of a given length, and the matrix's eigenvalues — the graph's **spectrum** — read off connectivity, bipartiteness, and how well the graph expands, the subject of spectral graph theory.`,
    definition: String.raw`Fix an ordering $v_1, \dots, v_n$ of the vertices of $G$. The **adjacency matrix** is the $n \times n$ symmetric matrix $A = (A_{ij})$ with
$$A_{ij} = \begin{cases} 1 & \{v_i, v_j\} \in E, \\ 0 & \text{otherwise.}\end{cases}$$
It has zero diagonal (no loops) and is symmetric ($A = A^{\mathsf{T}}$, since edges are unordered). Reordering the vertices conjugates $A$ by a permutation matrix, so its **spectrum** (multiset of eigenvalues) is an invariant of $G$.`,
  },
  {
    id: 'walk-counting',
    label: 'Walk Counting',
    title: 'Powers of the Adjacency Matrix Count Walks',
    kind: 'proposition',
    tags: ['Graph Theory'],
    dependencies: ['adjacency-matrix', 'path-and-cycle', 'matrix'],
    description: String.raw`The entries of the $k$-th power of the adjacency matrix have a clean combinatorial meaning: $(A^k)_{ij}$ is the number of walks of length $k$ from vertex $i$ to vertex $j$. The reason is exactly the rule for matrix multiplication — summing over intermediate vertices is the same as concatenating a walk's last step onto all shorter walks. This is the bridge from linear algebra to graph structure.`,
    statement: String.raw`Let $A$ be the adjacency matrix of $G$ with vertices $v_1, \dots, v_n$. For every integer $k \ge 0$, the entry $(A^k)_{ij}$ equals the number of walks of length $k$ from $v_i$ to $v_j$ in $G$.`,
    proof: String.raw`Induct on $k$. For $k = 0$, $A^0 = I$, and $(I)_{ij} = 1$ iff $i = j$, matching the unique length-$0$ walk from $v_i$ to itself and none otherwise. For $k = 1$, $(A)_{ij} = 1$ iff $\{v_i, v_j\} \in E$, which is exactly the number of length-$1$ **walks** from $v_i$ to $v_j$.

Assume the claim for $k$. By the definition of **matrix** product,
$$(A^{k+1})_{ij} = (A^k A)_{ij} = \sum_{\ell = 1}^{n} (A^k)_{i\ell}\, A_{\ell j}.$$
A walk of length $k+1$ from $v_i$ to $v_j$ is uniquely a walk of length $k$ from $v_i$ to some vertex $v_\ell$, followed by an edge $\{v_\ell, v_j\}$. The number of such walks through a given $v_\ell$ is (walks of length $k$ to $v_\ell$) $\times$ (whether $v_\ell v_j$ is an edge) $= (A^k)_{i\ell} \cdot A_{\ell j}$, by the induction hypothesis and the case $k = 1$. Summing over $\ell$ gives the total number of length-$(k+1)$ walks from $v_i$ to $v_j$, which is exactly $(A^{k+1})_{ij}$. $\square$`,
  },
]
