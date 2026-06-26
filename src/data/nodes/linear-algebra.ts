import type { MathNode } from '../types'

export const LINEAR_ALGEBRA_NODES: MathNode[] = [
  {
    id: 'vector-space',
    label: 'Vector Space',
    title: 'Vector Space',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['field', 'group'],
    definition: String.raw`A **vector space** over a field $F$ is an abelian group $(V, +)$ of *vectors* with a scalar multiplication $F \times V \to V$ that distributes over both additions and respects the field structure:
$$a(u + v) = au + av,\quad (a + b)v = av + bv,\quad (ab)v = a(bv),\quad 1v = v.$$
$\mathbb{R}^n$ is the prototype, but functions, sequences, and polynomials form vector spaces too.`,
  },
  {
    id: 'linear-map',
    label: 'Linear Map',
    title: 'Linear Map',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space'],
    definition: String.raw`A **linear map** $T : V \to W$ between vector spaces over the same field $F$ preserves the operations:
$$T(u + v) = T(u) + T(v),\qquad T(av) = a\,T(v),$$
equivalently $T(au + bv) = a\,T(u) + b\,T(v)$. Linear maps are the structure-preserving maps of linear algebra; in finite dimensions, once bases are chosen, each is encoded by a matrix.`,
  },
  {
    id: 'basis',
    label: 'Basis & Dimension',
    title: 'Basis and Dimension',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space'],
    definition: String.raw`A **basis** of a vector space $V$ is a linearly independent set $B$ that spans $V$: every vector is a *unique* finite combination $\sum_i a_i\,b_i$ of basis vectors $b_i \in B$. All bases of $V$ share the same cardinality, the **dimension** $\dim V$. A basis turns abstract vectors into coordinates and linear maps into matrices.`,
  },
  {
    id: 'matrix',
    label: 'Matrix',
    title: 'Matrix',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'basis'],
    definition: String.raw`A **matrix** is a rectangular array of field elements. Once bases are fixed, an $m \times n$ matrix is exactly the coordinate representation of a linear map $F^n \to F^m$ — its columns are the coordinate vectors of the images of the basis vectors — and matrix multiplication corresponds to composition of linear maps.`,
  },
  {
    id: 'determinant',
    label: 'Determinant',
    title: 'Determinant',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['matrix'],
    definition: String.raw`The **determinant** $\det A$ of a square matrix over a field $F$ is the scalar measuring how the linear map it represents scales volume — signed, when $F = \mathbb{R}$. It is multiplicative, $\det(AB) = \det A \, \det B$, and $A$ is invertible **iff** $\det A \neq 0$ — the criterion behind the inverse and implicit function theorems (applied there to the Jacobian).`,
  },
  {
    id: 'subspace',
    label: 'Subspace',
    title: 'Linear Subspace',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space'],
    definition: String.raw`A **subspace** of a vector space $V$ over a field $F$ is a subset $U \subseteq V$ that is itself a vector space under the inherited operations — equivalently, $U$ is non-empty and closed under addition and scalar multiplication:
$$u, v \in U,\ a \in F \;\Rightarrow\; u + v \in U \ \text{ and }\ a u \in U.$$
Every subspace contains $0$; lines and planes through the origin are the familiar examples.`,
  },
  {
    id: 'kernel-image',
    label: 'Kernel & Image',
    title: 'Kernel and Image',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'subspace'],
    definition: String.raw`For a linear map $T : V \to W$, the **kernel** is what maps to zero and the **image** is the set of attained values:
$$\ker T = \{v \in V : T(v) = 0\},\qquad \operatorname{im} T = \{T(v) : v \in V\}.$$
$\ker T$ is a subspace of $V$ and $\operatorname{im} T$ a subspace of $W$; $T$ is injective iff $\ker T = \{0\}$, and surjective iff $\operatorname{im} T = W$.`,
  },
  {
    id: 'rank-nullity',
    label: 'Rank–Nullity',
    title: 'Rank–Nullity Theorem',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['kernel-image', 'basis'],
    definition: String.raw`For a linear map $T : V \to W$ with $V$ finite-dimensional,
$$\dim \ker T + \dim \operatorname{im} T = \dim V.$$
The **rank** ($\dim \operatorname{im} T$) and **nullity** ($\dim \ker T$) account for the whole domain — a conservation law making precise that whatever dimensions a linear map collapses, it loses from its image.`,
  },
  {
    id: 'eigenvalue-eigenvector',
    label: 'Eigenvalues & Eigenvectors',
    title: 'Eigenvalues and Eigenvectors',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['linear-map', 'determinant'],
    definition: String.raw`An **eigenvector** of a linear operator $T : V \to V$ is a non-zero $v$ that $T$ merely scales, by its **eigenvalue** $\lambda$:
$$T(v) = \lambda v, \qquad v \neq 0.$$
In finite dimensions the eigenvalues are exactly the roots, in the scalar field $F$, of the characteristic polynomial $\det(T - \lambda I) = 0$. Eigenvectors mark the lines an operator leaves invariant; when they span the space, they diagonalize it.`,
  },
  {
    id: 'inner-product-space',
    label: 'Inner Product Space',
    title: 'Inner Product Space',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['vector-space', 'real-numbers'],
    definition: String.raw`An **inner product** on a real vector space is a symmetric, bilinear, positive-definite form $\langle u, v\rangle$, giving lengths and angles:
$$\|v\| = \sqrt{\langle v, v\rangle},\qquad \langle u, v\rangle = \|u\|\,\|v\|\cos\theta.$$
It equips a vector space with geometry — the dot product on $\mathbb{R}^n$ is the model — and underlies orthogonality, projection, and least squares.`,
  },
  {
    id: 'orthonormal-basis',
    label: 'Orthonormal Basis',
    title: 'Orthonormal Basis',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['inner-product-space', 'basis'],
    definition: String.raw`An **orthonormal basis** is a basis of mutually orthogonal unit vectors, $\langle e_i, e_j\rangle = \delta_{ij}$. Coordinates become inner products, $v = \sum_i \langle v, e_i\rangle\,e_i$, and the **Gram–Schmidt** process builds one from any basis. They make computation in an inner product space as simple as in $\mathbb{R}^n$ with standard axes.`,
  },
  {
    id: 'spectral-theorem',
    label: 'Spectral Theorem',
    title: 'Spectral Theorem',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['eigenvalue-eigenvector', 'orthonormal-basis'],
    definition: String.raw`Every real symmetric matrix (equivalently, a self-adjoint operator on a real inner product space) has an orthonormal basis of eigenvectors and only real eigenvalues — equivalently, it is diagonalized by an orthogonal change of basis,
$$A = Q \Lambda Q^{\mathsf{T}}, \qquad Q^{\mathsf{T}} Q = I.$$
It is the cornerstone of principal component analysis, quadratic forms, and the stability analysis of equilibria.`,
  },
  {
    id: 'cauchy-schwarz',
    label: 'Cauchy–Schwarz',
    title: 'Cauchy–Schwarz Inequality',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['inner-product-space'],
    definition: String.raw`In any inner product space,
$$|\langle u, v\rangle| \le \|u\|\,\|v\|,$$
with equality exactly when $u$ and $v$ are linearly dependent. In a real inner product space it makes $\langle u, v\rangle / (\|u\|\,\|v\|)$ a valid cosine; it yields the triangle inequality for the norm, and recurs throughout analysis and probability.`,
  },
  {
    id: 'cayley-hamilton',
    label: 'Cayley–Hamilton',
    title: 'Cayley–Hamilton Theorem',
    kind: 'theorem',
    tags: ['Linear Algebra'],
    dependencies: ['eigenvalue-eigenvector', 'matrix'],
    definition: String.raw`Every square matrix satisfies its own characteristic polynomial — if $p(\lambda) = \det(\lambda I - A)$, then $p(A) = 0$. It expresses high powers of $A$ in terms of lower ones, shows the minimal polynomial divides the characteristic polynomial, and underlies the calculus of matrix functions.`,
  },
  {
    id: 'dot-product',
    label: 'Dot Product',
    title: 'Dot Product',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['euclidean-space', 'vector-space'],
    definition: String.raw`The **dot product** of vectors in $\mathbb{R}^n$ is
$$x \cdot y = \sum_{i=1}^{n} x_i y_i.$$
It is the standard **inner product**: it gives length $|x| = \sqrt{x \cdot x}$ and distance, and (bounded by Cauchy–Schwarz) the angle $\cos\theta = \dfrac{x \cdot y}{|x|\,|y|}$, with $x \cdot y = 0$ meaning orthogonal. It is the concrete prototype that the abstract inner product space generalizes.`,
  },
  {
    id: 'orthogonality',
    label: 'Orthogonality',
    title: 'Orthogonality',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['dot-product'],
    definition: String.raw`Two vectors are **orthogonal** when their dot product vanishes, $u \cdot v = 0$ — perpendicular in the Euclidean sense. Orthogonality underlies projections, the **Pythagorean identity** $|u + v|^2 = |u|^2 + |v|^2$ for orthogonal vectors, and orthonormal bases, and it carries over verbatim to any inner product space.`,
  },
  {
    id: 'hyperplane',
    label: 'Hyperplane',
    title: 'Hyperplane',
    kind: 'definition',
    tags: ['Linear Algebra'],
    dependencies: ['dot-product', 'subspace'],
    definition: String.raw`A **hyperplane** in $\mathbb{R}^n$ is the solution set of a single linear equation
$$\{x \in \mathbb{R}^n : a \cdot x = c\}, \qquad a \neq 0,$$
a flat of dimension $n - 1$ with **normal vector** $a$ — generalizing a line in the plane ($n = 2$) and a plane in space ($n = 3$). Through the origin ($c = 0$) it is a subspace; otherwise an affine translate of one. Hyperplanes are the basic building block of linear constraints, separation, and convex geometry.`,
  },
]
