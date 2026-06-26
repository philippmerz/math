import type { MathNode } from '../types'

export const ORDER_THEORY_NODES: MathNode[] = [
  // ── Orders ──────────────────────────────────────────────────────────────────
  {
    id: 'partial-order',
    label: 'Partial Order',
    title: 'Partial Order',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['relation'],
    description: String.raw`A **partial order** abstracts the idea of "$a$ comes no later than $b$" while allowing that some pairs are simply *incomparable* — like subsets of a set under inclusion, or divisibility on the integers. It keeps the three features one expects of "$\le$": each element is below itself (reflexivity), two elements below each other must coincide (antisymmetry), and the relation chains together (transitivity). The pair $(P, \le)$ is a *partially ordered set*, or **poset**.`,
    definition: String.raw`A **partial order** on a set $P$ is a relation $\le\, \subseteq P \times P$ that is reflexive, antisymmetric, and transitive: for all $a, b, c \in P$,
$$a \le a,\qquad (a \le b \wedge b \le a) \Rightarrow a = b,\qquad (a \le b \wedge b \le c) \Rightarrow a \le c.$$
The pair $(P, \le)$ is a **poset**. Elements $a, b$ are **comparable** if $a \le b$ or $b \le a$, and **incomparable** otherwise. The associated **strict order** is $a < b :\Leftrightarrow (a \le b \wedge a \ne b)$, which is irreflexive and transitive.`,
  },
  {
    id: 'total-order',
    label: 'Total Order',
    title: 'Total (Linear) Order',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['partial-order'],
    description: String.raw`A **total** (or **linear**) **order** is a partial order with no incomparabilities at all: any two elements can be lined up. Every pair lies on a single line, as in $\mathbb{Z}$, $\mathbb{Q}$, and $\mathbb{R}$ with their usual ordering. Totality is the extra axiom separating a "line" from a general "diagram" of an order.`,
    definition: String.raw`A **total** (or **linear**) **order** on $P$ is a partial order $\le$ in which any two elements are comparable:
$$\forall a\,\forall b\,(a \le b \;\vee\; b \le a).$$
Equivalently (the **law of trichotomy**), for all $a, b$ exactly one of $a < b$, $a = b$, $b < a$ holds.`,
    proof: String.raw`We verify the equivalence with trichotomy, since both formulations are used freely. Assume $\le$ is total. Given $a, b$, totality yields $a \le b$ or $b \le a$. If $a = b$ then neither $a < b$ nor $b < a$ holds, giving the middle case alone. If $a \ne b$ then from (say) $a \le b$ we get $a < b$; and $b < a$ would give $b \le a$, whence antisymmetry forces $a = b$, a contradiction — so exactly one of $a<b$, $b<a$ holds. Conversely, if trichotomy holds then for any $a,b$ one of $a<b$, $a=b$, $b<a$ holds, and each implies $a \le b$ or $b \le a$; so $\le$ is total. $\square$`,
  },

  // ── Bounds, suprema, infima ─────────────────────────────────────────────────
  {
    id: 'supremum',
    label: 'Supremum',
    title: 'Supremum (Least Upper Bound)',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['partial-order'],
    description: String.raw`An **upper bound** of a subset $S$ is an element above everything in $S$; the **supremum** is the *least* such bound — the tightest ceiling. Dually the **infimum** is the greatest lower bound, the tightest floor. These two operations are the heart of order theory: completeness of $\mathbb{R}$, lattices, and fixed-point theorems are all phrased through them. When a supremum exists it is unique, so the notation $\sup S$ is unambiguous.`,
    definition: String.raw`Let $S \subseteq P$ in a poset $(P, \le)$. An **upper bound** of $S$ is a $u \in P$ with $s \le u$ for all $s \in S$. The **supremum** $\sup S$ is the least upper bound:
$$u = \sup S \;\Longleftrightarrow\; \bigl(\forall s \in S\; s \le u\bigr) \wedge \bigl(\forall v \in P\,[(\forall s \in S\; s \le v) \rightarrow u \le v]\bigr).$$
Dually, a **lower bound** of $S$ is an $\ell$ with $\ell \le s$ for all $s \in S$, and the **infimum** $\inf S$ is the greatest lower bound.`,
    proof: String.raw`**Uniqueness.** Suppose $u$ and $u'$ are both suprema of $S$. Each is an upper bound, and each is below every upper bound. So $u \le u'$ (since $u$ is least and $u'$ is an upper bound) and $u' \le u$ (symmetrically); antisymmetry of the partial order gives $u = u'$. The same argument, dualized, shows $\inf S$ is unique when it exists. $\square$`,
  },
  {
    id: 'monotone-map',
    label: 'Monotone Map',
    title: 'Monotone (Order-Preserving) Map',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['partial-order'],
    description: String.raw`A **monotone** (order-preserving) map is the natural notion of a structure-respecting function between posets: it never flips the order, sending smaller inputs to no-larger outputs. Monotone self-maps are exactly the maps whose iteration cannot un-do progress, which is why they admit fixed points (Knaster–Tarski). Note that monotone is weaker than an order *embedding*: it need not reflect the order nor be injective.`,
    definition: String.raw`A map $f : (P, \le_P) \to (Q, \le_Q)$ between posets is **monotone** (order-preserving) if
$$a \le_P b \;\Longrightarrow\; f(a) \le_Q f(b)\qquad (a, b \in P).$$
It is **order-reflecting** if the converse implication also holds, and an **order embedding** if both hold (equivalently $a \le_P b \Leftrightarrow f(a) \le_Q f(b)$, which forces injectivity).`,
  },

  // ── Lattices ────────────────────────────────────────────────────────────────
  {
    id: 'lattice',
    label: 'Lattice',
    title: 'Lattice',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['supremum'],
    description: String.raw`A **lattice** is a poset where any *two* elements have both a least upper bound and a greatest lower bound — a meet $\wedge$ and a join $\vee$. The power set under inclusion (with $\cap$, $\cup$), the divisors of an integer (with $\gcd$, $\mathrm{lcm}$), and the subspaces of a vector space are lattices. Finite non-empty subsets then automatically have meets and joins by induction; the genuinely stronger demand of having *all* suprema, including infinite ones, defines a *complete* lattice.`,
    definition: String.raw`A **lattice** is a poset $(L, \le)$ in which every two-element subset $\{a, b\}$ has a supremum and an infimum, written
$$a \vee b := \sup\{a, b\}\ (\text{the **join**}),\qquad a \wedge b := \inf\{a, b\}\ (\text{the **meet**}).$$
By induction, every non-empty finite subset then has a supremum and an infimum.`,
    proof: String.raw`We justify the closing claim that finite meets/joins exist. We show by induction on $n \ge 1$ that every $\{a_1, \dots, a_n\} \subseteq L$ has a supremum. For $n = 1$, $\sup\{a_1\} = a_1$ since $a_1$ is an upper bound of $\{a_1\}$ and lies below every upper bound. Assume $s = \sup\{a_1, \dots, a_n\}$ exists. Put $t = s \vee a_{n+1}$, which exists by the lattice axiom. Then $t \ge s \ge a_i$ for $i \le n$ and $t \ge a_{n+1}$, so $t$ is an upper bound of $\{a_1, \dots, a_{n+1}\}$. If $v$ is any upper bound of that set, then $v$ bounds $\{a_1, \dots, a_n\}$, so $v \ge s$; and $v \ge a_{n+1}$; hence $v \ge s \vee a_{n+1} = t$. Thus $t = \sup\{a_1, \dots, a_{n+1}\}$. The infimum case is dual. $\square$`,
  },
  {
    id: 'complete-lattice',
    label: 'Complete Lattice',
    title: 'Complete Lattice',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['lattice', 'supremum'],
    description: String.raw`A **complete lattice** strengthens "lattice" to require that *every* subset — finite or infinite, including the empty set — has a supremum and an infimum. The power set $\mathcal{P}(X)$ under $\subseteq$ is the prototype: any family of subsets has its union as supremum and intersection as infimum. Completeness automatically supplies a least element $\bot = \sup\varnothing$ and a greatest element $\top = \inf\varnothing$, and it is exactly the hypothesis under which order-preserving maps are guaranteed fixed points.`,
    definition: String.raw`A **complete lattice** is a poset $(L, \le)$ in which *every* subset $S \subseteq L$ (including $S = \varnothing$ and $S = L$) has a supremum $\sup S \in L$ and an infimum $\inf S \in L$. In particular $L$ has a greatest element $\top = \sup L = \inf\varnothing$ and a least element $\bot = \inf L = \sup\varnothing$.`,
    proof: String.raw`We check the bookkeeping about $\top$ and $\bot$, since it is used in later proofs. Every $x \in L$ satisfies $x \le \sup L$ (as $\sup L$ bounds all of $L$), so $\sup L$ is a greatest element $\top$. Vacuously every $x \in L$ is a lower bound of $\varnothing$ (there is no $s \in \varnothing$ to violate $x \le s$), so the set of lower bounds of $\varnothing$ is all of $L$; its greatest element is $\top$, hence $\inf\varnothing = \top$. Dually, every $x \in L$ is vacuously an upper bound of $\varnothing$, so the least upper bound is the least element of $L$, giving $\sup\varnothing = \bot$; likewise $\inf L = \bot$. $\square$`,
  },
  {
    id: 'sup-iff-inf-complete',
    label: 'Sups ⟹ Infs',
    title: 'All Suprema Suffice for Completeness',
    kind: 'proposition',
    tags: ['Order Theory'],
    dependencies: ['complete-lattice', 'supremum'],
    description: String.raw`Completeness is overdetermined: if a poset has *all* suprema, it automatically has all infima (and vice versa). The infimum of a set $S$ is recovered as the supremum of $S$'s lower bounds. This is what lets one verify a structure is a complete lattice by checking only one of the two operations — a labour-saving device used constantly, and the reason $\mathcal{P}(X)$ with arbitrary unions is immediately a complete lattice.`,
    statement: String.raw`Let $(P, \le)$ be a poset in which every subset has a supremum. Then every subset $S \subseteq P$ also has an infimum, namely
$$\inf S = \sup\{\ell \in P : \ell \text{ is a lower bound of } S\}.$$
Hence $P$ is a complete lattice. (Dually, all infima existing implies all suprema exist.)`,
    proof: String.raw`Let $S \subseteq P$ and let $L = \{\ell \in P : \forall s \in S\ \ell \le s\}$ be its set of lower bounds. By hypothesis $m := \sup L$ exists; we show $m = \inf S$.

*$m$ is a lower bound of $S$.* Fix $s \in S$. Every $\ell \in L$ satisfies $\ell \le s$, so $s$ is an upper bound of $L$. As $m = \sup L$ is the *least* upper bound, $m \le s$. Since $s \in S$ was arbitrary, $m$ is a lower bound of $S$, i.e. $m \in L$.

*$m$ is the greatest lower bound.* If $\ell$ is any lower bound of $S$ then $\ell \in L$, so $\ell \le \sup L = m$. Thus $m$ exceeds every lower bound, so $m = \inf S$.

This holds for every $S$, including $S = \varnothing$ and $S = P$, so by the definition of completeness $P$ is a complete lattice. The dual statement follows by reversing the order. $\square$`,
  },

  // ── The Knaster–Tarski theorem ──────────────────────────────────────────────
  {
    id: 'knaster-tarski',
    label: 'Knaster–Tarski',
    title: 'Knaster–Tarski Fixed-Point Theorem',
    kind: 'theorem',
    tags: ['Order Theory'],
    dependencies: ['complete-lattice', 'monotone-map', 'supremum', 'sup-iff-inf-complete'],
    description: String.raw`A monotone (order-preserving) self-map of a complete lattice always has a fixed point — in fact a *least* and a *greatest* one, and the whole set of fixed points is itself a complete lattice. Crucially the proof needs no continuity and no iteration to a limit; it reads the least fixed point off directly as an infimum. This is the bedrock of recursive definitions and denotational semantics (least fixed points of program functionals), and it yields a clean proof of Cantor–Schröder–Bernstein. The least pre-fixed point is the engine: $\mathrm{lfp}(f) = \inf\{x : f(x) \le x\}$.`,
    statement: String.raw`Let $(L, \le)$ be a complete lattice and $f : L \to L$ monotone. Then:
$$(\mathrm{i})\ \ f \text{ has a least fixed point } \mu = \inf\{x \in L : f(x) \le x\} \text{ and a greatest fixed point } \nu = \sup\{x \in L : x \le f(x)\};$$
$$(\mathrm{ii})\ \ \text{the set } \mathrm{Fix}(f) = \{x \in L : f(x) = x\} \text{ is itself a complete lattice under } \le.$$`,
    proof: String.raw`Call $x$ a **pre-fixed point** if $f(x) \le x$ and a **post-fixed point** if $x \le f(x)$. Let $A = \{x : f(x) \le x\}$ be the set of pre-fixed points; it is non-empty, since $\top \in A$ (indeed $f(\top) \le \top$ as $\top$ is greatest).

**(i) Least fixed point.** Since $L$ is complete, $\mu := \inf A$ exists. We show $f(\mu) = \mu$.

Let $x \in A$ be arbitrary. Then $\mu \le x$ (as $\mu$ is a lower bound of $A$), so by monotonicity $f(\mu) \le f(x) \le x$, the last step because $x \in A$. Thus $f(\mu)$ is a lower bound of $A$, and since $\mu = \inf A$ is the *greatest* lower bound,
$$f(\mu) \le \mu. \tag{1}$$
So $\mu \in A$. Applying $f$ to $(1)$ and using monotonicity gives $f(f(\mu)) \le f(\mu)$, i.e. $f(\mu) \in A$. Hence $\mu \le f(\mu)$ (as $\mu$ is a lower bound of $A$ and $f(\mu) \in A$). With $(1)$ and antisymmetry, $f(\mu) = \mu$. Finally $\mu$ is the *least* fixed point: any fixed point $y$ satisfies $f(y) = y \le y$, so $y \in A$, hence $\mu \le y$. The greatest fixed point $\nu = \sup\{x : x \le f(x)\}$ is obtained by the dual argument in the order-reversed lattice (infima existing there because all suprema do, by the proposition that all suprema force all infima).

**(ii) $\mathrm{Fix}(f)$ is a complete lattice.** Fix any $S \subseteq \mathrm{Fix}(f)$; we produce $\sup_{\mathrm{Fix}} S$, the supremum *taken within* $\mathrm{Fix}(f)$. Let $a = \sup_L S$ be its supremum in $L$. Consider the **up-set** $L_{\ge a} = \{x \in L : a \le x\}$.

*$f$ restricts to $L_{\ge a}$.* For each $s \in S$ we have $s \le a$, so $s = f(s) \le f(a)$ by monotonicity; taking the supremum over $s \in S$ gives $a = \sup_L S \le f(a)$. Hence for any $x \ge a$, monotonicity gives $f(x) \ge f(a) \ge a$, so $f(x) \in L_{\ge a}$.

*$L_{\ge a}$ is a complete lattice.* It is non-empty ($\top \ge a$). Take any $T \subseteq L_{\ge a}$. Its supremum *within* $L_{\ge a}$ is $a \vee \sup_L T$: for $T \ne \varnothing$ each element of $T$ is $\ge a$, so $\sup_L T \ge a$ and $a \vee \sup_L T = \sup_L T \in L_{\ge a}$ is the least upper bound of $T$ that also dominates $a$; for $T = \varnothing$ the $L$-supremum is $\bot$, which need not lie in $L_{\ge a}$, but $a \vee \bot = a$ is the least element of $L_{\ge a}$ and hence the supremum of $\varnothing$ taken within $L_{\ge a}$. Dually its infimum within $L_{\ge a}$ is $a \vee \inf_L T$, which exists and is $\ge a$. So every subset of $L_{\ge a}$ has a supremum and infimum within $L_{\ge a}$; thus $L_{\ge a}$ is a complete lattice and $f$ maps it monotonically to itself.

By part (i) applied to $f$ on $L_{\ge a}$, this restricted map has a *least* fixed point $m \in L_{\ge a}$. Then $m \in \mathrm{Fix}(f)$ and $m \ge a \ge s$ for every $s \in S$, so $m$ is an upper bound of $S$ inside $\mathrm{Fix}(f)$. If $z \in \mathrm{Fix}(f)$ is any upper bound of $S$, then $z \ge \sup_L S = a$, so $z \in L_{\ge a}$ is a fixed point of $f$ in $L_{\ge a}$; minimality of $m$ there gives $m \le z$. Thus $m = \sup_{\mathrm{Fix}} S$. As $S$ was arbitrary, $\mathrm{Fix}(f)$ has all suprema, so by the proposition that all suprema suffice for completeness it is a complete lattice. $\square$`,
  },
  {
    id: 'csb-via-knaster-tarski',
    label: 'CSB via Fixed Points',
    title: 'Schröder–Bernstein from Knaster–Tarski',
    kind: 'corollary',
    tags: ['Order Theory', 'Set Theory'],
    dependencies: ['knaster-tarski', 'cantor-schroder-bernstein', 'power-set', 'injection', 'bijection'],
    description: String.raw`The Cantor–Schröder–Bernstein theorem — two mutual injections yield a bijection — drops out of Knaster–Tarski almost for free. The trick is to find a single subset $C$ that the two injections "cut" the sets along, and such a $C$ is precisely a fixed point of a monotone operator on the power-set lattice. This re-derives a major set-theory result purely from the order-theoretic fixed-point machinery, illustrating its reach. Like the classical proof, it uses no axiom of choice.`,
    statement: String.raw`If there exist injections $f : A \to B$ and $g : B \to A$, then there is a bijection $A \to B$.`,
    proof: String.raw`The power set $(\mathcal{P}(A), \subseteq)$ is a complete lattice: any family of subsets has its union as supremum and its intersection as infimum. Define $\Phi : \mathcal{P}(A) \to \mathcal{P}(A)$ by
$$\Phi(S) = A \setminus g\bigl[\, B \setminus f[S] \,\bigr].$$
$\Phi$ is **monotone**: if $S \subseteq T$ then $f[S] \subseteq f[T]$, hence $B \setminus f[T] \subseteq B \setminus f[S]$, hence $g[B \setminus f[T]] \subseteq g[B \setminus f[S]]$, and taking complements in $A$ flips this back to $\Phi(S) \subseteq \Phi(T)$.

By **Knaster–Tarski** $\Phi$ has a fixed point $C = \Phi(C)$, i.e.
$$A \setminus C = g\bigl[\, B \setminus f[C] \,\bigr].$$
Define $h : A \to B$ by $h(a) = f(a)$ for $a \in C$ and $h(a) = g^{-1}(a)$ for $a \in A \setminus C$ — the latter is well-defined and injective because $A \setminus C \subseteq \operatorname{ran} g$ and $g$ is injective. On $C$, $h = f$ is injective with image $f[C]$; on $A \setminus C$, $h = g^{-1}$ is injective with image $B \setminus f[C]$, since $A \setminus C = g[B \setminus f[C]]$. As $\{f[C], B \setminus f[C]\}$ partitions $B$ and $\{C, A \setminus C\}$ partitions $A$, $h$ is a bijection. This is exactly the statement of **Cantor–Schröder–Bernstein**, now obtained as a fixed point. $\square$`,
  },
]
