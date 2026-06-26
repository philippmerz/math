import type { MathNode } from '../types'

/** Probability — 13 nodes. */
export const PROBABILITY_NODES: MathNode[] = [
  {
    id: 'probability-space',
    label: 'Probability Space',
    title: 'Probability Space',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['measure'],
    definition: String.raw`A **probability space** $(\Omega, \mathcal{F}, P)$ is a measure space of total mass one: a sample space $\Omega$ of outcomes, a σ-algebra $\mathcal{F}$ of **events**, and a **probability measure** $P : \mathcal{F} \to [0, 1]$ with $P(\Omega) = 1$. Probability is thus measure theory specialized to total mass $1$ — so its general machinery applies directly.`,
  },
  {
    id: 'random-variable',
    label: 'Random Variable',
    title: 'Random Variable',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['measurable-function', 'probability-space'],
    definition: String.raw`A **random variable** is a measurable function $X : \Omega \to \mathbb{R}$ on a probability space — a numerical readout of the random outcome. Measurability ensures events like $\{X \le x\}$ have well-defined probabilities. Despite the name it is a function, not a variable; the randomness lives in the underlying outcome $\omega \in \Omega$.`,
  },
  {
    id: 'distribution',
    label: 'Distribution',
    title: 'Probability Distribution',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable'],
    definition: String.raw`The **distribution** (law) of a random variable $X$ is the pushforward of $P$ onto $\mathbb{R}$: $\mu_X(B) = P(X \in B)$. It is captured by the **cumulative distribution function** $F(x) = P(X \le x)$ and by a probability mass function (discrete) or, when the law is absolutely continuous, a density (with $f = F'$ holding almost everywhere). The distribution is all that matters for probabilities of $X$.`,
  },
  {
    id: 'expectation',
    label: 'Expectation',
    title: 'Expectation',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable', 'lebesgue-integral'],
    definition: String.raw`The **expectation** (mean) of an integrable random variable ($\mathbb{E}|X| < \infty$) is its integral against the probability measure — its long-run average:
$$\mathbb{E}[X] = \int_\Omega X \, dP = \int_{\mathbb{R}} x \, d\mu_X(x).$$
Linear and monotone, it specializes the Lebesgue integral to probability; for a density $f$ it is $\int x\,f(x)\,dx$.`,
  },
  {
    id: 'variance',
    label: 'Variance',
    title: 'Variance',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation'],
    definition: String.raw`The **variance** measures spread about the mean:
$$\operatorname{Var}(X) = \mathbb{E}\bigl[(X - \mathbb{E}[X])^2\bigr] = \mathbb{E}[X^2] - \mathbb{E}[X]^2.$$
Its square root is the **standard deviation**. Variance is additive over uncorrelated variables (independence suffices) — the key fact behind the laws of large numbers and the central limit theorem.`,
  },
  {
    id: 'independence',
    label: 'Independence',
    title: 'Independence',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['probability-space'],
    definition: String.raw`Events $A, B$ are **independent** when $P(A \cap B) = P(A)\,P(B)$ — knowing one says nothing about the other. Random variables $X, Y$ are independent when $P(X \in A,\, Y \in B) = P(X \in A)\,P(Y \in B)$ for all (Borel) sets $A, B$ — equivalently, when their joint distribution factors into the marginals. Independence is the structural assumption that distinguishes probability from general measure theory.`,
  },
  {
    id: 'conditional-probability',
    label: 'Conditional Probability',
    title: 'Conditional Probability',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['probability-space'],
    definition: String.raw`The **conditional probability** of $A$ given $B$ (with $P(B) > 0$) renormalizes to the world where $B$ has occurred:
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}.$$
It is how evidence updates probabilities; independence is exactly the case $P(A \mid B) = P(A)$.`,
  },
  {
    id: 'bayes-theorem',
    label: "Bayes' Theorem",
    title: "Bayes' Theorem",
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['conditional-probability'],
    definition: String.raw`**Bayes' theorem** inverts conditional probabilities: for events with $P(A), P(B) > 0$,
$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.$$
It turns a **prior** $P(A)$ into a **posterior** $P(A \mid B)$ in light of evidence $B$; expanding the denominator by total probability, $P(B) = \sum_i P(B \mid A_i)\,P(A_i)$ over a partition $\{A_i\}$, gives the posterior over competing hypotheses. It is the engine of Bayesian inference and much of machine learning.`,
  },
  {
    id: 'conditional-expectation',
    label: 'Conditional Expectation',
    title: 'Conditional Expectation',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation', 'sigma-algebra'],
    definition: String.raw`The **conditional expectation** $\mathbb{E}[X \mid \mathcal{G}]$ of an integrable $X$ is the best estimate of $X$ given the information in a sub-σ-algebra $\mathcal{G}$: the *almost surely unique* $\mathcal{G}$-measurable random variable with $\mathbb{E}[\mathbf{1}_G\, X] = \mathbb{E}\bigl[\mathbf{1}_G\,\mathbb{E}[X \mid \mathcal{G}]\bigr]$ for every $G \in \mathcal{G}$. When $X \in L^2$ it is the orthogonal projection onto the square-integrable $\mathcal{G}$-measurable functions, and it is the foundation of martingales.`,
  },
  {
    id: 'normal-distribution',
    label: 'Normal Distribution',
    title: 'Normal (Gaussian) Distribution',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['distribution'],
    definition: String.raw`The **normal** (Gaussian) **distribution** $\mathcal{N}(\mu, \sigma^2)$ has the bell-curve density
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\;e^{-(x - \mu)^2 / (2\sigma^2)}.$$
Determined by its mean $\mu$ and variance $\sigma^2$, closed under sums of independents, and entropy-maximizing for fixed variance, it is the universal limit law of the central limit theorem.`,
  },
  {
    id: 'convergence-of-random-variables',
    label: 'Convergence of RVs',
    title: 'Convergence of Random Variables',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable', 'almost-everywhere', 'distribution', 'expectation'],
    definition: String.raw`Random variables admit several **modes of convergence**: **almost surely** (pointwise off a null set), in **$L^p$** ($p$-th mean), in **probability** ($P(|X_n - X| > \varepsilon) \to 0$ for every $\varepsilon > 0$), and in **distribution** (CDFs converge at continuity points). Both almost-sure and $L^p$ convergence imply convergence in probability, which implies convergence in distribution; almost-sure and $L^p$ are **incomparable** — neither implies the other. They underpin the limit theorems: the law of large numbers (a.s. / in probability) and the central limit theorem (in distribution).`,
  },
  {
    id: 'law-of-large-numbers',
    label: 'Law of Large Numbers',
    title: 'Law of Large Numbers',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['expectation', 'independence', 'convergence-of-random-variables'],
    definition: String.raw`The **law of large numbers**: the sample mean of independent, identically distributed variables converges to their common expectation,
$$\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i \;\longrightarrow\; \mathbb{E}[X].$$
The *weak* law gives convergence in probability, the *strong* law almost surely. It is why averages stabilize and why probabilities can be estimated by long-run frequencies.`,
  },
  {
    id: 'central-limit-theorem',
    label: 'Central Limit Theorem',
    title: 'Central Limit Theorem',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['normal-distribution', 'variance', 'independence', 'convergence-of-random-variables'],
    definition: String.raw`The **central limit theorem**: for i.i.d. variables with mean $\mu$ and finite, positive variance $\sigma^2$, the standardized sample mean converges *in distribution* to a standard normal,
$$\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \;\xrightarrow{\;d\;}\; \mathcal{N}(0, 1).$$
Sums of many small independent effects are approximately Gaussian whatever their individual distribution — the reason the normal law is everywhere.`,
  },
]
