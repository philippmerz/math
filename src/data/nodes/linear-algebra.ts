import type { MathNode } from '../types'

export const LINEAR_ALGEBRA_NODES: MathNode[] = [
  // ── Core structures ──────────────────────────────────────────────────────
  {
    id: 'vector-space',
    label: 'Vector Space',
    title: 'Vector Space',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['field', 'group'],
    description: String.raw`A **vector space** over a field $F$ is a set of *vectors* that can be added together and scaled by elements of $F$ (*scalars*), with these operations obeying the familiar rules of arithmetic. The plane $\mathbb{R}^2$ and space $\mathbb{R}^3$ are the prototypes, but functions, sequences, polynomials, and solution sets of linear equations are all vector spaces, which is what makes linear algebra so widely applicable. The axioms simply demand that addition form an abelian group and that scalar multiplication distribute over both additions and be compatible with field multiplication.`,
    definition: String.raw`A **vector space** over a field $F$ is an abelian group $(V, +)$ together with a scalar multiplication $F \times V \to V$, $(a, v) \mapsto av$, such that for all $a, b \in F$ and $u, v \in V$:
$$a(u + v) = au + av,\quad (a + b)v = av + bv,\quad (ab)v = a(bv),\quad 1\,v = v,$$
where $1$ is the multiplicative identity of $F$. The identity of $(V,+)$ is the **zero vector** $0$; one writes $-v$ for the additive inverse of $v$. Elements of $V$ are **vectors** and elements of $F$ are **scalars**.`,
    proof: String.raw`The basic computational facts $0\,v = 0$, $a\,0 = 0$, and $(-1)v = -v$ are not separate axioms but consequences. From $(a + b)v = av + bv$ with $a = b = 0$ we get $0\,v = 0\,v + 0\,v$; subtracting $0\,v$ (using that $(V,+)$ is a group) gives $0\,v = 0$. Likewise $a\,0 = a(0 + 0) = a\,0 + a\,0$ gives $a\,0 = 0$. Finally $v + (-1)v = 1\,v + (-1)v = (1 + (-1))v = 0\,v = 0$, so $(-1)v = -v$ by uniqueness of inverses in $(V, +)$. $\square$`,
  },
  {
    id: 'subspace',
    label: 'Subspace',
    title: 'Linear Subspace',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space'],
    description: String.raw`A **subspace** of a vector space $V$ is a subset that is itself a vector space under the inherited operations. Concretely, it is a non-empty subset closed under addition and scalar multiplication. Every subspace contains the zero vector; lines and planes through the origin are the familiar examples in $\mathbb{R}^3$. Subspaces are exactly the kernels and images of linear maps, and the spans of sets of vectors.`,
    definition: String.raw`A **subspace** of a vector space $V$ over $F$ is a subset $U \subseteq V$ such that
$$0 \in U, \qquad u, v \in U \Rightarrow u + v \in U, \qquad a \in F,\ u \in U \Rightarrow au \in U.$$
Equivalently, $U$ is non-empty and closed under taking linear combinations $au + bv$. Endowed with the restricted operations, $U$ is then a vector space in its own right.`,
    proof: String.raw`We check the conditions make $U$ a vector space. Closure under $+$ and scalar multiplication makes the operations well-defined on $U$. Since $0 \in U$ and, for $u \in U$, $(-1)u = -u \in U$ (closure under scalars, using $(-1)u = -u$ from **vector-space**), $(U, +)$ is a subgroup of $(V, +)$, hence an abelian group. The vector-space axioms (distributivity, associativity of scalars, unitality) are universally quantified identities inherited from $V$, so they hold on the subset $U$. Thus $U$ is a vector space. $\square$`,
  },
  {
    id: 'linear-map',
    label: 'Linear Map',
    title: 'Linear Map',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space'],
    description: String.raw`A **linear map** between vector spaces over the same field is a function that preserves the two operations: the image of a sum is the sum of the images, and the image of a scaled vector is the scaled image. These are the structure-preserving maps of linear algebra — its morphisms. In finite dimensions, once bases are chosen, every linear map is encoded by a matrix, and composition becomes matrix multiplication.`,
    definition: String.raw`A **linear map** (or linear transformation) $T : V \to W$ between vector spaces over the same field $F$ is a function satisfying
$$T(u + v) = T(u) + T(v),\qquad T(av) = a\,T(v)$$
for all $u, v \in V$ and $a \in F$; equivalently, $T(au + bv) = a\,T(u) + b\,T(v)$ for all $a, b \in F$. A bijective linear map is an **isomorphism**, and $V \cong W$ when one exists. It follows immediately that $T(0) = 0$, since $T(0) = T(0\cdot 0) = 0\cdot T(0) = 0$.`,
  },

  // ── Independence, span, basis, dimension ─────────────────────────────────
  {
    id: 'linear-independence-span',
    label: 'Independence & Span',
    title: 'Linear Independence and Span',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space', 'subspace'],
    description: String.raw`The **span** of a set of vectors is the collection of all finite linear combinations of them — the smallest subspace containing them. A set is **linearly independent** when no vector in it is redundant: the only way to combine them to the zero vector is the trivial way, with all coefficients zero. Together these two notions make precise what it means for a set of vectors to be "enough to build everything" (spanning) and "no more than enough" (independent). A set that is both is a basis.`,
    definition: String.raw`Let $V$ be a vector space over $F$ and $S \subseteq V$. The **span** of $S$ is
$$\operatorname{span}(S) = \Bigl\{ \textstyle\sum_{i=1}^{n} a_i v_i : n \in \mathbb{N},\ a_i \in F,\ v_i \in S \Bigr\},$$
the set of all finite linear combinations of elements of $S$; it is a subspace of $V$, and $S$ **spans** $V$ when $\operatorname{span}(S) = V$. A finite set $\{v_1, \dots, v_n\}$ is **linearly independent** if
$$a_1 v_1 + \cdots + a_n v_n = 0 \;\Rightarrow\; a_1 = \cdots = a_n = 0,$$
and an arbitrary set is independent if every finite subset is; otherwise it is **linearly dependent**.`,
    proof: String.raw`That $\operatorname{span}(S)$ is a subspace. First, $0 \in \operatorname{span}(S)$: if $S \neq \emptyset$, pick any $v \in S$ and take the combination $0\cdot v = 0$; if $S = \emptyset$, we adopt the standard convention that the only linear combination of no vectors is the empty sum, which is $0$, so $\operatorname{span}(\emptyset) = \{0\}$. (Either way $0$ is obtained without relying on whether $0 \in \mathbb{N}$.) Next, a sum of two finite combinations of elements of $S$ is again such a combination (concatenate the two combinations, combining coefficients of repeated vectors), as is a scalar multiple of one — so $\operatorname{span}(S)$ is closed under addition and scaling, hence a subspace by **subspace**. It is the smallest subspace containing $S$, since any subspace $U \supseteq S$ is closed under linear combinations and therefore contains every element of $\operatorname{span}(S)$. $\square$`,
  },
  {
    id: 'steinitz-exchange-lemma',
    label: 'Steinitz Exchange',
    title: 'Steinitz Exchange Lemma',
    kind: 'lemma',
    tags: ['Linear Algebra'],
    dependencies: ['linear-independence-span'],
    description: String.raw`The **Steinitz exchange lemma** is the engine behind the entire theory of dimension. It says that a linearly independent set can never be larger than a spanning set: if you have $m$ independent vectors and $n$ vectors that span the space, then $m \le n$, because you can swap the independent vectors into the spanning set one at a time without ever increasing its size. This single inequality forces every basis of a space to have the same number of elements.`,
    statement: String.raw`Let $V$ be a vector space over $F$. If $\{u_1, \dots, u_m\}$ is linearly independent and $\{w_1, \dots, w_n\}$ spans $V$, then $m \le n$, and one may replace $m$ of the $w_j$ by the $u_i$ so that the resulting $n$-element set still spans $V$.`,
    proof: String.raw`We exchange the $u_i$ into the spanning list one at a time, maintaining the invariant that after step $k$ the list $\{u_1, \dots, u_k\}$ together with $n - k$ of the original $w$'s spans $V$.

**Step $k$ (for $k = 1, \dots, m$).** By the invariant, after step $k-1$ we have a spanning list $u_1, \dots, u_{k-1}, w_{j_1}, \dots, w_{j_{n-k+1}}$. Since it spans $V$, write
$$u_k = a_1 u_1 + \cdots + a_{k-1} u_{k-1} + b_1 w_{j_1} + \cdots + b_{n-k+1} w_{j_{n-k+1}}.$$
Not all the $b_\ell$ are zero: otherwise $u_k$ would be a combination of $u_1, \dots, u_{k-1}$, contradicting the linear independence of $\{u_1, \dots, u_m\}$ (it would give a nontrivial dependence with the coefficient $-1$ on $u_k$). In particular there *is* at least one remaining $w$ to remove, so $n - k + 1 \ge 1$, i.e. $k \le n$; since this holds for all $k$ up to $m$, we get $m \le n$. Pick $\ell$ with $b_\ell \neq 0$ and solve for $w_{j_\ell}$:
$$w_{j_\ell} = b_\ell^{-1}\Bigl(u_k - \sum_{i < k} a_i u_i - \sum_{p \neq \ell} b_p w_{j_p}\Bigr).$$
Thus $w_{j_\ell} \in \operatorname{span}(u_1, \dots, u_k,\ \{w_{j_p}\}_{p \neq \ell})$. Replacing $w_{j_\ell}$ by $u_k$ in the list therefore loses no spanning power: the new list spans everything the old one did (the old list is in the span of the new one), and the old list spanned $V$, so the new list spans $V$. This restores the invariant for step $k$.

After $m$ steps we have exchanged all of $u_1, \dots, u_m$ in, and $m \le n$. $\square$`,
  },
  {
    id: 'basis',
    label: 'Basis & Dimension',
    title: 'Basis and Dimension',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-independence-span', 'steinitz-exchange-lemma', 'cardinality'],
    description: String.raw`A **basis** of a vector space is a linearly independent set that spans it. Equivalently, it is a set such that every vector is a *unique* finite linear combination of basis vectors — giving each vector well-defined coordinates. A central fact is that all bases of a given space have the same size, called the **dimension**. A basis is the device that turns abstract vectors into coordinate tuples and abstract linear maps into matrices.`,
    definition: String.raw`A **basis** of a vector space $V$ over $F$ is a subset $B \subseteq V$ that is linearly independent and spans $V$. Equivalently, $B$ is a basis iff every $v \in V$ has a *unique* expression $v = \sum_i a_i b_i$ as a finite linear combination of distinct elements $b_i \in B$. The **dimension** $\dim V$ is the common cardinality of every basis of $V$; $V$ is **finite-dimensional** when it has a finite basis. (Every vector space has a basis — proved in general via Zorn's lemma — but we take this for granted here and treat the finite-dimensional case.)`,
    proof: String.raw`We prove the two defining facts. *Uniqueness of coordinates is equivalent to being a basis.* If $B$ is a basis and $v = \sum a_i b_i = \sum a_i' b_i$, then $\sum (a_i - a_i') b_i = 0$, so independence forces $a_i = a_i'$; existence of *some* expression is spanning. Conversely unique representability gives spanning (existence) and independence (the representation of $0$ must be the trivial one).

*All bases have the same cardinality (in the finite-dimensional case).* Suppose $V$ is finite-dimensional, so it has *some* finite basis $B = \{b_1, \dots, b_m\}$; in particular $B$ spans $V$. Let $B'$ be *any* basis of $V$. We first show $B'$ is finite of size $\le m$. Were $B'$ to contain $m + 1$ distinct vectors $u_1, \dots, u_{m+1}$, this finite subset would be linearly independent (a subset of the basis $B'$) while $B$ spans $V$ with $|B| = m$; the **Steinitz exchange lemma** then forces $m + 1 \le m$, a contradiction. Hence every finite subset of $B'$ has at most $m$ elements, so $B'$ itself is finite with $|B'| \le m$. Now $B'$ is a finite spanning set and $B$ is independent, so Steinitz applied the other way gives $m \le |B'|$. Therefore $|B'| = m$. This holds for *every* basis $B'$, so every basis is finite of cardinality $m$, and $\dim V = m$ is well-defined. $\square$`,
  },
  {
    id: 'matrix',
    label: 'Matrix',
    title: 'Matrix',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'basis'],
    description: String.raw`A **matrix** is a rectangular array of field elements. Its real meaning in linear algebra is as the coordinate representation of a linear map: once bases are fixed for the domain and codomain, an $m \times n$ matrix records a linear map $F^n \to F^m$ by listing, in its columns, the coordinates of the images of the domain's basis vectors. Matrix multiplication is then defined precisely so that it corresponds to composition of linear maps.`,
    definition: String.raw`An $m \times n$ **matrix** over a field $F$ is a function $A : \{1,\dots,m\} \times \{1,\dots,n\} \to F$, written as an array with entries $A_{ij}$. Given a linear map $T : V \to W$ and ordered bases $(v_1, \dots, v_n)$ of $V$ and $(w_1, \dots, w_m)$ of $W$, the **matrix of $T$** is the $m \times n$ matrix $A$ whose $j$-th column holds the coordinates of $T(v_j)$:
$$T(v_j) = \sum_{i=1}^{m} A_{ij}\, w_i.$$
The **product** $AB$ of an $m \times n$ matrix $A$ and an $n \times p$ matrix $B$ is the $m \times p$ matrix with entries $(AB)_{ik} = \sum_{j=1}^n A_{ij} B_{jk}$.`,
    proof: String.raw`The product is defined so as to represent composition. Let $T : V \to W$ and $S : W \to X$ be linear, with $A$ the matrix of $S$ and $B$ the matrix of $T$ in chosen bases $(v_k)$ of $V$, $(w_j)$ of $W$, $(x_i)$ of $X$. Then, using linearity of $S$,
$$ (S\circ T)(v_k) = S\Bigl(\sum_j B_{jk} w_j\Bigr) = \sum_j B_{jk}\, S(w_j) = \sum_j B_{jk} \sum_i A_{ij} x_i = \sum_i \Bigl(\sum_j A_{ij} B_{jk}\Bigr) x_i.$$
The coefficient of $x_i$ is $(AB)_{ik}$, so $AB$ is exactly the matrix of $S \circ T$. This is the structural reason matrix multiplication takes the form it does. $\square$`,
  },

  // ── Kernel, image, rank–nullity ──────────────────────────────────────────
  {
    id: 'kernel-image',
    label: 'Kernel & Image',
    title: 'Kernel and Image',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'subspace'],
    description: String.raw`For a linear map, the **kernel** is the set of vectors sent to zero, and the **image** is the set of values actually attained. The kernel measures how much the map collapses, the image how much it reaches. The kernel is a subspace of the domain and the image a subspace of the codomain; a map is injective exactly when its kernel is trivial, and surjective exactly when its image is the whole codomain.`,
    definition: String.raw`For a linear map $T : V \to W$, the **kernel** and **image** are
$$\ker T = \{v \in V : T(v) = 0\} \subseteq V, \qquad \operatorname{im} T = \{T(v) : v \in V\} \subseteq W.$$
The dimension $\dim(\operatorname{im} T)$ is the **rank** of $T$ and $\dim(\ker T)$ its **nullity**.`,
    proof: String.raw`*$\ker T$ and $\operatorname{im} T$ are subspaces.* For the kernel: $T(0) = 0$ so $0 \in \ker T$; if $u, v \in \ker T$ and $a \in F$ then $T(u + v) = T(u) + T(v) = 0$ and $T(av) = aT(v) = 0$, so $\ker T$ is closed under combinations — a subspace by **subspace**. For the image: $0 = T(0) \in \operatorname{im} T$; if $T(u), T(v) \in \operatorname{im} T$ then $T(u) + T(v) = T(u + v)$ and $aT(u) = T(au)$ are again values of $T$, so $\operatorname{im} T$ is a subspace.

*$T$ injective $\iff \ker T = \{0\}$.* If $T$ is injective and $T(v) = 0 = T(0)$ then $v = 0$. Conversely if $\ker T = \{0\}$ and $T(u) = T(v)$, then $T(u - v) = 0$, so $u - v \in \ker T = \{0\}$, giving $u = v$. Surjectivity is by definition $\operatorname{im} T = W$. $\square$`,
  },
  {
    id: 'rank-nullity',
    label: 'Rank–Nullity',
    title: 'Rank–Nullity Theorem',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['kernel-image', 'basis', 'steinitz-exchange-lemma'],
    description: String.raw`The **rank–nullity theorem** is a conservation law for linear maps: the dimension that a map collapses (its nullity) plus the dimension it reaches (its rank) always add up to the dimension of the domain. So whatever a linear map loses to the kernel it gives up from its image. This single identity yields, among many consequences, that a linear self-map of a finite-dimensional space is injective iff it is surjective.`,
    statement: String.raw`Let $T : V \to W$ be linear with $V$ finite-dimensional. Then
$$\dim \ker T + \dim \operatorname{im} T = \dim V.$$`,
    proof: String.raw`Let $\dim V = n$ and let $\{u_1, \dots, u_k\}$ be a basis of the subspace $\ker T$ (so $\dim \ker T = k$). Extend it to a basis $\{u_1, \dots, u_k, v_1, \dots, v_{n-k}\}$ of $V$ — possible because an independent set in a finite-dimensional space extends to a basis (repeatedly adjoin any vector outside the current span; by the **Steinitz exchange lemma** this terminates at $n$ vectors, since an independent set has size $\le n$). We claim $\{T(v_1), \dots, T(v_{n-k})\}$ is a basis of $\operatorname{im} T$.

*Spanning.* Any element of $\operatorname{im} T$ is $T(v)$ for some $v = \sum_i a_i u_i + \sum_j b_j v_j$. Since $T(u_i) = 0$, $T(v) = \sum_j b_j T(v_j)$, so the $T(v_j)$ span $\operatorname{im} T$.

*Independence.* Suppose $\sum_j c_j T(v_j) = 0$. Then $T\bigl(\sum_j c_j v_j\bigr) = 0$, so $\sum_j c_j v_j \in \ker T$, hence $\sum_j c_j v_j = \sum_i d_i u_i$ for some $d_i$. This gives a linear relation $\sum_j c_j v_j - \sum_i d_i u_i = 0$ among the basis vectors of $V$, forcing all coefficients to vanish; in particular every $c_j = 0$.

Thus $\dim \operatorname{im} T = n - k$, and $\dim \ker T + \dim \operatorname{im} T = k + (n - k) = n = \dim V$. $\square$`,
  },

  // ── Determinant ──────────────────────────────────────────────────────────
  {
    id: 'determinant',
    label: 'Determinant',
    title: 'Determinant',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['matrix', 'symmetric-group', 'permutation-sign'],
    description: String.raw`The **determinant** assigns to each square matrix a single scalar that measures how the corresponding linear map scales volume — with a sign that records orientation when the field is $\mathbb{R}$. It is the unique function of the columns that is multilinear, alternating, and equal to $1$ on the identity. Its two headline properties are multiplicativity, $\det(AB) = \det A \,\det B$, and the invertibility criterion: a matrix is invertible exactly when its determinant is nonzero.`,
    definition: String.raw`The **determinant** of an $n \times n$ matrix $A$ over a field $F$ is
$$\det A = \sum_{\sigma \in S_n} \operatorname{sgn}(\sigma) \prod_{i=1}^{n} A_{i,\sigma(i)},$$
the sum over all permutations $\sigma$ of $\{1, \dots, n\}$, where $\operatorname{sgn}(\sigma) \in \{+1, -1\}$ is the sign of $\sigma$. Equivalently, $\det$ is the unique function $F^{n \times n} \to F$ that is $F$-linear in each column separately, **alternating** (zero whenever two columns are equal), and **normalized** by $\det I = 1$.`,
    proof: String.raw`We verify the Leibniz formula has the three characterizing properties; uniqueness then follows because the three properties determine the value on any matrix (expand each column in the standard basis using multilinearity, drop repeated-index terms by the alternating property, and read off signs from $\det I = 1$). *Multilinearity in column $k$:* each term of the sum contains exactly one factor $A_{i,\sigma(i)}$ from column $k$ (namely $i = \sigma^{-1}(k)$), so the sum is linear in column $k$. *Alternating:* suppose columns $k$ and $\ell$ are equal ($k \neq \ell$), so $A_{i,k} = A_{i,\ell}$ for every $i$. Pair each $\sigma$ with $\sigma' = (k\,\ell)\circ\sigma$ (left composition by the transposition). For each $i$, the factor $A_{i,\sigma'(i)} = A_{i,(k\,\ell)(\sigma(i))}$ equals $A_{i,\sigma(i)}$: it is unchanged when $\sigma(i) \notin \{k, \ell\}$, while if $\sigma(i) = k$ it becomes $A_{i,\ell} = A_{i,k}$ and if $\sigma(i) = \ell$ it becomes $A_{i,k} = A_{i,\ell}$, in both cases unchanged precisely because columns $k$ and $\ell$ are equal. Hence $\prod_i A_{i,\sigma(i)} = \prod_i A_{i,\sigma'(i)}$, while $\operatorname{sgn}(\sigma') = -\operatorname{sgn}(\sigma)$; since $\sigma \mapsto \sigma'$ is an involution pairing distinct permutations, the terms cancel in pairs and the sum is $0$. *Normalization:* for $A = I$ the only nonzero product is at $\sigma = \mathrm{id}$, giving $\det I = 1$. $\square$`,
  },
  {
    id: 'determinant-multiplicative',
    label: 'Determinant Multiplicativity',
    title: 'Multiplicativity & Invertibility Criterion',
    kind: 'proposition',
    tags: ['Linear Algebra'],
    dependencies: ['determinant', 'rank-nullity'],
    description: String.raw`The determinant turns matrix multiplication into ordinary multiplication of scalars, and it detects invertibility. These two facts — $\det(AB) = \det A\,\det B$ and "$A$ is invertible iff $\det A \neq 0$" — are what make the determinant a practical tool: they give the criterion behind the inverse and implicit function theorems (applied there to the Jacobian) and behind the characteristic polynomial used to find eigenvalues.`,
    statement: String.raw`For $n \times n$ matrices $A, B$ over a field $F$: $\det(AB) = \det A \cdot \det B$, and $A$ is invertible if and only if $\det A \neq 0$.`,
    proof: String.raw`*Multiplicativity.* Fix $B$ and consider $f(A) = \det(AB)$ as a function of the columns of $A$. Each column of $AB$ is a linear combination of the columns of $A$ with coefficients from $B$; concretely the $k$-th column of $AB$ depends linearly on the columns of $A$, so $f$ is multilinear and alternating in the columns of $A$. By the uniqueness in **determinant**, any multilinear alternating function of the columns equals $\det$ times its value on the identity; here $f(I) = \det(B)$. Hence $f(A) = \det(A)\det(B)$, i.e. $\det(AB) = \det A\,\det B$.

*Invertibility criterion.* If $A$ is invertible, $\det A\,\det A^{-1} = \det(AA^{-1}) = \det I = 1$, so $\det A \neq 0$. Conversely suppose $A$ is not invertible. As a linear map $F^n \to F^n$, $A$ is then not injective (an invertible square map is bijective; by **rank–nullity** for $T = A$, injectivity $\Leftrightarrow$ surjectivity $\Leftrightarrow$ invertibility), so its columns are linearly dependent: some column is a linear combination of the others. Subtracting that combination (a column operation that, by multilinearity and the alternating property, does not change $\det A$) produces a zero column, and a matrix with a zero column has determinant $0$ by linearity in that column. Hence $\det A = 0$. $\square$`,
  },

  {
    id: 'adjugate',
    label: 'Adjugate',
    title: 'Adjugate and the Cofactor Identity',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['determinant', 'matrix'],
    description: String.raw`The **adjugate** (classical adjoint) of a square matrix is the transpose of its matrix of cofactors. Its defining virtue is the **cofactor identity** $M\,\operatorname{adj}(M) = \det(M)\,I$, which packages the Laplace (cofactor) expansion of the determinant into a single matrix equation. It gives the explicit inverse formula $M^{-1} = \det(M)^{-1}\operatorname{adj}(M)$ when $\det M \neq 0$, and it is the lever behind the Cayley–Hamilton theorem.`,
    statement: String.raw`Let $M$ be an $n \times n$ matrix over a commutative ring $R$. The **cofactor** of the $(i,j)$ entry is $C_{ij} = (-1)^{i+j} \det(M^{(i,j)})$, where $M^{(i,j)}$ is $M$ with row $i$ and column $j$ deleted, and the **adjugate** is the transpose of the cofactor matrix, $\operatorname{adj}(M)_{ij} = C_{ji}$. Then
$$M \cdot \operatorname{adj}(M) = \det(M)\, I = \operatorname{adj}(M)\cdot M.$$`,
    proof: String.raw`We use the **Laplace (cofactor) expansion** along a row, which is itself a consequence of the multilinear, alternating **determinant**: for any $n \times n$ matrix $N$ and any fixed row index $i$,
$$\det N = \sum_{k=1}^{n} N_{ik}\,(-1)^{i+k}\det\bigl(N^{(i,k)}\bigr). \tag{L}$$
To see (L): by linearity of $\det$ in row $i$, write row $i$ of $N$ as $\sum_k N_{ik} e_k$ (with $e_k$ the $k$-th standard row vector); then $\det N = \sum_k N_{ik}\det(N^{[i \to e_k]})$, where $N^{[i \to e_k]}$ is $N$ with row $i$ replaced by $e_k$. Expanding the determinant of $N^{[i \to e_k]}$ — whose row $i$ has a single $1$ in column $k$ — and moving that row and column to the corner by $i-1$ row swaps and $k-1$ column swaps (each negating the determinant, and column swaps are legitimate since $\det$ is alternating in columns too, equal to $\det$ of the transpose) leaves the minor $\det(N^{(i,k)})$ times $(-1)^{(i-1)+(k-1)} = (-1)^{i+k}$, which is exactly the $k$-th term of (L).

*Diagonal entries.* The $(i,i)$ entry of $M\,\operatorname{adj}(M)$ is
$$\sum_{k=1}^n M_{ik}\,\operatorname{adj}(M)_{ki} = \sum_{k=1}^n M_{ik}\,C_{ik} = \sum_{k=1}^n M_{ik}\,(-1)^{i+k}\det\bigl(M^{(i,k)}\bigr) = \det M$$
by (L) applied to $N = M$.

*Off-diagonal entries.* For $i \neq j$, the $(i,j)$ entry of $M\,\operatorname{adj}(M)$ is
$$\sum_{k=1}^n M_{ik}\,\operatorname{adj}(M)_{kj} = \sum_{k=1}^n M_{ik}\,C_{jk} = \sum_{k=1}^n M_{ik}\,(-1)^{j+k}\det\bigl(M^{(j,k)}\bigr).$$
This is exactly the cofactor expansion (L) along row $j$ of the matrix $\widetilde M$ obtained from $M$ by replacing its row $j$ with a copy of row $i$ (the cofactors $C_{jk}$ depend only on the *other* rows, so they are unchanged, while the entries multiplying them are now $M_{ik}$). But $\widetilde M$ has two equal rows (rows $i$ and $j$), so $\det \widetilde M = 0$ because $\det$ is alternating (applied to rows, equivalently columns of the transpose). Hence the off-diagonal entries vanish.

Therefore $M\,\operatorname{adj}(M) = \det(M)\,I$. Applying the same argument to column expansions (equivalently, to $M^{\mathsf T}$, noting $\operatorname{adj}(M^{\mathsf T}) = \operatorname{adj}(M)^{\mathsf T}$ and $\det M^{\mathsf T} = \det M$) gives $\operatorname{adj}(M)\,M = \det(M)\,I$ as well. $\square$`,
  },

  // ── Eigenstructure ───────────────────────────────────────────────────────
  {
    id: 'eigenvalue-eigenvector',
    label: 'Eigenvalues & Eigenvectors',
    title: 'Eigenvalues and Eigenvectors',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'determinant-multiplicative', 'polynomial', 'rank-nullity'],
    description: String.raw`An **eigenvector** of a linear operator is a nonzero vector that the operator merely scales, leaving its direction (its line through the origin) fixed; the scaling factor is the **eigenvalue**. Eigenvectors reveal the invariant axes of a transformation, and when they span the whole space they diagonalize it — turning the operator into independent one-dimensional stretches. In finite dimensions the eigenvalues are exactly the roots of the characteristic polynomial.`,
    definition: String.raw`Let $T : V \to V$ be a linear operator on a vector space over $F$. A scalar $\lambda \in F$ is an **eigenvalue** of $T$ if there is a nonzero $v \in V$ with
$$T(v) = \lambda v, \qquad v \neq 0;$$
such a $v$ is an **eigenvector** for $\lambda$. For finite-dimensional $V$ with matrix $A$ of $T$, the **characteristic polynomial** is $\chi_A(\lambda) = \det(\lambda I - A) \in F[\lambda]$, a monic polynomial of degree $\dim V$.`,
    proof: String.raw`We show $\lambda$ is an eigenvalue iff $\chi_A(\lambda) = 0$. By definition $\lambda$ is an eigenvalue iff there is $v \neq 0$ with $(A - \lambda I)v = 0$, i.e. iff $A - \lambda I$ is not injective, i.e. (for a square matrix, by **rank–nullity**) iff $A - \lambda I$ is not invertible. By the invertibility criterion in **determinant-multiplicative**, this holds iff $\det(A - \lambda I) = 0$, equivalently $\det(\lambda I - A) = \chi_A(\lambda) = 0$ (the two differ by $(-1)^n$). That $\chi_A$ is monic of degree $n = \dim V$: in the Leibniz expansion of $\det(\lambda I - A)$, the identity permutation contributes $\prod_i(\lambda - A_{ii})$, whose leading term is $\lambda^n$; every other permutation omits at least two diagonal entries and so contributes a polynomial of degree $\le n - 2$. $\square$`,
  },
  {
    id: 'cayley-hamilton',
    label: 'Cayley–Hamilton',
    title: 'Cayley–Hamilton Theorem',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['eigenvalue-eigenvector', 'matrix', 'determinant', 'determinant-multiplicative', 'adjugate'],
    description: String.raw`The **Cayley–Hamilton theorem** says every square matrix satisfies its own characteristic polynomial: substitute the matrix for the variable and you get the zero matrix. This expresses every high power of a matrix in terms of the lowest $n$ powers, shows the minimal polynomial divides the characteristic polynomial, and underlies the calculus of matrix functions and the solution of linear recurrences and differential systems.`,
    statement: String.raw`Let $A$ be an $n \times n$ matrix over a field $F$ with characteristic polynomial $\chi_A(\lambda) = \det(\lambda I - A)$. Then $\chi_A(A) = 0$.`,
    proof: String.raw`The argument uses the **adjugate** (classical adjoint) $\operatorname{adj}(M)$ of a square matrix, whose entries are signed minors of the **determinant** and which satisfies the cofactor identity established in **adjugate**,
$$M \cdot \operatorname{adj}(M) = \det(M)\, I.$$
Apply it to $M = \lambda I - A$, regarded as a matrix over the commutative polynomial ring $F[\lambda]$ (the cofactor identity holds over any commutative ring):
$$(\lambda I - A)\,\operatorname{adj}(\lambda I - A) = \det(\lambda I - A)\, I = \chi_A(\lambda)\, I. \tag{$\ast$}$$
The adjugate has polynomial entries of degree $\le n - 1$, so we may collect powers of $\lambda$:
$$\operatorname{adj}(\lambda I - A) = \sum_{k=0}^{n-1} \lambda^k B_k, \qquad B_k \in F^{n\times n}, \qquad \chi_A(\lambda) = \sum_{k=0}^{n} c_k \lambda^k.$$
Expanding the left side of $(\ast)$ and equating the coefficient of each power $\lambda^k$ (legitimate, as these are identities of polynomials with matrix coefficients) gives
$$-A B_0 = c_0 I,\quad B_{k-1} - A B_k = c_k I \ (1 \le k \le n-1), \quad B_{n-1} = c_n I.$$
Now multiply the equation for $\lambda^k$ on the left by $A^k$ and sum over $k = 0, \dots, n$. The left-hand sides **telescope**:
$$\sum_{k=0}^{n} A^k(\text{terms}) = -A B_0 + \sum_{k=1}^{n-1} A^k(B_{k-1} - A B_k) + A^n B_{n-1} = 0,$$
since each $A^k B_{k-1}$ cancels with $A^{k}\!\cdot\!(-A B_{k})$... more precisely $+A^{k}B_{k-1}$ from level $k$ cancels $-A^{(k-1)+1}B_{(k-1)} = -A^{k}B_{k-1}$ from level $k-1$. The right-hand sides sum to $\sum_{k=0}^{n} c_k A^k = \chi_A(A)$. Hence $\chi_A(A) = 0$. (One must substitute the matrix $A$ only at the end; substituting $\lambda := A$ into $(\ast)$ directly is invalid because the entries of $\operatorname{adj}(\lambda I - A)$ need not commute with $A$.) $\square$`,
  },

  // ── Inner product geometry ───────────────────────────────────────────────
  {
    id: 'inner-product-space',
    label: 'Inner Product Space',
    title: 'Inner Product Space',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space', 'real-numbers'],
    description: String.raw`An **inner product** equips a vector space with geometry — lengths, angles, and orthogonality. It is a way of multiplying two vectors to get a scalar that is symmetric, linear in each argument, and positive: a nonzero vector has positive "self-product," which becomes the square of its length. The dot product on $\mathbb{R}^n$ is the model. Inner products underlie projection, least squares, Fourier analysis, and the entire theory of Hilbert spaces.`,
    definition: String.raw`An **inner product** on a real vector space $V$ is a function $\langle \cdot, \cdot \rangle : V \times V \to \mathbb{R}$ that is
$$\text{symmetric: } \langle u, v\rangle = \langle v, u\rangle, \quad \text{bilinear: } \langle au + bw, v\rangle = a\langle u,v\rangle + b\langle w, v\rangle,$$
$$\text{positive-definite: } \langle v, v\rangle \ge 0 \text{ with } \langle v, v\rangle = 0 \iff v = 0.$$
The pair $(V, \langle\cdot,\cdot\rangle)$ is an **inner product space**, and $\|v\| = \sqrt{\langle v, v\rangle}$ is the **norm** (length) induced by it.`,
  },
  {
    id: 'cauchy-schwarz',
    label: 'Cauchy–Schwarz',
    title: 'Cauchy–Schwarz Inequality',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['inner-product-space'],
    description: String.raw`The **Cauchy–Schwarz inequality** bounds the inner product of two vectors by the product of their lengths, with equality exactly when the vectors are parallel. It is what makes the ratio $\langle u, v\rangle / (\|u\|\|v\|)$ a legitimate cosine, so that "angle" is well-defined in any inner product space. It immediately yields the triangle inequality for the induced norm, and it recurs throughout analysis, probability, and geometry.`,
    statement: String.raw`In any real inner product space, for all $u, v$,
$$|\langle u, v\rangle| \le \|u\|\,\|v\|,$$
with equality if and only if $u$ and $v$ are linearly dependent.`,
    proof: String.raw`If $v = 0$ both sides are $0$ and $u, v$ are dependent, so assume $v \neq 0$, whence $\|v\|^2 = \langle v, v\rangle > 0$. For every $t \in \mathbb{R}$, positive-definiteness gives
$$0 \le \langle u - t v,\, u - t v\rangle = \|u\|^2 - 2t\,\langle u, v\rangle + t^2 \|v\|^2,$$
using bilinearity and symmetry. This is a quadratic in $t$ that is $\ge 0$ for all real $t$; minimizing at $t_0 = \langle u, v\rangle / \|v\|^2$ and substituting gives
$$0 \le \|u\|^2 - \frac{\langle u, v\rangle^2}{\|v\|^2},$$
i.e. $\langle u, v\rangle^2 \le \|u\|^2 \|v\|^2$. Taking square roots yields $|\langle u, v\rangle| \le \|u\|\|v\|$.

*Equality.* If $u = \lambda v$ then $|\langle u, v\rangle| = |\lambda|\|v\|^2 = \|u\|\|v\|$. Conversely, equality means the discriminant computation above is tight, i.e. $\langle u - t_0 v, u - t_0 v\rangle = 0$; by positive-definiteness $u - t_0 v = 0$, so $u = t_0 v$ and $u, v$ are dependent. $\square$`,
  },
  {
    id: 'norm-triangle-inequality',
    label: 'Triangle Inequality',
    title: 'Triangle Inequality for the Norm',
    kind: 'corollary',
    tags: ['Linear Algebra'],
    dependencies: ['cauchy-schwarz', 'inner-product-space'],
    description: String.raw`The length of a sum of two vectors is at most the sum of their lengths — the straight path is no longer than any detour. This **triangle inequality** is what makes the norm induced by an inner product a genuine notion of distance (a metric), and it is a direct consequence of Cauchy–Schwarz.`,
    statement: String.raw`In any real inner product space, $\|u + v\| \le \|u\| + \|v\|$ for all $u, v$.`,
    proof: String.raw`Expanding the squared norm and applying **Cauchy–Schwarz** ($\langle u, v\rangle \le |\langle u, v\rangle| \le \|u\|\|v\|$):
$$\|u + v\|^2 = \langle u + v, u + v\rangle = \|u\|^2 + 2\langle u, v\rangle + \|v\|^2 \le \|u\|^2 + 2\|u\|\|v\| + \|v\|^2 = (\|u\| + \|v\|)^2.$$
Both $\|u + v\|$ and $\|u\| + \|v\|$ are nonnegative, so taking square roots preserves the inequality. $\square$`,
  },
  {
    id: 'gram-schmidt',
    label: 'Gram–Schmidt',
    title: 'Gram–Schmidt Orthonormalization',
    kind: 'proposition',
    tags: ['Linear Algebra'],
    dependencies: ['inner-product-space', 'basis', 'linear-independence-span'],
    description: String.raw`The **Gram–Schmidt process** converts any basis into an orthonormal one, vector by vector: take each new basis vector, subtract off its components along the directions already fixed, and rescale to unit length. The result is a basis of mutually perpendicular unit vectors spanning the same space at every stage. It guarantees that every finite-dimensional inner product space has an orthonormal basis, and it is the conceptual core of the QR factorization.`,
    statement: String.raw`Every finite-dimensional inner product space has an orthonormal basis. More precisely, from any basis $v_1, \dots, v_n$ one can construct an orthonormal basis $e_1, \dots, e_n$ with $\operatorname{span}(e_1, \dots, e_k) = \operatorname{span}(v_1, \dots, v_k)$ for each $k$.`,
    proof: String.raw`If $V$ is the zero space ($n = 0$), its only basis is the empty set, which is vacuously orthonormal and spans $V = \{0\}$; the claim holds. So assume $n \ge 1$ and construct the $e_k$ recursively. Set $u_1 = v_1$ and $e_1 = u_1/\|u_1\|$ (well-defined since $v_1 \neq 0$, as $\{v_i\}$ is independent). Having built orthonormal $e_1, \dots, e_{k-1}$ with the same span as $v_1, \dots, v_{k-1}$, put
$$u_k = v_k - \sum_{j=1}^{k-1} \langle v_k, e_j\rangle\, e_j, \qquad e_k = \frac{u_k}{\|u_k\|}.$$

*$u_k \neq 0$.* If $u_k = 0$ then $v_k = \sum_{j<k}\langle v_k, e_j\rangle e_j \in \operatorname{span}(e_1,\dots,e_{k-1}) = \operatorname{span}(v_1,\dots,v_{k-1})$, contradicting the **linear independence** of $v_1, \dots, v_n$. So $\|u_k\| > 0$ and $e_k$ is defined.

*Orthonormality.* By induction $\|e_k\| = 1$, and for $i < k$, using bilinearity and $\langle e_j, e_i\rangle = \delta_{ji}$:
$$\langle u_k, e_i\rangle = \langle v_k, e_i\rangle - \sum_{j<k}\langle v_k, e_j\rangle\langle e_j, e_i\rangle = \langle v_k, e_i\rangle - \langle v_k, e_i\rangle = 0,$$
so $\langle e_k, e_i\rangle = 0$. Thus $\{e_1, \dots, e_k\}$ is orthonormal.

*Same span.* Each $e_k$ is a combination of $v_k$ and earlier $e_j$ (hence earlier $v_j$), and conversely $v_k = \|u_k\| e_k + \sum_{j<k}\langle v_k, e_j\rangle e_j$, so $\operatorname{span}(e_1,\dots,e_k) = \operatorname{span}(v_1,\dots,v_k)$. An orthonormal set is linearly independent (taking $\langle\cdot, e_i\rangle$ of a vanishing combination isolates each coefficient), so $e_1, \dots, e_n$ is an independent spanning set — a **basis** — that is orthonormal. $\square$`,
  },
  {
    id: 'orthonormal-basis',
    label: 'Orthonormal Basis',
    title: 'Orthonormal Basis',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['inner-product-space', 'basis', 'gram-schmidt'],
    description: String.raw`An **orthonormal basis** is a basis made of mutually perpendicular unit vectors. With respect to it, coordinates are computed simply by taking inner products, and the geometry of the space looks exactly like $\mathbb{R}^n$ with the standard axes. The Gram–Schmidt process builds one from any basis, so orthonormal bases always exist in finite dimensions, which is why inner-product computations can always be reduced to the familiar Euclidean case.`,
    definition: String.raw`An **orthonormal basis** of a finite-dimensional inner product space $V$ is a basis $\{e_1, \dots, e_n\}$ with
$$\langle e_i, e_j\rangle = \delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \neq j. \end{cases}$$
With respect to it, every $v \in V$ has the **Fourier expansion** $v = \sum_{i=1}^n \langle v, e_i\rangle\, e_i$, and $\|v\|^2 = \sum_i \langle v, e_i\rangle^2$ (Parseval). Existence is guaranteed by **Gram–Schmidt**.`,
    proof: String.raw`We verify the Fourier expansion. Since $\{e_i\}$ is a basis, write $v = \sum_j c_j e_j$. Taking the inner product with $e_i$ and using orthonormality, $\langle v, e_i\rangle = \sum_j c_j \langle e_j, e_i\rangle = c_i$. Hence $c_i = \langle v, e_i\rangle$ and $v = \sum_i \langle v, e_i\rangle e_i$. Then $\|v\|^2 = \langle \sum_i c_i e_i, \sum_j c_j e_j\rangle = \sum_{i,j} c_i c_j \delta_{ij} = \sum_i c_i^2$. $\square$`,
  },

  // ── Spectral theorem ─────────────────────────────────────────────────────
  {
    id: 'self-adjoint-real-eigenvalue',
    label: 'Symmetric ⇒ Real Eigenvalue',
    title: 'Real Eigenvalue of a Symmetric Operator',
    kind: 'lemma',
    tags: ['Linear Algebra'],
    dependencies: ['eigenvalue-eigenvector', 'fundamental-theorem-of-algebra', 'complex-numbers'],
    description: String.raw`A real symmetric operator always has a real eigenvalue. This is the seed from which the spectral theorem grows by induction. The point is twofold: over the complex numbers the characteristic polynomial must have a root (fundamental theorem of algebra), and symmetry forces every such root to be real — so the eigenvalue genuinely lives in the real field and comes with a real eigenvector.`,
    statement: String.raw`Let $A$ be a real symmetric $n \times n$ matrix ($A^{\mathsf T} = A$), $n \ge 1$. Then $A$ has a real eigenvalue, with a corresponding real eigenvector.`,
    proof: String.raw`View $A$ as a complex matrix. Its characteristic polynomial $\chi_A$ has degree $n \ge 1$, so by the **fundamental theorem of algebra** it has a root $\lambda \in \mathbb{C}$, which (by the eigenvalue criterion of **eigenvalue-eigenvector** applied over $\mathbb{C}$) is an eigenvalue with some eigenvector $0 \neq z \in \mathbb{C}^n$: $Az = \lambda z$.

*$\lambda$ is real.* We work directly with the conjugate transpose on $\mathbb{C}^n$, defined inline: for a complex matrix or vector $X$, write $\bar X$ for its entrywise complex conjugate and $X^* = \bar X^{\mathsf T}$ (the conjugate transpose). Three elementary facts follow at once from $\overline{ab} = \bar a\,\bar b$, $\overline{a+b} = \bar a + \bar b$, and $(XY)^{\mathsf T} = Y^{\mathsf T} X^{\mathsf T}$: first, $(XY)^* = \overline{XY}^{\mathsf T} = (\bar X \bar Y)^{\mathsf T} = \bar Y^{\mathsf T}\bar X^{\mathsf T} = Y^* X^*$; second, for $z \in \mathbb{C}^n$ the scalar $z^* z = \sum_i \overline{z_i}\, z_i = \sum_i |z_i|^2$ is real and strictly positive whenever $z \neq 0$; third, a $1\times 1$ matrix (a scalar) $s$ satisfies $s^* = \bar s$, so $s$ is real iff $s^* = s$.

Now compute the scalar $z^* A z$ two ways. On one hand $z^* A z = z^*(\lambda z) = \lambda\, z^* z = \lambda \|z\|^2$, writing $\|z\|^2 := z^* z > 0$. On the other hand, since $A$ is real ($\bar A = A$) and symmetric ($A^{\mathsf T} = A$), we have $A^* = \bar A^{\mathsf T} = A^{\mathsf T} = A$, so by the product rule for $*$ applied to the scalar $z^* A z$,
$$(z^* A z)^* = z^* A^{*} (z^*)^* = z^* A z,$$
using $(z^*)^* = z$ and $A^* = A$. Hence $z^* A z$ is real (a scalar equal to its own conjugate). Therefore $\lambda \|z\|^2 \in \mathbb{R}$, and since $\|z\|^2 > 0$ is a positive real, $\lambda \in \mathbb{R}$.

*Real eigenvector.* With $\lambda \in \mathbb{R}$, the real matrix $A - \lambda I$ is singular (its determinant $\chi_A(\lambda) = 0$ by **eigenvalue-eigenvector**), so it has a nonzero real null vector $v \in \mathbb{R}^n$ with $Av = \lambda v$. $\square$`,
  },
  {
    id: 'spectral-theorem',
    label: 'Spectral Theorem',
    title: 'Spectral Theorem (Symmetric Matrices)',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['self-adjoint-real-eigenvalue', 'orthonormal-basis', 'gram-schmidt'],
    description: String.raw`The **spectral theorem** says every real symmetric matrix can be diagonalized by an orthonormal change of coordinates: there is an orthonormal basis consisting entirely of eigenvectors, and all the eigenvalues are real. Geometrically, a symmetric matrix is just a set of independent stretches along mutually perpendicular axes. It is the foundation of principal component analysis, the classification of quadratic forms, and the stability analysis of equilibria.`,
    statement: String.raw`Let $A$ be a real symmetric $n \times n$ matrix. Then $A$ has an orthonormal basis of eigenvectors with real eigenvalues; equivalently there is an orthogonal matrix $Q$ ($Q^{\mathsf T} Q = I$) and a real diagonal $\Lambda$ with
$$A = Q\,\Lambda\,Q^{\mathsf T}.$$`,
    proof: String.raw`Induct on $n$. For $n = 0$ (the zero space) the empty basis works vacuously and $Q$ is the empty matrix. For $n = 1$ the matrix is already diagonal with real entry. For $n \ge 1$: by **self-adjoint-real-eigenvalue** (which requires $n \ge 1$), $A$ has a real eigenvalue $\lambda_1$ with a unit real eigenvector $e_1$ ($Ae_1 = \lambda_1 e_1$, $\|e_1\| = 1$).

*The orthogonal complement is invariant.* Let $W = \{x \in \mathbb{R}^n : \langle x, e_1\rangle = 0\}$, an $(n-1)$-dimensional subspace. If $x \in W$ then, using symmetry of $A$ (so $\langle Ax, y\rangle = \langle x, Ay\rangle$ for the standard inner product),
$$\langle Ax, e_1\rangle = \langle x, A e_1\rangle = \langle x, \lambda_1 e_1\rangle = \lambda_1 \langle x, e_1\rangle = 0,$$
so $Ax \in W$. Thus $A$ restricts to a linear operator $A|_W$ on $W$, and it is symmetric there (the identity $\langle A|_W x, y\rangle = \langle x, A|_W y\rangle$ holds for $x, y \in W$).

*Induction.* Choose (via **Gram–Schmidt**) an orthonormal basis $f_2, \dots, f_n$ of $W$, and let $\Phi : \mathbb{R}^{n-1} \to W$, $\Phi(c) = \sum_{j} c_j f_j$, be the resulting coordinate isomorphism. Because the $f_j$ are orthonormal, $\Phi$ preserves inner products: $\langle \Phi(c), \Phi(d)\rangle = \sum_{j} c_j d_j = c\cdot d$. Let $M$ be the matrix of $A|_W$ in this basis, so $A|_W \Phi(c) = \Phi(Mc)$. Then $M$ is symmetric: for the standard basis vectors $\epsilon_i, \epsilon_j$ of $\mathbb{R}^{n-1}$,
$$M_{ij} = (Mc)_i\big|_{c=\epsilon_j} = \langle \Phi(M\epsilon_j), \Phi(\epsilon_i)\rangle = \langle A|_W f_j, f_i\rangle = \langle f_j, A|_W f_i\rangle = \langle \Phi(\epsilon_j), \Phi(M\epsilon_i)\rangle = M_{ji},$$
using that $A|_W$ is symmetric and that $\Phi$ preserves the inner product (so coordinates are recovered by $\langle\,\cdot\,, f_i\rangle$). The inductive hypothesis applies to $M$, giving an orthonormal basis $c^{(2)}, \dots, c^{(n)}$ of $\mathbb{R}^{n-1}$ with $M c^{(k)} = \mu_k c^{(k)}$, $\mu_k \in \mathbb{R}$. Set $e_k = \Phi(c^{(k)})$. Then $A|_W e_k = \Phi(M c^{(k)}) = \mu_k \Phi(c^{(k)}) = \mu_k e_k$, and since $A|_W e_k = A e_k$ ($W$ is $A$-invariant), each $e_k$ is an eigenvector of $A$ with real eigenvalue $\mu_k$. As $\Phi$ preserves inner products, $\langle e_k, e_\ell\rangle = c^{(k)}\cdot c^{(\ell)} = \delta_{k\ell}$, so $e_2, \dots, e_n$ is an orthonormal basis of $W$ of eigenvectors of $A$. Together with $e_1$ these form an orthonormal basis $e_1, \dots, e_n$ of $\mathbb{R}^n$ (each $e_i \in W \perp e_1$ for $i \ge 2$, and the $e_i$, $i\ge 2$, are mutually orthonormal) of eigenvectors of $A$.

*Matrix form.* Let $Q$ be the matrix with columns $e_1, \dots, e_n$. Orthonormality of the columns is exactly $Q^{\mathsf T} Q = I$, so $Q$ is orthogonal, and $A e_i = \lambda_i e_i$ says $AQ = Q\Lambda$ with $\Lambda = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$ real. Hence $A = Q\Lambda Q^{\mathsf T}$. $\square$`,
  },

  // ── Concrete Euclidean geometry ──────────────────────────────────────────
  {
    id: 'dot-product',
    label: 'Dot Product',
    title: 'Dot Product',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['euclidean-space', 'inner-product-space', 'cauchy-schwarz'],
    description: String.raw`The **dot product** is the concrete inner product on $\mathbb{R}^n$: multiply coordinates pairwise and add. It produces lengths and distances, and (bounded by Cauchy–Schwarz) the cosine of the angle between two vectors, with a zero dot product meaning perpendicular. It is the prototype that the abstract notion of inner product space generalizes, and the source of all Euclidean geometry in coordinates.`,
    definition: String.raw`The **dot product** of $x, y \in \mathbb{R}^n$ is
$$x \cdot y = \sum_{i=1}^{n} x_i\, y_i.$$
It induces the **Euclidean norm** $|x| = \sqrt{x \cdot x}$ and, for nonzero $x, y$, the **angle** via $\cos\theta = (x\cdot y)/(|x|\,|y|)$, which lies in $[-1, 1]$ by Cauchy–Schwarz.`,
    proof: String.raw`The dot product is an **inner product** in the sense of **inner-product-space**, so it inherits all that structure. Symmetry: $x\cdot y = \sum_i x_i y_i = \sum_i y_i x_i = y\cdot x$. Bilinearity: $\sum_i (a x_i + b w_i) y_i = a\sum_i x_i y_i + b\sum_i w_i y_i$, linear in the first argument and (by symmetry) the second. Positive-definiteness: $x\cdot x = \sum_i x_i^2 \ge 0$, a sum of squares of reals, equal to $0$ iff every $x_i = 0$, i.e. $x = 0$. Hence $(\mathbb{R}^n, \cdot)$ is an inner product space and $\cos\theta \in [-1,1]$ follows from **Cauchy–Schwarz** applied to it. $\square$`,
  },
  {
    id: 'orthogonality',
    label: 'Orthogonality',
    title: 'Orthogonality',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['dot-product'],
    description: String.raw`Two vectors are **orthogonal** when their dot product is zero — perpendicular in the Euclidean sense. Orthogonality is the geometric backbone of linear algebra: it underlies projections onto subspaces, the decomposition of a space into perpendicular pieces, orthonormal bases, and the Pythagorean identity. It transfers verbatim to any inner product space by replacing the dot product with the abstract inner product.`,
    definition: String.raw`Vectors $u, v \in \mathbb{R}^n$ are **orthogonal**, written $u \perp v$, when $u \cdot v = 0$. A set is **orthogonal** if its vectors are pairwise orthogonal, and **orthonormal** if additionally each has unit length.`,
    proof: String.raw`The defining geometric fact — the **Pythagorean identity** $|u + v|^2 = |u|^2 + |v|^2$ for orthogonal $u, v$ — follows directly: by bilinearity and symmetry of the **dot product**,
$$|u + v|^2 = (u+v)\cdot(u+v) = u\cdot u + 2(u\cdot v) + v\cdot v = |u|^2 + |v|^2$$
precisely because the cross term $2(u\cdot v)$ vanishes when $u \perp v$. $\square$`,
  },
  {
    id: 'hyperplane',
    label: 'Hyperplane',
    title: 'Hyperplane',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['dot-product', 'subspace', 'rank-nullity'],
    description: String.raw`A **hyperplane** in $\mathbb{R}^n$ is the solution set of a single linear equation — a flat of dimension one less than the ambient space, with a **normal vector** perpendicular to it. It generalizes a line in the plane and a plane in space. Through the origin a hyperplane is a subspace; otherwise it is a parallel (affine) translate of one. Hyperplanes are the basic building blocks of linear constraints, of separation theorems, and of convex geometry.`,
    definition: String.raw`A **hyperplane** in $\mathbb{R}^n$ is a set
$$H = \{x \in \mathbb{R}^n : a \cdot x = c\}, \qquad a \in \mathbb{R}^n,\ a \neq 0,\ c \in \mathbb{R},$$
with **normal vector** $a$. When $c = 0$ it is a subspace; for general $c$ it is the affine translate $x_0 + H_0$ of the linear hyperplane $H_0 = \{x : a\cdot x = 0\}$ by any solution $x_0$ of $a\cdot x_0 = c$.`,
    proof: String.raw`$H$ is an $(n-1)$-dimensional flat. Consider the linear map $T : \mathbb{R}^n \to \mathbb{R}$, $T(x) = a\cdot x$. Since $a \neq 0$, $T \neq 0$, so $\operatorname{im} T = \mathbb{R}$ has dimension $1$, and by **rank–nullity** $\dim \ker T = n - 1$; this kernel is exactly the linear hyperplane $H_0 = \{x : a\cdot x = 0\}$, a subspace by **subspace** of dimension $n-1$. When $c = 0$ we have $H = H_0$, a genuine $(n-1)$-dimensional subspace. For $c \neq 0$, $H$ contains no vector-space dimension of its own (it omits the origin, since $a\cdot 0 = 0 \neq c$); instead, picking any $x_0$ with $a\cdot x_0 = c$, the solution set is $\{x : a\cdot(x - x_0) = 0\} = x_0 + H_0$, the affine translate of the $(n-1)$-dimensional subspace $H_0$ — an affine $(n-1)$-flat. $\square$`,
  },
]
