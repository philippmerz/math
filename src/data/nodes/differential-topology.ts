import type { MathNode } from '../types'

export const DIFFERENTIAL_TOPOLOGY_NODES: MathNode[] = [
  {
    id: 'smooth-map',
    label: 'Smooth Map',
    title: 'Smooth Map',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-manifold', 'tangent-space', 'continuous-map'],
    description: String.raw`Once a manifold carries a smooth structure, the natural maps between manifolds are those that look infinitely differentiable in every chart. Smoothness is a chart-independent notion precisely because the transition maps of a smooth atlas are themselves smooth, so differentiability checked in one chart survives the passage to any overlapping one. Each smooth map is linearized at a point by its **differential**, a linear map of tangent spaces that is the intrinsic, coordinate-free version of the Jacobian matrix. Smooth maps and their differentials are the morphisms of differential topology, the subject that studies manifolds up to diffeomorphism.`,
    definition: String.raw`A **continuous map** $f : M \to N$ between smooth manifolds is **smooth** ($C^\infty$) if for every $p \in M$ there exist charts $\varphi : U \to \mathbb{R}^m$ about $p$ and $\psi : V \to \mathbb{R}^n$ about $f(p)$ with $f(U) \subseteq V$ such that the local representative $\psi \circ f \circ \varphi^{-1} : \varphi(U) \to \mathbb{R}^n$ is $C^\infty$ between open subsets of Euclidean space; smooth compatibility of the charts makes this independent of the charts chosen, and continuity guarantees the chart domains can be shrunk so that $f(U) \subseteq V$. The **differential** of $f$ at $p \in M$ is the linear map
$$df_p : T_pM \to T_{f(p)}N, \qquad (df_p\,X)(g) = X(g \circ f) \quad \text{for } g \in C^\infty_{f(p)},$$
acting on tangent vectors regarded as **derivations**; in coordinates $df_p$ is the Jacobian matrix of $\psi \circ f \circ \varphi^{-1}$ at $\varphi(p)$. The chain rule $d(g \circ f)_p = dg_{f(p)} \circ df_p$ holds, making $T$ a functor.`,
  },
  {
    id: 'diffeomorphism',
    label: 'Diffeomorphism',
    title: 'Diffeomorphism',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-map'],
    description: String.raw`A diffeomorphism is the isomorphism of the smooth category: a smooth bijection whose inverse is again smooth, under which two manifolds count as genuinely "the same" and share every smooth invariant. Smoothness of the inverse is a real requirement, not automatic — the map $t \mapsto t^3$ of $\mathbb{R}$ is a smooth bijection but not a diffeomorphism, since its inverse $t \mapsto t^{1/3}$ fails to be differentiable at $0$. The most striking phenomenon the notion exposes is that a single topological manifold can carry inequivalent smooth structures: $\mathbb{R}^4$ admits uncountably many pairwise non-diffeomorphic ones, and the $7$-sphere exactly $28$ — all homeomorphic to the standard model yet not diffeomorphic to it (Milnor's exotic spheres).`,
    definition: String.raw`A **diffeomorphism** is a smooth map $f : M \to N$ that is a bijection and whose inverse $f^{-1} : N \to M$ is also smooth. Two manifolds are **diffeomorphic** when such an $f$ exists. If $f$ is a diffeomorphism then each differential $df_p : T_pM \to T_{f(p)}N$ is a linear isomorphism (so $\dim M = \dim N$), since by the chain rule $df^{-1}_{f(p)} \circ df_p = d(\mathrm{id}_M)_p = \mathrm{id}_{T_pM}$ and symmetrically. Diffeomorphisms of $M$ to itself form a group under composition, $\mathrm{Diff}(M)$.`,
  },
  {
    id: 'orientation',
    label: 'Orientation',
    title: 'Orientation of a Manifold',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-manifold', 'tangent-space', 'determinant', 'differential-form'],
    description: String.raw`An orientation is a coherent choice of "handedness" — a consistent way to call a basis of each tangent space positively or negatively oriented, varying continuously from point to point. On $\mathbb{R}^n$ this is the familiar distinction between right- and left-handed coordinate frames; on a general manifold the choices must be glued together so that overlapping charts agree. Not every manifold admits one: the Möbius band and the projective plane $\mathbb{R}P^2$ are **non-orientable**, with no globally consistent handedness. Orientation is exactly the data needed to count preimages with sign (degree theory), to integrate top-degree differential forms, and to state Stokes' theorem and Poincaré duality.`,
    definition: String.raw`An **orientation** of a real vector space $V$ of dimension $n \ge 1$ is a choice of one of the two equivalence classes of ordered bases, two bases being equivalent when the change-of-basis matrix has positive **determinant**. An **orientation of a smooth manifold** $M$ is a continuous choice of orientation of each tangent space $T_pM$: a smooth atlas whose transition maps all have Jacobian determinant $> 0$ everywhere (an **oriented atlas**), or equivalently — for $n \ge 1$ — a nowhere-vanishing top-degree differential form. $M$ is **orientable** if such a choice exists; a connected orientable manifold has exactly two orientations. The standard orientation of $\mathbb{R}^n$ is the class of the standard basis $e_1, \dots, e_n$.`,
  },
  {
    id: 'immersion-and-embedding',
    label: 'Immersion & Embedding',
    title: 'Immersion & Embedding',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-map', 'tangent-space', 'homeomorphism', 'compact-hausdorff-bijection-homeo'],
    description: String.raw`An immersion is a smooth map that is infinitesimally injective: its differential is one-to-one at every point, so it never crushes tangent directions, even though the image may cross itself or accumulate on itself globally. A figure-eight traced out by a line, or a dense irrational winding of the torus, are immersions that are not injective or not homeomorphic onto their images. An embedding repairs both defects — it is an injective immersion that is also a homeomorphism onto its image with the subspace topology — and so realizes one manifold faithfully inside another. The Whitney embedding theorem then says abstract manifolds are no more general than Euclidean submanifolds: every $n$-manifold embeds in $\mathbb{R}^{2n}$.`,
    definition: String.raw`A smooth map $f : M \to N$ is an **immersion** if its differential $df_p : T_pM \to T_{f(p)}N$ is injective for every $p \in M$ (necessarily $\dim M \le \dim N$), and a **submersion** if $df_p$ is surjective for every $p$ (necessarily $\dim M \ge \dim N$). An **embedding** is an immersion that is also a **homeomorphism** onto its image $f(M)$, where $f(M)$ carries the subspace topology. Every injective immersion of a compact manifold is an embedding, since a continuous bijection from a compact space to a Hausdorff space is a homeomorphism.`,
  },
  {
    id: 'submanifold',
    label: 'Submanifold',
    title: 'Submanifold',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-manifold', 'immersion-and-embedding'],
    description: String.raw`A submanifold is a subset of a manifold that is itself a manifold under the inherited smooth structure — the image of an embedding. The condition that makes a subset an *embedded* submanifold is that, in suitable charts, it looks like a flat coordinate subspace $\mathbb{R}^k \subseteq \mathbb{R}^n$ sitting inside the ambient space. Curves and surfaces in $\mathbb{R}^3$ are the familiar examples, but in practice submanifolds arise most often not as parametrized images but as solution sets — level sets of smooth maps — cut out implicitly through the regular value theorem.`,
    definition: String.raw`An **embedded submanifold** of dimension $k$ of a smooth $n$-manifold $N$ is a subset $S \subseteq N$ such that around each point $p \in S$ there is a chart $\varphi : U \to \mathbb{R}^n$ of $N$ with
$$\varphi(U \cap S) = \varphi(U) \cap (\mathbb{R}^k \times \{0\}) = \{\,x \in \varphi(U) : x_{k+1} = \cdots = x_n = 0\,\}$$
(a **slice chart**). With the subspace topology and the restricted slice charts, $S$ is a smooth $k$-manifold and the inclusion $S \hookrightarrow N$ is an **embedding**; the number $n - k$ is the **codimension**. Equivalently, $S$ is the image of an embedding of some $k$-manifold into $N$.`,
  },
  {
    id: 'sard-theorem',
    label: "Sard's Theorem",
    title: "Sard's Theorem",
    kind: 'theorem',
    tags: ['Differential Topology'],
    dependencies: ['smooth-map', 'null-set', 'lebesgue-measure', 'implicit-function-theorem', 'taylor-theorem'],
    description: String.raw`Critical points — where a smooth map fails to be a submersion — are unavoidable, but their *images* are negligible. Sard's theorem makes this precise: the set of critical values has measure zero, so a value chosen at random is almost surely a regular value. This is what licenses the pervasive "put things in general position" arguments of differential topology. It is the technical backbone of the regular value theorem (regular values exist in abundance), of degree theory (a generic value has finitely many, transverse preimages), and of transversality. The surprising content is the gain in dimension: even when the domain is enormous, the critical values are squeezed into a null set in the target.`,
    statement: String.raw`Let $f : M \to N$ be a smooth ($C^\infty$) map between manifolds. A point $p \in M$ is **critical** if $df_p$ is not surjective; a **critical value** is the image of a critical point, and a **regular value** is any point of $N$ that is not a critical value (vacuously including points outside $f(M)$). Then the set of critical values of $f$ has **measure zero** in $N$. Consequently the regular values are dense, and (Brown) form a residual, hence non-empty, set.`,
    proof: String.raw`*Reduction to Euclidean space.* Measure zero is a local, chart-stable notion ($C^1$ maps send **null sets** to null sets, by the Lipschitz bound on a compact chart), and $M, N$ are second countable, so it suffices to prove: for smooth $f : U \to \mathbb{R}^n$ on open $U \subseteq \mathbb{R}^m$, the image $f(C)$ of the critical set $C = \{x : \operatorname{rank} df_x < n\}$ is **Lebesgue-null**.

*Sketch of the induction (the genuinely analytic core, named).* The proof is by induction on $m$, with the case $m = 0$ trivial. Stratify $C \supseteq C_1 \supseteq C_2 \supseteq \cdots$, where $C_k$ is the set of points at which all partial derivatives of $f$ of order $\le k$ vanish. Three estimates combine:

1. **$f(C \setminus C_1)$ is null.** Near a point where some first partial of a component is nonzero, the **implicit function theorem** lets one flatten a level set and reduce to a map in fewer source variables, where the inductive hypothesis applies (a Fubini-type slicing of the null sets across the extra coordinate).

2. **$f(C_k \setminus C_{k+1})$ is null** for each $k \ge 1$, by the same flattening applied to a $k$-th order partial, again dropping the source dimension and invoking induction.

3. **$f(C_k)$ is null for $k$ large** (precisely $k > m/n - 1$): by **Taylor's theorem** with remainder, on a small cube of side $\delta$ in $C_k$ the map varies by $O(\delta^{k+1})$, so the image of the cube fits in a box of $n$-volume $O(\delta^{n(k+1)})$; summing over the $O(\delta^{-m})$ subcubes covering $C_k$ gives total volume $O(\delta^{n(k+1)-m}) \to 0$ as $\delta \to 0$, so $f(C_k)$ has outer measure $0$.

Since $C = (C \setminus C_1) \cup \bigcup_{k\ge 1}(C_k \setminus C_{k+1}) \cup C_K$ for large $K$, and a **countable union of null sets is null**, $f(C)$ is null. Density of regular values follows because a null set has empty interior; the residual (Brown) refinement comes from writing the critical values as a countable union of closed null sets. The two analytic inputs — the implicit function theorem and the Taylor estimate — are the substance; the bookkeeping is the induction above. $\square$`,
  },
  {
    id: 'regular-value-theorem',
    label: 'Regular Value Theorem',
    title: 'Regular Value Theorem',
    kind: 'theorem',
    tags: ['Differential Topology'],
    dependencies: ['sard-theorem', 'submanifold', 'implicit-function-theorem', 'inverse-function-theorem', 'rank-nullity'],
    description: String.raw`The single most useful machine for producing manifolds: the preimage of a regular value is automatically a submanifold, of the expected codimension. Combined with Sard's theorem — which guarantees regular values are plentiful — it turns the vague idea of "a solution set of $\dim M - \dim N$ degrees of freedom" into a rigorous theorem. The unit sphere is $f^{-1}(1)$ for $f(x) = |x|^2$ with $1$ a regular value; the special linear group, orthogonal group, and countless other matrix groups are cut out the same way. The proof is a direct application of the implicit function theorem: at a regular point the map is a submersion, so locally it looks like a coordinate projection, and the fibre is a flat slice.`,
    statement: String.raw`Let $f : M^m \to N^n$ be smooth and let $c \in N$ be a **regular value** of $f$ with $f^{-1}(c) \neq \varnothing$ (so $m \ge n$). Then $f^{-1}(c)$ is an **embedded submanifold** of $M$ of dimension $m - n$ (codimension $n$), and for each $p \in f^{-1}(c)$ its tangent space is $T_p\bigl(f^{-1}(c)\bigr) = \ker(df_p)$.`,
    proof: String.raw`Fix $p \in f^{-1}(c)$. Since $c$ is a **regular value**, $df_p : T_pM \to T_cN$ is surjective. Choose a chart of $N$ centred at $c$ and a chart of $M$ centred at $p$; in these coordinates $f$ is a smooth map $\mathbb{R}^m \supseteq U \to \mathbb{R}^n$ with $f(0) = 0$ and $Df(0)$ of rank $n$. After permuting the source coordinates we may assume the last $n$ columns of $Df(0)$ — the partial Jacobian $D_y F(0)$ in the splitting $\mathbb{R}^m = \mathbb{R}^{m-n}_x \times \mathbb{R}^n_y$ — are independent, i.e. $D_y f(0)$ is invertible.

By the **implicit function theorem** applied to $f(x, y) = 0$, there are neighbourhoods and a unique $C^\infty$ map $g$ with $f(x, y) = 0 \iff y = g(x)$ locally. Equivalently, the map
$$\Phi(x, y) = \bigl(x,\ f(x, y)\bigr)$$
has invertible differential at $0$ (its Jacobian is block lower-triangular with blocks $I_{m-n}$ and $D_y f(0)$, of nonzero **determinant**), so by the **inverse-function-theorem packaged inside the implicit function theorem** $\Phi$ is a local diffeomorphism. In the new coordinates $\Phi$, the set $f^{-1}(0)$ becomes $\{(x, y) : y = 0\}$ — a flat slice $\mathbb{R}^{m-n} \times \{0\}$. Thus $\Phi$ is a **slice chart** for $f^{-1}(c)$ near $p$, exhibiting $f^{-1}(c)$ as an **embedded submanifold** of dimension $m - n$.

*Tangent space.* For any smooth curve $\gamma$ in $f^{-1}(c)$ with $\gamma(0) = p$ we have $f \circ \gamma \equiv c$, so $df_p(\gamma'(0)) = (f \circ \gamma)'(0) = 0$; hence $T_p(f^{-1}(c)) \subseteq \ker df_p$. Both are linear subspaces of $T_pM$ of dimension $m - n$ ($\dim \ker df_p = m - n$ by rank–nullity, since $df_p$ is onto $T_cN$), so they coincide. $\square$`,
  },
  {
    id: 'transversality',
    label: 'Transversality',
    title: 'Transversality',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['regular-value-theorem', 'submanifold', 'tangent-space'],
    description: String.raw`Transversality is the differential-topological formalization of "general position." Two submanifolds meet transversally when, at every common point, their tangent spaces together fill up the ambient tangent space — they cross cleanly rather than merely grazing one another. Two curves in the plane meeting at a point are transverse iff they are not tangent there; a line and a plane in $\mathbb{R}^3$ are transverse iff the line is not contained in a parallel plane. Transverse intersections are stable under small perturbations and themselves form submanifolds of the predicted dimension, and the Thom transversality theorem says transversality can always be achieved by an arbitrarily small perturbation — which is why "generic" intersections are transverse. It generalizes the regular value theorem (a point value $c$ is regular exactly when $f$ is transverse to the submanifold $\{c\}$).`,
    definition: String.raw`Two **submanifolds** $A, B$ of a manifold $M$ are **transverse**, written $A \pitchfork B$, if at every point $p \in A \cap B$ their tangent spaces span the ambient tangent space:
$$T_pA + T_pB = T_pM \qquad \text{for all } p \in A \cap B.$$
More generally a smooth map $f : X \to M$ is **transverse to** a submanifold $B \subseteq M$, $f \pitchfork B$, if for every $x$ with $f(x) \in B$ one has $\operatorname{im}(df_x) + T_{f(x)}B = T_{f(x)}M$. When $A \pitchfork B$, the intersection $A \cap B$ is an embedded submanifold of $M$ of codimension $\operatorname{codim} A + \operatorname{codim} B$ (so dimension $\dim A + \dim B - \dim M$), with $T_p(A \cap B) = T_pA \cap T_pB$ — the manifold version, via the **regular value theorem**, of two linear subspaces in general position.`,
  },
  {
    id: 'flow-of-a-vector-field',
    label: 'Flow of a Vector Field',
    title: 'Flow of a Vector Field',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['vector-field', 'tangent-space', 'picard-lindelof'],
    description: String.raw`A vector field prescribes a velocity at each point; following those velocities generates motion. The **integral curve** through a point is the unique path whose velocity is everywhere the field's value there, and letting every point flow for time $t$ simultaneously gives the **flow** $\varphi_t$, a one-parameter family of diffeomorphisms satisfying the group law $\varphi_{s+t} = \varphi_s \circ \varphi_t$. Existence and uniqueness of integral curves is precisely the Picard–Lindelöf theorem for the ODE $\dot{x} = X(x)$; the flow may only be defined for small times, but it is global (defined for all $t$) when the field is **complete** — automatic on a compact manifold. The flow is the trajectory of the dynamical system the field defines and the geometric picture behind the Lie derivative.`,
    definition: String.raw`Let $X$ be a smooth **vector field** on a manifold $M$. An **integral curve** through $p$ is a smooth curve $\gamma : I \to M$ on an interval $0 \in I$ with
$$\gamma(0) = p, \qquad \gamma'(t) = X\bigl(\gamma(t)\bigr) \in T_{\gamma(t)}M \quad \text{for all } t \in I.$$
By the **Picard–Lindelöf theorem** applied in charts (where $\dot{x} = X(x)$ has a $C^\infty$, hence locally Lipschitz, right-hand side), through each $p$ there is a unique maximal integral curve. The **flow** is the map $\varphi : \mathcal{D} \to M$, $\varphi(t, p) = \varphi_t(p) := \gamma_p(t)$, on the open set $\mathcal{D} \subseteq \mathbb{R} \times M$ of $(t,p)$ for which the integral curve exists; it is smooth and satisfies $\varphi_0 = \mathrm{id}_M$ and the **one-parameter group law** $\varphi_{s+t} = \varphi_s \circ \varphi_t$ wherever both sides are defined. Each $\varphi_t$ is a diffeomorphism onto its image with inverse $\varphi_{-t}$. The field is **complete** if $\mathcal{D} = \mathbb{R} \times M$, so the $\varphi_t$ form a one-parameter group of diffeomorphisms; every vector field on a **compact** manifold is complete.`,
  },
  {
    id: 'index-of-a-vector-field-zero',
    label: 'Index of a Zero',
    title: 'Index of a Vector-Field Zero',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['vector-field', 'degree-of-a-map'],
    description: String.raw`At an isolated zero of a vector field — a point where the field vanishes but does not vanish nearby — one can ask how the field "rotates" around that point. Encircle the zero with a small sphere and watch the direction of the field as you traverse it: the **index** is the net number of times that direction winds around, an integer attached to the zero. A source or a sink has index $+1$, a saddle index $-1$ (in the plane). The index is robust — invariant under small perturbations and coordinate changes — and packaging all the indices together is exactly what the Poincaré–Hopf theorem ties to the Euler characteristic.`,
    definition: String.raw`Let $X$ be a vector field on a manifold $M^n$ with an **isolated zero** at $p$ (so $X(p) = 0$ and $X \neq 0$ on a punctured neighbourhood of $p$). Working in an oriented chart sending $p$ to $0 \in \mathbb{R}^n$, choose a small sphere $S_\varepsilon$ of radius $\varepsilon$ about $0$ on which $X \neq 0$, and form the **Gauss map**
$$\widehat{X} : S_\varepsilon \to S^{n-1}, \qquad \widehat{X}(x) = \frac{X(x)}{\lVert X(x)\rVert}.$$
The **index** $\operatorname{ind}(X, p) \in \mathbb{Z}$ is the **degree of this map** (the **degree-of-a-map** of $\widehat{X}$ from the oriented sphere $S_\varepsilon \cong S^{n-1}$ to $S^{n-1}$); it is independent of $\varepsilon$ and of the chart. A zero where $dX_p$ is invertible (a **nondegenerate** zero) has $\operatorname{ind}(X, p) = \operatorname{sign}\det dX_p = \pm 1$. The index is invariant under diffeomorphism, and a vector field whose zeros are all isolated has only finitely many on a compact manifold.`,
  },
  {
    id: 'degree-of-a-map',
    label: 'Degree of a Map',
    title: 'Degree of a Map',
    kind: 'definition',
    tags: ['Differential Topology'],
    dependencies: ['smooth-map', 'orientation', 'regular-value-theorem', 'sard-theorem', 'homology', 'homotopy', 'diffeomorphism'],
    description: String.raw`The degree of a map between equidimensional closed oriented manifolds counts, with sign, how many times the domain wraps around the target. Concretely, pick a regular value and add up its preimages, each weighted $+1$ or $-1$ according to whether the map preserves or reverses orientation there; Sard's theorem guarantees regular values exist, and the count turns out to be independent of which one is chosen and unchanged under homotopy. In dimension one this is the winding number. The degree is the engine behind several landmark results: it proves the fundamental theorem of algebra (a degree-$n$ polynomial, as a self-map of the sphere, has degree $n \neq 0$, so it is surjective) and Brouwer's fixed point theorem, and it is the value the Poincaré–Hopf theorem extracts from a vector field.`,
    definition: String.raw`Let $f : M \to N$ be a smooth map between closed (compact, boundaryless), **oriented**, connected $n$-manifolds. By **Sard's theorem** $f$ has a **regular value** $c$, and by the **regular value theorem** $f^{-1}(c)$ is a $0$-dimensional submanifold of the compact $M$, hence a finite set of points; at each preimage $p$ the differential $df_p : T_pM \to T_cN$ is a linear isomorphism, with sign $\operatorname{sign} df_p = +1$ if it preserves the chosen **orientations** and $-1$ if it reverses them. The **degree** is
$$\deg f = \sum_{p \in f^{-1}(c)} \operatorname{sign}(df_p) \ \in \mathbb{Z}.$$
This integer is independent of the regular value $c$ and is a homotopy invariant. Equivalently, on top **homology** $H_n(M;\mathbb{Z}) \cong \mathbb{Z} \cong H_n(N;\mathbb{Z})$ (generated by the fundamental classes), the induced map $f_*$ is multiplication by $\deg f$.`,
    proof: String.raw`*Well-definedness (homotopy invariance and independence of the regular value), with the deep inputs named.* That the signed count is the same for homotopic maps, and the same for every regular value, is the substantive content; we record the standard cobordism argument together with the homogeneity reduction, naming the external inputs.

*Homotopy invariance.* Given a smooth homotopy $F : M \times [0,1] \to N$ between $f_0, f_1$ and a common regular value $c$ of $f_0$, $f_1$, and $F$, the preimage $F^{-1}(c)$ is, by the **regular value theorem (with boundary)**, a compact $1$-manifold whose boundary lies in $M \times \{0,1\}$, namely $f_0^{-1}(c) \times \{0\}$ together with $f_1^{-1}(c) \times \{1\}$. The external input is the **classification of compact $1$-manifolds with boundary**: each component is a closed arc or a circle, so the boundary points pair up two at a time. Orienting $F^{-1}(c)$ compatibly, the two endpoints of each arc carry opposite signs, so the total signed boundary count is $0$; hence the signed count of $f_0^{-1}(c)$ equals that of $f_1^{-1}(c)$. This gives the result when $c$ is regular for $f_0$, $f_1$, and $F$ together. The strong form (**Milnor's homotopy lemma**) needs $c$ regular only for $f_0$ and $f_1$: since $c$ is then already a regular value on the boundary $M \times \{0,1\}$, by **Sard's theorem** the homotopy $F$ may be perturbed rel $M \times \{0,1\}$ to a homotopy having $c$ as a regular value, reducing to the case just proved. Thus homotopic maps have equal signed counts at any value regular for both — the form used below.

*Independence of the regular value.* Let $c_0, c_1$ be regular values of a fixed $f$, and write $\deg(f; c)$ for the signed count at a regular value $c$. By the **homogeneity lemma** — for any two points of the connected $N$ there is a diffeomorphism $\Phi : N \to N$, orientation-preserving and smoothly isotopic to the identity, with $\Phi(c_0) = c_1$ — choose such a $\Phi$ with isotopy $\Phi_t$, $\Phi_0 = \mathrm{id}$, $\Phi_1 = \Phi$. Then $\Phi_t \circ f$ is a smooth homotopy from $f$ to $\Phi \circ f$; this is the non-constant homotopy that slides the target value, replacing the false "constant homotopy through an isotopy." Two computations now combine. First, $(\Phi \circ f)^{-1}(c_1) = f^{-1}(\Phi^{-1}(c_1)) = f^{-1}(c_0)$, and at each such point $d(\Phi \circ f)_p = d\Phi_{f(p)} \circ df_p$, so $\operatorname{sign} d(\Phi \circ f)_p = \operatorname{sign}(\det d\Phi)\cdot\operatorname{sign} df_p = \operatorname{sign} df_p$ as $\Phi$ is orientation-preserving; hence $\deg(\Phi \circ f; c_1) = \deg(f; c_0)$. Second, $\Phi \circ f$ is homotopic to $f$ via $\Phi_t \circ f$, so homotopy invariance gives $\deg(\Phi \circ f; c_1) = \deg(f; c_1)$. Combining, $\deg(f; c_0) = \deg(f; c_1)$, so the count is independent of $c$. The agreement with the **homology** description ($f_* = \deg f$ on $H_n$) follows from this geometric degree computing the action on the fundamental class. The external inputs are the classification of compact $1$-manifolds and the homogeneity lemma. $\square$`,
  },
  {
    id: 'morse-theory',
    label: 'Morse Theory',
    title: 'Morse Theory',
    kind: 'theorem',
    tags: ['Differential Topology'],
    dependencies: ['smooth-map', 'hessian', 'cw-complex', 'betti-number', 'euler-characteristic', 'flow-of-a-vector-field'],
    description: String.raw`Morse theory reads off the topology of a manifold from a single generic smooth function on it. Near a nondegenerate critical point the function is, in suitable coordinates, a pure quadratic $-x_1^2 - \cdots - x_k^2 + x_{k+1}^2 + \cdots + x_n^2$ (the **Morse lemma**), and the number $k$ of minus signs — the **index** — controls how the sublevel set $\{f \le a\}$ changes as $a$ passes the critical value: a $k$-cell is attached. So the critical points assemble the manifold as a CW complex with one cell of dimension $k$ for each index-$k$ critical point. Counting them bounds the topology: the **Morse inequalities** say the number $c_k$ of index-$k$ critical points is at least the $k$-th Betti number, and their alternating sum is exactly the Euler characteristic.`,
    statement: String.raw`Let $M$ be a closed manifold and $f : M \to \mathbb{R}$ a **Morse function** — a smooth function all of whose critical points are nondegenerate (the **Hessian** $\operatorname{Hess}_p f$ is an invertible symmetric bilinear form). The **index** of a critical point $p$ is the number of negative eigenvalues of $\operatorname{Hess}_p f$. Then $M$ is homotopy equivalent to a **CW complex** with exactly one cell of dimension $k$ for each critical point of index $k$. Writing $c_k$ for the number of index-$k$ critical points and $b_k = b_k(M)$ for the **Betti numbers**, the **Morse inequalities** hold: $c_k \ge b_k$ for every $k$ (weak form), the alternating sums satisfy $c_k - c_{k-1} + \cdots \ge b_k - b_{k-1} + \cdots$ (strong form), and
$$\sum_k (-1)^k c_k = \sum_k (-1)^k b_k = \chi(M).$$`,
    proof: String.raw`*Sketch, with the deep inputs named.* The full CW model requires Riemannian/gradient-flow machinery beyond this graph; we name the two structural theorems it rests on.

**Morse lemma (named input).** At a nondegenerate critical point $p$ there are local coordinates $(x_1, \dots, x_n)$ centred at $p$ in which $f = f(p) - x_1^2 - \cdots - x_k^2 + x_{k+1}^2 + \cdots + x_n^2$, with $k$ the index. (Proof: a parametrized version of the diagonalization of the symmetric **Hessian** — Sylvester's law of inertia — applied to the second-order Taylor remainder; nondegeneracy is exactly invertibility of $\operatorname{Hess}_p f$.) In particular critical points are isolated, so on the compact $M$ there are finitely many.

**Handle/cell attachment (named input).** As $a$ increases past a critical value with a single index-$k$ critical point, the sublevel set $M^a = \{f \le a\}$ changes by attaching a $k$-cell (up to homotopy); when $a$ crosses no critical value, $M^a$ deformation-retracts and does not change topological type. (Proof: push down along the gradient flow of $f$ for a metric, the flow being the **flow of a vector field**; this is the gradient-flow input the present graph does not develop.) Iterating from $\min f$ to $\max f$ builds $M$ as a **CW complex** with one $k$-cell per index-$k$ critical point.

**Inequalities.** Such a CW structure has cellular chain groups $C_k$ free of rank $c_k$. The general algebraic fact that, for a chain complex of free groups, the rank $b_k$ of homology and the rank $c_k$ of the $k$-chains satisfy $c_k \ge b_k$ and the strong alternating inequalities (writing $c_k = b_k + z_k + z_{k+1}$ with $z_k = \operatorname{rank}(\operatorname{im}\partial_k) \ge 0$, since the boundaries inside $C_k$ form the image of $\partial_{k+1}$, of rank $z_{k+1}$) yields the **Morse inequalities** with the **Betti numbers**. Taking the full alternating sum the boundary contributions $z_k$ telescope away, giving $\sum_k (-1)^k c_k = \sum_k (-1)^k b_k = \chi(M)$ — the **Euler-characteristic** as the signed count of critical points. The two named inputs (Morse lemma, gradient-flow handle attachment) are the precise gap relative to this graph. $\square$`,
  },
  {
    id: 'poincare-hopf-theorem',
    label: 'Poincaré–Hopf',
    title: 'Poincaré–Hopf Theorem',
    kind: 'theorem',
    tags: ['Differential Topology'],
    dependencies: ['index-of-a-vector-field-zero', 'euler-characteristic', 'degree-of-a-map', 'morse-theory'],
    description: String.raw`A purely local count recovers a global invariant: add up the indices of the zeros of a vector field on a closed manifold, and you get the Euler characteristic — no matter which field you chose. The indices are computed point by point from how the field rotates near each zero, yet their sum is forced to equal $\chi(M)$, a number depending only on the manifold's topology. The immediate consequence is a strong existence obstruction: whenever $\chi(M) \neq 0$, every vector field on $M$ must vanish somewhere, since a nonvanishing field has no zeros and hence total index $0$. The hairy ball theorem is the case of even spheres.`,
    statement: String.raw`Let $M$ be a closed (compact, boundaryless) smooth manifold and $X$ a smooth vector field on $M$ with only **isolated zeros** $x_1, \dots, x_r$. Then the sum of the **indices** equals the **Euler characteristic**:
$$\sum_{i=1}^{r} \operatorname{ind}(X, x_i) = \chi(M).$$
In particular the total index is independent of the field; and if $\chi(M) \neq 0$ then $M$ admits no nowhere-vanishing vector field.`,
    proof: String.raw`*Sketch, with the model field named.* The proof has two parts: the total index is the same for all such fields, and one well-chosen field makes it equal $\chi(M)$.

**Total index is field-independent.** This is the analytic core, and it rests on one external input: by the **Hopf degree theorem** / the standard tubular-neighbourhood argument, embed $M$ in some $\mathbb{R}^N$ and consider a vector field as a map into the unit sphere on the boundary of a tubular neighbourhood; the total index equals the **degree-of-a-map** of the associated Gauss map of the boundary, the degree of the **Gauss map of $\partial(\text{tubular nbhd})$** into $S^{N-1}$. That degree depends only on $M$, not on $X$ — two fields are joined by a homotopy of boundary maps of equal degree — so $\sum_i \operatorname{ind}(X, x_i)$ is an invariant of $M$.

**A field that computes $\chi(M)$.** Take a **Morse function** $f$ on $M$ (which exists, as Morse functions are generic) and let $X = \nabla f$ be its gradient for some Riemannian metric. Its zeros are exactly the critical points of $f$, all nondegenerate, and at a critical point of index $k$ the gradient has a nondegenerate zero with $\operatorname{ind}(\nabla f, p) = \operatorname{sign}\det(\operatorname{Hess}_p f) = (-1)^k$ (the Hessian has exactly $k$ negative eigenvalues). Hence by **Morse theory**,
$$\sum_i \operatorname{ind}(\nabla f, x_i) = \sum_p (-1)^{\operatorname{index}(p)} = \sum_k (-1)^k c_k = \chi(M).$$
Combining the two parts, *every* field with isolated zeros has total index $\chi(M)$. If $\chi(M) \neq 0$ a nowhere-vanishing field would have empty zero set and total index $0 \neq \chi(M)$, a contradiction. The one named external input is the degree/tubular-neighbourhood invariance of the total index. $\square$`,
  },
  {
    id: 'hairy-ball-theorem',
    label: 'Hairy Ball Theorem',
    title: 'Hairy Ball Theorem',
    kind: 'corollary',
    tags: ['Differential Topology'],
    dependencies: ['poincare-hopf-theorem', 'euler-characteristic', 'betti-number'],
    description: String.raw`You cannot comb a hairy ball flat: there is no nowhere-vanishing continuous tangent vector field on an even-dimensional sphere. Every attempt to assign a nonzero tangent direction smoothly to each point of $S^2$ must fail somewhere — a cowlick is unavoidable. It is the special case $\chi(S^{2n}) = 2 \neq 0$ of Poincaré–Hopf. Tangible consequences: there is always a point on Earth's surface where the horizontal wind is zero, and $S^2$ is not parallelizable (its tangent bundle is nontrivial). By contrast odd-dimensional spheres do carry nonvanishing fields, consistent with $\chi(S^{2n+1}) = 0$.`,
    statement: String.raw`For every $n \ge 1$, the even-dimensional sphere $S^{2n}$ admits no continuous nowhere-vanishing tangent vector field. Equivalently, every continuous tangent vector field on $S^{2n}$ has a zero.`,
    proof: String.raw`A continuous tangent field can be uniformly approximated by a smooth one with the same zero/nonzero behaviour: if a continuous field were nowhere zero, it is bounded away from $0$ on the compact $S^{2n}$, and a sufficiently close smooth tangent approximation (by the Stone–Weierstrass approximation of the components, then projecting onto the tangent spaces) is also nowhere zero. So it suffices to rule out a smooth nowhere-vanishing field. The Euler characteristic of the even sphere is
$$\chi(S^{2n}) = \sum_k (-1)^k b_k(S^{2n}) = b_0 - \cdots + b_{2n} = 1 + (-1)^{2n}\cdot 1 = 2,$$
since $S^{2n}$ has $b_0 = b_{2n} = 1$ and all other Betti numbers $0$. As $\chi(S^{2n}) = 2 \neq 0$, the **Poincaré–Hopf theorem** forbids a nowhere-vanishing smooth vector field (such a field would have total index $0$). Hence no continuous nowhere-vanishing tangent field exists either. (For odd spheres $\chi(S^{2n+1}) = 1 + (-1)^{2n+1} = 0$, and indeed $x \mapsto$ the field rotating each pair of coordinates, e.g. $(x_1, x_2, \dots) \mapsto (-x_2, x_1, \dots)$, is nowhere zero — so the parity is essential.) $\square$`,
  },
]
