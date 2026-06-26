import type { MathNode } from '../types'
import { LOGIC_NODES } from './logic.ts'
import { SET_THEORY_NODES } from './set-theory.ts'
import { ORDER_THEORY_NODES } from './order-theory.ts'
import { ALGEBRA_NODES } from './algebra.ts'
import { LINEAR_ALGEBRA_NODES } from './linear-algebra.ts'
import { ANALYSIS_NODES } from './analysis.ts'
import { DIFFERENTIAL_EQUATIONS_NODES } from './differential-equations.ts'
import { OPTIMIZATION_NODES } from './optimization.ts'
import { GEOMETRY_NODES } from './geometry.ts'
import { TRIGONOMETRY_NODES } from './trigonometry.ts'
import { MEASURE_THEORY_NODES } from './measure-theory.ts'
import { PROBABILITY_NODES } from './probability.ts'
import { STATISTICS_NODES } from './statistics.ts'
import { TOPOLOGY_NODES } from './topology.ts'
import { COMPLEX_ANALYSIS_NODES } from './complex-analysis.ts'
import { MULTIVARIABLE_CALCULUS_NODES } from './multivariable-calculus.ts'
import { NUMBER_THEORY_NODES } from './number-theory.ts'
import { DIFFERENTIAL_GEOMETRY_NODES } from './differential-geometry.ts'
import { CATEGORY_THEORY_NODES } from './category-theory.ts'
import { TYPE_THEORY_NODES } from './type-theory.ts'
import { FUNCTIONAL_ANALYSIS_NODES } from './functional-analysis.ts'
import { GRAPH_THEORY_NODES } from './graph-theory.ts'
import { COMBINATORICS_NODES } from './combinatorics.ts'
import { ALGEBRAIC_TOPOLOGY_NODES } from './algebraic-topology.ts'

/**
 * The full node corpus, assembled from one file per mathematical area so the
 * data scales and stays merge-friendly (contributors and verifier agents touch
 * only the relevant area). Ordering here is foundational; the graph layout is
 * driven by `dependencies`, not array order.
 */
export const MATH_NODES: MathNode[] = [
  ...LOGIC_NODES,
  ...SET_THEORY_NODES,
  ...ORDER_THEORY_NODES,
  ...ALGEBRA_NODES,
  ...LINEAR_ALGEBRA_NODES,
  ...ANALYSIS_NODES,
  ...DIFFERENTIAL_EQUATIONS_NODES,
  ...OPTIMIZATION_NODES,
  ...GEOMETRY_NODES,
  ...TRIGONOMETRY_NODES,
  ...MEASURE_THEORY_NODES,
  ...PROBABILITY_NODES,
  ...STATISTICS_NODES,
  ...TOPOLOGY_NODES,
  ...COMPLEX_ANALYSIS_NODES,
  ...MULTIVARIABLE_CALCULUS_NODES,
  ...NUMBER_THEORY_NODES,
  ...DIFFERENTIAL_GEOMETRY_NODES,
  ...CATEGORY_THEORY_NODES,
  ...TYPE_THEORY_NODES,
  ...FUNCTIONAL_ANALYSIS_NODES,
  ...GRAPH_THEORY_NODES,
  ...COMBINATORICS_NODES,
  ...ALGEBRAIC_TOPOLOGY_NODES,
]
