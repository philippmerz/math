import type { MathNode } from '../types'

export const DIFFERENTIAL_EQUATIONS_NODES: MathNode[] = [
  {
    id: 'differential-equation',
    label: 'Differential Equation',
    title: 'Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['derivative'],
    definition: String.raw`A **differential equation** relates an unknown function to its derivatives. Its *order* is that of the highest derivative present, and a *solution* is a function satisfying it on its domain. Differential equations are the language of natural law — expressing how quantities change in terms of their current state.`,
  },
  {
    id: 'ordinary-differential-equation',
    label: 'ODE',
    title: 'Ordinary Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['differential-equation'],
    definition: String.raw`An **ordinary differential equation** (ODE) involves a function of a single variable and its derivatives, e.g. the first-order form
$$y'(t) = f\bigl(t, y(t)\bigr).$$
Any explicit higher-order ODE reduces to a first-order *system* by naming the derivatives as new variables, so this form is general. ODEs model time evolution: motion, growth, decay, circuits.`,
  },
  {
    id: 'initial-value-problem',
    label: 'Initial Value Problem',
    title: 'Initial Value Problem',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['ordinary-differential-equation'],
    definition: String.raw`An **initial value problem** pairs an ODE with the state at one instant:
$$y' = f(t, y),\qquad y(t_0) = y_0.$$
The initial condition aims to single out one trajectory from the family of solutions. Whether such a trajectory exists and, when it does, is unique is the basic well-posedness question, answered locally by Picard–Lindelöf.`,
  },
  {
    id: 'picard-lindelof',
    label: 'Existence & Uniqueness',
    title: 'Picard–Lindelöf Theorem',
    kind: 'theorem',
    tags: ['Differential Equations'],
    dependencies: ['initial-value-problem', 'banach-fixed-point'],
    definition: String.raw`The **Picard–Lindelöf theorem**: if $f(t, y)$ is continuous and Lipschitz in $y$, the initial value problem $y' = f(t, y),\ y(t_0) = y_0$ has a unique solution on some interval around $t_0$. The proof recasts the ODE as the integral fixed-point equation
$$y(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds$$
and applies the Banach fixed-point theorem to the contraction $y \mapsto$ (its right-hand side).`,
  },
  {
    id: 'linear-differential-equation',
    label: 'Linear ODE',
    title: 'Linear Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['ordinary-differential-equation', 'linear-map'],
    definition: String.raw`A **linear differential equation** is linear in the unknown and its derivatives, e.g. $y'' + p(t)\,y' + q(t)\,y = g(t)$. Its homogeneous solutions ($g = 0$) obey **superposition**: they form a vector space — the kernel of a linear differential operator — and the general solution is any particular solution plus that space. Linearity makes these the most completely solvable differential equations.`,
  },
  {
    id: 'partial-differential-equation',
    label: 'PDE',
    title: 'Partial Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['partial-derivative', 'differential-equation'],
    definition: String.raw`A **partial differential equation** relates a multivariable function to its *partial* derivatives, e.g. $u_t = u_{xx}$. With several independent variables — often space and time — PDEs govern fields and continua: heat, waves, fluids, electromagnetism, quantum states. They are far richer and harder than ODEs, their solutions shaped decisively by boundary and initial data.`,
  },
  {
    id: 'classical-pdes',
    label: 'Heat · Wave · Laplace',
    title: 'Heat, Wave, and Laplace Equations',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['partial-differential-equation'],
    definition: String.raw`Three linear second-order PDEs anchor the theory:
$$u_t = \alpha\,u_{xx}\ \text{(heat)},\qquad u_{tt} = c^2\,u_{xx}\ \text{(wave)},\qquad u_{xx} + u_{yy} = 0\ \text{(Laplace)}.$$
They are the prototypes of *parabolic*, *hyperbolic*, and *elliptic* equations — modelling diffusion, propagation, and equilibrium — and motivate separation of variables, Fourier series, and Green's functions.`,
  },
]
