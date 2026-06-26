import type { MathNode } from '../types'

export const TRIGONOMETRY_NODES: MathNode[] = [
  {
    id: 'sine-cosine',
    label: 'Sine & Cosine',
    title: 'Sine and Cosine (Power Series)',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['real-numbers', 'sequence-of-functions', 'uniform-convergence'],
    description: String.raw`Sine and cosine are introduced here purely analytically, as the sums of two power series, with no reference to angles, circles, or arc length. This is the order that breaks the classical circularity: an angle is later *defined* through the cosine, so cosine cannot in turn be defined through angles. The two series are the even and odd parts of the exponential's oscillatory cousin; from them alone — by differentiating and integrating series — flow every identity, the number $\pi$, periodicity, and ultimately the geometric picture on the circle.`,
    definition: String.raw`For $x \in \mathbb{R}$ define
$$\cos x := \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}, \qquad \sin x := \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}.$$
These give functions $\cos, \sin : \mathbb{R} \to \mathbb{R}$. Termwise one reads off $\cos 0 = 1$, $\sin 0 = 0$, that $\cos$ is even and $\sin$ is odd, and that $\cos$ contains only even powers while $\sin$ contains only odd powers.`,
    proof: String.raw`*Well-definedness.* Fix $R > 0$ and work on $[-R, R]$. For the cosine series the term magnitudes are $a_n = R^{2n}/(2n)!$, with ratio $a_{n+1}/a_n = R^2/\big((2n+1)(2n+2)\big) \to 0 < 1$, so by the ratio test $\sum_n a_n$ converges; the same comparison gives absolute convergence of $\sum_n (-1)^n x^{2n}/(2n)!$ for every $x \in [-R,R]$. Hence the partial sums form a **sequence of functions** with $\big| (-1)^n x^{2n}/(2n)! \big| \le M_n := R^{2n}/(2n)!$ on $[-R,R]$ and $\sum_n M_n < \infty$; by the Weierstrass $M$-test (a direct consequence of **uniform convergence**: if $|g_n| \le M_n$ with $\sum M_n < \infty$, the partial sums are uniformly Cauchy, since the tail $\sum_{n>N} M_n \to 0$ bounds $\sup_x |\sum_{n>N} g_n(x)|$) the series converges uniformly on $[-R,R]$ to a function. The identical argument with $M_n = R^{2n+1}/(2n+1)!$ handles the sine series. As $R$ was arbitrary, $\cos$ and $\sin$ are defined on all of $\mathbb{R}$. Substituting $x = 0$ kills every term but the constant one, giving $\cos 0 = 1$ and $\sin 0 = 0$; replacing $x$ by $-x$ leaves each even power of the cosine series unchanged and negates each odd power of the sine series, so $\cos(-x) = \cos x$ and $\sin(-x) = -\sin x$. $\square$`,
  },
  {
    id: 'trig-derivatives',
    label: 'Derivatives of sin, cos',
    title: 'Derivatives of Sine and Cosine',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'derivative', 'uniform-convergence', 'sequence-of-functions', 'mean-value-theorem'],
    description: String.raw`The two power series are designed so that differentiation rotates them into each other: the derivative of sine is cosine, and the derivative of cosine is minus sine. This single pair of relations is the analytic engine of all of trigonometry — the Pythagorean identity, the addition formulas, and the construction of $\pi$ all follow from it by elementary calculus, with no geometry required.`,
    statement: String.raw`On all of $\mathbb{R}$,
$$\frac{d}{dx}\sin x = \cos x, \qquad \frac{d}{dx}\cos x = -\sin x.$$`,
    proof: String.raw`Differentiating the **sine-cosine** series termwise gives, formally,
$$\frac{d}{dx}\sin x = \sum_{n=0}^{\infty} (-1)^n \frac{(2n+1)\,x^{2n}}{(2n+1)!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = \cos x,$$
$$\frac{d}{dx}\cos x = \sum_{n=1}^{\infty} (-1)^n \frac{(2n)\,x^{2n-1}}{(2n)!} = \sum_{n=1}^{\infty} \frac{(-1)^n x^{2n-1}}{(2n-1)!} = -\sum_{m=0}^{\infty} \frac{(-1)^m x^{2m+1}}{(2m+1)!} = -\sin x,$$
the last step by reindexing $m = n-1$ (so $(-1)^n = -(-1)^m$).

It remains to justify termwise differentiation. Term-by-term differentiation of a convergent series of differentiable functions is valid on $[-R,R]$ provided (i) the series converges at one point and (ii) the **sequence of functions** of differentiated partial sums converges uniformly there; the uniform limit of the derivatives is then the derivative of the limit. Each differentiated series above is, up to the harmless factor $(-1)^n$, again a sine/cosine-type series, dominated on $[-R,R]$ by $M_n = R^{2n}/(2n)!$ or $R^{2n-1}/(2n-1)!$ with $\sum_n M_n < \infty$; by the Weierstrass $M$-test these differentiated series converge **uniformly** on $[-R,R]$. (The uniform-limit-of-derivatives principle follows from **uniform convergence** and the Mean Value Theorem: if $g_k \to g$ pointwise and $g_k' \to h$ uniformly, then for the difference quotients $\frac{g(x+t)-g(x)}{t}$ one passes the uniform limit through, yielding $g' = h$.) Hence differentiation may be carried out termwise, establishing both formulas on $[-R,R]$, and since $R$ was arbitrary, on all of $\mathbb{R}$. $\square$`,
  },
  {
    id: 'pythagorean-identity',
    label: 'Pythagorean Identity',
    title: 'Pythagorean Identity',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'trig-derivatives', 'mvt-constant-corollary', 'product-rule'],
    description: String.raw`The single most-used relation in trigonometry says that for every real number the squares of sine and cosine sum to one. Analytically it is not a fact about a circle but a constant-of-motion: the function $\cos^2 + \sin^2$ has derivative zero everywhere, so it never moves from its value $1$ at the origin. Once the circle is reconstructed later, this identity is exactly what places the point $(\cos\theta, \sin\theta)$ on it.`,
    statement: String.raw`For every $x \in \mathbb{R}$,
$$\cos^2 x + \sin^2 x = 1.$$`,
    proof: String.raw`Let $f(x) = \cos^2 x + \sin^2 x$. It is differentiable on $\mathbb{R}$ (a sum of products of differentiable functions), and by the **product-rule** applied to $\cos^2 x = \cos x\cdot\cos x$ and $\sin^2 x = \sin x\cdot\sin x$ together with the derivatives of **trig-derivatives**,
$$f'(x) = 2\cos x\,(\cos x)' + 2\sin x\,(\sin x)' = 2\cos x\,(-\sin x) + 2\sin x\,\cos x = 0$$
for all $x$. A function with identically zero derivative on $\mathbb{R}$ is constant, by **mvt-constant-corollary**. Since $f(0) = \cos^2 0 + \sin^2 0 = 1^2 + 0^2 = 1$ (from the values recorded in **sine-cosine**), the constant value is $1$; that is, $\cos^2 x + \sin^2 x = 1$ for every $x$. In particular $|\cos x| \le 1$ and $|\sin x| \le 1$. $\square$`,
  },
  {
    id: 'angle-addition-formulas',
    label: 'Angle Addition',
    title: 'Angle Addition Formulas',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'trig-derivatives', 'mvt-constant-corollary', 'product-rule', 'chain-rule'],
    description: String.raw`These formulas express the sine and cosine of a sum through the sines and cosines of the parts. They are the algebraic heart of trigonometry: nearly every other identity — double-angle, half-angle, product-to-sum — is a special case, and they encode the composition law of rotations. The proof here is purely analytic: fixing the second argument, the two error functions satisfy the same first-order system as sine and cosine and vanish at the origin, so the conserved quantity $u^2 + v^2$ forces them to vanish identically.`,
    statement: String.raw`For all $x, y \in \mathbb{R}$,
$$\cos(x + y) = \cos x\cos y - \sin x\sin y, \qquad \sin(x + y) = \sin x\cos y + \cos x\sin y.$$`,
    proof: String.raw`Fix $y \in \mathbb{R}$ and define
$$u(x) = \cos(x + y) - \big(\cos x\cos y - \sin x\sin y\big), \qquad v(x) = \sin(x + y) - \big(\sin x\cos y + \cos x\sin y\big).$$
Both are differentiable. Using **trig-derivatives** (and the chain rule, $\tfrac{d}{dx}\cos(x+y) = -\sin(x+y)$, $\tfrac{d}{dx}\sin(x+y) = \cos(x+y)$), with $y$ held constant,
$$u'(x) = -\sin(x+y) - \big(-\sin x\cos y - \cos x\sin y\big) = -\sin(x+y) + \big(\sin x\cos y + \cos x\sin y\big) = -v(x),$$
$$v'(x) = \cos(x+y) - \big(\cos x\cos y - \sin x\sin y\big) = u(x).$$
Hence $u' = -v$ and $v' = u$. Let $g = u^2 + v^2$; then by the **product-rule** $g' = 2u u' + 2v v' = 2u(-v) + 2v u = 0$ for all $x$, so by **mvt-constant-corollary** $g$ is constant. At $x = 0$, using $\cos(0+y) = \cos y$, $\sin(0+y) = \sin y$ and the values $\cos 0 = 1$, $\sin 0 = 0$ from **sine-cosine**,
$$u(0) = \cos y - (\cos y - 0) = 0, \qquad v(0) = \sin y - (0 + \sin y) = 0,$$
so $g(0) = 0$ and therefore $g \equiv 0$. As $g = u^2 + v^2$ is a sum of squares, $u(x) = v(x) = 0$ for all $x$, which is precisely the two stated identities (for this $y$, and hence for all $x, y$ since $y$ was arbitrary). $\square$`,
  },
  {
    id: 'pi-and-periodicity',
    label: 'π & Periodicity',
    title: 'The Number π, the Cosine Bijection, and Periodicity',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'trig-derivatives', 'pythagorean-identity', 'angle-addition-formulas', 'intermediate-value-theorem', 'mvt-constant-corollary', 'mvt-monotonicity-corollary', 'real-numbers'],
    description: String.raw`This is the load-bearing analytic node: it defines $\pi$ from the cosine series and extracts everything geometric the rest of trigonometry needs. Cosine starts at $1$ and is shown to dip below $0$ by $x = 2$, so by the intermediate value theorem it has a least positive zero, and $\tfrac{\pi}{2}$ is *defined* to be that zero. From the addition formulas one then gets the quarter-turn shift $\cos(x + \tfrac{\pi}{2}) = -\sin x$, hence the $2\pi$-periodicity of both functions, the monotone behaviour on $[0, \pi]$ making $\cos$ a bijection onto $[-1,1]$ — exactly what the geometric angle's $\arccos$ requires — and the exact zero sets.`,
    statement: String.raw`There is a real number $\pi > 0$ with the following properties. Define $\tfrac{\pi}{2} := \inf\{x > 0 : \cos x = 0\}$ and $\pi := 2\cdot\tfrac{\pi}{2}$. Then:
$$\text{(a) } \cos\tfrac{\pi}{2} = 0,\ \sin\tfrac{\pi}{2} = 1,\ \text{and } \cos > 0 \text{ on } [0, \tfrac{\pi}{2});$$
$$\text{(b) } \cos\!\big(x + \tfrac{\pi}{2}\big) = -\sin x,\ \sin\!\big(x + \tfrac{\pi}{2}\big) = \cos x,\ \text{hence } \cos(x+\pi) = -\cos x,\ \sin(x+\pi) = -\sin x;$$
$$\text{(c) } \cos,\sin \text{ are } 2\pi\text{-periodic};$$
$$\text{(d) } \cos : [0, \pi] \to [-1, 1] \text{ is a continuous, strictly decreasing bijection, with } \cos 0 = 1,\ \cos\pi = -1;$$
$$\text{(e) } \cos x = 0 \iff x = \tfrac{\pi}{2} + k\pi,\quad \sin x = 0 \iff x = k\pi \quad (k \in \mathbb{Z}).$$`,
    proof: String.raw`Throughout, $\cos$ and $\sin$ are continuous (indeed differentiable, by **trig-derivatives**, and differentiability implies continuity).

*A positive zero of cosine exists.* $\cos 0 = 1 > 0$. For $\cos 2$, group the **sine-cosine** series as an alternating series $\cos 2 = \sum_{n\ge0} (-1)^n b_n$ with $b_n = 2^{2n}/(2n)!$. The ratio $b_{n+1}/b_n = 4/\big((2n+1)(2n+2)\big)$ is $< 1$ for all $n \ge 1$ (at $n=1$ it is $4/12 = 1/3$), so the magnitudes strictly decrease from $n = 1$ onward, and for such an alternating series the partial sum through any even-indexed term overestimates and through any odd-indexed term underestimates the total. Truncating after $n = 2$,
$$\cos 2 \le b_0 - b_1 + b_2 = 1 - 2 + \tfrac{2}{3} = -\tfrac{1}{3} < 0.$$
By the **intermediate-value-theorem** applied to the continuous $\cos$ on $[0, 2]$ there is a point in $(0,2)$ where $\cos = 0$; the set $Z = \{x > 0 : \cos x = 0\}$ is thus nonempty and bounded below by $0$, so $\tfrac{\pi}{2} := \inf Z$ exists in $[0,2]$, and $\pi := 2\cdot\tfrac{\pi}{2} > 0$.

*(a).* If $0 \le x < \tfrac{\pi}{2}$ then $x \notin Z$ and, since $\tfrac{\pi}{2}$ is the infimum of $Z$, no zero of $\cos$ lies in $[0, \tfrac{\pi}{2})$; as $\cos 0 = 1 > 0$ and $\cos$ is continuous, the intermediate value theorem forbids a sign change, so $\cos > 0$ on $[0, \tfrac{\pi}{2})$. By continuity $\cos\tfrac{\pi}{2} = \lim_{x\uparrow \pi/2}\cos x \ge 0$, and $\tfrac{\pi}{2} \in Z$ (the infimum of the closed-by-continuity zero set is attained), so $\cos\tfrac{\pi}{2} = 0$. By the **pythagorean-identity** $\sin^2\tfrac{\pi}{2} = 1 - 0 = 1$. On $(0, \tfrac{\pi}{2})$, $\sin' = \cos > 0$ (by **trig-derivatives** and the previous line), so by **mvt-monotonicity-corollary** $\sin$ is strictly increasing on $[0, \tfrac{\pi}{2}]$ from $\sin 0 = 0$; hence $\sin\tfrac{\pi}{2} > 0$, forcing $\sin\tfrac{\pi}{2} = +1$.

*(b).* Apply the **angle-addition-formulas** with the pair $x, \tfrac{\pi}{2}$ and substitute $\cos\tfrac{\pi}{2} = 0$, $\sin\tfrac{\pi}{2} = 1$:
$$\cos\!\big(x + \tfrac{\pi}{2}\big) = \cos x\cdot 0 - \sin x\cdot 1 = -\sin x, \qquad \sin\!\big(x + \tfrac{\pi}{2}\big) = \sin x\cdot 0 + \cos x\cdot 1 = \cos x.$$
Iterating once, $\cos(x + \pi) = \cos\!\big((x+\tfrac{\pi}{2}) + \tfrac{\pi}{2}\big) = -\sin(x+\tfrac{\pi}{2}) = -\cos x$, and likewise $\sin(x+\pi) = -\sin x$.

*(c).* Iterating (b) again, $\cos(x + 2\pi) = -\cos(x+\pi) = \cos x$ and $\sin(x + 2\pi) = -\sin(x+\pi) = \sin x$, so both functions are $2\pi$-periodic.

*(d).* On $[0, \tfrac{\pi}{2}]$, $\cos' = -\sin$ and $\sin > 0$ on $(0,\tfrac{\pi}{2})$ (from (a)), so $\cos' < 0$ there and by **mvt-monotonicity-corollary** $\cos$ is strictly decreasing on $[0, \tfrac{\pi}{2}]$ from $1$ to $0$. On $[\tfrac{\pi}{2}, \pi]$ write $x = t + \tfrac{\pi}{2}$ with $t \in [0, \tfrac{\pi}{2}]$; by (b) $\cos x = -\sin t$, and $\sin$ is strictly increasing on $[0,\tfrac{\pi}{2}]$ from $0$ to $1$ (again by **mvt-monotonicity-corollary**, since $\sin' = \cos > 0$ on $(0,\tfrac{\pi}{2})$), so $\cos x = -\sin t$ strictly decreases from $0$ to $-1$. Thus $\cos$ is strictly decreasing on all of $[0,\pi]$, with $\cos 0 = 1$ and $\cos\pi = -1$ (the latter from $\cos\pi = \cos(\tfrac{\pi}{2}+\tfrac{\pi}{2}) = -\sin\tfrac{\pi}{2} = -1$). A continuous, strictly decreasing function on $[0,\pi]$ is injective, and by the **intermediate-value-theorem** its image is exactly $[\cos\pi, \cos 0] = [-1, 1]$; hence $\cos : [0,\pi] \to [-1,1]$ is a bijection.

*(e).* By (d), the only zero of $\cos$ in $[0, \pi]$ is $\tfrac{\pi}{2}$. For arbitrary $x$, write $x = \tfrac{\pi}{2} + s$; by (b), $\cos x = -\sin s$, so $\cos x = 0 \iff \sin s = 0$. It therefore suffices to find all zeros of $\sin$. On $[0, \pi]$, $\sin x = \cos(x - \tfrac{\pi}{2}) = \cos\big(\tfrac{\pi}{2} - x\big)$ (cosine even), and as $x$ runs over $[0,\pi]$, $\tfrac{\pi}{2} - x$ runs over $[-\tfrac{\pi}{2}, \tfrac{\pi}{2}]$, where by (d) and evenness $\cos$ vanishes only at $\pm\tfrac{\pi}{2}$; so on $[0,\pi]$, $\sin$ vanishes exactly at $x = 0$ and $x = \pi$. Since $\sin(x + \pi) = -\sin x$ from (b), the zeros repeat every $\pi$, giving $\sin x = 0 \iff x = k\pi$ for $k \in \mathbb{Z}$. Consequently $\cos x = 0 \iff \sin(x - \tfrac{\pi}{2}) = 0 \iff x - \tfrac{\pi}{2} = k\pi \iff x = \tfrac{\pi}{2} + k\pi$. $\square$`,
  },
  {
    id: 'trig-symmetries',
    label: 'Parity & Co-function',
    title: 'Parity and Co-function Symmetries',
    kind: 'proposition',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'angle-addition-formulas', 'pi-and-periodicity'],
    description: String.raw`Two families of symmetry follow immediately from the series and the addition formulas. Parity is read off the power series — cosine has only even powers, sine only odd — so cosine is even and sine is odd. The co-function relations, where the "co" in cosine means *complementary*, come from the quarter-turn values $\cos\tfrac{\pi}{2} = 0$, $\sin\tfrac{\pi}{2} = 1$ fed into the addition formulas. Together with periodicity these are the workhorses for shifting and folding trigonometric expressions; in particular they yield the supplement identity $\sin(\pi - x) = \sin x$.`,
    statement: String.raw`For all $x \in \mathbb{R}$,
$$\cos(-x) = \cos x, \quad \sin(-x) = -\sin x, \qquad \cos\!\left(\tfrac{\pi}{2} - x\right) = \sin x, \quad \sin\!\left(\tfrac{\pi}{2} - x\right) = \cos x,$$
and consequently $\sin(\pi - x) = \sin x$ and $\cos(\pi - x) = -\cos x$.`,
    proof: String.raw`*Parity.* This was recorded in **sine-cosine**: replacing $x$ by $-x$ leaves every (even) power in the cosine series unchanged and negates every (odd) power in the sine series, so $\cos(-x) = \cos x$ and $\sin(-x) = -\sin x$.

*Co-function.* Apply the **angle-addition-formulas** to $\tfrac{\pi}{2} - x = \tfrac{\pi}{2} + (-x)$, using $\cos\tfrac{\pi}{2} = 0$ and $\sin\tfrac{\pi}{2} = 1$ from **pi-and-periodicity** together with parity:
$$\cos\!\left(\tfrac{\pi}{2} - x\right) = \cos\tfrac{\pi}{2}\cos(-x) - \sin\tfrac{\pi}{2}\sin(-x) = 0\cdot\cos x - 1\cdot(-\sin x) = \sin x,$$
$$\sin\!\left(\tfrac{\pi}{2} - x\right) = \sin\tfrac{\pi}{2}\cos(-x) + \cos\tfrac{\pi}{2}\sin(-x) = 1\cdot\cos x + 0\cdot(-\sin x) = \cos x.$$

*Supplement.* Write $\pi - x = \pi + (-x)$ and use the half-turn relations $\cos(t+\pi) = -\cos t$, $\sin(t+\pi) = -\sin t$ of **pi-and-periodicity** with $t = -x$, then parity: $\sin(\pi - x) = -\sin(-x) = \sin x$ and $\cos(\pi - x) = -\cos(-x) = -\cos x$. $\square$`,
  },
  {
    id: 'tangent',
    label: 'Tangent',
    title: 'Tangent and the Reciprocal Functions',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine', 'pythagorean-identity', 'pi-and-periodicity'],
    description: String.raw`Beyond the two series functions sit four more, built as ratios. Tangent is sine over cosine; its reciprocal is cotangent, and the reciprocals of cosine and sine are secant and cosecant. Together these six are the standard trigonometric functions. Each is a quotient, hence automatically well defined wherever its denominator is nonzero; the precise domains are read off the zero sets of sine and cosine. Dividing the Pythagorean identity by $\cos^2$ or $\sin^2$ yields the companion identities $1 + \tan^2 = \sec^2$ and $1 + \cot^2 = \csc^2$.`,
    definition: String.raw`Wherever the denominators are nonzero, define
$$\tan x := \frac{\sin x}{\cos x}\ (\cos x \neq 0), \quad \cot x := \frac{\cos x}{\sin x}\ (\sin x \neq 0), \quad \sec x := \frac{1}{\cos x}\ (\cos x \neq 0), \quad \csc x := \frac{1}{\sin x}\ (\sin x \neq 0).$$
By the zero sets established in **pi-and-periodicity** ($\cos x = 0 \iff x = \tfrac{\pi}{2} + k\pi$ and $\sin x = 0 \iff x = k\pi$, $k \in \mathbb{Z}$), the domains are: $\tan$ and $\sec$ for $x \neq \tfrac{\pi}{2} + k\pi$, and $\cot$ and $\csc$ for $x \neq k\pi$.`,
    proof: String.raw`*Well-definedness of the domains.* Each of the four functions is a quotient of the everywhere-defined functions $\sin, \cos$ (and the constant $1$), so it is well defined exactly where its denominator is nonzero. By **pi-and-periodicity** the denominator $\cos$ vanishes precisely at $x = \tfrac{\pi}{2} + k\pi$ and $\sin$ precisely at $x = k\pi$; removing these points gives exactly the stated domains. This is the entire content of well-definedness — no identity is needed for it.

*Companion identities (corollaries of the Pythagorean identity).* Where $\cos x \neq 0$, divide the **pythagorean-identity** $\cos^2 x + \sin^2 x = 1$ by $\cos^2 x$:
$$1 + \frac{\sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x}, \qquad\text{i.e.}\qquad 1 + \tan^2 x = \sec^2 x.$$
Where $\sin x \neq 0$, dividing instead by $\sin^2 x$ gives $\cot^2 x + 1 = \csc^2 x$. These are consequences of the Pythagorean identity, valid on the domains just described. $\square$`,
  },
  {
    id: 'double-angle-formulas',
    label: 'Double-Angle',
    title: 'Double-Angle Formulas',
    kind: 'corollary',
    tags: ['Trigonometry'],
    dependencies: ['angle-addition-formulas', 'pythagorean-identity'],
    description: String.raw`Setting both summands equal in the addition formulas collapses them to identities for $\sin 2x$ and $\cos 2x$ in terms of $\sin x$ and $\cos x$. Combined with the Pythagorean identity, the cosine version takes three interchangeable forms, two of which solve for $\cos^2 x$ and $\sin^2 x$ — the power-reduction formulas indispensable when integrating powers of sine and cosine.`,
    statement: String.raw`For all $x \in \mathbb{R}$,
$$\sin 2x = 2\sin x\cos x, \qquad \cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x.$$`,
    proof: String.raw`Put $y = x$ in the **angle-addition-formulas**. The sine formula gives $\sin 2x = \sin x\cos x + \cos x\sin x = 2\sin x\cos x$, and the cosine formula gives $\cos 2x = \cos x\cos x - \sin x\sin x = \cos^2 x - \sin^2 x$. By the **pythagorean-identity** $\sin^2 x = 1 - \cos^2 x$, so $\cos 2x = \cos^2 x - (1 - \cos^2 x) = 2\cos^2 x - 1$; symmetrically substituting $\cos^2 x = 1 - \sin^2 x$ yields $\cos 2x = 1 - 2\sin^2 x$. $\square$`,
  },
  {
    id: 'unit-circle',
    label: 'Unit Circle',
    title: 'Unit Circle and the Wrapping Map',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['circle', 'euclidean-plane', 'sine-cosine', 'trig-derivatives', 'pythagorean-identity', 'pi-and-periodicity', 'riemann-integral'],
    description: String.raw`With sine and cosine already in hand analytically, the unit circle now becomes the place where they acquire their geometric meaning. The map $t \mapsto (\cos t, \sin t)$ lands on the circle (Pythagorean identity), sweeps out the whole circle as $t$ runs over one period (from the structure of $\pi$ and periodicity), and traces it at unit speed: its velocity vector has length $1$ everywhere. The arc-length function of the path, defined as the integral of that speed, therefore equals the parameter $t$ itself. That is what licenses calling $t$ the radian measure of the corresponding angle.`,
    definition: String.raw`The **unit circle** is the **circle** of radius $1$ centred at the origin of the **Euclidean plane**:
$$S^1 = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}.$$
The **wrapping map** is $\gamma : \mathbb{R} \to \mathbb{R}^2,\ \gamma(t) = (\cos t, \sin t)$, with $\cos, \sin$ the analytic functions of **sine-cosine**.`,
    proof: String.raw`*$\gamma$ maps into $S^1$.* By the **pythagorean-identity**, $\cos^2 t + \sin^2 t = 1$ for every $t$, so $\gamma(t) \in S^1$.

*$\gamma$ is $2\pi$-periodic and surjects onto $S^1$.* Periodicity is exactly $\cos(t+2\pi) = \cos t$, $\sin(t+2\pi) = \sin t$ from **pi-and-periodicity**, so it suffices to hit every point of $S^1$ as $t$ ranges over $[0, 2\pi)$. Let $(x, y) \in S^1$, so $x \in [-1,1]$. By **pi-and-periodicity**(d), $\cos : [0, \pi] \to [-1, 1]$ is a bijection, so there is a unique $t_0 \in [0, \pi]$ with $\cos t_0 = x$; then $\sin^2 t_0 = 1 - x^2 = y^2$. Since $\sin \ge 0$ on $[0, \pi]$ (it is $0$ at the endpoints and, being continuous with the only interior zeros excluded by **pi-and-periodicity**(e), keeps the sign it has on $(0,\pi)$, where $\sin\tfrac{\pi}{2} = 1 > 0$), we have $\sin t_0 = |y|$. If $y \ge 0$ then $\gamma(t_0) = (x, y)$. If $y < 0$, take $t = 2\pi - t_0 \in (\pi, 2\pi)$: by parity and periodicity $\cos t = \cos(-t_0) = \cos t_0 = x$ and $\sin t = \sin(-t_0) = -\sin t_0 = -|y| = y$, so $\gamma(t) = (x,y)$. Either way $(x,y)$ is in the image; thus $\gamma$ is surjective onto $S^1$.

*The parameter is arc length.* $\gamma$ is differentiable with $\gamma'(t) = (-\sin t, \cos t)$ by **trig-derivatives**, and its speed is
$$|\gamma'(t)| = \sqrt{\sin^2 t + \cos^2 t} = 1$$
for every $t$, by the **pythagorean-identity**. Define the **arc-length function** of $\gamma$ directly as the integral of its speed,
$$L(t) := \int_0^t |\gamma'(s)|\,ds \qquad (t \ge 0),$$
where the integrand $s \mapsto |\gamma'(s)| \equiv 1$ is continuous, hence integrable as a **riemann-integral**. Since $|\gamma'(s)| = 1$ identically, $L(t) = \int_0^t 1\,ds = t$. Thus $\gamma$ traverses $S^1$ counter-clockwise at unit speed starting from $(1,0)$, and the parameter $t \ge 0$ equals the arc length travelled along $\gamma$ from $(1,0)$ to $\gamma(t)$. $\square$`,
  },
  {
    id: 'angle-measure',
    label: 'Angle Measure',
    title: 'Angle Measure (Radians)',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['unit-circle', 'angle', 'dot-product', 'real-numbers', 'angle-addition-formulas'],
    description: String.raw`To turn an angle into a number one picks a unit; the natural dimensionless choice ties the measure to arc length. The radian measure of an angle is its unsigned size $\theta \in [0,\pi]$ — the arccosine of the normalized dot product of its two side directions, exactly the measure of the **angle** node. Equivalently, placing the vertex at the centre of the unit circle, it is the length of the shorter arc the two sides cut from the rim. By the wrapping map this equals the difference of the two parameters $t$ for which $(\cos t, \sin t)$ lands on the sides — which is why $\cos$ and $\sin$ of an angle are the coordinates of the corresponding point. Assigning a sign and allowing the arc to wind repeatedly then extends the measure to a real number in the standard directed setting.`,
    definition: String.raw`Let an angle have its vertex at the centre $O$ of the **unit circle**, with its two sides meeting the circle in points $A, B$ (so $A, B$ are unit vectors from $O$). Its **radian measure** is the unsigned quantity
$$\theta := \arccos\!\left(\frac{OA \cdot OB}{|OA|\,|OB|}\right) = \arccos(OA \cdot OB) \in [0, \pi],$$
the measure of the **angle** $\angle AOB$ via the **dot-product** as in the **angle** node (here $|OA| = |OB| = 1$). This is manifestly symmetric in $A, B$ and always defined: $\arccos$ is the inverse of the analytic cosine on $[0,\pi]$, and $OA \cdot OB \in [-1, 1]$.

*Equivalence with arc length.* Write $A = \gamma(\alpha)$, $B = \gamma(\beta)$ for the wrapping map $\gamma(t) = (\cos t, \sin t)$, with $\alpha, \beta \in [0, 2\pi)$. Then $OA \cdot OB = \cos\alpha\cos\beta + \sin\alpha\sin\beta = \cos(\beta - \alpha)$ by the angle-addition (cosine of a difference), so $\theta = \arccos(\cos(\beta - \alpha))$ folds $|\beta - \alpha|$ into $[0,\pi]$: it equals the length of the shorter of the two arcs $A, B$ cut from the rim, since by **unit-circle** the parameter measures arc length and the shorter arc has length $\min(|\beta - \alpha|, 2\pi - |\beta - \alpha|) \in [0,\pi]$.

*Signed / winding extension.* Choosing an orientation (positive counter-clockwise, negative clockwise) and allowing the arc to wind repeatedly assigns to a directed angle a real number: the parameter increment $t \in \mathbb{R}$ with $B = \gamma(\alpha + t)$, well-defined modulo $2\pi$. Two values differing by an integer multiple of $2\pi$ describe the same terminal ray; a full revolution has measure $2\pi$, the circumference of the unit circle.`,
  },
  {
    id: 'similar-triangles',
    label: 'Similar Triangles',
    title: 'Similar Triangles (AA Criterion)',
    kind: 'proposition',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'euclidean-plane', 'angle-measure', 'triangle-angle-sum', 'incidence', 'isometry', 'congruence'],
    description: String.raw`Two triangles are similar when one is a scaled copy of the other: same shape, possibly different size. The decisive fact is that this is forced by the angles alone — if two triangles agree in two angles (hence, since the angles sum to $\pi$, in all three) their corresponding sides are in a constant ratio. This is precisely what licenses defining the trigonometric ratios from an angle without reference to the size of the triangle that carries it.`,
    statement: String.raw`Let triangles $ABC$ and $A'B'C'$ have equal corresponding angles: $\angle A = \angle A'$, $\angle B = \angle B'$, $\angle C = \angle C'$ (by the angle sum $\pi$, two equalities force the third). Then the corresponding sides are proportional,
$$\frac{|B'C'|}{|BC|} = \frac{|A'C'|}{|AC|} = \frac{|A'B'|}{|AB|} = k$$
for a single constant $k > 0$; the triangles are **similar**, written $ABC \sim A'B'C'$.`,
    proof: String.raw`*Two angles force the third.* By **triangle-angle-sum** the interior **angle-measure**s of any triangle sum to $\pi$; so $\angle A = \angle A'$ and $\angle B = \angle B'$ give $\angle C = \pi - \angle A - \angle B = \pi - \angle A' - \angle B' = \angle C'$.

*Reduction to a shared base.* Place both **triangle**s in the **Euclidean plane**. Scale $A'B'C'$ about $A'$ by the factor $k := |AB|/|A'B'| > 0$. A scaling about a point (a homothety $X \mapsto A' + k(X - A')$) multiplies every distance by $k$ and preserves angles — it sends each ray from $A'$ to a parallel ray and rescales every segment uniformly, so all three angles are unchanged. The result is a triangle $A'B''C''$ with $|A'B''| = k|A'B'| = |AB|$, the same angles as $A'B'C'$, hence (by the angle equalities) the same angles as $ABC$.

*The shared-base triangles coincide up to congruence.* Now $ABC$ and $A'B''C''$ have a side of equal length, $|AB| = |A'B''|$, with equal adjacent angles $\angle A = \angle A'$ at one endpoint and $\angle B = \angle B'$ at the other. Move $A'B''C''$ by a rigid motion carrying the segment $\overline{A'B''}$ exactly onto $\overline{AB}$. There are exactly two such motions — one direct (translate $A' \mapsto A$, then rotate about $A$ so that $B'' \mapsto B$) and one obtained from it by composing with the reflection across line $AB$ — and they send the image of $C''$ to the two opposite half-planes of line $AB$. Choose the one whose image of $C''$ lies on the **same side of line $AB$ as $C$** (this is always possible precisely because the two motions realize both half-plane choices). Both vertex angles are preserved by any isometry, so the image of $C''$ lies at the intersection of two rays: the ray from $A$ making angle $\angle A$ with $\overline{AB}$, on the $C$-side of line $AB$, and the ray from $B$ making angle $\angle B$ with $\overline{BA}$, on the $C$-side. But $C$ itself lies on exactly those two rays (its angles at $A$ and $B$ are $\angle A$ and $\angle B$ and it is on the $C$-side). On a fixed side of line $AB$, a ray from $A$ at a given angle to $\overline{AB}$ is unique, and likewise for the ray from $B$; these two rays lie on distinct lines, and two distinct lines meet in at most one point (**incidence**), so they meet in a unique point. Therefore the image of $C''$ equals $C$. Hence the chosen isometry carries $A'B''C''$ onto $ABC$, so the two are congruent and all corresponding sides are equal: $|B''C''| = |BC|$, $|A'C''| = |AC|$.

*Conclusion.* Undoing the scaling multiplies each side of $A'B''C''$ by $1/k$ to recover $A'B'C'$, so $|B'C'| = k^{-1}|B''C''| = k^{-1}|BC|$ and likewise $|A'C'| = k^{-1}|AC|$ and $|A'B'| = k^{-1}|AB|$. Thus the three ratios $|B'C'|/|BC| = |A'C'|/|AC| = |A'B'|/|AB|$ share the common value $k^{-1}$, and $ABC \sim A'B'C'$. $\square$`,
  },
  {
    id: 'right-triangle-trig',
    label: 'Right-Triangle Ratios',
    title: 'Right-Triangle Trigonometry',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine', 'similar-triangles', 'angle-measure', 'triangle-angle-sum', 'pythagorean-identity', 'unit-circle'],
    description: String.raw`Long before the unit circle, trigonometry meant ratios of sides in right triangles. Fix an acute angle in a right triangle; the ratios opposite-over-hypotenuse, adjacent-over-hypotenuse, and opposite-over-adjacent depend only on the angle, not on the triangle's size, because all such triangles are similar. These three ratios are exactly sine, cosine, and tangent of the angle — the mnemonic SOHCAHTOA — and they agree with the analytic values.`,
    definition: String.raw`Let a right **triangle** have an acute angle $\theta$, with $\text{opp}$ the leg opposite $\theta$, $\text{adj}$ the leg adjacent to $\theta$, and $\text{hyp}$ the hypotenuse. Define
$$\sin\theta = \frac{\text{opp}}{\text{hyp}}, \qquad \cos\theta = \frac{\text{adj}}{\text{hyp}}, \qquad \tan\theta = \frac{\text{opp}}{\text{adj}}.$$
For $0 < \theta < \tfrac{\pi}{2}$ these agree with the analytic **sine-cosine** values.`,
    proof: String.raw`*Independence of the triangle.* Any two right triangles sharing the acute angle $\theta$ also share the right angle $\tfrac{\pi}{2}$; by **triangle-angle-sum** their third angles agree too, so by **similar-triangles** their sides are proportional, and the three ratios above are unchanged from one such triangle to another, depending on $\theta$ alone.

*Agreement with the analytic values.* For $0 < \theta < \tfrac{\pi}{2}$ take the right triangle with vertices $O = (0,0)$, $P = (\cos\theta, \sin\theta)$ on the unit circle, and the foot $F = (\cos\theta, 0)$. The central angle $\angle FOP$ at $O$ has, as side directions, $u = F - O = (\cos\theta, 0)$ and $v = P - O = (\cos\theta, \sin\theta)$; by **unit-circle**, $P = \gamma(\theta)$ is the image of the wrapping map at parameter $\theta$, and since that parameter is arc length from $(1,0)$ while $F$ lies on the positive $x$-axis ray through $(1,0)$, the **angle-measure** of $\angle FOP$ is exactly $\theta$. The angle at $F$ is right since $\overline{FP}$ is vertical and $\overline{OF}$ horizontal. Here $\theta$ acute makes $\cos\theta, \sin\theta > 0$, so the side lengths are $\text{hyp} = |OP| = \sqrt{\cos^2\theta + \sin^2\theta} = 1$ (by the **pythagorean-identity**), $\text{adj} = |OF| = \cos\theta$, $\text{opp} = |FP| = \sin\theta$. Therefore $\text{opp}/\text{hyp} = \sin\theta$, $\text{adj}/\text{hyp} = \cos\theta$, and $\text{opp}/\text{adj} = \sin\theta/\cos\theta = \tan\theta$, matching the analytic **sine-cosine** values; by the similarity argument the same ratios hold for every right triangle with that acute angle. $\square$`,
  },
  {
    id: 'law-of-cosines',
    label: 'Law of Cosines',
    title: 'Law of Cosines',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'euclidean-plane', 'angle', 'dot-product', 'pythagorean-identity'],
    description: String.raw`The law of cosines is the Pythagorean theorem repaired for triangles that are not right-angled. For a triangle with sides $a, b, c$ and the angle $C$ opposite $c$, the square of $c$ is $a^2 + b^2$ corrected by $-2ab\cos C$. When $C$ is a right angle the cosine vanishes and the correction disappears, recovering $a^2 + b^2 = c^2$. It solves a triangle from two sides and the included angle, or finds an angle from all three sides.`,
    statement: String.raw`In a **triangle** with side lengths $a, b, c$ and interior angle $C$ opposite the side of length $c$,
$$c^2 = a^2 + b^2 - 2ab\cos C.$$`,
    proof: String.raw`Place the vertex $C$ at the origin of the **Euclidean plane**, and let $u, v$ be the two edge vectors from $C$ along the sides enclosing angle $C$, with $|u| = a$, $|v| = b$. The side opposite $C$ runs from the tip of $v$ to the tip of $u$, i.e. is the vector $u - v$, of length $c$. By the **dot-product** (bilinearity and symmetry),
$$c^2 = |u - v|^2 = (u - v)\cdot(u - v) = u\cdot u - 2\,u\cdot v + v\cdot v = a^2 + b^2 - 2\,(u\cdot v).$$
By the definition of **angle**, the interior angle $C$ at the vertex satisfies $\cos C = (u\cdot v)/(|u|\,|v|)$, so $u\cdot v = |u|\,|v|\cos C = ab\cos C$. Substituting,
$$c^2 = a^2 + b^2 - 2ab\cos C.$$
When $C = \tfrac{\pi}{2}$, $\cos C = 0$ and this reduces to the Pythagorean theorem $c^2 = a^2 + b^2$; the **pythagorean-identity** is the analytic shadow of the same right-angle fact. $\square$`,
  },
  {
    id: 'triangle-area-sine',
    label: 'Area = ½ab sin C',
    title: 'Triangle Area from Two Sides and the Included Angle',
    kind: 'proposition',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'right-triangle-trig', 'sine-cosine', 'trig-symmetries'],
    description: String.raw`The area of a triangle is half base times height; trigonometry lets the height be written through an angle. Taking one side as the base, the height is the adjacent side times the sine of the included angle, so the area is $\tfrac12 ab\sin C$. This symmetric formula — area equals half the product of any two sides and the sine of their included angle — is the bridge used to derive the law of sines.`,
    statement: String.raw`A **triangle** with two sides of lengths $a, b$ enclosing an interior angle $C$ has area
$$T = \tfrac{1}{2}\,a b \sin C.$$`,
    proof: String.raw`*Base times height.* Let the side of length $a$ be the base; drop the altitude from the opposite vertex to the line of the base, of length $h$ (the perpendicular distance from that vertex to the base line). We first check $T = \tfrac12 a h$ against the determinant area $T = \tfrac12\,\bigl|\det(B - A \mid C - A)\bigr|$ of the **triangle** node. Place the base along a vector $w$ with $|w| = a$ and let $p$ be the edge vector from a base endpoint to the opposite vertex. Then $\det(w \mid p) = a\,(\text{signed component of } p \text{ perpendicular to } w)$, whose absolute value is $a$ times the perpendicular distance $h$ from the opposite vertex to the base line; hence $\tfrac12\bigl|\det(w \mid p)\bigr| = \tfrac12 a h$, so the determinant area equals $\tfrac12 a h$ and $T = \tfrac12 a h$. The altitude, the side of length $b$, and the base line form a right triangle in which $b$ is the hypotenuse.

If $C$ is acute, the acute angle of this right triangle at the base vertex is $C$ itself, so by **right-triangle-trig** the leg opposite it is $h = b\sin C$, giving $T = \tfrac12 ab\sin C$.

If $C$ is obtuse, the foot of the altitude falls outside the base segment, and the acute angle of the right triangle at the base vertex is the supplement $\pi - C \in (0, \tfrac{\pi}{2})$. By **right-triangle-trig** the leg opposite it is $h = b\sin(\pi - C)$. By the supplement identity $\sin(\pi - C) = \sin C$ of **trig-symmetries** (where, for obtuse $C$, $\sin C$ is the analytic **sine-cosine** value), $h = b\sin C$, so again $T = \tfrac12 ab\sin C$.

If $C = \tfrac{\pi}{2}$, the side of length $b$ is itself the altitude, $h = b = b\sin\tfrac{\pi}{2}$ (since $\sin\tfrac{\pi}{2} = 1$), and $T = \tfrac12 ab = \tfrac12 ab\sin C$. In every case $T = \tfrac12 ab\sin C$. $\square$`,
  },
  {
    id: 'inscribed-angle-theorem',
    label: 'Inscribed Angle',
    title: 'Inscribed Angle Theorem',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['circle', 'triangle', 'angle-measure', 'triangle-angle-sum', 'angle-addition-rays'],
    description: String.raw`An angle whose vertex lies on a circle and whose sides cut a given chord is half the central angle subtending the same chord *on the side away from the vertex*. When the inscribed angle is obtuse that central angle is reflex (greater than $\pi$), a case that must be handled explicitly. A striking corollary: every inscribed angle standing on a fixed chord is the same wherever its vertex sits on the major arc, and an angle inscribed in a semicircle is right (Thales). This is the geometric input that pins the law of sines' common ratio to the diameter of the circumscribed circle.`,
    statement: String.raw`Let $P, A, B$ lie on a **circle** with centre $O$. Let $\beta$ denote the central angle subtending the arc $AB$ that does *not* contain $P$, measured as the rotation about $O$ carrying $A$ to $B$ through that arc — a value in $(0, 2\pi)$, possibly reflex. Then the inscribed angle satisfies
$$\angle APB = \tfrac{1}{2}\,\beta.$$
In particular all inscribed angles on a fixed arc are equal, and an angle inscribed in a semicircle is $\tfrac{\pi}{2}$.`,
    proof: String.raw`Write $r = |OP| = |OA| = |OB|$.

*Diameter sublemma.* If $PX$ is a diameter ($X$ the antipode of $P$), then for any third circle point $A$, $\angle APX = \tfrac12\,\angle AOX$, where $\angle AOX \in [0,\pi]$ is the non-reflex central angle, and $\angle AOX$ equals the arc $AX$ not containing $P$. Indeed **triangle** $OAP$ is isosceles ($|OA| = |OP| = r$), so its base **angle-measure**s agree, $\angle OPA = \angle OAP =: \alpha$; as $O$ lies on segment $PX$, $\angle APX = \angle OPA = \alpha$, and by **triangle-angle-sum** the exterior angle of $OAP$ at $O$ is $\angle AOX = \angle OPA + \angle OAP = 2\alpha = 2\,\angle APX$. Since $P, X$ are antipodal they bound two semicircles; $A$ lies on one, and the arc from $A$ to $X$ within it (not through $P$) has measure $\angle AOX \le \pi$.

Let $D$ be the antipode of $P$. By the sublemma applied to $A$ and to $B$,
$$\angle APD = \tfrac12\,\angle AOD, \qquad \angle BPD = \tfrac12\,\angle BOD, \tag{$*$}$$
with $\angle AOD, \angle BOD \in [0,\pi]$ the arcs $AD$, $BD$ not containing $P$. Rays from the circle point $P$ meet the other points in their cyclic order, so ray $PD$ lies between rays $PA$ and $PB$ exactly when $D$ lies on the arc $AB$ not containing $P$. Three cases.

*Case (i): $D$ on the open arc $AB$ not containing $P$.* That arc splits at $D$ into $\operatorname{arc}(AD)+\operatorname{arc}(DB)$ (neither containing $P$), so $\beta = \angle AOD + \angle BOD$; and ray $PD$ is interior to $\angle APB$, so by **angle-addition-rays** $\angle APB = \angle APD + \angle DPB$. With $(*)$, $\beta = 2(\angle APD + \angle DPB) = 2\,\angle APB$.

*Case (ii): $D$ on the open arc $AB$ containing $P$.* Then $D$ is outside the $P$-free arc $AB$, which is therefore the difference of the two arcs to $D$: $\beta = |\angle AOD - \angle BOD|$. Correspondingly ray $PD$ is exterior to $\angle APB$, so one of $PA, PB$ — say $PB$ after relabelling — lies between the other and $PD$; **angle-addition-rays** gives $\angle APD = \angle APB + \angle BPD$, i.e. $\angle APB = \angle APD - \angle BPD$. With $(*)$, $\beta = |\angle AOD - \angle BOD| = 2\,|\angle APD - \angle BPD| = 2\,\angle APB$.

*Case (iii): $D \in \{A, B\}$.* Then $PA$ or $PB$ is the diameter $PD$, and the sublemma is the whole statement directly: $\angle APB = \angle APD = \tfrac12\angle AOD = \tfrac12\beta$.

In every case $\angle APB = \tfrac12\,\beta$. (Check: $A,B,P$ at $0^\circ, 40^\circ, 300^\circ$ gives $D$ at $120^\circ$ on the arc *containing* $P$, Case (ii): $\angle APD = 60^\circ$, $\angle BPD = 40^\circ$, $\angle APB = 60^\circ - 40^\circ = 20^\circ = \tfrac12\cdot 40^\circ = \tfrac12\beta$.) Since $\beta$ depends only on the chord $AB$ and the arc carrying $P$, all inscribed angles on a fixed arc are equal; and when $AB$ is a diameter $\beta = \pi$, giving $\angle APB = \tfrac{\pi}{2}$. $\square$`,
  },
  {
    id: 'law-of-sines',
    label: 'Law of Sines',
    title: 'Law of Sines',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine', 'triangle-area-sine', 'inscribed-angle-theorem', 'trig-symmetries'],
    description: String.raw`In any triangle the three ratios of a side to the sine of its opposite angle are equal, and their common value is the diameter of the circle through the triangle's three vertices. The proportionality follows at once from the area formula written three ways; identifying the common value with $2R$ is the extended law of sines, a consequence of the inscribed-angle theorem. It solves a triangle from two angles and a side, or from two sides and a non-included angle.`,
    statement: String.raw`In a **triangle** with side lengths $a, b, c$ opposite the interior angles $A, B, C$, and circumradius $R$ (the radius of the unique circle through its three vertices),
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R.$$`,
    proof: String.raw`*Existence and uniqueness of the circumcircle.* The three vertices are non-collinear (a **triangle**), so the perpendicular bisectors of two of its sides are non-parallel lines and meet in a single point $O$ equidistant from all three vertices; that common distance is the circumradius $R$, and $O$ is the unique such centre (any point equidistant from all three lies on both perpendicular bisectors, hence equals their unique intersection). The circle $C(O, R)$ is the unique circle through $A, B, C$.

*Proportionality.* By **triangle-area-sine** the area $T$ of the **triangle** can be computed from any two sides and their included angle:
$$T = \tfrac12 bc\sin A = \tfrac12 ca\sin B = \tfrac12 ab\sin C.$$
Multiplying all three by $2/(abc)$ gives $\dfrac{\sin A}{a} = \dfrac{\sin B}{b} = \dfrac{\sin C}{c}$, and taking reciprocals, $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$.

*The common value is $2R$.* Consider the side $a = |BC|$ and the inscribed angle $A$ at the third vertex, subtending the chord $BC$. By the **inscribed-angle-theorem** the central rotation $\beta$ subtending the arc $BC$ not containing the vertex $A$ satisfies $\beta = 2A$. In the isosceles triangle $OBC$ ($|OB| = |OC| = R$), drop the perpendicular from $O$ to the midpoint $M$ of $BC$. There are three cases:
- If $A < \tfrac{\pi}{2}$, then $\beta = 2A < \pi$ is the apex angle $\angle BOC$ of triangle $OBC$; the perpendicular bisector splits it into two congruent right triangles with half-apex-angle $A$, so $\tfrac{a}{2} = |OB|\sin A = R\sin A$, i.e. $a = 2R\sin A$.
- If $A = \tfrac{\pi}{2}$, then $\beta = \pi$, so $O$ lies on $BC$ and $BC$ is a diameter; thus $a = |BC| = 2R = 2R\cdot 1 = 2R\sin\tfrac{\pi}{2} = 2R\sin A$.
- If $A > \tfrac{\pi}{2}$, then $\beta = 2A > \pi$ is reflex, so the non-reflex apex angle of $OBC$ is $\angle BOC = 2\pi - \beta = 2\pi - 2A$; the right-triangle split now gives $\tfrac{a}{2} = R\sin\big(\tfrac{2\pi - 2A}{2}\big) = R\sin(\pi - A) = R\sin A$ (by the supplement identity $\sin(\pi - A) = \sin A$ of **trig-symmetries**), so again $a = 2R\sin A$.

In all cases $a/\sin A = 2R$, and by the proportionality every ratio equals $2R$. $\square$`,
  },
]
