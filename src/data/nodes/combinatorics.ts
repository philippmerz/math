import type { MathNode } from '../types'

export const COMBINATORICS_NODES: MathNode[] = [
  {
    id: 'finite-set',
    label: 'Finite Set',
    title: 'Finite Set & Cardinality',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['natural-numbers', 'bijection'],
    description: String.raw`Combinatorics counts finite sets, so it needs a precise meaning for "$A$ has $n$ elements." A set is **finite** when its elements can be listed against an initial segment $\{0, 1, \dots, n-1\}$ of the naturals with none left over and none repeated — that is, when a bijection onto such a segment exists. The number $n$ is then the **cardinality** $|A|$, and the point worth checking is that this $n$ is forced: a set cannot be in bijection with two different segments.`,
    definition: String.raw`For $n \in \omega$ write $[n] := \{0, 1, \dots, n-1\}$ (so $[n] = n$ as a von Neumann ordinal). A set $A$ is **finite** of cardinality $n$, written $|A| = n$, when there is a bijection $A \to [n]$; $A$ is **finite** when $|A| = n$ for some $n \in \omega$, and **infinite** otherwise.`,
    proof: String.raw`**Well-definedness (the cardinality is unique).** It suffices to show that if $[m]$ and $[n]$ are in bijection then $m = n$; for then no set can have two distinct cardinalities. Argue by induction on $n$ that for all $m$, a bijection $[m] \to [n]$ forces $m = n$. If $n = 0$ then $[n] = \varnothing$, and only $[0] = \varnothing$ injects into it, so $m = 0$. Suppose the claim for $n$, and let $f : [m] \to [n+1]$ be a bijection; necessarily $m \ge 1$, say $m = m' + 1$. Composing $f$ with the transposition swapping $f(m')$ and $n$, we may assume $f(m') = n$. Then $f$ restricts to a bijection $[m'] \to [n]$, so $m' = n$ by the inductive hypothesis, whence $m = m' + 1 = n + 1$. By induction the cardinality $n$ with $A \to [n]$ is unique. $\square$`,
  },
  {
    id: 'counting-principles',
    label: 'Counting Principles',
    title: 'Sum & Product Rules',
    kind: 'proposition',
    tags: ['Combinatorics'],
    dependencies: ['finite-set', 'cartesian-product', 'division-algorithm'],
    description: String.raw`The two rules every enumeration rests on. If a set is split into disjoint pieces, its size is the total of the pieces' sizes — the **sum rule**; if objects are built by independent choices, the counts of the stages multiply — the **product rule**, so $|A \times B| = |A|\,|B|$. They are nothing more than the statements that disjoint union adds cardinalities and Cartesian product multiplies them, and from them the entire edifice of counting is built.`,
    statement: String.raw`Let $A, B$ be finite sets.
**(Sum rule)** If $A \cap B = \varnothing$ then $|A \cup B| = |A| + |B|$; more generally pairwise-disjoint finite sets $A_1, \dots, A_k$ satisfy $\bigl|\bigcup_i A_i\bigr| = \sum_i |A_i|$.
**(Product rule)** $|A \times B| = |A|\,|B|$.`,
    proof: String.raw`Write $m = |A|$, $n = |B|$ with bijections $f : A \to [m]$ and $g : B \to [n]$, where $[k] = \{0, \dots, k-1\}$.

**Sum rule (two disjoint sets).** Define $h : A \cup B \to [m + n]$ by $h(x) = f(x)$ for $x \in A$ and $h(x) = m + g(x)$ for $x \in B$. Disjointness of $A, B$ makes $h$ a function; it is injective because $f$ lands in $\{0, \dots, m-1\}$ while $m + g$ lands in $\{m, \dots, m+n-1\}$ (two disjoint blocks) and $f, g$ are themselves injective; and it is surjective onto $[m+n]$ since $f$ covers the first block and $m + g$ the second. Thus $h$ is a bijection and $|A \cup B| = m + n$. The general statement for $k$ sets follows by induction on $k$, applying this case to $A_k$ and $\bigcup_{i<k} A_i$ (disjoint by hypothesis).

**Product rule.** Define $p : A \times B \to [mn]$ by $p(a, b) = n\,f(a) + g(b)$. Since $0 \le f(a) \le m-1$ and $0 \le g(b) \le n-1$, the value lies in $[mn]$, as $n(m-1) + (n-1) = nm - 1$. By the **division algorithm** every $t \in [mn]$ has a *unique* representation $t = nq + r$ with $0 \le r < n$, and then $0 \le q < m$ (since $nq = t - r \le nm - 1 < nm$ forces $q \le m-1$); choosing $a = f^{-1}(q)$, $b = g^{-1}(r)$ recovers the unique preimage, so $p$ is a bijection. Hence $|A \times B| = mn = |A|\,|B|$. $\square$`,
  },
  {
    id: 'permutations-combinations',
    label: 'Permutations & Combinations',
    title: 'Permutations & Combinations',
    kind: 'proposition',
    tags: ['Combinatorics'],
    dependencies: ['counting-principles', 'finite-set'],
    description: String.raw`The two basic ways to draw $k$ objects from $n$. A **permutation** is an ordered arrangement; the number of ordered $k$-tuples of distinct elements is the falling factorial $n^{\underline{k}} = n(n-1)\cdots(n-k+1) = n!/(n-k)!$. A **combination** is an unordered selection; since each $k$-subset can be ordered in $k!$ ways, the number of $k$-subsets is $n^{\underline{k}}/k! = \binom{n}{k}$. These two counts, ordered and unordered, are the atoms from which most enumeration is assembled.`,
    statement: String.raw`Let $A$ be a finite set with $|A| = n$ and let $0 \le k \le n$.
**(Permutations)** The number of injections $[k] \to A$ — equivalently, ordered $k$-tuples of distinct elements of $A$ — is the **falling factorial**
$$n^{\underline{k}} = n(n-1)\cdots(n-k+1) = \frac{n!}{(n-k)!}.$$
**(Combinations)** The number of $k$-element subsets of $A$ is
$$\binom{n}{k} = \frac{n^{\underline{k}}}{k!} = \frac{n!}{k!\,(n-k)!}.$$`,
    proof: String.raw`**Permutations.** Count ordered $k$-tuples $(a_1, \dots, a_k)$ of distinct elements by the **product rule**, choosing coordinates in turn: $a_1$ has $n$ choices, and once $a_1, \dots, a_{i-1}$ are fixed (distinct), $a_i$ may be any of the remaining $n - (i-1)$ elements. Multiplying the stage counts gives $n(n-1)\cdots(n-k+1) = n^{\underline{k}}$, which equals $n!/(n-k)!$ after telescoping the factorials. (Formally this is induction on $k$ via the product rule applied to (first coordinate) $\times$ (the $(k-1)$-tuples from the remaining $n-1$ elements).)

**Combinations.** Let $\binom{n}{k}$ denote the number of $k$-subsets. Form every ordered $k$-tuple of distinct elements in two stages: first choose the underlying $k$-subset $S$, then choose an ordering of $S$. A $k$-subset has exactly $k^{\underline{k}} = k!$ orderings (the permutation count with $n = k$). By the **product rule** the number of ordered tuples factors as $\binom{n}{k} \cdot k!$. Equating this with the permutation count $n^{\underline{k}}$ gives $\binom{n}{k} \cdot k! = n^{\underline{k}}$, hence $\binom{n}{k} = n^{\underline{k}}/k! = n!/(k!\,(n-k)!)$. $\square$`,
  },
  {
    id: 'binomial-coefficient',
    label: 'Binomial Coefficient',
    title: 'Binomial Coefficient',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['permutations-combinations'],
    description: String.raw`The numbers $\binom{n}{k}$ — read "$n$ choose $k$" — count the $k$-element subsets of an $n$-element set. Beyond the closed form $n!/(k!\,(n-k)!)$, two structural facts govern them: the symmetry $\binom{n}{k} = \binom{n}{n-k}$, since choosing the $k$ elements in is the same as choosing the $n-k$ left out, and **Pascal's rule** $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$, the recurrence that generates Pascal's triangle. These numbers pervade combinatorics, algebra, and probability.`,
    definition: String.raw`For integers $0 \le k \le n$ the **binomial coefficient** is
$$\binom{n}{k} := \frac{n!}{k!\,(n-k)!},$$
the number of $k$-element subsets of an $n$-element set; by convention $\binom{n}{k} = 0$ for $k < 0$ or $k > n$, and $\binom{n}{0} = \binom{n}{n} = 1$. The **symmetry** $\binom{n}{k} = \binom{n}{n-k}$ is immediate from the formula (and combinatorially from $S \mapsto A \setminus S$).`,
  },
  {
    id: 'pascals-rule',
    label: "Pascal's Rule",
    title: "Pascal's Rule",
    kind: 'proposition',
    tags: ['Combinatorics'],
    dependencies: ['binomial-coefficient', 'counting-principles'],
    description: String.raw`Each interior entry of Pascal's triangle is the sum of the two above it: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$. The combinatorial reason is a single case split — fix one distinguished element and ask whether a $k$-subset contains it — which makes the recurrence transparent and gives an integer, induction-friendly handle on the binomial coefficients with no factorials in sight.`,
    statement: String.raw`For all integers $n \ge 1$ and all $k$,
$$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.$$`,
    proof: String.raw`Fix a distinguished element $\ast$ of an $n$-set $A$, and let $A' = A \setminus \{\ast\}$, an $(n-1)$-set. The $k$-subsets of $A$ split into two disjoint classes: those that **contain** $\ast$ and those that do **not**. A $k$-subset containing $\ast$ is determined by its remaining $k-1$ elements, an arbitrary $(k-1)$-subset of $A'$, so there are $\binom{n-1}{k-1}$ of them; a $k$-subset avoiding $\ast$ is just a $k$-subset of $A'$, so there are $\binom{n-1}{k}$ of them. By the **sum rule** for the disjoint union,
$$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.$$
(The boundary cases $k \le 0$ or $k \ge n$ check directly against the conventions $\binom{m}{j} = 0$ for $j < 0$ or $j > m$.) $\square$`,
  },
  {
    id: 'binomial-theorem',
    label: 'Binomial Theorem',
    title: 'Binomial Theorem',
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['binomial-coefficient', 'pascals-rule', 'commutative-ring'],
    description: String.raw`Expanding $(x+y)^n$ multiplies out $n$ identical factors $(x+y)$; a term $x^k y^{n-k}$ arises by choosing which $k$ of the $n$ factors contribute their $x$, and there are $\binom{n}{k}$ such choices. Hence
$$(x+y)^n = \sum_{k=0}^{n} \binom{n}{k}\, x^k y^{n-k}.$$
It is the bridge between counting and algebra — the same coefficients that enumerate subsets are the coefficients of an algebraic expansion — and it holds in any commutative ring. (For non-integer exponents it extends to Newton's binomial *series* $\sum_{k \ge 0} \binom{\alpha}{k} x^k$, valid for $|x| < 1$.)`,
    statement: String.raw`In any commutative ring, for all $x, y$ and every $n \in \mathbb{N}$,
$$(x + y)^n = \sum_{k=0}^{n} \binom{n}{k}\, x^k y^{n-k}.$$`,
    proof: String.raw`By induction on $n$. For $n = 0$ both sides equal $1$ (empty product on the left; the single term $\binom{0}{0} x^0 y^0 = 1$ on the right). Assume the identity for $n$. Then, using commutativity and distributivity in the ring,
$$(x+y)^{n+1} = (x+y)\sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k} = \sum_{k=0}^{n} \binom{n}{k} x^{k+1} y^{n-k} + \sum_{k=0}^{n} \binom{n}{k} x^{k} y^{n+1-k}.$$
Reindex the first sum by $j = k+1$ and rename $j \to k$:
$$(x+y)^{n+1} = \sum_{k=1}^{n+1} \binom{n}{k-1} x^{k} y^{n+1-k} + \sum_{k=0}^{n} \binom{n}{k} x^{k} y^{n+1-k}.$$
The $k = n+1$ term of the first sum is $\binom{n}{n} x^{n+1} = x^{n+1}$ and the $k = 0$ term of the second is $\binom{n}{0} y^{n+1} = y^{n+1}$; for $1 \le k \le n$ the two sums combine, and **Pascal's rule** gives $\binom{n}{k-1} + \binom{n}{k} = \binom{n+1}{k}$. Hence
$$(x+y)^{n+1} = x^{n+1} + \sum_{k=1}^{n} \binom{n+1}{k} x^k y^{n+1-k} + y^{n+1} = \sum_{k=0}^{n+1} \binom{n+1}{k} x^k y^{n+1-k},$$
the boundary terms being exactly the $k = n+1$ and $k = 0$ summands. This closes the induction. $\square$`,
  },
  {
    id: 'pigeonhole-principle',
    label: 'Pigeonhole Principle',
    title: 'Pigeonhole Principle',
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['function', 'finite-set', 'counting-principles'],
    description: String.raw`If $n+1$ pigeons occupy $n$ holes, some hole holds at least two — no function from a larger finite set to a smaller one can be injective. Trivial to state, it is startlingly powerful: among any $13$ people two share a birth month; in any group two people have the same number of acquaintances within the group; and it forces countless existence results where no construction is offered. The *generalized* form says $N$ objects in $n$ boxes fill some box to at least $\lceil N/n \rceil$.`,
    statement: String.raw`Let $A, B$ be finite sets with $|A| > |B|$. Then no function $f : A \to B$ is injective; equivalently, some value is attained at least twice. More generally, if $|A| = N$ and $|B| = n \ge 1$, then some fibre $f^{-1}(b)$ has at least $\lceil N/n \rceil$ elements.`,
    proof: String.raw`Write $m = |B|$ and suppose, for contradiction, that $f : A \to B$ is injective. Then $f$ is a bijection from $A$ onto its image $f[A] \subseteq B$, so $|A| = |f[A]|$. But $f[A] \subseteq B$ gives $|f[A]| \le |B|$ (the inclusion is an injection $f[A] \hookrightarrow B$, and an injection between finite sets cannot increase cardinality — formally, by the **sum rule**, $|B| = |f[A]| + |B \setminus f[A]| \ge |f[A]|$). Hence $|A| \le |B|$, contradicting $|A| > |B|$. So $f$ is not injective: there exist $a \neq a'$ with $f(a) = f(a')$.

**Generalized form.** The fibres $\{f^{-1}(b) : b \in B\}$ partition $A$ into $n$ disjoint blocks, so by the **sum rule** $\sum_{b \in B} |f^{-1}(b)| = N$. If every block had at most $\lceil N/n \rceil - 1$ elements, the total would be at most $n\bigl(\lceil N/n \rceil - 1\bigr) < n \cdot \tfrac{N}{n} = N$ (using $\lceil N/n \rceil < N/n + 1$), a contradiction. Hence some fibre has at least $\lceil N/n \rceil$ elements. $\square$`,
  },
  {
    id: 'inclusion-exclusion',
    label: 'Inclusion–Exclusion',
    title: 'Inclusion–Exclusion Principle',
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['counting-principles', 'binomial-coefficient', 'binomial-theorem'],
    description: String.raw`To count a union one cannot simply add the sizes — overlaps get counted repeatedly. Inclusion–exclusion fixes this by alternately adding and subtracting the intersections:
$$\Bigl|\bigcup_i A_i\Bigr| = \sum_i |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<k} |A_i \cap A_j \cap A_k| - \cdots$$
The signs make every element net-counted exactly once. The principle counts **derangements** (permutations fixing nothing), surjections, and integers coprime to a modulus, and generalizes to a master formula across combinatorics and probability.`,
    statement: String.raw`For finite sets $A_1, \dots, A_n$ contained in a finite universe,
$$\Bigl|\,\bigcup_{i=1}^{n} A_i \,\Bigr| = \sum_{\varnothing \neq S \subseteq \{1,\dots,n\}} (-1)^{|S|+1} \Bigl|\,\bigcap_{i \in S} A_i\,\Bigr|.$$`,
    proof: String.raw`Count the contribution of an arbitrary element $x$ of the universe to each side. If $x$ lies in *none* of the $A_i$, it contributes $0$ to the left side, and on the right every intersection $\bigcap_{i \in S} A_i$ omits it, so it contributes $0$ there too.

Now suppose $x$ lies in exactly $r \ge 1$ of the sets, say those indexed by $T$ with $|T| = r$. On the left, $x \in \bigcup_i A_i$ contributes $1$. On the right, $x \in \bigcap_{i \in S} A_i$ exactly when $S \subseteq T$; among the non-empty $S$, those of size $j$ contained in $T$ number $\binom{r}{j}$ (a $j$-subset of the $r$-set $T$, by the **binomial coefficient** count), each contributing $(-1)^{j+1}$. So $x$'s total right-side contribution is
$$\sum_{j=1}^{r} (-1)^{j+1} \binom{r}{j} = -\sum_{j=1}^{r} (-1)^{j} \binom{r}{j} = -\Bigl(\sum_{j=0}^{r} (-1)^{j} \binom{r}{j} - 1\Bigr) = -\bigl((1-1)^r - 1\bigr) = 1,$$
where $\sum_{j=0}^{r} (-1)^j \binom{r}{j} = (1 + (-1))^r = 0$ for $r \ge 1$ by the **binomial theorem** with $x = -1$, $y = 1$. Thus every element contributes equally to both sides; summing over all $x$ in the universe (the **sum rule**, partitioning each side as a sum of per-element contributions) gives the identity. $\square$`,
  },
  {
    id: 'double-counting',
    label: 'Double Counting',
    title: 'Double Counting',
    kind: 'proposition',
    tags: ['Combinatorics'],
    dependencies: ['counting-principles', 'binomial-coefficient'],
    description: String.raw`Count one set two different ways and the answers must agree — that forced equality is a proof. The underlying fact is that the size of a finite relation $R \subseteq A \times B$ can be totalled by rows or by columns, $\sum_{a} |R_a| = |R| = \sum_{b} |R^b|$. It yields the handshaking lemma $\sum_v \deg(v) = 2|E|$ (count incidences vertex-by-vertex versus edge-by-edge) and $\sum_k \binom{n}{k} = 2^n$ (count all subsets at once versus by size). A combinatorial proof of this kind often reveals *why* an identity holds where algebra shows only *that* it does.`,
    statement: String.raw`Let $R \subseteq A \times B$ be a relation between finite sets, and for $a \in A$, $b \in B$ write $R_a = \{b : (a,b) \in R\}$ and $R^b = \{a : (a,b) \in R\}$ for its rows and columns. Then
$$\sum_{a \in A} |R_a| \;=\; |R| \;=\; \sum_{b \in B} |R^b|.$$
As an instance, $\displaystyle\sum_{k=0}^{n} \binom{n}{k} = 2^n$.`,
    proof: String.raw`The rows $\{\{a\} \times R_a : a \in A\}$ are pairwise disjoint (a pair $(a,b) \in R$ lies in the single row indexed by its first coordinate) and their union is $R$. By the **sum rule** for a disjoint union, $|R| = \sum_{a \in A} |\{a\} \times R_a| = \sum_{a \in A} |R_a|$. The identical argument applied to the columns $\{R^b \times \{b\}\}$, which also partition $R$, gives $|R| = \sum_{b \in B} |R^b|$. Equating the two totals proves the claim.

**Instance.** Take $A$ an $n$-set and $B = \{0, 1, \dots, n\}$, with $R = \{(S, k) : S \subseteq A,\ |S| = k\}$ — but it is cleaner to count the single set $\mathcal{P}(A)$ of all subsets two ways. Grouping subsets by size, the number of subsets of size $k$ is $\binom{n}{k}$, so $|\mathcal{P}(A)| = \sum_{k=0}^{n} \binom{n}{k}$ by the **sum rule**. Counting subsets directly, each of the $n$ elements is independently in or out, so by the **product rule** $|\mathcal{P}(A)| = 2^n$. Hence $\sum_{k=0}^{n} \binom{n}{k} = 2^n$. $\square$`,
  },
  {
    id: 'recurrence-relation',
    label: 'Recurrence Relation',
    title: 'Recurrence Relation',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['sequence'],
    description: String.raw`A recurrence defines each term of a sequence from earlier ones, like the Fibonacci rule $F_n = F_{n-1} + F_{n-2}$ with $F_0 = 0$, $F_1 = 1$. It is how counting problems are first set up — a recursive case analysis — before a closed form is sought. For a linear homogeneous recurrence with constant coefficients the closed form comes from the roots of the **characteristic polynomial**: each root $r$ contributes a term $r^n$, so Fibonacci's golden ratio $\varphi$ and its conjugate yield the Binet formula.`,
    definition: String.raw`A **recurrence relation** of order $d$ for a sequence $(a_n)_{n \ge 0}$ is an equation expressing $a_n$ (for $n \ge d$) as a fixed function of the previous $d$ terms, $a_n = F(a_{n-1}, \dots, a_{n-d})$ in which $F$ genuinely depends on the oldest term $a_{n-d}$, together with $d$ **initial values** $a_0, \dots, a_{d-1}$; these data determine the sequence uniquely by recursion. The recurrence is **linear with constant coefficients** when $a_n = c_1 a_{n-1} + \cdots + c_d a_{n-d}$ with $c_i$ constants and $c_d \neq 0$ (so the order is exactly $d$), and **homogeneous** when there is no added term; its **characteristic polynomial** is $\chi(x) = x^d - c_1 x^{d-1} - \cdots - c_d$, which has degree exactly $d$ and nonzero constant term $-c_d$ (so $x \nmid \chi$).`,
  },
  {
    id: 'formal-power-series',
    label: 'Formal Power Series',
    title: 'Formal Power Series',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['commutative-ring', 'sequence'],
    description: String.raw`A formal power series is an "infinite polynomial" $\sum_{n \ge 0} a_n x^n$ — but **formal**: it is just the sequence of coefficients $(a_n)$, and $x$ is a bookkeeping symbol, never substituted, so convergence is irrelevant. Addition is coefficientwise and multiplication is the Cauchy convolution, the rules that make $x^i \cdot x^j = x^{i+j}$ work. This turns operations on sequences into algebra: this ring $R[[x]]$ is exactly where generating functions live.`,
    definition: String.raw`Over a commutative ring $R$, a **formal power series** is a sequence $(a_n)_{n \ge 0}$ of elements of $R$, written $\sum_{n \ge 0} a_n x^n$. The set $R[[x]]$ of all such is a commutative ring under
$$\Bigl(\sum a_n x^n\Bigr) + \Bigl(\sum b_n x^n\Bigr) = \sum (a_n + b_n) x^n, \qquad \Bigl(\sum a_n x^n\Bigr)\Bigl(\sum b_n x^n\Bigr) = \sum_{n} \Bigl(\sum_{i=0}^{n} a_i b_{n-i}\Bigr) x^n.$$
A series is a **unit** (invertible) iff its constant term $a_0$ is a unit in $R$; in particular over a field every series with $a_0 \neq 0$ has an inverse, computed coefficient by coefficient.`,
  },
  {
    id: 'generating-function',
    label: 'Generating Function',
    title: 'Generating Function',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['formal-power-series', 'recurrence-relation'],
    description: String.raw`A generating function packages a whole sequence $(a_n)$ into one object — the formal power series $\sum_n a_n x^n$ — so that operations on sequences become algebra on series. A linear recurrence turns into a single rational-function equation one solves for a closed form; the convolution $\sum_k a_k b_{n-k}$ that pervades counting becomes plain multiplication. Wilf called a generating function "a clothesline on which we hang up a sequence of numbers for display."`,
    definition: String.raw`The **(ordinary) generating function** of a sequence $(a_n)_{n \ge 0}$ over a field $K$ is the formal power series
$$A(x) = \sum_{n \ge 0} a_n x^n \in K[[x]].$$
Its use rests on the dictionary between sequence operations and series operations: termwise sum $\leftrightarrow$ sum, shift $a_{n-1} \leftrightarrow x A(x)$, and convolution $c_n = \sum_{k=0}^{n} a_k b_{n-k} \leftrightarrow$ product $A(x) B(x)$. (The **exponential generating function** $\sum_n a_n x^n/n!$ is the variant suited to labelled structures.) For example $\sum_{n \ge 0} x^n = (1 - x)^{-1}$ as a unit of $K[[x]]$, since $(1-x)\sum_{n} x^n = 1$.`,
  },
  {
    id: 'catalan-numbers',
    label: 'Catalan Numbers',
    title: 'Catalan Numbers',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['recurrence-relation', 'binomial-coefficient'],
    description: String.raw`The Catalan numbers $1, 1, 2, 5, 14, 42, \dots$ count an astonishing range of objects that all share one recursive shape: balanced strings of parentheses, full binary trees, triangulations of a polygon, and monotone lattice paths that never cross the diagonal. The recursive structure — split at the first place the count returns to zero — gives the convolution recurrence $C_{n+1} = \sum_{i=0}^{n} C_i C_{n-i}$, and from it (or from a lattice-path argument) the closed form $C_n = \frac{1}{n+1}\binom{2n}{n}$. They are combinatorics' favourite sequence, surfacing wherever things nest.`,
    definition: String.raw`The **Catalan numbers** $(C_n)_{n \ge 0}$ are defined by the recurrence
$$C_0 = 1, \qquad C_{n+1} = \sum_{i=0}^{n} C_i\, C_{n-i} \quad (n \ge 0),$$
the convolution recurrence counting, e.g., full binary trees by the sizes of their two subtrees. Equivalently $C_n$ is the number of **Dyck paths** of length $2n$: lattice paths from $(0,0)$ to $(2n,0)$ using steps $(1,+1)$ and $(1,-1)$ that never go below the $x$-axis.`,
  },
  {
    id: 'cycle-lemma',
    label: 'Reflection Principle',
    title: 'Reflection Principle for Lattice Paths',
    kind: 'lemma',
    tags: ['Combinatorics'],
    dependencies: ['permutations-combinations', 'binomial-coefficient', 'counting-principles'],
    description: String.raw`André's reflection principle counts lattice paths that stay above a barrier by a clever bijection: a path that *does* touch the forbidden level below the axis, reflected after its first such touch, becomes a path to a mirrored endpoint — and reflection is reversible, so the "bad" paths are counted exactly by paths to the reflected target. Subtracting these from all paths leaves the good ones. It is the standard route to the ballot numbers and to the closed form for the Catalan numbers.`,
    statement: String.raw`The number of lattice paths of $2n$ unit steps $(1, \pm 1)$ from $(0,0)$ to $(2n, 0)$ that **never go below** the $x$-axis (Dyck paths) is
$$\binom{2n}{n} - \binom{2n}{n+1}.$$`,
    proof: String.raw`A path from $(0,0)$ to $(2n,0)$ has $n$ up-steps and $n$ down-steps in some order, so choosing the positions of the up-steps shows there are $\binom{2n}{n}$ such paths in all (by **permutations & combinations**). Call a path **bad** if it dips to height $-1$ at some point. Let $\beta$ be a bad path and let $t$ be the first step at which it reaches height $-1$. **Reflect** the portion of the path after step $t$ across the line $y = -1$ (swap up- and down-steps there). The reflected path runs from $(0,0)$ to $(2n, -2)$: the endpoint height changes from $0$ to $0 - 2(\text{net of reflected suffix})$; concretely, reflecting after the first visit to $-1$ sends the terminal height $0$ to $-2$.

This reflection is a **bijection** between bad paths $(0,0) \to (2n,0)$ and *all* paths $(0,0) \to (2n,-2)$: it is invertible, since any path to $(2n,-2)$ must cross $y = -1$ (its endpoint is below it), and reflecting after its first visit to $-1$ returns a bad path to $(2n,0)$. A path to $(2n,-2)$ has $u$ up-steps and $d$ down-steps with $u + d = 2n$ and $u - d = -2$, so $u = n-1$; there are $\binom{2n}{n-1} = \binom{2n}{n+1}$ of them. Hence the number of bad paths is $\binom{2n}{n+1}$, and by the **sum rule** the number of Dyck paths (good ones) is
$$\binom{2n}{n} - \binom{2n}{n+1}. \qquad \square$$`,
  },
  {
    id: 'catalan-closed-form',
    label: 'Catalan Closed Form',
    title: 'Closed Form for the Catalan Numbers',
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['catalan-numbers', 'cycle-lemma', 'binomial-coefficient'],
    description: String.raw`The recursive Catalan numbers have the strikingly simple closed form $C_n = \frac{1}{n+1}\binom{2n}{n}$ — a binomial coefficient divided by $n+1$, which is always an integer. It falls out of the reflection count of Dyck paths: subtract the "bad" paths from all paths and simplify the two binomial coefficients.`,
    statement: String.raw`For every $n \ge 0$,
$$C_n = \frac{1}{n+1}\binom{2n}{n}.$$`,
    proof: String.raw`By the definition of the **Catalan numbers**, $C_n$ equals the number of Dyck paths of length $2n$. By the **reflection principle** that number is $\binom{2n}{n} - \binom{2n}{n+1}$.

**Case $n = 0$.** Here $\binom{0}{0} = 1$ and $\binom{0}{1} = 0$ (by the **binomial coefficient** conventions), so the count is $1 - 0 = 1$, while $\frac{1}{0+1}\binom{0}{0} = 1$; the formula holds.

**Case $n \ge 1$.** Now $(n-1)!$ is defined, so we may use the factorial form of the **binomial coefficient**:
$$\binom{2n}{n+1} = \frac{(2n)!}{(n+1)!\,(n-1)!} = \frac{(2n)!}{n!\,n!} \cdot \frac{n!\,n!}{(n+1)!\,(n-1)!} = \binom{2n}{n} \cdot \frac{n}{\,n+1\,},$$
since $\dfrac{n!\,n!}{(n+1)!\,(n-1)!} = \dfrac{n! / (n-1)!}{(n+1)!/n!} = \dfrac{n}{\,n+1\,}$. Therefore
$$C_n = \binom{2n}{n} - \binom{2n}{n}\cdot\frac{n}{n+1} = \binom{2n}{n}\Bigl(1 - \frac{n}{n+1}\Bigr) = \frac{1}{n+1}\binom{2n}{n}.$$
Both cases give $C_n = \frac{1}{n+1}\binom{2n}{n}$, as claimed.

(That the Dyck-path count satisfies the same convolution recurrence $C_{n+1} = \sum_i C_i C_{n-i}$ — split a Dyck path at its first return to the axis — confirms it is indeed the sequence of the previous node.) $\square$`,
  },
  {
    id: 'integer-partition',
    label: 'Integer Partition',
    title: 'Integer Partition',
    kind: 'definition',
    tags: ['Combinatorics'],
    dependencies: ['natural-numbers', 'finite-set'],
    description: String.raw`An integer partition writes a positive integer as an unordered sum of positive parts — order ignored, so $4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1$ gives $p(4) = 5$ partitions. The partition function $p(n)$ grows sub-exponentially (the Hardy–Ramanujan asymptotic $p(n) \sim \frac{1}{4n\sqrt3} e^{\pi\sqrt{2n/3}}$) yet hides deep structure — Euler's pentagonal number theorem, Ramanujan's congruences such as $p(5n+4) \equiv 0 \pmod 5$ — where combinatorics meets number theory. Its generating function is the elegant product $\prod_{k \ge 1} (1 - x^k)^{-1}$.`,
    definition: String.raw`A **partition** of a positive integer $n$ is a finite multiset of positive integers (the **parts**) summing to $n$ — equivalently a non-increasing tuple $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_r \ge 1$ with $\sum_i \lambda_i = n$. The **partition function** $p(n)$ is the number of partitions of $n$ (with $p(0) = 1$, the empty partition). Its ordinary generating function is
$$\sum_{n \ge 0} p(n)\, x^n = \prod_{k \ge 1} \frac{1}{1 - x^k},$$
each factor $\tfrac{1}{1-x^k} = \sum_{m \ge 0} x^{km}$ choosing how many parts equal $k$.`,
  },
  {
    id: 'ramsey-theory',
    label: 'Ramsey Theory',
    title: "Ramsey's Theorem",
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['pigeonhole-principle', 'binomial-coefficient', 'pascals-rule', 'graph'],
    description: String.raw`Ramsey theory shows that total disorder is impossible: any sufficiently large structure must contain a sizeable ordered substructure. The emblem: every red/blue colouring of the edges of $K_6$ contains a monochromatic triangle, while $K_5$ can be coloured avoiding one — so the **Ramsey number** $R(3,3) = 6$. The finite Ramsey theorem guarantees $R(s,t)$ is always finite, with the explicit bound $R(s,t) \le \binom{s+t-2}{s-1}$; that these numbers grow so fast leaves most of them unknown.`,
    statement: String.raw`For all integers $s, t \ge 1$ there is a least integer $R(s, t)$ such that every red/blue colouring of the edges of the complete graph $K_n$ with $n \ge R(s,t)$ contains a red $K_s$ or a blue $K_t$. Moreover $R(s,t) \le \binom{s+t-2}{s-1}$; in particular $R(s,t)$ is finite.`,
    proof: String.raw`First the boundary cases: $R(s, 1) = R(1, t) = 1$, since a $K_1$ (a single vertex) is vacuously monochromatic of either colour. Now prove the **recursive bound**
$$R(s, t) \le R(s-1, t) + R(s, t-1) \qquad (s, t \ge 2),$$
which also establishes finiteness by induction on $s + t$. Let $n = R(s-1,t) + R(s,t-1)$ and two-colour the edges of $K_n$. Fix a vertex $v$; its $n - 1$ incident edges are split by colour into a red set $\mathrm{Red}(v)$ and a blue set $\mathrm{Blue}(v)$. Since
$$|\mathrm{Red}(v)| + |\mathrm{Blue}(v)| = n - 1 = R(s-1,t) + R(s,t-1) - 1,$$
the **pigeonhole principle** forces $|\mathrm{Red}(v)| \ge R(s-1,t)$ or $|\mathrm{Blue}(v)| \ge R(s,t-1)$ (if both fell short, the sum would be at most $R(s-1,t) + R(s,t-1) - 2 < n-1$).

*Case 1:* $|\mathrm{Red}(v)| \ge R(s-1,t)$. Among the red-neighbours of $v$, the induced colouring (on at least $R(s-1,t)$ vertices) yields, by the inductive hypothesis, a blue $K_t$ — done — or a red $K_{s-1}$; adjoining $v$, whose edges to these vertices are all red, extends the red $K_{s-1}$ to a red $K_s$. *Case 2* is symmetric, with colours and $(s,t)$ swapped, producing a red $K_s$ or a blue $K_t$. Either way the required monochromatic clique exists, so $R(s,t) \le n$.

Finally the **explicit bound**, by induction on $s + t$ using **Pascal's rule**: the base cases give $R(s,1) = 1 = \binom{s-1}{s-1}$ and $R(1,t) = 1 = \binom{t-1}{0}$, and for $s, t \ge 2$,
$$R(s,t) \le R(s-1,t) + R(s,t-1) \le \binom{s+t-3}{s-2} + \binom{s+t-3}{s-1} = \binom{s+t-2}{s-1}. \qquad \square$$`,
  },
  {
    id: 'probabilistic-method',
    label: 'Probabilistic Method',
    title: 'Probabilistic Method',
    kind: 'theorem',
    tags: ['Combinatorics'],
    dependencies: ['ramsey-theory', 'binomial-coefficient', 'expectation', 'probability-space'],
    description: String.raw`Erdős's idea: to prove an object with some property exists, put a probability distribution on the candidates and show a *random* one has the property with positive probability — then at least one must. No construction is offered, yet existence is certain. Its founding application gives a lower bound on Ramsey numbers: a uniformly random two-colouring of $K_n$ has expected number $\binom{n}{k} 2^{1 - \binom{k}{2}}$ of monochromatic $K_k$'s, so if that expectation is below $1$ some colouring has *none* — beating, for decades, the best explicit constructions.`,
    statement: String.raw`If $n$ and $k$ satisfy $\binom{n}{k}\, 2^{\,1 - \binom{k}{2}} < 1$, then there is a red/blue edge-colouring of $K_n$ with no monochromatic $K_k$; hence $R(k,k) > n$. In particular, taking $n = \lfloor 2^{k/2} \rfloor$ gives $R(k,k) > \lfloor 2^{k/2} \rfloor$ for $k \ge 3$.`,
    proof: String.raw`Colour each of the $\binom{n}{2}$ edges of $K_n$ red or blue independently with probability $\tfrac12$ each, on the finite **probability space** of all $2^{\binom{n}{2}}$ equally likely colourings. For a fixed set $T$ of $k$ vertices, let $X_T$ be the indicator that the $\binom{k}{2}$ edges within $T$ are all the *same* colour. There are two monochromatic options (all red, all blue) out of $2^{\binom{k}{2}}$ equally likely colourings of those edges, so
$$\mathbb{E}[X_T] = \Pr[X_T = 1] = \frac{2}{2^{\binom{k}{2}}} = 2^{\,1 - \binom{k}{2}}.$$
Let $X = \sum_{|T| = k} X_T$ count the monochromatic $K_k$'s. The **expectation** is additive — on a finite probability space $\mathbb{E}[X] = \sum_\omega \Pr[\omega] X(\omega)$ is a finite sum, so it commutes with the finite sum over $T$, needing no independence — and with the **binomial coefficient** count of the $\binom{n}{k}$ choices of $T$,
$$\mathbb{E}[X] = \sum_{|T| = k} \mathbb{E}[X_T] = \binom{n}{k}\, 2^{\,1 - \binom{k}{2}} < 1$$
by hypothesis. A non-negative integer-valued random variable with expectation $< 1$ must take the value $0$ somewhere: if $X \ge 1$ always, then $\mathbb{E}[X] \ge 1$. So some colouring in the sample space has $X = 0$ — no monochromatic $K_k$ — which by definition means $R(k,k) > n$.

For the explicit bound, set $n = \lfloor 2^{k/2}\rfloor$ and $k \ge 3$. Using $\binom{n}{k} \le \frac{n^k}{k!}$ and $\binom{k}{2} = \tfrac{k(k-1)}{2}$,
$$\binom{n}{k}\,2^{1 - \binom{k}{2}} \le \frac{n^k}{k!}\cdot 2^{1 - k(k-1)/2} \le \frac{2^{k^2/2}}{k!}\cdot \frac{2^{1 + k/2}}{2^{k^2/2}} = \frac{2^{1 + k/2}}{k!} < 1,$$
the last inequality holding for all $k \ge 3$ (and checked directly there: $2^{1+3/2}/3! = 2^{2.5}/6 < 1$, with the left side decreasing in $k$). Hence $R(k,k) > \lfloor 2^{k/2}\rfloor$. $\square$`,
  },
]
