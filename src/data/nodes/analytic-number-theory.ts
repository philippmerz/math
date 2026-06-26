import type { MathNode } from '../types'

export const ANALYTIC_NUMBER_THEORY_NODES: MathNode[] = [
  // ── Arithmetic functions and convolution ────────────────────────────────────
  {
    id: 'arithmetic-function',
    label: 'Arithmetic Function',
    title: 'Arithmetic Function',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['prime-number', 'complex-numbers'],
    description: String.raw`The raw material of the subject is a function defined on the positive integers — the divisor count $\tau(n)$, the sum of divisors $\sigma(n)$, Euler's totient $\varphi(n)$, the Möbius function $\mu(n)$. The richest of these are the **multiplicative** ones, whose value on a number is the product of its values on the coprime parts, so that a multiplicative function is entirely determined by what it does on prime powers; the prime factorization of $n$ then dictates $f(n)$. Some of the most important functions of the theory (the von Mangoldt function $\Lambda$, the logarithm) are *not* multiplicative, but the multiplicative ones are the ones that interact cleanly with the Euler products of the next sections.`,
    definition: String.raw`An **arithmetic function** is a function $f : \mathbb{Z}_{\ge 1} \to \mathbb{C}$. It is **multiplicative** if $f(1) = 1$ and $f(mn) = f(m)f(n)$ whenever $\gcd(m, n) = 1$, and **completely multiplicative** if $f(mn) = f(m)f(n)$ for all $m, n$. A multiplicative $f$ is determined by its values on prime powers: if $n = \prod_i p_i^{a_i}$ then $f(n) = \prod_i f(p_i^{a_i})$, using that the $p_i^{a_i}$ are pairwise coprime.`,
  },
  {
    id: 'dirichlet-convolution',
    label: 'Dirichlet Convolution',
    title: 'Dirichlet Convolution',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['arithmetic-function', 'divisibility'],
    description: String.raw`Arithmetic functions can be multiplied in a way that respects divisibility rather than ordinary multiplication: the **Dirichlet convolution** of $f$ and $g$ sums $f(d)g(n/d)$ over all factorizations $n = d \cdot (n/d)$. This product is commutative and associative, has the indicator of $1$ as identity, and turns the multiplicative functions into a group under convolution — and, crucially, it is exactly the operation that multiplication of Dirichlet series performs on their coefficients. Many identities of number theory (such as $\sum_{d \mid n}\varphi(d) = n$, or Möbius inversion) are statements about this product.`,
    definition: String.raw`The **Dirichlet convolution** of arithmetic functions $f, g$ is the arithmetic function
$$(f * g)(n) = \sum_{d \mid n} f(d)\,g(n/d) = \sum_{ab = n} f(a)\,g(b),$$
the sum over all ordered factorizations $n = ab$ into positive integers. The **identity** is $\varepsilon$ with $\varepsilon(1) = 1$ and $\varepsilon(n) = 0$ for $n > 1$, so that $f * \varepsilon = f$. The constant function $\mathbf{1}(n) = 1$ and the identity $\mathrm{id}(n) = n$ are standard building blocks.`,
    proof: String.raw`**Commutativity, associativity, identity.** Commutativity is the symmetry $(f*g)(n) = \sum_{ab=n} f(a)g(b) = \sum_{ab=n} g(b)f(a) = (g*f)(n)$. For associativity, both $((f*g)*h)(n)$ and $(f*(g*h))(n)$ expand to the single symmetric sum $\sum_{abc = n} f(a)g(b)h(c)$ over ordered factorizations of $n$ into three factors, by **divisibility** grouping the inner divisor sums. The identity law $f * \varepsilon = f$ holds since $(f*\varepsilon)(n) = \sum_{ab=n} f(a)\varepsilon(b) = f(n)$, the only surviving term being $b = 1$, $a = n$. Thus arithmetic functions with $f(1) \neq 0$ form a commutative monoid under $*$ with identity $\varepsilon$, in which such $f$ are invertible (its inverse $f^{-1}$ is defined recursively by $f^{-1}(1) = 1/f(1)$ and $f^{-1}(n) = -f(1)^{-1}\sum_{d \mid n,\, d < n} f(n/d) f^{-1}(d)$). $\square$`,
  },
  {
    id: 'mobius-function',
    label: 'Möbius Function',
    title: 'Möbius Function',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['arithmetic-function', 'fundamental-theorem-of-arithmetic', 'dirichlet-convolution', 'binomial-theorem'],
    description: String.raw`The Möbius function is the sign-keeping device of inclusion–exclusion over divisors: it vanishes on numbers with a repeated prime factor, and on a squarefree number it records the parity of the number of prime factors. Its defining property is that summing $\mu$ over the divisors of $n$ gives $1$ for $n = 1$ and $0$ for every larger $n$ — exactly the cancellation that inclusion–exclusion needs. This makes $\mu$ the Dirichlet-convolution inverse of the constant function $\mathbf{1}$, the algebraic fact underlying Möbius inversion.`,
    definition: String.raw`The **Möbius function** $\mu : \mathbb{Z}_{\ge 1} \to \{-1, 0, 1\}$ is defined via the prime factorization given by the **fundamental theorem of arithmetic**:
$$\mu(n) = \begin{cases} 1 & n = 1, \\ (-1)^k & n = p_1 p_2 \cdots p_k \text{ a product of } k \text{ distinct primes (squarefree)}, \\ 0 & n \text{ is divisible by } p^2 \text{ for some prime } p. \end{cases}$$
It is **multiplicative**: $\mu(mn) = \mu(m)\mu(n)$ for coprime $m, n$.`,
    proof: String.raw`**Key identity $\sum_{d \mid n}\mu(d) = \varepsilon(n)$, i.e. $\mu * \mathbf{1} = \varepsilon$.** For $n = 1$ the sum is $\mu(1) = 1$. For $n > 1$, by the **fundamental theorem of arithmetic** write the radical (product of distinct primes dividing $n$) as $p_1 \cdots p_r$ with $r \ge 1$. Only squarefree divisors contribute (others have $\mu = 0$), and a squarefree divisor is a choice of a subset $S \subseteq \{p_1, \dots, p_r\}$, contributing $\mu = (-1)^{|S|}$. Hence
$$\sum_{d \mid n}\mu(d) = \sum_{S \subseteq \{p_1,\dots,p_r\}} (-1)^{|S|} = \sum_{j=0}^{r}\binom{r}{j}(-1)^j = (1 - 1)^r = 0$$
by the binomial theorem. So $\mu * \mathbf{1} = \varepsilon$: $\mu$ is the Dirichlet inverse of $\mathbf{1}$. Multiplicativity is immediate from the definition (for coprime $m, n$ both squarefree, the prime factors are disjoint and the signs multiply; if either has a square factor so does $mn$ and both sides vanish). $\square$`,
  },
  {
    id: 'mobius-inversion',
    label: 'Möbius Inversion',
    title: 'Möbius Inversion Formula',
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['mobius-function', 'dirichlet-convolution'],
    description: String.raw`Möbius inversion is the divisor-sum analogue of the fundamental theorem of calculus: if one function is the running divisor sum of another, the second can be recovered from the first by twisting with the Möbius function. It is inclusion–exclusion in its cleanest algebraic form, and it is nothing more than the statement that the constant function $\mathbf{1}$ and the Möbius function $\mu$ are inverse to each other under Dirichlet convolution — so applying $\mu *$ undoes applying $\mathbf{1} *$.`,
    statement: String.raw`Let $f, g$ be arithmetic functions. Then
$$g(n) = \sum_{d \mid n} f(d) \quad \text{for all } n \qquad \Longleftrightarrow \qquad f(n) = \sum_{d \mid n}\mu(d)\,g(n/d) \quad \text{for all } n.$$
Equivalently, $g = f * \mathbf{1}$ if and only if $f = \mu * g$.`,
    proof: String.raw`The hypothesis $g(n) = \sum_{d \mid n} f(d)$ is exactly $g = f * \mathbf{1}$ in the language of **Dirichlet convolution**. By the key identity of the **Möbius function**, $\mu * \mathbf{1} = \varepsilon$, the convolution identity. Convolving $g = f * \mathbf{1}$ on the left by $\mu$ and using commutativity and associativity of $*$,
$$\mu * g = \mu * (f * \mathbf{1}) = f * (\mu * \mathbf{1}) = f * \varepsilon = f,$$
which written out is $f(n) = \sum_{d \mid n}\mu(d)\,g(n/d)$. Conversely, if $f = \mu * g$, convolve by $\mathbf{1}$: $\mathbf{1} * f = \mathbf{1} * \mu * g = \varepsilon * g = g$, i.e. $g = f * \mathbf{1}$. $\square$`,
  },

  // ── Dirichlet series and the zeta function ──────────────────────────────────
  {
    id: 'dirichlet-series',
    label: 'Dirichlet Series',
    title: 'Dirichlet Series',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['arithmetic-function', 'dirichlet-convolution', 'complex-numbers'],
    description: String.raw`A Dirichlet series is the generating function suited to multiplicative structure: it packages an arithmetic function $a_n$ as $\sum a_n n^{-s}$ in a complex variable $s$. Two features make it the central tool of the theory. First, multiplying two Dirichlet series convolves their coefficients — the product is the Dirichlet series of the Dirichlet convolution — so arithmetic identities become identities of analytic functions. Second, a Dirichlet series converges on a half-plane and defines a holomorphic function there, so the analytic behaviour of that function (poles, zeros, growth) reflects back as arithmetic information about the $a_n$. This dictionary between arithmetic and complex analysis is what powers the deepest theorems about primes.`,
    definition: String.raw`The **Dirichlet series** of an arithmetic function $a : \mathbb{Z}_{\ge 1} \to \mathbb{C}$ is
$$D_a(s) = \sum_{n=1}^{\infty} \frac{a_n}{n^s}, \qquad s = \sigma + it \in \mathbb{C}.$$
There is an **abscissa of convergence** $\sigma_c \in [-\infty, \infty]$ such that the series converges for $\Re s > \sigma_c$ and diverges for $\Re s < \sigma_c$, and a (generally larger) **abscissa of absolute convergence** $\sigma_a$, with $\sigma_c \le \sigma_a \le \sigma_c + 1$. The series defines a function $D_a$ that is **holomorphic** on the open half-plane $\Re s > \sigma_c$. For two series with $\Re s$ large enough, multiplication corresponds to **Dirichlet convolution** of coefficients:
$$D_a(s)\,D_b(s) = \sum_{n=1}^{\infty}\frac{(a * b)(n)}{n^s}, \qquad (a*b)(n) = \sum_{d \mid n} a_d\,b_{n/d}.$$`,
    proof: String.raw`**The multiplication law.** For $\Re s$ large enough that $\sum_n |a_n| n^{-\sigma}$ and $\sum_n |b_n| n^{-\sigma}$ both converge, the two series converge absolutely, so their product may be rearranged. Grouping the terms $a_d d^{-s} \cdot b_e e^{-s}$ by the value $n = de$ of the product of indices (an instance of **Dirichlet convolution**, since for fixed $n$ the pairs $(d, e)$ with $de = n$ are exactly the divisors $d \mid n$ with $e = n/d$),
$$\Bigl(\sum_d \frac{a_d}{d^s}\Bigr)\Bigl(\sum_e \frac{b_e}{e^s}\Bigr) = \sum_{d, e}\frac{a_d b_e}{(de)^s} = \sum_{n=1}^{\infty}\frac{1}{n^s}\sum_{de = n} a_d b_e = \sum_{n=1}^{\infty}\frac{(a*b)(n)}{n^s}.$$
Absolute convergence justifies the rearrangement (Fubini for series). **Holomorphy on $\Re s > \sigma_c$.** Each partial sum $\sum_{n \le N} a_n n^{-s} = \sum_{n \le N} a_n e^{-s\log n}$ is entire, so it suffices to show the series converges locally uniformly on $\Re s > \sigma_c$, after which the limit is holomorphic by the Weierstrass/Morera theorem on locally-uniform limits of holomorphic functions. On the absolute half-plane $\Re s > \sigma_a$ this is immediate by comparison: $|a_n n^{-s}| = |a_n| n^{-\sigma} \le |a_n| n^{-\sigma_0}$ for $\sigma \ge \sigma_0 > \sigma_a$, dominated by the convergent $\sum_n |a_n| n^{-\sigma_0}$, giving uniform convergence on $\{\Re s \ge \sigma_0\}$. On the conditional strip $\sigma_c < \Re s \le \sigma_a$ comparison fails, and one argues by **Abel (partial) summation**. Fix a point $s_0$ with $\Re s_0 > \sigma_c$ where $\sum a_n n^{-s_0}$ converges, and set $A(u) = \sum_{n \le u}(a_n n^{-s_0})$, which is bounded since the series at $s_0$ converges. For $w = s - s_0$ with $\Re w > 0$, partial summation rewrites the tail $\sum_{M < n \le N} a_n n^{-s} = \sum_{M < n \le N} (a_n n^{-s_0})\,n^{-w}$ as $A(N)N^{-w} - A(M)M^{-w} + w\int_M^N A(u)\,u^{-w-1}\,du$; the boundedness of $A$ together with $|n^{-w}| = n^{-\Re w}$ and $\bigl|w\int_M^\infty u^{-w-1}du\bigr| \le |w|/\Re w$ shows this tail is small uniformly on any **Stolz sector** $\{\,|s - s_0| \le C\,\Re(s - s_0)\,\}$, on which $|w|/\Re w$ is bounded. Every compact subset of $\Re s > \sigma_c$ is covered by finitely many such sectors based at suitable points $s_0$, so the series converges uniformly on compacts of $\Re s > \sigma_c$, and $D_a$ is holomorphic there. $\square$`,
  },
  {
    id: 'analytic-continuation',
    label: 'Analytic Continuation',
    title: 'Analytic Continuation',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'complex-analyticity'],
    description: String.raw`A holomorphic function defined on a small region often extends, uniquely, to a holomorphic function on a much larger region — and when it does, the extension is forced. This is **analytic continuation**, and its uniqueness (the identity theorem) is what lets one *define* objects like the Riemann zeta function on the whole plane even though the original series converges only on a half-plane: there is at most one holomorphic extension, so "the" continued function is unambiguous. The rigidity is dramatic and has no real-variable analogue; it is the reason a single holomorphic function carries global information.`,
    definition: String.raw`Let $f$ be holomorphic on an open connected set $U \subseteq \mathbb{C}$. An **analytic continuation** of $f$ is a holomorphic function $g$ on an open connected $V \supseteq U$ with $g|_U = f$. The **identity theorem** guarantees uniqueness: if $g_1, g_2$ are holomorphic on a connected $V$ and agree on a set with a limit point in $V$ (in particular on the subdomain $U$), then $g_1 = g_2$ on all of $V$. Hence a function admits at most one analytic continuation to a given connected domain. A continuation that is holomorphic except for isolated poles is called **meromorphic**.`,
    proof: String.raw`**Uniqueness (identity theorem).** Suppose holomorphic $g_1, g_2$ on a connected open $V$ agree on a set $E$ with a limit point $p \in V$. Set $h = g_1 - g_2$, holomorphic on $V$, vanishing on $E$. By **complex-analyticity**, near $p$ the function $h$ equals its Taylor series; if $h$ were not identically zero near $p$, its lowest nonzero Taylor coefficient would make $h(z) = (z-p)^m u(z)$ with $u(p) \neq 0$, so $p$ would be an *isolated* zero — contradicting that $p$ is a limit of zeros in $E$. Thus all Taylor coefficients at $p$ vanish and $h \equiv 0$ on a neighbourhood of $p$. The set where all derivatives of $h$ vanish is therefore nonempty, and it is both open (Taylor expansion) and closed (continuity of derivatives) in the connected $V$, hence equals $V$. So $h \equiv 0$, i.e. $g_1 = g_2$ on $V$. $\square$`,
  },
  {
    id: 'gamma-function',
    label: 'Gamma Function',
    title: 'Gamma Function',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'analytic-continuation', 'riemann-integral'],
    description: String.raw`The gamma function is the canonical extension of the factorial from the integers to the complex plane: it satisfies $\Gamma(n) = (n-1)!$ and the functional equation $\Gamma(s+1) = s\,\Gamma(s)$ that the factorial obeys. Defined first by an integral on the right half-plane, it continues to a meromorphic function on all of $\mathbb{C}$ whose only singularities are simple poles at the non-positive integers. In analytic number theory it is the "archimedean" factor that completes Dirichlet series into objects with clean functional equations — it is exactly the gamma factor that turns $\zeta(s)$ into the symmetric completed zeta $\xi(s)$.`,
    definition: String.raw`For $\Re s > 0$ the **gamma function** is defined by the convergent integral
$$\Gamma(s) = \int_0^{\infty} t^{s-1} e^{-t}\,dt.$$
It is holomorphic on $\Re s > 0$ and satisfies $\Gamma(s+1) = s\,\Gamma(s)$ and $\Gamma(1) = 1$, whence $\Gamma(n) = (n-1)!$ for $n \in \mathbb{Z}_{\ge 1}$. Using the functional equation to define $\Gamma(s) = \Gamma(s+1)/s$ repeatedly gives the **analytic continuation** to a meromorphic function on $\mathbb{C}$ with simple poles at $s = 0, -1, -2, \dots$ and no zeros.`,
    proof: String.raw`**Functional equation and continuation.** For $\Re s > 0$, integrate by parts: $\Gamma(s+1) = \int_0^\infty t^s e^{-t}\,dt = \bigl[-t^s e^{-t}\bigr]_0^\infty + s\int_0^\infty t^{s-1}e^{-t}\,dt = s\,\Gamma(s)$, the boundary terms vanishing since $t^s e^{-t} \to 0$ at both ends. With $\Gamma(1) = \int_0^\infty e^{-t}\,dt = 1$, induction gives $\Gamma(n) = (n-1)!$. The integral defines a holomorphic function on $\Re s > 0$ (differentiation under the integral sign is justified by local uniform convergence). Now $\Gamma(s) := \Gamma(s+1)/s$ extends $\Gamma$ holomorphically to $\Re s > -1$ except for a simple pole at $s = 0$ with residue $\Gamma(1) = 1$; iterating, $\Gamma(s) = \Gamma(s+k)/\bigl(s(s+1)\cdots(s+k-1)\bigr)$ continues $\Gamma$ to $\Re s > -k$ with simple poles at $0, -1, \dots, -(k-1)$, residues $(-1)^j/j!$ at $s = -j$. By uniqueness of **analytic continuation** these agree on overlaps and assemble to one meromorphic $\Gamma$ on $\mathbb{C}$. $\square$`,
  },
  {
    id: 'riemann-zeta-function',
    label: 'Riemann Zeta Function',
    title: 'Riemann Zeta Function',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['dirichlet-series', 'analytic-continuation'],
    description: String.raw`The Riemann zeta function is the simplest and most important Dirichlet series — the one with all coefficients equal to $1$. The defining sum $\sum n^{-s}$ converges only for $\Re s > 1$, but the function continues meromorphically to the entire plane, acquiring exactly one singularity: a simple pole at $s = 1$, the analytic shadow of the divergence of the harmonic series. Riemann's insight was that the location of the zeros of this continued function governs, with great precision, the distribution of the prime numbers. Zeta is the prototype of all $L$-functions and the central object of analytic number theory.`,
    definition: String.raw`The **Riemann zeta function** is, for $\Re s > 1$, the **Dirichlet series** of the constant function $\mathbf{1}$:
$$\zeta(s) = \sum_{n=1}^{\infty}\frac{1}{n^s},$$
which converges absolutely on $\Re s > 1$ and defines a holomorphic function there. By **analytic continuation**, $\zeta$ extends uniquely to a meromorphic function on all of $\mathbb{C}$ whose only singularity is a **simple pole at $s = 1$** with residue $1$.`,
    proof: String.raw`**Convergence on $\Re s > 1$ and the pole at $s = 1$.** For $\sigma = \Re s > 1$, $|n^{-s}| = n^{-\sigma}$ and the integral test gives $\sum_{n\ge 1} n^{-\sigma} \le 1 + \int_1^\infty x^{-\sigma}\,dx = 1 + 1/(\sigma - 1) < \infty$, so the series converges absolutely and (by the **Dirichlet series** node) defines a holomorphic function on $\Re s > 1$. A first continuation to $\Re s > 0$: for $\Re s > 1$, partial summation / comparison with the integral gives
$$\zeta(s) - \frac{1}{s-1} = \sum_{n=1}^{\infty}\Bigl(\frac{1}{n^s} - \int_n^{n+1}\frac{dx}{x^s}\Bigr),$$
and each term is $O(|s|\,n^{-\sigma - 1})$, so the right-hand series converges locally uniformly on $\Re s > 0$, defining a holomorphic function there. Hence $\zeta(s) = \frac{1}{s-1} + (\text{holomorphic on } \Re s > 0)$, exhibiting the **simple pole at $s = 1$** with residue $1$ and no other singularity in $\Re s > 0$. The continuation to all of $\mathbb{C}$ (with no further poles) is then provided by the functional equation; by uniqueness of **analytic continuation** the resulting meromorphic function is unambiguous. $\square$`,
  },
  {
    id: 'euler-product',
    label: 'Euler Product',
    title: 'Euler Product',
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['riemann-zeta-function', 'prime-number', 'fundamental-theorem-of-arithmetic'],
    description: String.raw`The Euler product is the analytic incarnation of unique factorization: zeta, an additive sum over all integers, equals a multiplicative product over the primes. Each prime contributes a geometric-series factor $(1 - p^{-s})^{-1} = 1 + p^{-s} + p^{-2s} + \cdots$, and expanding the product reconstitutes exactly one term $n^{-s}$ for each integer $n$ — because each $n$ factors into primes in exactly one way. The product already contains arithmetic: letting $s \to 1^+$, the left side diverges (the pole of zeta), so the right side must have infinitely many factors, re-proving Euclid's theorem on the infinitude of primes by analysis.`,
    statement: String.raw`For $\Re s > 1$ the **Riemann zeta function** factors as a product over the primes,
$$\zeta(s) = \prod_{p \text{ prime}}\frac{1}{1 - p^{-s}}, \qquad \Re s > 1,$$
the product converging absolutely. Consequently $\zeta(s) \neq 0$ for $\Re s > 1$, and $\prod_p (1 - p^{-1})^{-1}$ diverges, so there are infinitely many primes.`,
    proof: String.raw`Fix $\Re s = \sigma > 1$. For each prime $p$, $|p^{-s}| = p^{-\sigma} < 1$, so the geometric series gives $\frac{1}{1 - p^{-s}} = \sum_{k=0}^{\infty} p^{-ks}$, absolutely convergent. Take a finite product over the primes $p \le N$ and expand:
$$\prod_{p \le N}\frac{1}{1 - p^{-s}} = \prod_{p \le N}\sum_{k\ge 0} p^{-ks} = \sum_{n \in S_N} \frac{1}{n^s},$$
where, by the **fundamental theorem of arithmetic**, expanding the finite product yields exactly one term $n^{-s}$ for each $n$ whose prime factors are all $\le N$ (the set $S_N$), and each such $n$ arises exactly once (uniqueness of factorization). Every $n \le N$ lies in $S_N$, so
$$\Bigl|\zeta(s) - \prod_{p \le N}\frac{1}{1 - p^{-s}}\Bigr| = \Bigl|\sum_{n \notin S_N}\frac{1}{n^s}\Bigr| \le \sum_{n > N} n^{-\sigma} \xrightarrow[N\to\infty]{} 0,$$
the tail of the convergent series $\sum n^{-\sigma}$. Hence the partial products converge to $\zeta(s)$, giving the infinite product. Absolute convergence follows from $\sum_p |p^{-s}| \le \sum_n n^{-\sigma} < \infty$. Since each factor is nonzero and the product converges to a nonzero limit, $\zeta(s) \neq 0$ for $\Re s > 1$. Finally, as $s \to 1^+$ along the reals, $\zeta(s) \to +\infty$ (the **pole at $s = 1$**), so the product $\prod_p (1 - p^{-1})^{-1}$ diverges; a finite set of primes would give a finite product, so there are infinitely many primes. $\square$`,
  },
  {
    id: 'functional-equation-zeta',
    label: 'Functional Equation',
    title: 'Functional Equation of Zeta',
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['riemann-zeta-function', 'gamma-function', 'analytic-continuation', 'poisson-summation-formula'],
    description: String.raw`Completing zeta with its archimedean (gamma) factor produces a function with a perfect mirror symmetry: the completed zeta $\xi(s)$ is unchanged under the reflection $s \mapsto 1 - s$ about the critical line $\Re s = \tfrac12$. This functional equation is what continues zeta to the entire plane and ties its behaviour on the right half-plane to the left. It immediately exposes the **trivial zeros** — zeta must vanish at the negative even integers to cancel the poles of the gamma factor there — and it sets the geometric stage for the Riemann hypothesis, which conjectures that all the *other* zeros sit precisely on the axis of symmetry.`,
    statement: String.raw`Define the **completed zeta function** $\xi(s) = \pi^{-s/2}\,\Gamma(s/2)\,\zeta(s)$. Then $\xi$ extends to a meromorphic function on $\mathbb{C}$, holomorphic except for simple poles at $s = 0$ and $s = 1$, and satisfies the **functional equation**
$$\xi(s) = \xi(1 - s).$$
Equivalently $\zeta(s) = 2^s\pi^{s-1}\sin(\tfrac{\pi s}{2})\,\Gamma(1-s)\,\zeta(1-s)$. Consequently $\zeta$ has **trivial zeros** at $s = -2, -4, -6, \dots$.`,
    proof: String.raw`We give the classical proof as a rigorous sketch, naming the deep inputs. The engine is the **theta function** $\theta(t) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 t}$ for $t > 0$, and its modular transformation $\theta(1/t) = \sqrt{t}\,\theta(t)$, which is **Poisson summation** applied to the Gaussian $f(x) = e^{-\pi x^2 t}$ (a Schwartz function, self-dual under the Fourier transform up to scaling): the formula $\sum_n f(n) = \sum_k \hat f(k)$ from the **poisson-summation-formula** node, with $\hat f(\xi) = t^{-1/2} e^{-\pi \xi^2/t}$, yields exactly $\theta(t) = t^{-1/2}\theta(1/t)$.

**Mellin transform.** For $\Re s > 1$, substituting $t \mapsto \pi n^2 t$ in the integral defining the **gamma function** gives $\pi^{-s/2}\Gamma(s/2)\,n^{-s} = \int_0^\infty t^{s/2 - 1} e^{-\pi n^2 t}\,dt$. Summing over $n \ge 1$ and interchanging sum and integral (justified by absolute convergence for $\Re s > 1$),
$$\xi(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s) = \int_0^\infty t^{s/2 - 1}\,\omega(t)\,dt, \qquad \omega(t) = \sum_{n \ge 1} e^{-\pi n^2 t} = \tfrac{1}{2}(\theta(t) - 1).$$

**Split and symmetrize.** Break the integral at $t = 1$ and apply $\theta(1/t) = \sqrt{t}\,\theta(t)$, i.e. $\omega(1/t) = -\tfrac12 + \tfrac12\sqrt t + \sqrt t\,\omega(t)$, to the part over $(0,1)$ after the change of variables $t \mapsto 1/t$. The elementary terms integrate to $-\tfrac{1}{s} - \tfrac{1}{1-s}$, and the remaining integral is manifestly invariant under $s \mapsto 1 - s$:
$$\xi(s) = -\frac{1}{s} - \frac{1}{1-s} + \int_1^\infty \bigl(t^{s/2 - 1} + t^{(1-s)/2 - 1}\bigr)\omega(t)\,dt.$$
Because $\omega(t) = O(e^{-\pi t})$ as $t \to \infty$, the integral converges for **all** $s \in \mathbb{C}$ and is entire, so this formula is the meromorphic **analytic continuation** of $\xi$ to $\mathbb{C}$, with simple poles only at $s = 0, 1$. The right-hand side is visibly unchanged under $s \mapsto 1 - s$, giving $\xi(s) = \xi(1-s)$.

**Trivial zeros.** Solving $\xi(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s)$ for $\zeta$: at $s = -2, -4, \dots$ the gamma factor $\Gamma(s/2)$ has poles (poles of **gamma-function** at non-positive integers), while $\xi$ is finite and nonzero there, so $\zeta(s)$ must vanish to cancel them — the **trivial zeros** $\zeta(-2k) = 0$, $k \ge 1$. $\square$`,
  },
  {
    id: 'riemann-hypothesis',
    label: 'Riemann Hypothesis',
    title: 'Riemann Hypothesis',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['riemann-zeta-function', 'functional-equation-zeta', 'prime-number-theorem'],
    description: String.raw`Beyond the trivial zeros at the negative even integers, all zeros of zeta lie in the *critical strip* $0 < \Re s < 1$, and the functional equation makes them symmetric about the critical line $\Re s = \tfrac12$. The Riemann hypothesis is the conjecture that they all lie exactly *on* that line. Its significance is that the horizontal position of the zeros controls the size of the error term in the prime number theorem: the hypothesis is equivalent to the sharpest conceivable bound $\pi(x) = \mathrm{Li}(x) + O(\sqrt{x}\,\log x)$, pinning down the fluctuations of the primes to square-root precision. Stated by Riemann in 1859, verified for billions of zeros, and a Clay Millennium Prize problem, it remains open — the most famous unsolved problem in mathematics. (It is recorded here as a conjecture; this graph contains no proof.)`,
    definition: String.raw`The **nontrivial zeros** of $\zeta$ are its zeros in the **critical strip** $\{\,s : 0 < \Re s < 1\,\}$ (all zeros other than the trivial ones at $-2, -4, \dots$; the **functional equation of zeta** places them symmetrically about the line $\Re s = \tfrac12$ and about the real axis). The **Riemann hypothesis** is the assertion
$$\zeta(\rho) = 0,\ 0 < \Re\rho < 1 \;\Longrightarrow\; \Re\rho = \tfrac{1}{2}.$$
It is equivalent to the error bound $\psi(x) = x + O\bigl(\sqrt{x}\,(\log x)^2\bigr)$ in the prime number theorem, equivalently $\pi(x) = \operatorname{Li}(x) + O(\sqrt{x}\,\log x)$.`,
  },
  {
    id: 'explicit-formula',
    label: 'Explicit Formula',
    title: 'Riemann–von Mangoldt Explicit Formula',
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['riemann-zeta-function', 'functional-equation-zeta', 'prime-number-theorem', 'residue-theorem'],
    description: String.raw`The explicit formula makes precise the slogan that "the primes are controlled by the zeros of zeta." It writes the prime-counting Chebyshev function $\psi(x)$ exactly as the main term $x$ minus an oscillatory sum, one term $x^\rho/\rho$ for each nontrivial zero $\rho$, plus small corrections. Each zero contributes a wave whose frequency is its imaginary part and whose decay is governed by its real part — the primes are a "music" whose overtones are the zeta zeros. Crucially, the dominant main term $x$ is exactly the contribution of the pole of zeta at $s = 1$, and the prime number theorem is precisely the statement that no zero lies on the line $\Re s = 1$ (so the oscillations are genuinely smaller than $x$).`,
    statement: String.raw`Let $\psi(x) = \sum_{p^k \le x}\log p = \sum_{n \le x}\Lambda(n)$ be the Chebyshev function. For $x > 1$ not a prime power,
$$\psi(x) = x - \sum_{\rho}\frac{x^{\rho}}{\rho} - \log(2\pi) - \tfrac{1}{2}\log\bigl(1 - x^{-2}\bigr),$$
the sum running (symmetrically, paired as $\rho, \bar\rho$) over the nontrivial zeros $\rho$ of $\zeta$. The term $x$ is the residue of $-\zeta'/\zeta$ at the **pole $s = 1$**; the $-\sum_\rho x^\rho/\rho$ are the residues at the zeros; and $-\tfrac12\log(1 - x^{-2})$ collects the trivial zeros.`,
    proof: String.raw`We give the standard contour-integral proof as a rigorous sketch, naming each ingredient. The starting point is the logarithmic derivative of the **Euler product** (established in the proof of the **prime number theorem**): for $\Re s > 1$,
$$-\frac{\zeta'(s)}{\zeta(s)} = \sum_{n=1}^{\infty}\frac{\Lambda(n)}{n^s}, \qquad \Lambda(n) = \begin{cases}\log p & n = p^k,\\ 0 & \text{else,}\end{cases}$$
the Dirichlet series of the von Mangoldt function, whose coefficient sums are $\psi(x)$.

**Perron's formula.** A standard contour integral recovers a coefficient sum from a Dirichlet series: for $c > 1$ and $x$ not a prime power,
$$\psi(x) = \frac{1}{2\pi i}\int_{c - i\infty}^{c + i\infty}\Bigl(-\frac{\zeta'(s)}{\zeta(s)}\Bigr)\frac{x^s}{s}\,ds,$$
because the kernel $\frac{1}{2\pi i}\int_{(c)} \frac{(x/n)^s}{s}\,ds$ equals $1$ for $n < x$ and $0$ for $n > x$ (a contour evaluation of the discontinuous integral). Convergence and the interchange of sum and integral require the standard truncation estimates.

**Shift the contour; collect residues.** Move the line of integration to the left, picking up, by the **residue theorem**, the residues of the integrand $-\frac{\zeta'(s)}{\zeta(s)}\frac{x^s}{s}$ at the poles of $-\zeta'/\zeta$:
- the simple **pole of $\zeta$ at $s = 1$** makes $-\zeta'/\zeta$ have a simple pole with residue $+1$, contributing residue $x^1/1 = x$ — the main term;
- each **nontrivial zero** $\rho$ (a zero of $\zeta$ of multiplicity $m$, so $\zeta'/\zeta$ has residue $+m$ and $-\zeta'/\zeta$ has a simple pole with residue $-m$, hence $-1$ for a simple zero) makes the integrand $-\frac{\zeta'}{\zeta}\frac{x^s}{s}$ have residue $(-m)\cdot\frac{x^\rho}{\rho} = -\frac{x^\rho}{\rho}$ (taking $m = 1$), contributing $-x^\rho/\rho$;
- the **trivial zeros** at $s = -2, -4, \dots$ (from the **functional equation of zeta**) contribute $\sum_{k\ge 1} x^{-2k}/(2k) = -\tfrac12\log(1 - x^{-2})$;
- the pole of the kernel at $s = 0$ contributes $-\zeta'(0)/\zeta(0) = -\log(2\pi)$.

The growth of $\zeta'/\zeta$ along the shifted contours (controlled via the functional equation and zero-density estimates) shows the remainder integrals vanish in the limit, leaving exactly $\psi(x) = x - \sum_\rho x^\rho/\rho - \log(2\pi) - \tfrac12\log(1 - x^{-2})$. The connection to the **prime number theorem** is now transparent: $\psi(x) \sim x$ holds iff $|x^\rho/\rho| = x^{\Re\rho}/|\rho|$ is genuinely smaller than $x$, i.e. iff every $\Re\rho < 1$ — the non-vanishing of $\zeta$ on the line $\Re s = 1$. $\square$`,
  },

  // ── Characters and primes in progressions ───────────────────────────────────
  {
    id: 'dirichlet-character',
    label: 'Dirichlet Character',
    title: 'Dirichlet Character',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['modular-arithmetic', 'units-mod-n', 'group-homomorphism'],
    description: String.raw`Dirichlet characters are the harmonics of modular arithmetic: the homomorphisms from the unit group $(\mathbb{Z}/q\mathbb{Z})^\times$ to the nonzero complex numbers, extended by zero to all integers. They are the exact analogue, for the finite abelian group of units, of the exponentials $e^{2\pi i n x}$ in Fourier analysis. Their defining virtue is **orthogonality** — averaging a character over a period detects whether it is trivial — which lets one build, out of characters, an indicator function that picks out a single residue class. This is the device that isolates the primes in an arithmetic progression, and the reason characters are the gateway to Dirichlet's theorem.`,
    definition: String.raw`A **Dirichlet character** modulo $q$ is a **group homomorphism** $\chi : (\mathbb{Z}/q\mathbb{Z})^\times \to \mathbb{C}^\times$, extended to a function on all of $\mathbb{Z}$ by setting $\chi(n) = \chi(n \bmod q)$ if $\gcd(n, q) = 1$ and $\chi(n) = 0$ otherwise. Equivalently, $\chi$ is **completely multiplicative**, periodic mod $q$, and supported on integers coprime to $q$. The **principal character** $\chi_0$ takes the value $1$ on all $n$ coprime to $q$. The values of $\chi$ are roots of unity (of order dividing $\varphi(q) = |(\mathbb{Z}/q\mathbb{Z})^\times|$), since the **unit group** is finite.`,
    proof: String.raw`**Orthogonality relations.** Write $G = (\mathbb{Z}/q\mathbb{Z})^\times$, a finite abelian group of order $\varphi(q)$, and let $\hat G$ be the set of its characters under pointwise multiplication.

*Two facts about $\hat G$ (cited input).* We use that (i) $|\hat G| = |G| = \varphi(q)$ and (ii) the characters **separate points**: for every $a \neq 1$ in $G$ there exists $\chi \in \hat G$ with $\chi(a) \neq 1$. Both follow from the **structure theorem for finite abelian groups**, which writes $G \cong \mathbb{Z}/m_1 \times \cdots \times \mathbb{Z}/m_r$ as a product of cyclic groups: a character of a cyclic group $\mathbb{Z}/m$ is determined by sending a generator to any $m$-th root of unity, giving exactly $m$ characters, and a character of the product is an arbitrary tuple of these, so $|\hat G| = m_1\cdots m_r = |G|$; and if $a \neq 1$ then some coordinate $a_j$ is nonzero in $\mathbb{Z}/m_j$, so the character $z \mapsto \exp(2\pi i\, z_j / m_j)$ (projection to factor $j$ followed by a faithful cyclic character) sends $a$ to a value $\neq 1$. We name the structure theorem as the external ingredient; the rest of the argument is self-contained.

*Sum over $a$ for fixed $\chi$:* $\sum_{a \in G}\chi(a) = \varphi(q)$ if $\chi = \chi_0$ and $0$ otherwise. For $\chi = \chi_0$ every term is $1$. For nontrivial $\chi$ pick $b$ with $\chi(b) \neq 1$; then $\chi(b)\sum_a \chi(a) = \sum_a \chi(ba) = \sum_a \chi(a)$ (the map $a \mapsto ba$ permutes $G$), so $(\chi(b) - 1)\sum_a \chi(a) = 0$ forces the sum to $0$.

*Sum over $\chi$ for fixed $a$:* $\sum_{\chi \in \hat G}\chi(a) = \varphi(q)$ if $a \equiv 1$ and $0$ otherwise. For $a \equiv 1$ each $\chi(1) = 1$, and there are $|\hat G| = \varphi(q)$ terms by fact (i). For $a \not\equiv 1$, fact (ii) supplies $\chi' \in \hat G$ with $\chi'(a) \neq 1$; then $\chi'(a)\sum_{\chi}\chi(a) = \sum_{\chi}(\chi'\chi)(a) = \sum_{\chi}\chi(a)$ (the map $\chi \mapsto \chi'\chi$ permutes the group $\hat G$), so $(\chi'(a) - 1)\sum_{\chi}\chi(a) = 0$ forces the sum to $0$. Combining, for $\gcd(a, q) = 1$,
$$\frac{1}{\varphi(q)}\sum_{\chi \bmod q}\overline{\chi(a)}\,\chi(n) = \begin{cases}1 & n \equiv a \pmod q,\\ 0 & \text{otherwise},\end{cases}$$
the indicator of the residue class $a$ — the formula that isolates a progression. $\square$`,
  },
  {
    id: 'dirichlet-l-function',
    label: 'Dirichlet L-function',
    title: 'Dirichlet L-function',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['dirichlet-series', 'dirichlet-character', 'euler-product', 'analytic-continuation'],
    description: String.raw`A Dirichlet $L$-function is zeta twisted by a character: the same series $\sum n^{-s}$ but weighted by $\chi(n)$. Because $\chi$ is completely multiplicative, the series has an Euler product just like zeta's, with $\chi(p)$ inserted into each factor. The key structural difference appears at $s = 1$: zeta has a pole there, but for a *nontrivial* character $L(s, \chi)$ is holomorphic and — this is the deep point — nonzero at $s = 1$. The nonvanishing $L(1, \chi) \neq 0$ is the analytic crux that, via the character orthogonality that isolates a residue class, proves that each progression coprime to the modulus contains infinitely many primes.`,
    definition: String.raw`For a **Dirichlet character** $\chi$ modulo $q$, the **Dirichlet $L$-function** is, for $\Re s > 1$, the **Dirichlet series**
$$L(s, \chi) = \sum_{n=1}^{\infty}\frac{\chi(n)}{n^s} = \prod_{p}\frac{1}{1 - \chi(p) p^{-s}},$$
the **Euler product** valid because $\chi$ is completely multiplicative. For the **principal character** $\chi_0$ mod $q$, $L(s, \chi_0) = \zeta(s)\prod_{p \mid q}(1 - p^{-s})$, inheriting zeta's simple pole at $s = 1$. For every **nonprincipal** $\chi$, $L(s, \chi)$ continues by **analytic continuation** to an entire function on $\mathbb{C}$ (no pole at $s = 1$).`,
    proof: String.raw`**Euler product, and holomorphy at $s = 1$ for nonprincipal $\chi$.** The Euler product follows exactly as for zeta: $\chi$ completely multiplicative gives $\prod_p(1 - \chi(p)p^{-s})^{-1} = \prod_p\sum_{k\ge 0}\chi(p)^k p^{-ks} = \sum_n \chi(n) n^{-s}$ on $\Re s > 1$ by the **fundamental theorem of arithmetic** (as in the **euler-product** node). For nonprincipal $\chi$, the partial sums $S(x) = \sum_{n \le x}\chi(n)$ are **bounded**: $\chi$ is periodic mod $q$ and, by the orthogonality of **dirichlet-character**, $\sum_{n = m+1}^{m+q}\chi(n) = 0$ over any full period, so $|S(x)| \le \varphi(q)$. Partial (Abel) summation then gives, for $\Re s > 0$,
$$L(s, \chi) = \sum_{n\ge 1}\chi(n) n^{-s} = s\int_1^\infty S(x)\,x^{-s-1}\,dx,$$
and since $S$ is bounded the integral converges locally uniformly on $\Re s > 0$, defining a holomorphic function there with no pole at $s = 1$. By uniqueness of **analytic continuation** this is the continuation of $L(\cdot, \chi)$; that it extends to an entire function uses the functional equation for $L$ (analogous to zeta's), which we do not reproduce here. $\square$`,
  },
  {
    id: 'l-function-nonvanishing',
    label: 'L(1,χ) ≠ 0',
    title: 'Non-vanishing of L(1, χ)',
    kind: 'lemma',
    tags: ['Analytic Number Theory'],
    dependencies: ['dirichlet-l-function', 'dirichlet-character'],
    description: String.raw`This is the analytic heart of Dirichlet's theorem: for every nontrivial character $\chi$ modulo $q$, the $L$-function does not vanish at $s = 1$. The reason it matters is that $\log L(s, \chi)$ behaves near $s = 1$ like a sum over primes weighted by $\chi$, so $L(1, \chi) \neq 0$ keeps that logarithm bounded; combined over all characters by orthogonality, the bounded contributions cancel and only the divergent principal-character term (the sum of $p^{-s}$ over primes in the progression) survives — forcing infinitely many such primes. The case of *complex* characters is easy; the delicate case is a *real* nontrivial character, handled by a positivity argument.`,
    statement: String.raw`For every nonprincipal **Dirichlet character** $\chi$ modulo $q$, $L(1, \chi) \neq 0$.`,
    proof: String.raw`Form the product over all characters mod $q$, $\zeta_q(s) := \prod_{\chi \bmod q} L(s, \chi)$. By the **Euler product** of each **dirichlet-l-function** and the orthogonality of **dirichlet-character**, taking $\log$ and summing over $\chi$,
$$\log \zeta_q(s) = \sum_{\chi}\sum_{p \nmid q}\sum_{k\ge 1}\frac{\chi(p^k)}{k\,p^{ks}} = \varphi(q)\sum_{p^k \equiv 1 \,(q)}\frac{1}{k\,p^{ks}} \ge 0 \quad (s > 1 \text{ real}),$$
since orthogonality collapses the character sum to $\varphi(q)$ on prime powers $\equiv 1 \pmod q$ and $0$ elsewhere; thus $\zeta_q(s) \ge 1$ for real $s > 1$.

Now examine $\zeta_q$ near $s = 1$. The principal factor $L(s, \chi_0)$ has a **simple pole** at $s = 1$ (it is $\zeta(s)$ times the finite nonzero factors $\prod_{p \mid q}(1 - p^{-s})$), while every nonprincipal $L(s, \chi)$ is holomorphic at $s = 1$; so $\zeta_q$ is meromorphic near $s = 1$ with a single simple pole there contributed by $\chi_0$, of order $-1$. If at least **two** of the nonprincipal factors vanished at $s = 1$ (counting multiplicity), their combined zero of order $\ge 2$ would outweigh that single simple pole, leaving $\zeta_q$ holomorphic at $s = 1$ with a zero, i.e. $\zeta_q(1) = 0$. But $\zeta_q(s) \ge 1$ for real $s > 1$, so by continuity $\lim_{s \to 1^+}\zeta_q(s) \ge 1 \neq 0$ — a contradiction. (A **single** simple zero merely cancels the simple pole and leaves a finite, generically nonzero value $\zeta_q(1) = c \cdot a \neq 0$, so one zero alone produces no contradiction; the contradiction needs two or more.) Apply this to a **complex** nonprincipal character $\chi_1$: if $L(1, \chi_1) = 0$ then, since $\bar\chi_1 \neq \chi_1$ is a distinct nonprincipal character with $L(1, \bar\chi_1) = \overline{L(1, \chi_1)} = 0$, we have two distinct nonprincipal factors vanishing at $s = 1$, giving the forbidden $\zeta_q(1) = 0$. Hence $L(1, \chi) \neq 0$ for every complex nonprincipal $\chi$.

The remaining case is a **real** nonprincipal character $\chi$ (values in $\{0, \pm 1\}$). Here one uses a positivity argument: the convolution coefficients $a_n = \sum_{d \mid n}\chi(d)$ satisfy $a_n \ge 0$ and $a_{m^2} \ge 1$, so the Dirichlet series $\sum a_n n^{-s} = \zeta(s) L(s, \chi)$ has nonnegative coefficients and diverges at $s = \tfrac12$; were $L(1, \chi) = 0$, the zero would cancel the pole of $\zeta$ and make $\zeta(s)L(s,\chi)$ entire, hence (by Landau's theorem for Dirichlet series with nonnegative coefficients) convergent on all of $\Re s > 0$ — contradicting divergence at $s = \tfrac12$. Therefore $L(1, \chi) \neq 0$ in every case. $\square$`,
  },
  {
    id: 'dirichlet-theorem',
    label: 'Primes in Progressions',
    title: "Dirichlet's Theorem on Arithmetic Progressions",
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['dirichlet-l-function', 'l-function-nonvanishing', 'dirichlet-character', 'euler-product'],
    description: String.raw`Dirichlet's theorem is the founding triumph of analytic number theory: every arithmetic progression whose first term and common difference are coprime contains infinitely many primes. The proof is a model of the analytic method — encode "prime in the progression $a \bmod q$" using character orthogonality, so the relevant counting function becomes a combination of $\log L(s, \chi)$ over all characters; the principal character supplies a logarithmic divergence (from the pole of zeta), and the nonprincipal characters contribute only bounded terms precisely because $L(1, \chi) \neq 0$. The divergence cannot come from finitely many primes, so there must be infinitely many.`,
    statement: String.raw`Let $q \ge 1$ and let $a$ be coprime to $q$. Then there are infinitely many primes $p$ with $p \equiv a \pmod q$. Quantitatively, $\sum_{p \equiv a \,(q)} p^{-s} \to +\infty$ as $s \to 1^+$, so the primes are (in the logarithmic-density sense) equidistributed among the $\varphi(q)$ residue classes coprime to $q$.`,
    proof: String.raw`For real $s > 1$, take the logarithm of the **Euler product** of each **dirichlet-l-function**:
$$\log L(s, \chi) = \sum_p \sum_{k \ge 1}\frac{\chi(p)^k}{k\, p^{ks}} = \sum_p \frac{\chi(p)}{p^s} + R_\chi(s),$$
where the remainder $R_\chi(s) = \sum_p\sum_{k\ge 2}\chi(p^k)/(k p^{ks})$ is bounded as $s \to 1^+$ (dominated by $\sum_p\sum_{k\ge 2} p^{-k} \le \sum_p \frac{1}{p(p-1)} < \infty$). Now isolate the class $a$ using the orthogonality indicator of **dirichlet-character**: multiply by $\overline{\chi(a)}$, sum over all $\chi$ mod $q$, and divide by $\varphi(q)$,
$$\frac{1}{\varphi(q)}\sum_{\chi}\overline{\chi(a)}\log L(s, \chi) = \sum_{p \equiv a \,(q)}\frac{1}{p^s} + O(1) \qquad (s \to 1^+).$$
Examine the left side as $s \to 1^+$. The **principal** character gives $\log L(s, \chi_0) = \log\zeta(s) + O(1) \to +\infty$, since $\zeta$ has a **pole at $s = 1$** (from the **euler-product** node). Each **nonprincipal** character gives $\log L(s, \chi) \to \log L(1, \chi)$, a *finite* limit, because $L(s,\chi)$ is holomorphic at $s = 1$ and, by **l-function-nonvanishing**, $L(1, \chi) \neq 0$ (so the logarithm does not blow up). Hence the left side $\to +\infty$, driven entirely by the principal term, and therefore
$$\sum_{p \equiv a \,(q)}\frac{1}{p^s} \xrightarrow[s \to 1^+]{} +\infty.$$
A finite set of primes would give a bounded sum, so there are infinitely many primes $p \equiv a \pmod q$. Moreover the divergent main term $\tfrac{1}{\varphi(q)}\log\frac{1}{s-1}$ is the *same* for every coprime class $a$, which is the equidistribution statement. $\square$`,
  },

  // ── Sieves ──────────────────────────────────────────────────────────────────
  {
    id: 'sieve-methods',
    label: 'Sieve Methods',
    title: 'Sieve Methods',
    kind: 'definition',
    tags: ['Analytic Number Theory'],
    dependencies: ['arithmetic-function', 'mobius-function', 'inclusion-exclusion'],
    description: String.raw`Sieve methods make the sieve of Eratosthenes quantitative: they estimate how many integers in a range survive after removing those divisible by a given set of primes. The exact count is an inclusion–exclusion sum weighted by the Möbius function, but that sum has far too many terms with delicate cancellation to evaluate directly. The art of sieving is to *truncate* the inclusion–exclusion cleverly — Brun's combinatorial sieve, Selberg's optimized quadratic weights, the large sieve — trading exactness for tractable upper and lower bounds. These bounds are the tool of choice where exact formulas are hopeless: Brun proved the twin-prime reciprocals converge, and modern sieves underlie the breakthroughs on bounded gaps between primes.`,
    definition: String.raw`Let $A$ be a finite set of integers and $\mathcal{P}$ a set of primes; for $z \ge 2$ put $P(z) = \prod_{p \in \mathcal{P},\, p < z} p$. The **sifting function** is
$$S(A, \mathcal{P}, z) = \bigl|\{\,n \in A : \gcd(n, P(z)) = 1\,\}\bigr| = \sum_{n \in A}\sum_{d \mid \gcd(n, P(z))}\mu(d),$$
counting the elements of $A$ divisible by no prime $p \in \mathcal{P}$ with $p < z$; the inner sum is the indicator of $\gcd(n, P(z)) = 1$ via the **Möbius function** (Legendre's identity, an **inclusion–exclusion**). Writing $A_d = \{\,n \in A : d \mid n\,\}$, exchanging the order of summation gives the exact **Legendre formula**
$$S(A, \mathcal{P}, z) = \sum_{d \mid P(z)}\mu(d)\,|A_d|.$$
A **sieve** is any method that bounds $S(A, \mathcal{P}, z)$ by replacing $\mu(d)$ with truncated weights $\lambda_d$ for which $\sum_{d \mid m}\lambda_d \ge \mathbf{1}[m=1]$ (upper-bound sieve) or $\le$ (lower-bound sieve), making the resulting main term $\sum_d \lambda_d |A_d|$ tractable.`,
    proof: String.raw`**Legendre's identity.** For $n \in A$, the inner sum $\sum_{d \mid \gcd(n, P(z))}\mu(d)$ equals $\sum_{d \mid g}\mu(d)$ with $g = \gcd(n, P(z))$, which by the key identity of the **Möbius function** ($\mu * \mathbf{1} = \varepsilon$) is $1$ if $g = 1$ and $0$ otherwise — exactly the indicator that $n$ is coprime to $P(z)$, i.e. divisible by no sifting prime below $z$. Summing over $n \in A$ and exchanging the two finite sums (over $n$ and over $d$) gives $S = \sum_{d \mid P(z)}\mu(d)|A_d|$, the **inclusion–exclusion** count over the squarefree divisors of $P(z)$. This identity is exact; every sieve technique is a tractable approximation to its right-hand side. $\square$`,
  },
]
