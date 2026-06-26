import type { MathNode } from '../types'

export const MACHINE_LEARNING_THEORY_NODES: MathNode[] = [
  // ── The learning problem ───────────────────────────────────────────────────
  {
    id: 'statistical-learning',
    label: 'Statistical Learning',
    title: 'Statistical Learning',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['estimator', 'probability-space', 'expectation'],
    description: String.raw`Learning is recast as a problem of estimation under uncertainty. Nature draws labelled examples independently from a fixed but unknown distribution; the learner sees only a finite sample and must commit to a predictor, chosen from a fixed family of candidates, that will do well on *future* draws from the same distribution. "Doing well" is measured by the expected loss — the **risk** — of the predictor, which cannot be computed because the distribution is unknown. This single setup subsumes classification, regression, and density estimation, and it is the frame in which questions like "what can be learned, and from how much data?" become precise theorems rather than heuristics.`,
    definition: String.raw`Fix an input space $\mathcal{X}$, an output space $\mathcal{Y}$, and an unknown probability distribution $\mathcal{D}$ on $\mathcal{X} \times \mathcal{Y}$. A **hypothesis** is a function $h : \mathcal{X} \to \mathcal{Y}$, and a **hypothesis class** $\mathcal{H}$ is a set of these. A **loss function** $\ell : \mathcal{Y} \times \mathcal{Y} \to [0, \infty)$ scores predictions (e.g. the $0\!-\!1$ loss $\ell(\hat y, y) = \mathbf{1}[\hat y \neq y]$). The **risk** (true error) of $h$ is the expected loss
$$R(h) = \mathbb{E}_{(x,y) \sim \mathcal{D}}\bigl[\ell(h(x), y)\bigr].$$
The learner receives a **sample** $S = ((x_1, y_1), \dots, (x_n, y_n))$ of $n$ points drawn independently from $\mathcal{D}$ and outputs a hypothesis $\hat h = A(S) \in \mathcal{H}$; the goal is small risk $R(\hat h)$. The risk is the population analogue of an empirical average, so $\hat h$ is an **estimator** of a low-risk predictor.`,
  },
  {
    id: 'empirical-risk-minimization',
    label: 'Empirical Risk Minimization',
    title: 'Empirical Risk Minimization',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['statistical-learning'],
    description: String.raw`Since the risk depends on the unknown distribution it cannot be optimized directly, but its defining expectation has an obvious sample estimate: the average loss on the training data, the **empirical risk**. Minimizing this computable surrogate over the hypothesis class is the most basic learning rule. Whether it succeeds reduces to one question — does low empirical risk guarantee low true risk? — which is the problem of generalization and the reason a hypothesis class cannot be allowed to be arbitrarily rich.`,
    definition: String.raw`Given a sample $S = ((x_i, y_i))_{i=1}^n$, the **empirical risk** of a hypothesis $h$ is the average training loss
$$\hat R_S(h) = \frac{1}{n}\sum_{i=1}^n \ell(h(x_i), y_i).$$
The **empirical risk minimization** (ERM) rule outputs any minimizer
$$\hat h_{\mathrm{ERM}} \in \operatorname*{arg\,min}_{h \in \mathcal{H}} \hat R_S(h).$$
Because the sample is drawn i.i.d. from $\mathcal{D}$, for each *fixed* $h$ the empirical risk is an unbiased estimate of the true risk, $\mathbb{E}_S[\hat R_S(h)] = R(h)$; the subtlety is that $\hat h_{\mathrm{ERM}}$ is chosen using $S$, so this unbiasedness does not transfer to it without a uniform control over $\mathcal{H}$.`,
  },
  {
    id: 'union-bound',
    label: 'Union Bound',
    title: 'Union Bound (Boole’s Inequality)',
    kind: 'proposition',
    tags: ['Machine Learning Theory'],
    dependencies: ['probability-space'],
    description: String.raw`The probability that at least one of several events occurs is never more than the sum of their individual probabilities. This crude but universally applicable inequality is the workhorse of learning theory: to control a maximum over many hypotheses one controls each hypothesis separately and pays only an additive price equal to the number of hypotheses, converting a single-hypothesis tail bound into a bound uniform over a finite class.`,
    statement: String.raw`Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space and $A_1, \dots, A_m \in \mathcal{F}$ events. Then
$$\mathbb{P}\Bigl(\bigcup_{i=1}^m A_i\Bigr) \le \sum_{i=1}^m \mathbb{P}(A_i).$$`,
    proof: String.raw`Disjointify the union. Put $B_1 = A_1$ and $B_i = A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$ for $i \ge 2$. The $B_i$ are pairwise disjoint, $B_i \subseteq A_i$, and $\bigcup_i B_i = \bigcup_i A_i$. By countable (here finite) additivity of the probability measure on disjoint sets, and monotonicity $\mathbb{P}(B_i) \le \mathbb{P}(A_i)$,
$$\mathbb{P}\Bigl(\bigcup_i A_i\Bigr) = \mathbb{P}\Bigl(\bigsqcup_i B_i\Bigr) = \sum_i \mathbb{P}(B_i) \le \sum_i \mathbb{P}(A_i).$$
Both monotonicity and additivity are immediate from the axioms of a **probability-space**. $\square$`,
  },
  {
    id: 'hoeffding-inequality',
    label: 'Hoeffding’s Inequality',
    title: 'Hoeffding’s Inequality',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['expectation', 'independence', 'markov-inequality', 'union-bound'],
    description: String.raw`An average of independent bounded random variables concentrates sharply around its mean: the probability that it deviates by more than $t$ decays like a Gaussian tail, $e^{-2nt^2/(\text{range})^2}$, with no dependence on the shape of the distributions beyond their range. Applied to per-example losses in $[0,1]$, it says the empirical risk of a *fixed* hypothesis is exponentially unlikely to be far from the true risk — the single-hypothesis fact that, combined with the union bound, yields generalization guarantees.`,
    statement: String.raw`Let $Z_1, \dots, Z_n$ be **independent** random variables with $a_i \le Z_i \le b_i$ almost surely, and let $\bar Z = \frac{1}{n}\sum_i Z_i$ with mean $\mu = \mathbb{E}[\bar Z]$. Then for every $t > 0$,
$$\mathbb{P}\bigl(\bar Z - \mu \ge t\bigr) \le \exp\!\Bigl(-\frac{2 n^2 t^2}{\sum_{i=1}^n (b_i - a_i)^2}\Bigr), \qquad \mathbb{P}\bigl(|\bar Z - \mu| \ge t\bigr) \le 2\exp\!\Bigl(-\frac{2 n^2 t^2}{\sum_{i=1}^n (b_i - a_i)^2}\Bigr).$$
In particular if every $Z_i \in [0,1]$ then $\mathbb{P}(|\bar Z - \mu| \ge t) \le 2 e^{-2 n t^2}$.`,
    proof: String.raw`The argument is the **Chernoff method**: exponentiate, then optimize. Let $X_i = Z_i - \mathbb{E}[Z_i]$, so $\sum_i X_i = n(\bar Z - \mu)$ and $\mathbb{E}[X_i] = 0$, with $X_i \in [a_i - \mathbb{E} Z_i,\, b_i - \mathbb{E} Z_i]$, an interval of width $c_i = b_i - a_i$. For any $s > 0$, **Markov's inequality** applied to the nonnegative variable $e^{s \sum_i X_i}$ gives
$$\mathbb{P}\Bigl(\sum_i X_i \ge n t\Bigr) = \mathbb{P}\bigl(e^{s\sum_i X_i} \ge e^{snt}\bigr) \le e^{-snt}\,\mathbb{E}\bigl[e^{s\sum_i X_i}\bigr] = e^{-snt}\prod_i \mathbb{E}\bigl[e^{s X_i}\bigr],$$
the last step by **independence** of the $X_i$ (the expectation of a product of independent variables factorizes). The deep input is **Hoeffding's lemma**: a mean-zero variable bounded in an interval of width $c_i$ satisfies $\mathbb{E}[e^{s X_i}] \le e^{s^2 c_i^2 / 8}$ (proved by bounding the cumulant-generating function $\psi(s) = \log\mathbb{E} e^{sX_i}$ via $\psi(0) = \psi'(0) = 0$ and $\psi''(s) \le c_i^2/4$, the variance of a $[a,b]$-supported law being at most $(b-a)^2/4$). Hence
$$\mathbb{P}\Bigl(\sum_i X_i \ge nt\Bigr) \le \exp\!\Bigl(-snt + \tfrac{s^2}{8}\sum_i c_i^2\Bigr).$$
Minimizing the exponent over $s > 0$ at $s = 4nt / \sum_i c_i^2$ yields $\exp\!\bigl(-2 n^2 t^2 / \sum_i c_i^2\bigr)$, the one-sided bound. Applying the same to $-X_i$ and adding via the union bound gives the two-sided form. $\square$`,
  },

  // ── Generalization ─────────────────────────────────────────────────────────
  {
    id: 'generalization',
    label: 'Generalization',
    title: 'Generalization',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['empirical-risk-minimization'],
    description: String.raw`The quantity that decides whether learning succeeds is the **generalization gap**: how far a hypothesis's training error can be from its true error. For a single fixed hypothesis the gap is tiny by concentration, but ERM selects its output by looking at the data, so the relevant object is the *worst* gap over the whole class — the uniform deviation. When this uniform gap is small, low training error provably entails low true error; controlling it is the central technical goal of the theory, and it is governed by the capacity of the class, not by the value of the training error.`,
    definition: String.raw`The **generalization gap** of a hypothesis $h$ on a sample $S$ is $R(h) - \hat R_S(h)$. The class $\mathcal{H}$ has the **uniform convergence** property if the worst gap is small with high probability: for all $\varepsilon, \delta > 0$ there is a sample size $n(\varepsilon, \delta)$ such that for $n \ge n(\varepsilon,\delta)$,
$$\mathbb{P}_{S \sim \mathcal{D}^n}\Bigl(\sup_{h \in \mathcal{H}}\bigl|R(h) - \hat R_S(h)\bigr| \le \varepsilon\Bigr) \ge 1 - \delta.$$
When this holds, the ERM output $\hat h$ is **almost optimal**: $R(\hat h) \le \min_{h \in \mathcal{H}} R(h) + 2\varepsilon$, because $R(\hat h) \le \hat R_S(\hat h) + \varepsilon \le \hat R_S(h^\ast) + \varepsilon \le R(h^\ast) + 2\varepsilon$ for the best $h^\ast \in \mathcal{H}$.`,
  },
  {
    id: 'finite-class-generalization',
    label: 'Finite-Class Bound',
    title: 'Uniform Convergence for Finite Classes',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['generalization', 'hoeffding-inequality', 'union-bound'],
    description: String.raw`The simplest generalization guarantee: a finite hypothesis class generalizes, with a sample requirement that grows only logarithmically in the number of hypotheses. The proof is the prototype for all of learning theory — concentration for each fixed hypothesis (Hoeffding), then a union bound to make the control simultaneous over the class. The logarithm is what makes the bound useful: even a class with exponentially many hypotheses, parameterized by $d$ bits, needs only on the order of $d$ samples.`,
    statement: String.raw`Let $\mathcal{H}$ be a finite hypothesis class with $|\mathcal{H}| = m$, and let the loss take values in $[0,1]$. For a sample $S$ of $n$ i.i.d. points and any $\delta \in (0,1)$, with probability at least $1 - \delta$,
$$\sup_{h \in \mathcal{H}}\bigl|R(h) - \hat R_S(h)\bigr| \le \sqrt{\frac{\log(2m/\delta)}{2n}}.$$
Consequently $\mathcal{H}$ has the uniform convergence property, with sample complexity $n(\varepsilon, \delta) = \big\lceil \tfrac{1}{2\varepsilon^2}\log(2m/\delta)\big\rceil$.`,
    proof: String.raw`Fix $h \in \mathcal{H}$. The per-example losses $\ell(h(x_i), y_i) \in [0,1]$ are i.i.d. with mean $R(h)$, and their average is $\hat R_S(h)$. By **Hoeffding's inequality** (case $Z_i \in [0,1]$),
$$\mathbb{P}\bigl(|R(h) - \hat R_S(h)| \ge \varepsilon\bigr) \le 2 e^{-2 n \varepsilon^2}.$$
Now make this simultaneous. The event $\{\sup_{h}|R(h) - \hat R_S(h)| \ge \varepsilon\}$ is the union over the $m$ hypotheses of the individual deviation events, so by the **union bound**
$$\mathbb{P}\Bigl(\sup_{h \in \mathcal{H}}|R(h) - \hat R_S(h)| \ge \varepsilon\Bigr) \le \sum_{h \in \mathcal{H}} 2 e^{-2 n \varepsilon^2} = 2 m\, e^{-2 n \varepsilon^2}.$$
Set the right-hand side equal to $\delta$ and solve for $\varepsilon$: $2 m e^{-2 n \varepsilon^2} = \delta \iff \varepsilon = \sqrt{\log(2m/\delta)/(2n)}$. Thus with probability $\ge 1 - \delta$ the supremum is $\le \sqrt{\log(2m/\delta)/(2n)}$, which is $\le \varepsilon$ once $n \ge \tfrac{1}{2\varepsilon^2}\log(2m/\delta)$, giving the stated sample complexity. $\square$`,
  },
  {
    id: 'overfitting-and-regularization',
    label: 'Overfitting & Regularization',
    title: 'Overfitting & Regularization',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['generalization', 'bias-variance-tradeoff'],
    description: String.raw`When a class is rich relative to the sample size the uniform gap is large, and ERM can drive training error to zero by fitting the sample's noise — the classic symptom of **overfitting**, low training error with high test error, the high-variance regime of the bias–variance tradeoff. **Regularization** is any device that shrinks the effective capacity of the class: an additive penalty on a complexity measure of the hypothesis, accepting a controlled increase in bias in exchange for a larger decrease in variance, and so a smaller generalization gap.`,
    definition: String.raw`A learning rule **overfits** when $R(\hat h) \gg \hat R_S(\hat h)$ — the generalization gap of its output is large. **Regularized risk minimization** replaces ERM by minimizing a penalized objective
$$\hat h_\lambda \in \operatorname*{arg\,min}_{h \in \mathcal{H}}\Bigl( \hat R_S(h) + \lambda\,\Omega(h)\Bigr),$$
where $\Omega$ is a complexity functional and $\lambda \ge 0$ a tuning parameter. Canonical choices for a parametric $h_w$ are the squared norm $\Omega(w) = \lVert w\rVert_2^2$ (**ridge** / Tikhonov, which keeps the objective strongly convex) and the $\ell_1$ norm $\Omega(w) = \lVert w\rVert_1$ (**lasso**, which induces sparsity); early stopping and dropout act as implicit regularizers. Increasing $\lambda$ moves the estimator along the **bias-variance-tradeoff**, raising bias while lowering variance.`,
  },

  // ── Capacity: VC theory ────────────────────────────────────────────────────
  {
    id: 'shattering-growth-function',
    label: 'Shattering & Growth',
    title: 'Shattering and the Growth Function',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['statistical-learning'],
    description: String.raw`To control the deviation supremum for an *infinite* class one replaces the count of hypotheses by the number of distinct labelings the class can realize on a finite set of points — its behavior is finite no matter how many parameters it has. A set of points is **shattered** if the class can produce every possible labeling of it; the **growth function** counts the maximum number of labelings the class achieves on any sample of a given size. This combinatorial quantity, not the cardinality of the class, is what enters the union bound after a symmetrization step.`,
    definition: String.raw`Let $\mathcal{H}$ be a class of functions $\mathcal{X} \to \{0, 1\}$. For points $x_1, \dots, x_n \in \mathcal{X}$, the **restriction** of $\mathcal{H}$ to them is the set of achievable labelings
$$\mathcal{H}|_{x_1,\dots,x_n} = \bigl\{\,(h(x_1), \dots, h(x_n)) : h \in \mathcal{H}\,\bigr\} \subseteq \{0,1\}^n.$$
The set $\{x_1, \dots, x_n\}$ is **shattered** by $\mathcal{H}$ if $\mathcal{H}|_{x_1,\dots,x_n} = \{0,1\}^n$, i.e. all $2^n$ labelings occur. The **growth function** (shatter coefficient) is the maximum number of labelings over all samples of size $n$,
$$\Pi_{\mathcal{H}}(n) = \max_{x_1, \dots, x_n \in \mathcal{X}}\bigl|\mathcal{H}|_{x_1,\dots,x_n}\bigr| \le 2^n,$$
with equality iff some $n$-set is shattered.`,
  },
  {
    id: 'vc-dimension',
    label: 'VC Dimension',
    title: 'VC Dimension',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['shattering-growth-function'],
    description: String.raw`The capacity of a binary hypothesis class is summarized by a single integer: the size of the largest point set it can shatter. A class of VC dimension $d$ can realize every labeling of some $d$ points but of no set of $d+1$ points, so $d$ measures how much arbitrary structure the class can fit. Thresholds on the line have VC dimension $1$, intervals $2$, and halfspaces in $\mathbb{R}^d$ exactly $d+1$. Finiteness of the VC dimension is the dividing line between classes that generalize and classes that do not.`,
    definition: String.raw`The **Vapnik–Chervonenkis dimension** of a class $\mathcal{H}$ of $\{0,1\}$-valued functions is
$$\mathrm{VC}(\mathcal{H}) = \sup\{\, n : \Pi_{\mathcal{H}}(n) = 2^n \,\} = \sup\{\, n : \text{some set of } n \text{ points is shattered by } \mathcal{H}\,\},$$
the largest $n$ for which **shattering-growth-function** attains its maximum $2^n$ (so $\mathrm{VC}(\mathcal{H}) = \infty$ if arbitrarily large sets are shattered). Equivalently, $d = \mathrm{VC}(\mathcal{H})$ iff some $d$-element set is shattered and no $(d{+}1)$-element set is. To show $\mathrm{VC}(\mathcal{H}) = d$ one exhibits one shattered set of size $d$ and proves *no* set of size $d+1$ can be shattered.`,
  },
  {
    id: 'sauer-shelah-lemma',
    label: 'Sauer–Shelah',
    title: 'Sauer–Shelah Lemma',
    kind: 'lemma',
    tags: ['Machine Learning Theory'],
    dependencies: ['vc-dimension', 'shattering-growth-function'],
    description: String.raw`A dramatic dichotomy: the growth function of a class is either maximal ($2^n$, the class shatters $n$ points) or it is bounded by a *polynomial* in $n$ of degree equal to the VC dimension. There is no intermediate regime such as $n^{\log n}$. This polynomial ceiling is what makes finite VC dimension powerful — it turns the count of labelings entering the union bound from exponential into polynomial, so the resulting $\log$ contributes only $d \log n$ to the sample complexity.`,
    statement: String.raw`If $\mathcal{H}$ has VC dimension $d < \infty$, then for all $n$,
$$\Pi_{\mathcal{H}}(n) \le \sum_{i=0}^{d} \binom{n}{i} \le \Bigl(\frac{e n}{d}\Bigr)^{d} \quad (n \ge d \ge 1).$$
Thus the growth function is at most polynomial of degree $d$.`,
    proof: String.raw`It suffices to bound, for any fixed points $x_1, \dots, x_n$, the number of labelings $|\mathcal{H}|_{x_1,\dots,x_n}|$ by the number of subsets of $\{x_1, \dots, x_n\}$ that are shattered by the induced set system $\mathcal{S} = \mathcal{H}|_{x_1,\dots,x_n} \subseteq \{0,1\}^n$ (viewing each labeling as a subset). The sharper claim is
$$|\mathcal{S}| \le \#\{\, T \subseteq \{x_1,\dots,x_n\} : T \text{ is shattered by } \mathcal{S}\,\}.$$
This is proved by induction on $n$ via the **shifting (down-compression)** operator: fixing a coordinate $j$, replace each labeling $a$ by the one with $a_j = 0$ unless that label is already present, reducing each value to $0$ when possible. Shifting never increases $|\mathcal{S}|$ (it is injective on the affected pairs) and never increases the family of shattered subsets, while repeated shifting in every coordinate produces a *downward-closed* family, for which $|\mathcal{S}|$ equals exactly its number of shattered subsets. Since no shattered $T$ can have $|T| > d$ (that would contradict $\mathrm{VC} = d$, using **vc-dimension**), the count of shattered subsets is at most the number of subsets of size $\le d$, namely $\sum_{i=0}^d \binom{n}{i}$. The closed-form bound $\sum_{i=0}^d \binom{n}{i} \le (en/d)^d$ for $n \ge d$ follows from $\sum_{i \le d}\binom{n}{i}(d/n)^i \le \sum_{i}\binom{n}{i}(d/n)^i = (1 + d/n)^n \le e^d$, then dividing by $(d/n)^d$. $\square$`,
  },
  {
    id: 'vc-fundamental-theorem',
    label: 'VC Uniform Convergence',
    title: 'Vapnik–Chervonenkis Uniform Convergence',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['generalization', 'vc-dimension', 'shattering-growth-function', 'sauer-shelah-lemma', 'hoeffding-inequality', 'union-bound'],
    description: String.raw`The central theorem of statistical learning theory: a binary class generalizes — its uniform convergence gap shrinks like $\sqrt{d \log n / n}$ — if and only if its VC dimension $d$ is finite. The finite-class union-bound argument is salvaged for infinite classes by two devices: **symmetrization**, which replaces the true risk by the empirical risk on a phantom second sample so that only the labelings on $2n$ actual points matter, and **Sauer–Shelah**, which bounds the number of such labelings by a polynomial. The effective number of hypotheses is then $\Pi_{\mathcal{H}}(2n) \le (2en/d)^d$ rather than infinite.`,
    statement: String.raw`Let $\mathcal{H}$ be a class of $\{0,1\}$-valued functions with VC dimension $d < \infty$, under the $0\!-\!1$ loss. There is a universal constant $C$ such that, for a sample of $n$ i.i.d. points and any $\delta \in (0,1)$, with probability at least $1 - \delta$,
$$\sup_{h \in \mathcal{H}}\bigl|R(h) - \hat R_S(h)\bigr| \le C\sqrt{\frac{d\log(n/d) + \log(1/\delta)}{n}}.$$
Hence finite VC dimension implies uniform convergence, with sample complexity $n(\varepsilon, \delta) = O\!\bigl((d + \log(1/\delta))/\varepsilon^2\bigr)$.`,
    proof: String.raw`*Sketch, naming the deep inputs.* The obstruction is that the supremum is over an infinite class, so the **union bound** cannot be applied directly. Two steps remove it.

**Symmetrization (the ghost sample).** Draw a second independent sample $S'$ of size $n$. A standard lemma shows that for $n\varepsilon^2 \ge 2$,
$$\mathbb{P}\Bigl(\sup_h |R(h) - \hat R_S(h)| \ge \varepsilon\Bigr) \le 2\,\mathbb{P}\Bigl(\sup_h |\hat R_{S}(h) - \hat R_{S'}(h)| \ge \tfrac{\varepsilon}{2}\Bigr),$$
proved by conditioning: when $\hat R_S(h)$ is far from $R(h)$, the concentration of $\hat R_{S'}(h)$ around $R(h)$ (Chebyshev/**Hoeffding's inequality**) makes $\hat R_{S'}(h)$ also far from $\hat R_S(h)$ with probability $\ge \tfrac12$. The right-hand event depends on $h$ only through its values on the $2n$ points $S \cup S'$.

**Reduction to a finite count.** On the fixed $2n$ points, $h$ ranges over at most $\Pi_{\mathcal{H}}(2n)$ distinct labelings — this is where **shattering-growth-function** enters — so the supremum over the infinite class is a maximum over at most $\Pi_{\mathcal{H}}(2n)$ effective hypotheses. Introducing random signs that swap each pair $(z_i, z_i') $ (a permutation/Rademacher argument) and applying **Hoeffding's inequality** to each fixed labeling followed by the **union bound** over the $\Pi_{\mathcal{H}}(2n)$ labelings gives
$$\mathbb{P}\Bigl(\sup_h|\hat R_S(h) - \hat R_{S'}(h)| \ge \tfrac{\varepsilon}{2}\Bigr) \le 4\,\Pi_{\mathcal{H}}(2n)\, e^{-n\varepsilon^2/8}.$$

**Plug in Sauer–Shelah.** By the **sauer-shelah-lemma**, $\Pi_{\mathcal{H}}(2n) \le (2en/d)^d$, polynomial in $n$. Setting $8\Pi_{\mathcal{H}}(2n)e^{-n\varepsilon^2/8} = \delta$ and solving for $\varepsilon$ — the polynomial contributes $d\log(n/d)$ inside a logarithm — yields the stated bound with a universal constant $C$. The converse (infinite VC dimension forbids uniform convergence) follows because a shattered set of size $n$ admits a labeling on which empirical and true risk differ by $\tfrac12$. $\square$`,
  },
  {
    id: 'pac-learning',
    label: 'PAC Learning',
    title: 'PAC Learning',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['vc-fundamental-theorem', 'vc-dimension', 'empirical-risk-minimization'],
    description: String.raw`Learnability is made into a theorem rather than a hope. A class is **probably approximately correct** learnable if some algorithm, from a sample whose size grows only polynomially as the demanded accuracy $\varepsilon$ and confidence $1-\delta$ tighten, returns with high probability a hypothesis of small error. The VC theorem makes ERM a PAC learner whenever the VC dimension is finite, and the sample complexity is governed almost exactly by the VC dimension: the fundamental theorem of statistical learning says binary classes are PAC learnable *if and only if* their VC dimension is finite.`,
    definition: String.raw`A hypothesis class $\mathcal{H}$ is **(agnostically) PAC learnable** if there is a learning algorithm $A$ and a function $n_{\mathcal{H}} : (0,1)^2 \to \mathbb{N}$, polynomial in $1/\varepsilon$ and $1/\delta$, such that for every distribution $\mathcal{D}$, every $\varepsilon, \delta \in (0,1)$, and every $n \ge n_{\mathcal{H}}(\varepsilon, \delta)$, a sample $S \sim \mathcal{D}^n$ yields
$$\mathbb{P}_S\Bigl(R(A(S)) \le \min_{h \in \mathcal{H}} R(h) + \varepsilon\Bigr) \ge 1 - \delta.$$
(In the **realizable** case, where some $h \in \mathcal{H}$ has $R(h) = 0$, the comparison term vanishes.) **Sample complexity** is the least such $n_{\mathcal{H}}$. By the **vc-fundamental-theorem**, uniform convergence makes **ERM** a PAC learner with $n_{\mathcal{H}}(\varepsilon,\delta) = O\bigl((d + \log(1/\delta))/\varepsilon^2\bigr)$ when $d = \mathrm{VC}(\mathcal{H}) < \infty$; the matching lower bound $\Omega(d/\varepsilon^2)$ shows finiteness of $d$ characterizes PAC learnability.`,
  },
  {
    id: 'no-free-lunch-theorem',
    label: 'No Free Lunch',
    title: 'No Free Lunch Theorem',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['statistical-learning', 'expectation', 'markov-inequality'],
    description: String.raw`There is no universal learner. For any algorithm there exist distributions on which it fails badly, and averaged over *all* distributions every algorithm has the same expected performance. Generalization is therefore impossible without **inductive bias** — a restriction to a hypothesis class, or a prior preference among hypotheses, encoding assumptions about which patterns are plausible. The theorem explains why algorithm choice must be matched to problem structure and why finite-VC classes, not all-functions, are the objects that can be learned.`,
    statement: String.raw`Fix the $0\!-\!1$ loss and a domain $\mathcal{X}$ with $|\mathcal{X}| = 2n$. For *every* learning algorithm $A$ that outputs a hypothesis from a sample of size $n$, there exists a distribution $\mathcal{D}$ over $\mathcal{X} \times \{0,1\}$ such that: some hypothesis has zero risk ($\min_h R(h) = 0$), yet $\mathbb{E}_{S \sim \mathcal{D}^n}[R(A(S))] \ge \tfrac{1}{4}$, and in fact $\mathbb{P}_S(R(A(S)) \ge \tfrac18) \ge \tfrac17$.`,
    proof: String.raw`Consider all $T = 2^{2n}$ functions $f : \mathcal{X} \to \{0,1\}$; each defines a deterministic, realizable distribution $\mathcal{D}_f$ uniform on $\mathcal{X}$ with label $f(x)$, for which $f$ itself has risk $0$. It suffices to lower-bound the average over these $f$ of $A$'s error, since a maximum is at least an average:
$$\max_f \mathbb{E}_{S\sim\mathcal{D}_f^n}\bigl[R(A(S))\bigr] \ge \frac{1}{T}\sum_f \mathbb{E}_{S}\bigl[R(A(S))\bigr].$$
A training sample of size $n$ touches at most $n$ of the $2n$ domain points, so at least $n$ points are **unseen**. For an unseen point $x$, the label $f(x)$ is unconstrained by $S$ — flipping it gives another function in the family agreeing with the sample's labels — so averaged over $f$ the learner's prediction $A(S)(x)$ matches $f(x)$ exactly half the time, contributing error $\tfrac12$ on each unseen point. Since at least half the domain is unseen, the **expectation** of the risk satisfies
$$\frac{1}{T}\sum_f \mathbb{E}_S[R(A(S))] \ge \frac{1}{2}\cdot\frac{1}{2} = \frac{1}{4}.$$
Hence some $f$ (i.e. some $\mathcal{D} = \mathcal{D}_f$) gives expected risk $\ge \tfrac14$ while admitting a zero-risk hypothesis. As $R(A(S)) \in [0,1]$, Markov's inequality on $1 - R$ converts the mean $\ge \tfrac14$ into the tail bound $\mathbb{P}(R(A(S)) \ge \tfrac18) \ge \tfrac17$. No algorithm escapes, since $A$ was arbitrary — the failure is forced by the absence of inductive bias. $\square$`,
  },

  // ── Kernels and SVMs ───────────────────────────────────────────────────────
  {
    id: 'reproducing-kernel-hilbert-space',
    label: 'RKHS',
    title: 'Reproducing Kernel Hilbert Space',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['hilbert-space', 'inner-product-space'],
    description: String.raw`A reproducing kernel Hilbert space is a Hilbert space of functions in which pointwise evaluation is not merely defined but *continuous* — represented by taking the inner product against a fixed function. The two-variable function recording these representers is the **reproducing kernel**, a positive-definite function that completely determines the space. RKHSs are the natural home of kernel methods: they make "evaluate the function at $x$" a bounded linear functional, which is exactly what is needed for the representer theorem and for turning a positive-definite kernel into an implicit high-dimensional feature space.`,
    definition: String.raw`Let $\mathcal{X}$ be a set. A **reproducing kernel Hilbert space** (RKHS) on $\mathcal{X}$ is a **Hilbert space** $\mathcal{H}$ of functions $f : \mathcal{X} \to \mathbb{R}$ in which, for every $x \in \mathcal{X}$, the evaluation functional $\mathrm{ev}_x : f \mapsto f(x)$ is bounded (continuous). A symmetric function $k : \mathcal{X} \times \mathcal{X} \to \mathbb{R}$ is a **positive-definite kernel** if for all finite $x_1, \dots, x_m$ and reals $c_1, \dots, c_m$,
$$\sum_{i,j=1}^m c_i c_j\, k(x_i, x_j) \ge 0,$$
i.e. every Gram matrix $K = (k(x_i,x_j))$ is positive semidefinite. The **reproducing kernel** of $\mathcal{H}$ is the unique $k$ with $k(\cdot, x) \in \mathcal{H}$ and the **reproducing property** $\langle f, k(\cdot, x)\rangle_{\mathcal{H}} = f(x)$ for all $f \in \mathcal{H}$, $x \in \mathcal{X}$; such a $k$ is automatically positive-definite.`,
  },
  {
    id: 'moore-aronszajn',
    label: 'Moore–Aronszajn',
    title: 'Moore–Aronszajn Theorem',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['reproducing-kernel-hilbert-space', 'hilbert-space', 'cauchy-schwarz'],
    description: String.raw`The correspondence between positive-definite kernels and RKHSs is a bijection: every RKHS has a positive-definite reproducing kernel, and conversely *every* positive-definite kernel arises from a unique RKHS. This is what licenses the kernel trick — a kernel may be specified directly, with no explicit feature map, and the theorem guarantees a Hilbert space of features in which the kernel is the inner product. The construction builds the space from finite linear combinations of the partial kernels and completes.`,
    statement: String.raw`For every positive-definite kernel $k : \mathcal{X} \times \mathcal{X} \to \mathbb{R}$ there is a *unique* reproducing kernel Hilbert space $\mathcal{H}_k$ of functions on $\mathcal{X}$ whose reproducing kernel is $k$. Moreover there is a feature map $\phi : \mathcal{X} \to \mathcal{H}_k$, namely $\phi(x) = k(\cdot, x)$, with $k(x, y) = \langle \phi(x), \phi(y)\rangle_{\mathcal{H}_k}$.`,
    proof: String.raw`*Existence.* Let $\mathcal{H}_0 = \operatorname{span}\{\,k(\cdot, x) : x \in \mathcal{X}\,\}$, the finite linear combinations of partial kernels. Define on it
$$\Bigl\langle \sum_i a_i k(\cdot, x_i),\ \sum_j b_j k(\cdot, y_j)\Bigr\rangle = \sum_{i,j} a_i b_j\, k(x_i, y_j).$$
This is well defined (independent of the representation, since the value equals $\sum_j b_j f(y_j)$ for $f = \sum_i a_i k(\cdot,x_i)$, intrinsic to $f$) and bilinear; symmetry of $k$ makes it symmetric, and **positive-definiteness** of $k$ makes $\langle f, f\rangle \ge 0$. The reproducing property already holds on $\mathcal{H}_0$: $\langle f, k(\cdot, x)\rangle = f(x)$. The Cauchy–Schwarz inequality then gives $|f(x)|^2 = |\langle f, k(\cdot,x)\rangle|^2 \le \langle f,f\rangle\, k(x,x)$, so $\langle f, f\rangle = 0$ forces $f \equiv 0$; the form is a genuine **inner product**. Complete $\mathcal{H}_0$ to a **Hilbert space** $\mathcal{H}_k$; the bound $|f(x)| \le \sqrt{k(x,x)}\,\lVert f\rVert$ extends evaluation continuously to limits, so the completion is still a space of functions and evaluation stays bounded — it is an RKHS, and the reproducing property persists by continuity, so $k$ is its reproducing kernel. Taking $\phi(x) = k(\cdot, x)$ gives $\langle \phi(x), \phi(y)\rangle = k(x,y)$.

*Uniqueness.* If $\mathcal{H}'$ is another RKHS with kernel $k$, it must contain every $k(\cdot, x)$ and, by the reproducing property, induce the same inner product on their span $\mathcal{H}_0$; since each RKHS is the closure of that span (any $f \perp \mathcal{H}_0$ has $f(x) = \langle f, k(\cdot,x)\rangle = 0$, so $f = 0$), the two completions coincide as spaces of functions. $\square$`,
  },
  {
    id: 'kernel-method',
    label: 'Kernel Method',
    title: 'Kernel Method',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['moore-aronszajn', 'inner-product-space'],
    description: String.raw`A kernel method runs a linear algorithm in a high- or infinite-dimensional feature space without ever computing the features, by writing the algorithm entirely in terms of inner products and replacing each inner product by a kernel evaluation — the **kernel trick**. The Moore–Aronszajn theorem guarantees that any positive-definite kernel is a genuine inner product of some feature map, so linear separators, ridge regression, and principal components all acquire nonlinear versions at the cost only of evaluating $k$. The representer theorem further ensures the optimal solution lies in the span of the data's feature vectors, making the method finite-dimensional in practice.`,
    definition: String.raw`A **kernel method** is a learning algorithm whose dependence on the inputs is only through inner products $\langle \phi(x), \phi(x')\rangle$ of a feature map $\phi : \mathcal{X} \to \mathcal{H}$, each replaced by a positive-definite **kernel** $k(x, x') = \langle \phi(x), \phi(x')\rangle$ (the **kernel trick**), with $\mathcal{H}$ the RKHS supplied by the **moore-aronszajn** theorem. The **representer theorem** states that, for any regularization parameter $\lambda > 0$, any minimizer of a regularized objective $\sum_{i} \ell(f(x_i), y_i) + \lambda\lVert f\rVert_{\mathcal{H}}^2$ over the RKHS has the finite form $f = \sum_{i=1}^n \alpha_i\, k(\cdot, x_i)$: writing $f = f_\parallel + f_\perp$ with $f_\parallel \in \operatorname{span}\{k(\cdot, x_i)\}$, the perpendicular part $f_\perp$ leaves all $f(x_i) = \langle f, k(\cdot, x_i)\rangle$ unchanged yet, since $\lambda > 0$, strictly increases the objective via $\lambda\lVert f\rVert^2 = \lambda(\lVert f_\parallel\rVert^2 + \lVert f_\perp\rVert^2)$ unless $f_\perp = 0$. Standard kernels include the polynomial $k(x,x') = (\langle x, x'\rangle + c)^p$ and the Gaussian (RBF) $k(x,x') = e^{-\lVert x - x'\rVert^2/(2\sigma^2)}$.`,
  },
  {
    id: 'support-vector-machine',
    label: 'Support Vector Machine',
    title: 'Support Vector Machine',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['kernel-method', 'separating-hyperplane', 'convex-optimization', 'lagrangian-duality'],
    description: String.raw`Among the infinitely many hyperplanes that separate two linearly separable classes, the support vector machine selects the one of **maximum margin** — greatest distance to the nearest training points, the *support vectors*. Maximizing the margin is a convex quadratic program with a unique optimum, and large margin is precisely the quantity that controls generalization for halfspaces (a margin-based bound replaces the dimension by $1/\text{margin}^2$). Through the kernel trick the same program draws nonlinear decision boundaries, and a soft-margin variant tolerates non-separable data by penalizing violations.`,
    definition: String.raw`Given labelled data $(x_i, y_i)$ with $y_i \in \{-1, +1\}$, the **(hard-margin) support vector machine** finds the separating hyperplane $\{x : \langle w, x\rangle + b = 0\}$ maximizing the geometric **margin** $1/\lVert w\rVert$, equivalently solving the convex quadratic program
$$\min_{w, b}\ \tfrac{1}{2}\lVert w\rVert^2 \quad \text{subject to} \quad y_i(\langle w, x_i\rangle + b) \ge 1 \ \ \forall i.$$
The constraints active at the optimum identify the **support vectors**, the points at distance exactly $1/\lVert w\rVert$. The **soft-margin** SVM relaxes the constraints with slack $\xi_i \ge 0$, minimizing $\tfrac12\lVert w\rVert^2 + C\sum_i \xi_i$ subject to $y_i(\langle w, x_i\rangle + b) \ge 1 - \xi_i$. Both are instances of **convex-optimization**; passing to the Lagrangian **dual** expresses the solution through inner products $\langle x_i, x_j\rangle$ only, so the **kernel-method** trick yields nonlinear classifiers $f(x) = \sum_i \alpha_i y_i\, k(x_i, x) + b$.`,
  },

  // ── Neural networks & optimization ─────────────────────────────────────────
  {
    id: 'neural-network',
    label: 'Neural Network',
    title: 'Neural Network',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['statistical-learning', 'linear-map'],
    description: String.raw`A neural network is a parametric function built by alternating affine maps with a fixed scalar nonlinearity, composed in layers. Even a single hidden layer of sufficient width can approximate any continuous function on a compact set to arbitrary accuracy — the universal approximation theorem — so the class is extremely expressive; depth makes the approximation parameter-efficient for structured functions. The expressiveness is also a hazard: the VC dimension grows with the parameter count, so generalization relies on implicit and explicit regularization rather than on a small hypothesis class.`,
    definition: String.raw`Fix an **activation** function $\sigma : \mathbb{R} \to \mathbb{R}$ (e.g. the ReLU $\sigma(t) = \max(0,t)$ or the logistic sigmoid). A **feedforward neural network** of depth $L$ computes $f_\theta = T_L \circ \sigma \circ T_{L-1} \circ \cdots \circ \sigma \circ T_1$, where each $T_\ell(z) = W_\ell z + b_\ell$ is an affine map (a **linear-map** plus a bias) and $\sigma$ is applied coordinatewise; the parameters are $\theta = (W_\ell, b_\ell)_{\ell=1}^L$. The intermediate vectors are **hidden layers**, their dimensions the **widths**. As a hypothesis class for **statistical-learning**, $\mathcal{H} = \{f_\theta : \theta \in \mathbb{R}^p\}$ is fit by minimizing the empirical risk over $\theta$.`,
  },
  {
    id: 'universal-approximation-theorem',
    label: 'Universal Approximation',
    title: 'Universal Approximation Theorem',
    kind: 'theorem',
    tags: ['Machine Learning Theory'],
    dependencies: ['neural-network', 'weierstrass-approximation', 'continuity', 'compactness'],
    description: String.raw`A single hidden layer suffices for arbitrary accuracy: finite sums $\sum_j c_j\,\sigma(\langle w_j, x\rangle + b_j)$, for a non-polynomial activation, are dense in the continuous functions on any compact set under the uniform norm. The theorem says nothing about *how many* neurons are needed — the width may be enormous — nor about whether training finds the approximant; it establishes only that the hypothesis class is rich enough in principle, the expressivity counterpart to the generalization and optimization questions.`,
    statement: String.raw`Let $\sigma : \mathbb{R} \to \mathbb{R}$ be continuous and **not a polynomial**. For every compact $K \subset \mathbb{R}^d$, every continuous $g : K \to \mathbb{R}$, and every $\varepsilon > 0$, there exist $N \in \mathbb{N}$, weights $w_j \in \mathbb{R}^d$, biases $b_j \in \mathbb{R}$, and coefficients $c_j \in \mathbb{R}$ with
$$\sup_{x \in K}\Bigl| g(x) - \sum_{j=1}^N c_j\,\sigma(\langle w_j, x\rangle + b_j)\Bigr| < \varepsilon.$$
That is, single-hidden-layer **neural-network**s are dense in $C(K)$ in the supremum norm.`,
    proof: String.raw`*Sketch, naming the deep inputs.* Let $\Sigma$ denote the closure in $C(K)$ of the span of the ridge functions $\{\,x \mapsto \sigma(\langle w, x\rangle + b)\,\}$; we show $\Sigma = C(K)$.

**Reduction to one dimension.** The functions $x \mapsto \langle w, x\rangle$ separate points of $K$, and ridge functions are constant along hyperplanes, so by a density argument it suffices to approximate every univariate continuous function by combinations $\sum_j c_j \sigma(a_j t + b_j)$ on a compact interval — i.e. to show single-variable $\sigma$-networks are dense in $C[\alpha,\beta]$.

**Non-polynomial activation generates polynomials.** If $\sigma$ is $C^\infty$ near some point, difference quotients $\bigl(\sigma((a+h)t+b) - \sigma(at+b)\bigr)/h \to t\,\sigma'(at+b)$ show $\Sigma$ contains derivatives in the inner parameter; iterating the difference quotients anchored at a single inner value $b_0$ puts $t \mapsto t^k \sigma^{(k)}(b_0)$ in $\Sigma$ for every $k$. The deep input here is the Leshno–Lin–Pinkus–Schocken lemma: a $C^\infty$ function that is **not a polynomial** admits one point $b_0$ at which $\sigma^{(k)}(b_0) \neq 0$ for every $k$ simultaneously (otherwise, by a Baire-category argument, $\sigma$ would agree locally with a polynomial on a dense union of intervals, forcing it to be a polynomial). Anchoring all difference quotients at that $b_0$ yields $t^k = t^k\sigma^{(k)}(b_0)/\sigma^{(k)}(b_0) \in \Sigma$ for every $k$, so $\Sigma$ contains every monomial, hence every polynomial. (For merely continuous $\sigma$, mollify by convolution to reach the smooth case, the mollified versions lying in $\Sigma$.)

**Weierstrass closes the gap.** Polynomials are dense in $C[\alpha,\beta]$ by the **weierstrass-approximation** theorem; since $\Sigma$ is closed and contains all polynomials, $\Sigma \supseteq C[\alpha,\beta]$. Lifting back to $\mathbb{R}^d$ via the separation argument and using **compactness** of $K$ (to pass from local to uniform control) and **continuity** of $g$ gives density in $C(K)$. $\square$`,
  },
  {
    id: 'backpropagation',
    label: 'Backpropagation',
    title: 'Backpropagation',
    kind: 'proposition',
    tags: ['Machine Learning Theory'],
    dependencies: ['neural-network', 'chain-rule'],
    description: String.raw`Computing the gradient of a network's loss with respect to all its weights looks daunting — there can be millions of parameters — but the chain rule, organized as a single backward sweep, computes the entire gradient at a cost comparable to one forward evaluation. The method propagates the derivative of the loss with respect to each layer's output back through the layers, reusing intermediate quantities; it is exactly reverse-mode automatic differentiation, and its efficiency is what made training deep networks feasible.`,
    statement: String.raw`For a feedforward network with layers $z^{(\ell)} = W_\ell a^{(\ell-1)} + b_\ell$, $a^{(\ell)} = \sigma(z^{(\ell)})$ ($a^{(0)} = x$, output $a^{(L)}$) and scalar loss $\mathcal{L}$, define the **error signals** $\delta^{(\ell)} = \partial \mathcal{L}/\partial z^{(\ell)}$. They satisfy the backward recursion, with $\odot$ the entrywise product,
$$\delta^{(L)} = \nabla_{a^{(L)}}\mathcal{L} \odot \sigma'(z^{(L)}), \qquad \delta^{(\ell)} = \bigl(W_{\ell+1}^{\!\top}\,\delta^{(\ell+1)}\bigr) \odot \sigma'(z^{(\ell)}),$$
and the parameter gradients are $\dfrac{\partial \mathcal{L}}{\partial W_\ell} = \delta^{(\ell)}\,(a^{(\ell-1)})^{\!\top}$ and $\dfrac{\partial \mathcal{L}}{\partial b_\ell} = \delta^{(\ell)}$. The whole gradient is computed in one forward and one backward pass, costing $O(\#\text{parameters})$.`,
    proof: String.raw`Apply the **chain-rule** along the computational graph of the **neural-network**. For the last layer, $\mathcal{L}$ depends on $z^{(L)}$ through $a^{(L)} = \sigma(z^{(L)})$ coordinatewise, so $\partial\mathcal{L}/\partial z^{(L)}_i = (\partial\mathcal{L}/\partial a^{(L)}_i)\,\sigma'(z^{(L)}_i)$, i.e. $\delta^{(L)} = \nabla_{a^{(L)}}\mathcal{L}\odot\sigma'(z^{(L)})$. For the recursion, $z^{(\ell)}$ influences $\mathcal{L}$ only through $z^{(\ell+1)} = W_{\ell+1}\sigma(z^{(\ell)}) + b_{\ell+1}$, so by the chain rule
$$\delta^{(\ell)}_i = \frac{\partial\mathcal{L}}{\partial z^{(\ell)}_i} = \sum_k \frac{\partial\mathcal{L}}{\partial z^{(\ell+1)}_k}\frac{\partial z^{(\ell+1)}_k}{\partial z^{(\ell)}_i} = \sum_k \delta^{(\ell+1)}_k\,(W_{\ell+1})_{ki}\,\sigma'(z^{(\ell)}_i),$$
which in vector form is $\delta^{(\ell)} = (W_{\ell+1}^\top\delta^{(\ell+1)})\odot\sigma'(z^{(\ell)})$. Finally $z^{(\ell)} = W_\ell a^{(\ell-1)} + b_\ell$ gives $\partial z^{(\ell)}_i/\partial (W_\ell)_{ij} = a^{(\ell-1)}_j$ and $\partial z^{(\ell)}_i/\partial (b_\ell)_i = 1$, so $\partial\mathcal{L}/\partial (W_\ell)_{ij} = \delta^{(\ell)}_i a^{(\ell-1)}_j$ and $\partial\mathcal{L}/\partial b_\ell = \delta^{(\ell)}$. Each layer is visited once forward (to store $z^{(\ell)}, a^{(\ell)}$) and once backward, so the cost is linear in the number of parameters. $\square$`,
  },
  {
    id: 'stochastic-gradient-descent',
    label: 'Stochastic Gradient Descent',
    title: 'Stochastic Gradient Descent',
    kind: 'definition',
    tags: ['Machine Learning Theory'],
    dependencies: ['gradient-descent', 'empirical-risk-minimization', 'expectation'],
    description: String.raw`Full-batch gradient descent on the empirical risk costs a pass over the entire dataset per step, which is prohibitive at scale. Stochastic gradient descent replaces the exact gradient by an unbiased estimate computed from a single example or a small **mini-batch**, taking many cheap noisy steps instead of few exact ones. The estimate is unbiased, so the iterates follow the true gradient in expectation; the noise both enables scaling to enormous data and helps the iterate escape sharp or poor minima. With momentum and per-coordinate adaptive step sizes (Adam), it is the default optimizer of modern machine learning.`,
    definition: String.raw`To minimize an empirical risk $\hat R_S(\theta) = \frac1n\sum_{i=1}^n \ell_i(\theta)$, **stochastic gradient descent** iterates, with step sizes (learning rates) $\eta_t > 0$,
$$\theta_{t+1} = \theta_t - \eta_t\, g_t, \qquad g_t = \frac{1}{|B_t|}\sum_{i \in B_t}\nabla \ell_i(\theta_t),$$
where $B_t \subseteq \{1, \dots, n\}$ is a **mini-batch** drawn (uniformly, with replacement or by shuffling) each step. The stochastic gradient is **unbiased**, $\mathbb{E}[g_t \mid \theta_t] = \nabla \hat R_S(\theta_t)$, so SGD is the **gradient-descent** iteration with the true gradient replaced by this estimate of the **empirical-risk-minimization** objective. Convergence in the convex case requires the step sizes to satisfy the **Robbins–Monro** conditions $\sum_t \eta_t = \infty$, $\sum_t \eta_t^2 < \infty$; common variants add **momentum** ($v_{t+1} = \mu v_t - \eta_t g_t$) and adaptive per-coordinate rates (**Adam**).`,
  },
]
