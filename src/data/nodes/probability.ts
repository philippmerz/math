import type { MathNode } from '../types'

export const PROBABILITY_NODES: MathNode[] = [
  {
    id: 'probability-space',
    label: 'Probability Space',
    title: 'Probability Space',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['measure', 'measurable-space'],
    description: String.raw`Probability is measure theory normalized to total mass one. The model of a random experiment is a triple: a set $\Omega$ of all possible outcomes, a $\sigma$-algebra $\mathcal{F}$ of those subsets — the **events** — to which a probability can be assigned, and a rule $P$ giving each event its likelihood, with the certain event $\Omega$ having probability $1$. Because $P$ is a measure, every theorem of measure theory applies verbatim; what makes probability its own subject is the extra structure built on top — independence, conditioning, and the limit theorems.`,
    definition: String.raw`A **probability space** is a measure space $(\Omega, \mathcal{F}, P)$ whose measure has total mass one: $\Omega$ is the **sample space**, $(\Omega, \mathcal{F})$ is a measurable space (so $\mathcal{F}$ is a $\sigma$-algebra of subsets of $\Omega$, the **events**), and $P : \mathcal{F} \to [0, 1]$ is a **probability measure** — a measure with $P(\Omega) = 1$. Countable additivity gives, for pairwise disjoint events $A_1, A_2, \dots$,
$$P\Bigl(\bigcup_n A_n\Bigr) = \sum_n P(A_n),$$
from which the elementary rules $P(\varnothing) = 0$, $P(A^c) = 1 - P(A)$, and monotonicity follow.`,
  },
  {
    id: 'random-variable',
    label: 'Random Variable',
    title: 'Random Variable',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['measurable-function', 'probability-space', 'borel-sigma-algebra'],
    description: String.raw`A random variable is a numerical reading of the random outcome — height, a coin's value, the number of heads in ten tosses. Formally it is a measurable function on the sample space, the measurability condition being exactly what guarantees that statements like "$X$ lies in this interval" are events and so have probabilities. Despite the name it is a deterministic function $\omega \mapsto X(\omega)$; all the randomness is carried by the outcome $\omega$ drawn according to $P$.`,
    definition: String.raw`A (real) **random variable** on a probability space $(\Omega, \mathcal{F}, P)$ is a measurable function $X : (\Omega, \mathcal{F}) \to (\mathbb{R}, \mathcal{B})$, where $\mathcal{B}$ is the Borel $\sigma$-algebra: $X^{-1}(B) \in \mathcal{F}$ for every Borel set $B$. Equivalently — since the sets $(-\infty, a]$ generate $\mathcal{B}$ — it suffices that $\{\omega : X(\omega) \le a\} \in \mathcal{F}$ for every $a \in \mathbb{R}$. One writes $\{X \in B\}$ for the event $X^{-1}(B)$ and $P(X \in B)$ for its probability.`,
  },
  {
    id: 'distribution',
    label: 'Distribution',
    title: 'Probability Distribution',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable', 'measure', 'probability-space'],
    description: String.raw`Although a random variable lives on an abstract sample space, every probability one can ask about it depends only on how its mass is spread over the real line. That spread is its **distribution** (or **law**): the probability measure on $\mathbb{R}$ obtained by pushing $P$ forward through $X$. It is summarized by the cumulative distribution function $F(x) = P(X \le x)$ — a right-continuous nondecreasing function rising from $0$ to $1$ — and, in the two common cases, by a mass function (discrete) or a density (absolutely continuous).`,
    definition: String.raw`The **distribution** (**law**) of a random variable $X$ is the pushforward measure $\mu_X$ on $(\mathbb{R}, \mathcal{B})$ defined by
$$\mu_X(B) = P(X \in B) = P\bigl(X^{-1}(B)\bigr), \qquad B \in \mathcal{B}.$$
It is a probability measure (its total mass is $P(X \in \mathbb{R}) = 1$). Its **cumulative distribution function** is $F_X(x) = \mu_X((-\infty, x]) = P(X \le x)$. The law is **discrete** if carried by a countable set, described by the mass function $p(x) = P(X = x)$; it is **absolutely continuous** if $\mu_X(B) = \int_B f \, d\lambda$ for a **density** $f \ge 0$ (so $F_X' = f$ Lebesgue-a.e.).`,
    proof: String.raw`**$\mu_X$ is a well-defined probability measure.** Because $X$ is measurable, $X^{-1}(B) \in \mathcal{F}$ for every $B \in \mathcal{B}$, so $\mu_X(B) = P(X^{-1}(B))$ is defined. Set-theoretic preimage commutes with all the operations: $X^{-1}(\varnothing) = \varnothing$ gives $\mu_X(\varnothing) = 0$, and for pairwise disjoint Borel sets $B_n$ the preimages $X^{-1}(B_n)$ are pairwise disjoint with $X^{-1}(\bigcup_n B_n) = \bigcup_n X^{-1}(B_n)$, so countable additivity of $P$ yields
$$\mu_X\Bigl(\bigcup_n B_n\Bigr) = P\Bigl(\bigcup_n X^{-1}(B_n)\Bigr) = \sum_n P\bigl(X^{-1}(B_n)\bigr) = \sum_n \mu_X(B_n).$$
Finally $\mu_X(\mathbb{R}) = P(\Omega) = 1$. Thus $\mu_X$ is a probability measure on $(\mathbb{R}, \mathcal{B})$. $\square$`,
  },
  {
    id: 'expectation',
    label: 'Expectation',
    title: 'Expectation',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable', 'lebesgue-integral', 'distribution', 'monotone-convergence-theorem', 'simple-function-approximation'],
    description: String.raw`The expectation is the average value of a random variable, weighted by probability — the long-run mean its sample averages settle toward. It is nothing but the Lebesgue integral of $X$ against the probability measure, so it inherits linearity and monotonicity for free. Because the law of $X$ carries all the relevant information, the abstract integral over $\Omega$ can be re-expressed as an ordinary integral over $\mathbb{R}$ against the distribution, which is how one computes with mass functions and densities.`,
    definition: String.raw`The **expectation** (mean) of a random variable $X$ with $\mathbb{E}|X| < \infty$ (i.e. $X \in L^1(P)$) is its Lebesgue integral against $P$:
$$\mathbb{E}[X] = \int_\Omega X \, dP.$$
By the change-of-variables formula for pushforward measures it equals the integral against the law, $\mathbb{E}[X] = \int_{\mathbb{R}} x \, d\mu_X(x)$, which for a density $f$ reads $\int_{\mathbb{R}} x f(x) \, dx$ and for a mass function $p$ reads $\sum_x x\, p(x)$. Expectation is **linear** ($\mathbb{E}[aX + bY] = a\,\mathbb{E}[X] + b\,\mathbb{E}[Y]$) and **monotone** ($X \le Y$ a.s. $\Rightarrow \mathbb{E}[X] \le \mathbb{E}[Y]$).`,
    proof: String.raw`**Linearity and monotonicity.** These are exactly the corresponding properties of the **Lebesgue integral**, which holds for any measure and so for $P$. For $X, Y \in L^1(P)$ and scalars $a, b$, $\int_\Omega (aX + bY)\, dP = a\int_\Omega X\, dP + b\int_\Omega Y\, dP$ by linearity of the integral; and if $X \le Y$ pointwise (a.s.), then $\int_\Omega X\, dP \le \int_\Omega Y\, dP$ by monotonicity of the integral. The identity $\int_\Omega X\, dP = \int_{\mathbb{R}} x\, d\mu_X(x)$ is the change-of-variables formula $\int_\Omega (g \circ X)\, dP = \int_{\mathbb{R}} g\, d\mu_X$ applied to $g(x) = x$: it holds for indicator $g = \mathbf{1}_B$ by the very definition $\mu_X(B) = P(X \in B)$, extends to simple $g$ by linearity, to non-negative measurable $g$ by monotone convergence over an increasing sequence of simple functions, and to $g \in L^1(\mu_X)$ by splitting into positive and negative parts. $\square$`,
  },
  {
    id: 'variance',
    label: 'Variance',
    title: 'Variance',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation'],
    description: String.raw`Variance measures how widely a random variable scatters about its mean: the expected squared deviation. Squaring keeps every deviation positive and penalizes large excursions; the square root, the standard deviation, restores the original units. The single most useful computational identity rewrites it as "mean of the square minus square of the mean," and its additivity over independent (more generally, uncorrelated) summands is what drives the law of large numbers.`,
    definition: String.raw`The **variance** of a random variable $X$ with $\mathbb{E}[X^2] < \infty$ is
$$\operatorname{Var}(X) = \mathbb{E}\bigl[(X - \mathbb{E}[X])^2\bigr] \;=\; \mathbb{E}[X^2] - \mathbb{E}[X]^2 \;\ge\; 0.$$
Its non-negative square root $\sigma_X = \sqrt{\operatorname{Var}(X)}$ is the **standard deviation**. For constants $a, b$, $\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$.`,
    proof: String.raw`**The two formulas agree, and variance is non-negative.** Write $\mu = \mathbb{E}[X]$, a finite constant since $\mathbb{E}[X^2] < \infty$ forces $\mathbb{E}|X| < \infty$ (as $|X| \le \tfrac12(1 + X^2)$, integrate using monotonicity of **expectation**). Expanding the square and using **linearity** of expectation,
$$\mathbb{E}[(X - \mu)^2] = \mathbb{E}[X^2 - 2\mu X + \mu^2] = \mathbb{E}[X^2] - 2\mu\,\mathbb{E}[X] + \mu^2 = \mathbb{E}[X^2] - \mu^2.$$
Non-negativity is monotonicity applied to $(X - \mu)^2 \ge 0$. For the scaling rule, $\mathbb{E}[aX + b] = a\mu + b$, so $\operatorname{Var}(aX+b) = \mathbb{E}[(aX + b - a\mu - b)^2] = \mathbb{E}[a^2(X-\mu)^2] = a^2\operatorname{Var}(X)$. $\square$`,
  },
  {
    id: 'covariance',
    label: 'Covariance',
    title: 'Covariance & Correlation',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation', 'variance'],
    description: String.raw`Covariance measures the joint linear variation of two random variables: positive when they tend to lie on the same side of their means together, negative when one's excess pairs with the other's deficit, zero when there is no linear association. It is the bilinear pairing underlying variance (a variable's covariance with itself), and normalizing it by the standard deviations yields the dimensionless correlation coefficient, always between $-1$ and $1$.`,
    definition: String.raw`For random variables $X, Y$ with finite second moments, the **covariance** is
$$\operatorname{Cov}(X, Y) = \mathbb{E}\bigl[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])\bigr] = \mathbb{E}[XY] - \mathbb{E}[X]\,\mathbb{E}[Y].$$
It is symmetric and bilinear, with $\operatorname{Cov}(X, X) = \operatorname{Var}(X)$. $X$ and $Y$ are **uncorrelated** when $\operatorname{Cov}(X, Y) = 0$. The **correlation coefficient** is $\rho(X, Y) = \operatorname{Cov}(X, Y) / (\sigma_X \sigma_Y) \in [-1, 1]$ (for $\sigma_X, \sigma_Y > 0$).`,
    proof: String.raw`**The two formulas agree, and $|\rho| \le 1$.** Writing $\mu_X = \mathbb{E}[X]$, $\mu_Y = \mathbb{E}[Y]$ and expanding by **linearity** of **expectation**,
$$\mathbb{E}[(X - \mu_X)(Y - \mu_Y)] = \mathbb{E}[XY] - \mu_X\mathbb{E}[Y] - \mu_Y\mathbb{E}[X] + \mu_X\mu_Y = \mathbb{E}[XY] - \mu_X\mu_Y;$$
the products are integrable because $|XY| \le \tfrac12(X^2 + Y^2)$. For the bound $|\rho| \le 1$, write the centered variables $U = X - \mu_X$, $V = Y - \mu_Y$, so $\operatorname{Cov}(X, Y) = \mathbb{E}[UV]$, $\operatorname{Var}(X) = \mathbb{E}[U^2]$, $\operatorname{Var}(Y) = \mathbb{E}[V^2]$. For every $t \in \mathbb{R}$, the **expectation** of the non-negative variable $(U - tV)^2$ is non-negative, and by **linearity**,
$$0 \le \mathbb{E}\bigl[(U - tV)^2\bigr] = \mathbb{E}[U^2] - 2t\,\mathbb{E}[UV] + t^2\,\mathbb{E}[V^2].$$
Assume $\sigma_Y > 0$, i.e. $\mathbb{E}[V^2] > 0$ (the case $\rho$ is defined). This is a non-negative quadratic in $t$; minimizing over $t$ at $t = \mathbb{E}[UV]/\mathbb{E}[V^2]$ gives $\mathbb{E}[U^2] - \mathbb{E}[UV]^2/\mathbb{E}[V^2] \ge 0$, i.e. $\mathbb{E}[UV]^2 \le \mathbb{E}[U^2]\,\mathbb{E}[V^2]$. Equivalently $\operatorname{Cov}(X, Y)^2 \le \operatorname{Var}(X)\operatorname{Var}(Y)$, hence $|\rho| \le 1$. $\square$`,
  },
  {
    id: 'independence',
    label: 'Independence',
    title: 'Independence',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['probability-space', 'random-variable', 'distribution'],
    description: String.raw`Two events are independent when the occurrence of one carries no information about the other — their probabilities simply multiply. For random variables the same idea is imposed on every pair of events they generate, equivalently saying that their joint law is the product of the marginals. Independence is the structural hypothesis absent from general measure theory; it is what lets probability speak of "repeating an experiment" and is the engine behind the limit theorems.`,
    definition: String.raw`Events $A, B \in \mathcal{F}$ are **independent** when
$$P(A \cap B) = P(A)\,P(B).$$
A family of events is independent when every finite subfamily satisfies $P\bigl(\bigcap_i A_i\bigr) = \prod_i P(A_i)$. Random variables $X, Y$ are **independent** when the generated $\sigma$-algebras are, i.e.
$$P(X \in A,\ Y \in B) = P(X \in A)\,P(Y \in B) \qquad \text{for all Borel } A, B,$$
equivalently the joint law equals the product $\mu_X \times \mu_Y$. A finite family $X_1, \dots, X_n$ is **(mutually) independent** when
$$P(X_1 \in A_1, \dots, X_n \in A_n) = \prod_{i=1}^n P(X_i \in A_i) \qquad \text{for all Borel } A_1, \dots, A_n,$$
equivalently the joint law equals the product $\mu_{X_1} \times \cdots \times \mu_{X_n}$; an infinite family is independent when every finite subfamily is. This is strictly stronger than pairwise independence. A family is **i.i.d.** (independent and identically distributed) when it is mutually independent and its members share a common law.`,
  },
  {
    id: 'law-of-unconscious-statistician',
    label: 'LOTUS',
    title: 'Law of the Unconscious Statistician',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['random-variable', 'distribution', 'lebesgue-integral', 'simple-function-approximation', 'monotone-convergence-theorem'],
    description: String.raw`To average a function $g(X)$ of a random vector one need not return to the abstract sample space: it suffices to integrate $g$ against the distribution of $X$ on $\mathbb{R}^k$. This change-of-variables identity, $\mathbb{E}[g(X)] = \int g \, d\mu_X$, is what lets every concrete computation of an expectation be carried out with the mass function or density of $X$, and it is the multivariate engine behind factorization results for independent variables.`,
    statement: String.raw`Let $X : (\Omega, \mathcal{F}, P) \to (\mathbb{R}^k, \mathcal{B}^k)$ be a measurable map (a **random vector**) with **distribution** (pushforward law) $\mu_X(B) = P(X^{-1}(B))$ on $(\mathbb{R}^k, \mathcal{B}^k)$, and let $g : \mathbb{R}^k \to \mathbb{R}$ be Borel measurable. Then $g \circ X$ is integrable with respect to $P$ if and only if $g$ is integrable with respect to $\mu_X$, and in that case
$$\mathbb{E}[g(X)] = \int_\Omega g(X) \, dP = \int_{\mathbb{R}^k} g \, d\mu_X.$$
The identity also holds in $[0, \infty]$ for any non-negative Borel $g$, without integrability assumptions.`,
    proof: String.raw`*Indicators.* For $g = \mathbf{1}_B$ with $B \in \mathcal{B}^k$, the composition $g \circ X = \mathbf{1}_{X^{-1}(B)}$, so
$$\int_\Omega \mathbf{1}_B(X)\,dP = P\bigl(X^{-1}(B)\bigr) = \mu_X(B) = \int_{\mathbb{R}^k} \mathbf{1}_B\, d\mu_X,$$
the middle equality being the definition of the pushforward $\mu_X$.

*Simple functions.* A non-negative simple $g = \sum_{i=1}^m c_i \mathbf{1}_{B_i}$ ($c_i \ge 0$) gives, by linearity of the integral and the indicator case,
$$\int_\Omega g(X)\,dP = \sum_i c_i \int_\Omega \mathbf{1}_{B_i}(X)\,dP = \sum_i c_i\, \mu_X(B_i) = \int_{\mathbb{R}^k} g\, d\mu_X.$$

*Non-negative measurable $g$.* By the **simple approximation lemma** choose simple functions $0 \le s_1 \le s_2 \le \cdots$ on $\mathbb{R}^k$ with $s_n \uparrow g$ pointwise. Then $s_n \circ X \uparrow g \circ X$ pointwise on $\Omega$, and each $s_n \circ X$ is a non-negative simple function on $\Omega$. The **monotone convergence theorem**, applied on both $(\Omega, \mathcal{F}, P)$ and $(\mathbb{R}^k, \mathcal{B}^k, \mu_X)$ together with the simple-function case, yields
$$\int_\Omega g(X)\,dP = \lim_n \int_\Omega s_n(X)\,dP = \lim_n \int_{\mathbb{R}^k} s_n\, d\mu_X = \int_{\mathbb{R}^k} g\, d\mu_X \in [0, \infty].$$

*General $g$.* Split $g = g^+ - g^-$ into non-negative Borel parts. Applying the previous step to $|g| = g^+ + g^-$ shows $\int_\Omega |g(X)|\,dP = \int_{\mathbb{R}^k} |g|\, d\mu_X$, so $g \circ X \in L^1(P)$ iff $g \in L^1(\mu_X)$. When these are finite, applying the non-negative case to $g^+$ and $g^-$ separately and subtracting gives $\int_\Omega g(X)\,dP = \int_{\mathbb{R}^k} g\, d\mu_X$. $\square$`,
  },
  {
    id: 'product-of-independent-expectations',
    label: 'E[XY] = E[X]E[Y]',
    title: 'Factorization of Expectation under Independence',
    kind: 'proposition',
    tags: ['Probability'],
    dependencies: ['independence', 'expectation', 'tonellis-theorem', 'fubinis-theorem', 'law-of-unconscious-statistician', 'covariance'],
    description: String.raw`Independence lets expectations of products split into products of expectations. The reason is that the joint law of independent variables is the product measure, so an integral over the plane unfolds into a repeated integral by Fubini's theorem, each factor depending on only one variable. This is the precise sense in which independent variables are uncorrelated, and it is the computational heart of the variance-of-a-sum formula.`,
    statement: String.raw`If $X$ and $Y$ are independent random variables with $\mathbb{E}|X|, \mathbb{E}|Y| < \infty$, then $XY$ is integrable and
$$\mathbb{E}[XY] = \mathbb{E}[X]\,\mathbb{E}[Y].$$
In particular, if $X$ and $Y$ are independent with finite second moments, they are **uncorrelated**: $\operatorname{Cov}(X, Y) = 0$.`,
    proof: String.raw`By **independence** the joint law of the random vector $(X, Y)$ on $\mathbb{R}^2$ is the product measure $\mu_X \times \mu_Y$. Applying the **law of the unconscious statistician** to $(X, Y)$ with $g(x, y) = |xy|$ and then **Tonelli's theorem** (the integrand is non-negative) on the product space,
$$\mathbb{E}|XY| = \int_{\mathbb{R}^2} |xy| \, d(\mu_X \times \mu_Y) = \int_{\mathbb{R}} |x| \, d\mu_X(x) \int_{\mathbb{R}} |y| \, d\mu_Y(y) = \mathbb{E}|X|\,\mathbb{E}|Y| < \infty,$$
so $XY$ is integrable. The same identities applied to $g(x,y) = xy$, now using **Fubini's theorem** since the integrand is integrable, give $\mathbb{E}[XY] = \mathbb{E}[X]\,\mathbb{E}[Y]$. If moreover $X, Y$ have finite second moments, then **covariance** is defined and $\operatorname{Cov}(X, Y) = \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y] = 0$. $\square$`,
  },
  {
    id: 'variance-of-sum',
    label: 'Variance of a Sum',
    title: 'Variance of a Sum (Bienaymé)',
    kind: 'proposition',
    tags: ['Probability'],
    dependencies: ['variance', 'covariance', 'product-of-independent-expectations', 'expectation'],
    description: String.raw`The variance of a sum is the sum of the variances plus all the cross-covariances; when the summands are pairwise uncorrelated — independence being the usual sufficient condition — the cross terms vanish and variances simply add. This additivity, due to Bienaymé, is precisely why the standardized sample mean of $n$ i.i.d. observations has variance shrinking like $1/n$, the quantitative fact that powers the law of large numbers and fixes the $\sqrt{n}$ scaling in the central limit theorem.`,
    statement: String.raw`For square-integrable random variables $X_1, \dots, X_n$,
$$\operatorname{Var}\Bigl(\sum_{i=1}^n X_i\Bigr) = \sum_{i=1}^n \operatorname{Var}(X_i) + 2\sum_{i < j} \operatorname{Cov}(X_i, X_j).$$
If they are pairwise uncorrelated (in particular, pairwise independent), then $\operatorname{Var}\bigl(\sum_i X_i\bigr) = \sum_i \operatorname{Var}(X_i)$.`,
    proof: String.raw`Center each variable, $\tilde{X}_i = X_i - \mathbb{E}[X_i]$, so $\sum_i X_i - \mathbb{E}[\sum_i X_i] = \sum_i \tilde{X}_i$ by **linearity** of expectation. By the definition of **variance** and **covariance** and linearity,
$$\operatorname{Var}\Bigl(\sum_i X_i\Bigr) = \mathbb{E}\Bigl[\Bigl(\sum_i \tilde{X}_i\Bigr)^2\Bigr] = \sum_{i, j} \mathbb{E}[\tilde{X}_i \tilde{X}_j] = \sum_i \operatorname{Var}(X_i) + \sum_{i \neq j} \operatorname{Cov}(X_i, X_j),$$
and pairing $(i,j)$ with $(j,i)$ collects the off-diagonal terms into $2\sum_{i<j}\operatorname{Cov}(X_i, X_j)$. If the $X_i$ are pairwise uncorrelated every covariance vanishes; pairwise independence implies this by the factorization $\mathbb{E}[X_iX_j] = \mathbb{E}[X_i]\mathbb{E}[X_j]$ (**$\mathbb{E}[XY]=\mathbb{E}[X]\mathbb{E}[Y]$**). $\square$`,
  },
  {
    id: 'conditional-probability',
    label: 'Conditional Probability',
    title: 'Conditional Probability',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['probability-space', 'independence'],
    description: String.raw`Conditioning on an event that has occurred restricts attention to the world in which it holds and rescales so probabilities again sum to one. The conditional probability of $A$ given $B$ is the share of $B$'s probability that also lies in $A$. This is how evidence updates belief, and independence is exactly the case where conditioning changes nothing.`,
    definition: String.raw`For events $A, B \in \mathcal{F}$ with $P(B) > 0$, the **conditional probability** of $A$ **given** $B$ is
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}.$$
For fixed $B$, the map $A \mapsto P(A \mid B)$ is itself a probability measure on $(\Omega, \mathcal{F})$. Independence of $A, B$ is equivalent to $P(A \mid B) = P(A)$.`,
    proof: String.raw`**$P(\cdot \mid B)$ is a probability measure.** Since $A \cap B \subseteq B$, monotonicity gives $0 \le P(A \cap B) \le P(B)$, so $P(A \mid B) \in [0,1]$; and $P(\Omega \mid B) = P(B)/P(B) = 1$. For pairwise disjoint $A_1, A_2, \dots$, the sets $A_n \cap B$ are pairwise disjoint with union $\bigl(\bigcup_n A_n\bigr) \cap B$, so by countable additivity of $P$ (from the **probability space**),
$$P\Bigl(\bigcup_n A_n \,\Big|\, B\Bigr) = \frac{P\bigl(\bigcup_n (A_n \cap B)\bigr)}{P(B)} = \frac{\sum_n P(A_n \cap B)}{P(B)} = \sum_n P(A_n \mid B).$$
Finally, $A, B$ are independent iff $P(A \cap B) = P(A)P(B)$ iff (dividing by $P(B) > 0$) $P(A \mid B) = P(A)$. $\square$`,
  },
  {
    id: 'law-of-total-probability',
    label: 'Total Probability',
    title: 'Law of Total Probability',
    kind: 'proposition',
    tags: ['Probability'],
    dependencies: ['conditional-probability'],
    description: String.raw`To find the probability of an event, split the sample space into mutually exclusive cases, weight the conditional probability in each case by how likely that case is, and add. This averaging of conditional probabilities over a partition is the routine first step in any tree-diagram computation and the denominator in Bayes' theorem.`,
    statement: String.raw`Let $\{B_i\}_{i \in I}$ be a countable partition of $\Omega$ into events with $P(B_i) > 0$. Then for every event $A$,
$$P(A) = \sum_{i \in I} P(A \mid B_i)\, P(B_i).$$`,
    proof: String.raw`Since $\{B_i\}$ partitions $\Omega$, the events $A \cap B_i$ are pairwise disjoint with union $A = A \cap \Omega = A \cap \bigcup_i B_i = \bigcup_i (A \cap B_i)$. By countable additivity of $P$ and the definition of **conditional probability** ($P(A \cap B_i) = P(A \mid B_i)P(B_i)$),
$$P(A) = \sum_{i} P(A \cap B_i) = \sum_{i} P(A \mid B_i)\, P(B_i). \qquad \square$$`,
  },
  {
    id: 'bayes-theorem',
    label: "Bayes' Theorem",
    title: "Bayes' Theorem",
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['conditional-probability', 'law-of-total-probability'],
    description: String.raw`Bayes' theorem reverses the direction of conditioning: it computes the probability of a cause given an effect from the probability of the effect given the cause. Read as inference, it turns a prior degree of belief in a hypothesis into a posterior after observing evidence, the update weighted by how well the hypothesis predicts what was seen. Expanding the denominator by total probability spreads the posterior across competing hypotheses; this is the foundation of Bayesian statistics and much of machine learning.`,
    statement: String.raw`For events $A, B$ with $P(A), P(B) > 0$,
$$P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}.$$
If $\{A_i\}$ is a countable partition into events of positive probability and $P(B) > 0$, then for each $j$,
$$P(A_j \mid B) = \frac{P(B \mid A_j)\, P(A_j)}{\sum_i P(B \mid A_i)\, P(A_i)}.$$`,
    proof: String.raw`By the definition of **conditional probability**, both $P(A \mid B)\,P(B)$ and $P(B \mid A)\,P(A)$ equal $P(A \cap B)$. Equating them and dividing by $P(B) > 0$ gives
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B \mid A)\, P(A)}{P(B)}.$$
For the partition form, substitute $P(B) = \sum_i P(B \mid A_i)\,P(A_i)$ from the **law of total probability** into the denominator, with $A = A_j$. $\square$`,
  },
  {
    id: 'conditional-expectation',
    label: 'Conditional Expectation',
    title: 'Conditional Expectation',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation', 'sigma-algebra', 'orthogonal-projection', 'hilbert-space', 'monotone-convergence-theorem'],
    description: String.raw`Conditional expectation generalizes conditioning from a single event to a whole flow of information, modeled by a sub-$\sigma$-algebra. It is the best prediction of $X$ that can be made using only that information: a random variable, measurable with respect to the smaller $\sigma$-algebra, whose average over any event in it matches that of $X$. For square-integrable $X$ this is literally the orthogonal projection onto the subspace of variables one is allowed to see — the geometric picture that makes its existence transparent — and it is the cornerstone of martingale theory.`,
    definition: String.raw`Let $X \in L^1(\Omega, \mathcal{F}, P)$ and let $\mathcal{G} \subseteq \mathcal{F}$ be a sub-$\sigma$-algebra. A **conditional expectation** of $X$ given $\mathcal{G}$ is a random variable $\mathbb{E}[X \mid \mathcal{G}]$ that is (i) $\mathcal{G}$-measurable and integrable, and (ii) satisfies
$$\int_G \mathbb{E}[X \mid \mathcal{G}] \, dP = \int_G X \, dP \qquad \text{for every } G \in \mathcal{G}.$$
It exists and is unique up to $P$-null sets.`,
    proof: String.raw`**Existence and a.s. uniqueness.** *Uniqueness:* if $Y_1, Y_2$ are both $\mathcal{G}$-measurable and satisfy (ii), then $\int_G (Y_1 - Y_2)\,dP = 0$ for all $G \in \mathcal{G}$. Taking $G = \{Y_1 - Y_2 \ge \varepsilon\} \in \mathcal{G}$ forces $P(G) = 0$ for every $\varepsilon > 0$, and symmetrically; hence $Y_1 = Y_2$ a.s.

*Existence, $L^2$ case:* the $\mathcal{G}$-measurable square-integrable functions form a closed subspace $M = L^2(\Omega, \mathcal{G}, P)$ of the **Hilbert space** $L^2(\Omega, \mathcal{F}, P)$ (closed because an $L^2$-limit has an a.s.-convergent subsequence, whose limit is again $\mathcal{G}$-measurable). For $X \in L^2$ let $Y$ be the **orthogonal projection** of $X$ onto $M$. Then $X - Y \perp M$; since $\mathbf{1}_G \in M$ for every $G \in \mathcal{G}$, $\langle X - Y, \mathbf{1}_G\rangle = 0$, i.e. $\int_G Y\,dP = \int_G X\,dP$ — exactly (ii).

*Existence, $L^1$ case:* for $X \ge 0$ in $L^1$, the truncations $X_n = \min(X, n) \in L^2$ have conditional expectations $Y_n$ that are a.s. nondecreasing (apply the $L^2$ case to $X_{n+1} - X_n \ge 0$ and use that the projection is monotone on non-negative inputs); set $Y = \lim_n Y_n$, which is $\mathcal{G}$-measurable, and pass to the limit in (ii) by the **monotone convergence theorem** on each $G$. A general $X \in L^1$ splits as $X^+ - X^-$, and $\mathbb{E}[X \mid \mathcal{G}] := \mathbb{E}[X^+ \mid \mathcal{G}] - \mathbb{E}[X^- \mid \mathcal{G}]$ satisfies (i) and (ii). $\square$`,
  },
  {
    id: 'normal-distribution',
    label: 'Normal Distribution',
    title: 'Normal (Gaussian) Distribution',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['distribution', 'expectation', 'variance'],
    description: String.raw`The normal distribution is the bell curve: symmetric about its mean, with spread set by its variance, and decaying faster than any polynomial in the tails. It is singled out among all distributions by several characterizations — it maximizes entropy for a fixed variance, sums of independent normals stay normal — but its commanding role comes from the central limit theorem, which makes it the universal limit of standardized sums. The standard normal $\mathcal{N}(0,1)$ is the case of mean $0$ and variance $1$.`,
    definition: String.raw`The **normal** (Gaussian) **distribution** $\mathcal{N}(\mu, \sigma^2)$, with $\mu \in \mathbb{R}$ and $\sigma > 0$, is the absolutely continuous law with density
$$\varphi_{\mu, \sigma^2}(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\!\Bigl(-\frac{(x - \mu)^2}{2\sigma^2}\Bigr), \qquad x \in \mathbb{R}.$$
A random variable $X \sim \mathcal{N}(\mu, \sigma^2)$ has $\mathbb{E}[X] = \mu$ and $\operatorname{Var}(X) = \sigma^2$. The **standard normal** is $\mathcal{N}(0, 1)$, density $\varphi(x) = \tfrac{1}{\sqrt{2\pi}} e^{-x^2/2}$.`,
    proof: String.raw`**$\varphi_{\mu,\sigma^2}$ is a probability density with the stated mean and variance.** It is non-negative; for total mass, substitute $u = (x - \mu)/\sigma$ to reduce to the standard case, and use the Gaussian integral $\int_{\mathbb{R}} e^{-u^2/2}\,du = \sqrt{2\pi}$ (squaring it and passing to polar coordinates over $\mathbb{R}^2$ gives $\int\!\!\int e^{-(u^2+v^2)/2}\,du\,dv = \int_0^{2\pi}\!\!\int_0^\infty e^{-r^2/2} r\,dr\,d\theta = 2\pi$). Hence $\int \varphi_{\mu,\sigma^2} = 1$. With $u = (x-\mu)/\sigma$, $\mathbb{E}[X] = \int x\,\varphi_{\mu,\sigma^2}(x)\,dx = \mu + \sigma\!\int u\,\varphi(u)\,du = \mu$, the last integral vanishing by oddness. For the variance, integrate $\int u^2 \varphi(u)\,du$ by parts ($u \cdot u\varphi(u)$, with $-\varphi'(u) = u\varphi(u)$) to get $\int \varphi = 1$, so $\operatorname{Var}(X) = \sigma^2 \int u^2 \varphi(u)\,du = \sigma^2$. $\square$`,
  },
  {
    id: 'characteristic-function',
    label: 'Characteristic Function',
    title: 'Characteristic Function',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['expectation', 'distribution', 'normal-distribution', 'independence', 'product-of-independent-expectations', 'dominated-convergence-theorem'],
    description: String.raw`The characteristic function is the Fourier transform of a distribution: the expected value of $e^{itX}$ as a function of the frequency $t$. Always defined (the integrand is bounded), it determines the law uniquely, turns sums of independent variables into products, and encodes moments in its derivatives at the origin. These properties make it the standard analytic tool for proving limit theorems, the central limit theorem chief among them.`,
    definition: String.raw`The **characteristic function** of a random variable $X$ (with law $\mu_X$) is
$$\phi_X(t) = \mathbb{E}\bigl[e^{itX}\bigr] = \int_{\mathbb{R}} e^{itx}\, d\mu_X(x), \qquad t \in \mathbb{R}.$$
It satisfies $\phi_X(0) = 1$, $|\phi_X(t)| \le 1$, and is uniformly continuous. If $X, Y$ are independent then $\phi_{X+Y} = \phi_X \phi_Y$. If $\mathbb{E}[X^2] < \infty$ then $\phi_X$ is twice differentiable with $\phi_X'(0) = i\,\mathbb{E}[X]$ and $\phi_X''(0) = -\mathbb{E}[X^2]$. The standard normal has $\phi(t) = e^{-t^2/2}$.`,
    proof: String.raw`**Basic properties.** Since $|e^{itx}| = 1$, the integrand is bounded by the integrable constant $1$, so $\phi_X$ is everywhere defined with $|\phi_X(t)| \le \int 1\,d\mu_X = 1$ and $\phi_X(0) = 1$. Uniform continuity: $|\phi_X(t+h) - \phi_X(t)| \le \mathbb{E}|e^{ihX} - 1|$, which $\to 0$ as $h \to 0$ by the **dominated convergence theorem** (integrand bounded by $2$), independently of $t$. For independence, $e^{it(X+Y)} = e^{itX}e^{itY}$, and expanding $\mathbb{E}[e^{itX}e^{itY}] = \mathbb{E}[(\cos tX + i\sin tX)(\cos tY + i\sin tY)]$: each of $\cos(tX), \sin(tX)$ is a bounded measurable function of $X$ and hence, by **independence** of $X$ and $Y$, independent of the corresponding bounded measurable function of $Y$, so the **factorization $\mathbb{E}[UV]=\mathbb{E}[U]\mathbb{E}[V]$** applies to each of the four products and recombines to $\mathbb{E}[e^{itX}]\mathbb{E}[e^{itY}]$. Differentiation under the integral is justified by **dominated convergence** applied to the difference quotients, whose magnitudes are bounded (mean value theorem on the real and imaginary parts) by the $t$-derivative magnitudes: for the first derivative $|\partial_t e^{itx}| = |x|$, dominated by $1 + x^2 \in L^1(\mu_X)$ since $\mathbb{E}|X| \le \mathbb{E}[1 + X^2] < \infty$, giving $\phi_X'(t) = \mathbb{E}[iX e^{itX}]$; differentiating again, $|\partial_t(ix\,e^{itx})| = x^2 \in L^1(\mu_X)$ since $\mathbb{E}[X^2] < \infty$, giving $\phi_X''(t) = \mathbb{E}[-X^2 e^{itX}]$. Evaluate at $t = 0$. The standard-normal value $e^{-t^2/2}$ follows from the **normal distribution** density by completing the square in $\int e^{itx} e^{-x^2/2}\,dx/\sqrt{2\pi}$ (a contour shift, or solving the ODE $\phi'(t) = -t\phi(t)$ obtained by integration by parts, with $\phi(0)=1$). $\square$`,
  },
  {
    id: 'markov-inequality',
    label: "Markov's Inequality",
    title: "Markov's Inequality",
    kind: 'proposition',
    tags: ['Probability'],
    dependencies: ['expectation'],
    description: String.raw`A non-negative random variable cannot put too much mass far out, or its mean would be large: the probability of exceeding a level $a$ is at most the mean divided by $a$. This one-line tail bound, requiring only a finite mean, is the most basic such estimate and the seed from which Chebyshev's inequality and the weak law of large numbers grow.`,
    statement: String.raw`If $X \ge 0$ is a random variable and $a > 0$, then
$$P(X \ge a) \le \frac{\mathbb{E}[X]}{a}.$$`,
    proof: String.raw`On the event $\{X \ge a\}$ we have $X \ge a$, while elsewhere $X \ge 0$; in both cases $X \ge a\,\mathbf{1}_{\{X \ge a\}}$ pointwise. Taking **expectation** and using its monotonicity and linearity, together with $\mathbb{E}[\mathbf{1}_{\{X \ge a\}}] = P(X \ge a)$,
$$\mathbb{E}[X] \ge \mathbb{E}\bigl[a\,\mathbf{1}_{\{X \ge a\}}\bigr] = a\,P(X \ge a).$$
Dividing by $a > 0$ gives the claim. $\square$`,
  },
  {
    id: 'chebyshev-inequality',
    label: "Chebyshev's Inequality",
    title: "Chebyshev's Inequality",
    kind: 'proposition',
    tags: ['Probability'],
    dependencies: ['markov-inequality', 'variance'],
    description: String.raw`Chebyshev's inequality bounds how far a random variable strays from its mean using only its variance: the probability of a deviation of $k$ standard deviations or more is at most $1/k^2$. It applies to any distribution with finite variance, distribution-free, and converts the additivity of variance into the quantitative control of fluctuations that proves the weak law of large numbers.`,
    statement: String.raw`If $X$ has finite variance and $a > 0$, then
$$P\bigl(|X - \mathbb{E}[X]| \ge a\bigr) \le \frac{\operatorname{Var}(X)}{a^2}.$$`,
    proof: String.raw`The event $\{|X - \mathbb{E}[X]| \ge a\}$ equals $\{(X - \mathbb{E}[X])^2 \ge a^2\}$. Apply **Markov's inequality** to the non-negative random variable $Y = (X - \mathbb{E}[X])^2$ at level $a^2 > 0$:
$$P\bigl(|X - \mathbb{E}[X]| \ge a\bigr) = P(Y \ge a^2) \le \frac{\mathbb{E}[Y]}{a^2} = \frac{\operatorname{Var}(X)}{a^2},$$
the last equality being the definition of **variance**. $\square$`,
  },
  {
    id: 'borel-cantelli-lemma',
    label: 'Borel–Cantelli',
    title: 'Borel–Cantelli Lemma (First)',
    kind: 'lemma',
    tags: ['Probability'],
    dependencies: ['probability-space'],
    description: String.raw`If the probabilities of a sequence of events have a finite sum, then with probability one only finitely many of them occur. The intuition is that the expected number of occurrences is finite, so the count cannot be infinite except on a null set. This is the standard route from a convergent series of tail bounds to an almost-sure conclusion, and it is the key step in the fourth-moment proof of the strong law of large numbers.`,
    statement: String.raw`Let $A_1, A_2, \dots$ be events with $\sum_{n} P(A_n) < \infty$. Then
$$P\bigl(A_n \text{ occurs for infinitely many } n\bigr) = P\Bigl(\bigcap_{m \ge 1} \bigcup_{n \ge m} A_n\Bigr) = 0.$$`,
    proof: String.raw`Let $A = \bigcap_{m} \bigcup_{n \ge m} A_n$ be the event that infinitely many $A_n$ occur. For each $m$, $A \subseteq \bigcup_{n \ge m} A_n$, so by monotonicity and countable subadditivity of the probability measure (from the **probability space**),
$$P(A) \le P\Bigl(\bigcup_{n \ge m} A_n\Bigr) \le \sum_{n \ge m} P(A_n).$$
Since $\sum_n P(A_n) < \infty$, its tail $\sum_{n \ge m} P(A_n) \to 0$ as $m \to \infty$. As $P(A)$ is bounded above by every tail, $P(A) = 0$. $\square$`,
  },
  {
    id: 'convergence-of-random-variables',
    label: 'Convergence of RVs',
    title: 'Convergence of Random Variables',
    kind: 'definition',
    tags: ['Probability'],
    dependencies: ['random-variable', 'almost-everywhere', 'distribution', 'expectation', 'markov-inequality'],
    description: String.raw`A sequence of random variables can approach a limit in several inequivalent senses, and the limit theorems are statements about which sense holds. Almost-sure convergence is pointwise off a null set; $L^p$ convergence is convergence of the $p$-th mean; convergence in probability says large discrepancies become unlikely; convergence in distribution asks only that the laws line up. The first two each imply convergence in probability, which implies convergence in distribution, and these are the only implications in general.`,
    definition: String.raw`Let $X_n, X$ be random variables. Then $X_n \to X$:
- **almost surely** if $P(\lim_n X_n = X) = 1$ (convergence off a null set);
- in **$L^p$** ($p \ge 1$) if $\mathbb{E}|X_n - X|^p \to 0$;
- in **probability** if $P(|X_n - X| > \varepsilon) \to 0$ for every $\varepsilon > 0$;
- in **distribution** if $F_{X_n}(x) \to F_X(x)$ at every continuity point $x$ of $F_X$.

The implications are: a.s. $\Rightarrow$ in probability; $L^p \Rightarrow$ in probability; in probability $\Rightarrow$ in distribution. No others hold in general (a.s. and $L^p$ are mutually incomparable).`,
    proof: String.raw`**$L^p \Rightarrow$ in probability** is immediate from **Markov's inequality** applied to $|X_n - X|^p$: $P(|X_n - X| > \varepsilon) = P(|X_n - X|^p > \varepsilon^p) \le \varepsilon^{-p}\,\mathbb{E}|X_n - X|^p \to 0$.

**a.s. $\Rightarrow$ in probability:** fix $\varepsilon > 0$ and set $B_m = \bigcup_{n \ge m}\{|X_n - X| > \varepsilon\}$, a decreasing sequence. If $X_n \to X$ a.s. then a.e. $\omega$ lies in only finitely many $\{|X_n - X| > \varepsilon\}$, so $\bigcap_m B_m$ is null and, by continuity of measure from above (finite measure), $P(|X_m - X| > \varepsilon) \le P(B_m) \to P(\bigcap_m B_m) = 0$.

**in probability $\Rightarrow$ in distribution:** let $x$ be a continuity point of $F_X$ and $\varepsilon > 0$. Then $\{X_n \le x\} \subseteq \{X \le x + \varepsilon\} \cup \{|X_n - X| > \varepsilon\}$, so $F_{X_n}(x) \le F_X(x + \varepsilon) + P(|X_n - X| > \varepsilon)$; symmetrically $F_X(x - \varepsilon) - P(|X_n - X| > \varepsilon) \le F_{X_n}(x)$. Letting $n \to \infty$ and then $\varepsilon \to 0$, continuity of $F_X$ at $x$ squeezes $F_{X_n}(x) \to F_X(x)$. $\square$`,
  },
  {
    id: 'levy-continuity-theorem',
    label: 'Lévy Continuity',
    title: 'Lévy Continuity Theorem',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['characteristic-function', 'convergence-of-random-variables', 'dominated-convergence-theorem'],
    description: String.raw`Convergence in distribution is equivalent to pointwise convergence of characteristic functions, provided the limiting characteristic function is continuous at the origin. This is what makes the Fourier method work: to prove a sequence of laws converges, it suffices to compute the limit of their (much more tractable) characteristic functions and check continuity at zero. It is the analytic engine of the central limit theorem.`,
    statement: String.raw`Let $X_n$ have characteristic functions $\phi_n$. If $X_n \to X$ in distribution, then $\phi_n(t) \to \phi_X(t)$ for every $t$. Conversely, if $\phi_n(t) \to \phi(t)$ for every $t$ and $\phi$ is continuous at $t = 0$, then $\phi$ is the characteristic function of some random variable $X$ and $X_n \to X$ in distribution.`,
    proof: String.raw`**Forward.** For fixed $t$, $x \mapsto e^{itx}$ is bounded and continuous, so convergence in distribution (equivalently, $\mathbb{E}[g(X_n)] \to \mathbb{E}[g(X)]$ for bounded continuous $g$ — the portmanteau characterization, applied to the real and imaginary parts of $e^{itx}$) gives $\phi_n(t) = \mathbb{E}[e^{itX_n}] \to \mathbb{E}[e^{itX}] = \phi_X(t)$.

**Converse.** First, *tightness*: from $|1 - \phi_n(t)| $ one bounds tails. Using $\frac{1}{2\delta}\int_{-\delta}^{\delta}(1 - \cos(tx))\,dt = 1 - \frac{\sin(\delta x)}{\delta x} \ge \tfrac14\,\mathbf{1}_{\{|x| \ge 2/\delta\}}$ and integrating against the law of $X_n$,
$$P\bigl(|X_n| \ge 2/\delta\bigr) \le \frac{4}{\delta}\int_{0}^{\delta}\bigl(1 - \operatorname{Re}\phi_n(t)\bigr)\,dt.$$
Because $\phi(0) = \lim \phi_n(0) = 1$ and $\phi$ is continuous at $0$, the right side can be made $< \varepsilon$ uniformly in $n$ by choosing $\delta$ small (dominated convergence in the $t$-integral, using $|\phi_n| \le 1$). Thus $\{X_n\}$ is **tight**. By Helly's selection theorem every subsequence has a further subsequence converging in distribution to some law $\nu$; by the forward direction its characteristic function is $\lim \phi_n = \phi$, so $\phi$ is the characteristic function of $\nu$ and, by the **uniqueness** of characteristic functions (Fourier inversion: $\phi$ determines $\nu$), every convergent subsequence has the *same* limit $\nu$. A tight sequence all of whose convergent subsequences share one limit converges to that limit; hence $X_n \to X \sim \nu$ in distribution and $\phi = \phi_X$. $\square$`,
  },
  {
    id: 'law-of-large-numbers',
    label: 'Law of Large Numbers',
    title: 'Law of Large Numbers',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['expectation', 'independence', 'convergence-of-random-variables', 'chebyshev-inequality', 'variance-of-sum', 'borel-cantelli-lemma', 'markov-inequality'],
    description: String.raw`Averaging many independent copies of an experiment cancels the randomness: the sample mean converges to the true expectation. The weak law gives convergence in probability and follows in one line from Chebyshev's inequality once variances are known to add. The strong law upgrades this to almost-sure convergence — for almost every infinite sequence of outcomes the running average settles down. Together they are why long-run frequency estimates probability and why averages stabilize.`,
    statement: String.raw`Let $X_1, X_2, \dots$ be i.i.d. with common mean $\mu = \mathbb{E}[X_1]$, and put $\bar{X}_n = \frac1n\sum_{i=1}^n X_i$. **(Weak law)** If $\sigma^2 = \operatorname{Var}(X_1) < \infty$, then $\bar{X}_n \to \mu$ in probability. **(Strong law)** If $\mathbb{E}[X_1^4] < \infty$, then $\bar{X}_n \to \mu$ almost surely. (Both conclusions in fact hold assuming only $\mathbb{E}|X_1| < \infty$.)`,
    proof: String.raw`**Weak law.** By **linearity** of expectation $\mathbb{E}[\bar{X}_n] = \mu$, and since the $X_i$ are independent hence uncorrelated, **variance of a sum** gives $\operatorname{Var}(\bar{X}_n) = \frac{1}{n^2}\sum_{i=1}^n \operatorname{Var}(X_i) = \sigma^2/n$. For any $\varepsilon > 0$, **Chebyshev's inequality** yields
$$P\bigl(|\bar{X}_n - \mu| \ge \varepsilon\bigr) \le \frac{\operatorname{Var}(\bar{X}_n)}{\varepsilon^2} = \frac{\sigma^2}{n\varepsilon^2} \xrightarrow{n \to \infty} 0,$$
which is convergence in probability.

**Strong law (under $\mathbb{E}[X_1^4] < \infty$).** Center: replacing $X_i$ by $X_i - \mu$, assume $\mu = 0$. Let $S_n = \sum_{i=1}^n X_i$. Expanding $S_n^4 = \sum_{i,j,k,l} X_iX_jX_kX_l$ and taking expectations, all terms with some index appearing exactly once vanish (that factor is independent of the rest, mean $0$, and **$\mathbb{E}[XY]=\mathbb{E}[X]\mathbb{E}[Y]$** splits it off). The surviving terms are the $n$ of the form $\mathbb{E}[X_i^4]$ and the $3n(n-1)$ of the form $\mathbb{E}[X_i^2]\mathbb{E}[X_j^2]$ ($i \neq j$), so $\mathbb{E}[S_n^4] = n\,\mathbb{E}[X_1^4] + 3n(n-1)\,(\mathbb{E}[X_1^2])^2 \le C n^2$ for a constant $C$. By **Markov's inequality** applied to the non-negative variable $S_n^4$,
$$P\bigl(|\bar{X}_n| \ge \varepsilon\bigr) = P\bigl(S_n^4 \ge n^4\varepsilon^4\bigr) \le \frac{\mathbb{E}[S_n^4]}{n^4\varepsilon^4} \le \frac{C}{n^2\varepsilon^4}.$$
These probabilities are summable in $n$, so by the **Borel–Cantelli lemma** the event $\{|\bar{X}_n| \ge \varepsilon\}$ occurs for only finitely many $n$, almost surely; hence $\limsup_n |\bar{X}_n| \le \varepsilon$ a.s. Intersecting over $\varepsilon = 1/k$, $k \ge 1$ (a countable intersection of full-probability events), gives $\bar{X}_n \to 0$ a.s., i.e. $\bar{X}_n \to \mu$ almost surely. $\square$`,
  },
  {
    id: 'central-limit-theorem',
    label: 'Central Limit Theorem',
    title: 'Central Limit Theorem',
    kind: 'theorem',
    tags: ['Probability'],
    dependencies: ['normal-distribution', 'variance', 'independence', 'convergence-of-random-variables', 'characteristic-function', 'levy-continuity-theorem', 'taylor-theorem'],
    description: String.raw`Where the law of large numbers says the sample mean converges to $\mu$, the central limit theorem describes the size and shape of the residual error: scaled by $\sqrt{n}$, the deviation of the sample mean from $\mu$ is asymptotically normal, with variance the population variance. Remarkably the limit does not depend on the underlying distribution — only its mean and variance survive. This universality is why the bell curve appears throughout the sciences whenever many small independent effects accumulate.`,
    statement: String.raw`Let $X_1, X_2, \dots$ be i.i.d. with mean $\mu$ and finite variance $\sigma^2 \in (0, \infty)$, and $\bar{X}_n = \frac1n\sum_{i=1}^n X_i$. Then
$$\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} = \frac{\sum_{i=1}^n (X_i - \mu)}{\sigma\sqrt{n}} \;\xrightarrow{\;d\;}\; \mathcal{N}(0, 1).$$`,
    proof: String.raw`Center and scale: let $Y_i = (X_i - \mu)/\sigma$, so the $Y_i$ are i.i.d. with $\mathbb{E}[Y_i] = 0$, $\mathbb{E}[Y_i^2] = 1$, and the standardized sum is $Z_n = \frac{1}{\sqrt{n}}\sum_{i=1}^n Y_i$. Let $\psi$ be the common **characteristic function** of the $Y_i$. Since $\mathbb{E}[Y_i^2] < \infty$, $\psi$ is twice differentiable with $\psi(0) = 1$, $\psi'(0) = i\,\mathbb{E}[Y_1] = 0$, $\psi''(0) = -\mathbb{E}[Y_1^2] = -1$, so by Taylor's theorem with the appropriate remainder,
$$\psi(t) = 1 - \tfrac12 t^2 + o(t^2) \qquad (t \to 0).$$
By **independence** the characteristic function of $Z_n$ factorizes:
$$\phi_{Z_n}(t) = \mathbb{E}\Bigl[\exp\!\Bigl(\tfrac{it}{\sqrt{n}}\textstyle\sum_i Y_i\Bigr)\Bigr] = \prod_{i=1}^n \psi\!\Bigl(\frac{t}{\sqrt{n}}\Bigr) = \psi\!\Bigl(\frac{t}{\sqrt{n}}\Bigr)^{\!n}.$$
Fix $t$. As $n \to \infty$, $t/\sqrt{n} \to 0$, so $\psi(t/\sqrt{n}) = 1 - \frac{t^2}{2n} + o(1/n)$, and taking logarithms (valid for large $n$, where the argument is near $1$),
$$n \log \psi\!\Bigl(\frac{t}{\sqrt{n}}\Bigr) = n\Bigl(-\frac{t^2}{2n} + o(1/n)\Bigr) = -\frac{t^2}{2} + o(1) \;\longrightarrow\; -\frac{t^2}{2}.$$
Hence $\phi_{Z_n}(t) \to e^{-t^2/2}$ for every $t$, the characteristic function of $\mathcal{N}(0,1)$ (computed in the **characteristic function** node), which is continuous at $0$. By the **Lévy continuity theorem**, $Z_n \xrightarrow{d} \mathcal{N}(0,1)$. $\square$`,
  },
]
