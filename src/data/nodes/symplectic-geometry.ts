import type { MathNode } from '../types'

export const SYMPLECTIC_GEOMETRY_NODES: MathNode[] = [
  // ── Linear symplectic algebra ───────────────────────────────────────────────
  {
    id: 'symplectic-vector-space',
    label: 'Symplectic Vector Space',
    title: 'Symplectic Vector Space',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['vector-space', 'linear-map', 'dual-space-algebraic'],
    description: String.raw`An inner product measures lengths and angles through a *symmetric* bilinear form; replacing symmetry by *antisymmetry* gives the opposite geometry, where a vector is always orthogonal to itself and "area" rather than "length" is the primitive notion. A **symplectic form** is such an antisymmetric form that is moreover **nondegenerate** — no nonzero vector is orthogonal to everything — and a vector space carrying one is a symplectic vector space. The model is $\mathbb{R}^{2n}$ with $\omega\bigl((q,p),(q',p')\bigr) = p\cdot q' - p'\cdot q$, the signed area swept between position and momentum directions; nondegeneracy forces the dimension to be even. This is the pointwise, linear-algebraic skeleton beneath every symplectic manifold and beneath the phase space of mechanics.`,
    definition: String.raw`A **symplectic form** on a finite-dimensional real vector space $V$ is a bilinear map $\omega : V \times V \to \mathbb{R}$ that is
$$\text{alternating: } \omega(v, v) = 0 \ \forall v \quad (\text{hence antisymmetric } \omega(u,v) = -\omega(v,u)), \qquad \text{nondegenerate: } \bigl(\omega(u, v) = 0 \ \forall v\bigr) \Rightarrow u = 0.$$
Equivalently, the induced **linear map** $\tilde\omega : V \to V^{*}$, $u \mapsto \omega(u, \cdot)$, is an isomorphism. The pair $(V, \omega)$ is a **symplectic vector space**. A subspace $W \subseteq V$ has **symplectic orthogonal** $W^{\omega} = \{\,u \in V : \omega(u, w) = 0 \ \forall w \in W\,\}$; nondegeneracy gives $\dim W + \dim W^{\omega} = \dim V$. A subspace is **isotropic** if $W \subseteq W^{\omega}$, **coisotropic** if $W^{\omega} \subseteq W$, and **Lagrangian** if $W = W^{\omega}$.`,
  },
  {
    id: 'symplectic-basis',
    label: 'Symplectic Basis',
    title: 'Symplectic Basis & Even Dimension',
    kind: 'theorem',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-vector-space', 'basis'],
    description: String.raw`All symplectic vector spaces of a given dimension look the same: there is a single normal form. One can always find a **symplectic basis** $e_1,\dots,e_n,f_1,\dots,f_n$ pairing up "position" and "momentum" directions so that the form takes the standard $\binom{q}{p}$-shape, $\omega(e_i, f_j) = \delta_{ij}$ with all other pairings zero. Producing such a basis is a skew analogue of Gram–Schmidt, and it forces $\dim V = 2n$ to be even — there are no odd-dimensional symplectic vector spaces. This is the linear Darboux theorem, the seed from which the manifold version grows.`,
    statement: String.raw`Let $(V, \omega)$ be a symplectic vector space. Then $\dim V = 2n$ is even, and there is a **basis** $e_1, \dots, e_n, f_1, \dots, f_n$ of $V$ — a **symplectic basis** — with
$$\omega(e_i, e_j) = 0, \qquad \omega(f_i, f_j) = 0, \qquad \omega(e_i, f_j) = \delta_{ij}.$$
In particular any two symplectic vector spaces of equal dimension are isomorphic by a linear map intertwining their forms.`,
    proof: String.raw`Argue by induction on $\dim V$. If $V = \{0\}$ the form is the empty (standard) one and $n = 0$. Otherwise pick any $e_1 \neq 0$. By **nondegeneracy** there is $u$ with $\omega(e_1, u) \neq 0$; rescaling $u$ set $f_1 := u/\omega(e_1, u)$, so $\omega(e_1, f_1) = 1$. The vectors $e_1, f_1$ are independent (a relation $a e_1 + b f_1 = 0$ paired with $f_1$ gives $a = 0$, with $e_1$ gives $b = 0$, using $\omega(e_1,f_1)=1$ and the alternating property), and the form restricted to $W := \operatorname{span}(e_1, f_1)$ is nondegenerate.

Let $W^{\omega} = \{\,v : \omega(v, e_1) = \omega(v, f_1) = 0\,\}$ be the symplectic orthogonal. For any $v \in V$ the vector $v' := v - \omega(v, f_1)\,e_1 + \omega(v, e_1)\,f_1$ satisfies $\omega(v', e_1) = \omega(v, e_1) + \omega(v,e_1)\,\omega(f_1, e_1) = \omega(v,e_1) - \omega(v,e_1) = 0$ (using $\omega(f_1, e_1) = -1$, since the $+\omega(v,e_1)\,f_1$ term contributes $+\omega(v,e_1)\,\omega(f_1, e_1)$ to $\omega(v', e_1)$) and likewise $\omega(v', f_1) = \omega(v, f_1) - \omega(v,f_1)\,\omega(e_1, f_1) = \omega(v,f_1) - \omega(v,f_1) = 0$, so $v' \in W^{\omega}$ and $v \in W + W^{\omega}$; thus $V = W + W^{\omega}$, and $W \cap W^{\omega} = \{0\}$ since $\omega|_W$ is nondegenerate. Hence $V = W \oplus W^{\omega}$. The restriction $\omega|_{W^{\omega}}$ is again **alternating** and **nondegenerate** (if $w \in W^{\omega}$ pairs to $0$ with all of $W^{\omega}$, it pairs to $0$ with all of $V = W \oplus W^{\omega}$, so $w = 0$). By the inductive hypothesis $W^{\omega}$ has even dimension $2(n-1)$ and a symplectic basis $e_2,\dots,e_n,f_2,\dots,f_n$. Adjoining $e_1, f_1$ gives a **basis** of $V$ with the stated pairings, and $\dim V = 2 + 2(n-1) = 2n$. Mapping the symplectic basis of one such space to that of another of equal dimension gives a linear isomorphism preserving the form. $\square$`,
  },

  // ── Symplectic manifolds ────────────────────────────────────────────────────
  {
    id: 'symplectic-manifold',
    label: 'Symplectic Manifold',
    title: 'Symplectic Manifold & Form',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['smooth-manifold', 'differential-form', 'tangent-space', 'symplectic-vector-space'],
    description: String.raw`Globalize the symplectic vector space by attaching one to every tangent space, smoothly: a **symplectic manifold** carries a $2$-form $\omega$ that is nondegenerate at each point — so each tangent space becomes a symplectic vector space — and **closed**, $d\omega = 0$. Nondegeneracy supplies the geometry (it converts functions into vector fields and underlies Hamilton's equations); closedness is the integrability condition that makes that geometry rigid and locally standard, and it is exactly what gives the conserved volume and the absence of any local curvature invariant. Unlike a Riemannian metric, a symplectic form has no local invariants at all — by Darboux's theorem every symplectic manifold looks locally like the standard $\mathbb{R}^{2n}$. The motivating example is the phase space of classical mechanics.`,
    definition: String.raw`A **symplectic manifold** is a pair $(M, \omega)$ where $M$ is a smooth manifold and $\omega$ is a **differential $2$-form** that is
$$\text{closed: } d\omega = 0, \qquad \text{nondegenerate: at each } p,\ \omega_p : T_pM \times T_pM \to \mathbb{R} \text{ is a symplectic form on } T_pM.$$
The form $\omega$ is the **symplectic form** (or **symplectic structure**). By the linear theory every $T_pM$ is a **symplectic vector space**, so $M$ has even dimension $2n$, and $\omega^n = \omega \wedge \cdots \wedge \omega$ ($n$ factors) is nowhere zero. A **symplectomorphism** $(M_1, \omega_1) \to (M_2, \omega_2)$ is a diffeomorphism $\varphi$ with $\varphi^{*}\omega_2 = \omega_1$, the structure-preserving maps of the category. The standard model is $(\mathbb{R}^{2n}, \omega_0)$ with $\omega_0 = \sum_{i=1}^{n} dx^i \wedge dy^i$ in coordinates $(x^1,\dots,x^n,y^1,\dots,y^n)$.`,
  },
  {
    id: 'cotangent-bundle-symplectic',
    label: 'Cotangent Bundle Form',
    title: 'Canonical Form on a Cotangent Bundle',
    kind: 'proposition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'differential-form', 'smooth-manifold', 'hamiltonian-mechanics', 'symplectic-vector-space'],
    description: String.raw`Phase space is not an arbitrary symplectic manifold: it is always the **cotangent bundle** $T^{*}Q$ of a configuration space $Q$, carrying a *canonical*, coordinate-free symplectic form. The construction starts from a tautological $1$-form $\theta$ — built so that it "knows" the covector it sits over — whose exterior derivative $\omega = -d\theta$ is the symplectic form. In the position–momentum coordinates $(q^i, p_i)$ induced by any chart on $Q$ it is exactly $\sum_i dq^i \wedge dp_i$, recovering the canonical symplectic structure of **Hamiltonian mechanics**. This is why every classical phase space is symplectic, with no choice of structure required.`,
    statement: String.raw`Let $Q$ be a smooth $n$-manifold and $M = T^{*}Q$ its cotangent bundle, with projection $\pi : T^{*}Q \to Q$. The **tautological (Liouville) $1$-form** $\theta$ on $M$, defined at a point $\alpha \in T^{*}_q Q$ by
$$\theta_\alpha(\xi) = \alpha\bigl(d\pi_\alpha(\xi)\bigr), \qquad \xi \in T_\alpha(T^{*}Q),$$
has the property that $\omega := -d\theta$ is a **symplectic form** on $T^{*}Q$. In the coordinates $(q^1,\dots,q^n,p_1,\dots,p_n)$ on $T^{*}Q$ induced by a chart $(q^i)$ on $Q$, one has $\theta = \sum_i p_i\, dq^i$ and $\omega = \sum_i dq^i \wedge dp_i$.`,
    proof: String.raw`Work in the induced coordinates: a chart $(q^i)$ on $U \subseteq Q$ gives every covector over $U$ the form $\alpha = \sum_i p_i\, dq^i|_q$, so $(q^i, p_i)$ are coordinates on $\pi^{-1}(U) \subseteq T^{*}Q$ and $\pi(q, p) = q$. For a tangent vector $\xi$ at $\alpha = (q, p)$, the projection $d\pi_\alpha(\xi)$ is its $q$-part, whose $dq^i$-component is $dq^i(\xi)$; hence by definition $\theta_\alpha(\xi) = \alpha\bigl(d\pi_\alpha(\xi)\bigr) = \sum_i p_i\, dq^i(\xi)$, i.e. $\theta = \sum_i p_i\, dq^i$ — a chart-independent object because the defining formula refers only to $\pi$ and the tautological pairing.

Apply the **exterior derivative** from **differential-form**: using $d(p_i\, dq^i) = dp_i \wedge dq^i$ and $d \circ d = 0$,
$$\omega = -d\theta = -\sum_i dp_i \wedge dq^i = \sum_i dq^i \wedge dp_i.$$
This is **closed**, being exact ($d\omega = -d^2\theta = 0$). It is **nondegenerate**: at each point the coframe $dq^1,\dots,dq^n,dp_1,\dots,dp_n$ is a basis of the cotangent space, and pairing $\omega$ with the dual frame shows $\omega(\partial_{q^i}, \partial_{p_j}) = \delta_{ij}$ with $\omega(\partial_{q^i}, \partial_{q^j}) = \omega(\partial_{p_i}, \partial_{p_j}) = 0$, so $\omega_p$ is exactly the standard symplectic form of **symplectic-vector-space** in this basis, hence nondegenerate. Therefore $(T^{*}Q, \omega)$ is a **symplectic manifold**, and the coordinate expression is the canonical structure of **Hamiltonian mechanics**. $\square$`,
  },
  {
    id: 'darboux-theorem',
    label: 'Darboux Theorem',
    title: 'Darboux Theorem',
    kind: 'theorem',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'symplectic-basis', 'diffeomorphism', 'flow-of-a-vector-field', 'differential-form', 'poincare-lemma'],
    description: String.raw`Riemannian geometry has curvature, a local invariant distinguishing a sphere from a plane; symplectic geometry has none. **Darboux's theorem** is the precise statement of this flatness: near any point every symplectic manifold looks identical to the standard $(\mathbb{R}^{2n}, \omega_0)$. There are no local moduli — all the interesting symplectic invariants are global. The modern proof is **Moser's trick**: deform the given form to the constant one along a path, and cancel the deformation by flowing along a cleverly chosen time-dependent vector field, exploiting that closedness makes the difference of the two forms exact.`,
    statement: String.raw`Let $(M, \omega)$ be a symplectic $2n$-manifold and $p \in M$. Then there is a chart $(U, \varphi)$ about $p$ with coordinates $(x^1,\dots,x^n,y^1,\dots,y^n)$ — **Darboux coordinates** — in which the symplectic form is the constant standard form
$$\omega|_U = \sum_{i=1}^{n} dx^i \wedge dy^i.$$
Equivalently, every point has a neighbourhood symplectomorphic to an open set of $(\mathbb{R}^{2n}, \omega_0)$.`,
    proof: String.raw`*Linear normalization.* Since $\omega_p$ is a symplectic form on $T_pM$, by the **symplectic-basis** theorem there is a basis of $T_pM$ in which $\omega_p$ is standard; choosing any chart sending $p$ to $0$ and applying the corresponding linear change of coordinates, we may assume $\omega_0 := \sum_i dx^i \wedge dy^i$ and $\omega$ agree *at the point* $p = 0$, i.e. $\omega_0|_0 = \omega|_0$, on a ball $U$ in $\mathbb{R}^{2n}$.

*Moser's trick (the deformation argument).* Set $\omega_t = (1-t)\omega_0 + t\,\omega$ for $t \in [0,1]$. Each $\omega_t$ is **closed**, and at $0$ all $\omega_t|_0 = \omega_0|_0$ are the *same* nondegenerate form; nondegeneracy is an open condition, so shrinking $U$ to a ball we may assume every $\omega_t$ is nondegenerate on $U$, hence symplectic. The difference $\omega - \omega_0$ is closed and, on the contractible ball $U$, therefore **exact**: $\omega - \omega_0 = d\sigma$ for some $1$-form $\sigma$, which we may take to vanish at $0$. Define a time-dependent vector field $X_t$ by the nondegeneracy condition $\iota_{X_t}\omega_t = -\sigma$ (solvable and smooth since each $\omega_t$ is nondegenerate); as $\sigma$ vanishes at $0$, so does $X_t$, so its **flow** $\psi_t$ fixes $0$ and exists for $t \in [0,1]$ on a possibly smaller neighbourhood. By **Cartan's magic formula** $\mathcal{L}_{X_t} = d\iota_{X_t} + \iota_{X_t} d$, and since $\omega_t$ is closed,
$$\frac{d}{dt}\bigl(\psi_t^{*}\omega_t\bigr) = \psi_t^{*}\Bigl(\mathcal{L}_{X_t}\omega_t + \frac{d\omega_t}{dt}\Bigr) = \psi_t^{*}\bigl(d\,\iota_{X_t}\omega_t + (\omega - \omega_0)\bigr) = \psi_t^{*}\bigl(-d\sigma + d\sigma\bigr) = 0.$$
Hence $\psi_t^{*}\omega_t$ is constant in $t$, so $\psi_1^{*}\omega = \psi_1^{*}\omega_1 = \psi_0^{*}\omega_0 = \omega_0$. Thus the **diffeomorphism** $\psi_1$ pulls $\omega$ back to the standard form $\omega_0$; its inverse, composed with the chart, supplies Darboux coordinates in which $\omega = \sum_i dx^i \wedge dy^i$. $\square$`,
  },

  // ── Hamiltonian dynamics ────────────────────────────────────────────────────
  {
    id: 'hamiltonian-vector-field',
    label: 'Hamiltonian Vector Field',
    title: 'Hamiltonian Vector Field',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'vector-field', 'differential-form', 'tangent-space', 'darboux-theorem'],
    description: String.raw`On a symplectic manifold a single function generates a flow. Nondegeneracy of $\omega$ lets one convert the differential $dH$ of a function $H$ — its gradient information — into a *vector field* $X_H$, by demanding that contracting $\omega$ with $X_H$ reproduce $dH$. There is no metric involved: where a gradient flows "uphill," the **Hamiltonian vector field** flows along the level sets of $H$, which is exactly why $H$ (the energy) is conserved along its own flow. In Darboux coordinates this dictionary is precisely Hamilton's equations $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$.`,
    definition: String.raw`Let $(M, \omega)$ be a symplectic manifold and $H \in C^\infty(M)$ (a **Hamiltonian**). The **Hamiltonian vector field** $X_H$ is the unique **vector field** satisfying
$$\iota_{X_H}\omega = dH, \qquad \text{i.e.}\quad \omega(X_H, \cdot) = dH(\cdot).$$
It is well defined because at each $p$ the map $T_pM \to T_p^{*}M$, $v \mapsto \omega_p(v, \cdot)$, is an isomorphism (**nondegeneracy**), so $X_H(p) = \tilde\omega_p^{-1}(dH_p)$ is determined; smoothness of $\omega$ and $H$ makes $X_H$ smooth. (Some authors use the sign convention $\iota_{X_H}\omega = -dH$.) In **Darboux coordinates** with $\omega = \sum_i dq^i \wedge dp_i$, expanding $X_H = \sum_i (a^i \partial_{q^i} + b_i \partial_{p_i})$ and matching $\iota_{X_H}\omega = dH = \sum_i (\partial_{q^i}H\, dq^i + \partial_{p_i}H\, dp_i)$ gives $X_H = \sum_i \bigl(\partial_{p_i}H\, \partial_{q^i} - \partial_{q^i}H\, \partial_{p_i}\bigr)$.`,
  },
  {
    id: 'darboux-hamilton-equations',
    label: "Hamilton's Equations",
    title: 'Hamiltonian Flow as Hamilton’s Equations',
    kind: 'proposition',
    tags: ['Symplectic Geometry'],
    dependencies: ['hamiltonian-vector-field', 'darboux-theorem', 'flow-of-a-vector-field', 'hamiltonian-mechanics'],
    description: String.raw`The abstract definition of the Hamiltonian vector field is not a new theory of mechanics but the old one in coordinate-free dress. Writing the flow of $X_H$ in Darboux coordinates reproduces **Hamilton's equations** verbatim, so the integral curves of $X_H$ are exactly the trajectories of a mechanical system with Hamiltonian $H$ on phase space. This is the precise sense in which symplectic geometry *is* the geometry of Hamiltonian mechanics.`,
    statement: String.raw`Let $(M, \omega)$ be a symplectic manifold, $H \in C^\infty(M)$, and $X_H$ its Hamiltonian vector field. In any **Darboux coordinates** $(q^1,\dots,q^n,p_1,\dots,p_n)$ (with $\omega = \sum_i dq^i \wedge dp_i$), the **integral curves** $t \mapsto \bigl(q(t), p(t)\bigr)$ of $X_H$ are exactly the solutions of **Hamilton's equations**
$$\dot q^i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q^i}, \qquad i = 1,\dots,n.$$`,
    proof: String.raw`By the **Darboux theorem** such coordinates exist about any point, and in them $\omega = \sum_i dq^i \wedge dp_i$. The coordinate computation in **hamiltonian-vector-field** gives
$$X_H = \sum_i \Bigl(\frac{\partial H}{\partial p_i}\,\frac{\partial}{\partial q^i} - \frac{\partial H}{\partial q^i}\,\frac{\partial}{\partial p_i}\Bigr).$$
By definition of the **flow of a vector field**, an integral curve $\gamma(t) = (q(t), p(t))$ satisfies $\dot\gamma(t) = X_H(\gamma(t))$; reading off the $\partial_{q^i}$ and $\partial_{p_i}$ components gives precisely $\dot q^i = \partial H/\partial p_i$ and $\dot p_i = -\partial H/\partial q^i$. These are exactly the equations defining the motions of **Hamiltonian mechanics**, with $(q, p)$ the canonical position–momentum coordinates on phase space. $\square$`,
  },
  {
    id: 'poisson-bracket',
    label: 'Poisson Bracket',
    title: 'Poisson Bracket',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['hamiltonian-vector-field', 'symplectic-manifold', 'lie-algebra', 'differential-form', 'hamiltonian-flow-preserves-form'],
    description: String.raw`The symplectic form turns the algebra of smooth functions into a **Lie algebra**. The **Poisson bracket** $\{f, g\}$ measures the rate of change of $f$ along the Hamiltonian flow of $g$ (equivalently, pairs the two Hamiltonian vector fields against $\omega$). It is antisymmetric and satisfies the Jacobi identity, so $(C^\infty(M), \{\cdot,\cdot\})$ is an infinite-dimensional Lie algebra, and $f \mapsto X_f$ is a Lie algebra homomorphism to vector fields. The bracket is the algebraic engine of mechanics: a quantity is conserved exactly when it Poisson-commutes with the Hamiltonian, and it is the classical limit of the quantum commutator.`,
    definition: String.raw`Let $(M, \omega)$ be a symplectic manifold and $f, g \in C^\infty(M)$ with **Hamiltonian vector fields** $X_f, X_g$. The **Poisson bracket** is
$$\{f, g\} := \omega(X_f, X_g) = df(X_g) = X_g(f) = -X_f(g).$$
(The equalities follow from $\iota_{X_f}\omega = df$ and $\iota_{X_g}\omega = dg$: $\omega(X_f, X_g) = (\iota_{X_f}\omega)(X_g) = df(X_g) = X_g(f)$, while antisymmetry gives $\omega(X_f, X_g) = -(\iota_{X_g}\omega)(X_f) = -dg(X_f) = -X_f(g)$.) In **Darboux coordinates** $\{f, g\} = \sum_i\bigl(\partial_{q^i} f\, \partial_{p_i} g - \partial_{p_i} f\, \partial_{q^i} g\bigr)$. The bracket is $\mathbb{R}$-bilinear, **antisymmetric** ($\{f,g\} = -\{g,f\}$, immediate from antisymmetry of $\omega$), a derivation in each slot ($\{f, gh\} = \{f,g\}h + g\{f,h\}$), and satisfies the **Jacobi identity** $\{f,\{g,h\}\} + \{g,\{h,f\}\} + \{h,\{f,g\}\} = 0$, so $(C^\infty(M), \{\cdot,\cdot\})$ is a **Lie algebra**. Moreover $X_{\{f,g\}} = -[X_f, X_g]$ (with $[\cdot,\cdot]$ the Lie bracket of vector fields), so $f \mapsto X_f$ is a Lie algebra (anti)homomorphism.`,
    proof: String.raw`Bilinearity is clear; **antisymmetry** is $\{f,g\} = \omega(X_f, X_g) = -\omega(X_g, X_f) = -\{g,f\}$; and the derivation rule follows from $\{f, gh\} = X_{gh}(f)$... more directly, $\{gh, k\} = X_k(gh) = g\,X_k(h) + h\,X_k(g) = g\{h,k\} + h\{g,k\}$ since $X_k$ is a vector field, hence a derivation. The substance is the **Jacobi identity**, obtained in two steps.

*Step 1: $X_{\{f,g\}} = -[X_f, X_g]$.* By **Cartan's magic formula** and $d\omega = 0$, every Hamiltonian field satisfies $\mathcal{L}_{X_f}\omega = d(\iota_{X_f}\omega) + \iota_{X_f}(d\omega) = d(df) + 0 = 0$ (the content of **hamiltonian-flow-preserves-form**). Using the standard identity $\iota_{[X,Y]} = \mathcal{L}_X\,\iota_Y - \iota_Y\,\mathcal{L}_X$ together with $\mathcal{L}_{X_f}\omega = 0$ and $\mathcal{L}_{X_f}(dg) = d(\mathcal{L}_{X_f} g) = d(X_f g)$,
$$\iota_{[X_f, X_g]}\omega = \mathcal{L}_{X_f}(\iota_{X_g}\omega) - \iota_{X_g}(\mathcal{L}_{X_f}\omega) = \mathcal{L}_{X_f}(dg) = d(X_f g) = d(-\{f,g\}) = -\,\iota_{X_{\{f,g\}}}\omega.$$
By **nondegeneracy** of $\omega$ this forces $[X_f, X_g] = -X_{\{f,g\}}$, i.e. $X_{\{f,g\}} = -[X_f, X_g]$.

*Step 2: Jacobi.* Write the cyclic sum $J := \{f,\{g,h\}\} + \{g,\{h,f\}\} + \{h,\{f,g\}\}$. Expand the first term using $\{a, b\} = X_b(a)$ and then $X_{\{g,h\}} = -[X_g, X_h]$ from Step 1:
$$\{f, \{g,h\}\} = X_{\{g,h\}}(f) = -[X_g, X_h](f) = -X_g X_h f + X_h X_g f.$$
Now $X_h f = -\{h, f\}$ (definition), so $X_g X_h f = -X_g(\{h,f\}) = -\{ \{h,f\}, g\}$, and similarly $X_h X_g f = -\{\{g,f\}, h\}$. Hence $\{f,\{g,h\}\} = \{\{h,f\}, g\} - \{\{g,f\}, h\}$. Summing the three cyclic versions and applying antisymmetry $\{\{x,y\},z\} = -\{z,\{x,y\}\}$ to each piece collects every term of $J$ twice with the same sign, giving $J = -2J$ (the six produced terms are, up to sign, the three terms of $J$ each appearing twice); therefore $3J = 0$, so $J = 0$. This is the **Jacobi identity**, and $(C^\infty(M), \{\cdot,\cdot\})$ is a **Lie algebra**, with $f \mapsto X_f$ carrying $\{\cdot,\cdot\}$ to minus the **Lie bracket** of vector fields by Step 1. $\square$`
  },
  {
    id: 'symplectomorphism',
    label: 'Symplectomorphism',
    title: 'Symplectomorphism',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'diffeomorphism', 'differential-form', 'group-action', 'liouville-volume-form'],
    description: String.raw`The structure-preserving maps of symplectic geometry are the **symplectomorphisms** — diffeomorphisms that pull the symplectic form back to itself. They are the symplectic analogue of isometries, but a far larger and more flexible class: because there is no local invariant to preserve, symplectomorphisms can be wild (the group is infinite-dimensional and "$C^0$-rigid" only in subtle global ways, the subject of Gromov's nonsqueezing theorem). The canonical transformations of classical mechanics are exactly the symplectomorphisms of phase space, and every Hamiltonian flow is a one-parameter family of them.`,
    definition: String.raw`A **symplectomorphism** (canonical transformation) between symplectic manifolds $(M_1, \omega_1)$ and $(M_2, \omega_2)$ is a **diffeomorphism** $\varphi : M_1 \to M_2$ with
$$\varphi^{*}\omega_2 = \omega_1,$$
i.e. $\omega_2\bigl(d\varphi_p\, u,\, d\varphi_p\, v\bigr) = \omega_1(u, v)$ for all $p$ and $u, v \in T_p M_1$. The symplectomorphisms of $(M, \omega)$ to itself form a group $\operatorname{Symp}(M, \omega) \le \operatorname{Diff}(M)$ under composition (since $(\varphi\circ\psi)^{*} = \psi^{*}\circ\varphi^{*}$ and $(\varphi^{-1})^{*} = (\varphi^{*})^{-1}$ preserve the identity $\varphi^{*}\omega = \omega$), acting on $M$ by the natural **group action**. Because $\varphi^{*}$ commutes with $\wedge$, a symplectomorphism also preserves the **Liouville volume form** $\omega^n/n!$, hence is volume-preserving.`,
  },
  {
    id: 'hamiltonian-flow-preserves-form',
    label: 'Flow Preserves ω',
    title: 'Hamiltonian Flow is Symplectic',
    kind: 'theorem',
    tags: ['Symplectic Geometry'],
    dependencies: ['hamiltonian-vector-field', 'symplectomorphism', 'flow-of-a-vector-field', 'differential-form', 'symplectic-manifold'],
    description: String.raw`The most important rigidity property of Hamiltonian dynamics: its flow preserves the symplectic form. Each time-$t$ map of the flow of $X_H$ is a symplectomorphism, so the entire geometry — areas, the Poisson bracket, and (taking the top power) phase-space volume — is carried along unchanged. The one-line proof is **Cartan's magic formula** together with the two defining facts $\iota_{X_H}\omega = dH$ and $d\omega = 0$: the Lie derivative of $\omega$ along $X_H$ is $d(dH) = 0$.`,
    statement: String.raw`Let $(M, \omega)$ be a symplectic manifold, $H \in C^\infty(M)$, and let $\varphi_t$ denote the **flow** of the **Hamiltonian vector field** $X_H$ (where defined). Then $\mathcal{L}_{X_H}\omega = 0$, and consequently each $\varphi_t$ is a **symplectomorphism**: $\varphi_t^{*}\omega = \omega$.`,
    proof: String.raw`By **Cartan's magic formula**, for any vector field $X$ and form $\alpha$, $\mathcal{L}_X \alpha = d(\iota_X \alpha) + \iota_X(d\alpha)$. Apply it to $X = X_H$, $\alpha = \omega$:
$$\mathcal{L}_{X_H}\omega = d(\iota_{X_H}\omega) + \iota_{X_H}(d\omega) = d(dH) + \iota_{X_H}(0) = 0,$$
using the defining relation $\iota_{X_H}\omega = dH$ of **hamiltonian-vector-field**, the identity $d \circ d = 0$ from **differential-form**, and closedness $d\omega = 0$ of the symplectic form.

Now fix $p$ in the domain and consider $t \mapsto \varphi_t^{*}\omega$ along the **flow of the vector field** $X_H$. The defining property of the Lie derivative gives
$$\frac{d}{dt}\bigl(\varphi_t^{*}\omega\bigr) = \varphi_t^{*}\bigl(\mathcal{L}_{X_H}\omega\bigr) = \varphi_t^{*}(0) = 0,$$
so $\varphi_t^{*}\omega$ is constant in $t$; at $t = 0$, $\varphi_0 = \mathrm{id}$ gives $\varphi_0^{*}\omega = \omega$. Hence $\varphi_t^{*}\omega = \omega$ for all $t$, and each $\varphi_t$ (a diffeomorphism onto its image, by the flow's group law) is a **symplectomorphism**. $\square$`,
  },

  // ── Lagrangian submanifolds & moment maps ───────────────────────────────────
  {
    id: 'lagrangian-submanifold',
    label: 'Lagrangian Submanifold',
    title: 'Lagrangian Submanifold',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'submanifold', 'symplectic-vector-space', 'cotangent-bundle-symplectic', 'differential-form'],
    description: String.raw`The distinguished submanifolds of a symplectic manifold are the **Lagrangian** ones: half-dimensional submanifolds on which the symplectic form vanishes identically. They are as large as an isotropic submanifold can be (a subspace on which $\omega$ vanishes has dimension at most $n$), and they encode an astonishing amount of structure — Weinstein's creed is that "everything is a Lagrangian submanifold." The graph of a symplectomorphism is Lagrangian in a product; the fibers and the zero section of a cotangent bundle are Lagrangian; generating functions of canonical transformations are descriptions of Lagrangians. They are the geometric home of the WKB/semiclassical approximation.`,
    definition: String.raw`Let $(M^{2n}, \omega)$ be a symplectic manifold. An **immersed/embedded submanifold** $L \subseteq M$ is **isotropic** if $\omega$ restricts to zero on it — $\omega_p(u, v) = 0$ for all $p \in L$ and $u, v \in T_pL$, i.e. $T_pL \subseteq (T_pL)^{\omega}$ — and **Lagrangian** if it is isotropic of maximal dimension $\dim L = n = \tfrac12 \dim M$, equivalently $T_pL = (T_pL)^{\omega}$ at every point (a **Lagrangian** subspace of the symplectic vector space $T_pM$, in the sense of **symplectic-vector-space**). Examples in $(T^{*}Q, -d\theta)$: the zero section $Q \hookrightarrow T^{*}Q$ and each cotangent fiber $T_q^{*}Q$ are Lagrangian, as is the graph $\{(q, df_q)\} = \operatorname{im}(df)$ of the differential of any $f \in C^\infty(Q)$.`,
  },
  {
    id: 'moment-map',
    label: 'Moment Map',
    title: 'Moment Map',
    kind: 'definition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'hamiltonian-vector-field', 'poisson-bracket', 'symplectomorphism', 'lie-group', 'lie-algebra', 'group-action'],
    description: String.raw`When a Lie group acts on a symplectic manifold preserving the form, the **moment map** packages all the conserved quantities the symmetry produces into a single map into the dual of the Lie algebra. It is the geometric, group-theoretic form of Noether's theorem: linear momentum is the moment map of the translation group, angular momentum that of the rotation group. The condition is that each infinitesimal symmetry be the Hamiltonian vector field of the corresponding component of $\mu$, and that the components Poisson-commute the way the Lie algebra brackets. Moment maps are the input to symplectic (Marsden–Weinstein) reduction, the construction that quotients out a symmetry to lower the dimension.`,
    definition: String.raw`Let a **Lie group** $G$ with **Lie algebra** $\mathfrak{g}$ act on a symplectic manifold $(M, \omega)$ by **symplectomorphisms** (a symplectic **group action**). Each $\xi \in \mathfrak{g}$ generates a **fundamental vector field** $\xi_M$ on $M$ (the velocity of the action of $\exp(t\xi)$). A **moment map** is a smooth map
$$\mu : M \to \mathfrak{g}^{*} \qquad \text{such that, writing } \mu^\xi(p) := \langle \mu(p), \xi\rangle \in C^\infty(M),$$
(i) each component is a Hamiltonian for the corresponding generator: $\iota_{\xi_M}\omega = d\mu^\xi$, i.e. $\xi_M = X_{\mu^\xi}$ is the **Hamiltonian vector field** of $\mu^\xi$; and (ii) $\mu$ is **equivariant** for the coadjoint action of $G$ on $\mathfrak{g}^{*}$. Equivariance always implies that the assignment $\xi \mapsto \mu^\xi$ is a **Lie algebra** homomorphism into $(C^\infty(M), \{\cdot,\cdot\})$ — $\mu^{[\xi,\eta]} = \{\mu^\xi, \mu^\eta\}$ for the **Poisson bracket** — by differentiating the equivariance identity at the identity of $G$; the converse holds when $G$ is **connected** (the infinitesimal homomorphism property integrates to group-level equivariance), so for connected $G$ the two formulations of (ii) are equivalent. Conditions (i)–(ii) make each $\mu^\xi$ a conserved quantity of any $G$-invariant Hamiltonian.`,
  },

  // ── Volume & conservation ───────────────────────────────────────────────────
  {
    id: 'liouville-volume-form',
    label: 'Liouville Volume',
    title: 'Liouville Volume Form',
    kind: 'proposition',
    tags: ['Symplectic Geometry'],
    dependencies: ['symplectic-manifold', 'differential-form', 'orientation', 'darboux-theorem'],
    description: String.raw`A symplectic manifold is automatically oriented and carries a canonical volume, built from the symplectic form alone. The top exterior power $\omega^n$ is nowhere vanishing — that is precisely nondegeneracy in disguise — so $\omega^n/n!$ is a volume form, the **Liouville volume**. In Darboux coordinates it is the standard Lebesgue volume of phase space, $dq^1 \wedge dp_1 \wedge \cdots \wedge dq^n \wedge dp_n$ (reordering to all $q$'s then all $p$'s introduces the sign $(-1)^{n(n-1)/2}$). Because symplectomorphisms preserve $\omega$, they preserve this volume; that fact, applied to Hamiltonian flows, is Liouville's theorem.`,
    statement: String.raw`Let $(M^{2n}, \omega)$ be a symplectic manifold. Then the $2n$-form $\omega^n = \underbrace{\omega \wedge \cdots \wedge \omega}_{n}$ is nowhere zero, so it **orients** $M$ and
$$\mathrm{vol}_\omega := \frac{1}{n!}\,\omega^n$$
is a volume form, the **Liouville volume form**. In **Darboux coordinates** ($\omega = \sum_i dq^i \wedge dp_i$) it equals $dq^1 \wedge dp_1 \wedge \cdots \wedge dq^n \wedge dp_n$ (equivalently $(-1)^{n(n-1)/2}\, dq^1 \wedge \cdots \wedge dq^n \wedge dp_1 \wedge \cdots \wedge dp_n$). Any **symplectomorphism** preserves $\mathrm{vol}_\omega$.`,
    proof: String.raw`The statement is local, so by the **Darboux theorem** compute in coordinates where $\omega = \sum_{i=1}^n dq^i \wedge dp_i$. Each summand $dq^i \wedge dp_i$ is a $2$-form, and these commute under $\wedge$ (even degree), while $dq^i \wedge dp_i \wedge dq^i \wedge dp_i = 0$ (a repeated factor). Expanding the $n$-th power, only the terms using all $n$ distinct blocks survive, and they appear with multiplicity $n!$ (the number of orderings):
$$\omega^n = \Bigl(\sum_i dq^i \wedge dp_i\Bigr)^{\!n} = n!\; dq^1 \wedge dp_1 \wedge \cdots \wedge dq^n \wedge dp_n.$$
Thus $\mathrm{vol}_\omega = \omega^n/n! = dq^1 \wedge dp_1 \wedge \cdots \wedge dq^n \wedge dp_n$ — a coordinate volume form with coefficient $+1$ in this alternating $q,p$ order, hence nowhere zero. (Reordering to the all-$q$'s-then-all-$p$'s convention is the permutation whose inversions are the pairs $(dp_i, dq^j)$ with $j > i$, of which there are $\sum_{i=1}^n (n-i) = n(n-1)/2$, so $\mathrm{vol}_\omega = (-1)^{n(n-1)/2}\, dq^1\wedge\cdots\wedge dq^n \wedge dp_1\wedge\cdots\wedge dp_n$ — the sign is $-1$ for $n \equiv 2,3 \pmod 4$ and $+1$ otherwise.) A nowhere-vanishing top form is exactly an **orientation** (by **orientation**), and $\mathrm{vol}_\omega = \omega^n/n!$ is the associated volume form. Finally, if $\varphi^{*}\omega = \omega$ then $\varphi^{*}(\omega^n) = (\varphi^{*}\omega)^n = \omega^n$ because pullback is a ring homomorphism for $\wedge$; hence $\varphi^{*}\mathrm{vol}_\omega = \mathrm{vol}_\omega$. $\square$`,
  },
  {
    id: 'liouville-theorem-symplectic',
    label: "Liouville's Theorem",
    title: "Liouville's Theorem (Phase-Space Volume)",
    kind: 'theorem',
    tags: ['Symplectic Geometry'],
    dependencies: ['liouville-volume-form', 'hamiltonian-flow-preserves-form', 'hamiltonian-vector-field', 'flow-of-a-vector-field'],
    description: String.raw`Hamiltonian flow is incompressible: as a region of phase space is dragged along by the dynamics it changes shape arbitrarily but never changes volume. This is **Liouville's theorem**, the cornerstone of statistical mechanics — it is what makes the phase-space (microcanonical) measure invariant, so that time evolution is measure-preserving and ergodic theory applies. It is an immediate consequence of two facts already in hand: the Liouville volume is built from $\omega$, and the Hamiltonian flow preserves $\omega$. Equivalently, every Hamiltonian vector field is divergence-free with respect to the Liouville volume.`,
    statement: String.raw`Let $(M, \omega)$ be a symplectic $2n$-manifold, $H \in C^\infty(M)$, and $\varphi_t$ the **flow** of the **Hamiltonian vector field** $X_H$. Then $\varphi_t$ preserves the **Liouville volume form** $\mathrm{vol}_\omega = \omega^n/n!$:
$$\varphi_t^{*}\,\mathrm{vol}_\omega = \mathrm{vol}_\omega,$$
so for every (measurable, finite-volume) region $A$ in the domain, $\mathrm{vol}_\omega\bigl(\varphi_t(A)\bigr) = \mathrm{vol}_\omega(A)$. Equivalently, $\mathcal{L}_{X_H}\mathrm{vol}_\omega = 0$: the Hamiltonian field is **divergence-free** for the Liouville volume.`,
    proof: String.raw`By the theorem **hamiltonian-flow-preserves-form**, each $\varphi_t$ is a symplectomorphism, $\varphi_t^{*}\omega = \omega$. Pullback commutes with the wedge product, so
$$\varphi_t^{*}\,\mathrm{vol}_\omega = \varphi_t^{*}\Bigl(\frac{\omega^n}{n!}\Bigr) = \frac{(\varphi_t^{*}\omega)^n}{n!} = \frac{\omega^n}{n!} = \mathrm{vol}_\omega.$$
Integrating, $\mathrm{vol}_\omega(\varphi_t(A)) = \int_{\varphi_t(A)} \mathrm{vol}_\omega = \int_A \varphi_t^{*}\mathrm{vol}_\omega = \int_A \mathrm{vol}_\omega = \mathrm{vol}_\omega(A)$ by the change-of-variables/pullback formula for integrals of top forms. Differentiating $\varphi_t^{*}\mathrm{vol}_\omega = \mathrm{vol}_\omega$ at $t = 0$ along the **flow of the vector field** $X_H$ gives $\mathcal{L}_{X_H}\mathrm{vol}_\omega = \tfrac{d}{dt}\big|_0 \varphi_t^{*}\mathrm{vol}_\omega = 0$; since $\mathcal{L}_{X}(\mathrm{vol}) = (\operatorname{div} X)\,\mathrm{vol}$ for any volume form, $\operatorname{div} X_H = 0$. $\square$`,
  },
  {
    id: 'poisson-conserved-quantity',
    label: 'Conserved Quantities',
    title: 'Conserved Quantities & the Poisson Bracket',
    kind: 'proposition',
    tags: ['Symplectic Geometry'],
    dependencies: ['poisson-bracket', 'hamiltonian-vector-field', 'flow-of-a-vector-field', 'noethers-theorem'],
    description: String.raw`Conservation laws have a one-line characterization in symplectic geometry: a quantity is constant along the motion exactly when it Poisson-commutes with the Hamiltonian. Energy is conserved because $\{H, H\} = 0$ by antisymmetry; any $f$ with $\{f, H\} = 0$ is an integral of motion, and two such combine to give a third via the bracket (the Poisson theorem). This is the Hamiltonian face of **Noether's theorem** — a continuous symmetry gives an invariant function whose Hamiltonian vector field generates the symmetry — repackaged so that the symmetry-conservation correspondence becomes the statement that $f \mapsto X_f$ is a Lie algebra map.`,
    statement: String.raw`Let $(M, \omega)$ be a symplectic manifold, $H \in C^\infty(M)$, and $\varphi_t$ the Hamiltonian flow of $X_H$. For $f \in C^\infty(M)$, along any integral curve of $X_H$
$$\frac{d}{dt}\,\bigl(f \circ \varphi_t\bigr) = \{f, H\} \circ \varphi_t.$$
Hence $f$ is **conserved** (constant along every solution) if and only if $\{f, H\} = 0$. In particular $H$ itself is conserved ($\{H, H\} = 0$), and if $f, g$ are both conserved then so is $\{f, g\}$.`,
    proof: String.raw`By definition of the **flow of a vector field**, $\tfrac{d}{dt}(f\circ\varphi_t)(p) = (X_H f)(\varphi_t(p))$. The **Poisson bracket** identity $\{a, b\} = X_b(a)$ applied with $a = f$, $b = H$ gives directly $\{f, H\} = X_H(f)$. Thus $\tfrac{d}{dt}(f\circ\varphi_t) = \{f, H\}\circ\varphi_t$.

If $\{f, H\} = 0$ this derivative vanishes, so $f\circ\varphi_t$ is constant: $f$ is conserved. Conversely, if $f$ is conserved along *every* solution then $\{f, H\} = X_H f = 0$ everywhere (each point lies on a solution). Taking $f = H$ gives $\{H, H\} = 0$ by **antisymmetry** of the bracket, so energy is conserved. If $\{f, H\} = \{g, H\} = 0$, the **Jacobi identity** of the Poisson bracket gives $\{\{f, g\}, H\} = \{f, \{g, H\}\} - \{g, \{f, H\}\} = \{f, 0\} - \{g, 0\} = 0$, so $\{f, g\}$ is conserved (Poisson's theorem). This is the symplectic formulation of **Noether's theorem**: a one-parameter symmetry generated by $X_f$ preserves $H$ — i.e. $X_f H = \{H, f\} = 0$ — precisely when its generating function $f$ is a conserved quantity. $\square$`,
  },
]
