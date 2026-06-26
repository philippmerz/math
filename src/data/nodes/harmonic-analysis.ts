import type { MathNode } from '../types'

export const HARMONIC_ANALYSIS_NODES: MathNode[] = [
  // ── Fourier series on the circle ────────────────────────────────────────────
  {
    id: 'fourier-series',
    label: 'Fourier Series',
    title: 'Fourier Series',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['hilbert-basis', 'lp-space', 'lebesgue-integral'],
    description: String.raw`The founding construction of the subject: a periodic function is built out of pure oscillations — sines and cosines, packaged as complex exponentials $e^{inx}$. The frequency-$n$ amount present in $f$ is read off by integrating $f$ against $e^{-inx}$, and reassembling these amounts recovers $f$. Because the exponentials are mutually orthogonal and of unit length in the mean-square sense, this is nothing but the abstract orthonormal expansion of Hilbert space made completely concrete on the circle.`,
    definition: String.raw`Identify $2\pi$-periodic functions with functions on the circle $\mathbb{T} = \mathbb{R}/2\pi\mathbb{Z}$, equipped with normalized arclength measure $\tfrac{dx}{2\pi}$. For $f \in L^1(\mathbb{T})$ the **Fourier coefficients** are
$$\hat f(n) = c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,e^{-inx}\,dx \qquad (n \in \mathbb{Z}),$$
and the **Fourier series** of $f$ is the formal series $\sum_{n \in \mathbb{Z}} c_n\,e^{inx}$. The system $\{e_n(x) = e^{inx}\}_{n\in\mathbb{Z}}$ is **orthonormal** in $L^2(\mathbb{T})$ with the inner product $\langle f, g\rangle = \tfrac{1}{2\pi}\int_{-\pi}^{\pi} f\overline{g}\,dx$, since $\tfrac{1}{2\pi}\int_{-\pi}^{\pi} e^{i(n-m)x}\,dx = \delta_{nm}$; thus $c_n = \langle f, e_n\rangle$ and the Fourier series is the orthonormal expansion of $f$ against this system. The **partial sums** are $S_N f(x) = \sum_{|n|\le N} c_n e^{inx}$.`,
  },
  {
    id: 'riemann-lebesgue-lemma',
    label: 'Riemann–Lebesgue',
    title: 'Riemann–Lebesgue Lemma',
    kind: 'lemma',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'fourier-transform', 'lp-space', 'lebesgue-integral', 'dominated-convergence-theorem', 'simple-function'],
    description: String.raw`The high-frequency components of any integrable function die out: as the frequency runs off to infinity, the Fourier coefficient (or the Fourier transform at large frequency) tends to $0$. Intuitively, a fixed integrable function cannot keep resonating with ever-faster oscillations — the rapid sign changes of $e^{-i\xi x}$ average the integral down. It is the basic decay estimate underlying convergence theorems for Fourier series and the smoothness–decay dictionary of the Fourier transform.`,
    statement: String.raw`If $f \in L^1(\mathbb{T})$ then $\hat f(n) \to 0$ as $|n| \to \infty$. More generally, if $f \in L^1(\mathbb{R})$ then its Fourier transform $\hat f$ is continuous and $\hat f(\xi) \to 0$ as $|\xi| \to \infty$.`,
    proof: String.raw`Take the line case; the circle case is identical with $\mathbb{T}$ in place of $\mathbb{R}$. Continuity of $\hat f$ is the **dominated convergence theorem**: $f(x)e^{-2\pi i\xi x} \to f(x)e^{-2\pi i\xi_0 x}$ pointwise as $\xi \to \xi_0$, dominated by $|f| \in L^1$.

For the decay, first take a step function $g = \mathbf{1}_{[a,b]}$. Directly, $\hat g(\xi) = \int_a^b e^{-2\pi i\xi x}\,dx = \tfrac{e^{-2\pi i\xi a} - e^{-2\pi i\xi b}}{2\pi i\xi}$, so $|\hat g(\xi)| \le \tfrac{1}{\pi|\xi|} \to 0$. By linearity the same holds for any finite linear combination of indicator functions of intervals (a **simple function** built from intervals). Such step functions are **dense** in $L^1(\mathbb{R})$: given $f \in L^1$ and $\varepsilon > 0$ choose a step function $g$ with $\lVert f - g\rVert_1 < \varepsilon$. Since the Fourier transform satisfies $|\hat h(\xi)| \le \int |h| = \lVert h\rVert_1$ for every $h$ and every $\xi$ (the integrand is bounded by $|h|$), we get
$$|\hat f(\xi)| \le |\hat f(\xi) - \hat g(\xi)| + |\hat g(\xi)| \le \lVert f - g\rVert_1 + |\hat g(\xi)| < \varepsilon + |\hat g(\xi)|.$$
Letting $|\xi| \to \infty$ sends $|\hat g(\xi)| \to 0$, so $\limsup_{|\xi|\to\infty} |\hat f(\xi)| \le \varepsilon$; as $\varepsilon$ was arbitrary, $\hat f(\xi) \to 0$. $\square$`,
  },
  {
    id: 'fejer-theorem',
    label: 'Fejér’s Theorem',
    title: "Fejér's Theorem",
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'approximate-identity', 'convolution', 'hilbert-basis'],
    description: String.raw`Pointwise convergence of the partial sums $S_N f$ can fail even for continuous $f$, but a gentle fix repairs everything: average the partial sums. The Cesàro means $\sigma_N f = \tfrac{1}{N+1}(S_0 f + \cdots + S_N f)$ converge uniformly to $f$ for every continuous $f$. The mechanism is that these averages are exactly convolution against the **Fejér kernel**, a nonnegative approximate identity, so the convergence is automatic. As a bonus it proves that the trigonometric polynomials are dense — hence that the exponentials form a complete orthonormal system, the fact that turns the Fourier series into a genuine Hilbert-space basis.`,
    statement: String.raw`For $f \in C(\mathbb{T})$ the Cesàro means $\sigma_N f = \frac{1}{N+1}\sum_{n=0}^{N} S_n f$ converge to $f$ uniformly on $\mathbb{T}$. Consequently the trigonometric polynomials are dense in $C(\mathbb{T})$ (uniform norm) and in $L^2(\mathbb{T})$, so $\{e^{inx}\}_{n\in\mathbb{Z}}$ is a complete orthonormal system — an **orthonormal basis** of $L^2(\mathbb{T})$.`,
    proof: String.raw`A computation with geometric sums shows $\sigma_N f = f * F_N$, convolution on $\mathbb{T}$, where the **Fejér kernel**
$$F_N(t) = \sum_{|n|\le N}\Bigl(1 - \tfrac{|n|}{N+1}\Bigr)e^{int} = \frac{1}{N+1}\left(\frac{\sin\frac{(N+1)t}{2}}{\sin\frac{t}{2}}\right)^{2}.$$
The right-hand closed form exhibits the three defining properties of an **approximate identity**: $F_N \ge 0$; $\tfrac{1}{2\pi}\int_{-\pi}^{\pi} F_N = 1$ (the $n=0$ coefficient is $1$); and for each fixed $\delta > 0$, $\int_{\delta \le |t| \le \pi} F_N(t)\,\tfrac{dt}{2\pi} \to 0$, since there $\sin^2\tfrac t2 \ge \sin^2\tfrac\delta2 > 0$ bounds $F_N(t) \le \tfrac{1}{(N+1)\sin^2(\delta/2)} \to 0$ uniformly.

Now estimate, using $\sigma_N f(x) - f(x) = \tfrac{1}{2\pi}\int_{-\pi}^{\pi}\bigl(f(x-t) - f(x)\bigr)F_N(t)\,dt$ (legitimate because $F_N$ integrates to $1$):
$$|\sigma_N f(x) - f(x)| \le \frac{1}{2\pi}\int_{-\pi}^{\pi} |f(x-t) - f(x)|\,F_N(t)\,dt.$$
A continuous function on the compact $\mathbb{T}$ is **uniformly continuous**, so given $\varepsilon > 0$ pick $\delta$ with $|f(x-t)-f(x)| < \varepsilon/2$ whenever $|t| < \delta$, for all $x$. Split the integral at $|t| = \delta$: the near part is $\le \tfrac{\varepsilon}{2}\cdot\tfrac{1}{2\pi}\int F_N = \tfrac\varepsilon2$, and the far part is $\le 2\lVert f\rVert_\infty \int_{\delta\le|t|\le\pi}F_N\,\tfrac{dt}{2\pi}$, which is $< \varepsilon/2$ once $N$ is large, uniformly in $x$. Hence $\lVert \sigma_N f - f\rVert_\infty \to 0$.

Each $\sigma_N f$ is a trigonometric polynomial, so trigonometric polynomials are uniformly dense in $C(\mathbb{T})$; since $\lVert g\rVert_2 \le \lVert g\rVert_\infty$ on $\mathbb{T}$ and $C(\mathbb{T})$ is dense in $L^2(\mathbb{T})$, they are also $L^2$-dense. Thus the closed span of $\{e^{inx}\}$ is all of $L^2(\mathbb{T})$; by the completeness criterion of **hilbert-basis** this orthonormal system is an orthonormal basis. $\square$`,
  },
  {
    id: 'convergence-of-fourier-series',
    label: 'Fourier Convergence',
    title: 'Convergence of Fourier Series',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'fejer-theorem', 'hilbert-basis', 'riemann-lebesgue-lemma', 'uniform-convergence', 'cauchy-schwarz'],
    description: String.raw`In what sense, and to what, does $\sum c_n e^{inx}$ converge? The picture is layered. In the mean-square sense it always works: for any square-integrable $f$ the partial sums converge in $L^2$ and Parseval holds. Pointwise is more delicate — it succeeds wherever $f$ is locally regular (Dirichlet), yet a continuous function's series can diverge at a point (du Bois-Reymond), and near a jump the partial sums overshoot by a fixed proportion (the Gibbs phenomenon). The deepest result, Carleson's theorem, rescues pointwise convergence almost everywhere for every $L^2$ function. We prove the clean $L^2$ statement and honestly cite the rest.`,
    statement: String.raw`Let $f \in L^2(\mathbb{T})$. Then the partial sums $S_N f$ converge to $f$ in $L^2(\mathbb{T})$, and **Parseval's identity** holds:
$$\frac{1}{2\pi}\int_{-\pi}^{\pi}|f(x)|^2\,dx = \sum_{n\in\mathbb{Z}}|\hat f(n)|^2.$$
Refinements (cited, not proved here): if $f$ is, say, $C^1$ (or merely Hölder) then $S_N f \to f$ **uniformly** (Dirichlet–Jordan); there exist continuous $f$ whose Fourier series diverges at a point (du Bois-Reymond); and for every $f \in L^2(\mathbb{T})$, $S_N f(x) \to f(x)$ for almost every $x$ (**Carleson's theorem**).`,
    proof: String.raw`By **Fejér's theorem** the orthonormal system $\{e^{inx}\}_{n\in\mathbb{Z}}$ is complete in $L^2(\mathbb{T})$, hence an **orthonormal basis** (this is exactly the completeness clause of **hilbert-basis**). The partial sum $S_N f = \sum_{|n|\le N}\langle f, e_n\rangle e_n$ is the orthogonal projection of $f$ onto the span of $\{e_n : |n|\le N\}$. For an orthonormal basis, the theorem **hilbert-basis** gives both norm convergence of the expansion, $S_N f \to f$ in $L^2$, and **Parseval's identity** $\lVert f\rVert_2^2 = \sum_n |\langle f, e_n\rangle|^2 = \sum_n |\hat f(n)|^2$. (In particular $\hat f(n) \to 0$, recovering **Riemann–Lebesgue** on $L^2 \subseteq L^1(\mathbb{T})$.)

The pointwise refinements lie beyond an $L^2$ argument. *Uniform convergence for smooth $f$:* if $f \in C^1(\mathbb{T})$ then integration by parts gives $\hat f(n) = \tfrac{1}{in}\widehat{f'}(n)$, and $\widehat{f'} \in \ell^2$ by Parseval, so by Cauchy–Schwarz $\sum_n |\hat f(n)| \le |\hat f(0)| + \bigl(\sum_{n\ne 0} n^{-2}\bigr)^{1/2}\bigl(\sum_n |\widehat{f'}(n)|^2\bigr)^{1/2} < \infty$; absolute summability gives **uniform convergence** of $S_N f$, and the limit must be $f$ by the $L^2$ part. *Divergence and a.e. convergence:* the existence of a continuous function with a divergent series, and the almost-everywhere convergence for all of $L^2$ (**Carleson's theorem**, extended to $L^p$, $p>1$, by Hunt), are genuinely deep and are the precise inputs cited beyond this graph. $\square$`,
  },

  // ── The Fourier transform on the line ───────────────────────────────────────
  {
    id: 'schwartz-space',
    label: 'Schwartz Space',
    title: 'Schwartz Space',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['higher-order-derivative', 'lp-space'],
    description: String.raw`The natural home of the Fourier transform is the class of functions that are smooth and that, together with all their derivatives, decay faster than any power. On such functions the Fourier transform behaves perfectly — it maps the class to itself, turns differentiation into multiplication and back, and every integral one writes converges absolutely. This rapidly decreasing test-function space is also the predual underlying tempered distributions: its dual is exactly the space of generalized functions on which the Fourier transform extends.`,
    definition: String.raw`The **Schwartz space** $\mathcal{S}(\mathbb{R}^n)$ consists of the smooth functions $f \in C^\infty(\mathbb{R}^n)$ all of whose derivatives decay faster than any polynomial: for every pair of multi-indices $\alpha, \beta$,
$$\lVert f\rVert_{\alpha,\beta} := \sup_{x\in\mathbb{R}^n}\bigl|x^{\alpha}\,\partial^{\beta} f(x)\bigr| < \infty.$$
These countably many seminorms make $\mathcal{S}$ a Fréchet space. Equivalently, $f \in C^\infty$ lies in $\mathcal{S}$ iff $x^{\alpha}\partial^{\beta} f$ is bounded for all $\alpha, \beta$. The Gaussian $e^{-\pi|x|^2}$ and every compactly supported smooth function lie in $\mathcal{S}$, and $\mathcal{S} \subseteq L^p(\mathbb{R}^n)$ for all $1\le p\le\infty$ with $\mathcal{S}$ dense in $L^p$ for $p < \infty$.`,
  },
  {
    id: 'fourier-transform',
    label: 'Fourier Transform',
    title: 'Fourier Transform',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'schwartz-space', 'lebesgue-integral', 'dominated-convergence-theorem'],
    description: String.raw`Letting the period of a Fourier series go to infinity turns the discrete spectrum $\{c_n\}$ into a continuous one: the Fourier transform resolves a function on the whole line into a continuum of frequencies. It is the master transform of analysis because it diagonalizes both differentiation (which becomes multiplication by the frequency) and translation, and converts convolution into ordinary multiplication. The same formula, with the sign of the exponent flipped, inverts it — frequencies reassemble into the original function.`,
    definition: String.raw`For $f \in L^1(\mathbb{R}^n)$ the **Fourier transform** is
$$\hat f(\xi) = \int_{\mathbb{R}^n} f(x)\,e^{-2\pi i\,\xi\cdot x}\,dx,$$
a bounded continuous function with $\lVert\hat f\rVert_\infty \le \lVert f\rVert_1$. On the **Schwartz space** $\mathcal{S}(\mathbb{R}^n)$ it is a linear bijection $\mathcal{S}\to\mathcal{S}$ with inverse $(\mathcal{F}^{-1}g)(x) = \int g(\xi)e^{2\pi i\,\xi\cdot x}\,d\xi$, so the **Fourier inversion formula** $f(x) = \int \hat f(\xi)e^{2\pi i\,\xi\cdot x}\,d\xi$ holds for $f \in \mathcal{S}$. It intertwines differentiation and multiplication,
$$\widehat{\partial_{x_j} f}(\xi) = 2\pi i\,\xi_j\,\hat f(\xi), \qquad \widehat{x_j f}(\xi) = -\frac{1}{2\pi i}\,\partial_{\xi_j}\hat f(\xi),$$
and converts translation to modulation, $\widehat{f(\cdot - a)}(\xi) = e^{-2\pi i\,a\cdot\xi}\hat f(\xi)$.`,
    proof: String.raw`*Well-definedness and the differentiation rules on $\mathcal{S}$.* For $f \in \mathcal{S}$ the integrand $f(x)e^{-2\pi i\xi\cdot x}$ is dominated by $|f| \in L^1$, so $\hat f$ is defined and, by the **dominated convergence theorem**, continuous. Differentiating under the integral sign (justified since $\partial_\xi$ of the integrand is dominated by $|x|\,|f| \in L^1$ for $f \in \mathcal{S}$) gives $\partial_{\xi_j}\hat f = \widehat{(-2\pi i x_j)f}$, the second identity; integrating by parts in $x_j$ (boundary terms vanish by rapid decay) gives $\widehat{\partial_{x_j}f}(\xi) = 2\pi i\xi_j\hat f(\xi)$, the first. Together they show $\xi^{\alpha}\partial^{\beta}\hat f$ is, up to constants, the transform of $\partial^{\alpha}(x^{\beta}f) \in \mathcal{S} \subseteq L^1$, hence bounded; so $\hat f \in \mathcal{S}$ and $\mathcal{F}:\mathcal{S}\to\mathcal{S}$. That $\mathcal{F}^{-1}$ as written inverts $\mathcal{F}$ on $\mathcal{S}$ is the Fourier inversion theorem, proved by the Gaussian computation $\widehat{e^{-\pi|x|^2}} = e^{-\pi|\xi|^2}$ together with an approximate-identity/Gaussian-regularization limit; we record inversion as a standard fact of Schwartz-space analysis (its full proof uses the multiplication formula $\int \hat f g = \int f\hat g$ and a Gaussian **approximate-identity**). The translation rule is the substitution $x\mapsto x+a$. $\square$`,
  },
  {
    id: 'convolution',
    label: 'Convolution',
    title: 'Convolution & the Convolution Theorem',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'lp-space', 'fubinis-theorem', 'tonellis-theorem'],
    description: String.raw`Convolution blends one function with a shifted, weighted copy of another — a moving average in which the second function is the weighting profile. It is the operation behind smoothing and filtering, and it computes the probability density of a sum of independent random variables. Its defining virtue in harmonic analysis is the convolution theorem: the Fourier transform converts the (hard) convolution integral into (easy) pointwise multiplication of the transforms, which is why filtering and PDE are so naturally done in the frequency domain.`,
    definition: String.raw`For $f, g \in L^1(\mathbb{R}^n)$ the **convolution** is
$$(f * g)(x) = \int_{\mathbb{R}^n} f(y)\,g(x - y)\,dy,$$
defined for almost every $x$, with $f * g \in L^1$ and $\lVert f*g\rVert_1 \le \lVert f\rVert_1\lVert g\rVert_1$ (**Young's inequality**, special case). Convolution is commutative, associative, and bilinear, and it commutes with translations. The **convolution theorem** states
$$\widehat{f * g} = \hat f \cdot \hat g.$$`,
    proof: String.raw`*Well-definedness and the $L^1$ bound.* The function $(x,y)\mapsto f(y)g(x-y)$ is measurable, and by **Tonelli's theorem** (the absolute-value half of **Fubini's theorem**) $\int\!\!\int |f(y)||g(x-y)|\,dy\,dx = \int|f(y)|\bigl(\int|g(x-y)|\,dx\bigr)dy = \lVert f\rVert_1\lVert g\rVert_1 < \infty$, using translation-invariance of Lebesgue measure for the inner integral. So for a.e. $x$ the defining integral converges absolutely, $f*g \in L^1$, and $\lVert f*g\rVert_1 \le \lVert f\rVert_1\lVert g\rVert_1$. Commutativity is the substitution $y \mapsto x-y$; associativity and translation-invariance follow likewise.

*Convolution theorem.* For $f,g \in L^1$, Fubini's theorem licenses exchanging the order of integration:
$$\widehat{f*g}(\xi) = \int\Bigl(\int f(y)g(x-y)\,dy\Bigr)e^{-2\pi i\xi\cdot x}\,dx = \int f(y)e^{-2\pi i\xi\cdot y}\Bigl(\int g(x-y)e^{-2\pi i\xi\cdot(x-y)}\,dx\Bigr)dy.$$
The inner integral is $\hat g(\xi)$ by translation-invariance ($x\mapsto x+y$), independent of $y$, so it factors out, leaving $\widehat{f*g}(\xi) = \hat g(\xi)\int f(y)e^{-2\pi i\xi\cdot y}\,dy = \hat f(\xi)\hat g(\xi)$. $\square$`,
  },
  {
    id: 'approximate-identity',
    label: 'Approximate Identity',
    title: 'Approximate Identity & Mollifiers',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['convolution', 'lp-space'],
    description: String.raw`There is no integrable function that acts as a unit for convolution — that role belongs to the Dirac delta, which is not a function. An approximate identity is the next best thing: a family of honest kernels that bunch up toward a unit spike as a parameter shrinks, so that convolving against them returns the input in the limit. Convolving with a smooth member smooths the input (the **mollifier** idea) while keeping it close to the original, which is the standard device for approximating rough functions by smooth ones and for proving density theorems. The Fejér, Gauss–Weierstrass, and Poisson kernels are the classical examples.`,
    definition: String.raw`A family $(\phi_t)_{t>0}$ in $L^1(\mathbb{R}^n)$ is an **approximate identity** (as $t\to 0^+$) if
$$\text{(i)}\ \int_{\mathbb{R}^n}\phi_t = 1, \qquad \text{(ii)}\ \sup_{t}\lVert\phi_t\rVert_1 \le M < \infty, \qquad \text{(iii)}\ \forall\,\delta>0,\ \int_{|x|\ge\delta}|\phi_t(x)|\,dx \xrightarrow[t\to 0^+]{} 0.$$
A standard construction is $\phi_t(x) = t^{-n}\phi(x/t)$ for a fixed $\phi \in L^1$ with $\int\phi = 1$. When $\phi \in C_c^\infty$ and $\phi\ge 0$ the $\phi_t$ are **mollifiers**: $f*\phi_t$ is smooth and converges to $f$.`,
    proof: String.raw`*Approximate identities recover $f$.* We show $\lVert f * \phi_t - f\rVert_p \to 0$ for $f \in L^p(\mathbb{R}^n)$, $1\le p<\infty$. By property (i), $(f*\phi_t)(x) - f(x) = \int (f(x-y) - f(x))\phi_t(y)\,dy$; Minkowski's integral inequality gives $\lVert f*\phi_t - f\rVert_p \le \int \lVert \tau_y f - f\rVert_p\,|\phi_t(y)|\,dy$, where $\tau_y f = f(\cdot - y)$. Translation is **continuous** in $L^p$, i.e. $\omega(y) := \lVert\tau_y f - f\rVert_p \to 0$ as $y\to 0$ and $\omega(y) \le 2\lVert f\rVert_p$ throughout. Given $\varepsilon>0$ pick $\delta$ with $\omega(y) < \varepsilon$ for $|y|<\delta$. Split: the $|y|<\delta$ part is $\le \varepsilon\,\sup_t\lVert\phi_t\rVert_1 \le M\varepsilon$ by (ii); the $|y|\ge\delta$ part is $\le 2\lVert f\rVert_p\int_{|y|\ge\delta}|\phi_t| \to 0$ by (iii). Hence $\limsup_{t\to0^+}\lVert f*\phi_t - f\rVert_p \le M\varepsilon$, and $\varepsilon$ is arbitrary. The **Fejér kernel** is the periodic instance of exactly this construction. $\square$`,
  },
  {
    id: 'plancherel-theorem',
    label: 'Plancherel Theorem',
    title: 'Plancherel Theorem',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'schwartz-space', 'lp-space', 'hilbert-basis', 'convolution'],
    description: String.raw`On $L^1$ the Fourier transform is a bounded map into continuous functions, but on $L^2$ something far cleaner happens: it preserves energy exactly and becomes a unitary isomorphism of $L^2(\mathbb{R}^n)$ onto itself. A signal and its spectrum carry the same total energy. This is the continuous analogue of Parseval's identity for Fourier series and the reason $L^2$ — not $L^1$ — is the canonical setting for Fourier analysis: there the transform is invertible, norm-preserving, and self-adjoint up to reflection.`,
    statement: String.raw`The Fourier transform, defined on $\mathcal{S}(\mathbb{R}^n)$, satisfies $\lVert\hat f\rVert_2 = \lVert f\rVert_2$ and extends uniquely to a **unitary** isomorphism $\mathcal{F}:L^2(\mathbb{R}^n)\to L^2(\mathbb{R}^n)$. In particular $\int|f|^2\,dx = \int|\hat f|^2\,d\xi$ (Plancherel) and, polarizing, $\int f\overline{g}\,dx = \int\hat f\,\overline{\hat g}\,d\xi$ (Parseval) for all $f,g\in L^2$.`,
    proof: String.raw`*Identity on $\mathcal{S}$.* Let $f \in \mathcal{S}(\mathbb{R}^n)$ and put $g(x) = \overline{f(-x)}$, so $g \in \mathcal{S}$. The substitution $u = -x$ gives the conjugate-reflection rule $\hat g(\xi) = \overline{\hat f(\xi)}$, so by the **convolution** theorem the function $h = f * g \in \mathcal{S}$ has $\hat h = \hat f\,\hat g = \hat f\,\overline{\hat f} = |\hat f|^2$. Evaluating $h$ at $0$ two ways — directly, $h(0) = \int f(y)g(-y)\,dy = \int f(y)\overline{f(y)}\,dy = \lVert f\rVert_2^2$, and through Fourier **inversion** on $\mathcal{S}$ (from **fourier-transform**), $h(0) = \int \hat h(\xi)\,d\xi = \int |\hat f(\xi)|^2\,d\xi$ — yields
$$\int |\hat f(\xi)|^2\,d\xi = \lVert f\rVert_2^2.$$
So $\mathcal{F}$ is an $L^2$-isometry on the dense subspace $\mathcal{S}$ (dense by **schwartz-space**).

*Extension and surjectivity.* An isometry on a dense subspace of a Hilbert space extends uniquely to an isometry of the whole space $L^2(\mathbb{R}^n)$ (a Cauchy sequence maps to a Cauchy sequence; define $\mathcal{F}f = \lim\mathcal{F}f_k$). Inversion on $\mathcal{S}$ gives a two-sided inverse $\mathcal{F}^{-1}$, itself an isometry by the same identity, so the extended $\mathcal{F}$ is a bijective isometry, i.e. **unitary**. Polarization of the norm identity yields Parseval. This is the precise $L^2(\mathbb{R})$ analogue of **Parseval's identity** for an orthonormal basis (**hilbert-basis**): the continuum of exponentials replaces a discrete basis, with unitarity in place of an honest basis expansion. $\square$`,
  },
  {
    id: 'uncertainty-principle',
    label: 'Uncertainty Principle',
    title: 'Uncertainty Principle',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'plancherel-theorem', 'cauchy-schwarz', 'schwartz-space'],
    description: String.raw`A function and its spectrum cannot both be sharply localized: squeezing a signal in time forces it to spread in frequency, and vice versa. The Heisenberg–Pauli–Weyl inequality makes this quantitative — the product of the variance in position and the variance in frequency is bounded below by an absolute constant. Equality holds only for Gaussians, the uniquely "minimum-uncertainty" signals. This is the mathematics behind Heisenberg's uncertainty principle and a hard limit on time–frequency resolution.`,
    statement: String.raw`For $f \in \mathcal{S}(\mathbb{R})$ (or any $f \in L^2(\mathbb{R})$ for which the integrals are finite), with $\lVert f\rVert_2 = 1$,
$$\Bigl(\int_{\mathbb{R}} x^2 |f(x)|^2\,dx\Bigr)\Bigl(\int_{\mathbb{R}} \xi^2 |\hat f(\xi)|^2\,d\xi\Bigr) \ge \frac{1}{16\pi^2},$$
with equality iff $f$ is a Gaussian $f(x) = c\,e^{-\pi b x^2}$ ($b>0$). Centering at means $x_0,\xi_0$ gives the same bound for the two variances.`,
    proof: String.raw`Take $f \in \mathcal{S}(\mathbb{R})$ (possibly complex-valued) with $\lVert f\rVert_2 = 1$. Start from the identity $\tfrac{d}{dx}\bigl(x|f|^2\bigr) = |f|^2 + x\,(f'\overline f + \overline{f'}f) = |f|^2 + 2x\operatorname{Re}(\overline f f')$. Since $x|f|^2 \to 0$ at $\pm\infty$ (Schwartz decay), integrating over $\mathbb{R}$ gives $0 = 1 + 2\int x\operatorname{Re}(\overline f f')\,dx$, so
$$1 = -2\int_{\mathbb{R}} x\,\operatorname{Re}\bigl(\overline{f(x)}\,f'(x)\bigr)\,dx \le 2\int_{\mathbb{R}} |x|\,|f(x)|\,|f'(x)|\,dx.$$
By **Cauchy–Schwarz** in $L^2$,
$$1 \le 2\Bigl(\int x^2|f|^2\,dx\Bigr)^{1/2}\Bigl(\int |f'|^2\,dx\Bigr)^{1/2}.$$
Now $\widehat{f'}(\xi) = 2\pi i\xi\,\hat f(\xi)$ (the differentiation rule of **fourier-transform**), so by the **Plancherel theorem** $\int|f'|^2\,dx = \int|\widehat{f'}|^2\,d\xi = 4\pi^2\int \xi^2|\hat f|^2\,d\xi$. Substituting and squaring,
$$1 \le 4\Bigl(\int x^2|f|^2\,dx\Bigr)\cdot 4\pi^2\Bigl(\int\xi^2|\hat f|^2\,d\xi\Bigr) = 16\pi^2\Bigl(\int x^2|f|^2\Bigr)\Bigl(\int\xi^2|\hat f|^2\Bigr),$$
which is the claim. Equality requires equality in Cauchy–Schwarz, $f'(x) = \lambda x f(x)$ for a constant $\lambda$, forcing $f(x) = c\,e^{\lambda x^2/2}$; integrability demands $\lambda < 0$, giving exactly the Gaussians. $\square$`,
  },
  {
    id: 'poisson-summation-formula',
    label: 'Poisson Summation',
    title: 'Poisson Summation Formula',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'fourier-series', 'schwartz-space', 'convergence-of-fourier-series'],
    description: String.raw`A single identity ties the two faces of Fourier analysis together: summing a function over the integer lattice equals summing its Fourier transform over the dual lattice. The mechanism is periodization — wrapping a function on the line around the circle by summing its integer translates produces a periodic function whose Fourier coefficients are precisely the samples of the transform. Setting the two expressions for that periodic function at one point equal yields the formula. It is a workhorse in number theory (functional equations of theta and zeta), in sampling theory, and for lattice sums.`,
    statement: String.raw`For $f \in \mathcal{S}(\mathbb{R})$ (more generally, $f$ continuous with $f$ and $\hat f$ both $O((1+|x|)^{-1-\epsilon})$),
$$\sum_{n\in\mathbb{Z}} f(n) = \sum_{k\in\mathbb{Z}} \hat f(k).$$
More generally $\sum_n f(x+n) = \sum_k \hat f(k)e^{2\pi i k x}$ for all $x$.`,
    proof: String.raw`Define the **periodization** $F(x) = \sum_{n\in\mathbb{Z}} f(x+n)$. For $f \in \mathcal{S}$ the series converges absolutely and uniformly on compact sets (rapid decay), so $F$ is continuous and $1$-periodic, i.e. a function on the circle of period $1$. Compute its **Fourier series** coefficients (period $1$, so $\hat F(k) = \int_0^1 F(x)e^{-2\pi i kx}\,dx$): by uniform convergence we may integrate term by term,
$$\hat F(k) = \int_0^1\sum_{n} f(x+n)\,e^{-2\pi i kx}\,dx = \sum_n\int_0^1 f(x+n)e^{-2\pi i kx}\,dx = \int_{\mathbb{R}} f(y)\,e^{-2\pi i ky}\,dy = \hat f(k),$$
where the translates $[n, n+1)$ reassemble $\mathbb{R}$ and $e^{-2\pi i k n} = 1$. Thus the Fourier coefficients of $F$ are exactly the transform samples $\hat f(k)$. Since $F \in C^1$-type regularity here ($\hat f$ decays, so $\sum_k|\hat F(k)| = \sum_k|\hat f(k)| < \infty$), the **Fourier series of $F$ converges to $F$** uniformly (absolute summability, as in **convergence-of-fourier-series**): $F(x) = \sum_k \hat f(k)e^{2\pi i kx}$, the general statement. Evaluating at $x = 0$ gives $\sum_n f(n) = F(0) = \sum_k \hat f(k)$. $\square$`,
  },

  // ── Distributions and one-sided transforms ──────────────────────────────────
  {
    id: 'tempered-distribution',
    label: 'Tempered Distribution',
    title: 'Tempered Distribution',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['schwartz-space', 'fourier-transform', 'higher-order-derivative', 'lp-space'],
    description: String.raw`To do Fourier analysis on objects that are not functions — the Dirac delta, a constant, a divergent oscillation — one passes to generalized functions. A tempered distribution is defined not by its values but by how it pairs against test functions: it is a continuous linear functional on the Schwartz space. Every distribution can be differentiated as often as one likes (push the derivative onto the test function), and the Fourier transform extends to all of them (move it onto the test function), so the two basic operations of harmonic analysis become unconditionally legitimate. The catch is that distributions cannot, in general, be multiplied together.`,
    definition: String.raw`A **tempered distribution** is a continuous linear functional $T : \mathcal{S}(\mathbb{R}^n) \to \mathbb{C}$ on the **Schwartz space** — continuity meaning $T(\varphi_k) \to 0$ whenever $\varphi_k \to 0$ in all the seminorms $\lVert\cdot\rVert_{\alpha,\beta}$. Their space is $\mathcal{S}'(\mathbb{R}^n)$, the dual of $\mathcal{S}$. Examples: any $f \in L^p$ acts by $T_f(\varphi) = \int f\varphi$; the **Dirac delta** $\delta(\varphi) = \varphi(0)$; the principal value $\mathrm{p.v.}\tfrac1x(\varphi) = \lim_{\epsilon\to0}\int_{|x|>\epsilon}\tfrac{\varphi(x)}{x}\,dx$. Operations are defined by transposing the action on test functions: the **distributional derivative** $(\partial^\alpha T)(\varphi) = (-1)^{|\alpha|}T(\partial^\alpha\varphi)$ and the **Fourier transform** $\hat T(\varphi) = T(\hat\varphi)$ — both well defined because $\partial^\alpha$ and $\mathcal{F}$ map $\mathcal{S}$ continuously to $\mathcal{S}$. (For instance $\hat\delta = 1$ and $\hat 1 = \delta$.)`,
  },
  {
    id: 'laplace-transform',
    label: 'Laplace Transform',
    title: 'Laplace Transform',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'holomorphic-function', 'convolution'],
    description: String.raw`The Laplace transform is the one-sided, complex-frequency cousin of the Fourier transform, adapted to functions on $[0,\infty)$ and to growth rather than decay. By inserting a real decaying factor $e^{-\sigma t}$ it tames functions that the Fourier transform cannot integrate, and it converts differentiation into multiplication by $s$ while folding initial conditions into algebra. That is exactly what is needed to turn a linear initial-value problem into an algebraic equation in $s$, which is why it is the standard engineering tool for transient and control problems.`,
    definition: String.raw`For $f : [0,\infty) \to \mathbb{C}$ of at most exponential growth ($|f(t)| \le Ce^{at}$) the **Laplace transform** is
$$F(s) = (\mathcal{L}f)(s) = \int_0^\infty f(t)\,e^{-st}\,dt,$$
a function **holomorphic** in the half-plane $\operatorname{Re}(s) > a$ (its region of convergence). On the line $s = 2\pi i\xi$ it reduces to the Fourier transform of $f$ extended by $0$ to $t<0$; writing $s = \sigma + i\tau$, $\mathcal{L}f(\sigma + i\tau)$ is the Fourier transform of $e^{-\sigma t}f(t)\mathbf{1}_{t\ge0}$. The basic operational rules are
$$\mathcal{L}\{f'\}(s) = sF(s) - f(0), \qquad \mathcal{L}\{(f*g)\}(s) = F(s)G(s),$$
with one-sided convolution $f*g(t) = \int_0^t f(\tau)g(t-\tau)\,d\tau$, and inversion by the **Bromwich integral** $f(t) = \tfrac{1}{2\pi i}\int_{c-i\infty}^{c+i\infty} F(s)e^{st}\,ds$ for $c > a$.`,
  },

  // ── Discrete and abstract theory ────────────────────────────────────────────
  {
    id: 'discrete-fourier-transform',
    label: 'Discrete Fourier Transform',
    title: 'Discrete Fourier Transform & FFT',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'cyclic-group', 'character'],
    description: String.raw`The discrete Fourier transform is Fourier analysis on a finite cyclic group: it expresses a length-$N$ sample vector in the orthogonal basis of discrete frequencies $e^{2\pi i kn/N}$. Mathematically it is a unitary change of basis on $\mathbb{C}^N$; computationally it is the indispensable bridge between continuous Fourier theory and digital reality. The fast Fourier transform evaluates it in $O(N\log N)$ instead of the naive $O(N^2)$ by recursively splitting the sum — among the most consequential algorithms ever devised, underpinning digital audio, imaging, and fast multiplication.`,
    definition: String.raw`Let $\omega = e^{-2\pi i/N}$. The **discrete Fourier transform** (DFT) of $x = (x_0,\dots,x_{N-1}) \in \mathbb{C}^N$ is $X = (X_k)$,
$$X_k = \sum_{n=0}^{N-1} x_n\,\omega^{kn} = \sum_{n=0}^{N-1} x_n\,e^{-2\pi i kn/N} \qquad (0 \le k < N),$$
the expansion of $x$ in the orthogonal basis $\{(\omega^{-kn})_n\}_k$ of $\mathbb{C}^N$ — equivalently, Fourier analysis on the **cyclic group** $\mathbb{Z}/N\mathbb{Z}$, whose characters are $n \mapsto \omega^{kn}$. It is inverted by $x_n = \tfrac1N\sum_k X_k\,e^{2\pi i kn/N}$ and is unitary up to the factor $\sqrt N$. The **fast Fourier transform** (Cooley–Tukey) computes $X$ in $O(N\log N)$ operations by recursively splitting the sum over even and odd indices, since the DFT of length $N=2M$ reduces to two DFTs of length $M$ combined with twiddle factors $\omega^k$.`,
  },
  {
    id: 'pontryagin-duality',
    label: 'Pontryagin Duality',
    title: 'Pontryagin Duality',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'fourier-series', 'discrete-fourier-transform', 'character', 'peter-weyl-theorem', 'lp-space', 'schur-lemma', 'plancherel-theorem'],
    description: String.raw`All the concrete Fourier transforms turn out to be one theorem. Every locally compact abelian group has a dual group of its characters (continuous homomorphisms to the circle), and the Fourier transform is the canonical correspondence between functions on the group and functions on its dual. The classical cases are special instances: Fourier series ($G = \mathbb{T}$, dual $\mathbb{Z}$), the line transform ($G = \mathbb{R}$, self-dual), and the DFT ($G$ finite cyclic, self-dual). The capstone is that the group is recovered as the dual of its dual — perfect duality. This is the locally compact abelian face of the same harmonic analysis whose compact (possibly non-abelian) face is the Peter–Weyl theorem; on compact abelian groups the two coincide.`,
    statement: String.raw`Let $G$ be a locally compact abelian group with **dual group** $\hat G = \operatorname{Hom}_{\mathrm{cts}}(G, \mathbb{T})$ of continuous characters (itself locally compact abelian under pointwise multiplication and the compact-open topology). Relative to a Haar measure, the Fourier transform $\hat f(\chi) = \int_G f(x)\overline{\chi(x)}\,dx$ extends to a unitary isomorphism $L^2(G) \to L^2(\hat G)$ (Plancherel), and the natural evaluation map $G \to \widehat{\hat G}$, $x \mapsto (\chi\mapsto\chi(x))$, is a **topological isomorphism** (**Pontryagin duality**). Special cases: $\widehat{\mathbb{T}} = \mathbb{Z}$, $\widehat{\mathbb{Z}} = \mathbb{T}$, $\widehat{\mathbb{R}} = \mathbb{R}$, $\widehat{\mathbb{Z}/N} = \mathbb{Z}/N$.`,
    proof: String.raw`This is a genuine structure theorem of abstract harmonic analysis; we indicate the architecture and name the deep inputs. The foundation is the existence and uniqueness of **Haar measure** on any locally compact group (a left-invariant Radon measure), which on an abelian group is bi-invariant — the substitute for $\tfrac{1}{|G|}\sum$ used throughout. The **characters** $\chi : G \to \mathbb{T}$ are the irreducible unitary representations of the abelian $G$ (all one-dimensional, by **Schur's lemma**), so $\hat G$ is the unitary dual.

*Concrete cases as computations.* For $G = \mathbb{T}$ the continuous characters are exactly $x\mapsto e^{inx}$, $n\in\mathbb{Z}$, so $\hat{\mathbb{T}} = \mathbb{Z}$ and the transform is the **fourier-series** coefficient map; the Plancherel statement is **Parseval's identity**. For $G = \mathbb{Z}/N$ the characters are $n\mapsto e^{2\pi ikn/N}$, recovering the **discrete-fourier-transform**. For $G = \mathbb{R}$ the characters are $x\mapsto e^{2\pi i\xi x}$, so $\mathbb{R}$ is self-dual and the transform is the classical **fourier-transform** with Plancherel = the Plancherel theorem.

*General case (cited).* The full theorem — that $\hat G$ separates points, that Plancherel holds, and that $G \cong \widehat{\hat G}$ — rests on the **Gelfand theory** of the commutative Banach $*$-algebra $L^1(G)$ (whose spectrum is $\hat G$) together with **Bochner's theorem** on positive-definite functions; the inversion and Plancherel theorems and the duality isomorphism are then established by the structure theory of locally compact abelian groups. For *compact* $G$ this is precisely the abelian case of the **Peter–Weyl theorem**: the characters form an orthonormal basis of $L^2(G)$, which on compact abelian groups is exactly Pontryagin's Plancherel theorem. The named external inputs (Haar measure, Gelfand theory, Bochner's theorem) are the gap relative to this graph. $\square$`,
  },
]
