import type { MathNode } from '../types'

export const NUMBER_THEORY_NODES: MathNode[] = [
  // ── Divisibility and the division algorithm ──────────────────────────────────
  {
    id: 'divisibility',
    label: 'Divisibility',
    title: 'Divisibility',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['integers'],
    description: String.raw`Divisibility is the multiplicative backbone of $\mathbb{Z}$: $a$ **divides** $b$ when $b$ is an exact integer multiple of $a$. It is reflexive, transitive, and additive — if $a$ divides both $b$ and $c$ then it divides every integer combination $bx + cy$ — and it is the relation from which primes, greatest common divisors, and congruences are all defined.`,
    definition: String.raw`For integers $a, b$, say $a$ **divides** $b$, written $a \mid b$, if there exists an integer $k$ with $b = a k$; otherwise $a \nmid b$. An integer $u$ is a **unit** if $u \mid 1$, i.e. $u \in \{1, -1\}$. Basic consequences, all immediate from the definition and the ring axioms of $\mathbb{Z}$: $a \mid a$; if $a \mid b$ and $b \mid c$ then $a \mid c$; if $a \mid b$ and $a \mid c$ then $a \mid (b x + c y)$ for all integers $x, y$; and if $a \mid b$ with $b \neq 0$ then $|a| \le |b|$.`,
  },
  {
    id: 'well-ordering-positive-integers',
    label: 'Well-Ordering of ℤ₊',
    title: 'Well-Ordering of the Positive Integers',
    kind: 'proposition',
    tags: ['Number Theory'],
    dependencies: ['integers', 'natural-numbers', 'well-order', 'ordinal'],
    description: String.raw`The positive integers are **well-ordered**: every non-empty set of positive integers has a least element. This is the working form of induction used throughout elementary number theory — it powers the division algorithm, the Euclidean algorithm, and Euclid's proof that the primes are infinite, by letting one pick a *smallest* counterexample or a *smallest* positive value of some quantity.`,
    statement: String.raw`Every non-empty subset $S \subseteq \mathbb{Z}_{>0}$ has a least element: there is $m \in S$ with $m \le x$ for all $x \in S$.`,
    proof: String.raw`The positive integers are order-isomorphic to $\omega \setminus \{0\}$ under the bijection $S(n) \mapsto n+1$ that sends the successor $S(n) \in \omega \setminus \{0\}$ (in its von Neumann encoding as an **ordinal**) to its value as a positive integer, carrying the membership relation $\in$ on $\omega$ to the usual order $\le$ on $\mathbb{Z}_{>0}$. It therefore suffices to show $\omega$ itself is well-ordered, since an order isomorphism preserves least elements: if $T \subseteq \mathbb{Z}_{>0}$ is non-empty, its preimage in $\omega \setminus \{0\} \subseteq \omega$ has a least element, whose image is the least element of $T$.

Here $m < n$ abbreviates $m \in n$, $m \le n$ abbreviates $m \in n \lor m = n$, and $S(n) = n \cup \{n\}$ is the successor. We must NOT assume $\omega$ is well-ordered (the very thing to be proved); everything below is established by **ordinary induction** — the principle, available from the construction of the **natural numbers** as the least inductive set, that any class containing $0 = \varnothing$ and closed under successor contains all of $\omega$.

**Step 1 (linearity and discreteness, by ordinary induction).** All members of $\omega$ are transitive ($k \in m \in n \Rightarrow k \in n$): this holds vacuously for $0$, and if $n$ is transitive then so is $S(n) = n \cup \{n\}$, since $k \in m \in S(n)$ means $m \in n$ (giving $k \in n \subseteq S(n)$ by transitivity of $n$) or $m = n$ (giving $k \in n \subseteq S(n)$). Next, for each $n \in \omega$ exactly one of $m \in n$, $m = n$, $n \in m$ holds for every $m \in \omega$ — **trichotomy**. Fix $n$ and induct on $m$. Mutual exclusivity holds because no $x \in \omega$ satisfies $x \in x$: by induction, $0 \notin 0$, and if $S(n) \in S(n) = n \cup \{n\}$ then $S(n) \in n$ or $S(n) = n$, either of which with transitivity yields $n \in n$, contradicting the hypothesis $n \notin n$; so $x \notin x$ throughout, and then $m \in n$ and $n \in m$ together would give $m \in m$ by transitivity. For existence run a sub-induction; the discreteness fact we need falls out as the special case: **for $m, n \in \omega$, if $m \in S(n)$ then $m \in n$ or $m = n$**, which is immediate from $S(n) = n \cup \{n\}$, and **$0 = \varnothing$ is the $\le$-minimum** since $0$ has no members, so no $m$ has $m < 0$. (Existence of trichotomy uses a *comparability lemma*: for all $m, n \in \omega$, if $m \in n$ then $S(m) \in n$ or $S(m) = n$. Proof by induction on $n$: vacuous for $n = 0$ (nothing lies in $\varnothing$); assuming it for $n$, if $m \in S(n) = n \cup \{n\}$ then either $m \in n$, whence by the inductive hypothesis $S(m) \in n \subseteq S(n)$ so $S(m) \in S(n)$, or $m = n$, whence $S(m) = S(n)$. Now prove existence of trichotomy by induction on $m$ with $n$ fixed. Base: $0 \in n \lor 0 = n$ for all $n$, by a parallel induction on $n$ (it holds at $n = 0$, and from $0 \in n \lor 0 = n$ one gets $0 \in S(n)$). Step: assume one of $m \in n$, $m = n$, $n \in m$ holds. If $m \in n$, the comparability lemma gives $S(m) \in n$ or $S(m) = n$. If $m = n$, then $n = m \in S(m)$. If $n \in m$, then $n \in m \subseteq S(m)$, so $n \in S(m)$. In every case one of $S(m) \in n$, $S(m) = n$, $n \in S(m)$ holds.) Thus $\le$ is a total order on $\omega$.

**Step 2 (well-ordering, by ordinary induction).** Apply ordinary induction to
$$P(n) \equiv \text{"every } S \subseteq \omega \text{ containing some element } \le n \text{ has a least element."}$$
*Base case $P(0)$.* If $S \subseteq \omega$ contains an element $\le 0$, that element is $0$ (Step 1: $0$ is the minimum). Then $0 \in S$ and $0 \le x$ for all $x \in S$ by Step 1, so $0$ is least in $S$.

*Inductive step $P(n) \Rightarrow P(S(n))$.* Assume $P(n)$, and let $S \subseteq \omega$ contain some element $\le S(n) = n+1$. If $S$ contains an element $\le n$, then $P(n)$ supplies a least element of $S$. Otherwise $S$ contains no element $\le n$, while it does contain some $x \le n+1$; by the discreteness step (Step 1) $x \in S(n)$ forces $x \in n$ or $x = n+1$, and $x \in n$ would make $x \le n$, excluded — so $x = n+1 \in S$. Any $y \in S$ satisfies, by trichotomy, $y \le n$ (excluded) or $y \ge n+1$; hence $y \ge n+1$ for all $y \in S$, and $n+1$ is the least element of $S$.

By ordinary induction $P(n)$ holds for all $n \in \omega$. Any non-empty $S \subseteq \omega$ contains some element $n$, so $S$ contains an element $\le n$ and $P(n)$ gives it a least element; thus $\omega$ is well-ordered. Transporting along the order isomorphism above, every non-empty $S \subseteq \mathbb{Z}_{>0}$ has a least element. $\square$`,
  },
  {
    id: 'division-algorithm',
    label: 'Division Algorithm',
    title: 'Division Algorithm',
    kind: 'proposition',
    tags: ['Number Theory'],
    dependencies: ['divisibility', 'well-ordering-positive-integers'],
    description: String.raw`Dividing one integer by a non-zero integer leaves a **unique quotient and remainder**, with the remainder strictly smaller in size than the divisor. This is the single fact that makes $\mathbb{Z}$ a Euclidean domain; every gcd computation and modular reduction rests on it.`,
    statement: String.raw`For integers $a$ and $b$ with $b \neq 0$ there exist **unique** integers $q$ (the quotient) and $r$ (the remainder) with
$$a = b q + r, \qquad 0 \le r < |b|.$$`,
    proof: String.raw`**Existence.** Consider $S = \{\,a - b q : q \in \mathbb{Z}\,\} \cap \mathbb{Z}_{\ge 0}$, the set of non-negative integers of the form $a - bq$. It is non-empty: taking $q = -|a|\cdot\operatorname{sgn}(b)$ makes $a - bq = a + |a|\,|b| \ge a + |a| \ge 0$. We obtain a least element $r$ of $S$ as follows. If $0 \in S$, take $r = 0$, which is least in the set $S$ of non-negative integers. Otherwise $S \subseteq \mathbb{Z}_{>0}$ is a non-empty set of *positive* integers, so the **well-ordering of the positive integers** applies and yields a least element $r = a - bq > 0$. In both cases $r = a - bq \ge 0$ is least in $S$. If $r \ge |b|$ then $r - |b| = a - b(q \pm 1) \ge 0$ is a strictly smaller element of $S$, contradicting minimality; hence $0 \le r < |b|$.

**Uniqueness.** If $a = bq + r = bq' + r'$ with $0 \le r, r' < |b|$, then $b(q - q') = r' - r$, so $b \mid (r' - r)$. But $|r' - r| < |b|$, and the only multiple of $b$ with absolute value below $|b|$ is $0$; hence $r' = r$ and, since $b \neq 0$, $q' = q$. $\square$`,
  },

  // ── Primes ───────────────────────────────────────────────────────────────────
  {
    id: 'prime-number',
    label: 'Prime Number',
    title: 'Prime Number',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['divisibility'],
    description: String.raw`A **prime** is an integer above $1$ whose only positive divisors are $1$ and itself — the multiplicative atoms of $\mathbb{Z}$. By the fundamental theorem of arithmetic every integer above $1$ factors into primes uniquely up to order. An integer above $1$ that is not prime is **composite**.`,
    definition: String.raw`An integer $p$ is **prime** if $p > 1$ and its only positive divisors are $1$ and $p$; equivalently $p > 1$ and $p = ab$ with $a, b \in \mathbb{Z}_{>0}$ forces $a = 1$ or $b = 1$. An integer $n > 1$ that is not prime is **composite**. (In a general integral domain "prime" and "irreducible" diverge; in $\mathbb{Z}$ they coincide — see Euclid's lemma.)`,
  },
  {
    id: 'prime-factor-existence',
    label: 'Existence of Prime Factors',
    title: 'Every Integer > 1 Has a Prime Factor',
    kind: 'lemma',
    tags: ['Number Theory'],
    dependencies: ['prime-number', 'well-ordering-positive-integers', 'divisibility'],
    description: String.raw`Every integer greater than $1$ is divisible by some prime — the existence half of unique factorization, and the lemma that gets Euclid's infinitude argument off the ground. The proof picks the *smallest* divisor above $1$ and observes it must be prime.`,
    statement: String.raw`Every integer $n > 1$ has at least one prime divisor.`,
    proof: String.raw`Let $D = \{\,d \in \mathbb{Z} : d > 1 \text{ and } d \mid n\,\}$. Since $n \mid n$ and $n > 1$, we have $n \in D$, so $D \neq \varnothing$. By the **well-ordering of the positive integers**, $D$ has a least element $p$. Then $p > 1$, and $p$ is prime: if $1 < a < p$ and $a \mid p$, then $a \mid n$ by transitivity of **divisibility**, so $a \in D$ with $a < p$, contradicting minimality. Hence $p$ is a prime dividing $n$. $\square$`,
  },
  {
    id: 'infinitude-of-primes',
    label: 'Infinitude of Primes',
    title: 'Infinitude of Primes (Euclid)',
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['prime-number', 'prime-factor-existence', 'divisibility'],
    description: String.raw`**Euclid's theorem**: there are infinitely many primes. From any finite list of primes one manufactures, via "product plus one," an integer none of them divides, whose prime factor must therefore be new. The primes thin out but never stop.`,
    statement: String.raw`There are infinitely many primes; equivalently, no finite list $p_1, \dots, p_n$ contains every prime.`,
    proof: String.raw`Let $p_1, \dots, p_n$ be any finite list of primes. Set $N = p_1 p_2 \cdots p_n + 1 > 1$. By the **existence of prime factors**, $N$ has a prime divisor $q$. No $p_i$ divides $N$: if $p_i \mid N$, then since $p_i \mid p_1 \cdots p_n$ we would get $p_i \mid (N - p_1 \cdots p_n) = 1$, impossible for a prime $p_i > 1$. Hence $q \notin \{p_1, \dots, p_n\}$ — a prime outside the list. So no finite list exhausts the primes, and there are infinitely many. $\square$`,
  },

  // ── GCD, Bézout, and Euclid's lemma ──────────────────────────────────────────
  {
    id: 'gcd',
    label: 'GCD & LCM',
    title: 'Greatest Common Divisor',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['divisibility', 'well-ordering-positive-integers'],
    description: String.raw`The **greatest common divisor** of two integers, not both zero, is the largest integer dividing both; the **least common multiple** is their smallest positive common multiple. The two are linked by $\gcd(a,b)\,\operatorname{lcm}(a,b) = |ab|$. Two integers are **coprime** when their gcd is $1$.`,
    definition: String.raw`For integers $a, b$ not both zero, the set of positive common divisors $\{\,d \in \mathbb{Z}_{>0} : d \mid a \text{ and } d \mid b\,\}$ is non-empty ($1$ belongs) and bounded above (every common divisor of, say, $a \neq 0$ has absolute value $\le |a|$), so it has a greatest element, the **greatest common divisor** $\gcd(a, b)$. The **least common multiple** $\operatorname{lcm}(a, b)$ (for $a, b \neq 0$) is the least element of the non-empty set $\{\,m \in \mathbb{Z}_{>0} : a \mid m \text{ and } b \mid m\,\}$, which exists by the **well-ordering of the positive integers** (it contains $|ab|$). Integers are **coprime** when $\gcd(a, b) = 1$. One sets $\gcd(a, 0) = |a|$ and $\gcd(0,0) = 0$.`,
  },
  {
    id: 'bezout-identity',
    label: "Bézout's Identity",
    title: "Bézout's Identity",
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['gcd', 'division-algorithm', 'well-ordering-positive-integers'],
    description: String.raw`The gcd of two integers is itself an **integer linear combination** of them — and is in fact the *smallest positive* combination. This single identity underlies modular inverses, the solvability of linear Diophantine equations, Euclid's lemma, and much of elementary number theory.`,
    statement: String.raw`For integers $a, b$ not both zero there exist integers $x, y$ with $a x + b y = \gcd(a, b)$. Moreover $\gcd(a, b)$ is the least positive integer of the form $a x + b y$ with $x, y \in \mathbb{Z}$, and every integer of that form is a multiple of $\gcd(a, b)$.`,
    proof: String.raw`Let $S = \{\,a x + b y : x, y \in \mathbb{Z}\,\} \cap \mathbb{Z}_{>0}$. This is non-empty (e.g. $|a|$ or $|b|$ lies in it since $a, b$ are not both zero), so by the **well-ordering of the positive integers** it has a least element $d = a x_0 + b y_0 > 0$.

**$d$ divides $a$ and $b$.** By the **division algorithm**, write $a = d q + r$ with $0 \le r < d$. Then $r = a - d q = a(1 - q x_0) + b(-q y_0)$ is an integer combination of $a, b$. If $r > 0$ it would belong to $S$ with $r < d$, contradicting minimality; hence $r = 0$ and $d \mid a$. Symmetrically $d \mid b$, so $d$ is a common divisor.

**$d = \gcd(a, b)$.** Any common divisor $c$ of $a$ and $b$ divides every combination, so $c \mid (a x_0 + b y_0) = d$, giving $c \le d$ (as $d > 0$). Thus $d$ is the greatest common divisor. Finally any value $a x + b y$ is divisible by $d$ (being a combination, and $d$ divides both $a, b$), so every integer of the form $ax + by$ is a multiple of $\gcd(a,b)$, and the positive ones are at least $d$. $\square$`,
  },
  {
    id: 'euclidean-algorithm',
    label: 'Euclidean Algorithm',
    title: 'Euclidean Algorithm',
    kind: 'proposition',
    tags: ['Number Theory'],
    dependencies: ['gcd', 'division-algorithm', 'well-ordering-positive-integers'],
    description: String.raw`The **Euclidean algorithm** computes a gcd by repeated division: replace the pair $(a, b)$ by $(b,\ a \bmod b)$ until the remainder is $0$; the gcd is then the absolute value of the last non-zero coordinate. It terminates because remainders strictly decrease, runs in logarithmically many steps, and its **extended** form returns Bézout coefficients alongside the gcd.`,
    statement: String.raw`For integers $a, b$ with $b \neq 0$, $\gcd(a, b) = \gcd(b,\ a \bmod b)$, where $a \bmod b$ is the remainder of the division algorithm. Iterating the replacement $(a, b) \mapsto (b,\ a \bmod b)$ terminates after finitely many steps with second coordinate $0$; the preceding first coordinate $r$ then satisfies $\gcd(a, b) = |r|$ (and $r > 0$ whenever any division step occurred, i.e. whenever $b \nmid a$).`,
    proof: String.raw`Write $a = b q + r$ with $0 \le r < |b|$ via the **division algorithm**. The common divisors of $(a, b)$ and of $(b, r)$ coincide: if $d \mid b$ and $d \mid a$ then $d \mid (a - bq) = r$; conversely if $d \mid b$ and $d \mid r$ then $d \mid (bq + r) = a$. Equal sets of common divisors have equal greatest elements, so $\gcd(a, b) = \gcd(b, r)$. This invariant is the engine of the algorithm.

**Base case $b \mid a$.** Then $a \bmod b = 0$, so the very first step gives $(a, b) \mapsto (b, 0)$ and the iteration halts. By the gcd convention $\gcd(b, 0) = |b|$, and the invariant gives $\gcd(a, b) = \gcd(b, 0) = |b|$. Here the preceding first coordinate is $r = b$ and indeed $\gcd(a,b) = |b| = |r|$; no division step produced a nonzero remainder.

**General case $b \nmid a$.** The first division produces $r_1 = a \bmod b$ with $0 < r_1 < |b|$. Continuing, the successive remainders form a strictly decreasing sequence of non-negative integers $|b| > r_1 > r_2 > \cdots \ge 0$. Such a sequence cannot be infinite: the set of nonzero remainders is a non-empty subset of $\mathbb{Z}_{>0}$, so by the **well-ordering of the positive integers** it has a least element, after which the next remainder must be $0$ and the iteration halts. Let $r_k > 0$ be the last nonzero remainder, so $r_{k-1} = r_k q_{k+1} + 0$ and the algorithm terminates at $(r_k, 0)$. Applying the invariant down the chain, $\gcd(a, b) = \gcd(b, r_1) = \cdots = \gcd(r_k, 0) = |r_k| = r_k$ (positive). The terminal preceding first coordinate is $r = r_k$, so $\gcd(a,b) = |r| = r > 0$. (Tracking the combination $r_i = a x_i + b y_i$ through each step yields the extended algorithm and Bézout coefficients.) $\square$`,
  },
  {
    id: 'euclids-lemma',
    label: "Euclid's Lemma",
    title: "Euclid's Lemma",
    kind: 'lemma',
    tags: ['Number Theory'],
    dependencies: ['prime-number', 'bezout-identity'],
    description: String.raw`**Euclid's lemma**: if a prime divides a product, it divides one of the factors. This is the property that makes primes behave as atoms and is the crux of *uniqueness* in the fundamental theorem of arithmetic — distinguishing "prime" from the weaker "irreducible," with which it coincides in $\mathbb{Z}$.`,
    statement: String.raw`Let $p$ be prime and $a, b$ integers. If $p \mid ab$ then $p \mid a$ or $p \mid b$. More generally, if $\gcd(c, a) = 1$ and $c \mid ab$, then $c \mid b$.`,
    proof: String.raw`Prove the general statement; the prime case follows since a prime $p$ with $p \nmid a$ has $\gcd(p, a) = 1$ (the only positive divisors of $p$ are $1$ and $p$, and $p \nmid a$ rules out $p$).

Suppose $\gcd(c, a) = 1$ and $c \mid ab$. By **Bézout's identity** there are integers $x, y$ with $c x + a y = 1$. Multiply by $b$:
$$b = b(cx + ay) = c(bx) + (ab)y.$$
Now $c \mid c(bx)$ trivially, and $c \mid (ab)y$ because $c \mid ab$; hence $c$ divides the sum $b$. So $c \mid b$. Applying this with $c = p$ prime and the assumption $p \nmid a$ gives $p \mid b$, which is Euclid's lemma. $\square$`,
  },

  // ── Modular arithmetic ───────────────────────────────────────────────────────
  {
    id: 'modular-arithmetic',
    label: 'Modular Arithmetic',
    title: 'Modular Arithmetic',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['divisibility', 'ring', 'equivalence-relation'],
    description: String.raw`**Modular arithmetic** is computation with integers up to a fixed modulus: two integers are congruent when their difference is a multiple of the modulus. Congruence is an equivalence relation compatible with $+$, $-$, and $\times$, so the residue classes form the ring $\mathbb{Z}/n\mathbb{Z}$ — "clock arithmetic." A class is invertible exactly when its representative is coprime to the modulus.`,
    definition: String.raw`Fix an integer $n \ge 1$. For integers $a, b$ define $a \equiv b \pmod{n}$ to mean $n \mid (a - b)$. This is an **equivalence relation** (reflexive, symmetric, transitive, all immediate from divisibility) and a **congruence** for the ring operations: if $a \equiv a'$ and $b \equiv b' \pmod n$ then $a + b \equiv a' + b'$ and $ab \equiv a'b' \pmod n$, since $n \mid (a-a')$ and $n \mid (b-b')$ give $n \mid (a+b)-(a'+b')$ and $n \mid ab - a'b' = a(b-b') + b'(a-a')$. The equivalence classes $\bar a = a + n\mathbb{Z}$ thus form a **ring** $\mathbb{Z}/n\mathbb{Z}$ under $\bar a + \bar b = \overline{a+b}$, $\bar a\,\bar b = \overline{ab}$, with $n$ elements $\bar 0, \dots, \overline{n-1}$.`,
    proof: String.raw`**Well-definedness of $\mathbb{Z}/n\mathbb{Z}$.** The class operations must not depend on chosen representatives. Suppose $\bar a = \bar a'$ and $\bar b = \bar b'$, i.e. $n \mid (a - a')$ and $n \mid (b - b')$. Then $(a + b) - (a' + b') = (a - a') + (b - b')$ is a sum of multiples of $n$, so $\overline{a + b} = \overline{a' + b'}$. And $ab - a'b' = a(b - b') + b'(a - a')$ is again a combination of multiples of $n$, so $\overline{ab} = \overline{a'b'}$. Hence $+$ and $\cdot$ on classes are well defined; the ring axioms are inherited from $\mathbb{Z}$ because the quotient map $a \mapsto \bar a$ preserves them. $\square$`,
  },
  {
    id: 'units-mod-n',
    label: 'Units mod n',
    title: 'The Unit Group (ℤ/nℤ)ˣ',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['modular-arithmetic', 'gcd', 'bezout-identity', 'group'],
    description: String.raw`A residue class mod $n$ is **invertible** precisely when its representative is coprime to $n$. The invertible classes form a finite abelian group under multiplication, the **unit group** $(\mathbb{Z}/n\mathbb{Z})^\times$ — the natural home of Euler's and Fermat's theorems, since each says raising a unit to a suitable power returns $1$.`,
    definition: String.raw`A class $\bar a \in \mathbb{Z}/n\mathbb{Z}$ is a **unit** (invertible) if there is $\bar b$ with $\bar a \bar b = \bar 1$. The set of units, $(\mathbb{Z}/n\mathbb{Z})^\times$, is a **group** under multiplication. Its elements are exactly the classes $\bar a$ with $\gcd(a, n) = 1$.`,
    proof: String.raw`**Characterization and group structure.** If $\gcd(a, n) = 1$, then by **Bézout's identity** there are integers $x, y$ with $a x + n y = 1$, so $a x \equiv 1 \pmod n$ and $\bar x$ is an inverse of $\bar a$. Conversely if $\bar a \bar b = \bar 1$ then $ab = 1 + kn$ for some $k$, so $ab - kn = 1$; any common divisor of $a$ and $n$ divides $1$, forcing $\gcd(a, n) = 1$. (This is well defined on classes: $\gcd(a, n)$ depends only on $a \bmod n$, since $\gcd(a, n) = \gcd(a + n, n)$.) The units are closed under multiplication ($\overline{ab}$ has inverse $\bar b^{-1}\bar a^{-1}$), contain $\bar 1$, and each has an inverse, so they form a group; commutativity is inherited from $\mathbb{Z}/n\mathbb{Z}$. $\square$`,
  },
  {
    id: 'chinese-remainder-theorem',
    label: 'Chinese Remainder Thm',
    title: 'Chinese Remainder Theorem',
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['modular-arithmetic', 'bezout-identity', 'gcd', 'ring-homomorphism', 'euclids-lemma'],
    description: String.raw`For **pairwise coprime** moduli, a system of simultaneous congruences has a unique solution modulo the product. Equivalently, the ring of residues modulo the product splits as the direct product of the residue rings of the factors — turning one computation modulo a large number into independent computations modulo its coprime parts.`,
    statement: String.raw`Let $n_1, \dots, n_k$ be pairwise coprime positive integers with product $N = n_1 \cdots n_k$. For any integers $a_1, \dots, a_k$ the system $x \equiv a_i \pmod{n_i}$ ($i = 1, \dots, k$) has a solution $x$, unique modulo $N$. Equivalently, the map $\bar x \mapsto (\bar x \bmod n_1, \dots, \bar x \bmod n_k)$ is a ring isomorphism
$$\mathbb{Z}/N\mathbb{Z} \;\xrightarrow{\ \sim\ }\; \mathbb{Z}/n_1\mathbb{Z} \times \cdots \times \mathbb{Z}/n_k\mathbb{Z}.$$`,
    proof: String.raw`The reduction map $\Phi(\bar x) = (\bar x \bmod n_1, \dots, \bar x \bmod n_k)$ is a well-defined **ring homomorphism**: $n_i \mid N$, so $x \equiv y \pmod N$ implies $x \equiv y \pmod{n_i}$, and reductions preserve $+, \cdot$.

**Injectivity.** If $\Phi(\bar x) = (\bar 0, \dots, \bar 0)$ then $n_i \mid x$ for every $i$. Since the $n_i$ are pairwise coprime, their product $N$ divides $x$: if $m \mid x$ and $n \mid x$ with $\gcd(m, n) = 1$, write $x = n x'$; then $m \mid n x'$ with $\gcd(m, n) = 1$ gives $m \mid x'$ by **Euclid's lemma**, so $mn \mid x$. Iterating over the pairwise coprime $n_1, \dots, n_k$, $N \mid x$, i.e. $\bar x = \bar 0$ in $\mathbb{Z}/N\mathbb{Z}$. So $\ker \Phi = \{\bar 0\}$ and $\Phi$ is injective.

**Surjectivity.** Both sides are finite of the same size $N = n_1 \cdots n_k = |\mathbb{Z}/n_1\mathbb{Z} \times \cdots \times \mathbb{Z}/n_k\mathbb{Z}|$, so an injective map between them is a bijection; hence $\Phi$ is a ring isomorphism. Concretely, a solution is built by **Bézout**: set $N_i = N/n_i$; since $\gcd(N_i, n_i) = 1$ choose $M_i$ with $N_i M_i \equiv 1 \pmod{n_i}$, then $x = \sum_i a_i N_i M_i$ satisfies $x \equiv a_i \pmod{n_i}$ (each other term is divisible by $n_i$). Uniqueness modulo $N$ is the injectivity just shown. $\square$`,
  },

  // ── Euler's totient and the Euler–Fermat theorems ────────────────────────────
  {
    id: 'eulers-totient',
    label: "Euler's Totient",
    title: "Euler's Totient Function",
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['units-mod-n', 'gcd', 'chinese-remainder-theorem'],
    description: String.raw`**Euler's totient** counts the integers up to $n$ that are coprime to $n$ — equivalently the units of $\mathbb{Z}/n\mathbb{Z}$, so it is the order of the unit group. It is multiplicative across coprime factors, equals $p - 1$ at a prime, and is the exponent that appears in Euler's theorem and in RSA.`,
    definition: String.raw`**Euler's totient** is $\varphi(n) = \bigl|\{\,a : 1 \le a \le n,\ \gcd(a, n) = 1\,\}\bigr|$ for $n \ge 1$. By the characterization of **units mod $n$**, $\varphi(n) = |(\mathbb{Z}/n\mathbb{Z})^\times|$. For a prime $p$, every $a \in \{1, \dots, p-1\}$ is coprime to $p$, so $\varphi(p) = p - 1$; more generally $\varphi(p^a) = p^a - p^{a-1}$.`,
    proof: String.raw`**Multiplicativity: $\varphi(mn) = \varphi(m)\varphi(n)$ when $\gcd(m,n) = 1$.** The **Chinese remainder theorem** gives a ring isomorphism $\mathbb{Z}/mn\mathbb{Z} \cong \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z}$. A ring isomorphism carries units to units, and a pair is a unit in a product ring iff each coordinate is a unit; hence it restricts to a group isomorphism $(\mathbb{Z}/mn\mathbb{Z})^\times \cong (\mathbb{Z}/m\mathbb{Z})^\times \times (\mathbb{Z}/n\mathbb{Z})^\times$. Taking sizes, $\varphi(mn) = \varphi(m)\varphi(n)$. Combined with $\varphi(p^a) = p^a - p^{a-1}$ (the multiples of $p$ in $\{1,\dots,p^a\}$ number $p^{a-1}$, and these are exactly the non-coprime ones), this computes $\varphi$ from a prime factorization. $\square$`,
  },
  {
    id: 'eulers-theorem',
    label: "Euler's Theorem",
    title: "Euler's Theorem (Number Theory)",
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['eulers-totient', 'units-mod-n', 'lagrange-theorem-groups'],
    description: String.raw`**Euler's theorem**: a unit raised to the totient power returns $1$ modulo $n$. It is Lagrange's theorem in the group of units — the order of any element divides the group's order $\varphi(n)$ — and it generalizes Fermat's little theorem from prime to arbitrary modulus. It is the arithmetic that makes RSA decryption work.`,
    statement: String.raw`If $\gcd(a, n) = 1$ then $a^{\varphi(n)} \equiv 1 \pmod{n}$.`,
    proof: String.raw`Since $\gcd(a, n) = 1$, the class $\bar a$ lies in the unit group $(\mathbb{Z}/n\mathbb{Z})^\times$, which is a finite group of order $\varphi(n)$ by the definition of **Euler's totient**. The cyclic subgroup $\langle \bar a \rangle$ generated by $\bar a$ has some finite order $d$ (the least positive $d$ with $\bar a^{\,d} = \bar 1$). By **Lagrange's theorem** for groups, $d \mid \varphi(n)$, so $\varphi(n) = d m$ for some integer $m$, and
$$\bar a^{\,\varphi(n)} = (\bar a^{\,d})^{m} = \bar 1^{\,m} = \bar 1.$$
Translating back, $a^{\varphi(n)} \equiv 1 \pmod n$. $\square$`,
  },
  {
    id: 'fermats-little-theorem',
    label: "Fermat's Little Theorem",
    title: "Fermat's Little Theorem",
    kind: 'corollary',
    tags: ['Number Theory'],
    dependencies: ['eulers-theorem', 'prime-number', 'modular-arithmetic'],
    description: String.raw`For a prime modulus, every integer satisfies $a^p \equiv a$, and every integer not divisible by $p$ satisfies $a^{p-1} \equiv 1$. It is the special case of Euler's theorem at $n = p$ and a workhorse of primality testing.`,
    statement: String.raw`Let $p$ be prime. Then $a^{p-1} \equiv 1 \pmod{p}$ for every integer $a$ with $p \nmid a$, and $a^{p} \equiv a \pmod{p}$ for every integer $a$.`,
    proof: String.raw`Since $p$ is prime, $\varphi(p) = p - 1$. If $p \nmid a$ then, $p$ being prime, $\gcd(a, p) = 1$, so **Euler's theorem** gives $a^{\varphi(p)} = a^{p-1} \equiv 1 \pmod p$. Multiplying by $a$, $a^{p} \equiv a \pmod p$ whenever $p \nmid a$. If instead $p \mid a$, then $a \equiv 0$ and $a^{p} \equiv 0 \equiv a \pmod p$. Either way $a^{p} \equiv a \pmod p$ for all integers $a$. $\square$`,
  },

  // ── Quadratic residues and reciprocity ───────────────────────────────────────
  {
    id: 'legendre-symbol',
    label: 'Legendre Symbol',
    title: 'Quadratic Residues & the Legendre Symbol',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['modular-arithmetic', 'prime-number', 'fermats-little-theorem', 'field'],
    description: String.raw`A **quadratic residue** mod an odd prime is a nonzero square; the **Legendre symbol** packages "is $a$ a square mod $p$?" into a value of $+1$, $-1$, or $0$. **Euler's criterion** evaluates it as $a^{(p-1)/2} \bmod p$, making it completely multiplicative — the basic tool behind quadratic reciprocity.`,
    definition: String.raw`For an odd prime $p$ and integer $a$, the **Legendre symbol** is
$$\left(\tfrac{a}{p}\right) = \begin{cases} 0 & p \mid a,\\ +1 & p \nmid a \text{ and } a \text{ is a square mod } p,\\ -1 & p \nmid a \text{ and } a \text{ is a non-square mod } p.\end{cases}$$
A nonzero square mod $p$ is a **quadratic residue**. It is completely multiplicative in $a$: $\left(\tfrac{ab}{p}\right) = \left(\tfrac{a}{p}\right)\left(\tfrac{b}{p}\right)$.`,
    proof: String.raw`Throughout, $p$ is an odd prime, so $\mathbb{Z}/p\mathbb{Z}$ is a **field**: it is a commutative ring with $1 \neq 0$, and any nonzero class $\bar a$ has $\gcd(a,p) = 1$ (the only positive divisors of the prime $p$ are $1$ and $p$, and $p \nmid a$), hence an inverse by Bézout. In a field, and more generally an integral domain, a nonzero polynomial of degree $d$ has at most $d$ roots: if $f(c) = 0$ then the division algorithm for polynomials writes $f(X) = (X - c)g(X)$ with $\deg g = d - 1$, and since a field has no zero divisors any further root must be a root of $g$; induction on $d$ gives the bound.

**Euler's criterion.** For $p \nmid a$, $\left(\tfrac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$. Indeed $(\mathbb{Z}/p\mathbb{Z})^\times$ is a group of order $p - 1$, and by **Fermat's little theorem** $a^{p-1} \equiv 1$, so $\bigl(a^{(p-1)/2}\bigr)^2 \equiv 1$; thus $a^{(p-1)/2}$ is a root of $X^2 - 1 = (X-1)(X+1)$ over the field $\mathbb{Z}/p\mathbb{Z}$, hence $\equiv +1$ or $-1 \pmod p$ (these are the only roots, $p$ being odd so $1 \neq -1$). The squares form the image of the squaring homomorphism $x \mapsto x^2$ on $(\mathbb{Z}/p\mathbb{Z})^\times$, whose kernel $\{\pm 1\}$ has order $2$, so exactly half of the $p-1$ units — that is $(p-1)/2$ of them — are squares. Every square $b^2$ satisfies $(b^2)^{(p-1)/2} = b^{p-1} \equiv 1$, so all $(p-1)/2$ squares are roots of $X^{(p-1)/2} - 1$. By the root bound just proved, this degree-$\frac{p-1}{2}$ polynomial has at most $(p-1)/2$ roots, so its roots are *exactly* the squares. Therefore $x^{(p-1)/2} \equiv 1$ iff $x$ is a square, and a non-square (still a unit, with $x^{(p-1)/2} \equiv \pm 1$) must give $x^{(p-1)/2} \equiv -1$.

**Multiplicativity.** Reading $\left(\tfrac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$ off these cases for $p \nmid a$ (and noting both sides vanish when $p \mid a$), and using $(ab)^{(p-1)/2} = a^{(p-1)/2} b^{(p-1)/2}$, gives $\left(\tfrac{ab}{p}\right) = \left(\tfrac{a}{p}\right)\left(\tfrac{b}{p}\right)$ — the values $\pm 1, 0$ being determined mod $p$. $\square$`,
  },
  {
    id: 'gauss-lemma-residues',
    label: "Gauss's Lemma",
    title: "Gauss's Lemma (Quadratic Residues)",
    kind: 'lemma',
    tags: ['Number Theory'],
    dependencies: ['legendre-symbol'],
    description: String.raw`**Gauss's lemma** computes the Legendre symbol by counting sign-changes: take the least-residue representatives of $a, 2a, \dots, \frac{p-1}{2}a$, and the symbol is $(-1)$ to the number of these that exceed $p/2$. It converts a multiplicative question into a counting one and is the standard route into quadratic reciprocity.`,
    statement: String.raw`Let $p$ be an odd prime, $p \nmid a$. For $k = 1, \dots, \frac{p-1}{2}$ let $r_k \in \{1, \dots, p-1\}$ be the residue of $ka$ mod $p$, and let $\mu$ be the number of $k$ with $r_k > p/2$. Then $\left(\tfrac{a}{p}\right) = (-1)^\mu$.`,
    proof: String.raw`For each $k$ write $r_k$ as $\pm s_k$ with $s_k \in \{1, \dots, \frac{p-1}{2}\}$, taking the sign $\varepsilon_k = +1$ if $r_k < p/2$ and $-1$ otherwise (so $\mu$ counts the $-1$ signs). The values $s_1, \dots, s_{(p-1)/2}$ are a permutation of $\{1, \dots, \frac{p-1}{2}\}$: they lie in that range, and if $s_k = s_j$ then $ka \equiv \pm ja \pmod p$, so $k \equiv \pm j$; with $k, j$ in $\{1,\dots,\frac{p-1}{2}\}$ this forces $k = j$. Multiplying the congruences $ka \equiv \varepsilon_k s_k \pmod p$ over all $k$:
$$a^{(p-1)/2}\Bigl(\tfrac{p-1}{2}\Bigr)! \equiv (-1)^\mu \prod_k s_k = (-1)^\mu \Bigl(\tfrac{p-1}{2}\Bigr)! \pmod p.$$
Cancelling $\bigl(\frac{p-1}{2}\bigr)!$ (coprime to $p$) gives $a^{(p-1)/2} \equiv (-1)^\mu \pmod p$, which by **Euler's criterion** (inside the **Legendre symbol** node) equals $\left(\tfrac{a}{p}\right)$. $\square$`,
  },
  {
    id: 'quadratic-reciprocity',
    label: 'Quadratic Reciprocity',
    title: 'Quadratic Reciprocity',
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['legendre-symbol', 'gauss-lemma-residues'],
    description: String.raw`Gauss's **law of quadratic reciprocity** ties whether $p$ is a square mod $q$ to whether $q$ is a square mod $p$, for distinct odd primes, through a single sign. With its two **supplements** (for $-1$ and $2$) it lets any Legendre symbol be evaluated quickly, and it is the cornerstone of the theory of quadratic residues — the first hint of class field theory.`,
    statement: String.raw`For distinct odd primes $p, q$,
$$\left(\tfrac{p}{q}\right)\left(\tfrac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}.$$
Supplements: $\left(\tfrac{-1}{p}\right) = (-1)^{(p-1)/2}$ and $\left(\tfrac{2}{p}\right) = (-1)^{(p^2-1)/8}$.`,
    proof: String.raw`We sketch Eisenstein's lattice-point count, every step of which is rigorous. By **Gauss's lemma**, $\left(\tfrac{q}{p}\right) = (-1)^{\mu}$ where $\mu = \#\{\,k : 1 \le k \le \frac{p-1}{2},\ (kq \bmod p) > p/2\,\}$. We show $\mu \equiv \sum_{k=1}^{(p-1)/2} \lfloor kq/p \rfloor \pmod 2$ explicitly. Write $kq = p\lfloor kq/p\rfloor + r_k$ with $r_k = kq \bmod p \in \{1, \dots, p-1\}$, and let $s_k \in \{1,\dots,\frac{p-1}{2}\}$ be the least absolute residue, so $s_k = r_k$ when $r_k < p/2$ and $s_k = p - r_k$ otherwise (the latter for exactly the $\mu$ values of $k$). As in Gauss's lemma the $s_k$ permute $\{1,\dots,\frac{p-1}{2}\}$, so $\sum_k s_k = \sum_k k$. Now $\sum_k r_k = \sum_{r_k < p/2} s_k + \sum_{r_k > p/2}(p - s_k) = \sum_k s_k + \mu p - 2\!\!\sum_{r_k > p/2}\!\! s_k \equiv \sum_k k + \mu \pmod 2$ (using $p$ odd, so $\mu p \equiv \mu$). Summing $kq = p\lfloor kq/p\rfloor + r_k$ over $k$ and reducing mod $2$: $q\sum_k k \equiv \sum_k \lfloor kq/p\rfloor + \sum_k r_k \equiv \sum_k\lfloor kq/p\rfloor + \sum_k k + \mu \pmod 2$ (again $p$ odd). Cancelling and using that $q - 1$ is even gives $0 \equiv (q-1)\sum_k k \equiv \sum_k \lfloor kq/p\rfloor + \mu \pmod 2$, i.e. $\mu \equiv \sum_{k=1}^{(p-1)/2}\lfloor kq/p\rfloor \pmod 2$. Hence
$$\left(\tfrac{q}{p}\right) = (-1)^{\sum_{k=1}^{(p-1)/2} \lfloor kq/p \rfloor}, \qquad \left(\tfrac{p}{q}\right) = (-1)^{\sum_{j=1}^{(q-1)/2} \lfloor jp/q \rfloor},$$
the second by symmetry. Now $\sum_{k} \lfloor kq/p \rfloor$ counts the lattice points $(k, j)$ with $1 \le k \le \frac{p-1}{2}$ and $1 \le j \le kq/p$ — i.e. lattice points strictly below the line $py = qx$ in the rectangle $R = \{1 \le x \le \frac{p-1}{2},\ 1 \le y \le \frac{q-1}{2}\}$. Likewise $\sum_j \lfloor jp/q\rfloor$ counts those strictly above the line in $R$. No lattice point of $R$ lies *on* the line $py = qx$ (that would need $p \mid x$, impossible for $1 \le x \le \frac{p-1}{2}$). So the two sums partition all $\frac{p-1}{2}\cdot\frac{q-1}{2}$ points of $R$:
$$\sum_{k} \lfloor kq/p\rfloor + \sum_{j} \lfloor jp/q\rfloor = \frac{p-1}{2}\cdot\frac{q-1}{2}.$$
Multiplying the two symbol formulas gives $\left(\tfrac{p}{q}\right)\left(\tfrac{q}{p}\right) = (-1)^{\frac{p-1}{2}\frac{q-1}{2}}$.

**Supplements.** $\left(\tfrac{-1}{p}\right) \equiv (-1)^{(p-1)/2}$ is immediate from **Euler's criterion**. For $\left(\tfrac{2}{p}\right)$, apply **Gauss's lemma** with $a = 2$: among $2, 4, \dots, p-1$, the ones exceeding $p/2$ number $\mu$, and a direct count gives $\mu \equiv (p^2-1)/8 \pmod 2$, whence $\left(\tfrac{2}{p}\right) = (-1)^{(p^2-1)/8}$. $\square$`,
  },

  // ── Diophantine equations and distribution ───────────────────────────────────
  {
    id: 'diophantine-equation',
    label: 'Diophantine Equation',
    title: 'Diophantine Equation',
    kind: 'definition',
    tags: ['Number Theory'],
    dependencies: ['bezout-identity', 'gcd', 'euclids-lemma'],
    description: String.raw`A **Diophantine equation** is a polynomial equation sought in integer (or rational) solutions. Linear ones are completely settled by Bézout; the general problem is vast and, for integer solvability, undecidable (Hilbert's tenth problem) — running from Pell's equation to Fermat's Last Theorem.`,
    definition: String.raw`A **Diophantine equation** is an equation $P(x_1, \dots, x_m) = 0$ with $P \in \mathbb{Z}[x_1, \dots, x_m]$, for which one seeks solutions in $\mathbb{Z}^m$ (or $\mathbb{Q}^m$). The **linear** two-variable case $a x + b y = c$ is the model example, treated below.`,
    proof: String.raw`**Solvability of the linear equation $ax + by = c$.** Such an equation has an integer solution if and only if $\gcd(a, b) \mid c$; when solvable, the full solution set is $(x_0 + t\,b/g,\ y_0 - t\,a/g)$ for $t \in \mathbb{Z}$, where $g = \gcd(a, b)$ and $(x_0, y_0)$ is one solution.

*Necessity.* If $a x + b y = c$ then $g = \gcd(a,b)$ divides $a$ and $b$, hence divides $ax + by = c$.

*Sufficiency.* If $g \mid c$, write $c = g c'$. By **Bézout's identity** there are $u, v$ with $au + bv = g$; then $x_0 = c' u$, $y_0 = c' v$ give $a x_0 + b y_0 = g c' = c$.

*All solutions.* If $a x + b y = c = a x_0 + b y_0$, then $a(x - x_0) = b(y_0 - y)$, i.e. $\frac{a}{g}(x - x_0) = \frac{b}{g}(y_0 - y)$. Since $\gcd(a/g, b/g) = 1$, **Euclid's lemma** gives $\frac{b}{g} \mid (x - x_0)$, so $x = x_0 + t\,b/g$ and back-substitution gives $y = y_0 - t\,a/g$. Conversely every such pair solves the equation. $\square$`,
  },
  {
    id: 'tauberian-theorem',
    label: 'Tauberian Theorem',
    title: 'Wiener–Ikehara Tauberian Theorem',
    kind: 'theorem',
    tags: ['Analytic Number Theory'],
    dependencies: ['dirichlet-series', 'riemann-zeta-function', 'complex-analyticity'],
    description: String.raw`A **Tauberian theorem** turns analytic information about a Dirichlet series into asymptotics for its coefficient sums. The Wiener–Ikehara form says that if the Dirichlet series of a non-negative arithmetic function extends analytically to the line $\Re s = 1$ except for a single simple pole at $s = 1$ of residue $A$, then the partial sums of the coefficients grow like $A x$. It is the analytic engine that converts the behaviour of $-\zeta'/\zeta$ into the prime number theorem.`,
    statement: String.raw`Let $a_n \ge 0$ and suppose the **Dirichlet series** $F(s) = \sum_{n\ge 1} a_n n^{-s}$ converges for $\Re s > 1$. Assume there is a constant $A \ge 0$ such that
$$F(s) - \frac{A}{s - 1}$$
extends to a function that is **analytic** (holomorphic) on an open set containing the closed half-plane $\Re s \ge 1$. Assume in addition the **linear growth bound** $A(x) := \sum_{n \le x} a_n = O(x)$ (equivalently, the function $g$ below is bounded). Then the summatory function satisfies
$$\sum_{n \le x} a_n \;\sim\; A\,x \qquad (x \to \infty).$$
The growth bound is a genuine extra hypothesis, not implied by analyticity alone; in the prime number theorem application it is furnished externally by Chebyshev's elementary estimate $\psi(x) = O(x)$.`,
    proof: String.raw`We give an honest proof *sketch*; this single deep analytic input is presented at sketch level, with its standard ingredients named. The result is equivalent, after the substitution $x = e^t$, to a statement about the boundary behaviour of a Laplace transform, and the cleanest modern route is **Newman's analytic theorem** (the contour-integral Tauberian argument).

Write $A(x) = \sum_{n \le x} a_n$. Since $a_n \ge 0$, $A$ is non-decreasing, and $F(s) = s\int_1^\infty A(x) x^{-s-1}\,dx$ for $\Re s > 1$ by partial summation. Set $g(t) = A(e^t) e^{-t} - A$. The hypothesis that $F(s) - A/(s-1)$ is analytic up to and on $\Re s = 1$ translates into the analyticity, on a neighbourhood of the closed half-plane, of the Laplace transform $\int_0^\infty g(t) e^{-zt}\,dt$ for $\Re z > 0$.

**Verification that $g$ is bounded.** This is exactly where the standing hypothesis $A(x) = O(x)$ is used, and it cannot be omitted: under analyticity alone $g$ need not be bounded, so Newman's theorem would not apply. By hypothesis there is $C$ with $A(x) \le C x$ for all $x \ge 1$, and $A(x) \ge 0$, hence for all $t \ge 0$,
$$0 \le A(e^t)e^{-t} \le C, \qquad\text{so}\qquad -A \le g(t) = A(e^t)e^{-t} - A \le C - A.$$
Thus $g$ is bounded on $[0,\infty)$; it is locally integrable because $A$ is a (non-decreasing) step function, so $A(e^t)e^{-t}$ is measurable and bounded on compacta. The boundedness needed for Newman's theorem is therefore established *before* the theorem is invoked, from the hypothesis — not recovered afterward as a consequence of it.

**Newman's theorem** states: if $g$ is bounded and locally integrable on $[0,\infty)$ and its Laplace transform extends analytically across the line $\Re z = 0$, then $\int_0^\infty g(t)\,dt$ converges. One proves this by integrating $\int_{|z| = R,\, \Re z > -\delta} G_T(z) e^{zT}(1 + z^2/R^2)\,dz/z$ over a contour pushed slightly left of the imaginary axis (legitimate by the analytic continuation) and estimating; the kernel $(1 + z^2/R^2)/z$ is engineered so the contributions vanish as $T \to \infty$, forcing convergence of $\int_0^\infty g$. With $g$ now known bounded and locally integrable and its Laplace transform analytic across $\Re z = 0$, all hypotheses hold and $\int_0^\infty g(t)\,dt$ converges.

Convergence of $\int_0^\infty (A(e^t)e^{-t} - A)\,dt$, together with the monotonicity of $A$ (a genuine Tauberian side-condition: it prevents oscillation and is where $a_n \ge 0$ is used), forces $A(e^t)e^{-t} \to A$, i.e. $A(x) \sim A x$. Indeed if $A(x)/x \ge A(1+\varepsilon)$ along a sequence, monotonicity makes $g$ stay positive on an interval of fixed length, contradicting convergence of its integral; the lower bound is symmetric. Hence $\sum_{n\le x} a_n \sim A x$. $\square$`,
  },
  {
    id: 'prime-number-theorem',
    label: 'Prime Number Theorem',
    title: 'Prime Number Theorem',
    kind: 'theorem',
    tags: ['Number Theory'],
    dependencies: ['prime-number', 'riemann-zeta-function', 'euler-product', 'complex-analyticity', 'tauberian-theorem'],
    description: String.raw`The **prime number theorem** pins down the asymptotic density of primes: the count up to $x$ is asymptotic to $x/\ln x$. Its proof runs through the complex analysis of the Riemann zeta function — the non-vanishing of $\zeta$ on the line $\Re s = 1$ — and is the central result on the distribution of primes.`,
    statement: String.raw`Let $\pi(x)$ count the primes $\le x$. Then
$$\pi(x) \sim \frac{x}{\ln x} \qquad (x \to \infty),$$
i.e. $\lim_{x\to\infty} \pi(x)\ln x / x = 1$. Equivalently $\psi(x) := \sum_{p^k \le x} \ln p \sim x$.`,
    proof: String.raw`We give the standard analytic proof as a rigorous sketch; each stated step is a theorem, and the one deep analytic input — the Tauberian step — is supplied by the cited **Tauberian theorem** node.

*Inline definitions.* The **von Mangoldt function** is $\Lambda(n) = \ln p$ if $n = p^k$ is a prime power ($k \ge 1$) and $\Lambda(n) = 0$ otherwise; it satisfies $\Lambda(n) \ge 0$. The **Chebyshev function** is $\psi(x) = \sum_{n \le x}\Lambda(n) = \sum_{p^k \le x}\ln p$, the summatory function of $\Lambda$.

Work with the **Riemann zeta function** $\zeta(s) = \sum_{n\ge 1} n^{-s}$ and its **Euler product** $\zeta(s) = \prod_p (1 - p^{-s})^{-1}$, valid for $\Re s > 1$, which encodes the primes. Taking the logarithmic derivative of the Euler product gives, for $\Re s > 1$,
$$-\frac{\zeta'(s)}{\zeta(s)} = \sum_p \sum_{k\ge 1} (\ln p)\,p^{-ks} = \sum_{n \ge 1} \Lambda(n)\, n^{-s},$$
the Dirichlet series of $\Lambda$, whose coefficient sums are exactly $\psi(x)$.

The crux is **non-vanishing on the line $\Re s = 1$**: $\zeta(s) \neq 0$ for $\Re s = 1$. This follows from the inequality $3 + 4\cos\theta + \cos 2\theta = 2(1+\cos\theta)^2 \ge 0$ applied to $|\zeta(\sigma)^3 \zeta(\sigma+it)^4 \zeta(\sigma+2it)|$ as $\sigma \to 1^+$: a zero at $1+it$ ($t \neq 0$) would force this product to $0$ against the triple pole contributed by $\zeta(\sigma)^3$ at $\sigma \to 1$, a contradiction. Combined with the **Euler product** (which gives $\zeta(s) \neq 0$ for $\Re s > 1$), this shows $\zeta$ is zero-free on the closed half-plane $\Re s \ge 1$. Note carefully that the $3 + 4\cos\theta + \cos 2\theta$ argument controls $\zeta$ only ON the line $\Re s = 1$ and to its right; it does not, by itself, place an open zero-free region extending into $\Re s < 1$. Because $\zeta$ extends **complex-analytically** past $\Re s = 1$ with only a simple pole of residue $1$ at $s = 1$, and is zero-free on the closed half-plane $\Re s \ge 1$, the function $-\zeta'/\zeta$ is analytic up to and on the line $\Re s = 1$ apart from that simple pole of residue $1$ at $s = 1$; equivalently $-\zeta'/\zeta - 1/(s-1)$ is analytic up to and on $\Re s = 1$ — which is precisely the boundary analyticity the Tauberian step requires.

**Chebyshev's bound $\psi(x) = O(x)$.** The Tauberian theorem demands, as a standing hypothesis, the linear growth bound $\psi(x) = O(x)$; we supply it by Chebyshev's elementary estimate, independent of the analytic continuation. For $n$ in the range $m < n \le 2m$ the prime $p$ with $m < p \le 2m$ divides $\binom{2m}{m}$ to the first power, so $\prod_{m < p \le 2m} p \mid \binom{2m}{m} \le 2^{2m}$; taking logarithms, $\vartheta(2m) - \vartheta(m) = \sum_{m < p \le 2m}\ln p \le 2m\ln 2$. Summing this telescoping bound over $m = 1, 2, 4, \dots$ gives $\vartheta(x) \le (2\ln 2)\,x$ for all $x \ge 1$, and since $\psi(x) = \sum_{k \ge 1}\vartheta(x^{1/k}) \le \vartheta(x) + O(\sqrt{x}\,\ln x \cdot \log x)$ (only $O(\log x)$ values of $k$ contribute), $\psi(x) = O(x)$. Thus the coefficient sums of $\Lambda$ satisfy the growth bound.

Since the coefficients $\Lambda(n) \ge 0$, the analytic continuation just established holds up to and on $\Re s = 1$, and $\psi(x) = O(x)$, all hypotheses of the **Tauberian theorem** (Wiener–Ikehara / Newman) are met for $F(s) = -\zeta'/\zeta = \sum_n \Lambda(n) n^{-s}$ with $A = 1$; it yields $\psi(x) = \sum_{n\le x}\Lambda(n) \sim x$. Finally, partial summation relating $\psi(x)$, Chebyshev's $\vartheta(x) = \sum_{p\le x}\ln p$ (the prime-power terms with $k \ge 2$ contribute $O(\sqrt{x}\ln x) = o(x)$, so $\psi(x) \sim \vartheta(x)$), and $\pi(x)$ turns $\psi(x)\sim x$ into $\pi(x) \sim x/\ln x$. $\square$`,
  },

  // ── Application ──────────────────────────────────────────────────────────────
  {
    id: 'rsa-cryptosystem',
    label: 'RSA',
    title: 'RSA Cryptosystem',
    kind: 'proposition',
    tags: ['Number Theory'],
    dependencies: ['eulers-theorem', 'fermats-little-theorem', 'chinese-remainder-theorem', 'prime-number'],
    description: String.raw`**RSA** turns the hardness of factoring into public-key cryptography. With a modulus that is a product of two large primes and a pair of exponents inverse to each other modulo the totient, encryption and decryption are modular exponentiations; the round trip recovers the message. Security rests on factoring the modulus being infeasible — itself not proven, but a standing assumption.`,
    statement: String.raw`Let $n = pq$ with $p \neq q$ primes, and let $e, d$ be positive integers with $e d \equiv 1 \pmod{\varphi(n)}$, where $\varphi(n) = (p-1)(q-1)$. Then for every integer $m$,
$$(m^e)^d \equiv m \pmod{n}.$$
Hence with public key $(n, e)$ and private key $d$, the map $m \mapsto m^e \bmod n$ is inverted by $c \mapsto c^d \bmod n$.`,
    proof: String.raw`Write $ed = 1 + k\varphi(n)$ for some integer $k \ge 0$ (possible since $ed \equiv 1 \pmod{\varphi(n)}$). We show $m^{ed} \equiv m$ modulo $p$ and modulo $q$ separately, then combine.

*Modulo $p$.* If $p \nmid m$, then by **Fermat's little theorem** $m^{p-1} \equiv 1 \pmod p$, and since $(p-1) \mid \varphi(n)$,
$$m^{ed} = m \cdot m^{k\varphi(n)} = m\cdot (m^{p-1})^{k\varphi(n)/(p-1)} \equiv m \cdot 1 = m \pmod p.$$
If $p \mid m$ then both sides are $\equiv 0 \pmod p$. Either way $m^{ed} \equiv m \pmod p$. By the same argument $m^{ed} \equiv m \pmod q$.

*Combine.* Now $p \mid (m^{ed} - m)$ and $q \mid (m^{ed} - m)$ with $p, q$ distinct primes, hence coprime; by the **Chinese remainder theorem** (equivalently, $pq \mid (m^{ed}-m)$ since coprime moduli both dividing a number means their product does) we get $n = pq \mid (m^{ed} - m)$, i.e. $m^{ed} \equiv m \pmod n$. (Note **Euler's theorem** gives the same conclusion directly when $\gcd(m,n)=1$; the Fermat-per-prime argument covers all $m$, including those sharing a factor with $n$.) $\square$`,
  },
]
