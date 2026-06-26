import type { MathNode } from '../types'

export const STATISTICS_NODES: MathNode[] = [
  // ── Samples & estimators ───────────────────────────────────────────────────
  {
    id: 'sample-statistic',
    label: 'Sample Statistics',
    title: 'Sample Mean & Variance',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['random-variable', 'expectation'],
    definition: String.raw`The **sample mean** $\bar X = \frac1n\sum_{i=1}^n X_i$ and **sample variance** $S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar X)^2$ summarize a sample. For independent draws with mean $\mu$ and variance $\sigma^2$, $\mathbb{E}[\bar X] = \mu$ and $\operatorname{Var}(\bar X) = \sigma^2/n$, while the divisor $n - 1$ (Bessel's correction) makes $\mathbb{E}[S^2] = \sigma^2$. These are the basic statistics from which estimators and tests are built.`,
  },
  {
    id: 'sampling-distribution',
    label: 'Sampling Distribution',
    title: 'Sampling Distribution',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['sample-statistic'],
    definition: String.raw`The **sampling distribution** of a statistic is its probability distribution across repeated samples — the statistic being a random variable, since the data are. The spread of an estimator's sampling distribution is its **standard error**; for the mean of an independent sample, $\operatorname{SE}(\bar X) = \sigma/\sqrt{n}$. Every confidence interval and hypothesis test is read off some sampling distribution.`,
  },
  {
    id: 'estimator',
    label: 'Estimator',
    title: 'Estimator',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['random-variable'],
    definition: String.raw`An **estimator** $\hat{\theta} = \hat{\theta}(X_1, \dots, X_n)$ is a statistic — a function of the sample — used to infer an unknown parameter $\theta$. Being a function of random data it is itself a random variable, judged by its **bias** $\mathbb{E}[\hat{\theta}] - \theta$, its **variance**, and **consistency** ($\hat{\theta} \to \theta$ in probability as $n \to \infty$). Estimation turns data into conclusions about the distribution that produced it.`,
  },
  {
    id: 'bias-variance-tradeoff',
    label: 'Bias–Variance Tradeoff',
    title: 'Bias–Variance Tradeoff',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['estimator'],
    definition: String.raw`An estimator's **mean squared error** splits cleanly into bias and variance,
$$\mathbb{E}\bigl[(\hat\theta - \theta)^2\bigr] = \bigl(\mathbb{E}[\hat\theta] - \theta\bigr)^2 + \operatorname{Var}(\hat\theta).$$
Lowering one often raises the other, so the **bias–variance tradeoff** governs estimator and model choice: an unbiased estimator can be beaten in MSE by a slightly biased one with far smaller variance. It is the central tension of statistical learning.`,
  },

  // ── Estimation methods & efficiency ────────────────────────────────────────
  {
    id: 'maximum-likelihood-estimation',
    label: 'Maximum Likelihood',
    title: 'Maximum Likelihood Estimation',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'distribution'],
    definition: String.raw`**Maximum likelihood estimation** picks the parameter that makes the observed data most likely, maximizing the likelihood of an independent sample $L(\theta) = \prod_i f_\theta(x_i)$ (in practice its logarithm):
$$\hat{\theta}_{\mathrm{MLE}} = \arg\max_{\theta} \; \sum_i \log f_\theta(x_i).$$
Under regularity it is consistent and asymptotically normal and efficient — the default estimation principle across statistics and machine learning.`,
  },
  {
    id: 'sufficient-statistic',
    label: 'Sufficient Statistic',
    title: 'Sufficient Statistic',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'distribution'],
    definition: String.raw`A statistic $T(X)$ is **sufficient** for a parameter $\theta$ when the conditional distribution of the data given $T$ does not depend on $\theta$ — so $T$ carries all the sample's information about $\theta$. The **Fisher–Neyman factorization** characterizes it: the likelihood factors as $f_\theta(x) = g_\theta(T(x))\,h(x)$. Sufficiency lets inference work from a compressed summary rather than the full data.`,
  },
  {
    id: 'fisher-information',
    label: 'Fisher Information',
    title: 'Fisher Information',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['maximum-likelihood-estimation'],
    definition: String.raw`The **Fisher information** $I(\theta)$ measures how sharply the likelihood responds to the parameter — the variance of the **score**, the derivative of the log-likelihood:
$$I(\theta) = \mathbb{E}\!\left[\left(\frac{\partial}{\partial\theta}\log f_\theta(X)\right)^{2}\right] = -\,\mathbb{E}\!\left[\frac{\partial^2}{\partial\theta^2}\log f_\theta(X)\right],$$
the two forms agreeing under standard regularity. More information means more precise estimation: it fixes the asymptotic variance of the MLE and the Cramér–Rao bound.`,
  },
  {
    id: 'cramer-rao-bound',
    label: 'Cramér–Rao Bound',
    title: 'Cramér–Rao Bound',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['fisher-information', 'estimator'],
    definition: String.raw`Under standard regularity, the variance of any unbiased estimator of $\theta$ is at least the reciprocal of the Fisher information,
$$\operatorname{Var}(\hat\theta) \ge \frac{1}{I(\theta)}.$$
It sets a hard floor on estimation precision; an unbiased estimator meeting it is **efficient**. The maximum-likelihood estimator attains the bound asymptotically.`,
  },

  // ── Hypothesis testing ─────────────────────────────────────────────────────
  {
    id: 'hypothesis-testing',
    label: 'Hypothesis Testing',
    title: 'Hypothesis Testing',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator'],
    definition: String.raw`**Hypothesis testing** decides between a null hypothesis $H_0$ and an alternative $H_1$ using data. A test statistic is compared against its distribution under $H_0$; the **p-value** is the probability, assuming $H_0$, of an outcome at least as extreme as the one observed, and $H_0$ is rejected when the p-value falls below a chosen level $\alpha$. The framework trades off **type I** (false positive) against **type II** (false negative) error.`,
  },
  {
    id: 'statistical-power',
    label: 'Statistical Power',
    title: 'Statistical Power',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing'],
    definition: String.raw`The **power** of a test is the probability it correctly rejects a false null, $1 - \beta$, where $\beta$ is the type II error rate. Power increases with the effect size, the sample size, and the significance level $\alpha$. Choosing a sample size to guarantee adequate power against a target alternative is the heart of experimental design.`,
  },
  {
    id: 'neyman-pearson-lemma',
    label: 'Neyman–Pearson Lemma',
    title: 'Neyman–Pearson Lemma',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing'],
    definition: String.raw`Among all tests of a simple null $H_0$ against a simple alternative $H_1$ at significance level at most $\alpha$, the **likelihood-ratio test** — reject when $f_1(x)/f_0(x)$ exceeds a threshold (randomizing on the boundary to attain exact level $\alpha$) — is the most powerful. It pins down the optimal test for simple hypotheses and founds the theory of testing.`,
  },
  {
    id: 'likelihood-ratio-test',
    label: 'Likelihood-Ratio Test',
    title: 'Likelihood-Ratio Test',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'maximum-likelihood-estimation'],
    definition: String.raw`A **likelihood-ratio test** compares how well the data are explained under the null versus the unrestricted model, through
$$\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)}.$$
Small $\Lambda$ is evidence against $H_0$. By **Wilks' theorem**, under the null and standard regularity — the true parameter lying in the interior of $\Theta_0$, not on its boundary — $-2\log\Lambda$ is asymptotically chi-squared with degrees of freedom the drop in free parameters between the two nested models, a broadly applicable recipe for tests.`,
  },
  {
    id: 't-test',
    label: 't-Test',
    title: "Student's t-Test",
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing', 'normal-distribution'],
    definition: String.raw`A **t-test** assesses a hypothesis about the mean of a normal population with unknown variance, which it estimates from the sample. For an independent sample $X_1, \dots, X_n$ from $N(\mu, \sigma^2)$, the statistic
$$t = \frac{\bar X - \mu_0}{S/\sqrt{n}}$$
follows exactly a **Student's $t$-distribution** with $n - 1$ degrees of freedom under $H_0 : \mu = \mu_0$, its heavier tails accounting for the estimated variance. Variants compare two groups or paired observations.`,
  },
  {
    id: 'chi-squared-test',
    label: 'Chi-Squared Test',
    title: 'Chi-Squared Test',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['hypothesis-testing'],
    definition: String.raw`A **chi-squared test** compares observed counts $O_i$ with those expected under a null,
$$\chi^2 = \sum_i \frac{(O_i - E_i)^2}{E_i},$$
referred to a **chi-squared distribution**. It tests goodness of fit to a hypothesized distribution and independence in a contingency table; the approximation is reliable when the expected counts are not too small.`,
  },

  // ── Interval estimation ────────────────────────────────────────────────────
  {
    id: 'confidence-interval',
    label: 'Confidence Interval',
    title: 'Confidence Interval',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator'],
    definition: String.raw`A **confidence interval** is a data-computed range that covers the unknown parameter with a specified probability: a **95% confidence interval** is produced by a procedure that traps $\theta$ in $95\%$ of repeated samples,
$$P\bigl(\theta \in [\,\hat{\theta} - m,\ \hat{\theta} + m\,]\bigr) = 1 - \alpha.$$
The randomness lies in the interval, not in the fixed $\theta$ — the frequentist counterpart of a Bayesian credible interval.`,
  },

  // ── Bayesian inference ─────────────────────────────────────────────────────
  {
    id: 'bayesian-inference',
    label: 'Bayesian Inference',
    title: 'Bayesian Inference',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayes-theorem', 'distribution'],
    definition: String.raw`**Bayesian inference** treats the parameter as random, updating a **prior** $\pi(\theta)$ into a **posterior** by Bayes' theorem,
$$\pi(\theta \mid x) = \frac{f(x \mid \theta)\,\pi(\theta)}{\int f(x \mid \theta')\,\pi(\theta')\,d\theta'} \;\propto\; f(x \mid \theta)\,\pi(\theta),$$
posterior proportional to likelihood times prior. All inference — point estimates, intervals, predictions — is read from the posterior, in contrast to the frequentist treatment of $\theta$ as fixed.`,
  },
  {
    id: 'conjugate-prior',
    label: 'Conjugate Prior',
    title: 'Conjugate Prior',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayesian-inference'],
    definition: String.raw`A **conjugate prior** is a prior that yields a posterior in the same family, keeping Bayesian updates in closed form. The Beta family is conjugate to the binomial likelihood, the Gamma to the Poisson, and the normal to a normal mean with known variance. Conjugacy reduces updating to bookkeeping on the hyperparameters and was the workhorse of Bayesian computation before modern sampling methods.`,
  },
  {
    id: 'credible-interval',
    label: 'Credible Interval',
    title: 'Credible Interval',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['bayesian-inference'],
    definition: String.raw`A **credible interval** is a Bayesian interval estimate: a set carrying a specified share of the posterior probability, such as a **95% credible interval** $C$ with $P(\theta \in C \mid x) = 0.95$. Unlike a confidence interval, it makes a direct probability statement about the parameter — coherent because the Bayesian $\theta$ is itself random.`,
  },

  // ── Regression ─────────────────────────────────────────────────────────────
  {
    id: 'linear-regression',
    label: 'Linear Regression',
    title: 'Linear Regression',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator', 'expectation'],
    definition: String.raw`**Linear regression** models the conditional mean of a response as a linear function of predictors,
$$\mathbb{E}[Y \mid X] = X\beta, \qquad Y = X\beta + \varepsilon,$$
where the errors have conditional mean zero, $\mathbb{E}[\varepsilon \mid X] = 0$. Each coefficient $\beta_j$ is the change in mean response per unit change in its predictor, holding the others fixed, and fitting them turns data into a predictive and explanatory model — one of the most widely used tools in applied statistics.`,
  },
  {
    id: 'ordinary-least-squares',
    label: 'Ordinary Least Squares',
    title: 'Ordinary Least Squares',
    kind: 'theorem',
    tags: ['Statistics'],
    dependencies: ['linear-regression', 'matrix'],
    definition: String.raw`**Ordinary least squares** fits a linear regression by minimizing the squared residuals $\lVert Y - X\beta \rVert^2$. Setting the gradient to zero gives the **normal equations**, and when $X^\top X$ is invertible the closed form
$$\hat\beta = (X^\top X)^{-1} X^\top Y.$$
Geometrically $\hat Y = X\hat\beta$ is the orthogonal projection of $Y$ onto the column space of $X$. Under the Gauss–Markov assumptions it is the best linear unbiased estimator.`,
  },
  {
    id: 'logistic-regression',
    label: 'Logistic Regression',
    title: 'Logistic Regression',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['linear-regression', 'maximum-likelihood-estimation'],
    definition: String.raw`**Logistic regression** models a binary response by passing a linear predictor through the logistic function,
$$P(Y = 1 \mid X) = \frac{1}{1 + e^{-X\beta}},$$
so the **log-odds** $\log\frac{P(Y = 1 \mid X)}{P(Y = 0 \mid X)} = X\beta$ are linear in the predictors. The coefficients are fit by maximum likelihood — there is no closed form, so they are obtained numerically — making it a standard baseline for binary classification.`,
  },

  // ── Resampling ─────────────────────────────────────────────────────────────
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    title: 'Bootstrap',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['sampling-distribution', 'estimator'],
    definition: String.raw`The **bootstrap** approximates the sampling distribution of an estimator by resampling an independent (iid) sample: draw new samples of size $n$ with replacement from the observed data, recompute the estimator on each, and treat the spread of these replicates as a stand-in for the true sampling distribution. Because the empirical distribution substitutes for the unknown one, it delivers standard errors and confidence intervals without assuming a parametric form for the data, at the cost of computation.`,
  },
]
