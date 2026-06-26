import type { MathNode } from '../types'

/** Statistics — 4 nodes. */
export const STATISTICS_NODES: MathNode[] = [
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
    id: 'hypothesis-testing',
    label: 'Hypothesis Testing',
    title: 'Hypothesis Testing',
    kind: 'definition',
    tags: ['Statistics'],
    dependencies: ['estimator'],
    definition: String.raw`**Hypothesis testing** decides between a null hypothesis $H_0$ and an alternative $H_1$ using data. A test statistic is compared against its distribution under $H_0$; the **p-value** is the probability, assuming $H_0$, of an outcome at least as extreme as the one observed, and $H_0$ is rejected when the p-value falls below a chosen level $\alpha$. The framework trades off **type I** (false positive) against **type II** (false negative) error.`,
  },
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
]
