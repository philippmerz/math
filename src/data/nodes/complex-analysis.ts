import type { MathNode } from '../types'

/** Complex Analysis — 7 nodes. */
export const COMPLEX_ANALYSIS_NODES: MathNode[] = [
  {
    id: 'holomorphic-function',
    label: 'Holomorphic Function',
    title: 'Holomorphic Function',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['complex-numbers', 'derivative'],
    definition: String.raw`A **holomorphic** function is complex-differentiable in a neighbourhood of each point of an open set:
$$f'(z) = \lim_{h \to 0} \frac{f(z + h) - f(z)}{h}, \qquad h \in \mathbb{C}.$$
Because $h$ may approach $0$ from any direction in the plane, this is far stronger than real differentiability, and it forces the rich rigidity that complex analysis exploits.`,
  },
  {
    id: 'cauchy-riemann-equations',
    label: 'Cauchy–Riemann',
    title: 'Cauchy–Riemann Equations',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'partial-derivative'],
    definition: String.raw`The **Cauchy–Riemann equations** are the relations a holomorphic $f = u + iv$ must satisfy; writing $z = x + iy$,
$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}.$$
Conversely, if $u$ and $v$ have continuous partials and satisfy them, $f$ is holomorphic; either way its real and imaginary parts are harmonic.`,
  },
  {
    id: 'cauchy-integral-theorem',
    label: "Cauchy's Integral Theorem",
    title: "Cauchy's Integral Theorem",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function'],
    definition: String.raw`**Cauchy's integral theorem**: if $f$ is holomorphic on a simply connected domain, its contour integral around any closed loop there vanishes,
$$\oint_\gamma f(z)\,dz = 0.$$
Equivalently, on such a domain a holomorphic integral depends only on its endpoints, not the path taken. It is the result on which the rest of complex analysis is built.`,
  },
  {
    id: 'cauchy-integral-formula',
    label: "Cauchy's Integral Formula",
    title: "Cauchy's Integral Formula",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-theorem'],
    definition: String.raw`**Cauchy's integral formula**: if $f$ is holomorphic on and inside a simple closed contour $\gamma$ traversed once counterclockwise, then for any point $a$ inside $\gamma$,
$$f(a) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - a}\,dz.$$
Differentiating under the integral shows a holomorphic function is infinitely differentiable — its values on the curve fix the function and all derivatives within.`,
  },
  {
    id: 'complex-analyticity',
    label: 'Analyticity',
    title: 'Analyticity (Holomorphic = Analytic)',
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-formula'],
    definition: String.raw`Every holomorphic function is **analytic**: near each point it equals a convergent power series,
$$f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}\,(z - a)^n.$$
So a complex function differentiable once *on an open set* is automatically infinitely differentiable and equal to its Taylor series there — *holomorphic* and *analytic* name the same class.`,
  },
  {
    id: 'residue-theorem',
    label: 'Residue Theorem',
    title: 'Residue Theorem',
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-formula'],
    definition: String.raw`The **residue theorem** evaluates a contour integral from the singularities it encloses. If $f$ is holomorphic on and inside a positively oriented simple closed contour $\gamma$ except for finitely many isolated singularities $z_k$ in its interior (none on $\gamma$), then
$$\oint_\gamma f(z)\,dz = 2\pi i \sum_k \operatorname{Res}(f, z_k).$$
Each **residue** $\operatorname{Res}(f, z_k)$ is the coefficient of $(z - z_k)^{-1}$ in the Laurent expansion of $f$ at $z_k$. It reduces many hard real integrals to algebra and is a central computational tool of the subject.`,
  },
  {
    id: 'liouville-theorem',
    label: "Liouville's Theorem",
    title: "Liouville's Theorem",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'cauchy-integral-formula'],
    definition: String.raw`**Liouville's theorem**: every bounded *entire* function — one holomorphic on all of $\mathbb{C}$ — is constant. Holomorphy is rigid enough to leave no room for a non-constant bounded entire function, and a few lines from here give the fundamental theorem of algebra.`,
  },
]
