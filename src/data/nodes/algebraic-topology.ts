import type { MathNode } from '../types'

export const ALGEBRAIC_TOPOLOGY_NODES: MathNode[] = [
  // ── Homotopy ───────────────────────────────────────────────────────────────
  {
    id: 'homotopy',
    label: 'Homotopy',
    title: 'Homotopy',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['continuous-map', 'topological-space'],
    description: String.raw`Algebraic topology deliberately forgets rigid geometry, keeping only what survives bending and stretching. The organizing relation is *homotopy*: two maps count as the same if one can be continuously slid into the other through a one-parameter family of maps. This is far coarser than equality of maps, and it is exactly the level of detail at which the algebraic invariants of the subject — fundamental group, homology, cohomology — are defined and computed. Reasoning up to homotopy is what lets one replace an intractable space or map by a simpler model without changing the answer.`,
    definition: String.raw`Let $X, Y$ be **topological spaces** and $f, g : X \to Y$ **continuous maps**. A **homotopy** from $f$ to $g$ is a continuous map $H : X \times [0,1] \to Y$ with $H(\cdot, 0) = f$ and $H(\cdot, 1) = g$; one writes $f \simeq g$ and calls $f, g$ **homotopic**. A homotopy **rel $A$** (for $A \subseteq X$) additionally fixes $A$: $H(a, t) = f(a)$ for all $a \in A$, $t \in [0,1]$. Homotopy is an equivalence relation on continuous maps $X \to Y$, and it is compatible with composition ($f \simeq f'$, $g \simeq g'$ imply $g \circ f \simeq g' \circ f'$).`,
    proof: String.raw`*Homotopy is an equivalence relation.* Reflexivity: $H(x,t) = f(x)$ is a homotopy $f \simeq f$. Symmetry: if $H$ witnesses $f \simeq g$ then $H'(x,t) = H(x, 1-t)$ is continuous (precomposition with a **continuous-map** of $X \times [0,1]$) and witnesses $g \simeq f$. Transitivity: given $H : f \simeq g$ and $K : g \simeq h$, define
$$ L(x,t) = \begin{cases} H(x, 2t), & 0 \le t \le \tfrac12,\\ K(x, 2t-1), & \tfrac12 \le t \le 1; \end{cases} $$
the two pieces agree at $t = \tfrac12$ (both equal $g(x)$), so by the pasting lemma for closed sets $L$ is continuous, giving $f \simeq h$. *Compatibility with composition:* if $H : f \simeq f'$ ($X \to Y$) and $K : g \simeq g'$ ($Y \to Z$), then $(x,t) \mapsto K(H(x,t), t)$ is a continuous homotopy $g \circ f \simeq g' \circ f'$. $\square$`,
  },
  {
    id: 'homotopy-equivalence',
    label: 'Homotopy Equivalence',
    title: 'Homotopy Equivalence',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['homotopy', 'homeomorphism'],
    description: String.raw`Homeomorphism is often too fine a notion: a solid disk and a single point are visibly different spaces, yet for the purposes of holes and connectivity they should count as the same. Homotopy equivalence is the looser sameness that makes this precise — two spaces are equivalent when each can be mapped to the other so that the round trips are only required to be homotopic to the identity, not equal to it. The most vivid case is a *deformation retract*, where one space is continuously squashed onto a subspace inside it (a disk onto its center, an annulus onto its core circle). Every algebraic-topology invariant defined up to homotopy is automatically a homotopy-equivalence invariant.`,
    definition: String.raw`A continuous map $f : X \to Y$ is a **homotopy equivalence** if there is a continuous $g : Y \to X$ with $g \circ f \simeq \mathrm{id}_X$ and $f \circ g \simeq \mathrm{id}_Y$ (**homotopy** of maps); $g$ is a **homotopy inverse**, and $X, Y$ are **homotopy equivalent**, $X \simeq Y$. A space homotopy equivalent to a point is **contractible**. A subspace $A \subseteq X$ is a **deformation retract** if there is a homotopy $H : X \times [0,1] \to X$ with $H(\cdot,0) = \mathrm{id}_X$, $H(\cdot, 1)$ a retraction onto $A$ (image $A$, fixing $A$ pointwise), and $H(a,t) = a$ for $a \in A$; then the inclusion $A \hookrightarrow X$ is a homotopy equivalence. Every **homeomorphism** is a homotopy equivalence (its inverse serves as homotopy inverse, with the round trips equal to the identities).`,
  },
  {
    id: 'cw-complex',
    label: 'CW Complex',
    title: 'CW Complex',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['topological-space', 'continuous-map'],
    description: String.raw`A CW complex builds a space the way one assembles a model from parts: start with a discrete set of points, then glue on cells of increasing dimension — arcs whose ends are attached to existing points, disks whose rims are attached to the arcs, and so on. This is the flexible modern descendant of the simplicial complex; far fewer cells are needed (the sphere is one point plus one top cell), yet the inductive cell structure is exactly what makes homology computable cell by cell and powers the deepest existence theorems of homotopy theory. Most spaces one meets in practice are homotopy equivalent to a CW complex.`,
    definition: String.raw`A **CW complex** $X$ is built inductively as a union of **skeleta** $X^0 \subseteq X^1 \subseteq \cdots$, where $X^0$ is a discrete set of points and $X^n$ is obtained from $X^{n-1}$ by **attaching $n$-cells**: for an index set of $n$-cells, one is given **continuous** attaching maps $\varphi_\alpha : S^{n-1} \to X^{n-1}$ and forms
$$X^n = \Bigl(X^{n-1} \sqcup \coprod_\alpha D^n_\alpha\Bigr)\Big/\bigl(x \sim \varphi_\alpha(x) \text{ for } x \in \partial D^n_\alpha\bigr).$$
Then $X = \bigcup_n X^n$ with the weak topology (a set is closed iff its intersection with each cell's closure is closed). "CW" records the two defining conditions: **C**losure-finiteness (each cell's closure meets finitely many cells) and the **W**eak topology.`,
  },

  // ── The fundamental group & covering spaces ──────────────────────────────────
  {
    id: 'fundamental-group',
    label: 'Fundamental Group',
    title: 'Fundamental Group',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['homotopy', 'group', 'functor', 'topological-space'],
    description: String.raw`The fundamental group is the first and most intuitive bridge from topology to algebra. Fix a basepoint and look at all loops that start and end there; declare two loops the same when one can be deformed into the other while keeping the basepoint pinned; then loops can be multiplied by traversing one after the other. The resulting group detects one-dimensional holes — it is $\mathbb{Z}$ for the circle (a loop is classified by how many times it winds), trivial for the disk (every loop contracts). Crucially the construction is functorial: a continuous map of spaces induces a homomorphism of groups, so topological facts become algebraic ones.`,
    definition: String.raw`Fix a **topological space** $X$ and basepoint $x_0$. A **loop** at $x_0$ is a continuous map $\gamma : [0,1] \to X$ with $\gamma(0) = \gamma(1) = x_0$. The **fundamental group** $\pi_1(X, x_0)$ is the set of loops modulo **homotopy** rel $\{0,1\}$ (basepoint-fixing homotopy of paths), with product the concatenation
$$(\gamma \cdot \delta)(s) = \begin{cases}\gamma(2s), & 0 \le s \le \tfrac12,\\ \delta(2s-1), & \tfrac12 \le s \le 1.\end{cases}$$
This is a **group**: the constant loop is the identity, the reverse $\bar\gamma(s) = \gamma(1-s)$ is the inverse, and associativity holds up to homotopy (all verified by explicit reparametrization homotopies). A basepoint-preserving continuous map $f : (X, x_0) \to (Y, y_0)$ induces $f_* : \pi_1(X, x_0) \to \pi_1(Y, y_0)$, $[\gamma] \mapsto [f \circ \gamma]$, making $\pi_1$ a **functor** from pointed spaces to groups; homotopic maps induce equal homomorphisms, so $\pi_1$ is a homotopy invariant. For path-connected $X$ the group is independent of basepoint up to (non-canonical) isomorphism, written $\pi_1(X)$.`,
  },
  {
    id: 'covering-space',
    label: 'Covering Space',
    title: 'Covering Space',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['fundamental-group', 'connectedness', 'homotopy'],
    description: String.raw`A covering space sits above a base space, locally looking like a stack of disjoint copies of it — the real line spiraling down onto the circle, with each loop downstairs unwinding to an open interval upstairs, is the prototype. The defining local-triviality forces unique path lifting: once you choose where a path starts upstairs, the whole path lifts uniquely. This lifting machinery converts the fundamental group into a perfectly geometric object, and under mild hypotheses on the base it yields a complete dictionary — connected coverings correspond to subgroups of the fundamental group — that is the exact topological analogue of the Galois correspondence between field extensions and subgroups of the Galois group.`,
    definition: String.raw`A **covering space** of a **topological space** $X$ is a continuous surjection $p : \tilde X \to X$ such that every point of $X$ has an open neighborhood $U$ that is **evenly covered**: $p^{-1}(U) = \bigsqcup_{i} V_i$ is a disjoint union of open sets, each mapped **homeomorphically** onto $U$ by $p$. The discrete set $p^{-1}(x)$ is the **fiber** over $x$. Two basic properties hold (the **lifting** theorems): every path in $X$ and every homotopy of paths lifts uniquely once a starting point in the fiber is fixed; consequently $p_* : \pi_1(\tilde X, \tilde x_0) \to \pi_1(X, x_0)$ is **injective**, identifying $\pi_1(\tilde X)$ with a subgroup of the **fundamental group** of $X$. When $X$ is path-connected, locally path-connected, and **semilocally simply connected**, the based connected coverings correspond bijectively to subgroups of $\pi_1(X, x_0)$ (unbased connected coverings to conjugacy classes of subgroups).`,
  },
  {
    id: 'fundamental-group-of-circle',
    label: 'π₁ of the Circle',
    title: 'Fundamental Group of the Circle',
    kind: 'theorem',
    tags: ['Algebraic Topology'],
    dependencies: ['fundamental-group', 'covering-space', 'integers'],
    description: String.raw`The single most important computation in elementary algebraic topology: the loops on a circle are classified, up to deformation, by an integer — the *winding number* counting net signed turns. This is the engine behind a host of two-dimensional results (the fundamental theorem of algebra, the Brouwer theorem in the plane, the Borsuk–Ulam theorem). The proof is the cleanest illustration of the covering-space method: lift loops on the circle to paths on its universal cover, the real line, and read off the integer as the endpoint of the lift.`,
    statement: String.raw`The fundamental group of the circle is infinite cyclic: $\pi_1(S^1, 1) \cong \mathbb{Z}$, with a loop sent to its winding number — the integer $n$ for which the loop is homotopic to $s \mapsto e^{2\pi i n s}$.`,
    proof: String.raw`Use the **covering space** $p : \mathbb{R} \to S^1$, $p(t) = e^{2\pi i t}$, which is evenly covered (each arc has preimage a disjoint union of intervals on which $p$ is a homeomorphism), with fiber $p^{-1}(1) = \mathbb{Z}$. Define $\Phi : \pi_1(S^1, 1) \to \mathbb{Z}$ as follows. Given a loop $\gamma$ at $1$, by unique **path lifting** there is a unique lift $\tilde\gamma : [0,1] \to \mathbb{R}$ with $\tilde\gamma(0) = 0$; since $p(\tilde\gamma(1)) = \gamma(1) = 1$, the endpoint $\tilde\gamma(1) \in \mathbb{Z}$. Set $\Phi([\gamma]) = \tilde\gamma(1)$. This is well defined: a basepoint-fixing homotopy of loops lifts (unique homotopy lifting) to a homotopy of lifts with fixed endpoints, so homotopic loops have lifts with the same terminal value.

*Homomorphism.* For loops $\gamma, \delta$ with lifts $\tilde\gamma, \tilde\delta$ starting at $0$ and ending at $m, n$, the path $\tilde\gamma$ followed by $(m + \tilde\delta)$ is a lift of $\gamma \cdot \delta$ starting at $0$ and ending at $m + n$; by uniqueness $\Phi([\gamma][\delta]) = m + n = \Phi([\gamma]) + \Phi([\delta])$.

*Surjective.* The loop $\omega_n(s) = e^{2\pi i n s}$ lifts to $s \mapsto ns$, so $\Phi([\omega_n]) = n$.

*Injective.* If $\Phi([\gamma]) = 0$, its lift $\tilde\gamma$ is a path in $\mathbb{R}$ from $0$ to $0$; since $\mathbb{R}$ is convex, the straight-line homotopy $H(s,t) = (1-t)\tilde\gamma(s)$ contracts $\tilde\gamma$ to the constant path rel endpoints, and $p \circ H$ contracts $\gamma$ to the constant loop, so $[\gamma]$ is trivial. Hence $\Phi$ is an isomorphism $\pi_1(S^1,1) \cong \mathbb{Z}$. $\square$`,
  },
  {
    id: 'higher-homotopy-groups',
    label: 'Higher Homotopy Groups',
    title: 'Higher Homotopy Groups',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['fundamental-group', 'homotopy'],
    description: String.raw`The fundamental group classifies loops — maps of the circle; the higher homotopy groups do the same one dimension up at a time, classifying maps of the $n$-sphere into a space up to basepoint-fixing deformation. They detect higher-dimensional holes that the fundamental group misses, and from dimension two onward they are abelian (there is room to slide one spheroid past another). The catch is computability: homology is tame, but homotopy groups are wild — even the homotopy groups of spheres conceal infinite families of surprises and remain, after a century, only partly known.`,
    definition: String.raw`For a **topological space** $X$ with basepoint $x_0$ and $n \ge 1$, the **$n$-th homotopy group** $\pi_n(X, x_0)$ is the set of basepoint-preserving continuous maps $(S^n, *) \to (X, x_0)$ modulo basepoint-preserving **homotopy**. Equivalently, using $(I^n, \partial I^n) \to (X, x_0)$, the product is concatenation in the first coordinate, generalizing the **fundamental group** $\pi_1$. For $n \ge 2$ the group is **abelian** (an Eckmann–Hilton argument: with two independent directions in which to compose, the two products coincide and are commutative). Maps induce homomorphisms, making each $\pi_n$ a homotopy-invariant functor; a space with $\pi_n = 0$ for all $n \ge 1$ is **weakly contractible**.`,
  },

  // ── Simplicial / cellular building blocks ────────────────────────────────────
  {
    id: 'simplicial-complex',
    label: 'Simplicial Complex',
    title: 'Simplicial Complex',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['topological-space', 'homeomorphism'],
    description: String.raw`To compute with a space one first needs a combinatorial grip on it. A simplicial complex provides exactly that: it presents a space as triangles, tetrahedra, and their higher-dimensional analogues, glued cleanly along shared faces. The combinatorial data — which vertices span which simplices — is finite for compact spaces and entirely determines the space, so invariants can be read off mechanically from the gluing pattern. This is the original bridge that let algebra grip geometry; its more flexible descendant is the CW complex.`,
    definition: String.raw`An **(abstract) simplicial complex** on a vertex set $V$ is a collection $K$ of finite nonempty subsets of $V$ (the **simplices**) closed under taking nonempty subsets: if $\sigma \in K$ and $\emptyset \neq \tau \subseteq \sigma$ then $\tau \in K$. A simplex with $k+1$ vertices is a **$k$-simplex** (vertex, edge, triangle, tetrahedron for $k = 0,1,2,3$); its subsets are its **faces**. Its **geometric realization** $|K|$ is the **topological space** obtained by realizing each $k$-simplex as the standard simplex $\Delta^k = \{\,(t_0,\dots,t_k) : t_i \ge 0,\ \sum t_i = 1\,\}$ and gluing along shared faces. A space admitting a homeomorphism to some $|K|$ is **triangulable**, and $K$ is a **triangulation** of it.`,
  },
  {
    id: 'chain-complex',
    label: 'Chain Complex',
    title: 'Chain Complex',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['quotient-group', 'group-homomorphism'],
    description: String.raw`The algebraic essence of homology is captured by one identity: the boundary of a boundary is zero. A chain complex packages this — a sequence of abelian groups of "chains" in each dimension, linked by boundary maps, with the requirement that composing two consecutive boundary maps gives the zero map. Geometrically this records that the boundary of a solid region is a closed surface, the boundary of a closed surface is empty. This single condition is the engine of homology and the founding abstraction of homological algebra, where chain complexes are studied entirely on their own terms.`,
    definition: String.raw`A **chain complex** $(C_\bullet, \partial)$ is a sequence of abelian groups $\cdots \to C_{n+1} \xrightarrow{\partial_{n+1}} C_n \xrightarrow{\partial_n} C_{n-1} \to \cdots$ with **group homomorphisms** $\partial_n$ (the **boundary maps**) satisfying $\partial_n \circ \partial_{n+1} = 0$ for all $n$. Elements of $\ker\partial_n$ are **$n$-cycles** $Z_n$; elements of $\operatorname{im}\partial_{n+1}$ are **$n$-boundaries** $B_n$. The condition $\partial\partial = 0$ says exactly $B_n \subseteq Z_n$, so the **quotient group** $Z_n / B_n$ is defined — this is the $n$-th homology of the complex. A **chain map** $f : C_\bullet \to D_\bullet$ is a family of homomorphisms commuting with the boundaries, $\partial f = f \partial$.`,
  },
  {
    id: 'homology',
    label: 'Homology',
    title: 'Homology',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['chain-complex', 'simplicial-complex', 'functor'],
    description: String.raw`Homology measures $n$-dimensional holes by a beautifully simple recipe: take the closed $n$-chains (cycles) and quotient out the ones that bound — those that are the boundary of some $(n+1)$-chain. What survives is a cycle that genuinely encloses a hole rather than a filled region. Unlike the homotopy groups it is computable and functorial, and it is the workhorse invariant of the subject, telling a sphere from a torus at a glance. Singular homology, defined via maps of standard simplices, makes it a functor on all spaces and agrees with the combinatorial simplicial version on triangulable spaces.`,
    definition: String.raw`Given a **chain complex** $(C_\bullet, \partial)$ of abelian groups, the **$n$-th homology group** is the **quotient** of cycles by boundaries,
$$H_n(C_\bullet) = \ker\partial_n \,/\, \operatorname{im}\partial_{n+1}.$$
For a space $X$, **singular homology** $H_n(X)$ takes $C_n$ to be the free abelian group on continuous maps $\Delta^n \to X$ (singular $n$-simplices), with $\partial$ the alternating sum of restrictions to faces (so $\partial\partial = 0$); on a **simplicial complex** the smaller **simplicial chain complex** of oriented simplices gives the same groups. Homology is a **functor**: a continuous $f : X \to Y$ induces $f_* : H_n(X) \to H_n(Y)$, with $(g \circ f)_* = g_* \circ f_*$ and $(\mathrm{id})_* = \mathrm{id}$. **Relative homology** $H_n(X, A)$ uses the quotient complex $C_\bullet(X)/C_\bullet(A)$.`,
  },
  {
    id: 'homotopy-invariance-homology',
    label: 'Homotopy Invariance',
    title: 'Homotopy Invariance of Homology',
    kind: 'theorem',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'homotopy-equivalence', 'chain-homotopy', 'homotopy'],
    description: String.raw`Homology cannot tell two spaces apart if they have the same shape up to deformation. Precisely: homotopic maps induce the same map on homology, so a homotopy equivalence induces an isomorphism. This is what makes homology genuinely computable — one is free to replace a space by any simpler model in its homotopy class (a disk by a point, an annulus by a circle) without changing the groups. The mechanism is the algebraic shadow of a continuous deformation: a homotopy of maps gives rise to a chain homotopy of the induced chain maps, and chain-homotopic maps agree on homology.`,
    statement: String.raw`If $f, g : X \to Y$ are homotopic continuous maps, then $f_* = g_* : H_n(X) \to H_n(Y)$ for all $n$. Consequently a **homotopy equivalence** induces isomorphisms on all homology groups, and homotopy equivalent spaces have isomorphic homology; in particular a contractible space has the homology of a point ($H_0 = \mathbb{Z}$, $H_n = 0$ for $n > 0$).`,
    proof: String.raw`The geometric input is the **prism construction**. A homotopy $H : X \times [0,1] \to Y$ between $f$ and $g$ yields, on singular chains, a degree-one map $P : C_n(X) \to C_{n+1}(Y)$ obtained by subdividing each prism $\Delta^n \times [0,1]$ into $(n+1)$-simplices and applying $H$; a direct boundary computation on this subdivision gives the identity
$$\partial P + P \partial = g_\# - f_\#$$
of maps $C_n(X) \to C_n(Y)$, where $f_\#, g_\#$ are the chain maps inducing $f_*, g_*$. This is precisely a **chain homotopy** from $f_\#$ to $g_\#$. By the defining property of **chain-homotopy**, chain-homotopic maps induce the same map on **homology**: for a cycle $z$ ($\partial z = 0$), $g_\#(z) - f_\#(z) = \partial P(z) + P(\partial z) = \partial P(z)$ is a boundary, so $[f_\#(z)] = [g_\#(z)]$ in $H_n(Y)$. Hence $f_* = g_*$.

Now let $f : X \to Y$ be a **homotopy equivalence** with homotopy inverse $h$, so $h \circ f \simeq \mathrm{id}_X$ and $f \circ h \simeq \mathrm{id}_Y$. By functoriality of homology and the result just proved, $h_* \circ f_* = (h \circ f)_* = (\mathrm{id}_X)_* = \mathrm{id}$ and $f_* \circ h_* = \mathrm{id}$, so $f_*$ is an isomorphism with inverse $h_*$. For a contractible space $X \simeq \{*\}$, this gives $H_n(X) \cong H_n(\{*\})$, which is $\mathbb{Z}$ in degree $0$ and $0$ above (the point has a single $n$-simplex in each degree, with boundary maps alternating between $0$ and an isomorphism). $\square$`,
  },
  {
    id: 'mayer-vietoris',
    label: 'Mayer–Vietoris',
    title: 'Mayer–Vietoris Sequence',
    kind: 'theorem',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'exact-sequence', 'short-exact-sequence', 'snake-lemma', 'long-exact-sequence'],
    description: String.raw`Mayer–Vietoris is the divide-and-conquer tool of homology: cover a space by two open pieces and the homologies of the pieces, of their overlap, and of the whole space fit into one long exact sequence. Knowing two of the three lets you solve for the third, which is how the homology of spheres, tori, and most familiar spaces is actually computed. It is the homological mirror of the inclusion–exclusion principle, and its existence is a clean payoff of the algebra: a short exact sequence of chain complexes mechanically produces a long exact sequence of homology groups.`,
    statement: String.raw`Let $X = A \cup B$ with $A, B$ open (or, more generally, an excisive couple). There is a long **exact sequence**
$$\cdots \to H_n(A \cap B) \xrightarrow{(i_*, j_*)} H_n(A) \oplus H_n(B) \xrightarrow{k_* - l_*} H_n(X) \xrightarrow{\partial} H_{n-1}(A \cap B) \to \cdots,$$
where $i, j, k, l$ are the inclusions and $\partial$ is a connecting homomorphism.`,
    proof: String.raw`*Sketch, with the one external input named.* Let $C_\bullet(A + B)$ denote the subcomplex of $C_\bullet(X)$ generated by singular simplices lying entirely in $A$ or entirely in $B$. The inclusions assemble into a **short exact sequence** of chain complexes
$$0 \to C_\bullet(A \cap B) \xrightarrow{x \mapsto (x, x)} C_\bullet(A) \oplus C_\bullet(B) \xrightarrow{(u,v) \mapsto u - v} C_\bullet(A + B) \to 0,$$
exactness being a direct check at chain level: the first map is injective; the composite sends $x \mapsto (x,x) \mapsto x - x = 0$; the kernel of $(u,v) \mapsto u - v$ is $\{(u,u) : u \in C_\bullet(A \cap B)\}$, exactly the image of the first map; and the second map is surjective, since a generating simplex of $C_\bullet(A + B)$ lying in $A$ is hit by $(u,0)$ and one lying in $B$ by $(0,-v)$. On homology these chain maps induce precisely $(i_*, j_*)$ and $k_* - l_*$, the maps displayed in the statement. A short exact sequence of chain complexes induces a **long-exact-sequence** in homology (built degreewise from the **snake-lemma**, whose connecting homomorphism $\partial$ snakes a class in $H_n$ of the quotient down to $H_{n-1}$ of the sub, then spliced over all $n$); this yields the long exact sequence with the displayed maps. The only fact beyond this graph is the **excision/small-simplices theorem**: the inclusion $C_\bullet(A+B) \hookrightarrow C_\bullet(X)$ induces an isomorphism on homology (every singular chain can be subdivided, without changing its homology class, into one supported in $A$ or in $B$). Substituting $H_n(X)$ for $H_n(A+B)$ via that isomorphism gives the stated sequence. The named external input is the small-simplices/excision theorem. $\square$`,
  },
  {
    id: 'homology-of-spheres',
    label: 'Homology of Spheres',
    title: 'Homology of Spheres',
    kind: 'proposition',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'mayer-vietoris', 'homotopy-invariance-homology'],
    description: String.raw`The basic computation that everything two- and higher-dimensional rests on: a sphere has exactly one hole, and it is in the top dimension. All other reduced homology vanishes. This single fact — that $S^n$ has nontrivial homology precisely in degrees $0$ and $n$ — is what distinguishes a sphere from a point, forbids retracting a ball onto its boundary, and powers the Brouwer fixed point theorem. The computation is a clean induction with Mayer–Vietoris, slicing the sphere into two contractible caps overlapping in an equatorial band homotopy equivalent to the next sphere down.`,
    statement: String.raw`For $n \ge 1$ the (reduced) singular homology of the $n$-sphere is
$$\tilde H_k(S^n) \cong \begin{cases} \mathbb{Z}, & k = n,\\ 0, & k \neq n,\end{cases} \qquad\text{equivalently}\qquad H_0(S^n) \cong \mathbb{Z},\ \ H_n(S^n) \cong \mathbb{Z},\ \ H_k(S^n) = 0 \text{ otherwise } (n \ge 1).$$`,
    proof: String.raw`Cover $S^n$ by $A = S^n \setminus \{N\}$ and $B = S^n \setminus \{S\}$, the complements of the north and south poles. Both are open, each is homeomorphic to $\mathbb{R}^n$ (stereographic projection), hence contractible, so by **homotopy-invariance-homology** they have trivial reduced homology. Their intersection $A \cap B = S^n \setminus \{N, S\}$ deformation retracts onto the equatorial $S^{n-1}$, so $\tilde H_k(A \cap B) \cong \tilde H_k(S^{n-1})$.

Feed this into the (reduced) **mayer-vietoris** sequence. Since $\tilde H_*(A) = \tilde H_*(B) = 0$, the sequence
$$\tilde H_k(A) \oplus \tilde H_k(B) \to \tilde H_k(S^n) \xrightarrow{\partial} \tilde H_{k-1}(A \cap B) \to \tilde H_{k-1}(A) \oplus \tilde H_{k-1}(B)$$
collapses to isomorphisms $\partial : \tilde H_k(S^n) \xrightarrow{\ \cong\ } \tilde H_{k-1}(S^{n-1})$ for all $k$. The base case $n = 0$: $S^0$ is two points, with $\tilde H_0(S^0) \cong \mathbb{Z}$ and $\tilde H_k(S^0) = 0$ for $k \neq 0$. Inducting, $\tilde H_k(S^n) \cong \tilde H_{k-n}(S^0)$, which is $\mathbb{Z}$ exactly when $k = n$ and $0$ otherwise. Unreducing ($H_0 = \tilde H_0 \oplus \mathbb{Z}$ for nonempty $S^n$) gives the stated groups. $\square$`,
  },
  {
    id: 'no-retraction-theorem',
    label: 'No Retraction',
    title: 'No Retraction of the Ball onto its Boundary',
    kind: 'lemma',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'homology-of-spheres', 'homotopy-invariance-homology'],
    description: String.raw`There is no way to continuously collapse a solid ball onto its boundary sphere while leaving the sphere fixed. Intuitively the sphere has a hole the ball does not, and a retraction would have to manufacture that hole out of nothing. Homology turns this intuition into a one-line contradiction and is the crux lemma behind Brouwer's fixed point theorem: if a self-map of the ball had no fixed point, shooting a ray from the image point through the original would define exactly such an impossible retraction.`,
    statement: String.raw`For $n \ge 1$ there is no continuous **retraction** $r : D^n \to S^{n-1}$ — that is, no continuous map with $r(x) = x$ for all $x \in S^{n-1} = \partial D^n$.`,
    proof: String.raw`Suppose such an $r$ existed, and let $\iota : S^{n-1} \hookrightarrow D^n$ be the inclusion. The retraction condition says $r \circ \iota = \mathrm{id}_{S^{n-1}}$. Apply the **homology** functor in degree $n-1$: by functoriality $r_* \circ \iota_* = (\mathrm{id})_* = \mathrm{id}$ on $H_{n-1}(S^{n-1})$. By **homology-of-spheres**, $H_{n-1}(S^{n-1}) \cong \mathbb{Z}$ for $n \ge 1$, while $D^n$ is convex, hence contractible, so $H_{n-1}(D^n) = 0$ for $n - 1 \ge 1$ (and for $n = 1$, $H_0(D^1) \cong \mathbb{Z}$ but $\iota_*$ then lands in the diagonal and the reduced version $\tilde H_0(S^0) \cong \mathbb{Z} \to \tilde H_0(D^1) = 0$ is used). The composite factors as
$$H_{n-1}(S^{n-1}) \xrightarrow{\iota_*} H_{n-1}(D^n) \xrightarrow{r_*} H_{n-1}(S^{n-1}),$$
i.e. the identity on $\mathbb{Z}$ (reduced, for $n = 1$) factors through the zero group — impossible, since the identity map of $\mathbb{Z}$ is not the zero map. This contradiction shows no retraction exists. $\square$`,
  },
  {
    id: 'cohomology',
    label: 'Cohomology',
    title: 'Cohomology',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'de-rham-cohomology'],
    description: String.raw`Cohomology dualizes homology — instead of chains it uses functions on chains (cochains), and the boundary map becomes a coboundary running the other way. The extra structure is the payoff: cup product turns the cohomology groups into a graded ring, a finer invariant than the additive homology groups, capable of distinguishing spaces with identical homology. On a smooth manifold cohomology with real coefficients coincides with de Rham cohomology built from differential forms, so the cup product corresponds to the wedge product of forms — the place where calculus and topology meet.`,
    definition: String.raw`Given a space $X$ and abelian group $G$, the **singular cochain complex** is $C^n(X; G) = \operatorname{Hom}(C_n(X), G)$ with coboundary $\delta = \partial^*$ (precomposition with $\partial$), so $\delta\delta = 0$; the **$n$-th cohomology** is $H^n(X; G) = \ker\delta^n / \operatorname{im}\delta^{n-1}$. The **cup product** $\smile : H^p(X) \otimes H^q(X) \to H^{p+q}(X)$ makes $H^*(X; R)$ (for a ring $R$) a graded-commutative ring, an invariant strictly finer than the additive groups of **homology**. For a smooth manifold, $H^n(X; \mathbb{R})$ is naturally isomorphic to the **de Rham cohomology** of differential forms, the cup product corresponding to the wedge product (the de Rham theorem).`,
  },
  {
    id: 'exact-sequence',
    label: 'Exact Sequence',
    title: 'Exact Sequence',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['quotient-group', 'group-homomorphism'],
    description: String.raw`Exactness is a precise bookkeeping of how algebraic structures fit together: in an exact sequence, the image of each map is exactly the kernel of the next, so nothing is lost or spuriously gained between consecutive arrows. A short exact sequence is the atom — it expresses one group as built from a subgroup and the corresponding quotient. The long exact sequences that homology generates (the pair sequence, Mayer–Vietoris) are the main computational levers of the subject, relating the homology of a space, a subspace, and their relative homology so that unknown groups can be pinned down from known ones.`,
    definition: String.raw`A sequence of abelian groups and **group homomorphisms** $\cdots \to A_{n+1} \xrightarrow{f_{n+1}} A_n \xrightarrow{f_n} A_{n-1} \to \cdots$ is **exact at $A_n$** if $\operatorname{im} f_{n+1} = \ker f_n$, and **exact** if exact at every term. A **short exact sequence** is $0 \to A \xrightarrow{f} B \xrightarrow{g} C \to 0$: exactness means $f$ injective, $g$ surjective, and $\operatorname{im} f = \ker g$, so $C \cong B / \operatorname{im} f$ (a **quotient**). Exactness of $0 \to A \xrightarrow{f} B$ says $f$ is injective; of $B \xrightarrow{g} C \to 0$ says $g$ is surjective. A **long exact sequence** is an infinite exact sequence, the standard output of homological constructions.`,
  },

  // ── Numerical invariants ─────────────────────────────────────────────────────
  {
    id: 'euler-characteristic',
    label: 'Euler Characteristic',
    title: 'Euler Characteristic',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['simplicial-complex', 'betti-number', 'cw-complex'],
    description: String.raw`A single integer that summarizes a space's shape, the Euler characteristic is computed for a triangulation as the alternating sum of the cell counts: vertices minus edges plus faces, and so on. Famously $2$ for the sphere and $0$ for the torus, it is independent of the triangulation chosen — a genuine topological invariant. It is the meeting point of combinatorics (cell counts), topology (it equals the alternating sum of Betti numbers), and geometry (Gauss–Bonnet expresses it as total curvature).`,
    definition: String.raw`For a finite **simplicial complex** (or CW complex) $K$ with $c_k$ cells of dimension $k$, the **Euler characteristic** is the alternating sum
$$\chi(K) = \sum_{k \ge 0} (-1)^k c_k = c_0 - c_1 + c_2 - \cdots$$
(for a surface triangulation, $V - E + F$). It is a topological invariant: it does not depend on the chosen triangulation, equaling the alternating sum of **Betti numbers** $\chi = \sum_k (-1)^k b_k$ (the Euler–Poincaré formula), a homotopy invariant.`,
  },
  {
    id: 'betti-number',
    label: 'Betti Number',
    title: 'Betti Number',
    kind: 'definition',
    tags: ['Algebraic Topology'],
    dependencies: ['homology'],
    description: String.raw`The Betti numbers extract a numerical fingerprint from homology: each is the rank of a homology group — the number of independent $n$-dimensional holes. Informally $b_0$ counts connected components, $b_1$ independent loops, $b_2$ enclosed cavities. Being ranks of homotopy-invariant groups they are themselves homotopy invariants, and their alternating sum recovers the Euler characteristic. They are the concrete integers most often quoted to describe a space's holes, and the central output of computational topology.`,
    definition: String.raw`The **$n$-th Betti number** of a space $X$ is the rank of its $n$-th **homology** group,
$$b_n(X) = \operatorname{rank} H_n(X; \mathbb{Z}) = \dim_{\mathbb{Q}} H_n(X; \mathbb{Q}),$$
the number of $\mathbb{Z}$-summands (ignoring torsion). When the $b_n$ are finite and all but finitely many vanish, the alternating sum equals the **Euler characteristic**, $\chi(X) = \sum_n (-1)^n b_n$. Betti numbers are homotopy invariants, since homology is.`,
  },

  // ── Landmark theorems ────────────────────────────────────────────────────────
  {
    id: 'brouwer-fixed-point-theorem',
    label: 'Brouwer Fixed Point',
    title: 'Brouwer Fixed Point Theorem',
    kind: 'theorem',
    tags: ['Algebraic Topology'],
    dependencies: ['homology', 'no-retraction-theorem'],
    description: String.raw`Stir a cup of coffee and some point ends up where it started: every continuous self-map of a closed ball has a fixed point. The proof is the showcase of the topological method — assume no fixed point, and the geometry hands you a continuous retraction of the ball onto its boundary sphere, which homology has already ruled out. The theorem underpins equilibrium existence across economics and game theory (Nash's theorem is a direct descendant) and is the prototype of an existence proof that produces a point without ever locating it.`,
    statement: String.raw`Every continuous map $f : D^n \to D^n$ from the closed $n$-ball to itself has a fixed point: some $x$ with $f(x) = x$.`,
    proof: String.raw`Suppose, for contradiction, that $f(x) \neq x$ for every $x \in D^n$. Then for each $x$ the two distinct points $f(x)$ and $x$ determine a ray starting at $f(x)$ and passing through $x$; let $r(x)$ be the point where this ray exits the ball, i.e. meets the boundary sphere $S^{n-1}$. Explicitly $r(x) = x + t(x)\,(x - f(x))$ for the unique $t(x) \ge 0$ with $|r(x)| = 1$, and $t(x)$ depends continuously on $x$ (it solves a quadratic with nonvanishing leading data since $x \neq f(x)$), so $r : D^n \to S^{n-1}$ is continuous. If $x \in S^{n-1}$ already lies on the boundary, the ray from $f(x)$ through $x$ exits exactly at $x$, so $r(x) = x$. Thus $r$ is a continuous **retraction** of $D^n$ onto $S^{n-1}$. This contradicts the **no-retraction-theorem** (proved using **homology**). Hence $f$ must have a fixed point. $\square$`,
  },
  {
    id: 'classification-of-surfaces',
    label: 'Classification of Surfaces',
    title: 'Classification of Closed Surfaces',
    kind: 'theorem',
    tags: ['Algebraic Topology'],
    dependencies: ['euler-characteristic', 'fundamental-group', 'homology', 'cw-complex'],
    description: String.raw`One of the rare complete classifications in mathematics: every closed connected surface is, up to homeomorphism, either a sphere with some number of handles attached (the orientable surfaces, indexed by genus) or a sphere with some number of cross-caps (the non-orientable ones). Two such surfaces are the same precisely when they agree on two computable invariants — orientability and Euler characteristic. The upshot is that the entire zoo of two-dimensional worlds is fully understood and listed, each one identifiable by a pair of numbers.`,
    statement: String.raw`Every closed (compact, boundaryless) connected surface is homeomorphic to exactly one of: the sphere $S^2$; the connected sum of $g \ge 1$ tori (the orientable surface $\Sigma_g$ of **genus** $g$); or the connected sum of $k \ge 1$ projective planes (the non-orientable surface $N_k$). Two closed connected surfaces are homeomorphic iff they have the same orientability and the same **Euler characteristic**, where $\chi(\Sigma_g) = 2 - 2g$ and $\chi(N_k) = 2 - k$.`,
    proof: String.raw`*Sketch, with the deep input named.* The single external input is that every closed surface is **triangulable** (Radó's theorem) — equivalently admits a finite CW structure; this is what the present graph does not prove. Granting it, the proof is the classical combinatorial reduction. A triangulation lets one cut the surface open into a single polygon ("fundamental polygon") whose boundary edges are identified in pairs, encoded by an edge word. A finite sequence of cut-and-paste moves on this word (eliminating adjacent cancelling pairs $aa^{-1}$, gathering handle pairs $aba^{-1}b^{-1}$ and cross-cap pairs $aa$, and the relation turning a handle plus a cross-cap into three cross-caps) brings every word into one of the **normal forms** $aba^{-1}b^{-1}\cdots$ (orientable, genus $g$) or $a_1a_1\cdots a_k a_k$ (non-orientable), proving the existence half.

*Distinctness.* The listed surfaces are pairwise non-homeomorphic because the two named invariants separate them. **Orientability** is a homeomorphism invariant. The **Euler-characteristic** is a homeomorphism invariant (it is computed from **homology** via the Euler–Poincaré formula $\chi = \sum (-1)^k b_k$, and homology is a topological invariant), and the formulas $\chi(\Sigma_g) = 2 - 2g$, $\chi(N_k) = 2 - k$ are computed directly from each normal-form CW structure (one $0$-cell, the boundary edges as $1$-cells, one $2$-cell). Distinct $(g)$ or $(k)$ give distinct $\chi$ within each orientability class, so no two normal forms agree on both invariants. (The **fundamental group** of each normal form, generated by the edges with the single boundary relation, gives an independent proof of distinctness and exhibits these surfaces as $K(\pi,1)$ spaces for $g, k \ge 1$.) The named external input is the triangulability theorem. $\square$`,
  },
]
