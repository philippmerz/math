# Field priorities

The next 20 mathematical fields to add, ordered by value. "Value" weighs four things: how foundational/central the field is, how strongly it connects to areas already in the graph (cross-links over redundancy), how large a coverage gap it fills, and how broadly it is used. Each entry notes the existing nodes it would build on or link to.

Current areas (24): Algebra, Algebraic Topology, Analysis, Category Theory, Combinatorics, Complex Analysis, Differential Equations, Differential Geometry, Functional Analysis, Geometry, Graph Theory, Linear Algebra, Logic, Measure Theory, Multivariable Calculus, Number Theory, Optimization, Order Theory, Probability, Set Theory, Statistics, Topology, Trigonometry, Type Theory.

## Ranked

1. **Representation Theory** — groups and algebras acting on vector spaces; characters, irreducibles, Schur's lemma, Maschke. Ties **Algebra ↔ Linear Algebra** tightly (builds on `group`, `vector-space`, `spectral-theorem`, `inner-product-space`); central to modern algebra, number theory, and physics. Highest connectivity-to-strong-areas of anything missing.

2. **Commutative Algebra** — rings, ideals, modules, localization, Noetherian rings, Nullstellensatz. The connective tissue beneath algebraic geometry and algebraic number theory; deepens existing `ideal`, `quotient-ring`, `module`, `ring-homomorphism`. Build this *before* Algebraic Geometry.

3. **Theory of Computation** (computability & complexity) — Turing machines, decidability, the halting problem, automata, P vs NP, NP-completeness. The missing **computer-science pillar**; links **Logic** (`godel-incompleteness`), **Type Theory**, **Combinatorics**, and the `hamiltonian-path`/four-color computer-proof threads.

4. **Homological Algebra** — chain complexes, exact sequences, Ext/Tor, derived functors, diagram lemmas. Unifies **Algebra, Algebraic Topology, Category Theory**; very high payoff for low marginal cost since `chain-complex`, `exact-sequence`, and `abelian-category` already exist.

5. **Fourier / Harmonic Analysis** — Fourier series and transform, convolution, Parseval/Plancherel, sampling. Bridges **Analysis, Functional Analysis** (`hilbert-basis`, `lp-space`, `L²`), and PDE; enormously applied (signal processing, physics).

6. **Partial Differential Equations** — heat, wave, Laplace equations; weak solutions, Sobolev spaces, separation of variables. The applied-math core; extends **Differential Equations** and links **Functional Analysis** and **Multivariable Calculus** (`divergence-theorem`, `laplacian`).

7. **Algebraic Geometry** — affine/projective varieties, the Zariski topology, morphisms, schemes. One of the great pillars; depends on Commutative Algebra (#2), so sequence them together. Links **Algebra, Topology, Number Theory**.

8. **Stochastic Processes** — Markov chains, martingales, Poisson processes, Brownian motion. Extends **Probability** (`probability-space`, `conditional-expectation`); the backbone of mathematical finance, queueing, and statistical physics.

9. **Information Theory** — entropy, mutual information, KL divergence, channel capacity, source/channel coding. Bridges **Probability** and computer science; conceptually delightful and heavily applied (ML, communication).

10. **Game Theory** — strategic & extensive form, dominance, Nash equilibrium, minimax. Pays off the **Brouwer fixed point** node directly (Nash via Brouwer/Kakutani), and links **Optimization** and **Probability**; foundational to economics.

11. **Differential Topology** — smooth maps, the inverse/implicit function theorems on manifolds, transversality, Sard's theorem, degree, Morse theory. The bridge between **Differential Geometry** and **Algebraic Topology**.

12. **Lie Theory** — Lie groups and algebras, the exponential map, the bracket, root systems, representations. Deepens the existing `lie-group`/`lie-algebra` nodes; bridges **Differential Geometry, Algebra, Representation Theory**, and physics.

13. **Algebraic Number Theory** — number fields, rings of integers, prime factorization of ideals, ramification, units. Bridges **Number Theory ↔ Commutative Algebra**; deepens `quadratic-reciprocity` and the arithmetic of `ideal`s.

14. **Analytic Number Theory** — the Riemann zeta function, Dirichlet L-functions, the analytic proof of the prime number theorem, sieve methods. Bridges **Number Theory ↔ Complex Analysis**; deepens the `prime-number-theorem`/zeta hooks.

15. **Dynamical Systems & Ergodic Theory** — orbits, fixed points and stability, bifurcations, chaos, measure-preserving maps, the ergodic theorems. Bridges **Differential Equations, Analysis, Measure Theory**; the rigorous home of the Lorenz/chaos story.

16. **Numerical Analysis** — floating point and conditioning, interpolation, quadrature, iterative linear solvers, finite differences/elements. Broadly applied; links **Linear Algebra, Analysis, PDE, Optimization**.

17. **Convex Analysis** — convex sets and functions, supporting/separating hyperplanes, conjugacy, subgradients, duality. Deepens **Optimization** and links **Geometry** (the new `hyperplane`/separation); the theory behind why convex problems are tractable.

18. **Calculus of Variations** — functionals, the Euler–Lagrange equation, geodesics, least action, constraints. Bridges **Analysis, PDE, Differential Geometry**, and physics; the origin of much of functional analysis.

19. **Model Theory** — structures, theories, elementary equivalence, compactness, types, categoricity. Deepens **Logic** (`compactness-theorem`, `lowenheim-skolem` already present); the semantic half of mathematical logic.

20. **Machine Learning Theory** — empirical risk minimization, bias–variance, VC dimension and generalization, kernels, regularization. Bridges **Statistics, Probability, Optimization**; high contemporary relevance and a natural sink for `bias-variance-tradeoff`, `gradient-descent`, and `rkhs`-style ideas.

## Honorable mentions (next 20)

Operator Algebras (C\*/von Neumann, quantum) · Set Theory depth (forcing, large cardinals) · Coding Theory · Universal Algebra · Symplectic Geometry · Proof Theory · Tensor/Multilinear Algebra · Descriptive Set Theory · Knot Theory · Spectral Geometry.
