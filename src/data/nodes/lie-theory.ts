import type { MathNode } from '../types'

export const LIE_THEORY_NODES: MathNode[] = [
  // ── Groups, the exponential, and the correspondence ──────────────────────────
  {
    id: 'matrix-lie-group',
    label: 'Matrix Lie Group',
    title: 'Matrix Lie Group',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-group', 'matrix', 'group', 'closed-subgroup-theorem'],
    description: String.raw`Almost every Lie group one meets in practice is a group of matrices: rotations $SO(n)$, unitary transformations $U(n)$, the symplectic groups, and the ambient $GL_n$ itself. Restricting to such groups loses essentially nothing — every compact Lie group, and far more, embeds as one — yet it makes the abstract theory concrete and computable, because the group law is matrix multiplication and the bridge to the Lie algebra is the literal matrix exponential. The one subtlety is which subgroups of $GL_n$ are again Lie groups; the answer, supplied by Cartan's closed subgroup theorem, is exactly the *topologically closed* ones, which is why closedness is built into the definition.`,
    definition: String.raw`A **matrix Lie group** is a subgroup $G \le GL_n(\mathbb{R})$ (or $GL_n(\mathbb{C})$) that is **closed** as a subset of $GL_n$, where $GL_n$ is the group of invertible $n\times n$ matrices under multiplication, topologized as an open subset of the space of all matrices. By the **closed subgroup theorem**, such a $G$ is automatically a **Lie group**: it is an embedded smooth submanifold of $GL_n$ on which multiplication and inversion are smooth. Standard examples are $GL_n$, the special linear $SL_n = \{\det = 1\}$, the orthogonal $O(n) = \{A : A^\top A = I\}$ and its identity component $SO(n)$, the unitary $U(n) = \{A : A^*A = I\}$ and $SU(n)$, and the symplectic group $Sp(2n)$.`,
  },
  {
    id: 'closed-subgroup-theorem',
    label: 'Closed Subgroup Theorem',
    title: "Cartan's Closed Subgroup Theorem",
    kind: 'theorem',
    tags: ['Lie Theory'],
    dependencies: ['lie-group', 'smooth-manifold', 'diffeomorphism', 'exponential-map', 'bch-formula'],
    description: String.raw`Deciding whether a subset of a Lie group is itself a Lie group looks like it should require checking a smooth structure, but Cartan's theorem reduces it to a purely topological test: a subgroup that is *closed* is automatically a smooth, embedded Lie subgroup, with no compatibility to verify by hand. This is what guarantees that matrix groups cut out by closed conditions — determinant one, orthogonality, unitarity — are genuine Lie groups, and it is the reason one may define matrix Lie groups by closedness alone.`,
    statement: String.raw`Let $G$ be a Lie group and $H \le G$ a subgroup that is **closed** as a topological subspace. Then $H$ is an **embedded smooth submanifold** of $G$, and with that smooth structure $H$ is a **Lie group** (a closed Lie subgroup). Its Lie algebra is $\mathfrak{h} = \{\,X \in \mathfrak{g} : \exp(tX) \in H \text{ for all } t \in \mathbb{R}\,\}$, a Lie subalgebra of $\mathfrak{g}$.`,
    proof: String.raw`*Proof sketch — the hard step is named explicitly.* Set $\mathfrak{h} = \{\,X \in \mathfrak{g} : \exp(tX) \in H\ \forall t\,\}$. The crux is showing $\mathfrak{h}$ is a **linear subspace** of $\mathfrak{g}$ and that $\exp$ maps a neighbourhood of $0$ in $\mathfrak{h}$ onto a neighbourhood of $e$ in $H$. Closedness of $H$ is used as follows: if $h_n \to e$ in $H$ with $h_n \ne e$, write $h_n = \exp(X_n)$ with $X_n \to 0$ (legitimate since $\exp$ is a local **diffeomorphism** near $0$, the deep input below); passing to a subsequence so that $X_n/\lVert X_n\rVert$ converges to a unit vector $X$, a standard limiting argument shows $\exp(tX) = \lim \exp(\lfloor t/\lVert X_n\rVert\rfloor X_n) \in H$ for all $t$ because $H$ is **closed**, so $X \in \mathfrak{h}$. This forces $\mathfrak{h}$ to be a subspace and to capture all "directions into $H$" near $e$. One then verifies that $\exp|_{\mathfrak{h}}$ is a homeomorphism onto an $H$-neighbourhood of $e$, giving a chart at $e$; left-translating these charts by elements of $H$ produces an atlas making $H$ an embedded submanifold and a **Lie group**.

The genuine external input this proof rests on — the existence and smoothness of $\exp$ as a local diffeomorphism $\mathfrak{g} \to G$ near $0$, with $\exp$ a homeomorphism between a neighbourhood of $0$ and a neighbourhood of $e$ — is recorded as **exponential-map**; the bracket-closure of $\mathfrak{h}$ follows from the **Baker–Campbell–Hausdorff formula** (bch-formula), since products $\exp(tX)\exp(tY)\exp(-tX)\exp(-tY)$ stay in $H$ and have leading term $\exp(t^2[X,Y])$. $\square$`,
  },
  {
    id: 'exponential-map',
    label: 'Exponential Map',
    title: 'Exponential Map',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-group', 'lie-algebra', 'tangent-space', 'diffeomorphism'],
    description: String.raw`The exponential map is the canonical bridge from the linearized world of the Lie algebra back to the curved group. Each algebra element $X$ is the initial velocity of a unique "straightest" path through the identity — the integral curve of the left-invariant vector field it generates — and $\exp(X)$ is the point reached after unit time. For matrix groups this is the familiar power series $e^X = \sum X^k/k!$. Because its derivative at $0$ is the identity, $\exp$ is a local diffeomorphism near the origin: it furnishes canonical coordinates on the group near $e$ and turns the additive line $t \mapsto tX$ into the multiplicative one-parameter subgroup $t \mapsto \exp(tX)$.`,
    definition: String.raw`Let $G$ be a **Lie group** with Lie algebra $\mathfrak{g} = T_eG$. For $X \in \mathfrak{g}$ let $\gamma_X : \mathbb{R} \to G$ be the unique integral curve through $e$ of the left-invariant vector field determined by $X$ — equivalently the unique homomorphism $\mathbb{R} \to G$ with $\dot\gamma_X(0) = X$. The **exponential map** is
$$\exp : \mathfrak{g} \to G, \qquad \exp(X) := \gamma_X(1),$$
so that $\gamma_X(t) = \exp(tX)$. It is smooth, satisfies $\exp(0) = e$ and $d(\exp)_0 = \mathrm{id}_{\mathfrak{g}}$ (identifying $T_0\mathfrak{g} \cong \mathfrak{g} \cong T_eG$ via the **tangent space**), and is therefore a **diffeomorphism** from a neighbourhood of $0 \in \mathfrak{g}$ onto a neighbourhood of $e \in G$. For a **matrix Lie group**, $\exp(X) = \sum_{k \ge 0} X^k/k!$, the matrix exponential.`,
  },
  {
    id: 'one-parameter-subgroup',
    label: 'One-Parameter Subgroup',
    title: 'One-Parameter Subgroup',
    kind: 'proposition',
    tags: ['Lie Theory'],
    dependencies: ['exponential-map', 'group-homomorphism'],
    description: String.raw`The smooth homomorphisms from the additive real line into a Lie group are the group's "straight lines" through the identity — the trajectories of constant-velocity infinitesimal motion. The basic fact is that there are no others than the obvious ones: every such homomorphism is $t \mapsto \exp(tX)$ for a single algebra element $X$, namely its velocity at $0$, and distinct $X$ give distinct homomorphisms. This identifies the Lie algebra with the infinitesimal generators of continuous one-parameter symmetry, the starting point of Noether's theorem and of the whole infinitesimal method.`,
    statement: String.raw`Let $G$ be a Lie group with Lie algebra $\mathfrak{g}$. The smooth **homomorphisms** $\varphi : (\mathbb{R}, +) \to G$ — the **one-parameter subgroups** of $G$ — are exactly the maps $t \mapsto \exp(tX)$, and $X \mapsto (t \mapsto \exp(tX))$ is a bijection from $\mathfrak{g}$ onto the set of one-parameter subgroups, with $X = \dot\varphi(0)$.`,
    proof: String.raw`Given $X \in \mathfrak{g}$, the curve $t \mapsto \exp(tX)$ is a smooth homomorphism by construction in **exponential-map** ($\exp((s+t)X) = \exp(sX)\exp(tX)$, as both sides are the integral curve of the same left-invariant field with the same value at $0$), so each $X$ yields a one-parameter subgroup with velocity $\dot\varphi(0) = X$.

Conversely let $\varphi : \mathbb{R} \to G$ be any smooth **group homomorphism** and put $X := \dot\varphi(0) \in T_eG = \mathfrak{g}$. Differentiating the homomorphism identity $\varphi(s + t) = \varphi(s)\varphi(t) = L_{\varphi(s)}(\varphi(t))$ in $t$ at $t = 0$ gives $\dot\varphi(s) = (dL_{\varphi(s)})_e\,\dot\varphi(0) = (dL_{\varphi(s)})_e\,X$: that is, $\varphi$ is an integral curve of the left-invariant vector field determined by $X$, with $\varphi(0) = e$. By uniqueness of integral curves of a smooth vector field through a given point, $\varphi$ coincides with $\gamma_X$, i.e. $\varphi(t) = \exp(tX)$. Thus every one-parameter subgroup has the asserted form. The correspondence is injective because $X = \dot\varphi(0)$ is recovered from $\varphi$, and surjective by the first paragraph; hence it is a bijection. $\square$`,
  },
  {
    id: 'bch-formula',
    label: 'BCH Formula',
    title: 'Baker–Campbell–Hausdorff Formula',
    kind: 'theorem',
    tags: ['Lie Theory'],
    dependencies: ['exponential-map', 'lie-algebra'],
    description: String.raw`The exponential turns addition in the Lie algebra into multiplication in the group — but only when the elements commute. For non-commuting $X, Y$ the product $\exp(X)\exp(Y)$ is again an exponential, $\exp(Z)$, and the Baker–Campbell–Hausdorff formula expresses $Z$ entirely through iterated **brackets** of $X$ and $Y$. The remarkable content is that no information beyond the Lie bracket is needed: the group multiplication near the identity is completely determined by the algebra. This is the precise mechanism by which an abstract Lie algebra "integrates" to a local group, and the engine behind Lie's theorems.`,
    statement: String.raw`For $X, Y$ in a finite-dimensional Lie algebra, sufficiently small, there is $Z = Z(X,Y)$ with $\exp(X)\exp(Y) = \exp(Z)$ given by a universal series in iterated **Lie brackets**,
$$Z = X + Y + \tfrac12[X,Y] + \tfrac{1}{12}\bigl([X,[X,Y]] - [Y,[X,Y]]\bigr) - \cdots,$$
convergent for $\lVert X\rVert, \lVert Y\rVert$ small. In particular the group product near the identity is determined by the bracket alone.`,
    proof: String.raw`*Proof sketch (matrix case; the general statement reduces to it).* Work in a normed matrix algebra so $\exp$ and $\log(I + A) = \sum_{k\ge1}(-1)^{k-1}A^k/k$ converge near $I$, and let $Z = \log(\exp X\,\exp Y)$, a convergent power series in the non-commuting variables $X, Y$ with no constant term. Collecting the degree-$1$ and degree-$2$ terms of $\exp X\,\exp Y = I + (X+Y) + \tfrac12(X^2 + 2XY + Y^2) + \cdots$ and feeding them through the $\log$ series gives $Z = (X + Y) + \tfrac12(XY - YX) + \cdots = X + Y + \tfrac12[X,Y] + \cdots$, matching the stated low-order terms.

That *every* term is a Lie polynomial — expressible purely in iterated brackets, with no "stray" associative monomials — is the substantive claim, the **Dynkin form** of the theorem; it follows from the **Dynkin–Specht–Wever criterion** (a homogeneous associative polynomial of degree $n$ in the free algebra is a Lie element iff applying the operator $a_1\cdots a_n \mapsto [a_1,[a_2,[\dots,a_n]]]$ returns $n$ times itself), the deep external input here. Convergence for small $X, Y$ is then an estimate on the bracket series. The closed coefficient formula is Dynkin's:
$$Z = \sum_{n\ge1}\frac{(-1)^{n-1}}{n}\!\!\sum_{\substack{r_i + s_i > 0}}\frac{[X^{r_1}Y^{s_1}\cdots X^{r_n}Y^{s_n}]}{\bigl(\sum_i (r_i+s_i)\bigr)\,\prod_i r_i!\,s_i!},$$
with $[X^{r_1}Y^{s_1}\cdots]$ the left-nested bracket of that word. $\square$`,
  },
  {
    id: 'lie-group-lie-algebra-correspondence',
    label: 'Lie Correspondence',
    title: 'Lie Group–Lie Algebra Correspondence',
    kind: 'theorem',
    tags: ['Lie Theory'],
    dependencies: ['lie-group', 'lie-algebra', 'exponential-map', 'bch-formula', 'group-homomorphism', 'one-parameter-subgroup'],
    description: String.raw`The passage from a Lie group to its Lie algebra is nearly a perfect dictionary translating curved global group theory into flat linear algebra. Differentiating a group homomorphism at the identity always yields a Lie algebra homomorphism; and when the source group is connected and simply connected, this differentiation is a *bijection* — every algebra map integrates back to a unique group map. Pushed to its limit (Lie's third theorem, via Ado's theorem), the dictionary becomes an equivalence: every finite-dimensional real Lie algebra is the algebra of a unique connected, simply connected Lie group. So a Lie algebra determines a connected group up to covering, and classifying connected Lie groups reduces to classifying Lie algebras.`,
    statement: String.raw`Let $G, H$ be Lie groups with Lie algebras $\mathfrak{g}, \mathfrak{h}$. **(i)** Every smooth homomorphism $\phi : G \to H$ has differential $d\phi_e : \mathfrak{g} \to \mathfrak{h}$ a Lie algebra homomorphism, and $\phi(\exp X) = \exp(d\phi_e\,X)$. **(ii)** If $G$ is **connected and simply connected**, then $\phi \mapsto d\phi_e$ is a bijection from group homomorphisms $G \to H$ onto Lie algebra homomorphisms $\mathfrak{g} \to \mathfrak{h}$. **(iii)** (Lie's third theorem.) Every finite-dimensional real Lie algebra is $\cong \mathrm{Lie}(G)$ for a unique connected, simply connected Lie group $G$; hence $\mathfrak{g}$ determines a connected $G$ up to covering.`,
    proof: String.raw`**(i)** Let $\phi : G \to H$ be a smooth homomorphism. For $X \in \mathfrak{g}$ the curve $t \mapsto \phi(\exp tX)$ is a smooth **homomorphism** $\mathbb{R} \to H$, hence by **one-parameter-subgroup** equals $t \mapsto \exp(tY)$ for $Y = \tfrac{d}{dt}\big|_0\phi(\exp tX) = d\phi_e\,X$; this is the naturality identity $\phi\circ\exp = \exp\circ\, d\phi_e$. That $d\phi_e$ respects brackets follows from the **bch-formula**: $\phi$ carries $\exp(tX)\exp(tY)\exp(-tX)\exp(-tY)$, whose second-order term is $\exp(t^2[X,Y])$, to the corresponding product in $H$, whose second-order term is $\exp(t^2[d\phi_e X, d\phi_e Y])$; matching gives $d\phi_e[X,Y] = [d\phi_e X, d\phi_e Y]$.

**(ii)** *Local-to-global, where simple connectedness enters.* Given a Lie algebra homomorphism $\psi : \mathfrak{g} \to \mathfrak{h}$, its graph $\mathfrak{k} = \{(X, \psi X)\} \subseteq \mathfrak{g}\oplus\mathfrak{h} = \mathrm{Lie}(G\times H)$ is a subalgebra. By the **Lie subgroup–subalgebra correspondence** — integrate the left-invariant distribution on $G\times H$ spanned by $\mathfrak{k}$, which is involutive since $\mathfrak{k}$ is closed under the bracket, and take the leaf through $e$ — there is a connected *immersed* Lie subgroup $K \le G\times H$ with $\mathrm{Lie}(K) = \mathfrak{k}$. (This is a consequence of the **Frobenius integrability theorem**, the genuine external input here; it is *not* the closed subgroup theorem — the graph of $\psi$ need not be closed, e.g. an irrational-slope line in a torus, so $K$ is in general only immersed.) The first projection $\pi_1 : K \to G$ has differential the isomorphism $(X,\psi X)\mapsto X$, so it is a covering homomorphism. Because $G$ is **simply connected**, this covering is trivial: $\pi_1$ is an isomorphism, and $\phi := \pi_2\circ\pi_1^{-1} : G \to H$ is a smooth homomorphism with $d\phi_e = \psi$. Uniqueness holds since a homomorphism out of a **connected** group is determined by its values on $\exp(\mathfrak{g})$, which generates $G$, and those are fixed by $\phi\circ\exp = \exp\circ\,d\phi_e$. Thus $\phi\mapsto d\phi_e$ is a bijection.

**(iii)** *Proof sketch; deep input named.* The non-trivial direction — that *every* finite-dimensional real Lie algebra $\mathfrak{g}$ arises from some Lie group — is **Lie's third theorem**. Its standard proof invokes **Ado's theorem**: every finite-dimensional Lie algebra admits a faithful finite-dimensional representation $\mathfrak{g} \hookrightarrow \mathfrak{gl}(V)$. Realizing $\mathfrak{g}$ as a matrix subalgebra, the connected matrix subgroup it generates is a Lie group with Lie algebra $\mathfrak{g}$; passing to its universal cover yields a connected, simply connected $G$ with $\mathrm{Lie}(G) \cong \mathfrak{g}$, unique by part (ii). Ado's theorem is the genuine external ingredient beyond this graph. $\square$`,
  },

  // ── Representations and the adjoint ───────────────────────────────────────────
  {
    id: 'lie-algebra-representation',
    label: 'Lie Algebra Representation',
    title: 'Lie Algebra Representation',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-algebra', 'group-representation', 'lie-group-lie-algebra-correspondence'],
    description: String.raw`Representing a Lie algebra means realizing its abstract bracket as the commutator of concrete linear operators, so that the algebra acts on a vector space. This linearizes the representation theory of the corresponding group: differentiating a group representation gives an algebra representation, and — for a simply connected group, by the Lie correspondence — every algebra representation integrates back. The study of how $\mathfrak{g}$ can act thus replaces the study of how $G$ can act, trading geometry for the linear algebra of $\mathfrak{g}$-modules, where tools like weights and highest-weight theory become available.`,
    definition: String.raw`A **representation** of a Lie algebra $\mathfrak{g}$ on a vector space $V$ is a Lie algebra homomorphism $\rho : \mathfrak{g} \to \mathfrak{gl}(V)$ into the endomorphisms of $V$ under the commutator bracket — i.e. a linear map with
$$\rho([X, Y]) = \rho(X)\rho(Y) - \rho(Y)\rho(X)\qquad\text{for all } X, Y \in \mathfrak{g}.$$
Equivalently $V$ is a **$\mathfrak{g}$-module**. Differentiating a **group representation** $\pi : G \to GL(V)$ at $e$ gives the algebra representation $d\pi_e : \mathfrak{g} \to \mathfrak{gl}(V)$; by the **Lie correspondence** this differentiation is a bijection between representations of $G$ and of $\mathfrak{g}$ whenever $G$ is connected and simply connected.`,
  },
  {
    id: 'adjoint-representation',
    label: 'Adjoint Representation',
    title: 'Adjoint Representation',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-algebra', 'lie-algebra-representation', 'lie-group', 'exponential-map'],
    description: String.raw`Every Lie group acts on itself by conjugation; fixing the identity and differentiating turns this into a canonical linear action of the group on its own Lie algebra, the adjoint representation $\mathrm{Ad}$. Differentiating once more gives a representation of the algebra on itself, $\mathrm{ad}_X = [X, \cdot]$ — the bracket viewed as a linear operator. This is the one representation every Lie group and Lie algebra carries with no extra choices. It is the source of the Killing form, the precise sense in which "conjugation in the group is exponentiated bracketing," and the foundation of structure theory.`,
    definition: String.raw`For a Lie group $G$ let $C_g(x) = gxg^{-1}$ be conjugation; its differential at $e$ is $\mathrm{Ad}_g := d(C_g)_e \in GL(\mathfrak{g})$, and $\mathrm{Ad} : G \to GL(\mathfrak{g})$ is the **adjoint representation** of $G$ (a **representation** as $\mathrm{Ad}_{gh} = \mathrm{Ad}_g\mathrm{Ad}_h$). Its differential is the **adjoint representation of the Lie algebra**,
$$\mathrm{ad} : \mathfrak{g} \to \mathfrak{gl}(\mathfrak{g}), \qquad \mathrm{ad}_X(Y) = [X, Y],$$
a **Lie algebra representation** (the Jacobi identity is exactly the statement $\mathrm{ad}_{[X,Y]} = \mathrm{ad}_X\mathrm{ad}_Y - \mathrm{ad}_Y\mathrm{ad}_X$). The two are linked by $\mathrm{Ad}_{\exp X} = e^{\mathrm{ad}_X}$ via the **exponential-map**.`,
  },
  {
    id: 'killing-form',
    label: 'Killing Form',
    title: 'Killing Form',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-algebra', 'adjoint-representation'],
    description: String.raw`Out of the adjoint representation alone — with no metric or coordinates chosen — one can manufacture a canonical symmetric bilinear form on a Lie algebra: the trace of the product of two adjoint operators. This Killing form is invariant under every automorphism, so it is an intrinsic invariant of the algebra. Its great utility is diagnostic: by Cartan's criterion the algebra is semisimple exactly when the form is nondegenerate and solvable when the form vanishes on the derived algebra, while over $\mathbb{R}$ the form's signature distinguishes compact real forms from noncompact ones. It is the central computational instrument of structure theory.`,
    definition: String.raw`The **Killing form** of a finite-dimensional Lie algebra $\mathfrak{g}$ (over any field) is the symmetric bilinear form
$$B(X, Y) = \operatorname{tr}\bigl(\mathrm{ad}_X\,\mathrm{ad}_Y\bigr),$$
where $\mathrm{ad}$ is the **adjoint representation** and the trace is taken on $\mathfrak{g}$. It is symmetric (as $\operatorname{tr}(AB) = \operatorname{tr}(BA)$) and **invariant**: $B([X,Y],Z) = B(X,[Y,Z])$, equivalently $B(\mathrm{ad}_X\,Y, Z) + B(Y, \mathrm{ad}_X\,Z) = 0$, so $B$ is preserved by every automorphism of $\mathfrak{g}$ and is $\mathrm{Ad}$-invariant. Over a field of **characteristic $0$**, **Cartan's criterion** reads off solvability and semisimplicity from its degeneracy: $\mathfrak{g}$ is solvable iff $B(\mathfrak{g}, [\mathfrak{g},\mathfrak{g}]) = 0$, and $\mathfrak{g}$ is semisimple iff $B$ is nondegenerate. (Both equivalences fail in characteristic $p > 0$: e.g. $\mathfrak{sl}_2$ over a field of characteristic $2$ has identically zero, hence degenerate, Killing form yet is not solvable.)`,
  },
  {
    id: 'semisimple-lie-algebra',
    label: 'Semisimple Lie Algebra',
    title: 'Semisimple Lie Algebra',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['lie-algebra', 'killing-form'],
    description: String.raw`Semisimple Lie algebras are the rigid, fully understood core of the theory — the analogue of the building blocks left after one quotients out all "solvable" softness. They are precisely the direct sums of simple algebras (nonabelian with no proper ideals), equivalently the algebras with no nonzero solvable ideal, equivalently — by Cartan's criterion — the ones whose Killing form is nondegenerate. Their representations are completely reducible (Weyl's theorem), and over $\mathbb{C}$ they are classified with no remaining choices by their root systems and Dynkin diagrams, making them the most tractable infinite family of objects in all of structure theory.`,
    definition: String.raw`A finite-dimensional Lie algebra $\mathfrak{g}$ is **simple** if it is nonabelian and has no ideals other than $0$ and $\mathfrak{g}$. It is **semisimple** if it is a direct sum of simple ideals, $\mathfrak{g} = \mathfrak{g}_1 \oplus \cdots \oplus \mathfrak{g}_k$ — equivalently if it has no nonzero solvable ideal, equivalently (**Cartan's criterion**) if its **Killing form** $B$ is nondegenerate. The **radical** $\mathrm{rad}(\mathfrak{g})$ is the largest solvable ideal, and $\mathfrak{g}$ is semisimple iff $\mathrm{rad}(\mathfrak{g}) = 0$; in general $\mathfrak{g}/\mathrm{rad}(\mathfrak{g})$ is semisimple (Levi decomposition).`,
  },
  {
    id: 'cartan-subalgebra',
    label: 'Cartan Subalgebra',
    title: 'Cartan Subalgebra',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['semisimple-lie-algebra', 'adjoint-representation'],
    description: String.raw`To analyze a semisimple Lie algebra one diagonalizes it against a maximal commuting family of simultaneously diagonalizable operators — the algebra's analogue of choosing axes. A Cartan subalgebra is exactly such a family: a maximal abelian subalgebra all of whose adjoint actions are semisimple (diagonalizable). Restricting the adjoint action to it decomposes the whole algebra into simultaneous eigenspaces, the root spaces, whose nonzero eigenvalues are the roots. Any two Cartan subalgebras are conjugate by an automorphism, so the resulting combinatorics is independent of the choice — which is what makes the root system a genuine invariant of $\mathfrak{g}$.`,
    definition: String.raw`Let $\mathfrak{g}$ be a complex **semisimple Lie algebra**. A **Cartan subalgebra** $\mathfrak{h} \subseteq \mathfrak{g}$ is a maximal **toral** subalgebra: an abelian subalgebra such that every $\mathrm{ad}_H$ (for $H \in \mathfrak{h}$) is semisimple (diagonalizable), and maximal with these properties. Since the operators $\{\mathrm{ad}_H : H \in \mathfrak{h}\}$ commute and are each diagonalizable, they are simultaneously diagonalizable, giving the **root space decomposition**
$$\mathfrak{g} = \mathfrak{h} \oplus \bigoplus_{\alpha \in \Phi}\mathfrak{g}_\alpha, \qquad \mathfrak{g}_\alpha = \{\,X : [H, X] = \alpha(H)\,X\ \forall H \in \mathfrak{h}\,\},$$
where the **roots** $\Phi \subseteq \mathfrak{h}^* \setminus \{0\}$ are the nonzero simultaneous eigenvalues. All Cartan subalgebras of $\mathfrak{g}$ are conjugate under $\mathrm{Aut}(\mathfrak{g})$, and their common dimension is the **rank** of $\mathfrak{g}$.`,
  },
  {
    id: 'weyl-group',
    label: 'Weyl Group',
    title: 'Weyl Group',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['cartan-subalgebra', 'killing-form', 'semisimple-lie-algebra', 'lie-group'],
    description: String.raw`The roots of a semisimple Lie algebra are not scattered arbitrarily: they are highly symmetric, invariant under a finite group of reflections generated by the roots themselves. This Weyl group is the symmetry group of the root system, a finite reflection group acting on the Cartan subalgebra. It governs the entire combinatorics that follows — it permutes the chambers that define positivity of roots, acts on weights, and appears as the alternating sum in the Weyl character formula. For a compact group it is realized concretely as $N(T)/T$, the normalizer of a maximal torus modulo the torus.`,
    definition: String.raw`Let $\mathfrak{g}$ be a complex **semisimple Lie algebra** with **Cartan subalgebra** $\mathfrak{h}$, root system $\Phi \subseteq \mathfrak{h}^*$, and the inner product $(\cdot,\cdot)$ on the real span $E$ of $\Phi$ induced by the (nondegenerate) **Killing form**. For each root $\alpha$ let $s_\alpha$ be the **reflection** in the hyperplane $\alpha^\perp$,
$$s_\alpha(\lambda) = \lambda - \frac{2(\lambda, \alpha)}{(\alpha, \alpha)}\,\alpha = \lambda - \langle\lambda,\alpha^\vee\rangle\,\alpha.$$
The **Weyl group** $W$ is the (finite) subgroup of the orthogonal group of $E$ generated by all $s_\alpha$, $\alpha \in \Phi$. It permutes $\Phi$, acts simply transitively on the **Weyl chambers** (the connected components of $E \setminus \bigcup_\alpha \alpha^\perp$), and is generated by the reflections in the **simple roots**. For a compact connected Lie group with **maximal torus** $T$, the Weyl group is realized as $N_G(T)/T$.`,
  },
  {
    id: 'root-system',
    label: 'Root System',
    title: 'Root System',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['semisimple-lie-algebra', 'cartan-subalgebra', 'weyl-group'],
    description: String.raw`A root system distills the entire structure of a semisimple Lie algebra into a finite configuration of vectors in Euclidean space. Taking the nonzero eigenvalues (roots) of a Cartan subalgebra acting on the algebra, one finds a remarkably rigid pattern: the roots span the space, come in $\pm$ pairs, and are closed under the reflections they generate, with the reflection coefficients always integers. This rigidity is so strong that the algebra can be reconstructed from the root system alone (Serre's relations), reducing the classification of complex semisimple Lie algebras to the purely combinatorial-geometric classification of root systems.`,
    definition: String.raw`An (abstract, reduced) **root system** in a Euclidean space $E$ (with inner product $(\cdot,\cdot)$) is a finite set $\Phi \subseteq E \setminus \{0\}$ such that: (R1) $\Phi$ spans $E$; (R2) for $\alpha \in \Phi$, the only multiples of $\alpha$ in $\Phi$ are $\pm\alpha$; (R3) $\Phi$ is invariant under each reflection $s_\alpha$, so the **Weyl group** $W = \langle s_\alpha\rangle$ permutes $\Phi$; (R4) the **integrality** (Cartan integer) condition $\langle\beta, \alpha^\vee\rangle = \dfrac{2(\beta,\alpha)}{(\alpha,\alpha)} \in \mathbb{Z}$ for all $\alpha, \beta \in \Phi$. A choice of **positive roots** $\Phi^+$ (those on the positive side of a generic hyperplane) singles out the **simple roots** — the positive roots not expressible as a sum of two positive roots — which form a basis of $E$. The roots of a complex semisimple $\mathfrak{g}$ relative to a **Cartan subalgebra** form such a system, and it is independent of the Cartan subalgebra chosen up to isomorphism.`,
  },
  {
    id: 'dynkin-diagram',
    label: 'Dynkin Diagram',
    title: 'Classification by Dynkin Diagrams',
    kind: 'theorem',
    tags: ['Lie Theory'],
    dependencies: ['root-system', 'semisimple-lie-algebra'],
    description: String.raw`The angles and length ratios among the simple roots of a root system can take only a few values, so the whole system is encoded in a small decorated graph — the Dynkin diagram, one node per simple root, with the number of edges fixed by the angle and an arrow recording which root is shorter. The astonishing payoff is a complete and finite classification: the connected diagrams are exactly four infinite families $A_n, B_n, C_n, D_n$ and five exceptions $E_6, E_7, E_8, F_4, G_2$. Combined with the reconstruction of a Lie algebra from its root system, this list is the classification of simple Lie algebras over $\mathbb{C}$ — one of the landmark theorems of mathematics.`,
    statement: String.raw`Encode a root system by its **Dynkin diagram**: a vertex for each simple root $\alpha_i$, with $\alpha_i, \alpha_j$ joined by $\langle\alpha_i,\alpha_j^\vee\rangle\langle\alpha_j,\alpha_i^\vee\rangle \in \{0,1,2,3\}$ edges, and an arrow pointing from the longer to the shorter root when they differ in length. Then the connected Dynkin diagrams — equivalently the irreducible root systems, equivalently (via the root system) the **simple Lie algebras over $\mathbb{C}$** — are exactly the members of the four classical families $A_n\,(n\ge1),\,B_n\,(n\ge2),\,C_n\,(n\ge3),\,D_n\,(n\ge4)$ and the five exceptional diagrams $E_6, E_7, E_8, F_4, G_2$.`,
    proof: String.raw`*Proof sketch — the combinatorial classification, with the algebra-to-combinatorics bridge named.* Fix simple roots $\alpha_1,\dots,\alpha_n$. The integrality axiom (R4) forces the products $n_{ij} := \langle\alpha_i,\alpha_j^\vee\rangle\langle\alpha_j,\alpha_i^\vee\rangle = 4\cos^2\theta_{ij}$ into $\{0,1,2,3\}$ for $i\ne j$ (since $0 \le \cos^2\theta < 1$ and the product is a nonnegative integer below $4$), determining the edge count. The simple roots are **linearly independent** and pairwise obtuse, so the matrix $(\,(\alpha_i,\alpha_j)\,)$ is positive definite. This positivity is highly restrictive and is checked by elementary linear algebra on the unit vectors $e_i = \alpha_i/\lVert\alpha_i\rVert$: any subdiagram is admissible, no diagram contains a cycle, no vertex has degree $> 3$, chains of double/triple bonds and branch nodes are tightly constrained, and the only configurations surviving all these inequalities are the **Coxeter–Dynkin diagrams** $A_n, B_n, C_n, D_n, E_6, E_7, E_8, F_4, G_2$. (Each surviving candidate is realized by an actual root system, so the list is exact, not merely an upper bound.)

The bridge from algebra to this combinatorics is the substantive external input: for a complex **semisimple Lie algebra** the structure theory of the **root-system** shows the roots form an abstract root system, and **Serre's theorem** reconstructs $\mathfrak{g}$ up to isomorphism from the Cartan matrix $(\langle\alpha_i,\alpha_j^\vee\rangle)$ — i.e. from the Dynkin diagram — via explicit generators and relations. Hence isomorphism classes of simple complex Lie algebras correspond bijectively to connected Dynkin diagrams, and the combinatorial classification above completes the list. $\square$`,
  },
  {
    id: 'highest-weight-theorem',
    label: 'Highest Weight Theorem',
    title: 'Theorem of the Highest Weight',
    kind: 'theorem',
    tags: ['Lie Theory'],
    dependencies: ['lie-algebra-representation', 'root-system', 'weyl-group', 'cartan-subalgebra', 'semisimple-lie-algebra'],
    description: String.raw`Just as a root system organizes a semisimple Lie algebra itself, the weights of a representation organize its module structure: every finite-dimensional representation decomposes into simultaneous eigenspaces for the Cartan subalgebra. The theorem of the highest weight says that the irreducible representations are classified, one apiece, by their single "highest" weight, and that the highest weights occurring are exactly the dominant integral ones. This converts the representation theory of a complex semisimple Lie algebra into pure combinatorics in the weight lattice, with the Weyl character formula then computing every character — and every dimension — explicitly.`,
    statement: String.raw`Let $\mathfrak{g}$ be a complex **semisimple Lie algebra** with **Cartan subalgebra** $\mathfrak{h}$, root system $\Phi$, positive roots $\Phi^+$, and **Weyl group** $W$. A weight $\lambda \in \mathfrak{h}^*$ is **dominant integral** if $\langle\lambda, \alpha^\vee\rangle \in \mathbb{Z}_{\ge 0}$ for every simple root $\alpha$. Then $\lambda \mapsto L(\lambda)$ is a bijection from dominant integral weights onto isomorphism classes of finite-dimensional irreducible **representations** of $\mathfrak{g}$: each $L(\lambda)$ is irreducible with highest weight $\lambda$, and every finite-dimensional irreducible arises this way exactly once. The character is given by the **Weyl character formula**
$$\operatorname{ch} L(\lambda) = \frac{\sum_{w \in W}(-1)^{\ell(w)} e^{w(\lambda + \rho)}}{\sum_{w \in W}(-1)^{\ell(w)} e^{w\rho}}, \qquad \rho = \tfrac12\!\sum_{\alpha\in\Phi^+}\!\alpha.$$`,
    proof: String.raw`*Proof sketch; the deep step (existence of the integrable module) is named.* Fix a triangular decomposition $\mathfrak{g} = \mathfrak{n}^- \oplus \mathfrak{h} \oplus \mathfrak{n}^+$ from the **root-system** ($\mathfrak{n}^\pm = \bigoplus_{\alpha\in\Phi^+}\mathfrak{g}_{\pm\alpha}$).

*Uniqueness / highest weight exists.* In any finite-dimensional representation $V$, the commuting semisimple operators $\rho(\mathfrak{h})$ are simultaneously diagonalizable, giving a **weight decomposition** $V = \bigoplus_\mu V_\mu$ with finitely many weights $\mu \in \mathfrak{h}^*$. Choose $\mu$ maximal in the dominance order; a nonzero $v \in V_\mu$ is a **highest weight vector**, killed by $\mathfrak{n}^+$. If $V$ is irreducible it is generated by $v$ under $\mathfrak{n}^-$, which forces the highest weight $\lambda$ to be unique and the highest weight space one-dimensional, so $\lambda$ determines $V$ up to isomorphism — distinct irreducibles have distinct highest weights. Applying the $\mathfrak{sl}_2$-triple attached to each simple root $\alpha$ to $v$ and using finite-dimensionality of that $\mathfrak{sl}_2$-subrepresentation forces $\langle\lambda,\alpha^\vee\rangle \in \mathbb{Z}_{\ge0}$: $\lambda$ is **dominant integral**.

*Existence.* Conversely, for each dominant integral $\lambda$ one builds the **Verma module** $M(\lambda) = U(\mathfrak{g})\otimes_{U(\mathfrak{b})}\mathbb{C}_\lambda$ (universal highest-weight module), whose unique irreducible quotient $L(\lambda)$ has highest weight $\lambda$. That $L(\lambda)$ is **finite-dimensional** when $\lambda$ is dominant integral is the substantive step, proved by showing the set of weights is $W$-invariant and bounded — this uses the **Weyl group** symmetry and integrability under each root $\mathfrak{sl}_2$; it is the content typically attributed to the **theorem of the highest weight** and to Weyl's complete-reducibility theorem. The character identity is the **Weyl character formula**, proved either via the Weyl integration formula on the compact real form or algebraically through the Bernstein–Gelfand–Gelfand resolution; setting $\lambda$ and evaluating at $0$ recovers the **Weyl dimension formula** $\dim L(\lambda) = \prod_{\alpha\in\Phi^+}\frac{(\lambda+\rho,\alpha)}{(\rho,\alpha)}$. These named results are the precise inputs beyond the present graph. $\square$`,
  },

  // ── Compact groups: maximal torus ────────────────────────────────────────────
  {
    id: 'maximal-torus',
    label: 'Maximal Torus',
    title: 'Maximal Torus',
    kind: 'definition',
    tags: ['Lie Theory'],
    dependencies: ['matrix-lie-group', 'lie-group', 'weyl-group'],
    description: String.raw`For a compact connected Lie group the abelian subgroups are products of circles, and a maximal one — a maximal torus — plays the organizing role that diagonal matrices play for $U(n)$. Two facts make it decisive: every element of the group is conjugate into the torus (the maximal torus theorem), and all maximal tori are conjugate, so its dimension, the rank, is well defined. Consequently a representation is pinned down by its restriction to the torus, i.e. by its weights together with the Weyl group action — reducing the representation theory of the whole group to the elementary representation theory of a torus plus finite combinatorics.`,
    definition: String.raw`A **torus** is a Lie group isomorphic to $(S^1)^k$, equivalently a compact connected abelian Lie group. A **maximal torus** $T$ of a compact connected Lie group $G$ is a torus subgroup not properly contained in any larger torus — equivalently a maximal connected abelian subgroup. Its dimension $k = \dim T$ is the **rank** of $G$. The basic facts: every element of $G$ lies in some maximal torus, all maximal tori are conjugate in $G$, and the **Weyl group** $W = N_G(T)/T$ acts on $T$ so that conjugacy classes of $G$ correspond to $W$-orbits on $T$. Hence a representation of $G$ is determined by its restriction to $T$ — its multiset of **weights**, a $W$-invariant subset of the character lattice $\widehat{T} = \mathrm{Hom}(T, S^1)$.`,
  },
]
