import type { MathNode } from '../types'

export const INFORMATION_THEORY_NODES: MathNode[] = [
  {
    id: 'entropy',
    label: 'Entropy',
    title: 'Shannon Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['random-variable', 'expectation'],
    definition: String.raw`The **Shannon entropy** of a discrete random variable $X$ measures its average uncertainty in bits:
$$H(X) = -\sum_x p(x)\log_2 p(x) = \mathbb{E}[-\log_2 p(X)].$$
It is maximal for the uniform distribution and zero for a constant, and is the minimum average number of bits per symbol needed to encode $X$ in the limit of long sequences (Shannon's source coding theorem) — the founding quantity of information theory.`,
  },
  {
    id: 'joint-and-conditional-entropy',
    label: 'Conditional Entropy',
    title: 'Joint & Conditional Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    definition: String.raw`**Joint entropy** $H(X, Y)$ is the uncertainty in a pair, and **conditional entropy** $H(Y \mid X)$ the average uncertainty left in $Y$ once $X$ is known. They obey the **chain rule** $H(X, Y) = H(X) + H(Y \mid X)$, and conditioning never increases entropy — $H(Y \mid X) \le H(Y)$, with equality exactly when $X$ and $Y$ are independent.`,
  },
  {
    id: 'mutual-information',
    label: 'Mutual Information',
    title: 'Mutual Information',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['joint-and-conditional-entropy'],
    definition: String.raw`**Mutual information** $I(X; Y) = H(Y) - H(Y \mid X)$ is the uncertainty about one variable removed by learning the other — the information they share. Symmetric and non-negative, it vanishes exactly when $X$ and $Y$ are independent, and equals the KL divergence between the joint distribution and the product of the marginals.`,
  },
  {
    id: 'kl-divergence',
    label: 'KL Divergence',
    title: 'Kullback–Leibler Divergence',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    definition: String.raw`The **Kullback–Leibler divergence**
$$D(p \,\|\, q) = \sum_x p(x)\log_2\frac{p(x)}{q(x)}$$
measures how a distribution $p$ departs from a reference $q$ — the expected extra bits from coding $p$'s data with a code built for $q$. It is non-negative (Gibbs' inequality), zero only when $p = q$, but is neither symmetric nor a metric.`,
  },
  {
    id: 'cross-entropy',
    label: 'Cross-Entropy',
    title: 'Cross-Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy', 'kl-divergence'],
    definition: String.raw`The **cross-entropy** $H(p, q) = -\sum_x p(x)\log_2 q(x) = H(p) + D(p \,\|\, q)$ is the average bits to encode samples from $p$ with a code optimized for $q$. Minimizing it over $q$ — equivalently minimizing the KL divergence — is the standard training objective for classifiers in machine learning.`,
  },
  {
    id: 'source-coding-theorem',
    label: 'Source Coding Theorem',
    title: 'Source Coding Theorem',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    definition: String.raw`Shannon's **source coding theorem**: a source of entropy $H$ bits per symbol can be compressed to an average of $H$ bits per symbol as block length grows, but no further. Entropy is the hard floor of lossless compression — above it, compression is achievable; below it, information is irretrievably lost — fixing the operational meaning of entropy.`,
  },
  {
    id: 'prefix-code',
    label: 'Prefix Code',
    title: 'Prefix Code & Kraft Inequality',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    definition: String.raw`A **prefix code** gives each symbol a codeword, none a prefix of another, so a stream decodes instantly without delimiters. Codeword lengths $\ell_i$ are achievable exactly when they satisfy the **Kraft inequality** $\sum_i 2^{-\ell_i} \le 1$, and the best prefix code's expected length lies within one bit of the entropy.`,
  },
  {
    id: 'huffman-coding',
    label: 'Huffman Coding',
    title: 'Huffman Coding',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['prefix-code', 'source-coding-theorem'],
    definition: String.raw`**Huffman coding** builds the optimal prefix code by repeatedly merging the two least probable symbols into a subtree — a greedy algorithm provably minimizing expected codeword length. Ubiquitous in file and media formats, it meets the entropy bound to within one bit per symbol, the gap closing as longer blocks are coded together.`,
  },
  {
    id: 'channel-capacity',
    label: 'Channel Capacity',
    title: 'Channel Capacity',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['mutual-information'],
    definition: String.raw`The **capacity** of a noisy channel is the largest mutual information between its input and output, over all input distributions:
$$C = \max_{p(x)} I(X; Y).$$
It is the maximum rate, in bits per channel use, at which information can be sent reliably — the single number that summarizes what a noisy medium can carry.`,
  },
  {
    id: 'noisy-channel-coding-theorem',
    label: 'Channel Coding Theorem',
    title: 'Noisy-Channel Coding Theorem',
    kind: 'theorem',
    tags: ['Information Theory'],
    dependencies: ['channel-capacity'],
    definition: String.raw`Shannon's **noisy-channel coding theorem**: every rate below the capacity $C$ is achievable with error probability vanishing for long enough codes, and no rate above $C$ is. Reliable communication over an unreliable channel is possible, with capacity the exact threshold — the result that founded the digital age, though it is non-constructive about the codes that achieve it.`,
  },
  {
    id: 'error-correcting-code',
    label: 'Error-Correcting Code',
    title: 'Error-Correcting Code',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['noisy-channel-coding-theorem'],
    definition: String.raw`An **error-correcting code** adds structured redundancy so that errors introduced by a noisy channel can be detected and corrected. **Linear codes** — Hamming, Reed–Solomon — are subspaces over a finite field, their power measured by the minimum Hamming distance between codewords. They give the noisy-channel coding theorem a constructive realization — correcting real errors in CDs, QR codes, and deep-space links — with modern capacity-approaching families (turbo, LDPC, and polar codes) coming closest to Shannon's limit.`,
  },
  {
    id: 'differential-entropy',
    label: 'Differential Entropy',
    title: 'Differential Entropy',
    kind: 'definition',
    tags: ['Information Theory'],
    dependencies: ['entropy'],
    definition: String.raw`**Differential entropy** extends entropy to a continuous density:
$$h(X) = -\int f(x)\log f(x)\,dx.$$
Unlike the discrete version it can be negative and is not coordinate-invariant, but it still governs continuous channel capacity. Among all densities of a fixed variance the **Gaussian** maximizes it — the precise sense in which the normal distribution is the most random.`,
  },
]
