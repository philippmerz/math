import type { MathNode } from '../types'

export const HARMONIC_ANALYSIS_NODES: MathNode[] = [
  {
    id: 'fourier-series',
    label: 'Fourier Series',
    title: 'Fourier Series',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['hilbert-basis', 'riemann-integral'],
    definition: String.raw`A **Fourier series** expands a periodic function into sines and cosines — equivalently complex exponentials:
$$f(x) = \sum_{n=-\infty}^{\infty} c_n e^{inx}, \qquad c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,e^{-inx}\,dx.$$
The exponentials $e^{inx}$ form an orthonormal basis of $L^2$ on the circle, so the coefficients are inner products and the series is the abstract orthonormal expansion made concrete — the founding construction of harmonic analysis.`,
  },
  {
    id: 'convergence-of-fourier-series',
    label: 'Fourier Convergence',
    title: 'Convergence of Fourier Series',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'uniform-convergence'],
    definition: String.raw`How a Fourier series converges is delicate. It converges in $L^2$ for every square-integrable function (Parseval), and pointwise to $f$ wherever $f$ is smooth enough (Dirichlet's theorem); yet a continuous function's series can diverge at a point, and near a jump it overshoots by a fixed ~9% (the **Gibbs phenomenon**). Carleson's theorem rescues it: convergence holds almost everywhere for $L^2$ functions.`,
  },
  {
    id: 'fourier-transform',
    label: 'Fourier Transform',
    title: 'Fourier Transform',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series', 'lebesgue-integral'],
    definition: String.raw`The **Fourier transform** resolves a function on $\mathbb{R}$ into its frequencies:
$$\hat f(\xi) = \int_{-\infty}^{\infty} f(x)\,e^{-2\pi i \xi x}\,dx,$$
inverted by the same formula with $+i$. The continuous analogue of Fourier series, it turns differentiation into multiplication by $2\pi i \xi$ and convolution into products — the central transform of analysis, signal processing, and PDE.`,
  },
  {
    id: 'convolution',
    label: 'Convolution',
    title: 'Convolution',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'lebesgue-integral'],
    definition: String.raw`The **convolution**
$$(f * g)(x) = \int f(y)\,g(x - y)\,dy$$
blends one function by a shifted, weighted average of the other — the operation behind smoothing, filtering, and the density of a sum of independent random variables. The **convolution theorem** is its power: the Fourier transform turns it into pointwise multiplication, $\widehat{f * g} = \hat f \cdot \hat g$.`,
  },
  {
    id: 'plancherel-theorem',
    label: 'Plancherel Theorem',
    title: 'Plancherel Theorem',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'lp-space'],
    definition: String.raw`The Fourier transform extends to a unitary isomorphism of $L^2(\mathbb{R})$ onto itself, preserving the $L^2$ norm,
$$\int |f|^2\,dx = \int |\hat f|^2\,d\xi.$$
Energy is conserved between a signal and its spectrum — the continuous counterpart of Parseval's identity, and the reason $L^2$ is the natural home of the Fourier transform.`,
  },
  {
    id: 'poisson-summation-formula',
    label: 'Poisson Summation',
    title: 'Poisson Summation Formula',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform', 'fourier-series'],
    definition: String.raw`The **Poisson summation formula** links a function's samples to its transform's:
$$\sum_{n \in \mathbb{Z}} f(n) = \sum_{k \in \mathbb{Z}} \hat f(k)$$
(for suitably nice $f$). It bridges the Fourier series and transform by periodizing one side, and is a workhorse in number theory (the functional equations of the theta and zeta functions), sampling theory, and lattice sums.`,
  },
  {
    id: 'uncertainty-principle',
    label: 'Uncertainty Principle',
    title: 'Uncertainty Principle',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform'],
    definition: String.raw`A function and its Fourier transform cannot both be sharply concentrated. Quantitatively,
$$\Big(\int x^2 |f(x)|^2\,dx\Big)\Big(\int \xi^2 |\hat f(\xi)|^2\,d\xi\Big) \ge \frac{\|f\|_2^4}{16\pi^2},$$
with equality only for Gaussians. It is the mathematics behind Heisenberg's principle and a hard limit on simultaneous time–frequency resolution.`,
  },
  {
    id: 'approximate-identity',
    label: 'Approximate Identity',
    title: 'Approximate Identity',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['convolution'],
    definition: String.raw`An **approximate identity** is a family of kernels concentrating toward a unit spike (a Dirac delta) — the Gaussian, Fejér, and Poisson kernels among them. Convolving with one *smooths* a function while converging back to it, recovering Fourier series by averaging (Fejér's theorem) and supplying the **mollifiers** that approximate rough functions by smooth ones.`,
  },
  {
    id: 'tempered-distribution',
    label: 'Tempered Distribution',
    title: 'Tempered Distribution',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform'],
    definition: String.raw`A **tempered distribution** is a continuous linear functional on the Schwartz space of rapidly decreasing smooth functions — a *generalized function* such as the **Dirac delta** $\delta$ or the principal value $1/x$. Distributions can always be differentiated, and the Fourier transform extends to them, giving harmonic analysis a setting in which differentiation and the Fourier transform are always legitimate — though products of distributions, in general, are not.`,
  },
  {
    id: 'laplace-transform',
    label: 'Laplace Transform',
    title: 'Laplace Transform',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform'],
    definition: String.raw`The **Laplace transform** sends a function on $[0, \infty)$ to
$$F(s) = \int_0^\infty f(t)\,e^{-st}\,dt$$
for complex $s$ — a one-sided cousin of the Fourier transform. It converts differentiation into multiplication and initial conditions into algebra, turning linear differential equations into algebraic ones; it is the standard tool for initial-value problems in engineering.`,
  },
  {
    id: 'discrete-fourier-transform',
    label: 'Discrete Fourier Transform',
    title: 'Discrete Fourier Transform & FFT',
    kind: 'definition',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-series'],
    definition: String.raw`The **discrete Fourier transform** (DFT) is the Fourier analysis of a finite sampled signal,
$$X_k = \sum_{n=0}^{N-1} x_n\,e^{-2\pi i kn/N},$$
a change of basis to discrete frequencies. The **fast Fourier transform** computes it in $O(N \log N)$ rather than $O(N^2)$ — among the most consequential algorithms ever devised, underpinning digital audio, imaging, and signal processing.`,
  },
  {
    id: 'pontryagin-duality',
    label: 'Pontryagin Duality',
    title: 'Pontryagin Duality',
    kind: 'theorem',
    tags: ['Harmonic Analysis'],
    dependencies: ['fourier-transform'],
    definition: String.raw`**Pontryagin duality** unifies harmonic analysis: every locally compact abelian group $G$ has a **dual group** $\hat G$ of characters, and the Fourier transform is the correspondence between functions on $G$ and on $\hat G$. Fourier series ($G$ the circle, $\hat G = \mathbb{Z}$), the Fourier transform ($G = \mathbb{R}$, self-dual), and the DFT ($G$ finite cyclic) are one construction — the locally compact abelian theory parallel to the Peter–Weyl theorem for compact (possibly non-abelian) groups, the two coinciding on compact abelian groups.`,
  },
]
