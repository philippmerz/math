import type { MathNode } from '../types'

export const OPTIMIZATION_NODES: MathNode[] = [
  {
    id: 'critical-point',
    label: 'Critical Point',
    title: 'Critical Point',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['derivative'],
    definition: String.raw`A **critical point** (stationary point) of a differentiable $f$ is where the derivative vanishes — $f'(x) = 0$ in one variable, $\nabla f(x) = 0$ in several. By **Fermat's theorem**, every interior local extremum is critical, so critical points are the candidates for maxima and minima; classifying them needs higher-order information.`,
  },
  {
    id: 'extreme-value-theorem',
    label: 'Extreme Value Theorem',
    title: 'Extreme Value Theorem',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['continuity'],
    definition: String.raw`A continuous function on a closed, bounded interval $[a, b]$ attains a maximum and a minimum. Existence is guaranteed before any calculus is done; if $f$ is also differentiable, the optimizers lie among the critical points, the endpoints, and any points where $f'$ fails to exist. (In general, $[a, b]$ is replaced by a nonempty compact set.)`,
  },
  {
    id: 'convex-set',
    label: 'Convex Set',
    title: 'Convex Set',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['vector-space'],
    definition: String.raw`A **convex set** $C$ contains the whole segment between any two of its points:
$$x, y \in C,\ t \in [0, 1] \;\Rightarrow\; t x + (1 - t) y \in C.$$
Convexity rules out dents and holes. It is the geometric backbone of optimization, where it makes local information determine global structure.`,
  },
  {
    id: 'convex-function',
    label: 'Convex Function',
    title: 'Convex Function',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['convex-set', 'derivative'],
    definition: String.raw`A function $f$ on a convex domain is **convex** when its graph lies on or below each of its chords:
$$f\bigl(t x + (1 - t) y\bigr) \le t f(x) + (1 - t) f(y),\qquad t \in [0, 1].$$
For twice-differentiable $f$ this is $f'' \ge 0$ (a positive-semidefinite Hessian in several variables). The decisive consequence: for a convex function, every local minimum is global.`,
  },
  {
    id: 'gradient-descent',
    label: 'Gradient Descent',
    title: 'Gradient Descent',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['gradient'],
    definition: String.raw`**Gradient descent** minimizes a differentiable $f$ by repeatedly stepping opposite the gradient:
$$x_{k+1} = x_k - \eta\,\nabla f(x_k),$$
with step size (learning rate) $\eta > 0$. Away from stationary points each step decreases $f$ for small enough $\eta$; on a convex objective with a suitably small step size it converges to a global minimum (when one exists). It is the workhorse of modern machine learning.`,
  },
  {
    id: 'lagrange-multipliers',
    label: 'Lagrange Multipliers',
    title: 'Lagrange Multipliers',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['gradient'],
    definition: String.raw`**Lagrange multipliers** handle optimization under an equality constraint. To extremize $f$ subject to $g = 0$, at a constrained extremum where the constraint is regular ($\nabla g \neq 0$) the gradients must be parallel:
$$\nabla f = \lambda\,\nabla g,\qquad g = 0.$$
Then $f$ cannot improve along the constraint surface, so $\nabla f$ has no component tangent to it; the multiplier $\lambda$ measures the optimum's sensitivity to the constraint.`,
  },
  {
    id: 'convex-optimization',
    label: 'Convex Optimization',
    title: 'Convex Optimization',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['convex-function', 'convex-set', 'gradient'],
    definition: String.raw`**Convex optimization** minimizes a convex function over a convex set. Because every local minimum is then global and first-order conditions are sufficient, such problems can be solved reliably and efficiently — by gradient and interior-point methods, with duality providing optimality certificates. The convex/non-convex divide, more than linear/non-linear, marks the practical boundary of tractable optimization.`,
  },
  {
    id: 'kkt-conditions',
    label: 'KKT Conditions',
    title: 'Karush–Kuhn–Tucker Conditions',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['lagrange-multipliers', 'convex-function'],
    definition: String.raw`The **Karush–Kuhn–Tucker conditions** extend Lagrange multipliers to *inequality* constraints. At an optimum (under a constraint qualification) they require stationarity of the Lagrangian, primal and dual feasibility, and **complementary slackness** $\lambda_i\,g_i = 0$. For convex problems they are also sufficient — any KKT point is then a global optimum — the cornerstone of constrained convex optimization.`,
  },
]
