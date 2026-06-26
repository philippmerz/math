import type { MathNode } from '../types'

export const TRIGONOMETRY_NODES: MathNode[] = [
  {
    id: 'angle-measure',
    label: 'Angle Measure',
    title: 'Angle Measure (Radians)',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['angle', 'real-numbers'],
    definition: String.raw`**Angle measure** assigns each angle a real number. In **radians**, the measure is the length of the arc the angle subtends on a unit circle centred at its vertex, so a straight angle is $\pi$ and a right angle is $\tfrac{\pi}{2}$ (a full turn, $2\pi$). Allowing the arc length to be *signed* and to wind around repeatedly extends measure to all of $\mathbb{R}$, making the trigonometric functions $2\pi$-periodic functions on $\mathbb{R}$.`,
  },
  {
    id: 'unit-circle',
    label: 'Unit Circle',
    title: 'Unit Circle',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['circle', 'euclidean-plane'],
    definition: String.raw`The **unit circle** is the circle of radius $1$ centred at the origin of the Euclidean plane:
$$\{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}.$$
Wrapping the real line around it — signed arc length $\theta$, positive counter-clockwise from $(1, 0)$ — converts angle measure into coordinates, the basis of trigonometry.`,
  },
  {
    id: 'sine-cosine',
    label: 'Sine & Cosine',
    title: 'Sine and Cosine',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['unit-circle', 'angle-measure'],
    definition: String.raw`For an angle $\theta$ (in radians), **cosine** and **sine** are the coordinates of the point reached by travelling a signed arc length $\theta$ counter-clockwise along the unit circle from $(1, 0)$ (clockwise when $\theta < 0$):
$$(\cos\theta, \sin\theta) \in \{(x,y) : x^2 + y^2 = 1\}.$$
As $\theta$ ranges over $\mathbb{R}$ they give $2\pi$-periodic functions $\cos, \sin : \mathbb{R} \to [-1, 1]$, the prototypes of oscillation.`,
  },
  {
    id: 'tangent',
    label: 'Tangent',
    title: 'Tangent',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine'],
    definition: String.raw`The **tangent** is the ratio
$$\tan\theta := \frac{\sin\theta}{\cos\theta},$$
defined wherever $\cos\theta \neq 0$. Together with its reciprocal $\cot = \cos/\sin$ and the reciprocals $\sec = 1/\cos$, $\csc = 1/\sin$ of the base functions, it completes the six trigonometric functions. Geometrically $\tan\theta$ is the slope of the ray from the origin at angle $\theta$.`,
  },
  {
    id: 'pythagorean-identity',
    label: 'Pythagorean Identity',
    title: 'Pythagorean Identity',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine'],
    definition: String.raw`The **Pythagorean identity** is the Pythagorean theorem read off the unit circle:
$$\cos^2\theta + \sin^2\theta = 1 \qquad \text{for all } \theta \in \mathbb{R}.$$
It is the fundamental relation among the trigonometric functions, from which identities like $1 + \tan^2\theta = \sec^2\theta$ follow.`,
  },
  {
    id: 'right-triangle-trig',
    label: 'Right-Triangle Ratios',
    title: 'Right-Triangle Trigonometry',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine'],
    definition: String.raw`In a **right triangle**, an acute angle $\theta$ fixes the ratios of side lengths, independent of the triangle's size (by similarity):
$$\sin\theta = \frac{\text{opposite to }\theta}{\text{hypotenuse}},\quad \cos\theta = \frac{\text{adjacent to }\theta}{\text{hypotenuse}},\quad \tan\theta = \frac{\text{opposite to }\theta}{\text{adjacent to }\theta}.$$
This "SOHCAHTOA" picture agrees with the unit-circle definition and is the classical face of trigonometry.`,
  },
  {
    id: 'law-of-cosines',
    label: 'Law of Cosines',
    title: 'Law of Cosines',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine'],
    definition: String.raw`The **law of cosines** generalizes the Pythagorean theorem to any triangle with sides $a, b, c$ and angle $C$ opposite side $c$:
$$c^2 = a^2 + b^2 - 2ab\cos C.$$
The correction $-2ab\cos C$ vanishes when $C = 90^\circ$, recovering $a^2 + b^2 = c^2$. It solves a triangle from two sides and the included angle.`,
  },
  {
    id: 'law-of-sines',
    label: 'Law of Sines',
    title: 'Law of Sines',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine'],
    definition: String.raw`In any triangle each side is proportional to the sine of its opposite angle,
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R,$$
the shared ratio being the diameter $2R$ of the circumscribed circle. It solves a triangle given two angles and a side.`,
  },
]
