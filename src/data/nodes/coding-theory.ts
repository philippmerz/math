import type { MathNode } from '../types'

export const CODING_THEORY_NODES: MathNode[] = [
  // ── Codes, distance, error correction ────────────────────────────────────────
  {
    id: 'block-code',
    label: 'Block Code',
    title: 'Block Code',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['error-correcting-code'],
    description: String.raw`Communication over a noisy channel splits the data into fixed-length blocks and transmits each as a string of $n$ symbols from a fixed alphabet. The legal transmissions — the **codewords** — form a chosen subset of all $|\mathcal{A}|^n$ strings; the gap between $|\mathcal{A}|^n$ and the number of codewords is the redundancy a decoder exploits to undo corruption. Two numbers summarise a code: how long its blocks are ($n$) and how many messages it carries ($M$), combined in the *rate* $\tfrac{\log_{|\mathcal{A}|} M}{n}$, the fraction of each block that is genuine information. This is the concrete object the noisy-channel coding theorem promises must exist with good parameters.`,
    definition: String.raw`Fix a finite alphabet $\mathcal{A}$ with $q = |\mathcal{A}| \ge 2$ and a block length $n \ge 1$. A **block code** of length $n$ over $\mathcal{A}$ is a nonempty subset $C \subseteq \mathcal{A}^n$; its elements are **codewords** and $M := |C|$ is its **size**. The **rate** is $R := \tfrac{1}{n}\log_q M \in [0, 1]$, the number of message symbols carried per transmitted symbol (the endpoints occur for a single codeword, $M = 1$, where $R = 0$, and for $C = \mathcal{A}^n$, $M = q^n$, where $R = 1$). An **encoder** is an injection from a message set of size $M$ onto $C$; a **decoder** is a map $\mathcal{A}^n \to C$ (or to $C \cup \{\text{fail}\}$) that assigns to each received word a codeword. A code is **$q$-ary** ($q = 2$: **binary**), and one writes its parameters as an $(n, M)_q$ code.`,
  },
  {
    id: 'hamming-distance',
    label: 'Hamming Distance',
    title: 'Hamming Distance & Weight',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'metric-space'],
    description: String.raw`To measure how badly the channel mangled a word, count the symbols it changed. The **Hamming distance** between two strings of equal length is the number of positions where they disagree; a channel that flips $t$ symbols moves a codeword to a word at distance exactly $t$. This count behaves like a genuine geometry — it is symmetric, vanishes only for identical words, and satisfies the triangle inequality — so $\mathcal{A}^n$ becomes a metric space and decoding becomes the problem of finding the nearest codeword. Over an alphabet with a zero symbol, the **weight** of a word is its distance from the all-zero word: the number of nonzero entries.`,
    definition: String.raw`For $u, v \in \mathcal{A}^n$ the **Hamming distance** is
$$d(u, v) := \bigl|\{\, i \in \{1, \dots, n\} : u_i \neq v_i \,\}\bigr|,$$
the number of coordinates in which $u$ and $v$ differ. When $\mathcal{A}$ contains a distinguished symbol $0$, the **Hamming weight** of $u$ is $\operatorname{wt}(u) := d(u, \mathbf{0}) = |\{\, i : u_i \neq 0 \,\}|$, the count of nonzero coordinates. The function $d$ is a **metric** on $\mathcal{A}^n$.`,
    proof: String.raw`We verify $d$ is a **metric** on $\mathcal{A}^n$. Writing $\delta(a, b) = 0$ if $a = b$ and $1$ otherwise (the discrete metric on $\mathcal{A}$), one has $d(u, v) = \sum_{i=1}^n \delta(u_i, v_i)$. *Non-negativity and identity:* each $\delta(u_i, v_i) \ge 0$, so $d \ge 0$, and $d(u, v) = 0$ iff every $\delta(u_i, v_i) = 0$, i.e. $u_i = v_i$ for all $i$, i.e. $u = v$. *Symmetry:* $\delta(u_i, v_i) = \delta(v_i, u_i)$ coordinatewise, so $d(u, v) = d(v, u)$. *Triangle inequality:* the discrete metric satisfies $\delta(a, c) \le \delta(a, b) + \delta(b, c)$ (if $a \neq c$ then $b$ differs from at least one of $a, c$, so the right side is $\ge 1$), and summing this over $i$ gives $d(u, w) \le d(u, v) + d(v, w)$. Thus $(\mathcal{A}^n, d)$ is a **metric space**. $\square$`,
  },
  {
    id: 'minimum-distance',
    label: 'Minimum Distance',
    title: 'Minimum Distance',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'hamming-distance'],
    description: String.raw`A code's power to resist noise is governed by a single number: how close its two nearest codewords come. If every pair of codewords differs in many positions, then the channel must introduce many errors before one codeword can be mistaken for another. This closest-pair distance, the **minimum distance** $d$, is therefore the central design parameter — it alone determines how many errors the code can detect and correct. Codes are catalogued by the triple $(n, M, d)$.`,
    definition: String.raw`The **minimum distance** of a block code $C$ with $|C| \ge 2$ is
$$d(C) := \min_{\substack{u, v \in C \\ u \neq v}} d(u, v),$$
the least **Hamming distance** between two distinct codewords. A code of length $n$, size $M$, and minimum distance $d$ is called an **$(n, M, d)_q$ code**. (For a one-codeword code one sets $d := \infty$ or leaves it undefined.) The quantity $d - 1$ is the largest number of symbol changes after which a corrupted codeword is still detectably non-codeword.`,
  },
  {
    id: 'error-correction-radius',
    label: 'Error-Correction Radius',
    title: 'Error Detection & Correction Radius',
    kind: 'theorem',
    tags: ['Coding Theory'],
    dependencies: ['minimum-distance', 'hamming-distance'],
    description: String.raw`The minimum distance translates directly into guarantees. Picture each codeword surrounded by a Hamming ball of radius $t$; if these balls do not overlap, a received word inside one ball can only have come from its centre, so nearest-codeword decoding repairs up to $t$ errors. The balls of radius $t = \lfloor (d-1)/2 \rfloor$ are exactly the largest ones that stay disjoint, which is why a minimum-distance-$d$ code corrects that many errors and detects up to $d - 1$. This is the bridge from the static parameter $d$ to the dynamic promise of reliable decoding.`,
    statement: String.raw`Let $C$ be a block code with minimum distance $d$, and set $t := \lfloor (d-1)/2 \rfloor$. Then: **(detection)** if a codeword is corrupted in at most $d - 1$ positions, the result is never another codeword, so any pattern of up to $d - 1$ errors is detected; and **(correction)** nearest-codeword decoding recovers the transmitted codeword from any received word containing at most $t$ errors. Moreover $t$ is the largest radius with this guarantee: the closed Hamming balls $B_t(c) = \{\, y : d(y, c) \le t \,\}$ about distinct codewords are pairwise disjoint.`,
    proof: String.raw`*Detection.* Suppose a codeword $c$ is corrupted to $y$ with $1 \le d(c, y) \le d - 1$. If $y$ were a codeword $c' \neq c$, then $d(c, c') = d(c, y) \le d - 1 < d$, contradicting that the **minimum distance** of $C$ is $d$. Hence $y \notin C$ and the corruption is detected.

*Balls are disjoint.* Let $c \neq c'$ be codewords and suppose some $y \in B_t(c) \cap B_t(c')$. By the triangle inequality for the **Hamming distance**,
$$d \le d(c, c') \le d(c, y) + d(y, c') \le t + t = 2\Bigl\lfloor \tfrac{d-1}{2}\Bigr\rfloor \le d - 1,$$
a contradiction. So the balls of radius $t$ about distinct codewords are disjoint.

*Correction.* Let $c$ be transmitted and $y$ received with $d(c, y) \le t$, so $y \in B_t(c)$. For any other codeword $c'$, disjointness of the balls gives $y \notin B_t(c')$, i.e. $d(c', y) > t \ge d(c, y)$. Thus $c$ is the unique codeword nearest to $y$, and nearest-codeword decoding returns $c$, correcting the (at most $t$) errors.

*Optimality of $t$ (both parities).* We show no radius larger than $t$ admits a universal correction guarantee. Choose codewords $c, c'$ at distance exactly $d$ (a closest pair realizing the minimum distance), and build a word $y$ that agrees with both $c$ and $c'$ on the $n - d$ coordinates where they already agree; on the $d$ coordinates where they differ, let $y$ match $c$ on exactly $\lceil d/2\rceil$ of them and $c'$ on the remaining $\lfloor d/2\rfloor$. Then $d(c, y) = \lfloor d/2\rfloor$ (the coordinates where $y$ instead matches $c'$) and $d(c', y) = \lceil d/2\rceil = t + 1$. Now suppose $c'$ is transmitted and the channel produces $y$, an error pattern of weight $d(c', y) = t + 1$. Since $d(c, y) = \lfloor d/2\rfloor \le \lceil d/2\rceil = d(c', y)$, the word $c$ is at least as close to $y$ as the transmitted $c'$, so nearest-codeword decoding may return $c \neq c'$: correction of $t + 1$ errors fails. (When $d$ is even, $\lfloor d/2\rfloor = \lceil d/2\rceil = t + 1$ and $y$ is equidistant from $c, c'$; when $d$ is odd, $\lfloor d/2\rfloor = t < t + 1 = \lceil d/2\rceil$ and $c$ is strictly closer, so decoding outright misdecodes.) Either way some pattern of $t + 1$ errors is uncorrectable, so $t$ is the largest universally correctable radius. $\square$`,
  },

  // ── Linear codes ─────────────────────────────────────────────────────────────
  {
    id: 'linear-code',
    label: 'Linear Code',
    title: 'Linear Code',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'minimum-distance', 'vector-space', 'subspace', 'field'],
    description: String.raw`The codes used in practice are not arbitrary subsets but *subspaces*: take the alphabet to be a finite field $\mathbb{F}_q$ (the fields of prime-power order, written $\mathbb{F}_q$ or $\mathrm{GF}(q)$, exist and are unique for each $q = p^m$ — a standard fact of field theory we cite by name), and require the code to be closed under addition and scalar multiplication. The payoff is decisive: a $k$-dimensional code has exactly $q^k$ codewords yet is specified by only $k$ basis vectors, encoding becomes a single matrix multiplication, and — as the next result shows — the minimum distance reduces from a comparison over all $\binom{q^k}{2}$ pairs to the much cheaper search for the lightest nonzero codeword. Almost all codes of engineering importance are linear.`,
    definition: String.raw`Let $\mathbb{F}_q$ be the finite **field** with $q$ elements. A **linear code** of length $n$ over $\mathbb{F}_q$ is a **subspace** $C \subseteq \mathbb{F}_q^n$ of the **vector space** $\mathbb{F}_q^n$. If $\dim_{\mathbb{F}_q} C = k$ then $|C| = q^k$, so $C$ is in particular a **block code** of size $M = q^k$; with **minimum distance** $d$ it is called a **linear $[n, k, d]_q$ code**, and its **rate** is $R = k/n$. The all-zero word $\mathbf{0}$ is always a codeword, and the difference of two codewords is again a codeword.`,
  },
  {
    id: 'linear-code-distance-weight',
    label: 'Distance = Min Weight',
    title: 'Minimum Distance of a Linear Code',
    kind: 'proposition',
    tags: ['Coding Theory'],
    dependencies: ['linear-code', 'hamming-distance', 'minimum-distance'],
    description: String.raw`Linearity collapses the minimum-distance computation. Because the codewords form a subspace, the distance between two of them is the weight of their difference — itself a codeword. So the closest pair of codewords is governed not by all pairs but by the single lightest nonzero codeword: the minimum distance equals the minimum nonzero Hamming weight. This is the first concrete dividend of insisting on linear structure, and it makes the minimum distance computable and, via the parity-check matrix, characterizable.`,
    statement: String.raw`For a **linear code** $C \subseteq \mathbb{F}_q^n$ with $|C| \ge 2$,
$$d(C) = \min_{\substack{c \in C \\ c \neq \mathbf{0}}} \operatorname{wt}(c),$$
the **minimum distance** equals the least **Hamming weight** of a nonzero codeword.`,
    proof: String.raw`For any $u, v \in \mathbb{F}_q^n$ the distance is the weight of the difference: $u$ and $v$ differ in coordinate $i$ exactly when $(u - v)_i \neq 0$, so $d(u, v) = \operatorname{wt}(u - v)$ by the definitions in **hamming-distance**.

($\le$) Let $c \neq \mathbf{0}$ achieve the minimum weight $w$. Since $C$ is a **linear code** (a subspace), $\mathbf{0} \in C$, and $c \neq \mathbf{0}$, so $c$ and $\mathbf{0}$ are two distinct codewords with $d(c, \mathbf{0}) = \operatorname{wt}(c) = w$. Hence the **minimum distance** $d(C) \le w$.

($\ge$) Let $u \neq v$ in $C$ achieve $d(C) = d(u, v)$. By closure of the subspace under subtraction, $c := u - v \in C$, and $c \neq \mathbf{0}$ since $u \neq v$; moreover $\operatorname{wt}(c) = d(u, v) = d(C)$. Thus some nonzero codeword has weight $d(C)$, so the minimum nonzero weight is $\le d(C)$.

Combining the two inequalities gives equality. $\square$`,
  },
  {
    id: 'generator-matrix',
    label: 'Generator Matrix',
    title: 'Generator Matrix',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['linear-code', 'matrix', 'basis', 'kernel-image'],
    description: String.raw`Choosing a basis for a linear code turns encoding into a matrix product. Stack $k$ basis codewords as the rows of a $k \times n$ matrix $G$; then every codeword is a linear combination of the rows, so the code is exactly the row space of $G$, and a message vector $m \in \mathbb{F}_q^k$ is encoded as $mG$. When $G$ is put in *standard form* $[\,I_k \mid A\,]$, the first $k$ symbols of each codeword are the raw message and the remaining $n - k$ are check symbols — a *systematic* encoder that lets the receiver read off the message directly when no errors occur.`,
    definition: String.raw`A **generator matrix** of a linear $[n, k]_q$ code $C$ is a $k \times n$ **matrix** $G$ over $\mathbb{F}_q$ whose rows form a **basis** of $C$. The encoder $m \mapsto mG$ (row vector times matrix) is then an isomorphism $\mathbb{F}_q^k \xrightarrow{\sim} C$, so $C = \{\, mG : m \in \mathbb{F}_q^k \,\}$ is the row space of $G$ — equivalently the **image** of the linear map $m \mapsto mG$. A generator matrix is in **standard (systematic) form** if $G = [\,I_k \mid A\,]$ with $I_k$ the $k \times k$ identity and $A \in \mathbb{F}_q^{k \times (n-k)}$; then in $mG = (m, mA)$ the message $m$ appears verbatim in the first $k$ coordinates.`,
    proof: String.raw`The encoder is a well-defined linear isomorphism onto $C$. The map $E : \mathbb{F}_q^k \to \mathbb{F}_q^n$, $E(m) = mG = \sum_{i=1}^k m_i g_i$ (with $g_i$ the rows of $G$), is linear, and its **image** is the span of the rows, which is $C$ since the rows are a **basis** of $C$. It is injective: if $mG = \mathbf{0}$ then $\sum_i m_i g_i = \mathbf{0}$, and linear independence of the basis rows forces $m = \mathbf{0}$, so $\ker E = \{\mathbf{0}\}$ and, by **kernel-image**, $E$ is injective. Being a linear injection onto $C$, $E$ is an isomorphism $\mathbb{F}_q^k \cong C$; in particular $|C| = q^k$. For the standard form, $mG = m[\,I_k \mid A\,] = (mI_k, mA) = (m, mA)$, exhibiting $m$ in the first $k$ coordinates. $\square$`,
  },
  {
    id: 'parity-check-matrix',
    label: 'Parity-Check Matrix',
    title: 'Parity-Check Matrix',
    kind: 'definition',
    tags: ['Coding Theory'],
    dependencies: ['linear-code', 'generator-matrix', 'kernel-image', 'rank-nullity'],
    description: String.raw`A subspace can be described two ways: by what spans it (a generator matrix) or by the linear equations its members satisfy (a parity-check matrix). The **parity-check matrix** $H$ is the second description — a codeword is exactly a vector annihilated by $H$, so $C = \ker H^{\mathsf T}$ is the set of solutions to the homogeneous system $Hx^{\mathsf T} = \mathbf{0}$. This dual viewpoint is what powers decoding: applying $H$ to a received word produces its *syndrome*, which depends only on the error pattern and not on which codeword was sent. From a systematic generator $[\,I_k \mid A\,]$ one reads off $H = [\,-A^{\mathsf T} \mid I_{n-k}\,]$.`,
    definition: String.raw`A **parity-check matrix** of a linear $[n, k]_q$ code $C$ is an $(n - k) \times n$ **matrix** $H$ over $\mathbb{F}_q$ of rank $n - k$ with
$$C = \{\, x \in \mathbb{F}_q^n : H x^{\mathsf T} = \mathbf{0} \,\},$$
so $C$ is the **kernel** (null space) of $x \mapsto Hx^{\mathsf T}$. If $C$ has a systematic **generator matrix** $G = [\,I_k \mid A\,]$, then $H = [\,-A^{\mathsf T} \mid I_{n-k}\,]$ is a parity-check matrix. The **syndrome** of a word $y \in \mathbb{F}_q^n$ is $s(y) := H y^{\mathsf T} \in \mathbb{F}_q^{\,n-k}$, which is $\mathbf{0}$ exactly for codewords.`,
    proof: String.raw`*$GH^{\mathsf T} = 0$ and dimension count.* With $G = [\,I_k \mid A\,]$ and $H = [\,-A^{\mathsf T} \mid I_{n-k}\,]$,
$$G H^{\mathsf T} = [\,I_k \mid A\,]\begin{bmatrix} -A \\ I_{n-k}\end{bmatrix} = -A + A = 0,$$
so every row of $G$ — hence every codeword $mG$ — satisfies $H(mG)^{\mathsf T} = (mGH^{\mathsf T})^{\mathsf T} = \mathbf{0}$; thus $C \subseteq \ker(x \mapsto Hx^{\mathsf T})$. The matrix $H$ has rank $n - k$ because its last $n - k$ columns are $I_{n-k}$, so the map $x \mapsto Hx^{\mathsf T}$ has **image** of dimension $n - k$; by **rank-nullity** its kernel has dimension $n - (n - k) = k = \dim C$. A $k$-dimensional subspace contained in a $k$-dimensional subspace is equal to it, so $C = \ker(x \mapsto Hx^{\mathsf T})$, and the displayed solution set equals $C$. Finally $s(y) = Hy^{\mathsf T} = \mathbf{0}$ iff $y \in C$, by this very description. $\square$`,
  },
  {
    id: 'parity-check-distance',
    label: 'Distance via Columns',
    title: 'Minimum Distance from the Parity-Check Matrix',
    kind: 'proposition',
    tags: ['Coding Theory'],
    dependencies: ['parity-check-matrix', 'linear-code-distance-weight'],
    description: String.raw`The parity-check matrix reads off the minimum distance from the geometry of its columns. A nonzero codeword of weight $w$ is precisely a nontrivial linear dependence among $w$ of the columns of $H$. So the lightest nonzero codeword corresponds to the smallest set of linearly dependent columns: the minimum distance equals the least number of columns of $H$ that are linearly dependent. This turns a design goal ("achieve distance $d$") into a concrete matrix condition ("every $d - 1$ columns are independent"), the recipe used to construct Hamming and other codes.`,
    statement: String.raw`Let $C$ be a linear $[n, k]_q$ code with **parity-check matrix** $H$, columns $h_1, \dots, h_n \in \mathbb{F}_q^{\,n-k}$. The **minimum distance** of $C$ equals the smallest number of columns of $H$ that are linearly dependent:
$$d(C) = \min\{\, w : \text{some } w \text{ distinct columns } h_{i_1}, \dots, h_{i_w} \text{ are linearly dependent} \,\}.$$
Equivalently, $d(C) \ge d$ iff every $d - 1$ columns of $H$ are linearly independent.`,
    proof: String.raw`For $x \in \mathbb{F}_q^n$ the syndrome is $Hx^{\mathsf T} = \sum_{i=1}^n x_i h_i$. Thus $x \in C$ (i.e. $Hx^{\mathsf T} = \mathbf{0}$) iff the columns of $H$ satisfy the dependence $\sum_i x_i h_i = \mathbf{0}$, and the nonzero entries of $x$ pick out which columns appear with nonzero coefficient. Hence a nonzero codeword of weight $w$ is exactly a nontrivial linear relation $\sum_{j=1}^w x_{i_j} h_{i_j} = \mathbf{0}$ (all $x_{i_j} \neq 0$) among $w$ distinct columns — that is, a set of $w$ linearly dependent columns. By **linear-code-distance-weight**, $d(C)$ is the minimum weight of a nonzero codeword, which is therefore the minimum size of a linearly dependent set of columns of $H$. The equivalent form is the contrapositive: every set of $d - 1$ columns is independent iff no nonzero codeword has weight $\le d - 1$, i.e. iff $d(C) \ge d$. $\square$`,
  },
  {
    id: 'syndrome-decoding',
    label: 'Syndrome Decoding',
    title: 'Syndrome Decoding',
    kind: 'proposition',
    tags: ['Coding Theory'],
    dependencies: ['parity-check-matrix', 'coset', 'hamming-distance', 'error-correction-radius'],
    description: String.raw`Linearity makes nearest-codeword decoding tractable. Write the received word as $y = c + e$, the sent codeword plus an error pattern. The syndrome $Hy^{\mathsf T} = He^{\mathsf T}$ ignores $c$ entirely — it depends only on the error — and two words share a syndrome exactly when they lie in the same additive coset of the code. So the receiver precomputes, for each of the $q^{n-k}$ syndromes, the lightest error pattern producing it (the *coset leader*); decoding then reduces to a table lookup keyed by the syndrome, vastly cheaper than comparing against all $q^k$ codewords. Within the correction radius this recovers the transmitted codeword exactly.`,
    statement: String.raw`Let $C$ be a linear $[n, k]_q$ code with **parity-check matrix** $H$. Two words $y, y' \in \mathbb{F}_q^n$ have the same **syndrome** $Hy^{\mathsf T} = H y'^{\mathsf T}$ if and only if they lie in the same **coset** $y + C$ of $C$. Choosing in each coset a minimum-weight representative (**coset leader**) $e$ and decoding $y \mapsto y - e$ realizes nearest-codeword decoding; in particular, if $y = c + e$ with $c \in C$ and $\operatorname{wt}(e) \le t = \lfloor (d(C)-1)/2 \rfloor$, the decoder returns $c$.`,
    proof: String.raw`*Syndromes index cosets.* By linearity of $x \mapsto Hx^{\mathsf T}$, $Hy^{\mathsf T} = Hy'^{\mathsf T}$ iff $H(y - y')^{\mathsf T} = \mathbf{0}$ iff $y - y' \in C$ (by **parity-check-matrix**) iff $y$ and $y'$ lie in the same additive **coset** $y + C$. So the syndrome is a faithful label of the cosets of $C$ in $(\mathbb{F}_q^n, +)$, and there are exactly $q^{n-k}$ of them (one per value of $H\cdot^{\mathsf T}$, whose image has dimension $n - k$).

*Coset-leader decoding is nearest-codeword decoding.* Fix $y$ and let $e$ be a minimum-weight element of the coset $y + C$. For any codeword $c \in C$, the word $y - c$ lies in the coset $y + C$ (since $-c \in C$), so by minimality $\operatorname{wt}(y - c) \ge \operatorname{wt}(e)$, i.e. $d(y, c) \ge \operatorname{wt}(e) = d(y, y - e)$ where $y - e \in C$. Hence the codeword $y - e$ is at least as close to $y$ as any other codeword: decoding $y \mapsto y - e$ outputs a nearest codeword.

*Correction within the radius.* Suppose $y = c + e$ with $c \in C$ and $\operatorname{wt}(e) \le t$. The error $e$ lies in the coset $y + C$ (as $e = y - c$); any other element $e'$ of that coset satisfies $e' - e \in C$, so if $e' \neq e$ then $e' - e$ is a nonzero codeword and $\operatorname{wt}(e') \ge d(C) - \operatorname{wt}(e) \ge d(C) - t > t$ by the triangle inequality for **hamming-distance** (since $\operatorname{wt}((e'-e)) \le \operatorname{wt}(e') + \operatorname{wt}(e)$ and $\operatorname{wt}(e'-e) \ge d(C)$). Thus $e$ is the unique minimum-weight coset leader, the decoder subtracts it, and returns $y - e = c$ — agreeing with the correction guarantee of **error-correction-radius**. $\square$`,
  },

  // ── Bounds ───────────────────────────────────────────────────────────────────
  {
    id: 'singleton-bound',
    label: 'Singleton Bound & MDS',
    title: 'Singleton Bound and MDS Codes',
    kind: 'theorem',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'minimum-distance', 'linear-code', 'rank-nullity'],
    description: String.raw`There is an unavoidable tension between a code's size and its distance: making codewords far apart forces there to be fewer of them. The **Singleton bound** quantifies it — for any $(n, M, d)_q$ code, $M \le q^{\,n - d + 1}$, equivalently $k \le n - d + 1$ in the linear case. The argument is a one-line projection: delete $d - 1$ coordinates and the codewords stay distinct, so they fit in $q^{n-d+1}$ strings. Codes meeting the bound with equality are **maximum distance separable (MDS)** — they pack the most distance into a given length and dimension, and the Reed–Solomon codes are the prime examples.`,
    statement: String.raw`Every $(n, M, d)_q$ **block code** satisfies the **Singleton bound**
$$M \le q^{\,n - d + 1}.$$
For a linear $[n, k, d]_q$ code this reads $k \le n - d + 1$, i.e. $d \le n - k + 1$. A code attaining equality ($d = n - k + 1$) is called **maximum distance separable (MDS)**.`,
    proof: String.raw`*General bound by projection.* Assume $d \ge 1$ and consider the map $\pi : \mathcal{A}^n \to \mathcal{A}^{n - d + 1}$ that deletes the last $d - 1$ coordinates. Restricted to the codewords, $\pi$ is **injective**: if $\pi(u) = \pi(v)$ for codewords $u \neq v$, then $u$ and $v$ agree on the first $n - d + 1$ coordinates, so they differ only among the last $d - 1$, giving $d(u, v) \le d - 1 < d$, contradicting that the **minimum distance** is $d$. An injection from $C$ into $\mathcal{A}^{n - d + 1}$ forces $M = |C| \le |\mathcal{A}|^{n - d + 1} = q^{n - d + 1}$.

*Linear form.* For a **linear code** $M = q^k$, so $q^k \le q^{n - d + 1}$ gives $k \le n - d + 1$, i.e. $d \le n - k + 1$. (Alternatively, a parity-check matrix $H$ has $n - k$ rows, so any $n - k + 1$ of its columns are linearly dependent; by the column criterion $d \le n - k + 1$.) An **MDS** code is one with $d = n - k + 1$. $\square$`,
  },
  {
    id: 'hamming-bound',
    label: 'Hamming Bound',
    title: 'Hamming (Sphere-Packing) Bound',
    kind: 'theorem',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'error-correction-radius', 'hamming-distance', 'binomial-coefficient'],
    description: String.raw`A $t$-error-correcting code surrounds each codeword with a disjoint Hamming ball of radius $t$, and all these balls live inside the ambient space of $q^n$ words. Counting gives an upper bound on how many codewords can fit: the number of codewords times the volume of one ball cannot exceed $q^n$. This is the **sphere-packing** (Hamming) bound. Codes that pack the balls perfectly — leaving no word uncovered — are called **perfect**; they are rare, and the Hamming codes are the classic infinite family achieving it.`,
    statement: String.raw`Let $C$ be an $(n, M, d)_q$ **block code** correcting $t = \lfloor (d-1)/2 \rfloor$ errors. Then
$$M \cdot \sum_{i=0}^{t} \binom{n}{i}(q - 1)^i \;\le\; q^n.$$
A code attaining equality is called **perfect**: the radius-$t$ Hamming balls about its codewords exactly tile $\mathbb{F}_q^n$.`,
    proof: String.raw`*Volume of a Hamming ball.* The number of words in $\mathcal{A}^n$ at **Hamming distance** exactly $i$ from a fixed word $c$ is $\binom{n}{i}(q-1)^i$: choose which $i$ of the $n$ coordinates differ — $\binom{n}{i}$ ways, a **binomial coefficient** — and in each chosen coordinate pick one of the $q - 1$ symbols other than $c$'s. Summing over $i = 0, \dots, t$, the closed ball $B_t(c) = \{\, y : d(y, c) \le t \,\}$ has size $V := \sum_{i=0}^t \binom{n}{i}(q-1)^i$, independent of $c$.

*Packing.* By **error-correction-radius**, the balls $B_t(c)$ for distinct codewords $c \in C$ are pairwise disjoint, since $C$ corrects $t = \lfloor (d-1)/2 \rfloor$ errors. They are $M$ in number, all of size $V$, and all contained in $\mathcal{A}^n$ of size $q^n$. Disjointness gives
$$M \cdot V = \Bigl|\bigsqcup_{c \in C} B_t(c)\Bigr| \le |\mathcal{A}^n| = q^n,$$
which is the stated bound. Equality holds iff the disjoint balls cover all of $\mathcal{A}^n$, i.e. every word lies within distance $t$ of a (unique) codeword — the definition of a **perfect** code. $\square$`,
  },
  {
    id: 'gilbert-varshamov-bound',
    label: 'Gilbert–Varshamov',
    title: 'Gilbert–Varshamov Bound',
    kind: 'theorem',
    tags: ['Coding Theory'],
    dependencies: ['block-code', 'hamming-distance', 'minimum-distance', 'binomial-coefficient'],
    description: String.raw`The Singleton and Hamming bounds say codes cannot be too good; the **Gilbert–Varshamov bound** is the opposite — a guarantee that codes that good *exist*. Its idea is greedy: keep adding codewords, each at distance $\ge d$ from all chosen so far, until no eligible word remains. When you stop, the radius-$(d-1)$ balls about the chosen codewords must cover the whole space (else an uncovered word could be added), and this covering inequality forces the code to be large. The result is a lower bound on the best achievable size, and asymptotically the largest rate provably attainable by an elementary construction.`,
    statement: String.raw`For any $n \ge 1$, $q \ge 2$, and $2 \le d \le n$, there exists a $q$-ary **block code** of length $n$ and **minimum distance** $\ge d$ with size
$$M \;\ge\; \frac{q^n}{\sum_{i=0}^{d-1} \binom{n}{i}(q-1)^i}.$$`,
    proof: String.raw`*Greedy construction.* Build $C \subseteq \mathcal{A}^n$ by repeatedly choosing a word at **Hamming distance** $\ge d$ from every word already chosen, and stop when no such word exists. Throughout, any two chosen words are at distance $\ge d$, so the resulting $C$ has **minimum distance** $\ge d$.

*Covering forces largeness.* When the process halts, every word $y \in \mathcal{A}^n$ is within distance $d - 1$ of some chosen codeword: otherwise $y$ would have distance $\ge d$ from all of $C$ and could be added, contradicting that we stopped. Hence the closed balls $B_{d-1}(c)$, $c \in C$, cover $\mathcal{A}^n$:
$$q^n = |\mathcal{A}^n| \le \sum_{c \in C} |B_{d-1}(c)| = M \cdot \sum_{i=0}^{d-1}\binom{n}{i}(q-1)^i,$$
using that each ball $B_{d-1}(c)$ has the volume $\sum_{i=0}^{d-1}\binom{n}{i}(q-1)^i$ computed in the proof of the Hamming bound (choose $i$ differing coordinates by a **binomial coefficient**, then a nonzero change in each). Dividing by the ball volume gives $M \ge q^n / \sum_{i=0}^{d-1}\binom{n}{i}(q-1)^i$. $\square$`,
  },

  // ── Concrete code families ───────────────────────────────────────────────────
  {
    id: 'hamming-code',
    label: 'Hamming Code',
    title: 'Hamming Code',
    kind: 'proposition',
    tags: ['Coding Theory'],
    dependencies: ['parity-check-matrix', 'parity-check-distance', 'error-correction-radius', 'hamming-bound'],
    description: String.raw`The first family of error-correcting codes, and the cleanest application of the column viewpoint. To make a single-error-correcting code, the parity-check matrix needs every two columns linearly independent; the most economical way is to use *every* possible nonzero column direction exactly once. Over $\mathbb{F}_2$ this means listing all $2^r - 1$ nonzero binary columns of height $r$, giving the $[2^r - 1,\ 2^r - 1 - r,\ 3]$ Hamming code. Its syndrome is literally the binary index of the flipped bit, so decoding is instantaneous. These codes correct one error, and they are perfect — they meet the sphere-packing bound exactly.`,
    statement: String.raw`Fix $r \ge 2$ and let $H$ be the $r \times (2^r - 1)$ binary matrix whose columns are all $2^r - 1$ nonzero vectors of $\mathbb{F}_2^r$, each once. The code $\mathrm{Ham}(r) = \{\, x \in \mathbb{F}_2^n : Hx^{\mathsf T} = \mathbf{0} \,\}$ with $n = 2^r - 1$ is a binary linear $[\,2^r - 1,\ 2^r - 1 - r,\ 3\,]$ code. It corrects one error and is **perfect**.`,
    proof: String.raw`*Parameters.* The matrix $H$ has $r$ rows and $n = 2^r - 1$ columns. It has rank $r$ (its columns include the $r$ standard basis vectors $e_1, \dots, e_r$ of $\mathbb{F}_2^r$, which are present among the nonzero columns), so it is a **parity-check matrix** of the code $C = \mathrm{Ham}(r)$, which therefore has dimension $k = n - r = 2^r - 1 - r$.

*Minimum distance is $3$.* Apply the column criterion of **parity-check-distance**. No single column is $\mathbf{0}$ (all columns are nonzero), so no $1$ column is dependent. No two columns are dependent: over $\mathbb{F}_2$ a dependence between two columns $h_i, h_j$ would mean $h_i = h_j$ (the only nonzero scalar is $1$), but the columns are distinct. However, three columns *are* dependent: pick any two distinct columns $h_i, h_j$; their sum $h_i + h_j$ is nonzero (as $h_i \neq h_j$) and so equals some third column $h_\ell$, giving $h_i + h_j + h_\ell = \mathbf{0}$. Thus the smallest dependent set of columns has size $3$, so $d(C) = 3$.

*Correction and perfection.* With $d = 3$, the correction radius is $t = \lfloor (3-1)/2 \rfloor = 1$, so by **error-correction-radius** the code corrects one error. For perfection, check the **hamming-bound** with equality at $t = 1$, $q = 2$:
$$M \cdot \sum_{i=0}^{1}\binom{n}{i}(2-1)^i = 2^{\,n-r}\bigl(1 + n\bigr) = 2^{\,n-r}(1 + 2^r - 1) = 2^{\,n - r} \cdot 2^r = 2^n,$$
which equals $q^n = 2^n$. Hence the radius-$1$ balls tile $\mathbb{F}_2^n$ and $\mathrm{Ham}(r)$ is **perfect**. (Decoding: the syndrome of a single error in position $i$ is $He_i^{\mathsf T} = h_i$, the $i$-th column, which identifies $i$.) $\square$`,
  },
  {
    id: 'reed-solomon-code',
    label: 'Reed–Solomon Code',
    title: 'Reed–Solomon Code',
    kind: 'proposition',
    tags: ['Coding Theory'],
    dependencies: ['linear-code', 'generator-matrix', 'singleton-bound', 'polynomial', 'field', 'linear-code-distance-weight'],
    description: String.raw`Reed–Solomon codes encode a message as the coefficients of a polynomial and transmit its values at distinct points of a finite field — the algebraic analogue of pinning down a curve by sampling it. The decisive fact is that a nonzero polynomial of degree $< k$ has fewer than $k$ roots, so any two distinct messages disagree in more than $n - k$ of the $n$ evaluation points: the code achieves minimum distance $n - k + 1$, the maximum the Singleton bound allows. Reed–Solomon codes are thus MDS, and because they correct *bursts* of symbol errors they are ubiquitous — in CDs and DVDs, QR codes, RAID storage, and deep-space telemetry.`,
    statement: String.raw`Let $\mathbb{F}_q$ be a finite field, fix distinct evaluation points $\alpha_1, \dots, \alpha_n \in \mathbb{F}_q$ (so $n \le q$) and a dimension $1 \le k \le n$. The **Reed–Solomon code** is
$$\mathrm{RS}(n, k) = \bigl\{\, (f(\alpha_1), \dots, f(\alpha_n)) : f \in \mathbb{F}_q[X],\ \deg f < k \,\bigr\}.$$
It is a **linear** $[n, k, n - k + 1]_q$ code — in particular **MDS**, attaining the **Singleton bound**.`,
    proof: String.raw`*Linearity and dimension.* The evaluation map $\mathrm{ev} : \{\, f \in \mathbb{F}_q[X] : \deg f < k \,\} \to \mathbb{F}_q^n$, $f \mapsto (f(\alpha_1), \dots, f(\alpha_n))$, is $\mathbb{F}_q$-linear in the coefficients of $f$ (a **polynomial** of degree $< k$ is determined by its $k$ coefficients $f_0, \dots, f_{k-1}$, and $f(\alpha_j) = \sum_{i<k} f_i \alpha_j^i$ is linear in them). Its image $\mathrm{RS}(n, k)$ is therefore a subspace of $\mathbb{F}_q^n$, a **linear code**. The map is injective: if $f \neq g$ both have degree $< k$ and agree at all $n$ points, then $f - g$ is a nonzero polynomial of degree $< k \le n$ with $n$ distinct roots $\alpha_1, \dots, \alpha_n$ — impossible by the **root bound** below. Hence $\dim \mathrm{RS}(n, k) = k$, and the matrix $G_{ij} = \alpha_j^{\,i}$ ($0 \le i < k$, $1 \le j \le n$) — a Vandermonde-type array — is a **generator matrix**.

*Root bound.* A nonzero polynomial $p \in \mathbb{F}_q[X]$ of degree $m$ has at most $m$ roots in $\mathbb{F}_q$. By the division algorithm in $\mathbb{F}_q[X]$, each root $\beta$ factors out: $p(\beta) = 0$ gives $p(X) = (X - \beta)\,h(X)$ with $\deg h = m - 1$. Since $\mathbb{F}_q$ is a **field** (hence $\mathbb{F}_q[X]$ has no zero divisors, by **polynomial**), any further root $\gamma \neq \beta$ satisfies $(\gamma - \beta)h(\gamma) = 0$ with $\gamma - \beta \neq 0$, so $h(\gamma) = 0$; induction on $m$ (the base case $m = 0$ being a nonzero constant, with no roots) bounds the number of roots by $m$.

*Minimum distance.* A nonzero codeword is $\mathrm{ev}(f)$ for some nonzero $f$ with $\deg f < k$. Such an $f$ has at most $k - 1$ roots among the $\alpha_j$ (by the **root bound** above, since $\deg f \le k - 1$), so at most $k - 1$ of its evaluations are zero, leaving at least $n - (k - 1) = n - k + 1$ nonzero coordinates: $\operatorname{wt}(\mathrm{ev}(f)) \ge n - k + 1$. By **linear-code-distance-weight**, $d(\mathrm{RS}(n,k)) \ge n - k + 1$. The reverse inequality is the **Singleton bound**, $d \le n - k + 1$. Hence $d = n - k + 1$ and the code is **MDS**. (The minimum is attained: a degree-$(k-1)$ polynomial vanishing at $k - 1$ of the points has weight exactly $n - k + 1$.) $\square$`,
  },
]
