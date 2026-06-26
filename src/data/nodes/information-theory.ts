import type { MathNode } from '../types'

export const INFORMATION_THEORY_NODES: MathNode[] = [
  // ── Entropy and related quantities ──────────────────────────────────────────
  {
    id: 'entropy',
    label: 'Entropy',
    title: 'Shannon Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['random-variable', 'expectation'],
    description: String.raw`How much uncertainty does a random outcome carry? Shannon's answer measures the *average surprise* of a draw: a rare value $x$ (small $p(x)$) is surprising and is assigned a large surprisal $-\log_2 p(x)$ bits, a certain value none, and entropy is the expected surprisal. It is largest when the distribution is uniform — maximal ignorance — and zero when one value is certain. Its operational meaning, fixed by the source coding theorem, is that $H(X)$ bits per symbol is exactly the floor of lossless compression. This single quantity is the founding object of the subject.`,
    definition: String.raw`The **Shannon entropy** of a discrete random variable $X$ with probability mass function $p(x) = P(X = x)$ on a countable alphabet $\mathcal{X}$ is
$$H(X) = -\sum_{x \in \mathcal{X}} p(x)\log_2 p(x) = \mathbb{E}\bigl[-\log_2 p(X)\bigr],$$
with the convention $0\log_2 0 = 0$ (justified by $t\log_2 t \to 0$ as $t \to 0^{+}$). It depends only on the **distribution** of $X$, not its values, and is measured in **bits** (base $2$); using $\ln$ gives **nats**. One has $0 \le H(X) \le \log_2 |\mathcal{X}|$ when $\mathcal{X}$ is finite, with $H(X) = 0$ iff $X$ is constant and $H(X) = \log_2|\mathcal{X}|$ iff $X$ is uniform.`,
  },
  {
    id: 'gibbs-inequality',
    label: 'Gibbs’ Inequality',
    title: 'Gibbs’ Inequality (Information Inequality)',
    kind: 'proposition',
    tags: ['Information Theory'],
    dependencies: ['kl-divergence', 'jensens-inequality', 'convex-function'],
    description: String.raw`The basic inequality of the subject says relative entropy is never negative: no distribution describes data more economically than the true one. It is the single fact behind almost every bound in information theory — that entropy is at most $\log_2$ of the alphabet size, that mutual information is non-negative, that conditioning cannot increase entropy, and that cross-entropy is minimized at the truth. The proof is one application of the convexity of $-\log$.`,
    statement: String.raw`For probability mass functions $p, q$ on a common countable alphabet $\mathcal{X}$ (with $q(x) > 0$ wherever $p(x) > 0$),
$$D(p \,\|\, q) = \sum_{x} p(x)\log_2\frac{p(x)}{q(x)} \;\ge\; 0,$$
with equality if and only if $p = q$.`,
    proof: String.raw`Work over the **support** $S = \{x : p(x) > 0\}$ (terms with $p(x) = 0$ contribute $0$). The function $\varphi(t) = -\log_2 t$ is strictly **convex** on $(0, \infty)$, since $\varphi''(t) = 1/(t^2\ln 2) > 0$. Regard the ratio $R = q(X)/p(X)$ as a random variable, where $X$ has law $p$; then $\mathbb{E}[R] = \sum_{x \in S} p(x)\,\frac{q(x)}{p(x)} = \sum_{x \in S} q(x) \le \sum_x q(x) = 1$. By **Jensen's inequality** applied to the convex $\varphi$,
$$D(p \,\|\, q) = \mathbb{E}\Bigl[-\log_2\frac{q(X)}{p(X)}\Bigr] = \mathbb{E}[\varphi(R)] \;\ge\; \varphi(\mathbb{E}[R]) = -\log_2 \mathbb{E}[R] \ge -\log_2 1 = 0,$$
the last step using that $-\log_2$ is decreasing and $\mathbb{E}[R] \le 1$. For equality: strict convexity of $\varphi$ forces, via the equality case of Jensen, $R$ to be almost surely constant, say $q(x)/p(x) = c$ on $S$; summing $q(x) = c\,p(x)$ over $S$ gives $c \le 1$, and equality in the final step needs $\mathbb{E}[R] = 1$, i.e. $q$ is supported on $S$ and $c = 1$. Hence $p = q$. $\square$`,
  },
  {
    id: 'joint-and-conditional-entropy',
    label: 'Conditional Entropy',
    title: 'Joint & Conditional Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'conditional-probability'],
    description: String.raw`Entropy extends from one variable to two. **Joint entropy** is the uncertainty in the pair, and **conditional entropy** is the average uncertainty remaining in one variable once the other is revealed — the residual surprise of $Y$, averaged over what $X$ turns out to be. The two are linked by the **chain rule**: the uncertainty of a pair is the uncertainty of the first plus the uncertainty the second adds on top, $H(X, Y) = H(X) + H(Y \mid X)$. This is the additive bookkeeping that organizes all of entropy's algebra.`,
    definition: String.raw`For discrete random variables $X, Y$ with joint mass function $p(x, y)$, marginals $p(x), p(y)$, and conditionals $p(y \mid x) = p(x,y)/p(x)$, the **joint entropy** is
$$H(X, Y) = -\sum_{x, y} p(x, y)\log_2 p(x, y),$$
and the **conditional entropy** of $Y$ given $X$ is the expected entropy of $Y$ over the value of $X$,
$$H(Y \mid X) = \sum_{x} p(x)\,H(Y \mid X = x) = -\sum_{x, y} p(x, y)\log_2 p(y \mid x).$$
The **chain rule** $H(X, Y) = H(X) + H(Y \mid X)$ holds and follows directly: $\log_2 p(x,y) = \log_2 p(x) + \log_2 p(y \mid x)$, and summing against $p(x,y)$ splits the joint entropy into $H(X) + H(Y \mid X)$. It iterates to $H(X_1, \dots, X_n) = \sum_{i} H(X_i \mid X_1, \dots, X_{i-1})$.`,
  },
  {
    id: 'mutual-information',
    label: 'Mutual Information',
    title: 'Mutual Information',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['joint-and-conditional-entropy', 'kl-divergence', 'gibbs-inequality'],
    description: String.raw`Mutual information measures how much learning one variable tells you about another — the uncertainty in $Y$ that knowing $X$ removes. It is the gap between $Y$'s entropy and its conditional entropy, and equivalently the KL divergence between the genuine joint distribution and the fiction in which the two are independent. Hence it is symmetric in its arguments, never negative, and vanishes exactly when the variables are independent. It is the quantity optimized to define channel capacity and is the natural measure of statistical dependence.`,
    definition: String.raw`The **mutual information** between discrete random variables $X$ and $Y$ is
$$I(X; Y) = H(Y) - H(Y \mid X) = H(X) - H(X \mid Y) = H(X) + H(Y) - H(X, Y),$$
the three forms agreeing by the chain rule. Equivalently it is the **Kullback–Leibler divergence** between the joint law and the product of marginals,
$$I(X; Y) = D\bigl(p(x, y) \,\big\|\, p(x)p(y)\bigr) = \sum_{x, y} p(x, y)\log_2\frac{p(x, y)}{p(x)p(y)},$$
which makes manifest that $I(X; Y) = I(Y; X) \ge 0$, with $I(X; Y) = 0$ iff $X, Y$ are independent (by **Gibbs' inequality**). The **conditional mutual information** is $I(X; Y \mid Z) = H(X \mid Z) - H(X \mid Y, Z)$.`,
  },
  {
    id: 'conditioning-reduces-entropy',
    label: 'Conditioning ↓ Entropy',
    title: 'Conditioning Reduces Entropy',
    kind: 'proposition',
    tags: ['Information Theory'],
    dependencies: ['mutual-information', 'gibbs-inequality', 'joint-and-conditional-entropy'],
    description: String.raw`Information cannot hurt: on average, knowing a side variable never increases the uncertainty left in another. This is the precise sense in which extra data is at worst useless, and it is the engine of the subadditivity of entropy. The qualifier "on average" matters — a particular observed value $X = x$ can raise the conditional entropy of $Y$; it is only the average over $X$ that cannot.`,
    statement: String.raw`For discrete random variables $X, Y$,
$$H(Y \mid X) \le H(Y),$$
with equality if and only if $X$ and $Y$ are independent. Consequently entropy is **subadditive**: $H(X, Y) \le H(X) + H(Y)$.`,
    proof: String.raw`By the definition of **mutual information**, $H(Y) - H(Y \mid X) = I(X; Y)$, and $I(X; Y) = D\bigl(p(x,y)\,\|\,p(x)p(y)\bigr) \ge 0$ by **Gibbs' inequality** (mutual information is a relative entropy). Hence $H(Y \mid X) \le H(Y)$. Equality holds iff $I(X; Y) = 0$, which by the equality case of Gibbs' inequality means the joint law equals the product of marginals, i.e. $X$ and $Y$ are independent. Subadditivity follows from the chain rule: $H(X, Y) = H(X) + H(Y \mid X) \le H(X) + H(Y)$. $\square$`,
  },
  {
    id: 'kl-divergence',
    label: 'KL Divergence',
    title: 'Kullback–Leibler Divergence',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    description: String.raw`Relative entropy quantifies how far one distribution sits from another, in coding terms: if you build an optimal code for a guessed distribution $q$ but the data actually follow $p$, the KL divergence is the average number of *extra* bits per symbol you waste. It is asymmetric — coding $p$-data with a $q$-code is not the same penalty as the reverse — and so is not a metric, yet it is non-negative and vanishes only when $p = q$. It is the master quantity from which entropy, cross-entropy, and mutual information are all carved.`,
    definition: String.raw`The **Kullback–Leibler divergence** (relative entropy) from a distribution $q$ to a distribution $p$ on a common countable alphabet is
$$D(p \,\|\, q) = \sum_{x} p(x)\log_2\frac{p(x)}{q(x)} = \mathbb{E}_p\Bigl[\log_2\frac{p(X)}{q(X)}\Bigr],$$
with conventions $0\log_2\tfrac{0}{q} = 0$ and $p\log_2\tfrac{p}{0} = +\infty$ for $p > 0$ (so $D(p\,\|\,q) = \infty$ unless $p$ is **absolutely continuous** with respect to $q$, in symbols $p \ll q$, i.e. $q(x) = 0 \Rightarrow p(x) = 0$). It is **non-negative**, zero iff $p = q$ (**Gibbs' inequality**), but neither symmetric nor subject to the triangle inequality, so it is a *divergence*, not a metric.`,
  },
  {
    id: 'cross-entropy',
    label: 'Cross-Entropy',
    title: 'Cross-Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'kl-divergence', 'gibbs-inequality'],
    description: String.raw`Cross-entropy is the average code length you pay when the data come from $p$ but you encode them with a code tuned to $q$. It splits cleanly into the unavoidable cost — the true entropy $H(p)$ — plus the avoidable waste $D(p\,\|\,q)$ of using the wrong model. Because the first term does not depend on $q$, minimizing cross-entropy over $q$ is identical to minimizing KL divergence, which is why it is the default loss for training probabilistic classifiers: pushing the model's predictions $q$ toward the empirical truth $p$.`,
    definition: String.raw`The **cross-entropy** of a distribution $q$ relative to $p$ on a common alphabet is
$$H(p, q) = -\sum_{x} p(x)\log_2 q(x) = \mathbb{E}_p[-\log_2 q(X)].$$
It decomposes as $H(p, q) = H(p) + D(p \,\|\, q)$.`,
    proof: String.raw`**The decomposition holds.** Writing $\log_2 q(x) = \log_2 p(x) - \log_2\frac{p(x)}{q(x)}$ on the support of $p$ and summing against $p(x)$,
$$H(p, q) = -\sum_x p(x)\log_2 q(x) = -\sum_x p(x)\log_2 p(x) + \sum_x p(x)\log_2\frac{p(x)}{q(x)} = H(p) + D(p \,\|\, q),$$
the two pieces being the **entropy** $H(p)$ and the **KL divergence** $D(p\,\|\,q)$. By **Gibbs' inequality** $D(p\,\|\,q) \ge 0$, so $H(p, q) \ge H(p)$ with equality iff $q = p$; thus cross-entropy is minimized over $q$ exactly at the true distribution. $\square$`,
  },

  // ── Source coding (compression) ─────────────────────────────────────────────
  {
    id: 'asymptotic-equipartition-property',
    label: 'AEP',
    title: 'Asymptotic Equipartition Property',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'law-of-large-numbers', 'independence'],
    description: String.raw`The asymptotic equipartition property is the information-theoretic law of large numbers. For a long sequence of independent draws, almost all the probability concentrates on a "typical set" of sequences that are essentially equiprobable, each of probability about $2^{-nH}$, and there are about $2^{nH}$ of them. So although an alphabet of size $|\mathcal{X}|$ permits $|\mathcal{X}|^n$ sequences, only an exponentially thinner sliver — $2^{nH}$, governed by the entropy — ever actually occurs. This is the engine behind the source coding theorem: compress by spending bits only on typical sequences.`,
    statement: String.raw`Let $X_1, X_2, \dots$ be i.i.d. discrete random variables with mass function $p$ and entropy $H = H(X_1) < \infty$. Then
$$-\frac{1}{n}\log_2 p(X_1, \dots, X_n) \;\xrightarrow{\ P\ }\; H \qquad (n \to \infty),$$
convergence in probability. Equivalently, for every $\varepsilon > 0$ the **typical set** $A_\varepsilon^{(n)} = \bigl\{(x_1, \dots, x_n) : \bigl|-\tfrac1n\log_2 p(x_1, \dots, x_n) - H\bigr| \le \varepsilon\bigr\}$ satisfies, for all large $n$: (i) $P\bigl(A_\varepsilon^{(n)}\bigr) > 1 - \varepsilon$; (ii) every sequence in it has $2^{-n(H+\varepsilon)} \le p(x_1, \dots, x_n) \le 2^{-n(H-\varepsilon)}$; and (iii) $(1 - \varepsilon)\,2^{n(H-\varepsilon)} \le \bigl|A_\varepsilon^{(n)}\bigr| \le 2^{n(H+\varepsilon)}$.`,
    proof: String.raw`By **independence** the joint mass factorizes, so $-\frac1n\log_2 p(X_1, \dots, X_n) = \frac1n\sum_{i=1}^n \bigl(-\log_2 p(X_i)\bigr)$ is the sample average of the i.i.d. random variables $Y_i := -\log_2 p(X_i)$, whose common mean is $\mathbb{E}[Y_1] = -\sum_x p(x)\log_2 p(x) = H$ (the definition of **entropy**). The **law of large numbers** gives $\frac1n\sum_i Y_i \to H$ in probability, which is the displayed limit.

*Properties.* (ii) is just the definition of $A_\varepsilon^{(n)}$ rearranged through $p(x_1,\dots,x_n) = 2^{-n \cdot (-\frac1n\log_2 p)}$. (i) is the convergence in probability statement: $P\bigl(A_\varepsilon^{(n)}\bigr) = P\bigl(\bigl|-\tfrac1n\log_2 p(X^n) - H\bigr| \le \varepsilon\bigr) \to 1$, so it exceeds $1 - \varepsilon$ for large $n$. For the **upper count** in (iii), summing the lower bound in (ii) over the typical set, $1 \ge P\bigl(A_\varepsilon^{(n)}\bigr) = \sum_{x^n \in A_\varepsilon^{(n)}} p(x^n) \ge |A_\varepsilon^{(n)}|\,2^{-n(H+\varepsilon)}$, so $|A_\varepsilon^{(n)}| \le 2^{n(H+\varepsilon)}$. For the **lower count**, using (i) and the upper bound in (ii), $1 - \varepsilon < P\bigl(A_\varepsilon^{(n)}\bigr) = \sum_{x^n \in A_\varepsilon^{(n)}} p(x^n) \le |A_\varepsilon^{(n)}|\,2^{-n(H-\varepsilon)}$, so $|A_\varepsilon^{(n)}| > (1 - \varepsilon)\,2^{n(H-\varepsilon)}$. $\square$`,
  },
  {
    id: 'source-coding-theorem',
    label: 'Source Coding Theorem',
    title: 'Source Coding Theorem',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'asymptotic-equipartition-property'],
    description: String.raw`Shannon's first coding theorem pins down the exact limit of lossless compression: a source emitting symbols of entropy $H$ bits each can be compressed to an average of $H$ bits per symbol — and not one bit less without losing information. Entropy is therefore the hard floor of compression. Above it, codes exist that approach the limit as block length grows; below it, the probability of perfect recovery is forced to zero. This is what gives entropy its operational meaning and what every practical compressor (ZIP, PNG, FLAC) chases.`,
    statement: String.raw`Let a source emit i.i.d. symbols $X_1, X_2, \dots$ with entropy $H = H(X_1)$ bits. **(Achievability)** For every $R > H$ and $\varepsilon > 0$ there is, for all large $n$, a uniquely decodable binary code on blocks of length $n$ that uses at most $R$ bits per symbol while failing to reconstruct the block with probability $< \varepsilon$; one can take the rate down to $H$. **(Converse)** If a fixed-length block code uses fewer than $H$ bits per symbol — a rate $R < H$ — then its probability of error tends to $1$ as $n \to \infty$. Thus the least achievable rate of lossless (vanishing-error) compression equals $H$.`,
    proof: String.raw`Both halves run through the **asymptotic equipartition property** and its typical set $A_\varepsilon^{(n)}$.

*Achievability.* Fix $\varepsilon > 0$ with $H + \varepsilon < R$. By the AEP, for large $n$ the typical set $A_\varepsilon^{(n)}$ has at most $2^{n(H+\varepsilon)}$ elements and probability $> 1 - \varepsilon$. Build a **fixed-length** code: assign each typical sequence a distinct binary string of length $\lceil n(H+\varepsilon)\rceil$ — possible because there are at most $2^{n(H+\varepsilon)} \le 2^{\lceil n(H+\varepsilon)\rceil}$ of them — and map every atypical sequence to one fixed reserved string, on which the decoder declares an error. This code uses $\lceil n(H+\varepsilon)\rceil/n \le (H+\varepsilon) + 1/n \le R$ bits per symbol for large $n$ (since $H+\varepsilon < R$), decodes every typical block exactly, and can err only on atypical blocks, so its error probability is at most $P\bigl((A_\varepsilon^{(n)})^c\bigr) < \varepsilon$. Letting $\varepsilon \downarrow 0$ drives the achievable rate down to $H$.

*Converse.* Suppose a fixed-length scheme assigns to each block one of only $2^{nR}$ codewords with $R < H$; at most $2^{nR}$ blocks can be reconstructed without error (a decoder is a function of the codeword). Choose $\varepsilon > 0$ with $R < H - \varepsilon$. The decodable set $B$ has $|B| \le 2^{nR} < 2^{n(H - \varepsilon)}$. By AEP property (ii) every typical sequence has probability $\le 2^{-n(H-\varepsilon)}$, so $P(B \cap A_\varepsilon^{(n)}) \le |B|\,2^{-n(H-\varepsilon)} < 2^{n(H-\varepsilon)}2^{-n(H-\varepsilon)} = 1$ — more sharply $\le 2^{nR - n(H-\varepsilon)} \to 0$. Since $P(B) \le P(B \cap A_\varepsilon^{(n)}) + P\bigl((A_\varepsilon^{(n)})^c\bigr)$ and the second term $\to 0$ by AEP property (i), the success probability $P(B) \to 0$, i.e. the error probability $\to 1$. Hence no rate below $H$ achieves vanishing error, and the operational compression limit is exactly $H$. $\square$`,
  },
  {
    id: 'prefix-code',
    label: 'Prefix Code',
    title: 'Prefix Code',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    description: String.raw`A prefix code is a practical, instantaneously decodable encoding: each symbol gets a binary codeword, and no codeword is the beginning of another. That rule lets a decoder read a stream and recognize each codeword the moment it ends, with no lookahead and no separators. Such codes correspond exactly to leaf labelings of a binary tree, and the geometry of that tree constrains the codeword lengths — the constraint made precise by the Kraft inequality.`,
    definition: String.raw`A binary **code** for an alphabet $\mathcal{X}$ is a map $C : \mathcal{X} \to \{0, 1\}^{*}$ assigning to each symbol $x$ a finite binary string (its **codeword**) of length $\ell(x)$. It is a **prefix code** (or instantaneous, or prefix-free) if no codeword is a prefix of another, so the codewords are the leaves of a binary tree and any concatenation of codewords parses uniquely left-to-right. The **expected length** under a source distribution $p$ is $L(C) = \sum_x p(x)\,\ell(x)$. Prefix codes are a special case of **uniquely decodable** codes, where merely the concatenation map on $\mathcal{X}^{*}$ is injective.`,
  },
  {
    id: 'kraft-inequality',
    label: 'Kraft Inequality',
    title: 'Kraft–McMillan Inequality',
    kind: 'proposition',
    tags: ['Information Theory'],
    dependencies: ['prefix-code'],
    description: String.raw`The Kraft inequality is the exact budget constraint on codeword lengths: a set of lengths can be realized by a prefix code precisely when the codewords "fit" inside a binary tree, measured by $\sum 2^{-\ell_i} \le 1$. Short codewords are expensive — each one of length $\ell$ uses up a fraction $2^{-\ell}$ of the tree — so making one symbol cheap forces others to be dear. McMillan's extension shows the same bound governs the larger class of uniquely decodable codes, so prefix codes lose nothing in achievable length.`,
    statement: String.raw`A binary **prefix code** with codeword lengths $\ell_1, \dots, \ell_m$ exists if and only if
$$\sum_{i=1}^{m} 2^{-\ell_i} \;\le\; 1.$$
(McMillan: the same inequality is necessary even for arbitrary uniquely decodable codes, so prefix codes achieve the same length sets.)`,
    proof: String.raw`*Necessity.* Place a **prefix code** on the infinite binary tree, each codeword at the node reached by its bits. Let $\ell_{\max} = \max_i \ell_i$. A codeword of length $\ell_i$ sits at depth $\ell_i$; the prefix condition means no codeword lies on the path to another, so the subtrees hanging below the codewords at full depth $\ell_{\max}$ are disjoint. The codeword of length $\ell_i$ has exactly $2^{\ell_{\max} - \ell_i}$ descendants at depth $\ell_{\max}$, and these descendant sets are disjoint subsets of the $2^{\ell_{\max}}$ nodes at that depth. Hence $\sum_i 2^{\ell_{\max} - \ell_i} \le 2^{\ell_{\max}}$, which divided by $2^{\ell_{\max}}$ is $\sum_i 2^{-\ell_i} \le 1$.

*Sufficiency.* Given lengths $\ell_1 \le \ell_2 \le \cdots \le \ell_m$ with $\sum_i 2^{-\ell_i} \le 1$, assign codewords greedily by depth. Having chosen codewords for the first $i-1$ lengths, the nodes forbidden at depth $\ell_i$ (descendants of earlier codewords, plus the earlier codewords themselves which are at depth $\le \ell_i$) number $\sum_{j < i} 2^{\ell_i - \ell_j} = 2^{\ell_i}\sum_{j<i}2^{-\ell_j} < 2^{\ell_i}\cdot 1 = 2^{\ell_i}$, since $\sum_{j<i}2^{-\ell_j} < \sum_j 2^{-\ell_j} \le 1$. So a free node remains at depth $\ell_i$; choose it as the $i$-th codeword. No chosen codeword is a descendant of another, so the result is a prefix code. (McMillan's stronger necessity for uniquely decodable codes follows by bounding $\bigl(\sum_i 2^{-\ell_i}\bigr)^k$ and counting strings of each length, but is not needed here.) $\square$`,
  },
  {
    id: 'prefix-code-entropy-bound',
    label: 'Entropy Coding Bound',
    title: 'Entropy Bounds for Prefix Codes',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['prefix-code', 'kraft-inequality', 'entropy', 'gibbs-inequality', 'kl-divergence'],
    description: String.raw`This makes the source coding theorem concrete for a single symbol: the entropy is both a lower bound on the average length of any prefix code and, to within one bit, an achievable one. The lower bound is Gibbs' inequality in disguise — the codeword lengths define a sub-probability distribution against which the source is compared. The upper bound comes from the Shannon code, which rounds the ideal length $-\log_2 p(x)$ up to an integer; the rounding costs at most one bit, a gap that shrinks to nothing when many symbols are coded together in blocks.`,
    statement: String.raw`For any source distribution $p$ on a finite alphabet, every binary **prefix code** $C$ has expected length $L(C) = \sum_x p(x)\ell(x) \ge H(X)$ (entropy in bits). Conversely there is a prefix code with $L(C) < H(X) + 1$. Hence the minimal expected length $L^{*}$ satisfies $H(X) \le L^{*} < H(X) + 1$, and coding blocks of $n$ symbols brings the per-symbol length to within $1/n$ of $H(X)$.`,
    proof: String.raw`*Lower bound.* Let $\ell(x)$ be the codeword lengths of a prefix code and set $c = \sum_x 2^{-\ell(x)} \le 1$ by the **Kraft inequality**. Define the probability distribution $r(x) = 2^{-\ell(x)}/c$. Then
$$L(C) - H(X) = \sum_x p(x)\ell(x) + \sum_x p(x)\log_2 p(x) = \sum_x p(x)\log_2\frac{p(x)}{2^{-\ell(x)}} = \sum_x p(x)\log_2\frac{p(x)}{r(x)} - \log_2 c = D(p\,\|\,r) - \log_2 c.$$
By **Gibbs' inequality** $D(p\,\|\,r) \ge 0$, and $-\log_2 c \ge 0$ since $c \le 1$; hence $L(C) \ge H(X)$, with equality iff $p(x) = 2^{-\ell(x)}$ for all $x$ (a dyadic source).

*Upper bound (Shannon code).* Choose lengths $\ell(x) = \lceil -\log_2 p(x)\rceil$. These satisfy Kraft: $\sum_x 2^{-\lceil -\log_2 p(x)\rceil} \le \sum_x 2^{\log_2 p(x)} = \sum_x p(x) = 1$, so by **kraft-inequality** a prefix code with these lengths exists. Its expected length obeys $\ell(x) < -\log_2 p(x) + 1$, so $L(C) = \sum_x p(x)\ell(x) < \sum_x p(x)(-\log_2 p(x)) + 1 = H(X) + 1$.

*Blocking.* Apply the bounds to the i.i.d. super-symbol $(X_1, \dots, X_n)$, whose entropy is $nH(X)$: a prefix code on blocks has $nH(X) \le L_n^{*} < nH(X) + 1$, so the per-symbol length $L_n^{*}/n$ lies in $[H(X),\, H(X) + 1/n)$ and converges to $H(X)$. $\square$`,
  },
  {
    id: 'huffman-coding',
    label: 'Huffman Coding',
    title: 'Huffman Coding',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['prefix-code', 'kraft-inequality', 'prefix-code-entropy-bound'],
    description: String.raw`Huffman coding constructs the *optimal* prefix code — the one of least expected length — by a simple greedy rule: repeatedly take the two least probable symbols and merge them into a combined node, building the code tree from the leaves up. The two rarest symbols end up deepest, sharing all but their last bit. The construction is provably optimal among prefix codes (and hence, by the Kraft–McMillan inequality, among all uniquely decodable codes), and by the entropy bound it sits within one bit of the entropy per symbol — a gap that closes when symbols are grouped into blocks. It is ubiquitous in real file and media formats.`,
    definition: String.raw`Given source probabilities $p_1, \dots, p_m > 0$, the **Huffman code** is the binary **prefix code** built by the following greedy tree construction: while more than one node remains, remove the two nodes of smallest probability, create a parent node whose probability is their sum, and make the two removed nodes its children (labeling the two edges $0$ and $1$); the codeword of a symbol is the sequence of edge labels from the root to its leaf. The resulting code attains the **minimum expected length** $L^{*} = \sum_i p_i \ell_i$ over all prefix codes for $p$. This optimality is established by induction on $m$ via an exchange argument. *Sibling lemma:* some optimal prefix code has the two least-likely symbols $a, b$ as siblings (sharing a parent) at maximum depth. Indeed, take any optimal code, viewed as a full binary tree (an optimal tree has no node with a single child — pruning it shortens a codeword); let $x, y$ be two sibling leaves at the deepest level. Swapping the labels so that the two globally least-likely symbols $a, b$ sit at $x, y$ never increases $L$, because a higher-probability symbol cannot have strictly shorter depth than a lower-probability one in an optimal code (else swapping them would lower $L$). *Inductive step:* merge $a, b$ into one symbol $z$ of probability $p_a + p_b$, giving an instance with $m - 1$ symbols. Any code for the merged instance lifts to a code for the original (split $z$'s leaf into the two children $a, b$), and conversely an optimal code with $a, b$ as deepest siblings projects to a code for the merged instance, with $L_{\text{orig}} = L_{\text{merged}} + (p_a + p_b)$ in both directions; hence an optimal merged code yields an optimal original code, and vice versa. Since Huffman's greedy merge produces exactly this reduction at each step and the base case $m = 1$ (empty codeword) is trivially optimal, induction gives optimality. By the **entropy bound** for prefix codes, $H \le L^{*} < H + 1$.`,
  },

  // ── Differential entropy ────────────────────────────────────────────────────
  {
    id: 'differential-entropy',
    label: 'Differential Entropy',
    title: 'Differential Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'lebesgue-integral'],
    description: String.raw`Differential entropy carries Shannon's formula to continuous random variables, replacing the sum over an alphabet by an integral against a density. It governs the capacity of continuous (e.g. Gaussian) channels and shares many of entropy's identities. But it is a subtler object: it can be negative, and it changes under invertible coordinate changes (a rescaling $X \mapsto aX$ shifts it by $\log_2|a|$), so it is not an absolute measure of uncertainty the way discrete entropy is. Differences of differential entropies — and so mutual information — remain coordinate-invariant and meaningful.`,
    definition: String.raw`The **differential entropy** of a continuous random variable $X$ with probability density $f$ (with respect to Lebesgue measure on $\mathbb{R}^n$) is
$$h(X) = -\int_{\{f > 0\}} f(x)\log_2 f(x)\,dx = \mathbb{E}[-\log_2 f(X)],$$
when this **Lebesgue integral** exists. Unlike discrete entropy it may be negative, is not invariant under change of variables — for an invertible $C^1$ map $g$, $h(g(X)) = h(X) + \mathbb{E}[\log_2 |\det Dg(X)|]$ — and is finite only under integrability conditions on $f\log f$. Relative entropy and mutual information are defined by the same integral formulas as in the discrete case and *are* coordinate-invariant.`,
  },
  {
    id: 'gaussian-maximum-entropy',
    label: 'Gaussian Max Entropy',
    title: 'Maximum Entropy of the Gaussian',
    kind: 'proposition',
    tags: ['Information Theory'],
    dependencies: ['differential-entropy', 'normal-distribution', 'kl-divergence', 'gibbs-inequality', 'jensens-inequality'],
    description: String.raw`Among all continuous distributions of a prescribed variance, the Gaussian is the most uncertain: it maximizes differential entropy. This is the precise sense in which the normal distribution is "maximally random" subject to a second-moment constraint, and it is why white Gaussian noise is the worst-case noise for a power-limited channel — it offers an adversary the most entropy per unit of power. The proof is a one-line application of the non-negativity of relative entropy, comparing an arbitrary density against the matched Gaussian.`,
    statement: String.raw`Among all real random variables $X$ with density and variance $\sigma^{2}$ (and any fixed mean $\mu$), the Gaussian $\mathcal{N}(\mu, \sigma^{2})$ uniquely maximizes the **differential entropy**, with value
$$h(X) \le \tfrac{1}{2}\log_2\bigl(2\pi e\,\sigma^{2}\bigr),$$
equality holding iff $X \sim \mathcal{N}(\mu, \sigma^{2})$.`,
    proof: String.raw`Let $f$ be the density of $X$ (assume $h(X)$ exists) and let $\phi$ be the $\mathcal{N}(\mu, \sigma^{2})$ density, which is strictly positive everywhere. The continuous **KL divergence** $D(f \,\|\, \phi) = \int_{\{f>0\}} f\log_2\frac{f}{\phi}$ is non-negative — the density analogue of **Gibbs' inequality**, proved by the same convexity argument: with $X \sim f$, the ratio $R = \phi(X)/f(X)$ has $\mathbb{E}[R] = \int_{\{f>0\}} \phi = 1$ (since $\{\phi=0\}=\varnothing$), and $\varphi(t)=-\log_2 t$ is strictly convex, so by **Jensen's inequality** $D(f\,\|\,\phi) = \mathbb{E}[\varphi(R)] \ge \varphi(\mathbb{E}[R]) = -\log_2 1 = 0$, with equality iff $R$ is a.s. constant, i.e. $f = \phi$ a.e. Expanding,
$$0 \le D(f \,\|\, \phi) = \int f\log_2\frac{f}{\phi} = -h(X) - \int f(x)\log_2\phi(x)\,dx.$$
Now $-\log_2\phi(x) = \tfrac{1}{2}\log_2(2\pi\sigma^{2}) + \tfrac{(x-\mu)^{2}}{2\sigma^{2}}\log_2 e$ is a quadratic in $x$, so its expectation under $f$ uses only the mean and variance of $X$, which match those of $\phi$ by hypothesis: $\int f(x)\bigl(-\log_2\phi(x)\bigr)\,dx = \tfrac12\log_2(2\pi\sigma^2) + \tfrac{\sigma^2}{2\sigma^2}\log_2 e = \tfrac12\log_2(2\pi\sigma^2) + \tfrac12\log_2 e = \tfrac12\log_2(2\pi e\,\sigma^2)$. Because this matched-moment integral is identical whether computed against $f$ or against $\phi$, it equals $-\int \phi\log_2\phi = h(\mathcal{N}(\mu,\sigma^2))$. Substituting, $0 \le -h(X) + \tfrac12\log_2(2\pi e\,\sigma^2)$, i.e. $h(X) \le \tfrac12\log_2(2\pi e\,\sigma^2)$. Equality holds iff $D(f\,\|\,\phi) = 0$, i.e. $f = \phi$ — so the Gaussian is the unique maximizer. (The value for the Gaussian itself, $h = \tfrac12\log_2(2\pi e\,\sigma^2)$, also confirms differential entropy can be negative, namely when $\sigma^2 < 1/(2\pi e)$.) $\square$`,
  },

  // ── Channel coding (communication) ──────────────────────────────────────────
  {
    id: 'channel-capacity',
    label: 'Channel Capacity',
    title: 'Channel Capacity',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['mutual-information'],
    description: String.raw`A noisy channel is described by the conditional probabilities of each output given each input. How much information can it carry per use? The answer is the largest mutual information achievable between input and output, optimized over how one chooses to drive the channel — the input distribution. That single number is the channel capacity, and the noisy-channel coding theorem certifies it as the exact maximum rate of reliable communication. For the binary symmetric channel with crossover $p$, for example, the capacity is $1 - H(p)$ bits per use.`,
    definition: String.raw`A discrete memoryless **channel** is given by an input alphabet $\mathcal{X}$, output alphabet $\mathcal{Y}$, and transition probabilities $p(y \mid x)$. Its (information) **capacity** is
$$C = \max_{p(x)} I(X; Y),$$
the maximum of the **mutual information** between input $X$ and output $Y$ over all input distributions $p(x)$, with $Y$ generated from $X$ through the channel. The maximum is attained (the objective is continuous and concave in $p(x)$ on a compact simplex). $C$ is measured in bits per channel use.`,
  },
  {
    id: 'fanos-inequality',
    label: 'Fano’s Inequality',
    title: 'Fano’s Inequality',
    kind: 'proposition',
    tags: ['Information Theory'],
    dependencies: ['joint-and-conditional-entropy', 'conditioning-reduces-entropy', 'entropy'],
    description: String.raw`Fano's inequality lower-bounds the error of any attempt to recover a variable $X$ from an observation $Y$, in terms of the leftover uncertainty $H(X \mid Y)$. In words: if conditioning on $Y$ still leaves a lot of entropy about $X$, then no decoder — however clever — can guess $X$ reliably. It is the indispensable tool for converse theorems, turning "the channel did not reduce uncertainty enough" into "errors are unavoidable," and is exactly what proves no rate above capacity can be reliable.`,
    statement: String.raw`Let $X$ be a discrete random variable on an alphabet $\mathcal{X}$ and let $\hat{X} = g(Y)$ be any estimate of $X$ from an observation $Y$. With error probability $P_e = P(\hat{X} \neq X)$,
$$H(X \mid Y) \;\le\; H_b(P_e) + P_e\,\log_2\bigl(|\mathcal{X}| - 1\bigr),$$
where $H_b(t) = -t\log_2 t - (1-t)\log_2(1-t)$ is the binary entropy. In particular $P_e \ge \dfrac{H(X \mid Y) - 1}{\log_2 |\mathcal{X}|}$.`,
    proof: String.raw`Let $E = \mathbf{1}\{\hat{X} \neq X\}$ be the error indicator, so $P(E = 1) = P_e$. Expand the **joint and conditional entropy** $H(E, X \mid Y)$ by the chain rule in two ways:
$$H(E, X \mid Y) = H(X \mid Y) + H(E \mid X, Y) = H(E \mid Y) + H(X \mid E, Y).$$
The term $H(E \mid X, Y) = 0$, since $E$ is a deterministic function of $X$ and $Y$ (it is $\mathbf{1}\{g(Y) \neq X\}$). By **conditioning reduces entropy**, $H(E \mid Y) \le H(E) = H_b(P_e)$. For the last term, condition on $E$: when $E = 0$ then $\hat{X} = X$ is determined by $Y$, so $H(X \mid E = 0, Y) = 0$; when $E = 1$, $X$ ranges over the $|\mathcal{X}| - 1$ values other than $\hat{X} = g(Y)$, so $H(X \mid E = 1, Y) \le \log_2(|\mathcal{X}| - 1)$ (entropy is at most $\log_2$ of the alphabet size). Averaging over $E$ with weights $1 - P_e$ and $P_e$ gives $H(X \mid E, Y) \le P_e\log_2(|\mathcal{X}| - 1)$. Combining,
$$H(X \mid Y) = H(E \mid Y) + H(X \mid E, Y) \le H_b(P_e) + P_e\log_2(|\mathcal{X}| - 1).$$
Finally $H_b(P_e) \le 1$ and $\log_2(|\mathcal{X}| - 1) \le \log_2|\mathcal{X}|$ give the weaker bound $H(X \mid Y) \le 1 + P_e\log_2|\mathcal{X}|$, i.e. $P_e \ge (H(X \mid Y) - 1)/\log_2|\mathcal{X}|$. $\square$`,
  },
  {
    id: 'noisy-channel-coding-theorem',
    label: 'Channel Coding Theorem',
    title: 'Noisy-Channel Coding Theorem',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['channel-capacity', 'asymptotic-equipartition-property', 'fanos-inequality', 'mutual-information', 'joint-and-conditional-entropy', 'conditioning-reduces-entropy'],
    description: String.raw`Shannon's second coding theorem is the foundational result of communication: reliable transmission over an unreliable channel is possible up to a sharp threshold, and that threshold is the capacity $C$. For any rate below $C$ there exist codes whose error probability vanishes as the block length grows; for any rate above $C$, the error is bounded away from zero no matter what code is used. Remarkably, the achievability proof is non-constructive — it shows a *random* code works on average, without exhibiting one — which left the explicit construction of capacity-approaching codes as a decades-long pursuit. It is the result that founded the digital age.`,
    statement: String.raw`For a discrete memoryless channel of **capacity** $C$: **(Achievability)** every rate $R < C$ is achievable — there exist block codes of rate $R$ whose maximal probability of decoding error tends to $0$ as the block length $n \to \infty$. **(Converse)** every code with vanishing error probability has rate $R \le C$; equivalently, for rates $R > C$ the error probability is bounded away from $0$.`,
    proof: String.raw`*Achievability (sketch — random coding and joint typicality).* Fix an input distribution $p(x)$ achieving $I(X; Y) > R$ (possible whenever $R < C$). Generate $2^{nR}$ codewords i.i.d. from $p(x)^{\otimes n}$ — a *random codebook*. Decode a received $y^n$ to the unique codeword that is **jointly typical** with it, where the joint typical set (built from the **asymptotic equipartition property** applied to the pair $(X, Y)$) collects sequences whose empirical statistics match $p(x, y)$. Two AEP facts drive the analysis: the transmitted codeword is jointly typical with its output with probability $\to 1$; and an *independent* codeword is jointly typical with $y^n$ with probability $\le 2^{-n(I(X;Y) - \varepsilon)}$. By a union bound the expected error over the random codebook is at most $P(\text{not jointly typical}) + (2^{nR} - 1)2^{-n(I(X;Y)-\varepsilon)} \to 0$ since $R < I(X; Y) - \varepsilon$. As the *average* code is good, some fixed codebook is; expurgating its worst half of codewords makes the *maximal* error small at essentially the same rate.

*Converse (via Fano).* Let $W$ be a message uniform on $\{1, \dots, 2^{nR}\}$, sent as codeword $X^n$ and received as $Y^n$, decoded to $\hat{W}$ with error probability $P_e^{(n)}$. Since $W$ is uniform, $H(W) = nR$, and as $W \to X^n \to Y^n \to \hat{W}$,
$$nR = H(W) = H(W \mid Y^n) + I(W; Y^n) \le \bigl(1 + P_e^{(n)} nR\bigr) + I(X^n; Y^n),$$
using **Fano's inequality** $H(W \mid Y^n) \le 1 + P_e^{(n)}\log_2 2^{nR} = 1 + P_e^{(n)} nR$ (since $\hat{W}$ is a function of $Y^n$ and $|\mathcal{W}| = 2^{nR}$), and the data-processing step $I(W; Y^n) \le I(X^n; Y^n)$. For a memoryless channel $I(X^n; Y^n) \le \sum_{i=1}^n I(X_i; Y_i) \le nC$: writing $I(X^n; Y^n) = H(Y^n) - H(Y^n \mid X^n)$, memorylessness gives $H(Y^n \mid X^n) = \sum_{i=1}^n H(Y_i \mid X_i)$ (each $Y_i$ depends only on $X_i$, so by the chain rule for **joint and conditional entropy** the conditional terms separate), while **conditioning reduces entropy** gives the subadditivity $H(Y^n) \le \sum_{i=1}^n H(Y_i)$; subtracting, $I(X^n; Y^n) \le \sum_i \bigl[H(Y_i) - H(Y_i \mid X_i)\bigr] = \sum_i I(X_i; Y_i)$, and each per-letter **mutual information** $I(X_i; Y_i) \le C$. Thus $nR \le 1 + P_e^{(n)} nR + nC$, i.e. $R \le \frac{1}{n} + P_e^{(n)} R + C$. If $P_e^{(n)} \to 0$, letting $n \to \infty$ gives $R \le C$; contrapositively, $R > C$ forces $P_e^{(n)}$ bounded away from $0$. $\square$`,
  },
  {
    id: 'error-correcting-code',
    label: 'Error-Correcting Code',
    title: 'Error-Correcting Code',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['noisy-channel-coding-theorem', 'field', 'vector-space', 'subspace'],
    description: String.raw`The noisy-channel coding theorem promises good codes exist but does not build them; error-correcting codes are the explicit constructions that deliver. They add structured redundancy so a decoder can detect and repair the errors a channel introduces. The decisive design parameter is the minimum Hamming distance between codewords: a code of minimum distance $d$ corrects any pattern of fewer than $d/2$ errors. Linear codes — defined as subspaces over a finite field, so encoding and much of decoding become linear algebra — dominate practice, from the Hamming and Reed–Solomon codes in CDs, QR codes, and deep-space links to the modern capacity-approaching turbo, LDPC, and polar families.`,
    definition: String.raw`A **block code** of length $n$ over an alphabet $\mathcal{A}$ is a subset $C \subseteq \mathcal{A}^n$ whose elements are **codewords**; messages are encoded as codewords and recovered after the channel corrupts them. The **Hamming distance** $d(u, v)$ is the number of coordinates in which $u, v$ differ, and the code's **minimum distance** is $d = \min_{u \neq v \in C} d(u, v)$; a code with minimum distance $d$ detects up to $d - 1$ errors and corrects up to $\lfloor (d-1)/2\rfloor$ (nearest-codeword decoding succeeds whenever fewer than $d/2$ symbols are altered). A **linear $[n, k, d]$ code** over a finite **field** $\mathbb{F}_q$ is a $k$-dimensional **subspace** $C \subseteq \mathbb{F}_q^n$ of the **vector space** $\mathbb{F}_q^n$; its $q^k$ codewords are described by a generator matrix and a parity-check matrix, and its minimum distance equals the least Hamming weight of a nonzero codeword. The **rate** $k/n$ measures efficiency; the noisy-channel coding theorem guarantees families of codes with rate approaching capacity and vanishing error.`,
  },
]
