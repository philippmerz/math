import type { MathNode } from '../types'

export const ANALYSIS_NODES: MathNode[] = [
  // ── Magnitude and the triangle inequality ────────────────────────────────
  {
    id: 'absolute-value',
    label: 'Absolute Value',
    title: 'Absolute Value',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field'],
    description: String.raw`The **absolute value** strips the sign from an element of an ordered field, leaving its magnitude: $|x|$ is $x$ itself when $x \ge 0$ and $-x$ when $x < 0$, so $|x| \ge 0$ always. The quantity $|x - y|$ measures the distance between $x$ and $y$, and the **triangle inequality** $|x + y| \le |x| + |y|$ controls how distances combine. This distance is the bedrock on which all of analysis — limits, continuity, convergence — is built.`,
    definition: String.raw`On an ordered field $F$, the **absolute value** is the function
$$|x| := \begin{cases} x & \text{if } x \ge 0, \\ -x & \text{if } x < 0. \end{cases}$$
Immediate from the definition: $|x| \ge 0$ with $|x| = 0$ iff $x = 0$; $|-x| = |x|$; and $-|x| \le x \le |x|$. One also has the equivalence $|x| \le a \iff -a \le x \le a$ (for $a \ge 0$).`,
  },
  {
    id: 'triangle-inequality',
    label: 'Triangle Inequality',
    title: 'Triangle Inequality',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['absolute-value'],
    description: String.raw`The **triangle inequality** says the magnitude of a sum never exceeds the sum of the magnitudes: $|x + y| \le |x| + |y|$. Read with distances, it states that the direct route from $x$ to $z$ is no longer than any detour through $y$: $|x - z| \le |x - y| + |y - z|$. It is the single inequality used most often in analysis, and it is the defining axiom of a metric.`,
    statement: String.raw`For all $x, y$ in an ordered field, $|x + y| \le |x| + |y|$. Consequently $\bigl||x| - |y|\bigr| \le |x - y|$ (reverse triangle inequality) and, for all $x, y, z$, $|x - z| \le |x - y| + |y - z|$.`,
    proof: String.raw`From the definition, $-|x| \le x \le |x|$ and $-|y| \le y \le |y|$. Adding these two chains of inequalities gives $-(|x| + |y|) \le x + y \le |x| + |y|$. By the characterization $|t| \le a \iff -a \le t \le a$ (with $a = |x| + |y| \ge 0$), this is exactly $|x + y| \le |x| + |y|$.

For the reverse inequality, write $|x| = |(x - y) + y| \le |x - y| + |y|$, so $|x| - |y| \le |x - y|$; by symmetry $|y| - |x| \le |y - x| = |x - y|$, and the two together give $\bigl||x| - |y|\bigr| \le |x - y|$. Finally, applying the main inequality to $(x - y)$ and $(y - z)$ yields $|x - z| = |(x - y) + (y - z)| \le |x - y| + |y - z|$. $\square$`,
  },
  {
    id: 'absolute-value-multiplicative',
    label: 'Multiplicativity of |·|',
    title: 'Absolute Value is Multiplicative',
    kind: 'lemma',
    tags: ['Analysis'],
    dependencies: ['absolute-value'],
    description: String.raw`Absolute value turns products into products: $|xy| = |x|\,|y|$. Together with the triangle inequality, this is what makes $|\cdot|$ behave like a genuine notion of size, and it is used constantly in estimating products of error terms.`,
    statement: String.raw`For all $x, y$ in an ordered field, $|xy| = |x|\,|y|$. In particular $|x^{-1}| = |x|^{-1}$ for $x \neq 0$.`,
    proof: String.raw`Both sides are non-negative, so it suffices to check that they agree in magnitude by cases on the signs. If $x, y \ge 0$ then $xy \ge 0$, so $|xy| = xy = |x|\,|y|$. If $x \ge 0 > y$ then $xy \le 0$, so $|xy| = -(xy) = x(-y) = |x|\,|y|$, and symmetrically when $y \ge 0 > x$. If $x, y < 0$ then $xy > 0$, so $|xy| = xy = (-x)(-y) = |x|\,|y|$. In every case $|xy| = |x|\,|y|$. Taking $y = x^{-1}$ gives $|x|\,|x^{-1}| = |1| = 1$, whence $|x^{-1}| = |x|^{-1}$. $\square$`,
  },

  // ── Completeness and the construction of ℝ ───────────────────────────────
  {
    id: 'completeness',
    label: 'Completeness',
    title: 'Completeness (Least Upper Bound Property)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field', 'supremum'],
    description: String.raw`An ordered field is **complete** when it has no "gaps": every non-empty set that is bounded above already has a least upper bound inside the field. This *least upper bound property* is exactly what the rationals lack — the set of rationals with square below $2$ is bounded above but has no rational supremum, since $\sqrt{2}$ is missing — and it is precisely the property that singles out the real numbers among all ordered fields.`,
    definition: String.raw`An ordered field $F$ is **complete** (has the **least upper bound property**) when
$$\varnothing \neq S \subseteq F,\; S \text{ bounded above} \;\Longrightarrow\; \sup S \in F,$$
where $\sup S$ is the least upper bound of $S$. Dually one gets greatest lower bounds: if $S \neq \varnothing$ is bounded below then $\inf S = -\sup(-S)$ exists, where $-S = \{-s : s \in S\}$.`,
  },
  {
    id: 'archimedean-property',
    label: 'Archimedean Property',
    title: 'Archimedean Property',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['completeness', 'ordered-field', 'supremum', 'rationals', 'natural-numbers', 'integers'],
    description: String.raw`The **Archimedean property** says there are no infinitely large or infinitely small elements: the natural numbers $1, 2, 3, \dots$ are unbounded above, so for any element $x$ there is a natural number exceeding it, and for any $\varepsilon > 0$ some $1/n$ is smaller still. In a complete ordered field this follows directly from the least upper bound property, and it is exactly what makes the rationals **dense** — squeezable between any two distinct elements.`,
    statement: String.raw`Let $F$ be a complete ordered field (any ordered field with the least upper bound property). Then:
1. $\mathbb{N}$ is unbounded above in $F$: for every $x \in F$ there is $n \in \mathbb{N}$ with $n > x$.
2. For every $\varepsilon > 0$ there is $n \in \mathbb{N}$ with $0 < 1/n < \varepsilon$.
3. $\mathbb{Q}$ is **dense** in $F$: whenever $a < b$ in $F$, there is a rational $q$ with $a < q < b$.`,
    proof: String.raw`*(1)* Suppose, for contradiction, that $\mathbb{N}$ is bounded above in $F$. Being non-empty and bounded above, by **completeness** it has a supremum $s = \sup \mathbb{N}$. Then $s - 1 < s$ is not an upper bound, so some $n \in \mathbb{N}$ has $n > s - 1$, whence $n + 1 > s$. But $n + 1 \in \mathbb{N}$, contradicting that $s$ is an upper bound. Hence $\mathbb{N}$ is unbounded above, so for any $x$ some $n > x$.

*(2)* Apply (1) to $x = 1/\varepsilon$ (here $\varepsilon > 0$, so $1/\varepsilon \in F$): there is $n \in \mathbb{N}$ with $n > 1/\varepsilon$, i.e. $0 < 1/n < \varepsilon$, since the order multiplies through by the positive elements $1/n$ and $\varepsilon$.

*(3)* Let $a < b$, so $b - a > 0$. By (2) choose $n \in \mathbb{N}$ with $1/n < b - a$. By (1) the integers are unbounded in both directions ($-\mathbb{N}$ is unbounded below), so the set $\{ m \in \mathbb{Z} : m > na \}$ is non-empty and bounded below; let $m$ be its least element (well-ordering of the integers bounded below). Then $m > na \ge m - 1$, so $na < m \le na + 1$, giving
$$a < \frac{m}{n} \le a + \frac1n < a + (b - a) = b.$$
Thus $q = m/n \in \mathbb{Q}$ satisfies $a < q < b$. $\square$`,
  },
  {
    id: 'dedekind-cut',
    label: 'Dedekind Cut',
    title: 'Dedekind Cut',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['rationals', 'subset'],
    description: String.raw`A **Dedekind cut** is a downward-closed proper subset of the rationals with no greatest element — the set of all rationals lying strictly below some (possibly irrational) point of the line. Each cut pins down a single point of the continuum purely in terms of the rationals beneath it, so the cuts collectively fill the gaps in the rationals.`,
    definition: String.raw`A **Dedekind cut** is a subset $\alpha \subsetneq \mathbb{Q}$ such that
$$\alpha \neq \varnothing,\qquad (q \in \alpha \wedge p < q) \Rightarrow p \in \alpha,\qquad \forall q \in \alpha\;\exists r \in \alpha\;(q < r).$$
That is: $\alpha$ is non-empty and not all of $\mathbb{Q}$, it is downward closed, and it has no greatest element. The rational $q$ corresponds to the cut $q^* = \{p \in \mathbb{Q} : p < q\}$.`,
  },
  {
    id: 'dedekind-reals',
    label: 'ℝ via Dedekind Cuts',
    title: 'ℝ via Dedekind Cuts',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-cut', 'completeness'],
    description: String.raw`One construction of the reals takes a real number to *be* a Dedekind cut of the rationals, with the order given by inclusion. The arithmetic operations are defined directly on cuts, and the least upper bound of any bounded family of cuts is just their union — so completeness falls out of the construction with no extra work, which is the whole point of the approach.`,
    definition: String.raw`Let $\mathbb{R}$ be the set of all **Dedekind cuts** of $\mathbb{Q}$, ordered by $\alpha \le \beta :\iff \alpha \subseteq \beta$. Addition is $\alpha + \beta = \{p + q : p \in \alpha,\, q \in \beta\}$, the zero is $0^*$, and negation and a careful positive-case definition of multiplication make $(\mathbb{R}, +, \cdot, \le)$ an ordered field with $\mathbb{Q}$ embedded as the cuts $q^*$.`,
    proof: String.raw`*Completeness.* Let $\mathcal{S}$ be a non-empty set of cuts bounded above by a cut $\gamma$, and put $\beta = \bigcup_{\alpha \in \mathcal{S}} \alpha$. Then $\beta$ is a cut: it is non-empty because $\mathcal{S} \neq \varnothing$ provides some cut $\alpha \in \mathcal{S}$, and that $\alpha$, being a Dedekind cut, is itself non-empty, so any element of $\alpha$ lies in $\beta = \bigcup_{\alpha' \in \mathcal{S}} \alpha'$; it is a proper subset since $\beta \subseteq \gamma \subsetneq \mathbb{Q}$; it is downward closed and has no greatest element because each $\alpha$ has these properties and a union of downward-closed sets without greatest element retains them. Every $\alpha \in \mathcal{S}$ satisfies $\alpha \subseteq \beta$, so $\beta$ is an upper bound; and if $\delta$ is any upper bound then $\alpha \subseteq \delta$ for all $\alpha$, hence $\beta = \bigcup \alpha \subseteq \delta$. Thus $\beta = \sup \mathcal{S}$ exists in $\mathbb{R}$, establishing the least upper bound property. $\square$`,
  },
  {
    id: 'sequence',
    label: 'Sequence',
    title: 'Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'natural-number-arithmetic'],
    description: String.raw`A **sequence** in a set is just an infinite list of its elements indexed by the natural numbers — formally a function from the naturals into the set. It is the most basic object whose limiting behaviour analysis studies: convergence, boundedness, and the Cauchy condition are all properties of sequences.`,
    definition: String.raw`A **sequence** in a set $X$ is a function $a : \mathbb{N} \to X$, written $(a_n)_{n \in \mathbb{N}}$ with $a_n := a(n)$. A **subsequence** of $(a_n)$ is $(a_{n_k})_{k \in \mathbb{N}}$ for a strictly increasing index map $k \mapsto n_k$; note $n_k \ge k$ for all $k$, by induction on $k$.`,
  },
  {
    id: 'cauchy-sequence',
    label: 'Cauchy Sequence',
    title: 'Cauchy Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'absolute-value'],
    description: String.raw`A sequence is **Cauchy** when its terms eventually crowd arbitrarily close *to one another* — without reference to any prospective limit. Every convergent sequence is Cauchy; a field where the converse also holds, so that every Cauchy sequence converges, is called *Cauchy-complete*. The least upper bound property implies Cauchy-completeness, and Cauchy sequences of rationals are the raw material for one construction of the reals.`,
    definition: String.raw`A sequence $(a_n)$ in an ordered field is **Cauchy** when
$$\forall \varepsilon > 0\;\exists N \in \mathbb{N}\;\forall m, n \ge N\;\; |a_m - a_n| < \varepsilon.$$
A **null sequence** is one with $a_n \to 0$. A sequence is **bounded** when $\{|a_n| : n \in \mathbb{N}\}$ is bounded above.`,
  },
  {
    id: 'cauchy-reals',
    label: 'ℝ via Cauchy Sequences',
    title: 'ℝ via Cauchy Sequences',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['cauchy-sequence', 'quotient-set', 'rationals', 'triangle-inequality', 'field', 'ordered-field'],
    description: String.raw`A second construction takes a real number to be an entire Cauchy sequence of rationals, where two sequences are identified when their difference tends to $0$. Arithmetic is performed termwise on representatives, and the resulting ordered field is complete: a Cauchy sequence of reals can be approximated term by term by rationals, and that diagonal rational sequence is its limit.`,
    definition: String.raw`Let $C$ be the set of Cauchy sequences of rationals. Define $(a_n) \sim (b_n)$ iff $(a_n - b_n) \to 0$. This is an equivalence relation, and $\mathbb{R} := C / {\sim}$ is the **quotient set**. Termwise sum and product of Cauchy sequences are Cauchy, and these operations descend to $\mathbb{R}$. With the order defined below, $\mathbb{R}$ is an **ordered field** containing $\mathbb{Q}$ as the classes of constant sequences.`,
    proof: String.raw`*The operations are well defined.* Suppose $(a_n) \sim (a_n')$ and $(b_n) \sim (b_n')$. For sums, $|(a_n + b_n) - (a_n' + b_n')| \le |a_n - a_n'| + |b_n - b_n'|$ by the **triangle inequality**, and both terms tend to $0$, so $(a_n + b_n) \sim (a_n' + b_n')$. For products, write
$$a_n b_n - a_n' b_n' = a_n(b_n - b_n') + b_n'(a_n - a_n').$$
A Cauchy sequence is bounded — taking $\varepsilon = 1$ gives $N$ with $|a_n| \le |a_N| + 1$ for $n \ge N$, and the finitely many earlier terms are bounded too — so $|a_n| \le M$ and $|b_n'| \le M'$ for suitable bounds. Then $|a_n b_n - a_n' b_n'| \le M\,|b_n - b_n'| + M'\,|a_n - a_n'| \to 0$, so the product class is independent of representatives. The ring axioms (associativity, commutativity, distributivity, the classes of the constant sequences $0$ and $1$ as identities, termwise negation as additive inverse) are inherited termwise from $\mathbb{Q}$.

*Multiplicative inverses.* Let $[a_n] \neq 0$, i.e. $(a_n)$ is not null. Then $(a_n)$ is **bounded away from $0$ eventually**: otherwise some subsequence tends to $0$, and combined with the Cauchy condition this forces $(a_n) \to 0$, contradicting $[a_n] \neq 0$. Concretely, fixing $\varepsilon_0 > 0$ with $|a_n| \ge \varepsilon_0$ failing infinitely often would, via the Cauchy property, make $(a_n)$ null; so there exist $c > 0$ and $N$ with $|a_n| \ge c$ for all $n \ge N$. Replace the finitely many terms $a_0, \dots, a_{N-1}$ by $1$ (this changes the sequence by a null sequence, hence not its class) and define $b_n = 1/a_n$, which is now defined for all $n$. Then $(b_n)$ is Cauchy: for $m, n \ge N$,
$$|b_m - b_n| = \frac{|a_n - a_m|}{|a_m|\,|a_n|} \le \frac{1}{c^2}\,|a_m - a_n| \to 0,$$
and $[a_n][b_n] = [a_n b_n] = [1]$ since $a_n b_n = 1$ for $n \ge N$. Thus every nonzero class is invertible, so $\mathbb{R}$ is a **field**.

*Order.* Call $(a_n)$ **positive** if there exist $c > 0$ and $N$ with $a_n \ge c$ for all $n \ge N$; this depends only on the class (a null perturbation cannot destroy a uniform positive lower bound past some index). Declare $[a_n] > 0$ iff $(a_n)$ is positive, and $[a_n] \le [b_n]$ iff $[b_n] - [a_n] > 0$ or $[a_n] = [b_n]$. For any nonzero class, exactly one of $[a_n]$, $-[a_n]$ is positive (using eventual bounded-away-from-$0$), so the order is total; it is compatible with $+$ (sum of eventually-$\ge c$ and eventually-$\ge c'$ sequences is eventually $\ge c + c'$) and with $\cdot$ (product of two positive classes is positive). Hence $(\mathbb{R}, +, \cdot, \le)$ is an **ordered field**, with $\mathbb{Q} \hookrightarrow \mathbb{R}$ via constant sequences preserving all structure. $\square$`,
  },
  {
    id: 'real-numbers',
    label: 'Real Numbers ℝ',
    title: 'Real Numbers (ℝ)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-reals', 'cauchy-reals', 'completeness', 'archimedean-property'],
    description: String.raw`The **real numbers** are *the* complete ordered field. The Dedekind-cut and Cauchy-sequence constructions each produce a complete ordered field, and any two complete ordered fields are uniquely order-isomorphic — so the choice of construction is irrelevant and the symbol $\mathbb{R}$ is unambiguous. The reals are the continuum on which all of one-variable analysis takes place.`,
    definition: String.raw`A **complete ordered field** is an ordered field with the least upper bound property. The **real numbers** $\mathbb{R}$ are defined to be such a field; concretely it may be taken as the field of Dedekind cuts or as the field of Cauchy sequences of rationals modulo null difference.`,
    proof: String.raw`*Uniqueness up to unique isomorphism.* Let $F, F'$ be complete ordered fields. Each contains a canonical copy of $\mathbb{Q}$: the prime subfield generated by $0, 1$ under the field operations, with the unique field embedding $\iota : \mathbb{Q} \to F$, $\iota' : \mathbb{Q} \to F'$, both order-preserving because the order of an ordered field is forced on $\mathbb{Q}$ (squares are non-negative and $1 > 0$). Write $q := \iota(q)$, $q' := \iota'(q)$.

*The defining set is admissible.* Fix $x \in F$. By the **Archimedean property** of $F$, the set $D_x := \{ q \in \mathbb{Q} : q < x \}$ is non-empty (some integer is $< x$) and bounded above in $\mathbb{Q}$ (some integer exceeds $x$). Its image $\{ q' : q \in D_x \} \subseteq F'$ is therefore non-empty and bounded above (by any rational upper bound of $D_x$, transported to $F'$), so by **completeness** of $F'$ its supremum exists. Define
$$\varphi : F \to F', \qquad \varphi(x) := \sup{}'\{ q' : q \in \mathbb{Q},\, q < x \}.$$
For $x = p \in \mathbb{Q}$ the set is $\{ q' : q < p \}$, whose supremum is $p'$ (it is an upper bound since $q < p \Rightarrow q' < p'$, and no smaller element is an upper bound, as the rationals are dense below $p$ by the Archimedean property), so $\varphi$ fixes $\mathbb{Q}$.

*Order-preserving.* If $x < y$ in $F$, Archimedean density gives a rational $r$ with $x < r < y$; then $D_x \subseteq \{ q : q < r \}$ while $r' \le \varphi(y)$, and one checks $\varphi(x) \le r' \le \varphi(y)$ with strictness because some rational lies strictly between $x$ and $r$. Thus $x \le y \iff \varphi(x) \le \varphi(y)$.

*Additivity.* For any $x, y \in F$,
$$\{ q' : q < x + y \} \quad\text{and}\quad \{ p' + r' : p < x,\, r < y \}$$
have the same supremum. Indeed, if $p < x$ and $r < y$ then $p + r < x + y$, so $(p + r)' = p' + r'$ lies in the left-hand set, giving $\sup' \le \varphi(x+y)$; conversely, if $q < x + y$, choose (Archimedean density) rationals $p < x$, $r < y$ with $p + r > q$ (possible since $q - x < y$ admits a rational $r$ with $q - x < r < y$, then $q - r < x$ admits a rational $p$ with $q - r < p < x$), whence $q' < p' + r'$, so $\varphi(x+y) \le \sup'\{ p' + r' \}$. Since the supremum of $\{ p' + r' : p < x, r < y \}$ is $\sup'\{ p' : p < x \} + \sup'\{ r' : r < y \} = \varphi(x) + \varphi(y)$ (the sup of a sum of two bounded sets is the sum of the sups), we get $\varphi(x + y) = \varphi(x) + \varphi(y)$.

*Multiplicativity.* First take $x, y > 0$. For positive rationals $0 < p < x$, $0 < r < y$ we have $pr < xy$, and conversely every rational $0 < q < xy$ is of the form $q < pr$ for suitable such $p, r$; the same supremum argument (now with products of positive rationals, where $q \mapsto q'$ preserves products and order) gives $\varphi(xy) = \varphi(x)\varphi(y)$. The case of general signs reduces to this: $\varphi(0) = 0$ and $\varphi(-x) = -\varphi(x)$ by additivity, so for $x < 0 < y$, $\varphi(xy) = \varphi(-((-x)y)) = -\varphi((-x)y) = -\varphi(-x)\varphi(y) = \varphi(x)\varphi(y)$, and similarly when both are negative. Hence $\varphi$ is multiplicative.

*Bijection and uniqueness.* $\varphi$ is injective (order-preserving and strictly monotone) and surjective: the same construction from $F'$ to $F$ yields a homomorphism $\psi$, and $\psi \circ \varphi$ is an order-preserving field homomorphism fixing $\mathbb{Q}$, hence the identity by the density argument below, so $\varphi$ is a bijection. Finally, any order-preserving field isomorphism $\theta : F \to F'$ fixes $\mathbb{Q}$ (it is a field map), and for each $x$, density forces $\theta(x) = \sup'\{ q' : q < x \} = \varphi(x)$: $\theta$ is an upper bound of $\{ q' : q < x \}$ and is bounded above by every $r'$ with $r > x$, so by the squeeze of rationals around $x$ it equals the supremum. Hence the isomorphism is unique. $\square$`,
  },

  // ── Limits of sequences ──────────────────────────────────────────────────
  {
    id: 'limit-of-a-sequence',
    label: 'Limit of a Sequence',
    title: 'Limit of a Sequence (Convergence)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'real-numbers', 'absolute-value'],
    description: String.raw`A sequence of reals **converges** to a number $L$ when, for every tolerance, the terms are eventually within that tolerance of $L$. The $\varepsilon$–$N$ formulation makes the intuitive idea of "approaching $L$" completely precise: given any $\varepsilon > 0$, all terms from some index $N$ on lie in the interval $(L - \varepsilon, L + \varepsilon)$.`,
    definition: String.raw`A sequence $(a_n)$ of reals **converges** to $L \in \mathbb{R}$, written $a_n \to L$ or $\lim_{n\to\infty} a_n = L$, when
$$\forall \varepsilon > 0\;\exists N \in \mathbb{N}\;\forall n \ge N\;\; |a_n - L| < \varepsilon.$$
The sequence is **convergent** if such an $L$ exists, **divergent** otherwise.`,
  },
  {
    id: 'limit-uniqueness-sequence',
    label: 'Uniqueness of Limits',
    title: 'Uniqueness of Sequential Limits',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence', 'triangle-inequality'],
    description: String.raw`A convergent sequence cannot approach two different numbers at once: its limit is unique. This is what licenses the notation $\lim_n a_n$ as denoting a single well-defined value. The proof is the prototypical "$\varepsilon/2$" argument.`,
    statement: String.raw`If $a_n \to L$ and $a_n \to L'$, then $L = L'$.`,
    proof: String.raw`Suppose $L \neq L'$ and set $\varepsilon = |L - L'| / 2 > 0$. By convergence there are $N_1, N_2$ with $|a_n - L| < \varepsilon$ for $n \ge N_1$ and $|a_n - L'| < \varepsilon$ for $n \ge N_2$. For $n \ge \max(N_1, N_2)$, the **triangle inequality** gives
$$|L - L'| \le |L - a_n| + |a_n - L'| < \varepsilon + \varepsilon = |L - L'|,$$
a contradiction. Hence $L = L'$. $\square$`,
  },
  {
    id: 'convergent-implies-bounded',
    label: 'Convergent ⇒ Bounded',
    title: 'Convergent Sequences are Bounded',
    kind: 'lemma',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence', 'triangle-inequality'],
    description: String.raw`A sequence that settles down to a limit cannot run off to infinity: it is bounded. The reason is simple — all but finitely many terms lie within $1$ of the limit, and finitely many terms are always bounded. This is a routine but constantly used ingredient in the limit laws.`,
    statement: String.raw`Every convergent sequence of reals is bounded.`,
    proof: String.raw`Let $a_n \to L$. With $\varepsilon = 1$ there is $N$ with $|a_n - L| < 1$ for all $n \ge N$, so $|a_n| \le |L| + 1$ for $n \ge N$ by the **triangle inequality**. Let $M = \max\{|a_0|, \dots, |a_{N-1}|, |L| + 1\}$, a maximum of finitely many reals. Then $|a_n| \le M$ for every $n$, so $(a_n)$ is bounded. $\square$`,
  },
  {
    id: 'limit-laws-sequences',
    label: 'Limit Laws (Sequences)',
    title: 'Algebraic Limit Laws for Sequences',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence', 'triangle-inequality', 'absolute-value-multiplicative', 'convergent-implies-bounded'],
    description: String.raw`Limits respect arithmetic: the limit of a sum, product, or quotient is the sum, product, or quotient of the limits (with a non-zero denominator). These laws let one compute limits compositionally instead of returning to the $\varepsilon$–$N$ definition each time, and they propagate to limits of functions and series.`,
    statement: String.raw`If $a_n \to A$ and $b_n \to B$, then $a_n + b_n \to A + B$, $\;c\,a_n \to cA$ for any constant $c$, $\;a_n b_n \to AB$, and, if $B \neq 0$ and $b_n \neq 0$, $\;a_n / b_n \to A / B$.`,
    proof: String.raw`*Sum.* Given $\varepsilon > 0$, choose $N$ beyond which $|a_n - A| < \varepsilon/2$ and $|b_n - B| < \varepsilon/2$; then $|(a_n + b_n) - (A + B)| \le |a_n - A| + |b_n - B| < \varepsilon$ by the **triangle inequality**. Scaling by $c$ is similar (trivial if $c = 0$).

*Product.* By the lemma **convergent sequences are bounded**, $|a_n| \le M$ for some $M$. Write $a_n b_n - AB = a_n(b_n - B) + B(a_n - A)$, so by the triangle inequality and **multiplicativity** of $|\cdot|$,
$$|a_n b_n - AB| \le M\,|b_n - B| + |B|\,|a_n - A|.$$
Given $\varepsilon > 0$, make each summand $< \varepsilon/2$ for large $n$.

*Reciprocal.* Since $B \neq 0$, for large $n$ we have $|b_n| > |B|/2$, hence $\left| \tfrac{1}{b_n} - \tfrac{1}{B} \right| = \tfrac{|B - b_n|}{|b_n|\,|B|} \le \tfrac{2}{|B|^2}\,|b_n - B| \to 0$. The quotient law follows by combining this with the product law applied to $a_n \cdot (1/b_n)$. $\square$`,
  },
  {
    id: 'squeeze-theorem',
    label: 'Squeeze Theorem',
    title: 'Squeeze (Sandwich) Theorem',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence'],
    description: String.raw`If a sequence is trapped between two sequences that converge to the same limit, it must converge there too. This "sandwiching" is one of the most practical tools for evaluating limits, especially when direct estimation of the middle sequence is awkward.`,
    statement: String.raw`Let $a_n \le c_n \le b_n$ for all large $n$. If $a_n \to L$ and $b_n \to L$, then $c_n \to L$.`,
    proof: String.raw`Given $\varepsilon > 0$, choose $N$ so that for $n \ge N$ both $|a_n - L| < \varepsilon$ and $|b_n - L| < \varepsilon$ hold and $a_n \le c_n \le b_n$. Then $L - \varepsilon < a_n \le c_n \le b_n < L + \varepsilon$, so $|c_n - L| < \varepsilon$. As $\varepsilon$ was arbitrary, $c_n \to L$. $\square$`,
  },
  {
    id: 'monotone-convergence-sequence',
    label: 'Monotone Convergence (Sequences)',
    title: 'Monotone Convergence Theorem (Sequences)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence', 'completeness', 'supremum'],
    description: String.raw`A monotone sequence converges exactly when it is bounded — an increasing bounded sequence rises to its supremum, a decreasing bounded one falls to its infimum. This turns the abstract completeness of the reals into a usable convergence test: one can conclude convergence without knowing the limit in advance.`,
    statement: String.raw`A bounded monotone sequence of reals converges. If $(a_n)$ is increasing and bounded above, then $a_n \to \sup_n a_n$; if decreasing and bounded below, $a_n \to \inf_n a_n$.`,
    proof: String.raw`Take $(a_n)$ increasing and bounded above. By **completeness** the set $\{a_n : n \in \mathbb{N}\}$, being non-empty and bounded above, has a least upper bound $L = \sup_n a_n$. Fix $\varepsilon > 0$. Since $L - \varepsilon$ is not an upper bound, some $a_N > L - \varepsilon$. By monotonicity, $a_n \ge a_N > L - \varepsilon$ for all $n \ge N$; and $a_n \le L$ always. Hence $|a_n - L| < \varepsilon$ for $n \ge N$, so $a_n \to L$. The decreasing case follows by applying this to $(-a_n)$, using $\inf_n a_n = -\sup_n(-a_n)$. $\square$`,
  },
  {
    id: 'bolzano-weierstrass',
    label: 'Bolzano–Weierstrass',
    title: 'Bolzano–Weierstrass Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['sequence', 'completeness', 'monotone-convergence-sequence'],
    description: String.raw`Every bounded sequence of reals has a convergent subsequence. It is the sequential face of compactness and the standard device for extracting a limit out of thin air in existence proofs. The cleanest proof first finds a monotone subsequence, then applies monotone convergence.`,
    statement: String.raw`Every bounded sequence $(a_n)$ in $\mathbb{R}$ has a convergent subsequence. (Hence so does every bounded sequence in $\mathbb{R}^n$, by extracting coordinatewise.)`,
    proof: String.raw`First, *every* real sequence has a monotone subsequence. Call $m$ a **peak** index if $a_m \ge a_n$ for all $n > m$. If there are infinitely many peaks $m_1 < m_2 < \cdots$, then $(a_{m_k})$ is (weakly) decreasing. If there are only finitely many, pick $n_1$ past the last peak; since $n_1$ is not a peak there is $n_2 > n_1$ with $a_{n_2} > a_{n_1}$, and since $n_2$ is not a peak we continue, building a strictly increasing subsequence. Either way we obtain a monotone subsequence.

This subsequence is bounded (being a subsequence of a bounded sequence), so by the **Monotone Convergence Theorem** it converges. For $\mathbb{R}^n$, apply the result to the first coordinate, pass to that subsequence and apply it to the second, and so on through all $n$ coordinates; the final subsequence converges in every coordinate, hence in $\mathbb{R}^n$. $\square$`,
  },
  {
    id: 'cauchy-complete-reals',
    label: 'ℝ is Cauchy-Complete',
    title: 'Cauchy Sequences in ℝ Converge',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['cauchy-sequence', 'limit-of-a-sequence', 'bolzano-weierstrass', 'triangle-inequality'],
    description: String.raw`In the reals, the Cauchy condition is not just necessary but sufficient for convergence: every Cauchy sequence converges to a real limit. This is the form of completeness used to verify convergence without a candidate limit, and it is what makes the reals (and metric spaces modelled on them) the natural home for analysis.`,
    statement: String.raw`A sequence of reals converges if and only if it is Cauchy.`,
    proof: String.raw`($\Rightarrow$) If $a_n \to L$, then given $\varepsilon > 0$ choose $N$ with $|a_n - L| < \varepsilon/2$ for $n \ge N$; for $m, n \ge N$, $|a_m - a_n| \le |a_m - L| + |L - a_n| < \varepsilon$ by the **triangle inequality**, so $(a_n)$ is Cauchy.

($\Leftarrow$) Let $(a_n)$ be Cauchy. It is bounded: take $\varepsilon = 1$ to get $N$ with $|a_n - a_N| < 1$, so $|a_n| \le |a_N| + 1$ for $n \ge N$, and the earlier terms are finitely many. By **Bolzano–Weierstrass** some subsequence $a_{n_k} \to L$. Now fix $\varepsilon > 0$, pick $N$ with $|a_m - a_n| < \varepsilon/2$ for $m, n \ge N$, and pick $k$ with $n_k \ge N$ and $|a_{n_k} - L| < \varepsilon/2$. Then for $n \ge N$, $|a_n - L| \le |a_n - a_{n_k}| + |a_{n_k} - L| < \varepsilon$. Hence $a_n \to L$. $\square$`,
  },

  // ── Limits and continuity of functions ───────────────────────────────────
  {
    id: 'limit-of-a-function',
    label: 'Limit of a Function',
    title: 'Limit of a Function',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['real-numbers', 'absolute-value', 'function'],
    description: String.raw`The function $f$ has **limit** $L$ at the point $a$ when its output can be forced arbitrarily close to $L$ by taking the input close enough to — but distinct from — $a$. The $\varepsilon$–$\delta$ definition captures this exactly: every output tolerance $\varepsilon$ is met by some input tolerance $\delta$. This single notion underlies continuity, derivatives, and integrals.`,
    definition: String.raw`Let $f$ be defined on a set $D$ with $a$ a limit point of $D$. Then $\lim_{x \to a} f(x) = L$ means
$$\forall \varepsilon > 0\;\exists \delta > 0\;\forall x \in D\,\bigl(0 < |x - a| < \delta \rightarrow |f(x) - L| < \varepsilon\bigr).$$
The restriction $x \in D$ ensures $f(x)$ is defined; that $a$ is a limit point of $D$ guarantees such points $x$ exist arbitrarily close to $a$. The value $f(a)$, if defined, plays no role. (Equivalently, by the sequential criterion, $f(x) \to L$ as $x \to a$ iff $f(x_n) \to L$ for every sequence $x_n \to a$ in $D$ with $x_n \neq a$.)`,
  },
  {
    id: 'limit-uniqueness-function',
    label: 'Uniqueness of Function Limits',
    title: 'Uniqueness of Limits of Functions',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function', 'triangle-inequality'],
    description: String.raw`A function cannot tend to two different values at a single point: its limit at $a$, when it exists, is unique. This justifies writing $\lim_{x\to a} f(x)$ for one definite number, mirroring the uniqueness of sequential limits.`,
    statement: String.raw`If $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} f(x) = L'$, then $L = L'$.`,
    proof: String.raw`Suppose $L \neq L'$ and set $\varepsilon = |L - L'|/2 > 0$. Get $\delta_1, \delta_2 > 0$ with $|f(x) - L| < \varepsilon$ whenever $0 < |x - a| < \delta_1$, and $|f(x) - L'| < \varepsilon$ whenever $0 < |x - a| < \delta_2$. Because $a$ is a limit point of the domain, some $x$ satisfies $0 < |x - a| < \min(\delta_1, \delta_2)$. For that $x$, the **triangle inequality** gives $|L - L'| \le |L - f(x)| + |f(x) - L'| < |L - L'|$, a contradiction. So $L = L'$. $\square$`,
  },
  {
    id: 'continuity',
    label: 'Continuity',
    title: 'Continuity',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    description: String.raw`A function is **continuous at a point** when its limit there equals its value — no jump, no hole. Equivalently, every output tolerance $\varepsilon$ is achieved on some input neighbourhood $\delta$ of the point. A function continuous at every point of a set is continuous on it; informally, its graph can be drawn without lifting the pen.`,
    definition: String.raw`A function $f$ is **continuous at $a$** (a point of its domain) when
$$\forall \varepsilon > 0\;\exists \delta > 0\;\forall x\,\bigl(|x - a| < \delta \rightarrow |f(x) - f(a)| < \varepsilon\bigr),$$
equivalently $\lim_{x \to a} f(x) = f(a)$ when $a$ is a limit point. It is **continuous on** a set $S$ when continuous at every point of $S$. By the sequential criterion, $f$ is continuous at $a$ iff $f(x_n) \to f(a)$ for every sequence $x_n \to a$ in the domain.`,
  },

  {
    id: 'limit-laws-functions',
    label: 'Limit Laws (Functions)',
    title: 'Algebraic Limit Laws for Functions',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function', 'limit-laws-sequences', 'triangle-inequality'],
    description: String.raw`Limits of functions respect arithmetic exactly as limits of sequences do: the limit of a sum, product, or quotient (with non-vanishing denominator) is the sum, product, or quotient of the limits. These laws are what let one compute $\lim_{x\to a}$ compositionally, and they underlie the proofs that differentiability implies continuity and the product step of the chain rule.`,
    statement: String.raw`Suppose $\lim_{x \to a} f(x) = A$ and $\lim_{x \to a} g(x) = B$ (with $a$ a limit point of the common domain). Then as $x \to a$: $f(x) + g(x) \to A + B$; $\;c\,f(x) \to cA$ for any constant $c$; $\;f(x)\,g(x) \to AB$; and, if $B \neq 0$ and $g \neq 0$ near $a$, $\;f(x)/g(x) \to A/B$.`,
    proof: String.raw`We use the **sequential criterion** of the **limit of a function**: $\lim_{x\to a} f(x) = A$ iff $f(x_n) \to A$ for every sequence $x_n \to a$ in the domain with $x_n \neq a$. Let $(x_n)$ be any such sequence. Then $f(x_n) \to A$ and $g(x_n) \to B$, so by the **algebraic limit laws for sequences**:
$f(x_n) + g(x_n) \to A + B$, $\;c\,f(x_n) \to cA$, and $\;f(x_n)g(x_n) \to AB$. For the quotient, since $g \neq 0$ on a punctured neighbourhood of $a$ and $x_n \to a$ with $x_n \neq a$, eventually $x_n$ lies in that neighbourhood, so $g(x_n) \neq 0$ for all large $n$; together with $B \neq 0$ the sequence quotient law gives $f(x_n)/g(x_n) \to A/B$. Since this holds for *every* admissible sequence $x_n \to a$, the sequential criterion gives the corresponding function-limit statements: $f(x) + g(x) \to A + B$, $c\,f(x) \to cA$, $f(x)g(x) \to AB$, and $f(x)/g(x) \to A/B$. $\square$`,
  },
  {
    id: 'limit-of-composition',
    label: 'Limit of a Composition',
    title: 'Limit of a Composition',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function', 'continuity'],
    description: String.raw`If the inner function tends to $b$ as $x \to a$ and the outer function is **continuous** at $b$, the composition tends to the outer function's value there. Continuity of the outer map at the limit point is exactly the hypothesis that makes this safe — without it, the naive substitution can fail. This is the engine of the Carathéodory proof of the chain rule.`,
    statement: String.raw`Let $g$ satisfy $\lim_{x \to a} g(x) = b$ and let $\varphi$ be continuous at $b$. Then $\lim_{x \to a} \varphi(g(x)) = \varphi(b)$.`,
    proof: String.raw`Fix $\varepsilon > 0$. By **continuity** of $\varphi$ at $b$ there is $\eta > 0$ such that $|y - b| < \eta \Rightarrow |\varphi(y) - \varphi(b)| < \varepsilon$ (the implication holds for *all* $y$ in $\varphi$'s domain within $\eta$ of $b$, including $y = b$). For this $\eta$, since $\lim_{x \to a} g(x) = b$, there is $\delta > 0$ such that $0 < |x - a| < \delta$ (with $x$ in $g$'s domain) implies $|g(x) - b| < \eta$. Combining, for $0 < |x - a| < \delta$ we have $|g(x) - b| < \eta$, hence $|\varphi(g(x)) - \varphi(b)| < \varepsilon$. As $\varepsilon$ was arbitrary, $\lim_{x \to a} \varphi(g(x)) = \varphi(b)$. (Crucially, continuity of $\varphi$ at $b$ covers the case $g(x) = b$, which a bare limit hypothesis on $\varphi$ would exclude.) $\square$`,
  },

  // ── Compactness and the classical existence theorems ─────────────────────
  {
    id: 'intermediate-value-theorem',
    label: 'Intermediate Value Theorem',
    title: 'Intermediate Value Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'completeness', 'supremum'],
    description: String.raw`A function continuous on a closed interval takes every value between its endpoint values — it cannot skip over an intermediate level. In particular a continuous function that changes sign has a root. This is the precise statement of "no gaps in the graph," and it rests squarely on the completeness of the reals.`,
    statement: String.raw`Let $f : [a, b] \to \mathbb{R}$ be continuous and let $y$ lie strictly between $f(a)$ and $f(b)$. Then $f(c) = y$ for some $c \in (a, b)$.`,
    proof: String.raw`Replacing $f$ by $f - y$ and, if necessary, by $-f$, we may assume $f(a) < 0 < f(b)$ and seek a root. Let
$$S = \{x \in [a, b] : f(x) < 0\}.$$
Then $a \in S$, so $S \neq \varnothing$, and $S$ is bounded above by $b$, so by **completeness** $c := \sup S$ exists, with $c \in [a, b]$. We show $f(c) = 0$.

If $f(c) > 0$, then by **continuity** there is $\delta > 0$ with $f(x) > 0$ for all $x \in (c - \delta, c]$, so $c - \delta$ is an upper bound for $S$ smaller than $c$, contradicting $c = \sup S$. If $f(c) < 0$, then $c < b$ (since $f(b) > 0$) and continuity gives $\delta > 0$ with $f(x) < 0$ on $[c, c + \delta)$, so points just above $c$ lie in $S$, contradicting that $c$ is an upper bound. Hence $f(c) = 0$, and $c \in (a,b)$ since $f(a) < 0 < f(b)$. $\square$`,
  },
  {
    id: 'heine-borel',
    label: 'Heine–Borel',
    title: 'Heine–Borel Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['compactness', 'bolzano-weierstrass', 'open-closed-sets'],
    description: String.raw`In Euclidean space, the abstract finiteness condition of compactness coincides with a concrete, checkable one: a set is compact (every open cover has a finite subcover) exactly when it is closed and bounded. This equivalence is what makes compactness a workable hypothesis in real analysis.`,
    statement: String.raw`A subset $K \subseteq \mathbb{R}^n$ is compact if and only if it is closed and bounded.`,
    proof: String.raw`($\Rightarrow$) If $K$ is compact it is bounded: the open balls $B(0, m)$, $m \in \mathbb{N}$, cover $K$, and a finite subcover is contained in the largest ball. It is closed: given $p \notin K$, each $x \in K$ has disjoint balls around $x$ and $p$; the balls around the points of $K$ cover $K$, a finite subcover leaves a ball around $p$ missing $K$, so the complement is open.

($\Leftarrow$) Suppose $K$ is closed and bounded but, for contradiction, some open cover $\mathcal{U}$ has no finite subcover. Enclose $K$ in a box and bisect each side, producing $2^n$ sub-boxes; at least one meets $K$ in a part with no finite subcover. Repeating gives nested boxes of diameters $\to 0$, each meeting such a "bad" part of $K$. Picking a point of $K$ in each box yields a bounded sequence; by **Bolzano–Weierstrass** it has a subsequence converging to some $p$, and $p \in K$ because $K$ is **closed**. Some $U \in \mathcal{U}$ contains $p$, hence contains an entire small box of the nesting (diameters shrink to $0$), so that box *is* finitely covered — by the single set $U$ — contradicting its badness. Thus a finite subcover exists. $\square$`,
  },
  {
    id: 'extreme-value-theorem-analysis',
    label: 'Extreme Value Theorem',
    title: 'Extreme Value Theorem (Closed Interval)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'bolzano-weierstrass'],
    description: String.raw`A continuous function on a closed bounded interval attains a maximum and a minimum value — the supremum and infimum of its range are actually achieved at points of the interval. This is the existence theorem behind optimization on intervals and a key ingredient of Rolle's theorem.`,
    statement: String.raw`If $f : [a, b] \to \mathbb{R}$ is continuous, then $f$ is bounded and attains its maximum and minimum: there are $p, q \in [a, b]$ with $f(p) \le f(x) \le f(q)$ for all $x \in [a, b]$.`,
    proof: String.raw`*Boundedness.* If $f$ were unbounded above, there would be $x_n \in [a, b]$ with $f(x_n) > n$. By **Bolzano–Weierstrass**, $x_{n_k} \to x^* \in [a, b]$ (the limit stays in the closed interval). By **continuity** $f(x_{n_k}) \to f(x^*)$, a finite number, contradicting $f(x_{n_k}) > n_k \to \infty$. So $f$ is bounded above; likewise below.

*Attainment.* Let $M = \sup_{x \in [a,b]} f(x)$, finite by boundedness. Choose $x_n$ with $f(x_n) > M - 1/n$, so $f(x_n) \to M$. By Bolzano–Weierstrass take $x_{n_k} \to q \in [a, b]$; by continuity $f(q) = \lim_k f(x_{n_k}) = M$. Thus the maximum $M$ is attained at $q$. Applying this to $-f$ yields a minimizer $p$. $\square$`,
  },

  // ── The derivative ───────────────────────────────────────────────────────
  {
    id: 'derivative',
    label: 'Derivative',
    title: 'Derivative',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    description: String.raw`The **derivative** of $f$ at $a$ is the limiting slope of the chords through $\bigl(a, f(a)\bigr)$ — the instantaneous rate of change, the slope of the tangent line. It is defined as the limit of the difference quotient as the second point slides toward the first. Differentiability is strictly stronger than continuity.`,
    definition: String.raw`The **derivative** of $f$ at a point $a$ of its domain that is also a limit point of the domain is
$$f'(a) := \lim_{h \to 0} \frac{f(a + h) - f(a)}{h},$$
when this limit exists, in which case $f$ is **differentiable at $a$**. Equivalently $f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$. (The difference quotient is evaluated only at points $a + h$ of the domain; on a closed interval $[a,b]$ the endpoints qualify, giving the one-sided derivatives $f'(a)$, $f'(b)$.)`,
  },
  {
    id: 'differentiable-implies-continuous',
    label: 'Differentiable ⇒ Continuous',
    title: 'Differentiability Implies Continuity',
    kind: 'lemma',
    tags: ['Analysis'],
    dependencies: ['derivative', 'continuity', 'limit-laws-functions'],
    description: String.raw`Wherever a function has a derivative it is continuous — a tangent line cannot exist at a break in the graph. The converse fails (the absolute value at $0$, or Weierstrass's nowhere-differentiable function), so differentiability is the genuinely stronger condition.`,
    statement: String.raw`If $f$ is differentiable at $a$, then $f$ is continuous at $a$.`,
    proof: String.raw`For $x \neq a$ write $f(x) - f(a) = \dfrac{f(x) - f(a)}{x - a}\,(x - a)$. As $x \to a$, the difference quotient tends to $f'(a)$ and the factor $(x - a)$ tends to $0$, so by the **product law for function limits** $f(x) - f(a) \to f'(a) \cdot 0 = 0$. Hence $\lim_{x \to a} f(x) = f(a)$, which is **continuity** at $a$. $\square$`,
  },
  {
    id: 'product-rule',
    label: 'Product Rule',
    title: 'Product Rule',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'limit-laws-functions', 'differentiable-implies-continuous'],
    description: String.raw`The **product rule** differentiates a product: the rate of change of $fg$ is $f'g + fg'$. The two terms record the two ways the product changes — through the first factor while the second is held, and through the second while the first is held. It is the multiplicative companion of linearity of the derivative and the basis for integration by parts.`,
    statement: String.raw`If $f$ and $g$ are differentiable at $a$, then $fg$ is differentiable at $a$ with $(fg)'(a) = f'(a)\,g(a) + f(a)\,g'(a)$.`,
    proof: String.raw`For $x \neq a$ split the difference quotient of $fg$ by adding and subtracting $f(x)\,g(a)$:
$$\frac{f(x)g(x) - f(a)g(a)}{x - a} = f(x)\,\frac{g(x) - g(a)}{x - a} + g(a)\,\frac{f(x) - f(a)}{x - a}.$$
As $x \to a$, the quotient $\dfrac{g(x) - g(a)}{x - a} \to g'(a)$ and $\dfrac{f(x) - f(a)}{x - a} \to f'(a)$ by the definition of the **derivative**, while $f(x) \to f(a)$ because $f$, being differentiable at $a$, is **continuous** at $a$ (differentiability implies continuity). By the sum and product **limit laws for functions**, the right-hand side tends to $f(a)\,g'(a) + g(a)\,f'(a)$. Hence the limit defining $(fg)'(a)$ exists and equals $f'(a)\,g(a) + f(a)\,g'(a)$. $\square$`,
  },
  {
    id: 'chain-rule',
    label: 'Chain Rule',
    title: 'Chain Rule',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'differentiable-implies-continuous', 'limit-laws-functions', 'limit-of-composition', 'continuity'],
    description: String.raw`The **chain rule** differentiates a composition: the rate of change of $f \circ g$ is the rate of change of $f$ at $g(a)$ times the rate of change of $g$ at $a$. It is the engine behind implicit differentiation and substitution, and it generalizes to multivariable maps as the product of Jacobian matrices.`,
    statement: String.raw`If $g$ is differentiable at $a$ and $f$ is differentiable at $b = g(a)$, then $f \circ g$ is differentiable at $a$ with $(f \circ g)'(a) = f'(g(a))\,g'(a)$.`,
    proof: String.raw`Define the auxiliary function
$$\varphi(y) = \begin{cases} \dfrac{f(y) - f(b)}{y - b} & y \neq b, \\[4pt] f'(b) & y = b. \end{cases}$$
By the derivative of $f$ at $b$, $\lim_{y \to b} \varphi(y) = f'(b) = \varphi(b)$, so $\varphi$ is continuous at $b$, and for *all* $y$ (including $y = b$) we have the identity $f(y) - f(b) = \varphi(y)\,(y - b)$. Substituting $y = g(x)$:
$$\frac{f(g(x)) - f(g(a))}{x - a} = \varphi(g(x)) \cdot \frac{g(x) - g(a)}{x - a}.$$
As $x \to a$: $g(x) \to g(a) = b$ since $g$ is **continuous** at $a$ (differentiability implies continuity); $\varphi$ is continuous at $b$, so by the **limit of a composition** $\varphi(g(x)) \to \varphi(b) = f'(b)$. The second factor $\frac{g(x) - g(a)}{x - a} \to g'(a)$ by definition of the derivative. By the **product law for function limits** the product of the two factors tends to $f'(b)\,g'(a)$, which is therefore $(f \circ g)'(a)$. $\square$`,
  },
  {
    id: 'higher-order-derivative',
    label: 'Higher-Order Derivative',
    title: 'Higher-Order Derivatives',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['derivative'],
    description: String.raw`Differentiating repeatedly yields the **higher-order derivatives**: the second derivative is the derivative of the first, and so on. A function is $C^n$ when its $n$-th derivative exists and is continuous, and **smooth** when derivatives of all orders exist. The second derivative measures concavity; the whole tower underlies Taylor approximation.`,
    definition: String.raw`The higher derivatives of $f$ are defined recursively: $f^{(0)} = f$, and $f^{(n)} = \bigl(f^{(n-1)}\bigr)'$ wherever the right side exists. Write $f'' = f^{(2)}$, $f''' = f^{(3)}$. A function is **$C^n$** on an open set if $f^{(n)}$ exists and is continuous there, and **smooth** ($C^\infty$) if $f^{(n)}$ exists for every $n$.`,
  },

  // ── Mean value theorem and its consequences ──────────────────────────────
  {
    id: 'fermat-stationary-point',
    label: "Fermat's Stationary Point",
    title: "Fermat's Theorem (Interior Extrema)",
    kind: 'lemma',
    tags: ['Analysis'],
    dependencies: ['derivative'],
    description: String.raw`At an interior point where a differentiable function attains a local maximum or minimum, the derivative must vanish — the tangent is horizontal. This is the link between optimization and calculus, and the first step toward Rolle's theorem and the mean value theorem.`,
    statement: String.raw`If $f$ has a local maximum or minimum at an interior point $c$ of its domain and is differentiable at $c$, then $f'(c) = 0$.`,
    proof: String.raw`Suppose $c$ is a local maximum (the minimum case is the negative of this). For small $h > 0$, $f(c + h) - f(c) \le 0$, so the right-hand difference quotient $\frac{f(c+h) - f(c)}{h} \le 0$; letting $h \downarrow 0$ gives $f'(c) \le 0$. For small $h < 0$, $\frac{f(c+h)-f(c)}{h} \ge 0$ (negative over negative), so letting $h \uparrow 0$ gives $f'(c) \ge 0$. Since $f'(c)$ exists, both one-sided limits equal it, forcing $f'(c) = 0$. $\square$`,
  },
  {
    id: 'rolles-theorem',
    label: "Rolle's Theorem",
    title: "Rolle's Theorem",
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'continuity', 'extreme-value-theorem-analysis', 'fermat-stationary-point'],
    description: String.raw`If a function is continuous on a closed interval, differentiable inside it, and takes equal values at the endpoints, then its derivative vanishes somewhere strictly between — a level secant forces a horizontal tangent. It is the special case from which the mean value theorem is obtained by tilting.`,
    statement: String.raw`Let $f$ be continuous on $[a, b]$, differentiable on $(a, b)$, with $f(a) = f(b)$. Then $f'(c) = 0$ for some $c \in (a, b)$.`,
    proof: String.raw`By the **Extreme Value Theorem**, $f$ attains a maximum at some $p \in [a, b]$ and a minimum at some $q \in [a, b]$. If both are attained only at the endpoints, then $\max f = \min f = f(a) = f(b)$, so $f$ is constant and $f'(c) = 0$ for every $c \in (a, b)$. Otherwise at least one of $p, q$ lies in the open interval $(a, b)$; call it $c$. There $f$ has an interior local extremum and is differentiable, so by **Fermat's theorem** $f'(c) = 0$. $\square$`,
  },
  {
    id: 'mean-value-theorem',
    label: 'Mean Value Theorem',
    title: 'Mean Value Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'continuity', 'rolles-theorem'],
    description: String.raw`On any interval, the instantaneous rate of change of a differentiable function equals its average rate of change at some interior point. It is the bridge from the local derivative to global behaviour: monotonicity tests, the uniqueness of antiderivatives up to a constant, and Taylor's remainder all flow from it.`,
    statement: String.raw`If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there is $c \in (a, b)$ with $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.`,
    proof: String.raw`Let $g(x) = f(x) - f(a) - \dfrac{f(b) - f(a)}{b - a}(x - a)$, the difference between $f$ and the secant line. Then $g$ is continuous on $[a, b]$ and differentiable on $(a, b)$ (sums and scalar multiples of such functions), and $g(a) = 0 = g(b)$. By **Rolle's theorem** there is $c \in (a, b)$ with $g'(c) = 0$, i.e. $f'(c) - \dfrac{f(b) - f(a)}{b - a} = 0$, which rearranges to the claim. $\square$`,
  },
  {
    id: 'mvt-constant-corollary',
    label: 'Zero Derivative ⇒ Constant',
    title: 'Functions with Zero Derivative are Constant',
    kind: 'corollary',
    tags: ['Analysis'],
    dependencies: ['mean-value-theorem'],
    description: String.raw`A function whose derivative vanishes throughout an interval is constant there; consequently two functions with the same derivative differ by a constant. This is what makes the antiderivative well-defined up to an additive constant, and it is the engine of the second part of the fundamental theorem of calculus.`,
    statement: String.raw`If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f' \equiv 0$ on $(a, b)$, then $f$ is constant on $[a, b]$. Hence if $f' = g'$ on an interval, then $f - g$ is constant.`,
    proof: String.raw`Take any $x \in (a, b]$. By the **Mean Value Theorem** applied on $[a, x]$, there is $c \in (a, x)$ with $f(x) - f(a) = f'(c)(x - a) = 0$, so $f(x) = f(a)$. Thus $f$ is constant. Applying this to $f - g$, whose derivative is $f' - g' = 0$, shows $f - g$ is constant. $\square$`,
  },
  {
    id: 'mvt-monotonicity-corollary',
    label: 'Sign of Derivative ⇒ Monotonicity',
    title: 'Positive Derivative Implies Strictly Increasing',
    kind: 'corollary',
    tags: ['Analysis'],
    dependencies: ['mean-value-theorem'],
    description: String.raw`The sign of the derivative governs the monotonicity of the function: a positive derivative throughout an interval forces it to be strictly increasing, a negative derivative forces it strictly decreasing. This is the calculus test for monotonicity, read straight off the Mean Value Theorem, and it is what makes the first-derivative test for extrema work.`,
    statement: String.raw`Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$. If $f'(x) > 0$ for all $x \in (a, b)$, then $f$ is strictly increasing on $[a, b]$; if $f'(x) < 0$ for all $x \in (a, b)$, then $f$ is strictly decreasing on $[a, b]$.`,
    proof: String.raw`Suppose $f' > 0$ on $(a, b)$ and take any $x, y \in [a, b]$ with $x < y$. The restriction of $f$ to $[x, y]$ is continuous on $[x, y]$ and differentiable on $(x, y)$, so by the **Mean Value Theorem** there is $c \in (x, y) \subseteq (a, b)$ with
$$f(y) - f(x) = f'(c)\,(y - x).$$
Here $f'(c) > 0$ by hypothesis and $y - x > 0$, so $f(y) - f(x) > 0$, i.e. $f(x) < f(y)$. As $x < y$ were arbitrary, $f$ is strictly increasing on $[a, b]$. If instead $f' < 0$ on $(a, b)$, the same computation gives $f'(c)\,(y - x) < 0$, hence $f(y) < f(x)$, so $f$ is strictly decreasing. $\square$`,
  },
  {
    id: 'mean-value-inequality',
    label: 'Mean Value Inequality',
    title: 'Mean Value Inequality (Vector-Valued Maps)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['total-derivative', 'fundamental-theorem-of-calculus', 'cauchy-schwarz'],
    description: String.raw`A vector-valued map has no exact "mean value" point in general, but the *inequality* survives: the displacement of the output is bounded by the largest operator norm of the derivative along the segment, times the displacement of the input. This Lipschitz-type bound is the workhorse replacement for the Mean Value Theorem in several variables, underlying the proofs of the inverse and implicit function theorems and the convergence of iterative schemes.`,
    statement: String.raw`Let $U \subseteq \mathbb{R}^n$ be open and convex and let $F : U \to \mathbb{R}^m$ be continuously differentiable ($C^1$). Then for all $x, y \in U$,
$$\| F(y) - F(x) \| \le \Bigl(\sup_{z \in [x, y]} \| DF(z) \|_{\mathrm{op}}\Bigr)\,\| y - x \|,$$
where $[x, y] = \{ x + t(y - x) : t \in [0, 1] \}$ and $\| L \|_{\mathrm{op}} = \sup_{\|v\| \le 1} \| L v \|$ is the operator norm.`,
    proof: String.raw`If $F(y) = F(x)$ the bound is trivial, so assume $F(y) \neq F(x)$ and set the unit vector $u = \dfrac{F(y) - F(x)}{\| F(y) - F(x) \|}$. Let $M = \sup_{z \in [x,y]} \| DF(z) \|_{\mathrm{op}}$, finite because $z \mapsto DF(z)$ is continuous on the compact segment $[x, y] \subseteq U$ (convexity keeps the segment inside $U$). Define the scalar function
$$\phi(t) = \langle F(x + t(y - x)),\, u \rangle, \qquad t \in [0, 1].$$
Since $F$ is $C^1$, the chain rule gives that $\phi$ is continuously differentiable with $\phi'(t) = \langle DF(x + t(y - x))\,(y - x),\, u \rangle$. By the **Fundamental Theorem of Calculus** applied to the $C^1$ scalar function $\phi$,
$$\langle F(y) - F(x),\, u \rangle = \phi(1) - \phi(0) = \int_0^1 \phi'(t)\,dt = \int_0^1 \langle DF(x + t(y - x))\,(y - x),\, u \rangle\,dt.$$
For each $t$, Cauchy–Schwarz and the definition of the operator norm give $\bigl|\langle DF(x + t(y-x))(y-x), u\rangle\bigr| \le \| DF(x + t(y-x))(y-x) \|\,\| u \| \le \| DF(x + t(y-x)) \|_{\mathrm{op}}\,\| y - x \| \le M\,\| y - x \|$. Bounding the integral by the supremum of its integrand,
$$\langle F(y) - F(x),\, u \rangle \le \int_0^1 M\,\| y - x \|\,dt = M\,\| y - x \|.$$
But by the choice of $u$, the left side equals $\langle F(y) - F(x), u \rangle = \dfrac{\langle F(y) - F(x), F(y) - F(x)\rangle}{\| F(y) - F(x) \|} = \| F(y) - F(x) \|$. Therefore $\| F(y) - F(x) \| \le M\,\| y - x \|$, which is the claim. $\square$`,
  },

  // ── The Riemann integral and FTC ─────────────────────────────────────────
  {
    id: 'riemann-integral',
    label: 'Riemann Integral',
    title: 'Riemann Integral',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'real-numbers', 'supremum'],
    description: String.raw`The **Riemann integral** of a bounded function on a closed interval is built by approximating the area under its graph with rectangles over a partition. Lower and upper Darboux sums underestimate and overestimate the area; the function is integrable when these two estimates can be brought arbitrarily close, and the common value is the integral.`,
    definition: String.raw`Let $f$ be bounded on $[a, b]$. For a partition $P : a = x_0 < x_1 < \cdots < x_n = b$ put $m_i = \inf_{[x_{i-1}, x_i]} f$, $M_i = \sup_{[x_{i-1}, x_i]} f$, $\Delta x_i = x_i - x_{i-1}$, and form the **lower** and **upper Darboux sums** $\underline{S}(P) = \sum_i m_i \Delta x_i$, $\overline{S}(P) = \sum_i M_i \Delta x_i$. The **lower** and **upper integrals** are $\underline{\int} f = \sup_P \underline{S}(P)$ and $\overline{\int} f = \inf_P \overline{S}(P)$ (both exist by boundedness). $f$ is **Riemann integrable** when these are equal, and then $\int_a^b f := \underline{\int} f = \overline{\int} f$.`,
  },
  {
    id: 'integrability-criterion',
    label: 'Riemann Criterion',
    title: "Riemann's Integrability Criterion",
    kind: 'lemma',
    tags: ['Analysis'],
    dependencies: ['riemann-integral'],
    description: String.raw`A bounded function is integrable precisely when some partition makes the gap between its upper and lower sums as small as desired. This is the practical test for integrability, converting the abstract sup/inf definition into a single $\varepsilon$-condition, and it is the key step in proving continuous functions integrable.`,
    statement: String.raw`A bounded $f : [a, b] \to \mathbb{R}$ is Riemann integrable if and only if for every $\varepsilon > 0$ there is a partition $P$ with $\overline{S}(P) - \underline{S}(P) < \varepsilon$.`,
    proof: String.raw`Refining a partition (adding points) raises lower sums and lowers upper sums, and any two partitions have a common refinement, so $\underline{S}(P) \le \underline{\int} f \le \overline{\int} f \le \overline{S}(Q)$ for all $P, Q$.

($\Leftarrow$) If $\overline{S}(P) - \underline{S}(P) < \varepsilon$ then $0 \le \overline{\int} f - \underline{\int} f \le \overline{S}(P) - \underline{S}(P) < \varepsilon$; as $\varepsilon$ is arbitrary the two integrals coincide, so $f$ is integrable.

($\Rightarrow$) If $f$ is integrable, then $\sup_P \underline{S}(P) = \inf_P \overline{S}(P) = \int_a^b f$. Given $\varepsilon > 0$, pick $P_1$ with $\underline{S}(P_1) > \int f - \varepsilon/2$ and $P_2$ with $\overline{S}(P_2) < \int f + \varepsilon/2$; their common refinement $P$ satisfies $\underline{S}(P) \ge \underline{S}(P_1)$ and $\overline{S}(P) \le \overline{S}(P_2)$, so $\overline{S}(P) - \underline{S}(P) < \varepsilon$. $\square$`,
  },
  {
    id: 'integral-basic-properties',
    label: 'Basic Integral Properties',
    title: 'Additivity and the Comparison Bound',
    kind: 'proposition',
    tags: ['Analysis'],
    dependencies: ['riemann-integral', 'integrability-criterion'],
    description: String.raw`Two workhorse properties of the Riemann integral, read straight off the Darboux definition: it is **additive over adjacent intervals**, $\int_a^c f = \int_a^b f + \int_b^c f$, and it obeys the **comparison/estimation bound** $\bigl|\int_a^b g\bigr| \le (b-a)\sup_{[a,b]}|g|$. The first lets accumulation functions be differentiated; the second turns a pointwise bound on the integrand into a bound on the integral.`,
    statement: String.raw`Let $f, g$ be Riemann integrable on the relevant intervals. **(Additivity)** For $a < b < c$, $f$ is integrable on $[a,c]$ iff it is integrable on both $[a,b]$ and $[b,c]$, and then $\int_a^c f = \int_a^b f + \int_b^c f$. **(Comparison bound)** If $|g(t)| \le K$ for all $t \in [a,b]$, then $\bigl|\int_a^b g\bigr| \le K(b-a)$; in particular $\bigl|\int_a^b g\bigr| \le (b-a)\sup_{[a,b]}|g|$.`,
    proof: String.raw`*Additivity.* Partitions $P$ of $[a,c]$ that include the point $b$ split uniquely as $P = P_1 \cup P_2$ with $P_1$ a partition of $[a,b]$ and $P_2$ of $[b,c]$, and then the Darboux sums split termwise: $\underline{S}_{[a,c]}(P) = \underline{S}_{[a,b]}(P_1) + \underline{S}_{[b,c]}(P_2)$, likewise for upper sums. Inserting $b$ into any partition only refines it (raising lower sums, lowering upper sums), so the suprema/infima may be computed over partitions containing $b$. Taking suprema of lower sums gives $\underline{\int}_a^c f = \underline{\int}_a^b f + \underline{\int}_b^c f$, and infima of upper sums gives $\overline{\int}_a^c f = \overline{\int}_a^b f + \overline{\int}_b^c f$. Hence the upper and lower integrals on $[a,c]$ agree iff they agree on each piece, and when they do the values add: $\int_a^c f = \int_a^b f + \int_b^c f$.

*Comparison bound.* Suppose $|g(t)| \le K$ on $[a,b]$, so $-K \le g(t) \le K$. For any partition $P$, each $M_i = \sup_{[x_{i-1},x_i]} g \le K$ and $m_i = \inf_{[x_{i-1},x_i]} g \ge -K$, so $\overline{S}(P) = \sum_i M_i \Delta x_i \le K\sum_i \Delta x_i = K(b-a)$ and likewise $\underline{S}(P) \ge -K(b-a)$. Therefore $-K(b-a) \le \underline{\int}_a^b g \le \int_a^b g \le \overline{\int}_a^b g \le K(b-a)$, i.e. $\bigl|\int_a^b g\bigr| \le K(b-a)$. Taking $K = \sup_{[a,b]}|g|$ gives the stated form. $\square$`,
  },
  {
    id: 'continuous-implies-integrable',
    label: 'Continuous ⇒ Integrable',
    title: 'Continuous Functions are Integrable',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'riemann-integral', 'integrability-criterion', 'uniform-continuity', 'heine-borel', 'extreme-value-theorem-analysis'],
    description: String.raw`Every continuous function on a closed bounded interval is Riemann integrable. The reason is uniform continuity: on a compact interval the modulus of continuity is uniform, so a fine enough partition keeps the oscillation on each subinterval tiny, squeezing upper and lower sums together.`,
    statement: String.raw`If $f : [a, b] \to \mathbb{R}$ is continuous, then $f$ is Riemann integrable.`,
    proof: String.raw`Since $[a, b]$ is compact (**Heine–Borel**), $f$ is **uniformly continuous** on it. Given $\varepsilon > 0$, choose $\delta > 0$ so that $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \frac{\varepsilon}{b - a}$. Take any partition $P$ with all $\Delta x_i < \delta$. On each subinterval $[x_{i-1}, x_i]$, $f$ attains its max $M_i$ and min $m_i$ (Extreme Value Theorem) at points within $\delta$ of each other, so $M_i - m_i \le \frac{\varepsilon}{b-a}$. Hence
$$\overline{S}(P) - \underline{S}(P) = \sum_i (M_i - m_i)\,\Delta x_i \le \frac{\varepsilon}{b - a} \sum_i \Delta x_i = \varepsilon.$$
By the **Riemann criterion**, $f$ is integrable. $\square$`,
  },
  {
    id: 'fundamental-theorem-of-calculus',
    label: 'Fundamental Theorem of Calculus',
    title: 'Fundamental Theorem of Calculus',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'riemann-integral', 'continuity', 'continuous-implies-integrable', 'mvt-constant-corollary', 'mean-value-theorem', 'integral-basic-properties'],
    description: String.raw`The **Fundamental Theorem of Calculus** reveals differentiation and integration as inverse processes. Its first part says the area-accumulation function of a continuous integrand is differentiable with derivative the integrand; its second part evaluates a definite integral as the change in any antiderivative across the interval. It converts the local notion of slope into the global notion of accumulated area.`,
    statement: String.raw`Let $f$ be continuous on $[a, b]$. **(I)** The function $A(x) = \int_a^x f$ is differentiable on $[a, b]$ with $A'(x) = f(x)$. **(II)** If $F$ is any antiderivative of $f$ on $[a, b]$ (continuous, with $F' = f$ on $(a,b)$), then $\int_a^b f = F(b) - F(a)$.`,
    proof: String.raw`$A$ is well defined since $f$ is integrable on each $[a, x]$ (**continuous $\Rightarrow$ integrable**).

**(I)** For $h \neq 0$, by **additivity of the integral over adjacent intervals** ($\int_a^{x+h} f = \int_a^x f + \int_x^{x+h} f$, a **basic property of the integral**), $\frac{A(x + h) - A(x)}{h} = \frac{1}{h}\int_x^{x+h} f$. Given $\varepsilon > 0$, **continuity** of $f$ at $x$ gives $\delta > 0$ with $|f(t) - f(x)| < \varepsilon$ for $|t - x| < \delta$. For $0 < |h| < \delta$, every $t$ between $x$ and $x + h$ satisfies $|f(t) - f(x)| < \varepsilon$, so by the **comparison/estimation bound** $\left|\int_x^{x+h} g\right| \le |h|\sup|g|$ applied to $g(t) = f(t) - f(x)$,
$$\left| \frac{A(x+h) - A(x)}{h} - f(x) \right| = \left| \frac{1}{h}\int_x^{x+h} (f(t) - f(x))\,dt \right| \le \frac{1}{|h|}\cdot |h|\cdot \varepsilon = \varepsilon.$$
Hence the difference quotient $\to f(x)$, i.e. $A'(x) = f(x)$.

**(II)** By (I), $A$ is an antiderivative of $f$. Then $(F - A)' = f - f = 0$ on $(a,b)$, so by the corollary **zero derivative $\Rightarrow$ constant**, $F - A$ is constant on $[a, b]$. Evaluating at $a$ and $b$: $F(b) - A(b) = F(a) - A(a)$. Since $A(a) = 0$ and $A(b) = \int_a^b f$, this gives $\int_a^b f = A(b) = F(b) - F(a)$. $\square$`,
  },
  {
    id: 'change-of-variables',
    label: 'Change of Variables',
    title: 'Change of Variables (Substitution)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['chain-rule', 'fundamental-theorem-of-calculus', 'continuous-implies-integrable'],
    description: String.raw`**Change of variables** is the chain rule read under the integral sign. Substituting $u = \varphi(x)$ converts an integral of $f(\varphi(x))\varphi'(x)$ into an integral of $f(u)$ with transformed limits. No monotonicity of $\varphi$ is required — the signed endpoints absorb any folding. The multivariable version replaces $\varphi'$ by the absolute Jacobian determinant.`,
    statement: String.raw`Let $\varphi$ be continuously differentiable on $[a, b]$ and $f$ continuous on an interval containing $\varphi([a, b])$. Then
$$\int_a^b f(\varphi(x))\,\varphi'(x)\,dx = \int_{\varphi(a)}^{\varphi(b)} f(u)\,du.$$`,
    proof: String.raw`Let $F$ be an antiderivative of $f$, which exists by part (I) of the **Fundamental Theorem of Calculus** (set $F(u) = \int_{\varphi(a)}^u f$). By the **chain rule**, $\frac{d}{dx}\,F(\varphi(x)) = F'(\varphi(x))\,\varphi'(x) = f(\varphi(x))\,\varphi'(x)$. The integrand $f(\varphi(x))\varphi'(x)$ is continuous (composition and product of continuous functions), hence **integrable**, and $F \circ \varphi$ is its antiderivative; so by part (II) of the FTC,
$$\int_a^b f(\varphi(x))\,\varphi'(x)\,dx = F(\varphi(b)) - F(\varphi(a)) = \int_{\varphi(a)}^{\varphi(b)} f(u)\,du,$$
the last equality again by part (II) applied to $f$ with antiderivative $F$. $\square$`,
  },

  // ── Taylor approximation ─────────────────────────────────────────────────
  {
    id: 'taylor-polynomial',
    label: 'Taylor Polynomial',
    title: 'Taylor Polynomial',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['higher-order-derivative', 'polynomial'],
    description: String.raw`The **Taylor polynomial** of degree $n$ at $a$ is the polynomial that matches a function's value and first $n$ derivatives at $a$. It is the best degree-$n$ polynomial fit near $a$ — agreeing to order $n$ — and its degree-$1$ case is exactly the tangent line. Taylor's theorem then measures how far the true function strays from it.`,
    definition: String.raw`For $f$ that is $n$ times differentiable at $a$, the **Taylor polynomial** of degree $n$ is
$$T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}\,(x - a)^k.$$
It is characterized by $T_n^{(k)}(a) = f^{(k)}(a)$ for $0 \le k \le n$, and is the unique polynomial of degree $\le n$ with this matching-derivatives property.`,
  },
  {
    id: 'taylor-theorem',
    label: "Taylor's Theorem",
    title: "Taylor's Theorem",
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['taylor-polynomial', 'mean-value-theorem', 'rolles-theorem'],
    description: String.raw`**Taylor's theorem** with the Lagrange remainder gives the exact error of the degree-$n$ Taylor polynomial as a single term involving the $(n+1)$-th derivative at some intermediate point. It is the higher-order generalization of the mean value theorem (recovered at $n = 0$), and it underlies error bounds and the convergence of power series.`,
    statement: String.raw`Let $f$ be $n+1$ times differentiable on an open interval containing $a$ and $x$. Then for some $c$ strictly between $a$ and $x$,
$$f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}\,(x - a)^{n+1}.$$`,
    proof: String.raw`Fix $x \neq a$ and let $M$ be the number defined by $f(x) = T_n(x) + M\,(x - a)^{n+1}$; we must show $M = \dfrac{f^{(n+1)}(c)}{(n+1)!}$ for some $c$ between $a$ and $x$. Define
$$g(t) = f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k - M\,(x - t)^{n+1}.$$
Then $g(x) = 0$, and $g(a) = f(x) - T_n(x) - M(x - a)^{n+1} = 0$ by the choice of $M$. By **Rolle's theorem** there is $c$ between $a$ and $x$ with $g'(c) = 0$. Differentiating $g$, the sum telescopes:
$$g'(t) = -\frac{f^{(n+1)}(t)}{n!}(x - t)^n + M(n+1)(x - t)^n.$$
Indeed, the $k = 0$ term of the sum is $f(t)$, with derivative $f'(t)$ (no second piece); and for $1 \le k \le n$, by the product rule the derivative of $\frac{f^{(k)}(t)}{k!}(x-t)^k$ is $\frac{f^{(k+1)}(t)}{k!}(x-t)^k - \frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}$. Summing, each subtracted piece at index $k$ cancels the added piece at index $k-1$ (a telescoping cascade), leaving only the unmatched $-\frac{f^{(n+1)}(t)}{n!}(x-t)^n$ from the top term; the derivative of $-M(x-t)^{n+1}$ contributes the remaining $M(n+1)(x-t)^n$. Setting $g'(c) = 0$ and dividing by $(x - c)^n \neq 0$ gives $M = \dfrac{f^{(n+1)}(c)}{(n+1)!}$, as required. (This refines the **Mean Value Theorem**, which is the case $n = 0$.) $\square$`,
  },

  // ── Sequences of functions and uniform convergence ───────────────────────
  {
    id: 'sequence-of-functions',
    label: 'Sequence of Functions',
    title: 'Sequence of Functions',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'function'],
    description: String.raw`A **sequence of functions** has functions, not numbers, for its terms, all on a common domain. The central issue is the *sense* in which the sequence approaches a limit function: different modes of convergence (pointwise, uniform) preserve different properties — continuity, integrability, differentiability — so the choice of mode matters greatly.`,
    definition: String.raw`A **sequence of functions** on a set $X$ is a sequence $(f_n)$ with each $f_n : X \to \mathbb{R}$. A **limit function** $f : X \to \mathbb{R}$ is a candidate for $f_n \to f$ in some specified mode of convergence.`,
  },
  {
    id: 'pointwise-convergence',
    label: 'Pointwise Convergence',
    title: 'Pointwise Convergence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence-of-functions', 'limit-of-a-sequence'],
    description: String.raw`A sequence of functions **converges pointwise** when, at each individual point, the values converge as a sequence of numbers. The catch is that the required index $N$ may depend on the point, so the convergence is uneven across the domain — which is why pointwise limits of continuous functions can be discontinuous.`,
    definition: String.raw`$(f_n)$ **converges pointwise** to $f$ on $X$ when for each $x \in X$, $f_n(x) \to f(x)$; that is,
$$\forall x \in X\;\forall \varepsilon > 0\;\exists N\;\forall n \ge N\;\; |f_n(x) - f(x)| < \varepsilon.$$
Here $N = N(x, \varepsilon)$ may depend on $x$.`,
  },
  {
    id: 'uniform-convergence',
    label: 'Uniform Convergence',
    title: 'Uniform Convergence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence-of-functions', 'supremum', 'absolute-value'],
    description: String.raw`A sequence of functions **converges uniformly** when a single index $N$ works simultaneously for all points — the maximum deviation from the limit shrinks to zero. This stronger, even mode of convergence is what allows continuity to pass to the limit and limits to be exchanged with integration.`,
    definition: String.raw`$(f_n)$ **converges uniformly** to $f$ on $X$ when
$$\forall \varepsilon > 0\;\exists N\;\forall n \ge N\;\; \sup_{x \in X} |f_n(x) - f(x)| < \varepsilon,$$
equivalently $\|f_n - f\|_\infty := \sup_{x} |f_n(x) - f(x)| \to 0$. Here $N = N(\varepsilon)$ is independent of $x$. Uniform convergence implies pointwise convergence.`,
  },
  {
    id: 'uniform-limit-continuous',
    label: 'Uniform Limit Theorem',
    title: 'Uniform Limit of Continuous Functions',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['uniform-convergence', 'continuity', 'triangle-inequality'],
    description: String.raw`A uniform limit of continuous functions is continuous. This is the headline reason uniform convergence is preferred over pointwise: the limit function inherits continuity. The proof is a clean "$\varepsilon/3$" argument splitting the deviation into three controllable pieces.`,
    statement: String.raw`If each $f_n$ is continuous on $X$ and $f_n \to f$ uniformly on $X$, then $f$ is continuous on $X$.`,
    proof: String.raw`Fix $a \in X$ and $\varepsilon > 0$. By **uniform convergence** choose $N$ with $\sup_x |f_N(x) - f(x)| < \varepsilon/3$. By **continuity** of $f_N$ at $a$, choose $\delta > 0$ with $|f_N(x) - f_N(a)| < \varepsilon/3$ for $|x - a| < \delta$. Then for such $x$, the **triangle inequality** gives
$$|f(x) - f(a)| \le |f(x) - f_N(x)| + |f_N(x) - f_N(a)| + |f_N(a) - f(a)| < \tfrac{\varepsilon}{3} + \tfrac{\varepsilon}{3} + \tfrac{\varepsilon}{3} = \varepsilon.$$
Hence $f$ is continuous at $a$; as $a$ was arbitrary, $f$ is continuous on $X$. $\square$`,
  },
  {
    id: 'weierstrass-approximation',
    label: 'Weierstrass Approximation',
    title: 'Weierstrass Approximation Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'polynomial', 'uniform-convergence', 'uniform-continuity', 'heine-borel', 'binomial-theorem', 'extreme-value-theorem-analysis'],
    description: String.raw`Every continuous function on a closed interval is a uniform limit of polynomials — the polynomials are dense in the continuous functions under the uniform norm. So the most general continuous function can be approximated arbitrarily well by the simplest possible functions; this is the foundation of approximation theory.`,
    statement: String.raw`For every continuous $f : [a, b] \to \mathbb{R}$ and every $\varepsilon > 0$ there is a polynomial $p$ with $\sup_{x \in [a, b]} |f(x) - p(x)| < \varepsilon$.`,
    proof: String.raw`Rescale to $[0, 1]$. For $f \in C[0, 1]$ define the **Bernstein polynomials**
$$B_n(f)(x) = \sum_{k=0}^{n} f\!\left(\tfrac{k}{n}\right) \binom{n}{k} x^k (1 - x)^{n-k}.$$
We show $B_n(f) \to f$ uniformly. The **binomial theorem** with $y = 1 - x$ gives $\sum_k \binom{n}{k}x^k(1-x)^{n-k} = (x + (1-x))^n = 1$, and a standard companion identity (obtained by differentiating $(x+y)^n$ in $x$ and recombining) gives $\sum_k \bigl(\tfrac{k}{n} - x\bigr)^2 \binom{n}{k}x^k(1-x)^{n-k} = \tfrac{x(1-x)}{n} \le \tfrac{1}{4n}$ (the maximum of $x(1-x)$ on $[0,1]$ being $\tfrac14$). With the first identity (weights summing to $1$), estimate, for fixed $x$,
$$|B_n(f)(x) - f(x)| \le \sum_k \bigl|f(\tfrac{k}{n}) - f(x)\bigr|\,\binom{n}{k}x^k(1-x)^{n-k}.$$
Since $[0,1]$ is compact (**Heine–Borel**), $f$ is **uniformly continuous**, and by the **Extreme Value Theorem** $f$ is bounded, say $|f| \le M$; given $\varepsilon > 0$ take $\delta$ with $|s - t| < \delta \Rightarrow |f(s) - f(t)| < \varepsilon/2$. Split the sum into terms with $|\tfrac{k}{n} - x| < \delta$ (contributing $< \varepsilon/2$, since the weights sum to $\le 1$) and terms with $|\tfrac{k}{n} - x| \ge \delta$; on the latter $1 \le \tfrac{(k/n - x)^2}{\delta^2}$, so their total is $\le \tfrac{2M}{\delta^2}\sum_k (\tfrac{k}{n} - x)^2 \binom{n}{k}x^k(1-x)^{n-k} \le \tfrac{2M}{4n\delta^2} = \tfrac{M}{2n\delta^2}$. Choosing $n$ large makes this $< \varepsilon/2$ for all $x$ at once, so $\sup_x |B_n(f)(x) - f(x)| < \varepsilon$, giving **uniform convergence** of polynomials to $f$. $\square$`,
  },

  // ── Fixed points ─────────────────────────────────────────────────────────
  {
    id: 'contraction-mapping',
    label: 'Contraction Mapping',
    title: 'Contraction Mapping',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['metric-space'],
    description: String.raw`A **contraction** is a self-map of a metric space that shrinks all distances by a fixed factor strictly below $1$. Because each application brings points closer by that ratio, iterating a contraction drives points together geometrically fast — the mechanism that forces a unique fixed point to exist.`,
    definition: String.raw`A map $T : X \to X$ on a metric space $(X, d)$ is a **contraction** if there is a constant $k$ with $0 \le k < 1$ such that
$$d\bigl(T(x), T(y)\bigr) \le k\,d(x, y) \quad \text{for all } x, y \in X.$$
The constant $k$ is the **contraction factor**. On $\mathbb{R}$ the metric is $d(x, y) = |x - y|$.`,
  },
  {
    id: 'banach-fixed-point',
    label: 'Banach Fixed-Point',
    title: 'Banach Fixed-Point Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['contraction-mapping', 'metric-space', 'complete-metric-space', 'triangle-inequality'],
    description: String.raw`A contraction on a non-empty complete metric space has exactly one fixed point, and the iterates from any starting point converge to it. The proof is constructive and quantitative — it even bounds the error of each iterate — and it powers existence-uniqueness results for differential and integral equations (Picard–Lindelöf) and the inverse and implicit function theorems.`,
    statement: String.raw`Let $(X, d)$ be a non-empty complete metric space and $T : X \to X$ a contraction with factor $k < 1$. Then $T$ has a unique fixed point $x^* = T(x^*)$, and for any $x_0 \in X$ the iterates $x_{n+1} = T(x_n)$ satisfy $x_n \to x^*$ with $d(x_n, x^*) \le \dfrac{k^n}{1 - k}\,d(x_1, x_0)$.`,
    proof: String.raw`*Existence.* Fix $x_0$ and iterate $x_{n+1} = T(x_n)$. By induction, $d(x_{n+1}, x_n) \le k\,d(x_n, x_{n-1}) \le \cdots \le k^n d(x_1, x_0)$. For $m > n$, the **triangle inequality** and the geometric series give
$$d(x_m, x_n) \le \sum_{j=n}^{m-1} d(x_{j+1}, x_j) \le \sum_{j=n}^{\infty} k^j d(x_1, x_0) = \frac{k^n}{1 - k}\,d(x_1, x_0).$$
Since $k^n \to 0$, $d(x_m, x_n) \to 0$ as $m, n \to \infty$, so $(x_n)$ is a **Cauchy sequence in the metric $d$**; because $(X, d)$ is a **complete metric space**, it converges to some $x^* \in X$. A contraction is continuous (it is Lipschitz: $d(Tx, Ty) \le k\,d(x,y)$), so taking the limit in $x_{n+1} = T(x_n)$ gives $x^* = T(x^*)$. Letting $m \to \infty$ in the displayed bound yields the error estimate.

*Uniqueness.* If $T(x^*) = x^*$ and $T(y^*) = y^*$, then $d(x^*, y^*) = d(T(x^*), T(y^*)) \le k\,d(x^*, y^*)$, so $(1 - k)\,d(x^*, y^*) \le 0$; since $1 - k > 0$ and $d \ge 0$, $d(x^*, y^*) = 0$, i.e. $x^* = y^*$. $\square$`,
  },

  // ── Compactness (general) ────────────────────────────────────────────────
  {
    id: 'compactness',
    label: 'Compactness',
    title: 'Compactness',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['open-closed-sets'],
    description: String.raw`A set is **compact** when every cover by open sets has a finite subcover — a finiteness property that tames the infinite. Compact sets behave for analysis much like finite ones: a continuous real-valued function on a non-empty compact set attains its extrema, and on a metric space it is uniformly continuous. In Euclidean space, compact means exactly closed and bounded.`,
    definition: String.raw`A subset $K$ of a topological (or metric) space is **compact** when every collection of open sets whose union contains $K$ has a finite subcollection whose union still contains $K$. Writing an **open cover** as a family $\{ U_\alpha \}_{\alpha \in A}$ of open sets indexed by a set $A$:
$$\text{for every open cover } \{ U_\alpha \}_{\alpha \in A} \text{ with } K \subseteq \bigcup_{\alpha \in A} U_\alpha,\ \exists\, \text{finite } \{\alpha_1, \dots, \alpha_n\} \subseteq A \ \text{ with } K \subseteq U_{\alpha_1} \cup \cdots \cup U_{\alpha_n}.$$
In a metric space this is equivalent to **sequential compactness**: every sequence in $K$ has a subsequence converging to a point of $K$.`,

  },
  {
    id: 'uniform-continuity',
    label: 'Uniform Continuity',
    title: 'Uniform Continuity',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['continuity', 'compactness'],
    description: String.raw`A function is **uniformly continuous** when a single $\delta$ works for the $\varepsilon$-tolerance at every point of the domain at once — the modulus of continuity does not degrade from place to place. On a compact set, ordinary continuity already forces this stronger, uniform version, which is what makes continuous functions integrable.`,
    definition: String.raw`A function $f$ on a set $X$ is **uniformly continuous** when
$$\forall \varepsilon > 0\;\exists \delta > 0\;\forall x, y \in X\,\bigl(|x - y| < \delta \rightarrow |f(x) - f(y)| < \varepsilon\bigr).$$
The point is that $\delta = \delta(\varepsilon)$ depends only on $\varepsilon$, not on the location $x$. Uniform continuity implies continuity; the converse can fail on non-compact domains (e.g. $1/x$ on $(0,1)$).`,
    proof: String.raw`*Continuity on a compact set is uniform* (Heine–Cantor). Let $f$ be continuous on a sequentially compact $X$ and suppose, for contradiction, it is not uniformly continuous: some $\varepsilon > 0$ admits, for each $n$, points $x_n, y_n \in X$ with $|x_n - y_n| < 1/n$ yet $|f(x_n) - f(y_n)| \ge \varepsilon$. By compactness pass to a subsequence with $x_{n_k} \to p \in X$; since $|x_{n_k} - y_{n_k}| \to 0$, also $y_{n_k} \to p$. By continuity $f(x_{n_k}) \to f(p)$ and $f(y_{n_k}) \to f(p)$, so $|f(x_{n_k}) - f(y_{n_k})| \to 0$, contradicting $\ge \varepsilon$. Hence $f$ is uniformly continuous. $\square$`,
  },
]
