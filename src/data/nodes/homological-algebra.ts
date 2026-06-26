import type { MathNode } from '../types'

export const HOMOLOGICAL_ALGEBRA_NODES: MathNode[] = [
  // ── Exact sequences and the snake ──────────────────────────────────────────
  {
    id: 'short-exact-sequence',
    label: 'Short Exact Sequence',
    title: 'Short Exact Sequence',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['exact-sequence', 'module', 'kernel-image', 'isomorphism-theorems'],
    description: String.raw`The smallest unit of exactness packages how one module is assembled from a sub-object and a quotient. A short exact sequence has an injection on the left, a surjection on the right, and exactness in the middle, so the middle term sits between the two ends exactly as a group sits between a normal subgroup and the corresponding quotient. It records an *extension problem*: given the two ends, how many middle terms are there? When the sequence splits, the answer is the trivial one, a direct sum; the failure to split is what $\operatorname{Ext}^1$ will measure.`,
    definition: String.raw`A **short exact sequence** of $R$-modules is an **exact sequence**
$$0 \longrightarrow A \xrightarrow{\ f\ } B \xrightarrow{\ g\ } C \longrightarrow 0,$$
meaning $f$ is injective ($\ker f = 0$), $g$ is surjective ($\operatorname{im} g = C$), and $\operatorname{im} f = \ker g$. It exhibits $B$ as an **extension** of $C$ by $A$: by the first isomorphism theorem (**isomorphism-theorems**) $C \cong B/f(A)$, with $f(A) \cong A$. The sequence **splits** if there is a section $s : C \to B$ with $g \circ s = \mathrm{id}_C$ (equivalently a retraction $r : B \to A$ with $r \circ f = \mathrm{id}_A$), and then $B \cong A \oplus C$.`,
    proof: String.raw`**A section yields $B \cong A \oplus C$.** Suppose $g \circ s = \mathrm{id}_C$. For $b \in B$, put $c = g(b)$; then $g(b - s(c)) = g(b) - c = 0$, so $b - s(c) \in \ker g = \operatorname{im} f$ (using **kernel-image** and exactness), giving a unique $a \in A$ with $f(a) = b - s(c)$ (uniqueness as $f$ is injective). Thus $b = f(a) + s(c)$, so $B = \operatorname{im} f + \operatorname{im} s$. The sum is direct: if $f(a) = s(c)$ then $0 = g(f(a)) = g(s(c)) = c$, whence $s(c) = 0$ and then $f(a) = 0$, so $a = 0$. The map $A \oplus C \to B$, $(a,c) \mapsto f(a) + s(c)$, is therefore an isomorphism of modules. The retraction case is dual. $\square$`,
  },
  {
    id: 'snake-lemma',
    label: 'Snake Lemma',
    title: 'Snake Lemma',
    kind: 'lemma',
    tags: ['Homological Algebra'],
    dependencies: ['short-exact-sequence', 'kernel-cokernel', 'kernel-image'],
    description: String.raw`The snake lemma is the fundamental diagram chase: a vertical map between two short exact sequences cannot mix up kernels and cokernels arbitrarily, and the precise constraint is a single six-term exact sequence linking them. Its decisive feature is the **connecting homomorphism**, which "snakes" from the kernels on the top row down and across to the cokernels on the bottom row, built by partial inverses of the maps in the diagram. Specializing the two rows to the pieces of a chain complex turns this one lemma into the long exact sequence in homology, the engine of every computation in the subject.`,
    statement: String.raw`Consider a commutative diagram of $R$-modules with exact rows
$$\begin{array}{ccccccccc} & & A & \xrightarrow{f} & B & \xrightarrow{g} & C & \to & 0 \\ & & \downarrow{\scriptstyle a} & & \downarrow{\scriptstyle b} & & \downarrow{\scriptstyle c} & & \\ 0 & \to & A' & \xrightarrow{f'} & B' & \xrightarrow{g'} & C' & & \end{array}$$
(top row exact at $A, B, C$; bottom row exact at $A', B', C'$). Then there is an exact sequence
$$\ker a \to \ker b \to \ker c \xrightarrow{\ \delta\ } \operatorname{coker} a \to \operatorname{coker} b \to \operatorname{coker} c,$$
where the outer maps are induced by $f, g, f', g'$ and $\delta$ is the **connecting homomorphism**. If $f$ is injective so is $\ker a \to \ker b$; if $g'$ is surjective so is $\operatorname{coker} b \to \operatorname{coker} c$.`,
    proof: String.raw`*Induced maps.* If $x \in \ker a$ then $b(f(x)) = f'(a(x)) = 0$, so $f$ restricts to $\ker a \to \ker b$; likewise $g$ restricts to $\ker b \to \ker c$. Dually, $f'$ sends $\operatorname{im} a$ into $\operatorname{im} a' $... more precisely $f'$ descends to $\operatorname{coker} a \to \operatorname{coker} b$ since $f'(\operatorname{im} a) = b(\operatorname{im} f) \subseteq \operatorname{im} b$ by commutativity, and similarly $g'$ descends to $\operatorname{coker} b \to \operatorname{coker} c$ (using **kernel-cokernel**).

*Construction of $\delta$.* Let $z \in \ker c$. Since $g$ is surjective, choose $b_0 \in B$ with $g(b_0) = z$. Then $g'(b(b_0)) = c(g(b_0)) = c(z) = 0$, so $b(b_0) \in \ker g' = \operatorname{im} f'$; as $f'$ is injective there is a unique $a' \in A'$ with $f'(a') = b(b_0)$. Define $\delta(z) = a' + \operatorname{im} a \in \operatorname{coker} a$. *Well-defined:* another lift $b_1$ of $z$ differs by $b_0 - b_1 \in \ker g = \operatorname{im} f$, say $b_0 - b_1 = f(x)$; then $f'(a'_0 - a'_1) = b(f(x)) = f'(a(x))$, so $a'_0 - a'_1 = a(x) \in \operatorname{im} a$, leaving the class unchanged. Linearity of $\delta$ is clear from the construction.

*Exactness at $\ker c$ (representative case).* If $z = g(y)$ with $y \in \ker b$, lift $z$ by $b_0 = y$; then $b(b_0) = 0 = f'(0)$, so $\delta(z) = 0$: thus $\operatorname{im}(\ker b \to \ker c) \subseteq \ker \delta$. Conversely if $\delta(z) = 0$, the chosen $a'$ lies in $\operatorname{im} a$, $a' = a(x)$; replacing the lift $b_0$ by $b_0 - f(x)$ gives a lift $b_1$ with $b(b_1) = b(b_0) - f'(a(x)) = 0$, so $b_1 \in \ker b$ and $g(b_1) = z$, placing $z$ in the image. The remaining exactness at $\ker b$, $\operatorname{coker} a$, $\operatorname{coker} b$ is the analogous chase, each step using exactness of a row and injectivity/surjectivity of one map. The two extremal statements are immediate: if $f$ is injective then $\ker a \to \ker b$ is its restriction, still injective; dually for $g'$ surjective. $\square$`,
  },
  {
    id: 'long-exact-sequence',
    label: 'Long Exact Sequence',
    title: 'Long Exact Sequence in Homology',
    kind: 'theorem',
    tags: ['Homological Algebra'],
    dependencies: ['snake-lemma', 'chain-complex', 'homology', 'chain-map', 'short-exact-sequence', 'kernel-image'],
    description: String.raw`A short exact sequence of chain complexes does not, in general, give a short exact sequence on homology — tensoring or applying a functor breaks exactness — but the damage is controlled and entirely visible. The defect organizes into a single long exact sequence threading the homology of the three complexes together, degree by degree, joined by connecting maps. This is the most-used computational tool of the subject: it is what relates the homology of a space to that of a subspace, what produces the long exact sequences of $\operatorname{Ext}$ and $\operatorname{Tor}$, and what makes derived functors a coherent theory rather than a list of groups.`,
    statement: String.raw`Let $0 \to A_\bullet \xrightarrow{f} B_\bullet \xrightarrow{g} C_\bullet \to 0$ be a short exact sequence of **chain complexes** (each $f_n, g_n$ fitting a short exact sequence of modules, commuting with the differentials). Then there are **connecting homomorphisms** $\delta : H_n(C_\bullet) \to H_{n-1}(A_\bullet)$ and a long exact sequence
$$\cdots \to H_n(A_\bullet) \xrightarrow{f_*} H_n(B_\bullet) \xrightarrow{g_*} H_n(C_\bullet) \xrightarrow{\ \delta\ } H_{n-1}(A_\bullet) \xrightarrow{f_*} H_{n-1}(B_\bullet) \to \cdots$$
natural in the short exact sequence.`,
    proof: String.raw`Write $\partial$ for every differential. For each $n$, the differentials assemble into a commutative diagram with exact rows
$$\begin{array}{ccccccccc} & & A_n/\operatorname{im}\partial & \to & B_n/\operatorname{im}\partial & \to & C_n/\operatorname{im}\partial & \to & 0 \\ & & \downarrow{\scriptstyle \partial} & & \downarrow{\scriptstyle \partial} & & \downarrow{\scriptstyle \partial} & & \\ 0 & \to & \ker\partial_{n-1}(A) & \to & \ker\partial_{n-1}(B) & \to & \ker\partial_{n-1}(C) & & \end{array}$$
where the vertical maps are induced by $\partial : X_n \to X_{n-1}$ (well-defined because $\partial \circ \partial = 0$ from **chain-complex**, so $\partial$ kills $\operatorname{im}\partial$ and lands in $\ker\partial$). The rows are exact because $0 \to A_\bullet \to B_\bullet \to C_\bullet \to 0$ is termwise short exact and the right-exact (resp. left-exact) functors $X_n \mapsto X_n/\operatorname{im}\partial$ and $X_n \mapsto \ker\partial$ preserve the relevant exactness. Now apply the **snake-lemma** to this diagram. By definition $\ker(\partial : X_n/\operatorname{im}\partial \to \ker\partial_{n-1}) = \ker\partial_n/\operatorname{im}\partial_{n+1} = H_n(X_\bullet)$ and, dually, $\operatorname{coker}$ of the vertical map is $\ker\partial_{n-1}/\operatorname{im}\partial_n = H_{n-1}(X_\bullet)$ (using **homology** and **kernel-image**). The snake lemma's six-term sequence is therefore exactly
$$H_n(A) \to H_n(B) \to H_n(C) \xrightarrow{\delta} H_{n-1}(A) \to H_{n-1}(B) \to H_{n-1}(C),$$
and splicing these together over all $n$ gives the long exact sequence; the maps $f_*, g_*$ are the maps on homology induced by the **chain-map**s $f, g$. Naturality follows from the naturality of the snake lemma's connecting map under a morphism of the two diagrams. $\square$`,
  },

  // ── Chain maps, homotopy, quasi-isomorphism ────────────────────────────────
  {
    id: 'chain-map',
    label: 'Chain Map',
    title: 'Chain Map',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['chain-complex', 'homology'],
    description: String.raw`The morphisms of chain complexes are the degreewise maps that commute with the differentials. Commuting with the differential is exactly the condition needed to carry cycles to cycles and boundaries to boundaries, so a chain map descends to a homomorphism on homology in each degree. This functoriality — complexes to homology — is what lets topological or algebraic constructions be tracked through their invariants.`,
    definition: String.raw`A **chain map** $f : A_\bullet \to B_\bullet$ between **chain complexes** is a family of homomorphisms $f_n : A_n \to B_n$ commuting with the differentials, $\partial^B_n \circ f_n = f_{n-1} \circ \partial^A_n$ for all $n$. Such an $f$ sends cycles to cycles and boundaries to boundaries, hence induces a well-defined map on **homology** $f_* : H_n(A_\bullet) \to H_n(B_\bullet)$, $[z] \mapsto [f_n(z)]$, and $(g \circ f)_* = g_* \circ f_*$, $(\mathrm{id})_* = \mathrm{id}$.`,
    proof: String.raw`**$f_*$ is well-defined.** If $z \in \ker\partial^A_n$ (a cycle) then $\partial^B_n(f_n z) = f_{n-1}(\partial^A_n z) = 0$, so $f_n z$ is a cycle. If $z = \partial^A_{n+1} w$ is a boundary then $f_n z = f_n \partial^A_{n+1} w = \partial^B_{n+1}(f_{n+1} w)$ is a boundary. Thus $f_n$ carries $\ker\partial^A_n$ into $\ker\partial^B_n$ and $\operatorname{im}\partial^A_{n+1}$ into $\operatorname{im}\partial^B_{n+1}$, so it descends to $H_n(A_\bullet) = \ker\partial^A_n/\operatorname{im}\partial^A_{n+1} \to H_n(B_\bullet)$, independently of the representative. Functoriality $(g\circ f)_* = g_* \circ f_*$ is immediate from $(g\circ f)_n = g_n \circ f_n$ on representatives. $\square$`,
  },
  {
    id: 'chain-homotopy',
    label: 'Chain Homotopy',
    title: 'Chain Homotopy',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['chain-map'],
    description: String.raw`Two chain maps may look different yet act identically on homology; the algebraic reason is a chain homotopy, a degree-raising map whose differential-sandwich measures the difference of the two maps. It is the exact algebraic shadow of a continuous deformation of one map into another: in topology, homotopic maps of spaces induce chain-homotopic maps of singular complexes. Because homotopic chain maps agree on homology, homology depends only on the homotopy type of a complex, which is what makes the notion of homotopy equivalence of complexes — and ultimately the derived category — the right level of abstraction.`,
    definition: String.raw`A **chain homotopy** between **chain map**s $f, g : A_\bullet \to B_\bullet$ is a family of homomorphisms $h_n : A_n \to B_{n+1}$ (degree $+1$, not required to commute with differentials) such that
$$f_n - g_n = \partial^B_{n+1} \circ h_n + h_{n-1} \circ \partial^A_n \quad\text{for all } n.$$
When such an $h$ exists, $f$ and $g$ are **chain homotopic**, written $f \simeq g$. A chain map $f$ is a **chain homotopy equivalence** if there is a chain map $f'$ in the other direction with $f' f \simeq \mathrm{id}$ and $f f' \simeq \mathrm{id}$.`,
  },
  {
    id: 'homotopy-invariance-of-homology',
    label: 'Homotopy Invariance',
    title: 'Chain-Homotopic Maps Agree on Homology',
    kind: 'proposition',
    tags: ['Homological Algebra'],
    dependencies: ['chain-homotopy', 'homology', 'chain-map'],
    description: String.raw`This is the payoff that makes chain homotopy worth defining: if two chain maps are joined by a chain homotopy, they are indistinguishable on homology. Consequently a chain homotopy equivalence induces isomorphisms on all homology groups, so homology cannot see the difference between homotopy-equivalent complexes — the precise sense in which homology is a homotopy invariant, and the foundation for replacing a module by any of its (homotopy-equivalent) resolutions.`,
    statement: String.raw`If chain maps $f, g : A_\bullet \to B_\bullet$ are **chain homotopic**, then they induce the same map on homology: $f_* = g_* : H_n(A_\bullet) \to H_n(B_\bullet)$ for every $n$. In particular a chain homotopy equivalence induces isomorphisms on all homology groups.`,
    proof: String.raw`Let $h$ be a **chain-homotopy** with $f_n - g_n = \partial^B_{n+1} h_n + h_{n-1}\partial^A_n$. Take a homology class in $H_n(A_\bullet)$, represented by a cycle $z \in \ker\partial^A_n$. Then $\partial^A_n z = 0$, so
$$f_n(z) - g_n(z) = \partial^B_{n+1}(h_n z) + h_{n-1}(\partial^A_n z) = \partial^B_{n+1}(h_n z),$$
which is a boundary in $B_\bullet$. Hence $[f_n z] = [g_n z]$ in $H_n(B_\bullet)$, i.e. $f_*[z] = g_*[z]$ (the maps $f_*, g_*$ being well-defined by **chain-map**). For an equivalence with inverse $f'$, $f' f \simeq \mathrm{id}$ gives $f'_* f_* = (f'f)_* = \mathrm{id}_*= \mathrm{id}$ on **homology**, and symmetrically $f_* f'_* = \mathrm{id}$, so each $f_*$ is an isomorphism. $\square$`,
  },
  {
    id: 'quasi-isomorphism',
    label: 'Quasi-Isomorphism',
    title: 'Quasi-Isomorphism',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['chain-map', 'homology', 'homotopy-invariance-of-homology', 'chain-homotopy'],
    description: String.raw`A quasi-isomorphism is a chain map that is an isomorphism on homology, even if it is far from an isomorphism of complexes. This is the relation one truly cares about: a resolution is a quasi-isomorphism from a complex of nice objects to the module being resolved, and two complexes with the "same homology, compatibly" should be treated as equal. Every chain homotopy equivalence is a quasi-isomorphism, but not conversely, and forcing the converse — formally inverting all quasi-isomorphisms — is precisely the construction of the derived category.`,
    definition: String.raw`A **chain map** $f : A_\bullet \to B_\bullet$ is a **quasi-isomorphism** if the induced map $f_* : H_n(A_\bullet) \to H_n(B_\bullet)$ on **homology** is an isomorphism for every $n$. Two complexes are **quasi-isomorphic** if they are connected by a chain (zigzag) of quasi-isomorphisms. By **homotopy-invariance-of-homology**, every chain homotopy equivalence is a quasi-isomorphism; the converse fails, which is why quasi-isomorphisms must be inverted by hand to form the derived category.`,
  },

  // ── Projectives, injectives, resolutions ───────────────────────────────────
  {
    id: 'projective-module',
    label: 'Projective Module',
    title: 'Projective Module',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['module', 'short-exact-sequence'],
    description: String.raw`Projective modules are the modules over which the lifting problem always has a solution: any map out of them can be pushed back along a surjection. Equivalently, they are exactly the direct summands of free modules, so they retain the most useful feature of free modules — the freedom to define a map by sending a generating system anywhere — without insisting on an actual basis. They are the objects with respect to which $\operatorname{Hom}(P,-)$ stays exact, which is why projective resolutions are the natural raw material for computing left-derived functors and the homology-side $\operatorname{Ext}$.`,
    definition: String.raw`An $R$-**module** $P$ is **projective** if it satisfies the **lifting property**: for every surjection $g : B \twoheadrightarrow C$ and every map $\varphi : P \to C$, there exists $\tilde\varphi : P \to B$ with $g \circ \tilde\varphi = \varphi$. Equivalently, $P$ is a direct summand of a free module — there is a module $Q$ with $P \oplus Q$ free.`,
    proof: String.raw`**Lifting property $\iff$ direct summand of a free module.** ($\Leftarrow$) First, a free module $F$ with basis $(e_i)$ is projective: given $g : B \twoheadrightarrow C$ and $\varphi : F \to C$, surjectivity lets us pick $b_i \in B$ with $g(b_i) = \varphi(e_i)$, and the unique map $\tilde\varphi(e_i) = b_i$ lifts $\varphi$. If $P \oplus Q = F$ is free with projection $\pi : F \to P$ and inclusion $\iota : P \to F$ ($\pi\iota = \mathrm{id}_P$), then given $\varphi : P \to C$ lift $\varphi\pi : F \to C$ to $\psi : F \to B$ and set $\tilde\varphi = \psi\iota$; then $g\tilde\varphi = g\psi\iota = \varphi\pi\iota = \varphi$, so $P$ is projective. ($\Rightarrow$) Choose a surjection $g : F \twoheadrightarrow P$ from a free module (e.g. on a generating set of $P$). Apply the lifting property to $\varphi = \mathrm{id}_P : P \to P$ and $g$: there is $s : P \to F$ with $g s = \mathrm{id}_P$. Then the short exact sequence $0 \to \ker g \to F \xrightarrow{g} P \to 0$ splits (it has a section $s$), so by **short-exact-sequence** $F \cong \ker g \oplus P$, exhibiting $P$ as a direct summand of the free module $F$. $\square$`,
  },
  {
    id: 'injective-module',
    label: 'Injective Module',
    title: 'Injective Module',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['module', 'short-exact-sequence'],
    description: String.raw`Injective modules are the exact mirror image of projective ones: maps *into* them always extend. Where a projective lets one lift along a surjection, an injective lets one extend along an injection, so $\operatorname{Hom}(-, I)$ stays exact. The crucial structural fact — that every module embeds into an injective one (Baer) — guarantees that injective resolutions always exist, supplying the right-hand, contravariant half of derived-functor theory; $\mathbb{Q}/\mathbb{Z}$ is the prototypical injective abelian group.`,
    definition: String.raw`An $R$-**module** $I$ is **injective** if it satisfies the **extension property**: for every injection $f : A \hookrightarrow B$ and every map $\varphi : A \to I$, there exists $\tilde\varphi : B \to I$ extending $\varphi$, i.e. $\tilde\varphi \circ f = \varphi$. By **Baer's criterion** it suffices to check this for the inclusions of ideals $\mathfrak{a} \hookrightarrow R$; and (the dual of the projective case) a **short-exact-sequence** $0 \to I \to B \to C \to 0$ starting at an injective $I$ splits. Every module embeds into an injective module, so injective resolutions exist.`,
    proof: String.raw`**A short exact sequence starting at an injective splits.** Let $0 \to I \xrightarrow{f} B \xrightarrow{g} C \to 0$ be exact with $I$ injective. Apply the extension property to the injection $f : I \hookrightarrow B$ and the map $\varphi = \mathrm{id}_I : I \to I$: there is $r : B \to I$ with $r \circ f = \mathrm{id}_I$. Thus $r$ is a retraction of $f$, so by **short-exact-sequence** the sequence splits and $B \cong I \oplus C$. (That every module embeds into an injective, and Baer's criterion reducing injectivity to ideals, are standard inputs of the theory; they are named here and used below to guarantee injective resolutions exist.) $\square$`,
  },
  {
    id: 'resolution',
    label: 'Resolution',
    title: 'Projective & Injective Resolutions',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['projective-module', 'injective-module', 'chain-complex', 'quasi-isomorphism', 'homology'],
    description: String.raw`A resolution replaces a single module by an exact complex of tractable modules that has the same homological content. A projective (or free) resolution stretches off to the left with projectives mapping onto the module; an injective resolution stretches to the right with the module mapping into injectives. The point is that the module and its resolution are quasi-isomorphic, so any homological invariant can be computed on the resolution — and resolutions of nice objects are exactly the inputs a derived functor needs once the module itself is deleted.`,
    definition: String.raw`A **projective resolution** of an $R$-module $M$ is an exact sequence
$$\cdots \to P_2 \xrightarrow{d_2} P_1 \xrightarrow{d_1} P_0 \xrightarrow{\varepsilon} M \to 0$$
with every $P_i$ **projective** (a **free resolution** if each $P_i$ is free). Exactness says the **chain-complex** $P_\bullet = (\cdots \to P_1 \to P_0)$ has homology $M$ in degree $0$ and $0$ elsewhere, so $\varepsilon$ is a **quasi-isomorphism** from $P_\bullet$ to $M$ (viewed as a complex concentrated in degree $0$). An **injective resolution** is the dual exact sequence $0 \to M \xrightarrow{\eta} I^0 \to I^1 \to \cdots$ with each $I^j$ **injective**. Projective resolutions exist (map a free module onto $M$, then onto the kernel, and iterate); injective resolutions exist because every module embeds in an injective.`,
  },
  {
    id: 'comparison-theorem',
    label: 'Comparison Theorem',
    title: 'Comparison Theorem for Resolutions',
    kind: 'theorem',
    tags: ['Homological Algebra'],
    dependencies: ['resolution', 'projective-module', 'chain-homotopy', 'chain-map'],
    description: String.raw`Resolutions are not unique, so for derived functors to be well-defined one needs to know any two resolutions are interchangeable. The comparison theorem provides exactly this: a map between the modules being resolved lifts to a chain map of projective resolutions, and any two such lifts are chain homotopic. Applied to the identity map and two resolutions of the same module, it shows the resolutions are canonically chain homotopy equivalent — hence give the same homology after any functor is applied, which is the well-definedness at the heart of the whole theory.`,
    statement: String.raw`Let $P_\bullet \xrightarrow{\varepsilon} M$ be a projective **resolution** and $Q_\bullet \xrightarrow{\eta} N$ any resolution (exact complex augmented to $N$). Every module map $\alpha : M \to N$ lifts to a **chain-map** $f_\bullet : P_\bullet \to Q_\bullet$ with $\eta \circ f_0 = \alpha \circ \varepsilon$, and any two such lifts of $\alpha$ are **chain homotopic**. In particular, two projective resolutions of the same module are canonically chain homotopy equivalent.`,
    proof: String.raw`*Existence by induction.* Since $P_0$ is **projective** and $\eta : Q_0 \to N$ is surjective (exactness at $N$), the map $\alpha\varepsilon : P_0 \to N$ lifts through $\eta$ to $f_0 : P_0 \to Q_0$ with $\eta f_0 = \alpha\varepsilon$. Suppose $f_0, \dots, f_{n}$ are built commuting with the differentials. Consider $f_n d_{n+1} : P_{n+1} \to Q_n$. Its image lies in $\ker(d^Q_n) = \operatorname{im}(d^Q_{n+1})$ (exactness of $Q_\bullet$): indeed $d^Q_n f_n d_{n+1} = f_{n-1} d_n d_{n+1} = 0$. So $f_n d_{n+1} : P_{n+1} \to \operatorname{im} d^Q_{n+1}$, and since $d^Q_{n+1} : Q_{n+1} \twoheadrightarrow \operatorname{im} d^Q_{n+1}$ is surjective while $P_{n+1}$ is projective, $f_n d_{n+1}$ lifts to $f_{n+1} : P_{n+1} \to Q_{n+1}$ with $d^Q_{n+1} f_{n+1} = f_n d_{n+1}$, completing the induction.

*Uniqueness up to homotopy.* Let $f_\bullet, g_\bullet$ both lift $\alpha$ and set $\varphi = f - g$, a chain map lifting $0$ (so $\eta\varphi_0 = 0$). We build $h_n : P_n \to Q_{n+1}$ with $\varphi_n = d^Q_{n+1} h_n + h_{n-1} d_n$ (with $h_{-1} = 0$). Since $\eta\varphi_0 = 0$, $\operatorname{im}\varphi_0 \subseteq \ker\eta = \operatorname{im} d^Q_1$, and projectivity of $P_0$ lifts $\varphi_0$ to $h_0 : P_0 \to Q_1$ with $d^Q_1 h_0 = \varphi_0$. Inductively, $\varphi_n - h_{n-1} d_n$ maps $P_n$ into $\ker d^Q_n = \operatorname{im} d^Q_{n+1}$ — check: $d^Q_n(\varphi_n - h_{n-1} d_n) = \varphi_{n-1} d_n - d^Q_n h_{n-1} d_n = \varphi_{n-1} d_n - (\varphi_{n-1} - h_{n-2} d_{n-1}) d_n = h_{n-2} d_{n-1} d_n = 0$ — so projectivity of $P_n$ supplies $h_n$ with $d^Q_{n+1} h_n = \varphi_n - h_{n-1} d_n$. Thus $\varphi \simeq 0$, i.e. $f \simeq g$ via **chain-homotopy**. Applying both directions to $\mathrm{id}_M$ between two projective resolutions gives mutually inverse-up-to-homotopy chain maps, a chain homotopy equivalence. $\square$`,
  },

  // ── Tensor product, flatness ───────────────────────────────────────────────
  {
    id: 'tensor-product',
    label: 'Tensor Product',
    title: 'Tensor Product of Modules',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['module', 'short-exact-sequence'],
    description: String.raw`The tensor product is the universal recipient of bilinear maps: it linearizes a map of two variables into a single linear map on one new object. It is the natural way to extend scalars, to form $A \otimes_R B$ out of two modules, and to build the multiplication in algebras. Crucially for homological algebra, tensoring with a fixed module is *right* exact but generally not left exact — it can destroy injectivity — and the precise measurement of that failure is the functor $\operatorname{Tor}$.`,
    definition: String.raw`For a right $R$-**module** $A$ and a left $R$-module $B$, the **tensor product** $A \otimes_R B$ is the abelian group generated by symbols $a \otimes b$ ($a \in A$, $b \in B$), subject to bilinearity $(a+a')\otimes b = a\otimes b + a'\otimes b$, $a \otimes (b+b') = a\otimes b + a\otimes b'$, and balancing $ar \otimes b = a \otimes rb$. It is characterized by the **universal property**: bilinear balanced maps $A \times B \to G$ correspond to homomorphisms $A \otimes_R B \to G$. For fixed $A$, the functor $A \otimes_R -$ is **right exact**: applied to a **short-exact-sequence** $0 \to B' \to B \to B'' \to 0$ it yields an exact $A \otimes B' \to A \otimes B \to A \otimes B'' \to 0$, but the leftmost map need not be injective.`,
  },
  {
    id: 'flat-module',
    label: 'Flat Module',
    title: 'Flat Module',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['tensor-product', 'module', 'short-exact-sequence', 'projective-module'],
    description: String.raw`Flat modules are those for which tensoring loses nothing — the operation $- \otimes M$ preserves injections and so keeps short exact sequences exact. Flatness is strictly weaker than projectivity (every projective, indeed every free, module is flat) but is exactly the condition under which $M$ is "transparent" to exactness. It is the homological characterization at the heart of $\operatorname{Tor}$: a module is flat precisely when all its higher $\operatorname{Tor}$ groups vanish.`,
    definition: String.raw`A left $R$-**module** $M$ is **flat** if the functor $- \otimes_R M$ is **exact** — equivalently (since **tensor-product** is always right exact) if for every injection $f : A \hookrightarrow B$ of right modules the induced map $f \otimes \mathrm{id}_M : A \otimes_R M \to B \otimes_R M$ is again injective, so that $- \otimes_R M$ carries every **short-exact-sequence** to a short exact sequence. Free modules are flat, and direct summands of flat modules are flat, so every **projective** module is flat.`,
    proof: String.raw`**Free modules are flat.** For $M = R$, the map $A \otimes_R R \to A$, $a \otimes r \mapsto ar$, is a natural isomorphism, so $- \otimes_R R$ is the identity functor up to isomorphism, hence exact. For a free module $M = R^{(I)}$, tensoring commutes with direct sums: $A \otimes_R R^{(I)} \cong A^{(I)}$ naturally, and a direct sum of injections is injective, so $- \otimes_R M$ preserves injections, i.e. $M$ is flat. If $M \oplus N$ is flat, then for an injection $A \hookrightarrow B$ the map $(A \otimes M) \oplus (A \otimes N) \to (B \otimes M) \oplus (B \otimes N)$ is injective, hence so is each summand $A \otimes M \to B \otimes M$; thus direct summands of flat modules are flat. Since a **projective** module is a direct summand of a free module, it is flat. $\square$`,
  },

  // ── Derived functors and their incarnations ────────────────────────────────
  {
    id: 'derived-functor',
    label: 'Derived Functor',
    title: 'Derived Functor',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['resolution', 'comparison-theorem', 'functor', 'homology', 'homotopy-invariance-of-homology', 'chain-homotopy', 'long-exact-sequence'],
    description: String.raw`A derived functor repairs the failure of a functor to be exact by remembering what exactness would have given. The recipe is uniform: resolve the input by projectives (or injectives), delete the input itself, apply the functor to the resolution, and take homology. The zeroth derived functor recovers the original functor when it is one-sided exact, and the higher ones are precisely the obstructions, vanishing exactly when the functor is exact. The comparison theorem makes the output independent of the chosen resolution, so derived functors are genuine, well-defined functors.`,
    definition: String.raw`Let $F$ be an additive **functor** on $R$-modules. If $F$ is **right exact** and covariant, its **left-derived functors** $L_n F$ are defined by: take a projective **resolution** $P_\bullet \to M$, delete $M$ to get the complex $F P_\bullet = (\cdots \to F P_1 \to F P_0)$, and set
$$L_n F(M) := H_n(F P_\bullet).$$
Dually, for a left-exact functor $F$ the **right-derived functors** $R^n F(M) := H^n(F I^\bullet)$ are computed from an injective resolution $I^\bullet$ of $M$. By the **comparison-theorem** any two resolutions are chain homotopy equivalent, so $F$ applied to them gives chain homotopy equivalent complexes with the same **homology**; thus $L_n F$ and $R^n F$ are well-defined and functorial. One has $L_0 F \cong F$ (for $F$ right exact) and $R^0 F \cong F$ (for $F$ left exact), and a short exact sequence of inputs induces a **long-exact-sequence** of derived functors.`,
    proof: String.raw`**Well-definedness: independence of the resolution.** Let $P_\bullet \to M$ and $P'_\bullet \to M$ be two projective resolutions. By the **comparison-theorem** applied to $\mathrm{id}_M$, there are chain maps $f : P_\bullet \to P'_\bullet$ and $g : P'_\bullet \to P_\bullet$ with $gf \simeq \mathrm{id}_{P_\bullet}$ and $fg \simeq \mathrm{id}_{P'_\bullet}$ (a **chain-homotopy** equivalence). An additive **functor** $F$ preserves chain homotopies — if $f - g = \partial h + h\partial$ then $Ff - Fg = (Fh)$-sandwich by the same identity, since $F$ is additive and preserves composition and differentials — so $Ff$ and $Fg$ are mutually inverse up to chain homotopy on $FP_\bullet, FP'_\bullet$. By **homotopy-invariance-of-homology** they induce inverse isomorphisms $H_n(FP_\bullet) \cong H_n(FP'_\bullet)$, natural in $M$. Hence $L_nF(M)$ is independent of the resolution; the injective/right-derived case is dual. $\square$`,
  },
  {
    id: 'ext-functor',
    label: 'Ext',
    title: 'Ext Functor',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['derived-functor', 'injective-module', 'projective-module', 'short-exact-sequence'],
    description: String.raw`Ext is the derived functor of $\operatorname{Hom}$, measuring the failure of $\operatorname{Hom}$ to be exact. Because $\operatorname{Hom}$ is left exact in each variable, the interesting information lives in the higher groups. The most concrete reading is that $\operatorname{Ext}^1(A,B)$ classifies the genuinely distinct ways of building a module $E$ as an extension of $A$ by $B$ — the split extension corresponds to $0$ — so the abstract derived functor measures exactly the extension problem that short exact sequences pose. A pleasant consistency check: $\operatorname{Ext}^n$ can be computed by resolving either variable, with the same answer.`,
    definition: String.raw`For $R$-modules $A, B$, the groups $\operatorname{Ext}^n_R(A, B)$ are the **derived-functor**s of $\operatorname{Hom}$: resolve $A$ by **projective**s $P_\bullet \to A$, apply the contravariant left-exact functor $\operatorname{Hom}_R(-, B)$, and set
$$\operatorname{Ext}^n_R(A, B) := H^n\bigl(\operatorname{Hom}_R(P_\bullet, B)\bigr),$$
or equivalently resolve $B$ by **injective**s $B \to I^\bullet$ and take $H^n(\operatorname{Hom}_R(A, I^\bullet))$ (the two agree). Then $\operatorname{Ext}^0_R(A,B) = \operatorname{Hom}_R(A,B)$, and $\operatorname{Ext}^1_R(A, B)$ is in natural bijection with the set of equivalence classes of extensions, i.e. **short-exact-sequence**s $0 \to B \to E \to A \to 0$, the zero class being the split extension $E = A \oplus B$.`,
  },
  {
    id: 'tor-functor',
    label: 'Tor',
    title: 'Tor Functor',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['derived-functor', 'tensor-product', 'flat-module', 'projective-module', 'long-exact-sequence'],
    description: String.raw`Tor is the derived functor of the tensor product, measuring how far $\otimes$ is from preserving injections. Its first group is named for torsion, which it detects — over $\mathbb{Z}$, $\operatorname{Tor}_1(\mathbb{Z}/n, M)$ is the $n$-torsion of $M$ — and it vanishes identically exactly when one argument is flat. It is balanced (resolving either variable gives the same groups) and symmetric, and it governs how tensoring interacts with exact sequences, surfacing in the Künneth and universal-coefficient theorems of topology.`,
    definition: String.raw`For a right $R$-module $A$ and left $R$-module $B$, the groups $\operatorname{Tor}^R_n(A, B)$ are the left-**derived-functor**s of the **tensor-product**: resolve $A$ by **projective**s $P_\bullet \to A$, apply $- \otimes_R B$, and set
$$\operatorname{Tor}^R_n(A, B) := H_n\bigl(P_\bullet \otimes_R B\bigr),$$
or equivalently resolve $B$ (the functor is balanced). Then $\operatorname{Tor}^R_0(A,B) = A \otimes_R B$, and $\operatorname{Tor}^R_n(A, B) = 0$ for all $n \ge 1$ when either argument is **flat** — so $\operatorname{Tor}$ vanishing certifies flatness, the homological characterization of flat modules. A short exact sequence in either variable yields a **long-exact-sequence** of $\operatorname{Tor}$ groups.`,
  },
  {
    id: 'homological-dimension',
    label: 'Homological Dimension',
    title: 'Homological Dimension',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['resolution', 'projective-module', 'ext-functor', 'krull-dimension'],
    description: String.raw`Homological dimension measures how complicated a module's resolutions must be. The projective dimension is the length of the shortest projective resolution, finite when the resolution can be stopped after finitely many steps, and the global dimension of a ring is the worst case over all modules. Finiteness is a strong regularity condition rather than a curiosity: a ring has global dimension zero exactly when it is semisimple (everything splits), and the Auslander–Buchsbaum–Serre theorem identifies the Noetherian local rings of finite global dimension as precisely the regular ones, linking homology to smoothness in algebraic geometry.`,
    definition: String.raw`The **projective dimension** $\operatorname{pd}(M)$ of a module $M$ is the least $n$ such that $M$ admits a projective **resolution** $0 \to P_n \to \cdots \to P_0 \to M \to 0$ of length $n$ (and $\infty$ if no finite one exists); equivalently the least $n$ with $\operatorname{Ext}^{m}(M, -) = 0$ for all $m > n$ (via **ext-functor**). The **global dimension** of a ring $R$ is $\operatorname{gl.dim}(R) = \sup_M \operatorname{pd}(M)$ over all modules $M$. Thus $\operatorname{gl.dim}(R) = 0$ iff every module is **projective** iff $R$ is **semisimple**; and (Auslander–Buchsbaum–Serre) a Noetherian local ring is **regular** iff its global dimension is finite, in which case it equals the Krull dimension.`,
  },
  {
    id: 'derived-category',
    label: 'Derived Category',
    title: 'Derived Category',
    kind: 'definition',
    tags: ['Homological Algebra'],
    dependencies: ['chain-homotopy', 'quasi-isomorphism', 'derived-functor', 'chain-complex', 'chain-map'],
    description: String.raw`The derived category is the setting in which homological algebra reaches its natural form. One first passes to chain-homotopy classes of chain maps (the homotopy category), then formally inverts all quasi-isomorphisms, so that a complex and any of its resolutions become genuinely isomorphic. In this category derived functors become honest functors of complexes — $\operatorname{Ext}$ and $\operatorname{Tor}$ are just Hom and tensor in the derived world — and the great dualities (Serre duality, Grothendieck–Verdier) are stated as clean isomorphisms. The technical price is that the result is no longer abelian but **triangulated**: exact triangles replace short exact sequences.`,
    definition: String.raw`The **derived category** $D(\mathcal{A})$ of an abelian category $\mathcal{A}$ (e.g. $R$-modules) is built in two steps. First form the **homotopy category** $K(\mathcal{A})$, whose objects are **chain-complex**es and whose morphisms are **chain-homotopy** classes of **chain-map**s. Then **localize** at the class of **quasi-isomorphism**s: $D(\mathcal{A}) = K(\mathcal{A})[W^{-1}]$, the category obtained by formally adjoining an inverse to every quasi-isomorphism $W$. A morphism $A_\bullet \to B_\bullet$ in $D(\mathcal{A})$ is represented by a "roof" $A_\bullet \xleftarrow{\ s\ } C_\bullet \to B_\bullet$ with $s$ a quasi-isomorphism. In $D(\mathcal{A})$ a module's resolution becomes isomorphic to the module, **derived-functor**s become functors of complexes ($\operatorname{Ext}^n(A,B) = \operatorname{Hom}_{D(\mathcal{A})}(A, B[n])$), and the structure is **triangulated**: distinguished triangles $A \to B \to C \to A[1]$ replace short exact sequences and induce the long exact sequence in cohomology.`,
  },
]
