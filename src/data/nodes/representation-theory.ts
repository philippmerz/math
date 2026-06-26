import type { MathNode } from '../types'

export const REPRESENTATION_THEORY_NODES: MathNode[] = [
  {
    id: 'group-representation',
    label: 'Group Representation',
    title: 'Group Representation',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group', 'vector-space', 'linear-map', 'group-homomorphism', 'field'],
    description: String.raw`A representation turns an abstract group into concrete linear symmetries: each group element acts as an invertible linear map on a vector space, and the group law becomes composition of maps. This lets the full machinery of linear algebra — eigenvalues, traces, direct sums — probe a group whose own elements may have no numerical content. The same group can act in many spaces, and the catalogue of its representations is itself a rich invariant of the group.`,
    definition: String.raw`Let $G$ be a group and $V$ a vector space over a field $F$, with $GL(V)$ the group of invertible $F$-linear maps $V \to V$. A **representation** of $G$ on $V$ is a group homomorphism
$$\rho : G \to GL(V), \qquad \rho(gh) = \rho(g)\,\rho(h), \quad \rho(e) = \mathrm{id}_V.$$
Equivalently it is a linear **action** $G \times V \to V$, $(g, v) \mapsto g\cdot v := \rho(g)v$, with each $g\cdot(-)$ linear; one then calls $V$ a **$G$-module**. Its **degree** (or dimension) is $\dim_F V$. A linear subspace $W \subseteq V$ is a **subrepresentation** ($G$-invariant) if $\rho(g)W \subseteq W$ for all $g \in G$, and a **$G$-equivariant map** (intertwiner) $T : V \to V'$ between representations $\rho, \rho'$ is a linear map with $T\rho(g) = \rho'(g)T$ for all $g$.`,
  },
  {
    id: 'group-algebra',
    label: 'Group Algebra',
    title: 'Group Algebra',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-representation', 'ring', 'module', 'field'],
    description: String.raw`The group algebra packages a finite group together with its ambient field into a single ring whose elements are formal $F$-linear combinations of group elements. Its great virtue is that a representation of $G$ is exactly a module over this one ring: every notion of representation theory — subrepresentation, direct sum, irreducibility, equivariant map — translates verbatim into submodule, direct sum, simple module, and module homomorphism, so the whole subject becomes the module theory of a single associative algebra.`,
    definition: String.raw`For a finite group $G$ and a field $F$, the **group algebra** $F[G]$ is the $F$-vector space with basis $\{e_g : g \in G\}$ indexed by $G$, made into an $F$-algebra by extending the group law bilinearly:
$$\Bigl(\sum_{g} a_g e_g\Bigr)\Bigl(\sum_{h} b_h e_h\Bigr) = \sum_{g,h} a_g b_h\, e_{gh} = \sum_{k}\Bigl(\sum_{g} a_g\, b_{g^{-1}k}\Bigr) e_k.$$
It is an associative unital ring with multiplicative identity $e_e$ ($e$ the group identity).`,
    proof: String.raw`**$F[G]$ is an associative unital ring, and representations of $G$ over $F$ are the same as $F[G]$-modules.** Associativity of the product reduces, by bilinearity, to associativity on basis elements: $(e_g e_h)e_k = e_{(gh)k} = e_{g(hk)} = e_g(e_h e_k)$, which holds because the group operation is associative. The element $e_e$ is a two-sided identity since $e_e e_g = e_{eg} = e_g = e_{ge} = e_g e_e$. Distributivity over addition is built into the bilinear extension. Thus $F[G]$ is an associative unital **ring** (indeed an $F$-algebra).

Now given a **representation** $\rho : G \to GL(V)$, define a scalar action of $F[G]$ on $V$ by $\bigl(\sum_g a_g e_g\bigr)\cdot v := \sum_g a_g\,\rho(g)v$. Each $\rho(g)$ is $F$-linear and $\rho$ is a homomorphism, so $(e_g e_h)\cdot v = e_{gh}\cdot v = \rho(gh)v = \rho(g)\rho(h)v = e_g\cdot(e_h\cdot v)$ and $e_e\cdot v = v$; extending bilinearly makes $V$ a **module** over $F[G]$. Conversely, a left $F[G]$-module $V$ is in particular an $F$-vector space (restrict scalars along $F \hookrightarrow F[G]$, $a \mapsto a e_e$), and for each $g$ the map $\rho(g) : v \mapsto e_g\cdot v$ is $F$-linear with inverse $\rho(g^{-1}) = e_{g^{-1}}\cdot(-)$ (since $e_g e_{g^{-1}} = e_e$ acts as the identity), so $\rho(g) \in GL(V)$, and $\rho(g)\rho(h) = \rho(gh)$ because $e_g e_h = e_{gh}$ — a representation. These constructions are mutually inverse, so the two notions coincide. $\square$`,
  },
  {
    id: 'irreducible-representation',
    label: 'Irreducible Representation',
    title: 'Irreducible Representation',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-representation', 'subspace'],
    description: String.raw`Irreducible representations are the indecomposable building blocks: a representation is irreducible when it cannot be cut down to a smaller invariant piece, so it carries no nontrivial internal structure for the group to respect. The strategy of the whole theory is then twofold — classify the irreducibles of a given group, and describe how an arbitrary representation is assembled from them. For finite groups in characteristic zero the second half is automatic by Maschke's theorem, which is why irreducibles are so central.`,
    definition: String.raw`A representation $\rho : G \to GL(V)$ with $V \neq 0$ is **irreducible** (or **simple**) if its only $G$-invariant subspaces are $0$ and $V$ — that is, it has no subrepresentation $W$ with $0 \subsetneq W \subsetneq V$. A nonzero representation that is not irreducible is **reducible**. A representation is **completely reducible** (semisimple) if it is a direct sum of irreducible subrepresentations.`,
  },
  {
    id: 'conjugacy-class',
    label: 'Conjugacy Class',
    title: 'Conjugacy Class',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group', 'equivalence-relation'],
    description: String.raw`Two group elements are conjugate when one is a relabelling of the other by an inner symmetry $x \mapsto gxg^{-1}$ — they "do the same thing" from different vantage points (in a symmetric group, conjugate permutations share the same cycle type). Conjugacy partitions the group into classes, and these classes are exactly the level sets on which every character is constant, which is why they index the columns of a character table.`,
    definition: String.raw`On a group $G$ define $a \sim b$ iff $b = g a g^{-1}$ for some $g \in G$. This is an equivalence relation; its classes are the **conjugacy classes**, the class of $a$ being
$$\mathrm{Cl}(a) = \{\, g a g^{-1} : g \in G \,\}.$$
The number of conjugacy classes of a finite group is denoted $r$.`,
    proof: String.raw`**$\sim$ is an equivalence relation, so the conjugacy classes partition $G$.** Reflexivity: $a = e a e^{-1}$. Symmetry: if $b = gag^{-1}$ then $a = g^{-1}b(g^{-1})^{-1}$, so $b \sim a$. Transitivity: if $b = gag^{-1}$ and $c = hbh^{-1}$ then $c = (hg)a(hg)^{-1}$, so $a \sim c$. Hence $\sim$ is an **equivalence relation**, and its equivalence classes — the conjugacy classes — partition $G$ into disjoint blocks. $\square$`,
  },
  {
    id: 'schur-lemma',
    label: "Schur's Lemma",
    title: "Schur's Lemma",
    kind: 'theorem',
    tags: ['Representation Theory'],
    dependencies: ['irreducible-representation', 'kernel-image', 'eigenvalue-eigenvector'],
    description: String.raw`Schur's lemma pins down how rigid an irreducible representation is: there is almost no room for a linear map to commute with the action. Between two irreducibles, an equivariant map must be zero or an isomorphism; from an irreducible to itself over an algebraically closed field, it must be a scalar. This minimality of the equivariant endomorphisms is the lever behind character orthogonality, the decomposition of the group algebra, and the abelian-group fact that all complex irreducibles are one-dimensional.`,
    statement: String.raw`Let $V, V'$ be irreducible representations of $G$ over a field $F$ and $T : V \to V'$ a $G$-equivariant linear map. Then $T = 0$ or $T$ is an isomorphism. Consequently $\operatorname{Hom}_G(V, V')$ is $0$ when $V \not\cong V'$. If moreover $F$ is algebraically closed and $\dim_F V < \infty$, then every $G$-equivariant $T : V \to V$ is a scalar multiple of the identity, $T = \lambda\,\mathrm{id}_V$; in particular $\operatorname{End}_G(V) = F\cdot\mathrm{id}_V$.`,
    proof: String.raw`**First part.** Let $T : V \to V'$ be equivariant, so $T\rho(g) = \rho'(g)T$ for all $g$. Then $\ker T$ is $G$-invariant: if $v \in \ker T$ then $T(\rho(g)v) = \rho'(g)Tv = 0$, so $\rho(g)v \in \ker T$. Likewise $\operatorname{im} T$ is $G$-invariant: $\rho'(g)(Tv) = T(\rho(g)v) \in \operatorname{im} T$. (These are subspaces by **kernel and image**.) Since $V$ is **irreducible**, $\ker T \in \{0, V\}$, and since $V'$ is irreducible, $\operatorname{im} T \in \{0, V'\}$. If $T \neq 0$ then $\ker T \neq V$ forces $\ker T = 0$ (injective) and $\operatorname{im} T \neq 0$ forces $\operatorname{im} T = V'$ (surjective); thus $T$ is an isomorphism. Hence a nonzero equivariant map exists only when $V \cong V'$, giving $\operatorname{Hom}_G(V, V') = 0$ for $V \not\cong V'$.

**Second part.** Suppose $F$ is algebraically closed, $\dim_F V = n < \infty$, and $T : V \to V$ is equivariant. Since $F$ is algebraically closed, the characteristic polynomial of $T$ has a root $\lambda \in F$, so $T$ has an **eigenvalue** $\lambda$ and $\ker(T - \lambda\,\mathrm{id}_V) \neq 0$. Now $T - \lambda\,\mathrm{id}_V$ is again $G$-equivariant ($\mathrm{id}_V$ commutes with every $\rho(g)$), so by the first part it is either $0$ or an isomorphism; having nonzero kernel it cannot be an isomorphism, hence $T - \lambda\,\mathrm{id}_V = 0$, i.e. $T = \lambda\,\mathrm{id}_V$. $\square$`,
  },
  {
    id: 'maschke-theorem',
    label: "Maschke's Theorem",
    title: "Maschke's Theorem",
    kind: 'theorem',
    tags: ['Representation Theory'],
    dependencies: ['irreducible-representation', 'group-representation', 'kernel-image'],
    description: String.raw`Maschke's theorem says that for a finite group whose order is invertible in the field — always so in characteristic zero — representations never tangle: every invariant subspace has an invariant complement, so every representation splits as a direct sum of irreducibles. The mechanism is averaging: given any projection onto an invariant subspace, average its conjugates over the group to manufacture an equivariant projection, whose kernel is the desired complement. This is exactly what reduces the study of complex representations of a finite group to classifying the irreducibles.`,
    statement: String.raw`Let $G$ be a finite group and $F$ a field with $\operatorname{char} F \nmid |G|$ (e.g. $\operatorname{char} F = 0$). Then every finite-dimensional representation $V$ of $G$ over $F$ is **completely reducible**: every $G$-invariant subspace $W \subseteq V$ admits a $G$-invariant complement $W'$ with $V = W \oplus W'$, and consequently $V$ is a direct sum of irreducible subrepresentations.`,
    proof: String.raw`Let $W \subseteq V$ be a $G$-invariant subspace. Choose any linear projection $\pi_0 : V \to V$ with image $W$ and $\pi_0|_W = \mathrm{id}_W$ (pick a vector-space complement and project along it). Now **average** $\pi_0$ over $G$:
$$\pi := \frac{1}{|G|}\sum_{g \in G} \rho(g)\,\pi_0\,\rho(g)^{-1}.$$
The factor $\tfrac{1}{|G|}$ exists in $F$ precisely because $\operatorname{char} F \nmid |G|$, so $|G| \cdot 1_F \neq 0$ is invertible.

*$\pi$ maps into $W$ and fixes $W$.* Since $W$ is invariant, $\rho(g)^{-1}W \subseteq W$, so $\pi_0\rho(g)^{-1}v \in W$ and then $\rho(g)\pi_0\rho(g)^{-1}v \in W$; hence $\operatorname{im}\pi \subseteq W$. For $w \in W$, invariance gives $\rho(g)^{-1}w \in W$, so $\pi_0\rho(g)^{-1}w = \rho(g)^{-1}w$ and $\rho(g)\pi_0\rho(g)^{-1}w = w$; averaging the $|G|$ equal terms gives $\pi w = w$. Thus $\pi$ is a projection onto $W$.

*$\pi$ is $G$-equivariant.* For $h \in G$, reindexing the sum by $g \mapsto hg$,
$$\rho(h)\pi\rho(h)^{-1} = \frac{1}{|G|}\sum_{g}\rho(hg)\pi_0\rho(hg)^{-1} = \frac{1}{|G|}\sum_{g'}\rho(g')\pi_0\rho(g')^{-1} = \pi,$$
so $\rho(h)\pi = \pi\rho(h)$.

Set $W' := \ker\pi$. Being the kernel of the equivariant map $\pi$, it is $G$-invariant (as in **kernel and image**: $\pi v = 0 \Rightarrow \pi\rho(g)v = \rho(g)\pi v = 0$), and since $\pi$ is a projection onto $W$ we have $V = \operatorname{im}\pi \oplus \ker\pi = W \oplus W'$. This is the invariant complement.

Finally, complete reducibility follows by induction on $\dim V$. If $V = 0$ or $V$ is **irreducible**, done. Otherwise $V$ has a proper nonzero invariant subspace $W$; by the above $V = W \oplus W'$ with both invariant and of smaller dimension, each a direct sum of irreducibles by the inductive hypothesis, hence so is $V$. $\square$`,
  },
  {
    id: 'character',
    label: 'Character',
    title: 'Character',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-representation', 'matrix', 'determinant', 'conjugacy-class', 'class-function'],
    description: String.raw`The character of a representation records, for each group element, the trace of the matrix by which it acts — collapsing a whole linear map to a single scalar. Remarkably little is lost: the trace is invariant under change of basis and under conjugation in the group, so the character is a class function, and over $\mathbb{C}$ it determines a finite-dimensional representation of a finite group up to isomorphism. Thus the entire representation can be read from one number per conjugacy class.`,
    definition: String.raw`The **character** of a finite-dimensional representation $\rho : G \to GL(V)$ over $F$ is the function
$$\chi_\rho : G \to F, \qquad \chi_\rho(g) = \operatorname{tr}\rho(g),$$
where $\operatorname{tr}$ is the trace of the matrix of $\rho(g)$ in any basis of $V$. Then $\chi_\rho(e) = \dim_F V$ (the **degree**), and $\chi_\rho$ is a **class function**: it is constant on each conjugacy class.`,
    proof: String.raw`**$\chi_\rho$ is well defined and is a class function.** The trace $\operatorname{tr}(A) = \sum_i A_{ii}$ satisfies $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ for square **matrices**, since $\sum_i (AB)_{ii} = \sum_{i,j} A_{ij}B_{ji} = \sum_j (BA)_{jj}$. Hence for invertible $P$, $\operatorname{tr}(PAP^{-1}) = \operatorname{tr}(A P^{-1}P) = \operatorname{tr}(A)$, so $\operatorname{tr}\rho(g)$ does not depend on the chosen basis — $\chi_\rho$ is well defined. For conjugate elements $hgh^{-1}$, $\rho(hgh^{-1}) = \rho(h)\rho(g)\rho(h)^{-1}$, so $\chi_\rho(hgh^{-1}) = \operatorname{tr}\bigl(\rho(h)\rho(g)\rho(h)^{-1}\bigr) = \operatorname{tr}\rho(g) = \chi_\rho(g)$; thus $\chi_\rho$ is constant on each **conjugacy class**, i.e. a **class function**. Finally $\chi_\rho(e) = \operatorname{tr}\,\mathrm{id}_V = \dim_F V$. (The **determinant** likewise gives the conjugation-invariant scalar $\det\rho(g)$, used in twisting representations by characters.) $\square$`,
  },
  {
    id: 'class-function',
    label: 'Class Function',
    title: 'Class Function',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['conjugacy-class', 'vector-space'],
    description: String.raw`A class function is a function on a group that depends only on the conjugacy class of its argument — it cannot tell apart elements that are conjugate. Characters are the prototypical examples. Over $\mathbb{C}$ these functions form a finite-dimensional inner product space whose dimension equals the number of conjugacy classes, and the irreducible characters turn out to be an orthonormal basis of it; this is the arena in which character theory lives.`,
    definition: String.raw`A **class function** on a finite group $G$ over a field $F$ is a function $f : G \to F$ that is constant on conjugacy classes: $f(hgh^{-1}) = f(g)$ for all $g, h \in G$. The class functions form an $F$-vector space, denoted $\mathrm{Cl}(G)$, of dimension equal to the number $r$ of conjugacy classes (a basis being the indicator functions of the classes). Over $F = \mathbb{C}$ it carries the Hermitian inner product
$$\langle f_1, f_2\rangle = \frac{1}{|G|}\sum_{g \in G} f_1(g)\,\overline{f_2(g)}.$$`,
    proof: String.raw`**$\mathrm{Cl}(G)$ is a vector space of dimension $r$.** A function is a class function iff it is constant on each **conjugacy class**, and the conjugacy classes partition $G$ into $r$ blocks. Sums and scalar multiples of functions constant on each block are again constant on each block, so $\mathrm{Cl}(G)$ is a linear subspace of the **vector space** $F^G$ of all functions $G \to F$. Such a function is freely and uniquely determined by its $r$ values, one per class; equivalently, the indicator functions $\mathbf{1}_{C}$ of the classes $C$ are class functions, are linearly independent (their supports are disjoint and nonempty), and span (any class function equals $\sum_C f(C)\mathbf{1}_C$). Hence they form a basis and $\dim_F \mathrm{Cl}(G) = r$. $\square$`,
  },
  {
    id: 'character-orthogonality',
    label: 'Orthogonality Relations',
    title: 'Character Orthogonality',
    kind: 'theorem',
    tags: ['Representation Theory'],
    dependencies: ['character', 'class-function', 'schur-lemma', 'maschke-theorem'],
    description: String.raw`The orthogonality relations are the central computational engine of finite-group representation theory. They state that the irreducible complex characters are orthonormal under the natural averaging inner product, and in fact form an orthonormal basis of the space of class functions. Two consequences are immediate: the number of irreducibles equals the number of conjugacy classes, and the decomposition of any representation into irreducibles is recovered by taking inner products of its character against the irreducible characters.`,
    statement: String.raw`Let $G$ be a finite group and work over $\mathbb{C}$. For irreducible representations $V_i, V_j$ with characters $\chi_i, \chi_j$,
$$\langle \chi_i, \chi_j\rangle = \frac{1}{|G|}\sum_{g \in G}\chi_i(g)\,\overline{\chi_j(g)} = \delta_{ij}.$$
Thus the distinct irreducible characters are orthonormal; they form an **orthonormal basis** of the space $\mathrm{Cl}(G)$ of class functions, so the number of irreducible representations (up to isomorphism) equals the number $r$ of conjugacy classes. Moreover any representation $V$ with character $\chi$ decomposes as $V \cong \bigoplus_i V_i^{\oplus m_i}$ with multiplicities $m_i = \langle \chi, \chi_i\rangle$, and $V$ is irreducible iff $\langle \chi, \chi\rangle = 1$.`,
    proof: String.raw`**Orthonormality.** For representations $V, W$ of $G$ over $\mathbb{C}$, consider the space $\operatorname{Hom}(V, W)$ of all linear maps with the $G$-action $g\cdot T = \rho_W(g)\,T\,\rho_V(g)^{-1}$; its fixed points are exactly the equivariant maps $\operatorname{Hom}_G(V, W)$. Averaging gives the equivariant projection onto the fixed space,
$$P = \frac{1}{|G|}\sum_{g \in G} \rho_W(g)\,(-)\,\rho_V(g)^{-1},$$
(this is the averaging operator of **Maschke's theorem** applied to the representation $\operatorname{Hom}(V,W)$, valid since $\operatorname{char}\mathbb{C} = 0 \nmid |G|$), so $\operatorname{tr} P = \dim_{\mathbb{C}}\operatorname{Hom}_G(V, W)$. Computing the trace of $T \mapsto \rho_W(g) T \rho_V(g)^{-1}$ as an operator on $\operatorname{Hom}(V,W) \cong W \otimes V^{*}$ gives $\operatorname{tr}\rho_W(g)\cdot\operatorname{tr}\rho_V(g)^{-1} = \chi_W(g)\,\overline{\chi_V(g)}$ (over $\mathbb{C}$, $\rho_V(g)$ has finite order so its eigenvalues are roots of unity and $\operatorname{tr}\rho_V(g^{-1}) = \overline{\chi_V(g)}$). Therefore
$$\dim_{\mathbb{C}}\operatorname{Hom}_G(V, W) = \frac{1}{|G|}\sum_{g}\chi_W(g)\,\overline{\chi_V(g)} = \langle \chi_W, \chi_V\rangle.$$
Take $V = V_j$, $W = V_i$ irreducible. By **Schur's lemma** over the algebraically closed field $\mathbb{C}$, $\dim\operatorname{Hom}_G(V_i, V_j) = \delta_{ij}$ (zero when $V_i \not\cong V_j$, and $1$ when $V_i \cong V_j$ since endomorphisms are scalars). Hence $\langle \chi_i, \chi_j\rangle = \delta_{ij}$.

**Basis and counting.** Each $\chi_i$ is a **class function**. Orthonormal vectors are linearly independent, so the distinct $\chi_i$ are independent in $\mathrm{Cl}(G)$, giving (number of irreducibles) $\le r = \dim_{\mathbb{C}}\mathrm{Cl}(G)$. That they actually *span* $\mathrm{Cl}(G)$ — making equality, so (number of irreducibles) $= r$ — follows because a class function $f$ orthogonal to every $\chi_i$ must be $0$: forming $\sum_g \overline{f(g)}\rho_i(g)$ yields a $G$-equivariant endomorphism of each irreducible $V_i$, hence a scalar by **Schur's lemma**, and that scalar is $\tfrac{|G|}{\dim V_i}\langle \chi_i, f\rangle = 0$; since by **Maschke's theorem** every representation is a sum of irreducibles, $\sum_g \overline{f(g)}\rho(g) = 0$ on every representation, in particular on the regular one, which forces $f \equiv 0$.

**Decomposition.** By **Maschke's theorem** write $V \cong \bigoplus_i V_i^{\oplus m_i}$; characters are additive over direct sums ($\operatorname{tr}$ of a block-diagonal map is the sum of traces), so $\chi = \sum_i m_i\chi_i$ and orthonormality gives $\langle \chi, \chi_i\rangle = m_i$ and $\langle\chi,\chi\rangle = \sum_i m_i^2$. The latter equals $1$ iff exactly one $m_i = 1$ and the rest vanish, i.e. iff $V$ is irreducible. $\square$`,
  },
  {
    id: 'character-table',
    label: 'Character Table',
    title: 'Character Table',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['character-orthogonality', 'conjugacy-class', 'regular-representation'],
    description: String.raw`The character table is the compact fingerprint of a finite group's complex representations: a square grid recording the value of each irreducible character on each conjugacy class. Because there are as many irreducibles as classes, the grid is square, and the orthogonality relations — read across rows and down columns — together with the dimension identity $\sum_i (\dim V_i)^2 = |G|$ impose so many constraints that the table can frequently be completed by elementary arithmetic.`,
    definition: String.raw`The **character table** of a finite group $G$ (over $\mathbb{C}$) is the $r \times r$ matrix whose $(i, j)$ entry is $\chi_i(g_j)$, where $\chi_1, \dots, \chi_r$ are the distinct irreducible characters and $g_1, \dots, g_r$ are representatives of the $r$ conjugacy classes (rows by character, columns by class). Conventionally the trivial character $\chi_1 \equiv 1$ occupies the first row and the identity the first column, so the first column lists the degrees $\chi_i(e) = \dim V_i$.`,
    proof: String.raw`**The table is square and its entries are constrained by orthogonality.** By the **orthogonality relations**, the number of irreducible characters equals the number $r$ of **conjugacy classes**, so the array is $r \times r$. Each entry is well defined because $\chi_i$ is constant on each class. The **row orthogonality** is the relation $\sum_{j} |C_j|\,\chi_i(g_j)\overline{\chi_k(g_j)} = |G|\,\delta_{ik}$ (the inner product grouped by class, $|C_j|$ the class size), and the dual **column orthogonality** $\sum_i \chi_i(g_j)\overline{\chi_i(g_k)} = \tfrac{|G|}{|C_j|}\delta_{jk}$ follows from it by inverting the (nonsingular) character matrix. Specializing column orthogonality to the identity column $g_j = g_k = e$ (where $|C_e| = 1$) recovers $\sum_i |\chi_i(e)|^2 = \sum_i (\dim V_i)^2 = |G|$, the dimension identity established for the **regular representation**. $\square$`,
  },
  {
    id: 'regular-representation',
    label: 'Regular Representation',
    title: 'Regular Representation',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-algebra', 'irreducible-representation', 'character-orthogonality'],
    description: String.raw`The regular representation is the action of a group on its own group algebra by left multiplication — a single representation that contains every irreducible at once. Over $\mathbb{C}$ each irreducible appears with multiplicity equal to its own dimension, which yields the celebrated identity that the sum of squares of the irreducible dimensions equals the order of the group. It is the universal object from which all irreducibles can, in principle, be extracted.`,
    definition: String.raw`The (left) **regular representation** of a finite group $G$ over $F$ is $G$ acting on $V = F[G]$ by left multiplication, $\rho_{\mathrm{reg}}(g)\bigl(\sum_h a_h e_h\bigr) = \sum_h a_h e_{gh}$. Its degree is $|G|$.`,
    proof: String.raw`**Over $\mathbb{C}$, the regular representation decomposes as $\mathbb{C}[G] \cong \bigoplus_i V_i^{\oplus \dim V_i}$, whence $\sum_i (\dim V_i)^2 = |G|$.** First compute its character. In the basis $\{e_h\}$ of $F[G]$, $\rho_{\mathrm{reg}}(g)$ permutes basis vectors by $e_h \mapsto e_{gh}$, so its matrix is a permutation matrix whose diagonal entry at $e_h$ is $1$ iff $gh = h$, i.e. iff $g = e$. Hence
$$\chi_{\mathrm{reg}}(g) = \#\{h : gh = h\} = \begin{cases}|G|, & g = e,\\ 0, & g \neq e.\end{cases}$$
By the decomposition formula of the **orthogonality relations**, the multiplicity of the irreducible $V_i$ in the regular representation is
$$m_i = \langle \chi_{\mathrm{reg}}, \chi_i\rangle = \frac{1}{|G|}\sum_{g}\chi_{\mathrm{reg}}(g)\overline{\chi_i(g)} = \frac{1}{|G|}\,|G|\,\overline{\chi_i(e)} = \dim V_i,$$
since only the $g = e$ term survives and $\chi_i(e) = \dim V_i$ is a positive integer. Thus $\mathbb{C}[G] \cong \bigoplus_i V_i^{\oplus \dim V_i}$. Comparing dimensions on both sides, $|G| = \dim \mathbb{C}[G] = \sum_i (\dim V_i)(\dim V_i) = \sum_i (\dim V_i)^2$. $\square$`,
  },
  {
    id: 'unitary-representation',
    label: 'Unitary Representation',
    title: 'Unitary Representation',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-representation', 'inner-product-space', 'maschke-theorem'],
    description: String.raw`A unitary representation acts by operators that preserve a Hermitian inner product — geometrically, by rigid motions of the space. The crucial fact is that for a finite group every complex representation can be made unitary by averaging any inner product over the group, after which orthogonal complements of invariant subspaces are themselves invariant. This is the analytic route to complete reducibility, and it is the form of the theory that extends to compact groups and underlies harmonic analysis.`,
    definition: String.raw`A **unitary representation** of a group $G$ on a complex inner product space $(V, \langle\cdot,\cdot\rangle)$ is a representation $\rho : G \to GL(V)$ acting by **unitary** operators: $\langle \rho(g)u, \rho(g)v\rangle = \langle u, v\rangle$ for all $g \in G$ and $u, v \in V$ (equivalently $\rho(g)^{*} = \rho(g)^{-1}$).`,
    proof: String.raw`**Every finite-dimensional complex representation of a finite group is unitary for a suitable inner product, hence completely reducible.** Start from any Hermitian inner product $(\cdot,\cdot)_0$ on the **inner product space** $V$ and average it over $G$:
$$\langle u, v\rangle := \frac{1}{|G|}\sum_{g \in G}\bigl(\rho(g)u,\ \rho(g)v\bigr)_0.$$
This is again a Hermitian inner product (a sum of positive-definite forms is positive-definite, and $\langle v,v\rangle = 0$ forces each $(\rho(g)v,\rho(g)v)_0 = 0$, so $v = 0$). It is $G$-invariant: for $h \in G$, reindexing $g \mapsto gh$,
$$\langle \rho(h)u, \rho(h)v\rangle = \frac{1}{|G|}\sum_g (\rho(gh)u, \rho(gh)v)_0 = \langle u, v\rangle,$$
so each $\rho(h)$ is unitary. Consequently, if $W \subseteq V$ is $G$-invariant then its orthogonal complement $W^{\perp}$ is also invariant: for $w' \in W^{\perp}$, $w \in W$, $g \in G$, unitarity gives $\langle \rho(g)w', w\rangle = \langle w', \rho(g)^{-1}w\rangle = 0$ since $\rho(g)^{-1}w \in W$. Thus $V = W \oplus W^{\perp}$ with both invariant — an inner-product proof of complete reducibility, matching **Maschke's theorem**. $\square$`,
  },
  {
    id: 'induced-representation',
    label: 'Induced Representation',
    title: 'Induced Representation',
    kind: 'definition',
    tags: ['Representation Theory'],
    dependencies: ['group-representation', 'subgroup', 'group-algebra', 'coset', 'tensor-product', 'module'],
    description: String.raw`Induction builds a representation of a group out of a representation of a subgroup by freely extending it across the cosets — the partner operation to restriction, which simply forgets part of a group's action. The two are adjoint, a relationship known as Frobenius reciprocity, which for finite groups becomes a clean equality of character inner products and makes induction the standard tool for transporting representations up and down a chain of subgroups.`,
    definition: String.raw`Let $H \le G$ be a subgroup of a finite group and $W$ a representation of $H$ over $F$, viewed as an $F[H]$-module. The **induced representation** is the $F[G]$-module obtained by extension of scalars,
$$\operatorname{Ind}_H^G W := F[G]\otimes_{F[H]} W,$$
on which $G$ acts by left multiplication on the $F[G]$ factor. Concretely, choosing left **coset** representatives $g_1, \dots, g_m$ of $H$ in $G$ (so $[G:H] = m$), one has $\operatorname{Ind}_H^G W = \bigoplus_{k=1}^{m} g_k \otimes W$, of dimension $m\cdot\dim_F W$, with $G$ permuting the summands according to its action on cosets and acting on $W$ through $H$. The **restriction** $\operatorname{Res}^G_H V$ of a $G$-representation $V$ is simply $V$ regarded as an $H$-representation by restricting $\rho$ to $H$.`,
  },
  {
    id: 'peter-weyl-theorem',
    label: 'Peter–Weyl Theorem',
    title: 'Peter–Weyl Theorem',
    kind: 'theorem',
    tags: ['Representation Theory'],
    dependencies: ['unitary-representation', 'character', 'irreducible-representation', 'lp-space', 'schur-lemma', 'compact-operator', 'spectral-theorem-operators', 'convolution'],
    description: String.raw`The Peter–Weyl theorem is the gateway from finite-group character theory to harmonic analysis on continuous groups. For a compact group it asserts that every irreducible unitary representation is finite-dimensional and that the matrix coefficients of the irreducibles span a dense subspace of the square-integrable functions, forming an orthogonal basis. The circle group is the classical special case: its irreducibles are the one-dimensional characters $\theta \mapsto e^{in\theta}$, and the theorem reduces to the completeness of the Fourier basis.`,
    statement: String.raw`Let $G$ be a compact (Hausdorff) topological group with normalized Haar measure, and $L^2(G)$ the square-integrable functions with respect to it. Then: **(i)** every irreducible unitary representation of $G$ is finite-dimensional; and **(ii)** the matrix coefficients $g \mapsto \langle \pi(g)v, w\rangle$ of the irreducible unitary representations $\pi$ span a dense subspace of $L^2(G)$, and, suitably normalized, form an orthonormal basis: explicitly $\{\sqrt{\dim V_\pi}\,(\pi_{ij})\}$ over all inequivalent irreducibles $\pi$ and matrix indices $i, j$. As a $G\times G$-representation under left and right translation,
$$L^2(G) \;\cong\; \widehat{\bigoplus_{\pi}}\; V_\pi \otimes V_\pi^{*}.$$`,
    proof: String.raw`This is a genuine analytic theorem; we give the standard argument, citing its analytic inputs. Normalized **Haar measure** $\mu$ on the compact group $G$ exists, is bi-invariant, and has $\mu(G) = 1$ — playing the role of $\tfrac{1}{|G|}\sum_g$ in the finite case; integration against it is the averaging used below.

**(i) Finite-dimensionality of irreducibles.** Let $\pi$ be an irreducible unitary representation on a Hilbert space $V_\pi$, and argue intrinsically on $V_\pi$ (without assuming any embedding of $\pi$ into $L^2(G)$). Fix a unit vector $v \in V_\pi$, let $P$ be the rank-one orthogonal projection onto $\mathbb{C}v$, and form the Haar-averaged operator
$$A := \int_G \pi(g)\,P\,\pi(g)^{-1}\,d\mu(g) : V_\pi \to V_\pi.$$
Then $A$ is self-adjoint and positive (each $\pi(g)P\pi(g)^{-1}$ is a positive operator, being unitarily conjugate to the projection $P$, and a Haar average of positive operators is positive), and it is nonzero since
$$\langle Av, v\rangle = \int_G \langle P\,\pi(g)^{-1}v,\ \pi(g)^{-1}v\rangle\,d\mu(g) = \int_G \bigl|\langle \pi(g)^{-1}v, v\rangle\bigr|^2\,d\mu(g) > 0$$
(the integrand is continuous and equals $1$ at $g = e$). Moreover $A$ is a **compact operator**: it is the Haar average over the compact group $G$ of the fixed finite-rank (hence compact) operator $P$ conjugated by unitaries, and a norm-limit of finite sums of such operators is compact (the set of compact operators is norm-closed and the average is approximated in norm by Riemann-type sums by continuity of $g \mapsto \pi(g)P\pi(g)^{-1}$). Finally $A$ is $G$-equivariant: for $h \in G$, reindexing $g \mapsto hg$, $\pi(h)A\pi(h)^{-1} = \int_G \pi(hg)P\pi(hg)^{-1}\,d\mu(g) = A$. Since $\pi$ is **irreducible**, **Schur's lemma** forces $A = c\,\mathrm{id}_{V_\pi}$ with $c > 0$ (it is positive and nonzero). But a compact operator can equal a nonzero scalar multiple of the identity only on a finite-dimensional space (on an infinite-dimensional Hilbert space $c\,\mathrm{id}$ is not compact, as the unit ball is not relatively compact). Hence $\dim V_\pi < \infty$.

**Orthogonality of matrix coefficients.** For finite-dimensional irreducible unitaries $\pi, \pi'$ and the averaging operator $S = \int_G \pi(g)\,B\,\pi'(g)^{-1}\,d\mu(g)$ (for any linear $B : V_{\pi'} \to V_\pi$), $S$ is intertwining, so by **Schur's lemma** $S = 0$ when $\pi \not\cong \pi'$ and $S = \tfrac{\operatorname{tr}B}{\dim V_\pi}\mathrm{id}$ when $\pi = \pi'$. Reading off matrix entries gives the **Schur orthogonality relations**
$$\int_G \pi_{ij}(g)\,\overline{\pi'_{kl}(g)}\,d\mu(g) = \frac{\delta_{\pi\pi'}\,\delta_{ik}\,\delta_{jl}}{\dim V_\pi},$$
so the rescaled coefficients $\sqrt{\dim V_\pi}\,\pi_{ij}$ are orthonormal in $L^2(G)$. (Each $\pi_{ij}$ is continuous on the compact $G$, hence in $L^2(G)$, so this legitimately embeds the matrix coefficients into $L^2(G)$.)

**A finite-dimensional invariant subspace inside any closed invariant subspace.** The following construction produces, inside any nonzero closed right-translation-invariant subspace $N \subseteq L^2(G)$, a nonzero finite-dimensional subrepresentation; it is used in part (ii). Pick $0 \neq \phi \in N$ and choose a **convolution** kernel $f \in L^2(G)$ with $f(x) = \overline{f(x^{-1})}$ and $T_f\phi \neq 0$, where $(T_f\psi)(x) = \int_G f(xy^{-1})\psi(y)\,d\mu(y)$ is convolution by $f$ (taking $f$ an approximate identity makes $T_f\phi$ close to $\phi$, hence nonzero). Then $T_f$ is self-adjoint (by $f(x) = \overline{f(x^{-1})}$) and a **compact operator** (its integrable square kernel makes it Hilbert–Schmidt on the compact group, hence compact), and $T_f$ commutes with right translation, so it maps $N$ into $N$. By the **spectral theorem for compact self-adjoint operators**, $T_f|_N$ has a nonzero real eigenvalue $\lambda$ with **finite-dimensional** eigenspace $E_\lambda \subseteq N$; right-translation invariance makes $E_\lambda$ a nonzero finite-dimensional right-subrepresentation of $L^2(G)$ contained in $N$.

**(ii) Completeness.** Let $M \subseteq L^2(G)$ be the closure of the span of all matrix coefficients. If $M \neq L^2(G)$, its orthogonal complement $M^{\perp}$ is a nonzero closed bi-translation-invariant subspace; applying the finite-dimensional-invariant-subspace construction above with $N = M^{\perp}$ produces a nonzero finite-dimensional subrepresentation, which (being finite-dimensional and unitary) contains an irreducible and hence a nonzero matrix coefficient — but that lies in $M$, contradicting $M^{\perp} \perp M$. So $M = L^2(G)$, the matrix coefficients are dense, and the orthonormal system above is an orthonormal basis. Grouping the coefficients of each $\pi$ gives the isotypic decomposition $L^2(G) \cong \widehat{\bigoplus_\pi} V_\pi \otimes V_\pi^{*}$ as a $G\times G$-module. For $G = S^1$ the irreducibles are the characters $e^{in\theta}$ and this is exactly the completeness of the Fourier basis. $\square$`,
  },
]
