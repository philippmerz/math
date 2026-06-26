import type { MathNode } from '../types'

export const STATISTICS_NODES: MathNode[] = [
  // ── Samples & estimators ───────────────────────────────────────────────────
  {
    id: 'sample-statistic',
    label: 'Sample Statistics',
    title: 'Sample Mean & Variance',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['random-variable'],
    description: String.raw`Confronted with a sample $X_1, \dots, X_n$, the two summaries one reaches for first are its center and its spread. The **sample mean** averages the observations; the **sample variance** averages their squared deviations from that mean — but divides by $n-1$ rather than $n$. That curious divisor (Bessel's correction) is no accident: it is exactly what makes the sample variance an unbiased guess at the population variance, since the deviations are taken about the estimated mean rather than the true one. From these two statistics nearly every classical estimator and test is assembled.`,
    definition: String.raw`Given random variables $X_1, \dots, X_n$, the **sample mean** and **sample variance** are the statistics
$$\bar X = \frac1n\sum_{i=1}^n X_i, \qquad S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar X)^2 \quad (n \ge 2).$$
Each is a measurable function of the sample, hence itself a random variable; the **sample standard deviation** is $S = \sqrt{S^2}$. The divisor $n-1$ is **Bessel's correction**.`,
  },
  {
    id: 'sample-mean-variance-unbiased',
    label: 'Sample Moments Unbiased',
    title: 'Unbiasedness of the Sample Mean and Variance',
    kind: 'proposition',
    tags: ['Statistics'],
    dependencies: ['sample-statistic', 'expectation', 'variance', 'variance-of-sum', 'independence'],
    description: String.raw`This is the precise payoff of Bessel's correction. For independent observations drawn from a distribution with mean $\mu$ and variance $\sigma^2$, the sample mean is centered on $\mu$ and its scatter shrinks like $1/n$, while the sample variance with divisor $n-1$ is centered exactly on $\sigma^2$. Dividing instead by $n$ would systematically underestimate the variance, because the deviations are measured from the fitted mean $\bar X$ — which hugs the data more closely than the true mean does.`,
    statement: String.raw`Let $X_1, \dots, X_n$ be i.i.d. with mean $\mu = \mathbb{E}[X_1]$ and variance $\sigma^2 = \operatorname{Var}(X_1) < \infty$. Then
$$\mathbb{E}[\bar X] = \mu, \qquad \operatorname{Var}(\bar X) = \frac{\sigma^2}{n}, \qquad \mathbb{E}[S^2] = \sigma^2.$$`,
    proof: String.raw`By **linearity** of **expectation**, $\mathbb{E}[\bar X] = \frac1n\sum_{i=1}^n \mathbb{E}[X_i] = \frac1n \cdot n\mu = \mu$. The observations are independent, hence uncorrelated, so by the **variance of a sum** and the scaling rule of **variance**,
$$\operatorname{Var}(\bar X) = \frac{1}{n^2}\operatorname{Var}\Bigl(\sum_{i=1}^n X_i\Bigr) = \frac{1}{n^2}\sum_{i=1}^n \operatorname{Var}(X_i) = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}.$$
For $S^2$, expand the sum of squared deviations about the algebraic identity $\sum_i (X_i - \bar X)^2 = \sum_i (X_i - \mu)^2 - n(\bar X - \mu)^2$ (subtract and add $\mu$ inside each square and use $\sum_i (X_i - \bar X) = 0$). Taking expectations, $\mathbb{E}[(X_i - \mu)^2] = \operatorname{Var}(X_i) = \sigma^2$ and $\mathbb{E}[(\bar X - \mu)^2] = \operatorname{Var}(\bar X) = \sigma^2/n$ from the first two parts, so
$$\mathbb{E}\Bigl[\sum_i (X_i - \bar X)^2\Bigr] = n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n-1)\sigma^2.$$
Dividing by $n-1$ gives $\mathbb{E}[S^2] = \sigma^2$. $\square$`,
  },
  {
    id: 'sampling-distribution',
    label: 'Sampling Distribution',
    title: 'Sampling Distribution',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['sample-statistic', 'distribution', 'sample-mean-variance-unbiased'],
    description: String.raw`A statistic is a random variable — recompute it on a fresh sample and you get a different number — so it has a distribution of its own. That distribution, traced out by imagining the experiment repeated indefinitely, is what every confidence interval and hypothesis test is secretly reading off. Its spread, called the standard error, measures how much the statistic would wobble from sample to sample; for the sample mean of an i.i.d. sample it is $\sigma/\sqrt{n}$, the familiar fact that estimates of an average sharpen as $\sqrt{n}$.`,
    definition: String.raw`The **sampling distribution** of a statistic $T = T(X_1, \dots, X_n)$ is its law (pushforward **distribution**) $\mu_T$ as a random variable, taken over the randomness of the sample. The **standard error** of an estimator is the standard deviation of its sampling distribution, $\operatorname{SE}(T) = \sqrt{\operatorname{Var}(T)}$. For the sample mean of an i.i.d. sample with variance $\sigma^2$, $\operatorname{Var}(\bar X) = \sigma^2/n$, so $\operatorname{SE}(\bar X) = \sigma/\sqrt{n}$.`,
  },
  {
    id: 'estimator',
    label: 'Estimator',
    title: 'Estimator',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['sample-statistic', 'convergence-of-random-variables', 'expectation'],
    description: String.raw`An estimator is a rule for turning data into a guess at an unknown parameter — a statistic deliberately built to approximate $\theta$. Being a function of random data it is itself random, so we judge it not by any single value but by the shape of its sampling distribution: how far its average sits from the truth (bias), how much it scatters (variance), and whether it homes in on $\theta$ as the sample grows (consistency). These criteria are the vocabulary in which estimation theory states what makes one rule better than another.`,
    definition: String.raw`An **estimator** of a parameter $\theta$ is a statistic $\hat\theta = \hat\theta(X_1, \dots, X_n)$ — a measurable function of the sample — used to approximate $\theta$. Its **bias** is $\operatorname{Bias}(\hat\theta) = \mathbb{E}[\hat\theta] - \theta$; it is **unbiased** when $\mathbb{E}[\hat\theta] = \theta$ for all $\theta$. A sequence of estimators $\hat\theta_n$ is **(weakly) consistent** if $\hat\theta_n \to \theta$ in probability as $n \to \infty$ (in the sense of **convergence of random variables**).`,
  },
  {
    id: 'bias-variance-tradeoff',
    label: 'Bias–Variance Tradeoff',
    title: 'Bias–Variance Decomposition',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['estimator', 'expectation', 'variance'],
    description: String.raw`How wrong is an estimator, on average and in squared terms? The mean squared error answers this, and it splits with perfect cleanliness into two sources of error: a systematic part (squared bias, how far the estimator's average is from the truth) and a random part (variance, how much it jitters). The decomposition is exact, an instance of the Pythagorean identity for the $L^2$ inner product. Its consequence is the central tension of statistics: forcing bias to zero is not optimal, and a slightly biased estimator with much smaller variance can win in MSE — the logic behind shrinkage, regularization, and most of statistical learning.`,
    statement: String.raw`For an estimator $\hat\theta$ of a parameter $\theta$ with $\mathbb{E}[\hat\theta^2] < \infty$,
$$\operatorname{MSE}(\hat\theta) := \mathbb{E}\bigl[(\hat\theta - \theta)^2\bigr] = \bigl(\mathbb{E}[\hat\theta] - \theta\bigr)^2 + \operatorname{Var}(\hat\theta) = \operatorname{Bias}(\hat\theta)^2 + \operatorname{Var}(\hat\theta).$$`,
    proof: String.raw`Write $m = \mathbb{E}[\hat\theta]$, a finite constant since $\mathbb{E}[\hat\theta^2] < \infty$, and insert $\pm m$:
$$(\hat\theta - \theta)^2 = \bigl((\hat\theta - m) + (m - \theta)\bigr)^2 = (\hat\theta - m)^2 + 2(m - \theta)(\hat\theta - m) + (m - \theta)^2.$$
Take **expectation** and use its **linearity**. The cross term carries the constant $m - \theta$ outside, and $\mathbb{E}[\hat\theta - m] = \mathbb{E}[\hat\theta] - m = 0$, so it vanishes. The first term is $\mathbb{E}[(\hat\theta - m)^2] = \operatorname{Var}(\hat\theta)$ by the definition of **variance**, and the last is the constant $(m - \theta)^2 = \operatorname{Bias}(\hat\theta)^2$. Hence $\operatorname{MSE}(\hat\theta) = \operatorname{Bias}(\hat\theta)^2 + \operatorname{Var}(\hat\theta)$. $\square$`,
  },

  // ── Estimation methods & efficiency ────────────────────────────────────────
  {
    id: 'maximum-likelihood-estimation',
    label: 'Maximum Likelihood',
    title: 'Maximum Likelihood Estimation',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'distribution'],
    description: String.raw`Maximum likelihood inverts the usual question. Instead of asking how probable the data are under a fixed parameter, it fixes the data and asks which parameter would have made what was observed most probable — and reports that parameter as the estimate. Concretely one writes down the joint density of the sample as a function of $\theta$ (the likelihood), and maximizes it, almost always through its logarithm, which turns the product over independent observations into a sum. Under mild regularity the resulting estimator is consistent, asymptotically normal, and asymptotically efficient, which is why it is the default estimation principle across statistics and machine learning.`,
    definition: String.raw`Let the data $X_1, \dots, X_n$ have joint density (or mass function) $f_\theta$ depending on a parameter $\theta \in \Theta$. The **likelihood** of $\theta$ given the observations $x_1, \dots, x_n$ is $L(\theta) = f_\theta(x_1, \dots, x_n)$, viewed as a function of $\theta$; for an i.i.d. sample $L(\theta) = \prod_{i=1}^n f_\theta(x_i)$, with **log-likelihood** $\ell(\theta) = \sum_{i=1}^n \log f_\theta(x_i)$. A **maximum likelihood estimator** is any maximizer
$$\hat\theta_{\mathrm{MLE}} \in \arg\max_{\theta \in \Theta}\, L(\theta) = \arg\max_{\theta \in \Theta}\, \ell(\theta),$$
the two argmaxes agreeing because $\log$ is strictly increasing.`,
  },
  {
    id: 'sufficient-statistic',
    label: 'Sufficient Statistic',
    title: 'Sufficient Statistic',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'distribution', 'conditional-probability'],
    description: String.raw`Some functions of the data throw nothing away. A statistic is sufficient for a parameter when, once you know its value, the leftover detail in the raw data tells you nothing more about that parameter — formally, the conditional law of the data given the statistic does not depend on $\theta$. So one may compress the whole sample down to the sufficient statistic and lose no inferential information. The Fisher–Neyman factorization makes this checkable without computing any conditional distribution: it is sufficient exactly when the likelihood factors through it.`,
    definition: String.raw`A statistic $T = T(X_1, \dots, X_n)$ is **sufficient** for the parameter $\theta$ of a model $\{f_\theta\}$ if the conditional distribution of the sample given $T = t$ does not depend on $\theta$:
$$P_\theta\bigl(X_1, \dots, X_n \in A \mid T = t\bigr) \text{ is independent of } \theta \quad \text{for every } A, t.$$
Intuitively $T$ retains all information in the sample about $\theta$.`,
  },
  {
    id: 'fisher-neyman-factorization',
    label: 'Fisher–Neyman',
    title: 'Fisher–Neyman Factorization Theorem',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['sufficient-statistic', 'conditional-probability'],
    description: String.raw`This is the working criterion for sufficiency: rather than verify that a conditional distribution is free of $\theta$, one simply checks whether the likelihood splits into a piece that touches the data only through the statistic and depends on $\theta$, times a piece that does not involve $\theta$ at all. If it factors this way, the statistic is sufficient, and conversely. We prove the discrete case, where the conditional probabilities are honest ratios.`,
    statement: String.raw`For a discrete model with mass function $f_\theta(x) = P_\theta(X = x)$, a statistic $T$ is **sufficient** for $\theta$ if and only if there exist functions $g_\theta$ and $h \ge 0$ with
$$f_\theta(x) = g_\theta\bigl(T(x)\bigr)\, h(x) \qquad \text{for all } x, \theta.$$`,
    proof: String.raw`Write $A_t = \{x : T(x) = t\}$ for the level sets of $T$.

**($\Leftarrow$) Factorization implies sufficiency.** Suppose $f_\theta(x) = g_\theta(T(x))\,h(x)$. For $x \in A_t$, by the definition of **conditional probability**,
$$P_\theta(X = x \mid T = t) = \frac{P_\theta(X = x)}{P_\theta(T = t)} = \frac{g_\theta(t)\,h(x)}{\sum_{y \in A_t} g_\theta(t)\,h(y)} = \frac{h(x)}{\sum_{y \in A_t} h(y)},$$
where $g_\theta(t)$ cancels because it is constant over $A_t$. This expression does not involve $\theta$, so the conditional law of $X$ given $T$ is free of $\theta$; hence $T$ is **sufficient**.

**($\Rightarrow$) Sufficiency implies factorization.** Suppose $T$ is sufficient, and set $h(x) = P(X = x \mid T = T(x))$, which by sufficiency is the same number for every $\theta$ (so the right-hand side is genuinely $\theta$-free) and define $g_\theta(t) = P_\theta(T = t)$. For any $x$, with $t = T(x)$,
$$f_\theta(x) = P_\theta(X = x) = P_\theta(X = x \mid T = t)\,P_\theta(T = t) = h(x)\, g_\theta(t) = g_\theta(T(x))\,h(x),$$
using that $\{X = x\} \subseteq \{T = t\}$ so the joint probability is the product of conditional and marginal. This is the required factorization. $\square$`,
  },
  {
    id: 'fisher-information',
    label: 'Fisher Information',
    title: 'Fisher Information',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['maximum-likelihood-estimation', 'expectation', 'variance'],
    description: String.raw`Fisher information quantifies how much an observation tells you about a parameter — equivalently, how sharply peaked the likelihood is around the truth. It is defined as the variance of the score, the derivative of the log-likelihood with respect to $\theta$. A steep, decisive likelihood means a large score variance and so a large information, and that number directly controls how precisely $\theta$ can be estimated: it is the reciprocal of the Cramér–Rao floor on variance and the asymptotic precision of the maximum likelihood estimator. Under regularity it admits a second, often handier expression as the expected curvature of the negative log-likelihood.`,
    definition: String.raw`For a model $\{f_\theta\}$ with $f_\theta$ smooth in $\theta$, the **score** of a single observation $X$ is $U_\theta = \frac{\partial}{\partial\theta}\log f_\theta(X)$. The **Fisher information** is the variance of the score,
$$I(\theta) = \operatorname{Var}_\theta(U_\theta) = \mathbb{E}_\theta\!\left[\Bigl(\tfrac{\partial}{\partial\theta}\log f_\theta(X)\Bigr)^{\!2}\right],$$
the second equality holding because the score has mean zero under regularity (see the score identities). For an i.i.d. sample of size $n$ the total information is $n\,I(\theta)$, by additivity of variance for the independent per-observation scores.`,
  },
  {
    id: 'fisher-information-identities',
    label: 'Score Identities',
    title: 'Mean-Zero Score and the Information Equality',
    kind: 'proposition',
    tags: ['Statistics'],
    dependencies: ['fisher-information', 'expectation', 'variance'],
    description: String.raw`Two regularity facts underpin everything Fisher information does. First, the score has mean zero: averaged over the data, the slope of the log-likelihood at the true parameter is exactly zero, which is the population analogue of the likelihood equation. Second, the variance of the score equals the expected curvature of the negative log-likelihood — so the spread of the score and the average sharpness of the peak are one and the same quantity, giving the two interchangeable formulas for $I(\theta)$. Both follow from differentiating the identity that a density integrates to one, twice, under the integral sign.`,
    statement: String.raw`Assume the model $\{f_\theta\}$ is smooth in $\theta$ and that differentiation may be passed under the integral $\int f_\theta\,dx = 1$ (regularity). Then the score has mean zero and the two forms of Fisher information agree:
$$\mathbb{E}_\theta\!\left[\frac{\partial}{\partial\theta}\log f_\theta(X)\right] = 0, \qquad I(\theta) = \mathbb{E}_\theta\!\left[\Bigl(\tfrac{\partial}{\partial\theta}\log f_\theta(X)\Bigr)^{\!2}\right] = -\,\mathbb{E}_\theta\!\left[\frac{\partial^2}{\partial\theta^2}\log f_\theta(X)\right].$$`,
    proof: String.raw`Differentiate $\int f_\theta(x)\,dx = 1$ in $\theta$, passing the derivative inside:
$$0 = \frac{\partial}{\partial\theta}\int f_\theta\,dx = \int \frac{\partial f_\theta}{\partial\theta}\,dx = \int \frac{\partial \log f_\theta}{\partial\theta}\, f_\theta\,dx = \mathbb{E}_\theta\!\left[\frac{\partial}{\partial\theta}\log f_\theta(X)\right],$$
using $\frac{\partial f_\theta}{\partial\theta} = \bigl(\frac{\partial}{\partial\theta}\log f_\theta\bigr) f_\theta$. So the score has mean zero, and consequently $I(\theta) = \operatorname{Var}_\theta(U_\theta) = \mathbb{E}_\theta[U_\theta^2]$ by the definition of **variance** about a zero mean, matching the first form in the definition of **Fisher information**.

Differentiate the displayed identity $\int \bigl(\frac{\partial}{\partial\theta}\log f_\theta\bigr) f_\theta\,dx = 0$ once more in $\theta$, again under the integral:
$$0 = \int \frac{\partial^2 \log f_\theta}{\partial\theta^2}\, f_\theta\,dx + \int \frac{\partial \log f_\theta}{\partial\theta}\,\frac{\partial f_\theta}{\partial\theta}\,dx = \mathbb{E}_\theta\!\left[\frac{\partial^2 \log f_\theta}{\partial\theta^2}\right] + \mathbb{E}_\theta\!\left[\Bigl(\tfrac{\partial \log f_\theta}{\partial\theta}\Bigr)^{\!2}\right],$$
the second integral using $\frac{\partial f_\theta}{\partial\theta} = \bigl(\frac{\partial \log f_\theta}{\partial\theta}\bigr) f_\theta$ once more. Rearranging gives $\mathbb{E}_\theta[(\partial_\theta \log f_\theta)^2] = -\,\mathbb{E}_\theta[\partial_\theta^2 \log f_\theta]$, the information equality. $\square$`,
  },
  {
    id: 'cramer-rao-bound',
    label: 'Cramér–Rao Bound',
    title: 'Cramér–Rao Lower Bound',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['fisher-information', 'fisher-information-identities', 'estimator', 'cauchy-schwarz', 'expectation', 'variance', 'covariance'],
    description: String.raw`There is a hard floor on how precise an unbiased estimator can be, and it is set entirely by the Fisher information: no unbiased estimator can have variance below $1/I(\theta)$. The reason is a single application of the Cauchy–Schwarz inequality between the estimator and the score — the estimator's correlation with the score is pinned down by the unbiasedness constraint, and Cauchy–Schwarz turns that into a variance bound. An unbiased estimator that meets the floor is called efficient; the maximum likelihood estimator attains it asymptotically, which is the precise sense in which it is optimal.`,
    statement: String.raw`Let $\{f_\theta\}$ be a regular model (as in the score identities) and $\hat\theta = \hat\theta(X)$ an unbiased estimator of $\theta$ with finite variance, based on one observation $X$ (or, with $I$ replaced by $nI$, an i.i.d. sample). Then
$$\operatorname{Var}_\theta(\hat\theta) \ge \frac{1}{I(\theta)}.$$
An unbiased estimator attaining the bound is called **efficient**.`,
    proof: String.raw`Let $U_\theta = \frac{\partial}{\partial\theta}\log f_\theta(X)$ be the score. By the **score identities**, $\mathbb{E}_\theta[U_\theta] = 0$, so $\operatorname{Var}_\theta(U_\theta) = \mathbb{E}_\theta[U_\theta^2] = I(\theta)$ (the definition of **Fisher information**). Differentiate the unbiasedness identity $\mathbb{E}_\theta[\hat\theta] = \int \hat\theta(x)\, f_\theta(x)\,dx = \theta$ in $\theta$, passing the derivative under the integral:
$$1 = \int \hat\theta(x)\,\frac{\partial f_\theta}{\partial\theta}\,dx = \int \hat\theta(x)\,\Bigl(\tfrac{\partial}{\partial\theta}\log f_\theta(x)\Bigr) f_\theta(x)\,dx = \mathbb{E}_\theta[\hat\theta\, U_\theta].$$
Since $\mathbb{E}_\theta[U_\theta] = 0$, this is the **covariance**: $\operatorname{Cov}_\theta(\hat\theta, U_\theta) = \mathbb{E}_\theta[\hat\theta\,U_\theta] - \mathbb{E}_\theta[\hat\theta]\,\mathbb{E}_\theta[U_\theta] = 1$. Now apply the **Cauchy–Schwarz inequality** in the $L^2$ inner product $\langle V, W\rangle = \mathbb{E}_\theta[VW]$ to the centered variables $\hat\theta - \mathbb{E}_\theta[\hat\theta]$ and $U_\theta$:
$$1 = \operatorname{Cov}_\theta(\hat\theta, U_\theta)^2 \le \operatorname{Var}_\theta(\hat\theta)\,\operatorname{Var}_\theta(U_\theta) = \operatorname{Var}_\theta(\hat\theta)\, I(\theta).$$
Dividing by $I(\theta) > 0$ gives $\operatorname{Var}_\theta(\hat\theta) \ge 1/I(\theta)$. For an i.i.d. sample the total score is the sum of $n$ independent mean-zero per-observation scores, of total variance $nI(\theta)$, and the identical argument gives the floor $1/(nI(\theta))$. $\square$`,
  },

  // ── Hypothesis testing ─────────────────────────────────────────────────────
  {
    id: 'hypothesis-testing',
    label: 'Hypothesis Testing',
    title: 'Hypothesis Testing',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'distribution'],
    description: String.raw`Hypothesis testing is a disciplined procedure for deciding, from data, between a default claim and an alternative. One computes a test statistic, asks how surprising its value would be if the default claim (the null) were true — that surprise, quantified, is the p-value — and rejects the null when the surprise crosses a pre-set threshold $\alpha$. The framework is deliberately asymmetric: it controls the rate of false rejections (type I error) at $\alpha$, treating the null as innocent until the evidence is strong, and accepts whatever type II error (failure to reject a false null) that entails.`,
    definition: String.raw`A **hypothesis test** of a null hypothesis $H_0$ against an alternative $H_1$ partitions the sample space into a **rejection region** $R$ and its complement; $H_0$ is rejected iff the observed data fall in $R$. The **type I error** rate (**size**, **significance level**) is $\alpha = \sup_{\theta \in H_0} P_\theta(\text{reject } H_0)$, and the **type II error** rate at $\theta \in H_1$ is $\beta(\theta) = P_\theta(\text{fail to reject } H_0)$. Given a test statistic $T$ with observed value $t$, the **p-value** is the probability under $H_0$ of an outcome at least as extreme as observed, $p = \sup_{\theta \in H_0} P_\theta(T \ge t)$; one rejects when $p \le \alpha$.`,
  },
  {
    id: 'statistical-power',
    label: 'Statistical Power',
    title: 'Statistical Power',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing'],
    description: String.raw`Power is a test's ability to detect a real effect: the probability that it rejects the null when the null is in fact false. It is the complement of the type II error rate, and it is what experimental design is really optimizing — a test with low power will routinely miss true effects, however carefully its false-positive rate is controlled. Power rises with the size of the effect being detected, with the sample size (through the shrinking standard error), and with a more permissive significance level $\alpha$, and the central design question is to choose $n$ large enough to guarantee adequate power against the effect one cares about.`,
    definition: String.raw`The **power** of a hypothesis test at a particular alternative $\theta \in H_1$ is the probability of correctly rejecting $H_0$ there,
$$\operatorname{power}(\theta) = P_\theta(\text{reject } H_0) = 1 - \beta(\theta),$$
where $\beta(\theta)$ is the type II error rate. As a function of $\theta$ it is the **power function** of the test; for $\theta \in H_0$ it equals the rejection probability, bounded by the size $\alpha$.`,
  },
  {
    id: 'neyman-pearson-lemma',
    label: 'Neyman–Pearson Lemma',
    title: 'Neyman–Pearson Lemma',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'statistical-power', 'distribution'],
    description: String.raw`When both the null and the alternative pin down a single distribution, there is a uniquely best test, and it has a strikingly simple form: rank outcomes by the likelihood ratio and reject the ones where the alternative is most favored, up to whatever threshold makes the size come out to $\alpha$. The lemma proves no other test of the same size can have greater power. Its proof is a one-line swap argument: any region differing from the likelihood-ratio region trades high-ratio territory for low-ratio territory, and so cannot gain power. It is the cornerstone result that founds the theory of optimal testing.`,
    statement: String.raw`To test the simple null $H_0 : X \sim f_0$ against the simple alternative $H_1 : X \sim f_1$, fix a threshold $k \ge 0$ and consider the **likelihood-ratio test** that rejects $H_0$ on $R = \{x : f_1(x) > k\,f_0(x)\}$ (with suitable randomization on $\{f_1 = k f_0\}$ to achieve exact size $\alpha = P_0(\text{reject})$). Then among all tests of size $\le \alpha$, this test has the greatest power $P_1(\text{reject})$ — it is **most powerful** at level $\alpha$.`,
    proof: String.raw`Write $\phi(x) \in [0,1]$ for the rejection probability of the Neyman–Pearson test (so $\phi = 1$ on $R$, $\phi = 0$ where $f_1 < k f_0$, and a randomizing value on the boundary chosen to give size exactly $\alpha$), and let $\psi(x) \in [0,1]$ be any other test with size $P_0(\psi) := \int \psi f_0 \le \alpha = \int \phi f_0$. Consider the pointwise product
$$\bigl(\phi(x) - \psi(x)\bigr)\bigl(f_1(x) - k\,f_0(x)\bigr) \ge 0 \quad \text{for every } x.$$
Indeed where $f_1 > k f_0$ we have $\phi = 1 \ge \psi$, making both factors $\ge 0$; where $f_1 < k f_0$ we have $\phi = 0 \le \psi$, making both factors $\le 0$; and where $f_1 = k f_0$ the second factor is $0$. Integrating the nonnegative quantity over the sample space,
$$0 \le \int (\phi - \psi)(f_1 - k f_0)\,dx = \bigl(P_1(\phi) - P_1(\psi)\bigr) - k\bigl(P_0(\phi) - P_0(\psi)\bigr).$$
The **power** difference is $P_1(\phi) - P_1(\psi)$. Since $k \ge 0$ and $P_0(\phi) - P_0(\psi) = \alpha - P_0(\psi) \ge 0$, the term $-k(P_0(\phi) - P_0(\psi)) \le 0$, so
$$P_1(\phi) - P_1(\psi) \ge k\bigl(P_0(\phi) - P_0(\psi)\bigr) \ge 0.$$
Thus $P_1(\phi) \ge P_1(\psi)$: the likelihood-ratio test is at least as powerful as any size-$\le\alpha$ competitor. $\square$`,
  },
  {
    id: 'likelihood-ratio-test',
    label: 'Likelihood-Ratio Test',
    title: 'Generalized Likelihood-Ratio Test',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'maximum-likelihood-estimation', 'neyman-pearson-lemma'],
    description: String.raw`The generalized likelihood-ratio test extends the optimal simple-versus-simple test to composite hypotheses, where each side is a whole family of distributions. One compares the best fit achievable under the null with the best fit achievable over the full model, by maximizing the likelihood over each and taking the ratio. A ratio near one means the null's restriction costs little and is consistent with the data; a small ratio is evidence against $H_0$. Wilks' theorem supplies the calibration: under the null and standard regularity (the true parameter interior to $\Theta_0$, not on its boundary), $-2\log\Lambda$ is asymptotically chi-squared with degrees of freedom equal to the number of parameters the null fixes, giving a broadly applicable recipe for tests.`,
    definition: String.raw`For a model $\{f_\theta : \theta \in \Theta\}$ and a null $H_0 : \theta \in \Theta_0 \subseteq \Theta$, the **generalized likelihood-ratio statistic** is
$$\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)} \in [0, 1],$$
the numerator and denominator being the maximized likelihoods (the denominator at the unrestricted MLE). The test rejects $H_0$ for small $\Lambda$, equivalently for large $-2\log\Lambda$; the rejection threshold is set to achieve the desired size, using the asymptotic null distribution of $-2\log\Lambda$ (Wilks: chi-squared with degrees of freedom $\dim\Theta - \dim\Theta_0$).`,
  },
  {
    id: 'chi-squared-distribution',
    label: 'Chi-Squared Distribution',
    title: 'Chi-Squared Distribution',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['normal-distribution', 'independence', 'expectation', 'variance'],
    description: String.raw`The chi-squared distribution is what you get by adding up the squares of independent standard normal variables. It is the natural law of squared lengths and sums of squared deviations, which is why it governs the distribution of sample variances and the test statistics built from observed-minus-expected counts. Its single parameter, the degrees of freedom, is the number of independent squared normals summed; the mean equals the degrees of freedom.`,
    definition: String.raw`For an integer $k \ge 1$, the **chi-squared distribution** with $k$ **degrees of freedom**, written $\chi^2_k$, is the law of
$$Q = \sum_{i=1}^k Z_i^2, \qquad Z_1, \dots, Z_k \ \text{i.i.d.}\ \mathcal{N}(0,1).$$
A random variable $Q \sim \chi^2_k$ takes values in $[0, \infty)$ with $\mathbb{E}[Q] = k$ and $\operatorname{Var}(Q) = 2k$.`,
    proof: String.raw`**Mean and variance.** Each $Z_i \sim \mathcal{N}(0,1)$ has $\mathbb{E}[Z_i^2] = \operatorname{Var}(Z_i) = 1$ (the **normal distribution** with $\sigma^2 = 1$), so by **linearity** of expectation $\mathbb{E}[Q] = \sum_{i=1}^k \mathbb{E}[Z_i^2] = k$. For the variance, $\operatorname{Var}(Z_i^2) = \mathbb{E}[Z_i^4] - (\mathbb{E}[Z_i^2])^2 = 3 - 1 = 2$, the fourth moment $\mathbb{E}[Z_i^4] = 3$ being the standard Gaussian moment (integrate $\int z^4 \varphi(z)\,dz$ by parts twice, as in the variance computation for the **normal distribution**). The $Z_i^2$ are functions of the **independent** $Z_i$, hence independent and uncorrelated, so variances add: $\operatorname{Var}(Q) = \sum_{i=1}^k \operatorname{Var}(Z_i^2) = 2k$. $\square$`,
  },
  {
    id: 'students-t-distribution',
    label: 't-Distribution',
    title: "Student's t-Distribution",
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['normal-distribution', 'chi-squared-distribution', 'independence'],
    description: String.raw`The t-distribution arises when you standardize a normal mean but must estimate the scale from the same data rather than knowing it. Replacing the known standard deviation by a sample estimate injects extra randomness into the denominator, which fattens the tails relative to the normal — and the fewer degrees of freedom, the heavier those tails. Formally it is the law of a standard normal divided by the square root of an independent chi-squared over its degrees of freedom. As the degrees of freedom grow the estimate of scale stabilizes and the t-distribution converges to the standard normal.`,
    definition: String.raw`For an integer $\nu \ge 1$, **Student's $t$-distribution** with $\nu$ **degrees of freedom**, written $t_\nu$, is the law of
$$T = \frac{Z}{\sqrt{V/\nu}}, \qquad Z \sim \mathcal{N}(0,1),\quad V \sim \chi^2_\nu, \quad Z \perp V \ \text{(independent)}.$$
It is symmetric about $0$ with heavier tails than the standard normal; as $\nu \to \infty$, $t_\nu$ converges in distribution to $\mathcal{N}(0,1)$.`,
  },
  {
    id: 't-test',
    label: 't-Test',
    title: "Student's t-Test",
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'normal-distribution', 'sample-statistic', 'students-t-distribution', 'chi-squared-distribution'],
    description: String.raw`The t-test addresses the everyday situation of testing a hypothesis about the mean of a normal population when the variance is unknown and must be estimated from the very same sample. The natural statistic is the gap between the sample mean and the hypothesized mean, standardized by the estimated standard error $S/\sqrt{n}$. Because the denominator is random — itself an estimate — the statistic does not follow a normal law but a t-distribution with $n-1$ degrees of freedom, whose heavier tails account for the uncertainty in estimating the variance. Variants compare two groups or paired observations on the same principle.`,
    definition: String.raw`The **one-sample $t$-test** of $H_0 : \mu = \mu_0$ for an i.i.d. sample $X_1, \dots, X_n$ from $\mathcal{N}(\mu, \sigma^2)$ with $\sigma$ unknown uses the statistic
$$t = \frac{\bar X - \mu_0}{S/\sqrt{n}},$$
formed from the **sample mean** $\bar X$ and sample standard deviation $S$. Under $H_0$ this statistic has **Student's $t$-distribution** with $n-1$ degrees of freedom, $t_{n-1}$, since $\sqrt{n}(\bar X - \mu_0)/\sigma \sim \mathcal{N}(0,1)$ and $(n-1)S^2/\sigma^2 \sim \chi^2_{n-1}$ are independent for a normal sample. One rejects $H_0$ for $|t|$ exceeding the appropriate $t_{n-1}$ quantile.`,
  },
  {
    id: 'chi-squared-test',
    label: 'Chi-Squared Test',
    title: 'Pearson Chi-Squared Test',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'chi-squared-distribution'],
    description: String.raw`The chi-squared test compares counts you observed against counts you would expect under a hypothesized model, summing the squared discrepancies, each scaled by its expected size. Large total discrepancy is evidence the model is wrong. The same statistic serves two classic purposes — testing whether data fit a specified distribution (goodness of fit) and whether two categorical variables are associated (independence in a contingency table) — and in both, the statistic is asymptotically chi-squared under the null, with degrees of freedom counting the free cells minus the parameters fixed. The approximation is trustworthy only when the expected counts are not too small.`,
    definition: String.raw`Given observed counts $O_1, \dots, O_m$ in $m$ categories and the counts $E_1, \dots, E_m$ expected under a null hypothesis (with $\sum_i O_i = \sum_i E_i = n$), the **Pearson chi-squared statistic** is
$$\chi^2 = \sum_{i=1}^m \frac{(O_i - E_i)^2}{E_i}.$$
Under the null and as $n \to \infty$ (with $E_i$ not too small) it is asymptotically **chi-squared distributed**: with $\chi^2_{m-1}$ degrees of freedom for goodness of fit to a fully specified distribution, reduced by one further degree per independently estimated parameter, and $(r-1)(c-1)$ degrees of freedom for independence in an $r \times c$ contingency table. One rejects the null for large $\chi^2$.`,
  },

  // ── Interval estimation ────────────────────────────────────────────────────
  {
    id: 'confidence-interval',
    label: 'Confidence Interval',
    title: 'Confidence Interval',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'sampling-distribution'],
    description: String.raw`A confidence interval reports not a single estimate but a range, calibrated so that the procedure generating it captures the true parameter a guaranteed fraction of the time. The subtle and essential point is where the randomness lives: the parameter $\theta$ is a fixed unknown, and it is the interval — computed from random data — that varies from sample to sample. A 95% confidence interval is one whose construction succeeds in trapping $\theta$ in 95% of repeated samples; it is the frequentist counterpart of the Bayesian credible interval, and they answer subtly different questions.`,
    definition: String.raw`A **confidence interval** for a parameter $\theta$ at **confidence level** $1 - \alpha$ is a pair of statistics $L = L(X_1, \dots, X_n) \le U = U(X_1, \dots, X_n)$ such that the random interval $[L, U]$ covers $\theta$ with the prescribed probability for every value of $\theta$:
$$P_\theta\bigl(\theta \in [L, U]\bigr) \ge 1 - \alpha \qquad \text{for all } \theta.$$
The randomness is in the endpoints $L, U$ (functions of the sample), not in the fixed $\theta$. The **coverage probability** is the actual value of $P_\theta(\theta \in [L,U])$.`,
  },

  // ── Bayesian inference ─────────────────────────────────────────────────────
  {
    id: 'bayesian-inference',
    label: 'Bayesian Inference',
    title: 'Bayesian Inference',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayes-theorem', 'distribution', 'conditional-probability'],
    description: String.raw`Bayesian inference takes the bold step of treating the unknown parameter as itself random, carrying a probability distribution that encodes belief. One starts with a prior, observes data, and updates to a posterior by Bayes' theorem — the posterior is proportional to the likelihood times the prior, the normalizing constant being the marginal probability of the data. Everything one might want, point estimates, intervals, predictions, is then read off the posterior. This is a genuine departure from the frequentist stance, in which $\theta$ is a fixed constant and only the data are random.`,
    definition: String.raw`In **Bayesian inference** the parameter $\theta$ is endowed with a **prior** distribution $\pi(\theta)$. Given data $x$ with likelihood $f(x \mid \theta)$, the **posterior** is obtained by **Bayes' theorem**:
$$\pi(\theta \mid x) = \frac{f(x \mid \theta)\,\pi(\theta)}{\int f(x \mid \theta')\,\pi(\theta')\,d\theta'} \;\propto\; f(x \mid \theta)\,\pi(\theta),$$
the denominator (the **marginal likelihood** or evidence $m(x) = \int f(x\mid\theta')\pi(\theta')\,d\theta'$) being the normalizing constant. All inference is read from the posterior $\pi(\theta\mid x)$.`,
  },
  {
    id: 'conjugate-prior',
    label: 'Conjugate Prior',
    title: 'Conjugate Prior',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayesian-inference'],
    description: String.raw`A prior is conjugate to a likelihood when the posterior it produces lives in the same parametric family as the prior — so updating amounts to nothing more than adjusting the family's hyperparameters, with the functional form preserved and no integral to compute. The Beta family is conjugate to the binomial likelihood, the Gamma to the Poisson, the normal to a normal mean of known variance. Conjugacy reduced Bayesian updating to bookkeeping and was the computational workhorse of the field before modern sampling methods removed the need for closed forms.`,
    definition: String.raw`A family $\mathcal{P}$ of prior distributions is **conjugate** to a likelihood $f(x \mid \theta)$ if for every prior $\pi \in \mathcal{P}$ and every observed datum $x$ the resulting posterior $\pi(\theta \mid x) \propto f(x \mid \theta)\,\pi(\theta)$ again belongs to $\mathcal{P}$. Updating then maps the prior's hyperparameters to the posterior's, in closed form. Standard examples: Beta–Binomial, Gamma–Poisson, and Normal–Normal (normal mean, known variance).`,
  },
  {
    id: 'beta-binomial-conjugacy',
    label: 'Beta–Binomial Conjugacy',
    title: 'Conjugacy of the Beta Prior to the Binomial',
    kind: 'proposition',
    tags: ['Statistics'],
    dependencies: ['conjugate-prior', 'bayesian-inference', 'binomial-coefficient'],
    description: String.raw`Here is conjugacy made concrete in its canonical example. Put a Beta prior on a success probability and observe a binomial count of successes; the posterior is again Beta, with parameters obtained by simply adding the observed successes to the first parameter and the observed failures to the second. The proof is pure pattern-matching: the binomial likelihood and the Beta prior both contribute powers of $\theta$ and $1-\theta$, and multiplying them just adds the exponents — the normalizing constant takes care of itself, since a density is determined by its kernel.`,
    statement: String.raw`Let the success probability have prior $\theta \sim \mathrm{Beta}(a, b)$, with density $\pi(\theta) \propto \theta^{a-1}(1-\theta)^{b-1}$ on $(0,1)$ ($a, b > 0$), and let $X \mid \theta \sim \mathrm{Binomial}(n, \theta)$. Then the posterior is again Beta:
$$\theta \mid X = x \;\sim\; \mathrm{Beta}(a + x,\ b + n - x).$$`,
    proof: String.raw`The binomial likelihood is $f(x \mid \theta) = \binom{n}{x}\theta^x (1-\theta)^{n-x}$, the **binomial coefficient** $\binom{n}{x}$ not involving $\theta$. By **Bayes' theorem** (the proportionality form of **Bayesian inference**), the posterior density satisfies
$$\pi(\theta \mid x) \;\propto\; f(x \mid \theta)\,\pi(\theta) \;\propto\; \theta^x (1-\theta)^{n-x}\cdot \theta^{a-1}(1-\theta)^{b-1} = \theta^{(a+x)-1}(1-\theta)^{(b+n-x)-1},$$
where every factor free of $\theta$ (the coefficient $\binom{n}{x}$, the prior's normalizing constant, and the evidence $m(x)$) has been absorbed into the proportionality. The surviving expression is exactly the kernel of a $\mathrm{Beta}(a+x,\ b+n-x)$ density. Since a probability density on $(0,1)$ is determined by its kernel — the constant being fixed by the requirement that it integrate to $1$ — the posterior is $\mathrm{Beta}(a+x,\ b+n-x)$. Thus the Beta family is **conjugate** to the binomial, with update $(a, b) \mapsto (a + x,\ b + n - x)$. $\square$`,
  },
  {
    id: 'credible-interval',
    label: 'Credible Interval',
    title: 'Credible Interval',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayesian-inference'],
    description: String.raw`A credible interval is the Bayesian interval estimate: a region carrying a stated fraction of the posterior probability. Because the Bayesian parameter is genuinely random, the interval supports a direct probability statement — "there is a 95% probability that $\theta$ lies in $C$, given the data" — which is exactly the statement a confidence interval is famously not entitled to make. The price is that the answer depends on the prior; the reward is interpretive coherence.`,
    definition: String.raw`Given a posterior $\pi(\theta \mid x)$, a **$(1-\alpha)$ credible interval** (more generally credible set) is a set $C$ in the parameter space with posterior probability
$$P(\theta \in C \mid x) = \int_C \pi(\theta \mid x)\,d\theta = 1 - \alpha.$$
Unlike a confidence interval, this is a direct probability statement about $\theta$, valid because $\theta$ is treated as random. A common choice is the **highest posterior density** region, the smallest such $C$, comprising the most probable parameter values.`,
  },

  // ── Regression ─────────────────────────────────────────────────────────────
  {
    id: 'linear-regression',
    label: 'Linear Regression',
    title: 'Linear Regression',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'expectation', 'matrix', 'conditional-expectation'],
    description: String.raw`Linear regression models the average value of a response as a linear combination of predictors. It is a statement about the conditional mean: given the predictors, the expected response is $X\beta$, and the actual response deviates from it by a mean-zero error. Each coefficient $\beta_j$ then has a clean reading — the change in the average response per unit change in its predictor, with the others held fixed. Fitting the coefficients to data converts the model into a tool for both prediction and explanation, and it is among the most widely used methods in all of applied statistics.`,
    definition: String.raw`**Linear regression** posits, for a response $Y$ and a row vector of predictors $X = (1, x_1, \dots, x_p)$, that the conditional mean is linear in an unknown coefficient vector $\beta$:
$$\mathbb{E}[Y \mid X] = X\beta, \qquad Y = X\beta + \varepsilon, \quad \mathbb{E}[\varepsilon \mid X] = 0.$$
Stacking $n$ observations gives the **matrix** form $Y = X\beta + \varepsilon$ with $Y \in \mathbb{R}^n$, design matrix $X \in \mathbb{R}^{n\times(p+1)}$, and error vector $\varepsilon$ of conditional mean zero. The coefficient $\beta_j$ is the change in $\mathbb{E}[Y]$ per unit change in $x_j$ with the others fixed.`,
  },
  {
    id: 'ordinary-least-squares',
    label: 'Ordinary Least Squares',
    title: 'Ordinary Least Squares',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['linear-regression', 'matrix', 'orthogonal-projection'],
    description: String.raw`Ordinary least squares fits a linear regression by the most natural criterion — minimize the total squared residual. Setting the gradient of that objective to zero produces the normal equations, and when the design matrix has full column rank they solve in closed form. The geometry is illuminating: the fitted values are the orthogonal projection of the response onto the column space of the design matrix, so the residual is exactly the part of $Y$ that no linear combination of predictors can explain. This is the foundational computation of regression; the Gauss–Markov theorem then certifies its optimality.`,
    statement: String.raw`For the model $Y = X\beta + \varepsilon$ with design **matrix** $X \in \mathbb{R}^{n\times p}$ of full column rank, the least-squares objective $\beta \mapsto \lVert Y - X\beta\rVert^2$ is minimized at the unique solution of the **normal equations** $X^\top X\,\hat\beta = X^\top Y$, namely
$$\hat\beta = (X^\top X)^{-1} X^\top Y,$$
and the fitted vector $\hat Y = X\hat\beta$ is the **orthogonal projection** of $Y$ onto the column space $\operatorname{col}(X)$.`,
    proof: String.raw`Expand the objective $J(\beta) = \lVert Y - X\beta\rVert^2 = Y^\top Y - 2\beta^\top X^\top Y + \beta^\top X^\top X\,\beta$. Its gradient in $\beta$ is $\nabla J(\beta) = -2X^\top Y + 2X^\top X\beta$, and setting it to zero gives the **normal equations** $X^\top X\,\beta = X^\top Y$. Full column rank makes $X^\top X$ invertible — if $X^\top X v = 0$ then $\lVert Xv\rVert^2 = v^\top X^\top X v = 0$, so $Xv = 0$, so $v = 0$ by injectivity of $X$ — hence the unique stationary point is $\hat\beta = (X^\top X)^{-1}X^\top Y$. It is the global minimizer because $J$ is convex: its Hessian $2X^\top X$ is positive semidefinite ($v^\top X^\top X v = \lVert Xv\rVert^2 \ge 0$).

For the geometry, the residual at $\hat\beta$ satisfies $X^\top(Y - X\hat\beta) = X^\top Y - X^\top X\hat\beta = 0$, i.e. $Y - \hat Y \perp \operatorname{col}(X)$ since the columns of $X$ span that space. Thus $\hat Y = X\hat\beta \in \operatorname{col}(X)$ and $Y - \hat Y$ is orthogonal to $\operatorname{col}(X)$, which is precisely the characterization of the **orthogonal projection** of $Y$ onto $\operatorname{col}(X)$. $\square$`,
  },
  {
    id: 'gauss-markov-theorem',
    label: 'Gauss–Markov',
    title: 'Gauss–Markov Theorem',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['ordinary-least-squares', 'linear-regression', 'matrix', 'expectation', 'variance', 'variance-of-sum'],
    description: String.raw`The Gauss–Markov theorem says ordinary least squares is optimal in a precise and remarkably weak sense: among all estimators that are linear in the response and unbiased, the OLS estimator has the smallest variance — it is the best linear unbiased estimator (BLUE). Crucially, the result needs no normality, only that the errors have mean zero, common variance, and are uncorrelated. The proof shows that any competing linear unbiased estimator differs from OLS by a term uncorrelated with it, so its variance is the OLS variance plus a nonnegative penalty.`,
    statement: String.raw`Consider $Y = X\beta + \varepsilon$ with $X \in \mathbb{R}^{n\times p}$ of full column rank, where the errors satisfy $\mathbb{E}[\varepsilon] = 0$ and $\operatorname{Cov}(\varepsilon) = \sigma^2 I_n$ (mean zero, uncorrelated, common variance). The OLS estimator $\hat\beta = (X^\top X)^{-1}X^\top Y$ is the **best linear unbiased estimator**: for any matrix $C$ with $\tilde\beta = CY$ unbiased ($\mathbb{E}[\tilde\beta] = \beta$ for all $\beta$), and for every coefficient combination $a^\top\beta$,
$$\operatorname{Var}(a^\top \hat\beta) \le \operatorname{Var}(a^\top \tilde\beta).$$`,
    proof: String.raw`Write $A = (X^\top X)^{-1}X^\top$, so $\hat\beta = AY$ and $AX = I_p$. Let $\tilde\beta = CY$ be any linear estimator; unbiasedness requires $\mathbb{E}[CY] = C\mathbb{E}[Y] = CX\beta = \beta$ for all $\beta$, i.e. $CX = I_p$. Set $D = C - A$, so $DX = CX - AX = I_p - I_p = 0$.

Since $\operatorname{Cov}(Y) = \operatorname{Cov}(\varepsilon) = \sigma^2 I_n$ (the **linear regression** errors), the covariance of a linear image is $\operatorname{Cov}(MY) = \sigma^2 MM^\top$ (this is the matrix form of the **variance of a sum** with uncorrelated, equal-variance coordinates, using **linearity** of **expectation**). Thus
$$\operatorname{Cov}(\tilde\beta) = \sigma^2 CC^\top = \sigma^2 (A + D)(A + D)^\top = \sigma^2\bigl(AA^\top + AD^\top + DA^\top + DD^\top\bigr).$$
Now $A D^\top = (X^\top X)^{-1}X^\top D^\top = (X^\top X)^{-1}(DX)^\top = 0$ because $DX = 0$, and likewise $DA^\top = 0$. Hence $\operatorname{Cov}(\tilde\beta) = \sigma^2 AA^\top + \sigma^2 DD^\top = \operatorname{Cov}(\hat\beta) + \sigma^2 DD^\top$. For any vector $a$,
$$\operatorname{Var}(a^\top\tilde\beta) = a^\top\operatorname{Cov}(\tilde\beta)\,a = \operatorname{Var}(a^\top\hat\beta) + \sigma^2 a^\top DD^\top a = \operatorname{Var}(a^\top\hat\beta) + \sigma^2\lVert D^\top a\rVert^2 \ge \operatorname{Var}(a^\top\hat\beta),$$
since $\lVert D^\top a\rVert^2 \ge 0$, with equality iff $D^\top a = 0$. So OLS is BLUE. $\square$`,
  },
  {
    id: 'logistic-regression',
    label: 'Logistic Regression',
    title: 'Logistic Regression',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['linear-regression', 'maximum-likelihood-estimation'],
    description: String.raw`Logistic regression adapts the linear-model idea to a binary outcome, where modeling the probability directly as $X\beta$ would be nonsensical (it could leave $[0,1]$). The fix is to pass the linear predictor through the logistic function, squashing it into a probability, which is equivalent to saying the log-odds of the outcome are linear in the predictors. The coefficients no longer admit a closed-form least-squares solution; they are fit by maximizing the likelihood, which has no analytic optimum and is solved numerically. It is the standard baseline for binary classification.`,
    definition: String.raw`**Logistic regression** models a binary response $Y \in \{0, 1\}$ given predictors $X$ by
$$P(Y = 1 \mid X) = \sigma(X\beta) = \frac{1}{1 + e^{-X\beta}},$$
where $\sigma$ is the **logistic** (sigmoid) function. Equivalently the **log-odds** (logit) are linear, $\log\frac{P(Y=1\mid X)}{P(Y=0\mid X)} = X\beta$. The coefficients $\beta$ are estimated by **maximum likelihood**, maximizing $\ell(\beta) = \sum_i \bigl[y_i \log \sigma(x_i\beta) + (1-y_i)\log(1 - \sigma(x_i\beta))\bigr]$; this concave objective has no closed-form maximizer and is solved numerically (e.g. Newton–Raphson / iteratively reweighted least squares).`,
  },

  // ── Resampling ─────────────────────────────────────────────────────────────
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    title: 'Bootstrap',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['sampling-distribution', 'estimator', 'law-of-large-numbers', 'confidence-interval'],
    description: String.raw`The bootstrap is a strikingly simple idea for getting at the sampling distribution of an estimator when no formula is available: treat the data themselves as the population. One draws new samples of the same size by sampling with replacement from the observed data, recomputes the estimator on each, and uses the scatter of these recomputed values as a stand-in for the true sampling distribution. The empirical distribution converges to the true one (pointwise by the law of large numbers, uniformly by Glivenko–Cantelli), but that alone does not make the substitution valid — consistency additionally needs the estimator to depend smoothly on the underlying distribution. When it holds, the method delivers standard errors and confidence intervals with no parametric assumptions, at the cost of computation.`,
    definition: String.raw`Given an i.i.d. sample $X_1, \dots, X_n$ with empirical distribution $\hat F_n = \frac1n\sum_{i=1}^n \delta_{X_i}$ and an estimator $\hat\theta = \hat\theta(X_1, \dots, X_n) = \theta(\hat F_n)$ viewed as a functional of the data, the **(nonparametric) bootstrap** approximates the **sampling distribution** of $\hat\theta$ as follows: repeatedly draw a resample $X_1^{*}, \dots, X_n^{*}$ i.i.d. from $\hat F_n$ (i.e. sample the data with replacement), compute the replicate $\hat\theta^{*} = \hat\theta(X_1^{*}, \dots, X_n^{*})$, and use the distribution of $\hat\theta^{*}$ (estimated by Monte Carlo over many resamples) as a proxy. Its **bootstrap standard error** and percentile **confidence intervals** are read off these replicates. By the **law of large numbers** — uniformly, by the Glivenko–Cantelli theorem — $\hat F_n \to F$ as $n \to \infty$; bootstrap consistency for the sampling distribution of $\hat\theta$ then follows provided the functional $\theta(\cdot)$ is sufficiently smooth (e.g. Hadamard differentiable), via the functional delta method. Convergence of $\hat F_n$ alone is not sufficient: the bootstrap can fail for non-smooth functionals (e.g. the sample maximum) or under heavy tails (the sample mean when the variance is infinite).`,
  },
]
