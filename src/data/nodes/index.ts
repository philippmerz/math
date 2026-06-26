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
import { REPRESENTATION_THEORY_NODES } from './representation-theory.ts'
import { COMMUTATIVE_ALGEBRA_NODES } from './commutative-algebra.ts'
import { THEORY_OF_COMPUTATION_NODES } from './theory-of-computation.ts'
import { HOMOLOGICAL_ALGEBRA_NODES } from './homological-algebra.ts'
import { HARMONIC_ANALYSIS_NODES } from './harmonic-analysis.ts'
import { PDE_NODES } from './partial-differential-equations.ts'
import { ALGEBRAIC_GEOMETRY_NODES } from './algebraic-geometry.ts'
import { STOCHASTIC_PROCESSES_NODES } from './stochastic-processes.ts'
import { INFORMATION_THEORY_NODES } from './information-theory.ts'
import { GAME_THEORY_NODES } from './game-theory.ts'
import { DIFFERENTIAL_TOPOLOGY_NODES } from './differential-topology.ts'
import { LIE_THEORY_NODES } from './lie-theory.ts'
import { ALGEBRAIC_NUMBER_THEORY_NODES } from './algebraic-number-theory.ts'
import { ANALYTIC_NUMBER_THEORY_NODES } from './analytic-number-theory.ts'
import { DYNAMICAL_SYSTEMS_NODES } from './dynamical-systems.ts'
import { NUMERICAL_ANALYSIS_NODES } from './numerical-analysis.ts'
import { CONVEX_ANALYSIS_NODES } from './convex-analysis.ts'
import { CALCULUS_OF_VARIATIONS_NODES } from './calculus-of-variations.ts'
import { MODEL_THEORY_NODES } from './model-theory.ts'
import { MACHINE_LEARNING_THEORY_NODES } from './machine-learning-theory.ts'

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
  ...REPRESENTATION_THEORY_NODES,
  ...COMMUTATIVE_ALGEBRA_NODES,
  ...THEORY_OF_COMPUTATION_NODES,
  ...HOMOLOGICAL_ALGEBRA_NODES,
  ...HARMONIC_ANALYSIS_NODES,
  ...PDE_NODES,
  ...ALGEBRAIC_GEOMETRY_NODES,
  ...STOCHASTIC_PROCESSES_NODES,
  ...INFORMATION_THEORY_NODES,
  ...GAME_THEORY_NODES,
  ...DIFFERENTIAL_TOPOLOGY_NODES,
  ...LIE_THEORY_NODES,
  ...ALGEBRAIC_NUMBER_THEORY_NODES,
  ...ANALYTIC_NUMBER_THEORY_NODES,
  ...DYNAMICAL_SYSTEMS_NODES,
  ...NUMERICAL_ANALYSIS_NODES,
  ...CONVEX_ANALYSIS_NODES,
  ...CALCULUS_OF_VARIATIONS_NODES,
  ...MODEL_THEORY_NODES,
  ...MACHINE_LEARNING_THEORY_NODES,
]
