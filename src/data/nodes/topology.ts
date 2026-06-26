import type { MathNode } from '../types'

/** Topology — 7 nodes. */
export const TOPOLOGY_NODES: MathNode[] = [
  {
    id: 'metric-space',
    label: 'Metric Space',
    title: 'Metric Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['real-numbers', 'set'],
    definition: String.raw`A **metric space** $(X, d)$ is a set with a **distance** $d : X \times X \to [0, \infty)$ that is positive-definite ($d(x, y) = 0 \Leftrightarrow x = y$), symmetric, and satisfies the triangle inequality $d(x, z) \le d(x, y) + d(y, z)$. It abstracts the distance $|x - y|$ on $\mathbb{R}$, providing the general setting for limits, continuity, and completeness.`,
  },
  {
    id: 'topological-space',
    label: 'Topological Space',
    title: 'Topological Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['set'],
    definition: String.raw`A **topological space** $(X, \tau)$ equips a set with a family $\tau$ of **open sets** that contains $\varnothing$ and $X$ and is closed under arbitrary unions and finite intersections. This minimal structure already supports continuity, convergence, and compactness — abstracting a metric space by keeping only the notion of *openness*, not distance.`,
  },
  {
    id: 'open-closed-sets',
    label: 'Open & Closed Sets',
    title: 'Open and Closed Sets',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    definition: String.raw`In a topological space the **open sets** are the members of the topology, and a set is **closed** when its complement is open. The **closure** of a set is the smallest closed set containing it, the **interior** the largest open set inside it, and the **boundary** what lies in neither interior nor exterior. These are the topological replacements for "nearby."`,
  },
  {
    id: 'continuous-map',
    label: 'Continuous Map',
    title: 'Continuous Map',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    definition: String.raw`A map $f : X \to Y$ between topological spaces is **continuous** when the preimage of every open set is open:
$$f^{-1}(U) \text{ is open for every open } U \subseteq Y.$$
This is the topological form of the $\varepsilon$–$\delta$ definition, which it recovers on metric spaces, and it makes continuity depend only on the open sets.`,
  },
  {
    id: 'homeomorphism',
    label: 'Homeomorphism',
    title: 'Homeomorphism',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['continuous-map'],
    definition: String.raw`A **homeomorphism** is a continuous bijection with continuous inverse — an isomorphism of topological spaces. Homeomorphic spaces share every property expressible through open sets (famously, a coffee mug and a doughnut), and topology is the study of exactly the features such maps preserve.`,
  },
  {
    id: 'connectedness',
    label: 'Connectedness',
    title: 'Connectedness',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    definition: String.raw`A space is **connected** when it cannot be partitioned into two disjoint non-empty open sets — it is all one piece. The connected subsets of $\mathbb{R}$ are precisely the intervals, and continuous maps preserve connectedness, which is what makes the intermediate value theorem hold.`,
  },
  {
    id: 'hausdorff-space',
    label: 'Hausdorff Space',
    title: 'Hausdorff Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    definition: String.raw`A space is **Hausdorff** ($T_2$) when any two distinct points lie in disjoint open neighbourhoods. This separation axiom makes limits unique and singletons closed; metric spaces are Hausdorff, and the spaces of analysis and geometry are almost always assumed to be.`,
  },
]
