import type { MathNode } from '../types'

export const KNOT_THEORY_NODES: MathNode[] = [
  // ── Objects: knots, links, diagrams ──────────────────────────────────────────
  {
    id: 'knot',
    label: 'Knot & Link',
    title: 'Knot and Link',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['circle', 'homeomorphism'],
    description: String.raw`Take a piece of string, tangle it, and fuse the ends: the result is a closed loop sitting in space that may be genuinely knotted, in the sense that no amount of pushing and pulling (without cutting) untangles it. Mathematically a knot is a circle embedded in three-dimensional space, and a link is several such circles, possibly intertwined. The whole subject is the study of one question — when can one knot be deformed into another? — and the central subtlety is that the embedding itself carries all the information: a knot is *not* studied up to homeomorphism of the circle (every knot is just a circle), but up to deformation of the *ambient* space. To rule out pathological "wild" knots with infinitely fine tangling, one restricts to *tame* knots, those equivalent to a polygonal loop made of finitely many straight segments.`,
    definition: String.raw`A **knot** is a subset $K \subseteq \mathbb{R}^3$ (or $S^3 = \mathbb{R}^3 \cup \{\infty\}$) that is the image of an embedding of the **circle** $S^1$ — a continuous injection $f : S^1 \to \mathbb{R}^3$ that is a **homeomorphism** onto $K$. A **link** of $n$ components is the image of an embedding of a disjoint union $\bigsqcup_{i=1}^n S^1$; a knot is a $1$-component link. The knot is **tame** if it is equivalent to a **polygonal** knot (a finite union of straight line segments); all knots considered here are tame, excluding wild embeddings. Two links $L_0, L_1$ are **equivalent** (**ambient isotopic**) if there is a continuous family of homeomorphisms $h_t : \mathbb{R}^3 \to \mathbb{R}^3$, $t \in [0,1]$, with $h_0 = \mathrm{id}$ and $h_1(L_0) = L_1$ — a deformation of the surrounding space carrying one to the other. The **unknot** is the equivalence class of the standard round circle.`,
  },
  {
    id: 'knot-diagram',
    label: 'Knot Diagram',
    title: 'Knot Diagram',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'continuous-map'],
    description: String.raw`A knot lives in three dimensions, but one studies it by drawing its shadow on a plane and recording, at each spot where the shadow crosses itself, which strand passes over and which under. This flat picture with over/under information is a *knot diagram*, and it captures the knot completely: from a generic projection together with the crossing data, the three-dimensional knot can be reconstructed up to equivalence. "Generic" rules out the bad shadows — a strand running tangent to itself, three strands meeting at a point, a whole arc collapsing — leaving only finitely many honest double points, the crossings. Diagrams are what make knot theory combinatorial: nearly every invariant is computed by staring at a diagram.`,
    definition: String.raw`A **regular projection** of a link $L \subseteq \mathbb{R}^3$ is the image of $L$ under a projection $\pi : \mathbb{R}^3 \to \mathbb{R}^2$ onto a plane such that the **continuous** restriction $\pi|_L$ is injective except at finitely many **double points** (two preimages each), at every double point the two strands cross **transversally** (no tangencies), and no three strands meet at one point. (A generic projection direction yields a regular projection.) A **knot diagram** (or link diagram) $D$ is a regular projection together with, at each double point, the designation of one strand as the **overstrand** and the other as the **understrand** — drawn by breaking the underpassing arc. The double points are the **crossings**; the arcs between consecutive underpasses are the **arcs** of $D$. A diagram is **oriented** when each component is given a direction, drawn as an arrow along the strand.`,
  },
  {
    id: 'reidemeister-moves',
    label: 'Reidemeister Moves',
    title: 'Reidemeister Moves',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot-diagram'],
    description: String.raw`The same knot has infinitely many different diagrams, and the basic problem is to recognize when two pictures depict the same knot. Reidemeister isolated three elementary local edits, each a small change inside a disk leaving the rest of the diagram untouched, that suffice to relate any two diagrams of equivalent knots. Move I adds or removes a kink (a little twist in a single strand); move II slides one strand entirely over or under another, creating or destroying two crossings; move III slides a strand across a crossing of two others. Every continuous deformation of the knot in space, projected down, decomposes into a finite sequence of these three moves together with planar wiggles that change no crossing.`,
    definition: String.raw`The **Reidemeister moves** are three local modifications of a **knot diagram**, each performed inside a disk in which the diagram looks exactly as drawn and outside of which it is unchanged:
$$\textbf{R1: } \text{add or remove a single twist (kink)};\quad \textbf{R2: } \text{push one strand over/under another (add or remove two crossings)};\quad \textbf{R3: } \text{slide a strand past a crossing of two others}.$$
Two diagrams are **Reidemeister equivalent** if one is obtained from the other by a finite sequence of these moves together with **planar isotopies** (deformations of the plane that move strands without creating, destroying, or interchanging crossings). A quantity assigned to diagrams is a **knot invariant** precisely when it is unchanged by all three moves (and planar isotopy).`,
  },
  {
    id: 'reidemeister-theorem',
    label: "Reidemeister's Theorem",
    title: "Reidemeister's Theorem",
    kind: 'theorem',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'knot-diagram', 'reidemeister-moves'],
    description: String.raw`This is the theorem that turns three-dimensional knot theory into two-dimensional combinatorics. It says the three Reidemeister moves are not merely *some* edits preserving the knot type — they are *all* of them: two diagrams come from equivalent knots if and only if a finite sequence of Reidemeister moves connects them. Consequently, to prove that a number, polynomial, or group built from a diagram is a genuine knot invariant, one need only check it survives each of the three moves, a finite local verification. The forward direction (moves preserve the knot) is easy; the converse, that moves suffice, is the substance, proved by approximating an ambient isotopy by polygonal moves and analyzing how the projection changes.`,
    statement: String.raw`Two link diagrams $D_0, D_1$ represent **ambient isotopic** (equivalent) tame links if and only if $D_0$ and $D_1$ are related by a finite sequence of **Reidemeister moves** R1, R2, R3 and planar isotopies. Consequently, a function on diagrams that is invariant under R1, R2, R3 descends to a well-defined invariant of links.`,
    proof: String.raw`($\Leftarrow$) Each Reidemeister move and each planar isotopy is realized by an ambient isotopy of $\mathbb{R}^3$: the local modification happens inside a ball where the rest of the link is unaffected, and the over/under data ensures the strands can be pushed through one another in space without collision. Hence Reidemeister-equivalent diagrams come from equivalent links.

($\Rightarrow$) This is the deep direction; we give the standard sketch, naming the external inputs. Work with **polygonal** (PL) links — legitimate since every tame link is PL, by the definition of tameness. *Step 1 (combinatorial isotopy).* By the foundational theorem of PL knot theory, two PL links are ambient isotopic iff they differ by a finite sequence of **elementary moves**: replacing one edge of the polygon by the two other edges of a triangle whose interior meets the link in nothing else (a "$\Delta$-move"), and its inverse. *Step 2 (project the moves).* Choose a projection direction regular for both polygons and all intermediate ones (a generic direction works, as the bad directions form a measure-zero set). Each elementary $\Delta$-move, projected, alters the diagram inside the image of the triangle. Subdividing the triangle so that its projection contains at most one crossing event at a time, each elementary move projects to a finite composition of the three Reidemeister moves and planar isotopies — a finite case analysis over how the triangle's shadow meets the diagram. Composing over all elementary moves connects $D_0$ to $D_1$ by Reidemeister moves.

The descent statement is immediate: if $f$ is invariant under R1, R2, R3 and equivalent links share a Reidemeister sequence, then $f$ takes the same value on all diagrams of a given link, so $f$ is a link invariant. $\square$`,
  },
  {
    id: 'knot-invariant',
    label: 'Knot Invariant',
    title: 'Knot Invariant',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'knot-diagram', 'reidemeister-theorem'],
    description: String.raw`Distinguishing knots requires quantities that depend only on the knot type, not on the particular tangled picture in front of you. A *knot invariant* is exactly such a quantity: a value — a number, a polynomial, a group — that is the same for equivalent knots. The logic of invariants is one-directional and that is the whole point: if two diagrams yield different values, the knots are provably distinct; equal values are merely suggestive, since no known computable invariant separates *all* knots. The art is to build invariants strong enough to tell knots apart yet computable enough to use. By Reidemeister's theorem, an invariant is the same thing as a diagram quantity unchanged by the three moves.`,
    definition: String.raw`A **knot invariant** (link invariant) valued in a set $S$ is a function $\iota$ from links to $S$ that is constant on equivalence classes: if $L_0$ and $L_1$ are **ambient isotopic** then $\iota(L_0) = \iota(L_1)$. Equivalently, by **Reidemeister's theorem**, $\iota$ may be defined on **knot diagrams** provided its value is unchanged under each Reidemeister move R1, R2, R3 (and planar isotopy). An invariant is **complete** if $\iota(L_0) = \iota(L_1)$ also implies equivalence; it is a **partial** invariant otherwise. Contrapositively, $\iota(L_0) \neq \iota(L_1)$ proves $L_0 \not\simeq L_1$.`,
  },

  // ── Elementary invariants ────────────────────────────────────────────────────
  {
    id: 'tricolorability',
    label: 'Tricolorability',
    title: 'Tricolorability',
    kind: 'proposition',
    tags: ['Knot Theory'],
    dependencies: ['knot-invariant', 'reidemeister-moves', 'integers'],
    description: String.raw`The simplest invariant strong enough to prove a knot is knotted is a coloring game. Colour each arc of a diagram with one of three colours so that at every crossing the three arcs meeting there are either all the same colour or all different — and require at least two colours actually be used. A diagram admitting such a colouring is *tricolorable*. The trefoil can be so coloured; the unknot, having a one-arc diagram, cannot — so the trefoil is genuinely knotted. The content of the proposition is that tricolorability survives all three Reidemeister moves, hence is a property of the knot and not of the diagram. It is the gateway to the much more general theory of Fox $n$-colourings and colourings by a quandle.`,
    statement: String.raw`Call a **knot diagram** **tricolorable** if its arcs can each be assigned one of three colours so that (i) at every crossing the three incident arcs are all alike or all distinct, and (ii) at least two colours are used. Then tricolorability is invariant under the **Reidemeister moves** R1, R2, R3, hence is a **knot invariant**. In particular the trefoil is tricolorable and the unknot is not, so the trefoil is not the unknot.`,
    proof: String.raw`Encode the three colours as the elements $0, 1, 2$ of $\mathbb{Z}/3\mathbb{Z}$ (a quotient of the **integers**). The crossing condition "all alike or all distinct" is equivalent to the linear relation $x + y + z \equiv 0 \pmod 3$ on the three incident colours $x, y, z$: if all are equal, $3x \equiv 0$; if all distinct, $0 + 1 + 2 \equiv 0$; and conversely the only solutions of $x + y + z \equiv 0$ with $\{x,y,z\}$ drawn from three values are the all-equal and all-distinct triples. A **tricoloring** is thus a labelling of arcs by $\mathbb{Z}/3$ satisfying this relation at each crossing; "tricolorable" means there is one using $\ge 2$ colours. We check each Reidemeister move sets up a bijection between valid colourings of the two sides that preserves the number of colours used outside the local disk, so existence of a nontrivial colouring is preserved.

**R1.** A kink involves one strand whose two sub-arcs $a, b$ meet themselves at the new crossing, where the relation reads $a + a + b \equiv 0$, i.e. $b \equiv -2a \equiv a \pmod 3$. So the two sub-arcs must share a colour, matching the single colour of the strand after the kink is removed. The colouring extends uniquely across the move and uses the same colours.

**R2.** Pushing strand $\beta$ across strand $\alpha$ creates two crossings. Say $\alpha$ keeps a single colour $a$ (it is the over- or under-strand throughout the move) while $\beta$ is split into sub-arcs $b$ (incoming), $c$ (middle), $d$ (outgoing). The two crossing relations are $a + b + c \equiv 0$ and $a + c + d \equiv 0$ (with appropriate roles), giving $c \equiv -a - b$ and then $d \equiv -a - c \equiv b$. So the outgoing colour equals the incoming colour $b$ and the middle colour is forced; removing the two crossings (no middle arc) leaves the consistent colouring $b$ on $\beta$ and $a$ on $\alpha$. The correspondence is a bijection preserving colours used.

**R3.** Here three strands and three crossings are involved. Writing the three incoming colours as free parameters, each of the three crossing relations $x+y+z \equiv 0$ determines the colour of the arc it creates; solving the resulting linear system over $\mathbb{Z}/3$ shows the colours of the six boundary arcs of the disk are the same before and after the move, and the (unique) interior colours are determined on each side. Thus valid colourings correspond bijectively across R3 with identical boundary data, so the same colours are used.

Since each move yields a colour-count-preserving bijection of colourings, a diagram has a nontrivial ($\ge 2$ colour) colouring iff every Reidemeister-equivalent diagram does; by **Reidemeister's theorem** (invoked through the definition of **knot-invariant**) tricolorability is a knot invariant. Finally, the standard trefoil diagram has three arcs which can be coloured $0, 1, 2$ — each crossing sees all three — so it is tricolorable; the unknot has a diagram with a single arc, admitting only the one-colour labelling, so it is not. A knot invariant separating them, the trefoil is knotted. $\square$`,
  },
  {
    id: 'crossing-number',
    label: 'Crossing Number',
    title: 'Crossing Number',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'knot-diagram', 'knot-invariant'],
    description: String.raw`The most obvious measure of how complicated a knot is: the fewest crossings any of its diagrams can have. Because it is the minimum over all diagrams of the same knot, it is automatically an invariant. The unknot alone has crossing number $0$; no knot has crossing number $1$ or $2$ (too few crossings to be knotted); the two trefoils (left- and right-handed) are the only knots of crossing number $3$. This single integer indexes the standard knot tables — knots are catalogued first by crossing number. It is deceptively hard to compute: a given diagram only gives an *upper* bound, and proving a diagram is minimal requires a separate argument, often via a stronger invariant.`,
    definition: String.raw`The **crossing number** $c(K)$ of a knot $K$ is the minimum, over all **knot diagrams** $D$ representing $K$, of the number of **crossings** of $D$:
$$c(K) = \min\{\, |\mathrm{crossings}(D)| : D \text{ is a diagram of } K \,\}.$$
The minimum is attained (each knot has a diagram, and the crossing counts form a nonempty subset of $\mathbb{N}$, which is well-ordered). Being a minimum over the diagrams of a fixed equivalence class, $c$ is a **knot invariant**. One has $c(K) = 0$ iff $K$ is the unknot; no knot has $c(K) \in \{1, 2\}$; and $c = 3$ exactly for the two trefoils. A particular diagram with $n$ crossings shows only $c(K) \le n$.`,
  },
  {
    id: 'linking-number',
    label: 'Linking Number',
    title: 'Linking Number',
    kind: 'proposition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'knot-diagram', 'reidemeister-moves', 'reidemeister-theorem', 'integers', 'knot-invariant'],
    description: String.raw`For a two-component link, the linking number measures how many times one component winds around the other — a signed integer counting the net entanglement. Orient both components, then at each crossing where one component passes over the other assign $+1$ or $-1$ by a right-hand rule, sum these signs, and halve. The Hopf link (two circles passing once through each other) has linking number $\pm 1$; two separated circles have $0$. The proposition is that this number is unchanged by the Reidemeister moves, so it is a genuine invariant of the oriented link — the first invariant historically to prove two links inequivalent, and a discrete shadow of the Gauss linking integral.`,
    statement: String.raw`Let $L = K_1 \cup K_2$ be an oriented two-component link with diagram $D$. At each crossing between $K_1$ and $K_2$ assign the **sign** $+1$ or $-1$ according to whether the under-to-over frame is right- or left-handed (the convention: $\mathrm{sgn} = +1$ when rotating the under-strand's arrow counterclockwise by $90^\circ$ aligns it with the over-strand's arrow). The **linking number**
$$\mathrm{lk}(K_1, K_2) = \tfrac{1}{2}\sum_{c \,\in\, K_1 \cap K_2} \mathrm{sgn}(c)$$
(sum over crossings *between* the two components) is an **integer** and is invariant under R1, R2, R3; hence it is an invariant of the oriented link.`,
    proof: String.raw`*Integrality.* Travel once around $K_1$. Each time the strand of $K_1$ meets $K_2$ it does so at a crossing between the components, and over the full circuit $K_1$ must cross from one side of the closed curve $K_2$ to the other an even number of times (a closed loop returns to its starting region). More directly: the inter-component crossings come in the count contributed once by traversing $K_1$ and the identical set is counted again traversing $K_2$, and the standard parity argument shows $\sum_c \mathrm{sgn}(c)$ is even, so the half-sum is an **integer**. (Equivalently, $\mathrm{lk}$ equals the signed count of crossings where $K_1$ passes *under* $K_2$, with no factor of $\tfrac12$, which is manifestly an integer; the symmetric half-sum equals this.)

*Invariance under the moves.* We use that only crossings **between** $K_1$ and $K_2$ contribute.

**R1** creates or removes a self-crossing of a single component. A self-crossing is not an inter-component crossing, so it contributes nothing to the sum; the linking number is unchanged.

**R2** creates or removes two crossings on two strands. If the two strands belong to the *same* component, neither new crossing is inter-component, so no change. If they belong to *different* components, the two new crossings involve the same pair of strands with opposite orientations of approach, hence carry **opposite signs** $+1$ and $-1$; their contributions cancel and the half-sum is unchanged.

**R3** permutes three strands across a crossing but creates and destroys no crossing — it slides a strand past an existing crossing — so each crossing persists with the same pair of strands and the same sign (the local orientations are unchanged). The set of inter-component crossings and their signs is preserved, so the sum is unchanged.

Invariant under all three **Reidemeister moves**, $\mathrm{lk}$ is by **Reidemeister's theorem** (via **knot-invariant**) an invariant of the oriented link. The Hopf link has a single pair of inter-component crossings of equal sign, giving $\mathrm{lk} = \pm 1 \neq 0$, distinguishing it from the unlink. $\square$`,
  },

  // ── The knot group ───────────────────────────────────────────────────────────
  {
    id: 'knot-group',
    label: 'Knot Group',
    title: 'Knot Group (π₁ of the Complement)',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'fundamental-group', 'fundamental-group-of-circle', 'knot-diagram', 'group'],
    description: String.raw`The deepest classical invariant of a knot is not built from the knot itself but from the *space around* it: remove the knot from three-space and ask for the fundamental group of what remains. Loops in the complement that hook through the knot cannot be contracted, and the way they interact records the knotting with great fidelity. For the unknot the complement is a solid-torus-like region and the group is just $\mathbb{Z}$; for any nontrivial knot it is a larger, non-abelian group. There is a mechanical recipe — the Wirtinger presentation — reading generators and relations straight off a diagram: one generator per arc, one relation per crossing. Remarkably, for knots in $S^3$ this single invariant is essentially complete.`,
    definition: String.raw`The **knot group** of a knot $K \subseteq S^3$ is the **fundamental group** of its complement,
$$\pi_1(S^3 \setminus K).$$
It is computed from any oriented **knot diagram** by the **Wirtinger presentation**: take one generator $x_i$ for each **arc** of the diagram (an oriented small loop encircling that arc, a *meridian*), and at each crossing impose the relation
$$x_k = x_j\, x_i\, x_j^{-1} \qquad (\text{or } x_k = x_j^{-1} x_i\, x_j),$$
where $x_i, x_k$ are the two arcs of the under-strand and $x_j$ is the over-strand, the sign of the conjugation fixed by the crossing's handedness. The resulting **group** $\langle x_1, \dots, x_n \mid r_1, \dots, r_n\rangle$ is $\pi_1(S^3 \setminus K)$; one relation is always redundant. Its abelianization is always $\mathbb{Z}$, generated by any meridian. For the unknot the group is $\mathbb{Z}$.`,
    proof: String.raw`*Well-definedness.* The complement $S^3 \setminus K$ is an open, path-connected $3$-manifold, so $\pi_1(S^3 \setminus K)$ is defined (up to isomorphism, independent of basepoint) by the **fundamental-group** construction, and it is an invariant of $K$ because equivalent knots have homeomorphic complements (an ambient isotopy of $S^3$ carrying $K_0$ to $K_1$ restricts to a homeomorphism of complements, inducing an isomorphism of fundamental groups). That the Wirtinger presentation computes this group is a theorem (via the **van Kampen theorem**: decompose a neighbourhood of the diagram into regions, one over-arc and the cells around each crossing, and assemble $\pi_1$ from the pieces; each crossing contributes its conjugation relation). For the unknot, $S^3 \setminus K$ deformation retracts onto a circle, so its fundamental group is $\mathbb{Z}$ by the computation of $\pi_1(S^1)$. $\square$`,
  },

  // ── Seifert surfaces and genus ───────────────────────────────────────────────
  {
    id: 'seifert-surface',
    label: 'Seifert Surface',
    title: 'Seifert Surface',
    kind: 'theorem',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'knot-diagram', 'manifold', 'connectedness'],
    description: String.raw`Every knot, no matter how tangled, bounds a surface: an orientable surface in three-space whose only boundary is the knot itself, like a soap film spanning a wire loop. For the unknot the surface is a disk; for the trefoil the simplest such surface is a once-punctured torus. The existence of these *Seifert surfaces* is proved constructively by Seifert's algorithm, which orients a diagram, smooths every crossing compatibly with the orientation to get a family of disjoint circles bounding disks, and then reconnects the disks by a twisted band at each smoothed crossing. The genus of the simplest spanning surface becomes a powerful invariant, and Seifert surfaces are the geometric source of the Alexander polynomial and the signature.`,
    statement: String.raw`Every knot $K \subseteq S^3$ bounds a compact, connected, orientable surface $\Sigma \subseteq S^3$ with $\partial \Sigma = K$ — a **Seifert surface**. (More generally every oriented link bounds such a surface.)`,
    proof: String.raw`We give Seifert's algorithm, a genuine construction, and name the one external classification input. Fix an oriented **knot diagram** $D$ of $K$.

*Step 1 (Seifert circles).* At each **crossing**, perform the **oriented smoothing**: delete the crossing and reconnect the four ends respecting orientation — each incoming strand joins the outgoing strand it would continue into so that arrows match. After smoothing all crossings, the diagram becomes a disjoint collection of oriented simple closed curves in the plane, the **Seifert circles** (no crossings remain, and orientation-respecting smoothing cannot create a transverse intersection).

*Step 2 (disks).* Each Seifert circle bounds a disk; nested circles are pushed to slightly different heights so the disks are disjoint, stacked parallel to the plane.

*Step 3 (bands).* At each former crossing, reconnect the two disks whose boundaries were smoothed there by a small **half-twisted band**, the twist matching the sign of the crossing. The boundary of the resulting surface, by construction, is exactly the original knot $K$ (the bands undo the smoothing, restoring each crossing).

*Orientability (the oriented surface of Seifert's algorithm; we give the construction and name the standard local check).* Each Seifert circle inherits an orientation from $K$, since the oriented smoothing joins each incoming end to the adjacent outgoing end. Orient each Seifert disk to induce that boundary orientation — equivalently fix its normal by the right-hand rule (a counterclockwise boundary circle gets the upward normal, a clockwise one the downward normal), the disks being stacked at distinct heights by nesting depth so they stay disjoint. These disk orientations extend across the reconnecting bands into one orientation of $\Sigma$: at each former crossing the two attaching arcs are **co-directed** (both run incoming-to-outgoing), and the half-twisted band, whose twist parity is fixed by that crossing, reconnects the two disks compatibly with their normals. This local sign-check — that the crossing's twist is exactly the parity reconciling the two disks' normals — is the verification at the heart of Seifert's algorithm, and it is precisely what distinguishes this **orientable** Seifert surface from the non-orientable checkerboard spanning surfaces of the same diagram (the twist parity genuinely matters; a wrong-parity band would close up into a Möbius join). Hence $\Sigma$ carries a global normal field; it is two-sided, i.e. **orientable**, and a compact surface-with-boundary (a **manifold** with boundary) with $\partial\Sigma = K$.

*Connectedness.* If the surface has several components, only one meets $K$ (which is connected); discard the others, or tube them together — but in fact for a knot (one component) the band-and-disk surface is automatically **connected** along the single boundary circle. By the **classification of compact surfaces with boundary** (the external input), this orientable surface is a sphere-with-handles-and-holes, characterized up to homeomorphism by its genus and one boundary circle. $\square$`,
  },
  {
    id: 'seifert-genus',
    label: 'Seifert Genus',
    title: 'Seifert Genus',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['seifert-surface', 'knot-invariant', 'euler-characteristic'],
    description: String.raw`A knot bounds many Seifert surfaces of varying complexity; the simplest possible one measures the knot. The *genus* of a knot is the least genus — the fewest handles — among all its Seifert surfaces. The unknot has genus $0$ (it bounds a disk), and this characterizes it: genus $0$ means unknotted. The trefoil and figure-eight both have genus $1$. Genus is additive under the connected sum of knots, which immediately yields that knots cannot be "cancelled" — there is no nontrivial knot whose connected sum with another gives the unknot. It is one of the few classical invariants with a clean geometric meaning, though computing it exactly can be subtle.`,
    definition: String.raw`The **genus** $g(K)$ of a knot $K$ is the minimum genus of a **Seifert surface** for $K$:
$$g(K) = \min\{\, g(\Sigma) : \Sigma \text{ a Seifert surface for } K\,\},$$
where the **genus** $g(\Sigma)$ of a compact connected orientable surface with one boundary circle is the number of handles, related to its **Euler characteristic** by $\chi(\Sigma) = 1 - 2g(\Sigma)$ (one boundary component). The minimum is over the nonempty set of Seifert surfaces (which exist by the **Seifert surface** theorem) and is attained in $\mathbb{N}$, so $g(K)$ is a well-defined **knot invariant**. One has $g(K) = 0$ iff $K$ is the unknot (a genus-$0$ Seifert surface is a disk, exhibiting $K$ as its unknotted boundary), and $g$ is additive under connected sum: $g(K_1 \# K_2) = g(K_1) + g(K_2)$.`,
  },

  // ── Polynomial invariants ────────────────────────────────────────────────────
  {
    id: 'alexander-polynomial',
    label: 'Alexander Polynomial',
    title: 'Alexander Polynomial',
    kind: 'definition',
    tags: ['Knot Theory'],
    dependencies: ['knot', 'seifert-surface', 'knot-group', 'integers', 'determinant', 'linking-number', 'homology'],
    description: String.raw`The first polynomial invariant of knots, dating to 1928, attaches to each knot a Laurent polynomial in one variable $t$ — far more discriminating than any single number. It can be computed three equivalent ways: from a Seifert surface via the *Seifert matrix* recording how loops on the surface link their own pushoffs; from the knot group via Fox's free differential calculus; or from a diagram by the *Conway skein relation*, a local rule relating the polynomials of three diagrams differing at one crossing. It detects, for instance, that the trefoil $(t - 1 + t^{-1})$ and figure-eight $(-t + 3 - t^{-1})$ are distinct and both knotted, though it famously fails to see the difference between a knot and its mirror, and cannot detect the unknot among all knots.`,
    definition: String.raw`Coefficients lie in the **Laurent polynomial ring** $\mathbb{Z}[t, t^{-1}]$ over the **integers** (finite sums $\sum_k a_k t^k$, $k \in \mathbb{Z}$). Given a knot $K$ with **Seifert surface** $\Sigma$, choose a basis $\alpha_1, \dots, \alpha_{2g}$ of loops on $\Sigma$ (a basis of $H_1(\Sigma)$) and form the **Seifert matrix** $V = (v_{ij})$ with $v_{ij} = \mathrm{lk}(\alpha_i, \alpha_j^{+})$, the linking number of $\alpha_i$ with the pushoff $\alpha_j^{+}$ of $\alpha_j$ off the surface. The **Alexander polynomial** is the **determinant**
$$\Delta_K(t) = \det\!\bigl(V - t\,V^{\mathsf{T}}\bigr) \in \mathbb{Z}[t, t^{-1}],$$
defined up to multiplication by $\pm t^k$ (a unit of the ring); normalized so that $\Delta_K(t) = \Delta_K(t^{-1})$ and $\Delta_K(1) = 1$. Equivalently it is determined by $\Delta_{\text{unknot}}(t) = 1$ together with the **Conway skein relation** $\Delta_{L_+}(t) - \Delta_{L_-}(t) = (t^{1/2} - t^{-1/2})\,\Delta_{L_0}(t)$ relating the three links that differ only at one crossing (positive, negative, smoothed). It is also the order of the Alexander module $H_1$ of the infinite cyclic cover of $S^3 \setminus K$, derived from the **knot group**.`,
    proof: String.raw`*Invariance (sketch).* The matrix $V$ depends on the chosen surface and basis, but $\det(V - tV^{\mathsf{T}})$ does not, up to the unit $\pm t^k$. A change of basis of $H_1(\Sigma)$ replaces $V$ by $P^{\mathsf{T}} V P$ for $P \in GL_{2g}(\mathbb{Z})$, multiplying the determinant by $(\det P)^2 = 1$. Different Seifert surfaces for the same knot are related by a sequence of **stabilizations** (adding a tube/handle), each of which enlarges $V$ in a controlled block form that multiplies $\det(V - tV^{\mathsf{T}})$ only by a power of $t$ (times a sign) — this uses the external fact that any two Seifert surfaces become isotopic after stabilization. Hence $\Delta_K$ is well-defined up to a unit, and the symmetric/$\Delta_K(1)=1$ normalization pins it down. The skein characterization is then verified to satisfy the same relations, so the two definitions agree. $\square$`,
  },
  {
    id: 'kauffman-bracket',
    label: 'Kauffman Bracket',
    title: 'Kauffman Bracket',
    kind: 'theorem',
    tags: ['Knot Theory'],
    dependencies: ['knot-diagram', 'reidemeister-moves'],
    description: String.raw`The Kauffman bracket is a strikingly elementary route to a deep polynomial invariant. It assigns a Laurent polynomial in a variable $A$ to a knot diagram by a purely local recipe: at each crossing, replace it by the two possible smoothings, weighted by $A$ and $A^{-1}$; a diagram of $n$ disjoint circles gets the value $(-A^2 - A^{-2})^{n-1}$. Expanding all crossings produces a sum over the $2^n$ "states." The bracket is not quite a knot invariant — it changes under the kink move R1 — but it is invariant under R2 and R3, and that controlled failure is repaired by a writhe correction, yielding the Jones polynomial. The proposition establishes exactly the two invariances that make the construction work.`,
    statement: String.raw`Define the **Kauffman bracket** $\langle D\rangle \in \mathbb{Z}[A, A^{-1}]$ on unoriented **knot diagrams** by the rules (i) $\langle \bigcirc\rangle = 1$ for the one-circle diagram; (ii) the skein expansion at each crossing $\langle \mathrm{X}\rangle = A\,\langle {\asymp}\rangle + A^{-1}\,\langle {)(}\rangle$ ($A$-smoothing and $B$-smoothing); (iii) $\langle D \sqcup \bigcirc\rangle = (-A^2 - A^{-2})\,\langle D\rangle$ for a disjoint added circle. Then $\langle D\rangle$ is invariant under **Reidemeister moves** R2 and R3, and under R1 transforms by $\langle D'\rangle = -A^{\pm 3}\langle D\rangle$ (sign per the kink's handedness). It is therefore *not* R1-invariant, but is invariant under R2 and R3.`,
    proof: String.raw`Throughout, $\delta := -A^2 - A^{-2}$ is the value rule (iii) attaches to each extra circle; rules (i)–(iii) determine $\langle D\rangle$ on every diagram by expanding all crossings into the $2^n$ states (each a disjoint union of circles) and summing $A^{(\#A\text{-smoothings}) - (\#B\text{-smoothings})}\,\delta^{(\#\text{circles}) - 1}$.

**R2.** Apply the skein rule to both crossings of the R2 tangle. Expanding the upper crossing as $A(\,\cdot\,) + A^{-1}(\,\cdot\,)$ and then the lower one, the four resulting states are weighted $A \cdot A = A^2$, $A \cdot A^{-1} = 1$, $A^{-1}\cdot A = 1$, $A^{-1}\cdot A^{-1} = A^{-2}$. Tracking which tangle each state produces: both $A$-smoothings give $\asymp$; both $B$-smoothings give $\asymp$; one weight-$1$ mixed state gives the pulled-apart tangle $)($, while the other weight-$1$ mixed state gives $\asymp$ carrying a closed circle (factor $\delta$). The three states giving $\asymp$ therefore carry coefficients $A^2$, $\delta$, and $A^{-2}$ on the *same* tangle. Collecting,
$$\langle \text{R2 tangle}\rangle = A^2\langle {\asymp}\rangle + \delta\,\langle {\asymp}\rangle + A^{-2}\langle {\asymp}\rangle + \langle {)(}\rangle = \bigl(A^2 + \delta + A^{-2}\bigr)\langle {\asymp}\rangle + \langle {)(}\rangle.$$
Substituting $\delta = -A^2 - A^{-2}$ gives $A^2 + A^{-2} + \delta = A^2 + A^{-2} + (-A^2 - A^{-2}) = 0$, so the $\langle\asymp\rangle$ terms cancel and $\langle \text{R2 tangle}\rangle = \langle {)(}\rangle$, the pulled-apart (identity) tangle. Hence the bracket of the diagram with the two R2 crossings equals the bracket of the diagram with the strands pulled apart: R2-invariance.

**R3.** Expand one of the three crossings of the R3 configuration via rule (ii). One smoothing yields a diagram in which a strand may be slid by an **R2** move (just shown to preserve $\langle\cdot\rangle$); the other smoothing yields a configuration that is identical on the two sides of R3. Performing the same expansion on the other side of the move and using R2-invariance term by term, the two sides have equal brackets. Thus $\langle\cdot\rangle$ is invariant under **R3**.

**R1.** A positive kink has one crossing; expanding it, one smoothing produces a small disjoint circle (factor $\delta$) attached to the strand, the other reproduces the kinkless strand:
$$\langle \text{kink}\rangle = A\,(\delta)\langle D\rangle + A^{-1}\langle D\rangle = \bigl(A\delta + A^{-1}\bigr)\langle D\rangle = \bigl(A(-A^2 - A^{-2}) + A^{-1}\bigr)\langle D\rangle = -A^3\,\langle D\rangle,$$
and the oppositely-handed kink gives $-A^{-3}$. So R1 multiplies the bracket by $-A^{\pm 3}$, confirming the bracket is *not* R1-invariant but transforms by a definite unit. $\square$`,
  },
  {
    id: 'jones-polynomial',
    label: 'Jones Polynomial',
    title: 'Jones Polynomial',
    kind: 'theorem',
    tags: ['Knot Theory'],
    dependencies: ['kauffman-bracket', 'knot-invariant', 'reidemeister-theorem', 'linking-number'],
    description: String.raw`The Jones polynomial, discovered in 1984, revolutionized knot theory and connected it to operator algebras and physics. Kauffman's insight made it elementary: the bracket polynomial fails only the R1 move, by a predictable unit factor, so multiplying by a compensating power of $A$ tied to the diagram's *writhe* — the signed crossing count — exactly cancels that failure. The result is a genuine invariant, the Jones polynomial. Unlike the Alexander polynomial it distinguishes many knots from their mirror images (a left trefoil from a right), and it remains a central open problem whether it detects the unknot. The proof here assembles the invariant from the bracket's known transformation laws.`,
    statement: String.raw`For an oriented **knot diagram** $D$ with **writhe** $w(D) = \sum_{\text{crossings}} \mathrm{sgn}(c)$ (the signed self-crossing count), define
$$V_K(A) = \bigl(-A^3\bigr)^{-w(D)}\,\langle D\rangle \in \mathbb{Z}[A, A^{-1}].$$
Then $V_K$ is invariant under all three **Reidemeister moves**, hence is a **knot invariant** (the **Jones polynomial**, recovered in the classical variable by $t = A^{-4}$). It satisfies $V_{\text{unknot}} = 1$ and the skein relation $t^{-1}V_{L_+} - t\,V_{L_-} = (t^{1/2} - t^{-1/2})V_{L_0}$.`,
    proof: String.raw`We show the normalizing factor cancels the bracket's R1 anomaly while leaving R2/R3 invariance intact; invariance under all three moves then gives a link invariant by **Reidemeister's theorem** (through **knot-invariant**).

*Writhe under the moves.* The writhe $w(D)$ sums the **signs** of the self-crossings, exactly as in the **linking number** but over crossings of the knot with itself. Under **R2** the two created crossings have opposite signs, so $w$ is unchanged; under **R3** crossings are merely slid, preserving signs, so $w$ is unchanged. Under **R1** a single signed crossing is added or removed, so $w$ changes by $\pm 1$, with the sign matching the kink's handedness.

*R2, R3.* By the **Kauffman bracket** theorem, $\langle D\rangle$ is invariant under R2 and R3, and $w(D)$ is likewise invariant under R2 and R3 (just shown). Hence the product $(-A^3)^{-w(D)}\langle D\rangle = V_K$ is unchanged by R2 and R3.

*R1.* Adding a positive kink multiplies $\langle D\rangle$ by $-A^{3}$ and increases $w$ by $1$; then
$$V = (-A^3)^{-(w+1)}\bigl(-A^3\langle D\rangle\bigr) = (-A^3)^{-w}(-A^3)^{-1}(-A^3)\langle D\rangle = (-A^3)^{-w}\langle D\rangle,$$
unchanged. A negative kink multiplies $\langle D\rangle$ by $-A^{-3}$ and decreases $w$ by $1$, and the same cancellation $(-A^3)^{+1}(-A^{-3}) = 1$ holds. So $V_K$ is invariant under **R1** as well.

Invariant under R1, R2, R3, $V_K$ is a **knot invariant**. The normalization gives $V_{\text{unknot}} = (-A^3)^0 \cdot 1 = 1$.

*Skein relation.* At an oriented crossing the writhes of the three diagrams satisfy $w(L_+) = w(L_0) + 1$ and $w(L_-) = w(L_0) - 1$, since $L_0$ is the oriented (Seifert) smoothing carrying no crossing where $L_\pm$ carry a $\pm$ self-crossing. Apply the **Kauffman bracket** skein at that crossing: $\langle L_+\rangle = A\langle L_0\rangle + A^{-1}\langle L_\infty\rangle$ and $\langle L_-\rangle = A^{-1}\langle L_0\rangle + A\langle L_\infty\rangle$, where $L_0$ is the oriented smoothing and $L_\infty$ the disoriented one. Eliminate $\langle L_\infty\rangle$ by forming $A\langle L_+\rangle - A^{-1}\langle L_-\rangle = (A^2 - A^{-2})\langle L_0\rangle$. Substitute $\langle L_\pm\rangle = (-A^3)^{w(L_\pm)}V_{L_\pm}$ and $\langle L_0\rangle = (-A^3)^{w(L_0)}V_{L_0}$ and divide through by $(-A^3)^{w(L_0)}$, using $w(L_+) = w(L_0)+1$ and $w(L_-) = w(L_0)-1$: $A(-A^3)V_{L_+} - A^{-1}(-A^3)^{-1}V_{L_-} = (A^2 - A^{-2})V_{L_0}$, i.e. $-A^4 V_{L_+} + A^{-4}V_{L_-} = (A^2 - A^{-2})V_{L_0}$. With $t = A^{-4}$ (so $A^4 = t^{-1}$ and $A^2 = t^{-1/2}$) this reads $-t^{-1}V_{L_+} + t\,V_{L_-} = (t^{-1/2} - t^{1/2})V_{L_0}$; multiplying by $-1$ gives the stated Jones skein relation $t^{-1}V_{L_+} - t\,V_{L_-} = (t^{1/2} - t^{-1/2})V_{L_0}$. $\square$`,
  },
]
