import type { MathNode } from '../types'

export const GAME_THEORY_NODES: MathNode[] = [
  // ── The strategic model ────────────────────────────────────────────────────
  {
    id: 'strategic-game',
    label: 'Strategic Game',
    title: 'Strategic (Normal-Form) Game',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['function', 'cartesian-product'],
    description: String.raw`The basic model of interacting rational agents distils any conflict or cooperation — economic, evolutionary, political — into three data: who is playing, what each can choose, and what each gets for every combination of choices. There is no time and no information structure here: all players choose simultaneously and once, so a strategy is simply a choice. This flat "normal form" is the canvas on which the central solution concepts (dominance, Nash equilibrium, the value of a zero-sum game) are defined.`,
    definition: String.raw`A **strategic (normal-form) game** is a tuple $G = (N, (S_i)_{i\in N}, (u_i)_{i\in N})$ where $N$ is a finite set of **players**; for each $i$, $S_i$ is a nonempty set of **pure strategies**; and $u_i : S \to \mathbb{R}$ is the **payoff (utility) function** of player $i$, defined on the set of **strategy profiles** $S = \prod_{j\in N} S_j$ (a **cartesian product**). Writing $s = (s_i, s_{-i})$ to separate player $i$'s choice $s_i$ from the others' $s_{-i} \in S_{-i} := \prod_{j\ne i} S_j$, the number $u_i(s)$ is $i$'s payoff at profile $s$. The game is **finite** when $N$ and every $S_i$ are finite.`,
  },
  {
    id: 'dominant-strategy',
    label: 'Dominant Strategy',
    title: 'Dominance',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game'],
    description: String.raw`Some choices are good no matter what the opponents do, and some are bad no matter what. A strategy strictly dominates another when it does strictly better against every profile of the others' choices; a rational player never uses a strictly dominated strategy, since switching always helps. This single observation can solve a game outright: iteratively deleting strictly dominated strategies can shrink the game to one outcome, and when every player has a strategy that dominates all of theirs, the result is forced.`,
    definition: String.raw`Fix a player $i$ in a **strategic game**. A pure strategy $s_i \in S_i$ **strictly dominates** $s_i' \in S_i$ if
$$u_i(s_i, s_{-i}) > u_i(s_i', s_{-i}) \quad\text{for every } s_{-i} \in S_{-i},$$
and **weakly dominates** it if the inequality is $\ge$ everywhere and strict for at least one $s_{-i}$. A strategy is **(strictly) dominant** if it (strictly) dominates every other strategy in $S_i$, and **(strictly) dominated** if some other strategy dominates it. **Iterated elimination of strictly dominated strategies** is the process of repeatedly deleting strictly dominated strategies from all players' strategy sets.`,
  },
  {
    id: 'mixed-strategy',
    label: 'Mixed Strategy',
    title: 'Mixed Strategy & Expected Payoff',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'probability-space', 'expectation'],
    description: String.raw`Allowing a player to deliberately randomize — choosing each pure strategy with some probability — does more than model bluffing: it convexifies the strategy space. The set of probability distributions over a finite set is a simplex, a compact convex body, and the payoff, being an average, depends continuously and multilinearly on the probabilities. That smooth convex structure is exactly what a fixed-point theorem needs, and it is why every finite game has a Nash equilibrium in mixed strategies even when it has none in pure ones (matching pennies). A player is willing to mix only among strategies that are all best — the indifference principle used to solve for equilibria.`,
    definition: String.raw`In a finite **strategic game**, a **mixed strategy** for player $i$ is a probability distribution $\sigma_i$ over $S_i$: a vector $\sigma_i \in \Delta(S_i) := \{\,p : S_i \to [0,1] \mid \sum_{s_i} p(s_i) = 1\,\}$, the **simplex** on $S_i$. Its **support** is $\{\,s_i : \sigma_i(s_i) > 0\,\}$. A pure strategy is the degenerate distribution putting mass $1$ on one point. A **mixed profile** $\sigma = (\sigma_i)_{i\in N}$ makes the players' choices independent, defining a **probability** distribution on $S$ with $\sigma(s) = \prod_i \sigma_i(s_i)$; player $i$'s **expected payoff** is the **expectation**
$$U_i(\sigma) = \sum_{s\in S} \Bigl(\prod_{j} \sigma_j(s_j)\Bigr)\, u_i(s),$$
which is affine (multilinear) in each $\sigma_i$ separately, hence continuous in $\sigma$.`,
  },
  {
    id: 'best-response',
    label: 'Best Response',
    title: 'Best Response',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'mixed-strategy', 'expectation'],
    description: String.raw`Fixing what everyone else does, a player's best response is whatever maximizes their own expected payoff against it. The set of best responses, viewed as a function of the others' profile, is the best-response correspondence; equilibrium is the demand that everyone is simultaneously playing a best response. Because the expected payoff is linear in a player's own mixing weights, a mixed strategy is a best response exactly when every pure strategy in its support is a best response — the indifference principle that makes equilibria computable.`,
    definition: String.raw`In a finite **strategic game** with **mixed**-strategy payoffs $U_i$, the **best-response correspondence** of player $i$ assigns to each profile $\sigma_{-i}$ of the others the set
$$B_i(\sigma_{-i}) = \operatorname*{arg\,max}_{\sigma_i \in \Delta(S_i)} U_i(\sigma_i, \sigma_{-i}) \subseteq \Delta(S_i).$$
Since $U_i(\sigma_i, \sigma_{-i}) = \sum_{s_i} \sigma_i(s_i)\, U_i(s_i, \sigma_{-i})$ is linear in $\sigma_i$, its maximum over the simplex is attained, and $\sigma_i \in B_i(\sigma_{-i})$ iff $\sigma_i$ places all its mass on pure strategies maximizing $s_i \mapsto U_i(s_i, \sigma_{-i})$ — the **indifference principle**: every pure strategy in the support of a best response yields the same, maximal, expected payoff.`,
  },
  {
    id: 'nash-equilibrium',
    label: 'Nash Equilibrium',
    title: 'Nash Equilibrium',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'mixed-strategy', 'best-response'],
    description: String.raw`The central solution concept: a profile of strategies in which no one can gain by changing course alone. Each player is playing a best response to the others, so the configuration is self-enforcing — once there, no individual has reason to move. It captures strategic stability rather than collective good: as the prisoner's dilemma shows, the unique equilibrium can leave everyone worse off than an outcome they could all agree to but none can unilaterally reach.`,
    definition: String.raw`A mixed profile $\sigma^* = (\sigma_i^*)_{i\in N}$ in a finite **strategic game** is a **Nash equilibrium** if every player is playing a **best response** to the others:
$$U_i(\sigma_i^*, \sigma_{-i}^*) \ge U_i(\sigma_i, \sigma_{-i}^*) \quad \text{for all } i \in N \text{ and all } \sigma_i \in \Delta(S_i),$$
equivalently $\sigma_i^* \in B_i(\sigma_{-i}^*)$ for every $i$. A **pure-strategy** Nash equilibrium is one in which each $\sigma_i^*$ is a pure strategy. By linearity in $\sigma_i$ it suffices to check no profitable deviation to a pure strategy: $\sigma^*$ is a Nash equilibrium iff $U_i(\sigma^*) \ge U_i(s_i, \sigma_{-i}^*)$ for every player $i$ and pure strategy $s_i \in S_i$.`,
  },
  {
    id: 'nash-existence-theorem',
    label: 'Nash Existence',
    title: 'Nash Existence Theorem',
    kind: 'theorem',
    tags: ['Game Theory'],
    dependencies: ['nash-equilibrium', 'best-response', 'mixed-strategy', 'brouwer-fixed-point-theorem'],
    description: String.raw`Every finite game has at least one Nash equilibrium in mixed strategies — existence, though not uniqueness, is guaranteed. This is the theorem that made equilibrium analysis universally applicable. Its proof is the archetype of the topological existence argument: the space of mixed profiles is a compact convex body, the requirement of being a mutual best response can be encoded as a fixed point of a continuous self-map, and Brouwer's theorem then produces a fixed point that one verifies is exactly an equilibrium — without ever exhibiting it.`,
    statement: String.raw`Every finite **strategic game** $G = (N, (S_i), (u_i))$ has at least one **Nash equilibrium** in mixed strategies.`,
    proof: String.raw`The space of mixed profiles $\Delta = \prod_{i\in N} \Delta(S_i)$ is a product of simplices: a nonempty, compact, convex subset of a Euclidean space, and (having nonempty interior in its affine hull) homeomorphic to a closed ball $D^m$. The expected payoffs $U_i$ are continuous on $\Delta$ (polynomials in the mixing weights).

Following Nash's original construction, define for each player $i$ and pure strategy $a \in S_i$ the **gain** from switching to $a$,
$$\varphi_{i,a}(\sigma) = \max\bigl(0,\ U_i(a, \sigma_{-i}) - U_i(\sigma)\bigr) \ge 0,$$
a continuous function of $\sigma$. Define $f : \Delta \to \Delta$ componentwise by
$$f(\sigma)_{i}(a) = \frac{\sigma_i(a) + \varphi_{i,a}(\sigma)}{1 + \sum_{a'\in S_i} \varphi_{i,a'}(\sigma)}.$$
Each coordinate vector is nonnegative and sums to $1$, so $f(\sigma) \in \Delta$, and $f$ is continuous. By the **Brouwer fixed point theorem** (applicable since $\Delta \cong D^m$), $f$ has a fixed point $\sigma^*$.

At $\sigma^*$, writing $\Phi_i = \sum_{a'} \varphi_{i,a'}(\sigma^*)$, the fixed-point equation $\sigma_i^*(a)\,(1 + \Phi_i) = \sigma_i^*(a) + \varphi_{i,a}(\sigma^*)$ gives
$$\sigma_i^*(a)\,\Phi_i = \varphi_{i,a}(\sigma^*) \quad \text{for every } a \in S_i. \tag{$\ast$}$$
Fix a player $i$. Since $U_i(\sigma^*) = \sum_{a} \sigma_i^*(a)\,U_i(a, \sigma_{-i}^*)$ is a convex average of the numbers $U_i(a,\sigma_{-i}^*)$ over the support of $\sigma_i^*$, at least one support strategy $a_0$ (with $\sigma_i^*(a_0) > 0$) has $U_i(a_0, \sigma_{-i}^*) \le U_i(\sigma^*)$, hence $\varphi_{i,a_0}(\sigma^*) = 0$. Then $(\ast)$ reads $\sigma_i^*(a_0)\,\Phi_i = 0$ with $\sigma_i^*(a_0) > 0$, forcing $\Phi_i = 0$. As $\Phi_i$ is a sum of nonnegative terms, every $\varphi_{i,a}(\sigma^*) = 0$, i.e. $U_i(a, \sigma_{-i}^*) \le U_i(\sigma^*)$ for **all** pure $a \in S_i$ — no profitable deviation. This holds for every player, so by the pure-deviation criterion $\sigma^*$ is a **best response** for each, hence a **Nash equilibrium**. $\square$`,
  },

  // ── Zero-sum games and the minimax theorem ─────────────────────────────────
  {
    id: 'zero-sum-game',
    label: 'Zero-Sum Game',
    title: 'Zero-Sum Game',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'mixed-strategy'],
    description: String.raw`A game of pure opposition: whatever one side wins, the others lose, so the payoffs cancel at every outcome. The two-player case is the cleanest in all of game theory — one number describes each outcome, the row player tries to push it up and the column player to push it down — and it is the setting of von Neumann's minimax theorem, the result that founded the field. Matching pennies and most parlour games are zero-sum.`,
    definition: String.raw`A **strategic game** is **zero-sum** if $\sum_{i\in N} u_i(s) = 0$ for every profile $s \in S$. The two-player case $N = \{1,2\}$ has $u_2 = -u_1$, so it is described by a single **payoff matrix** $A = (a_{kl})$ with $a_{kl} = u_1(\text{row } k, \text{column } l)$: player $1$ (the **maximizer**) chooses a row to make $a_{kl}$ large, player $2$ (the **minimizer**) a column to make it small. Under **mixed strategies** $x \in \Delta(S_1)$, $y \in \Delta(S_2)$ the expected payoff to player $1$ is the bilinear form $x^{\top} A y = \sum_{k,l} x_k a_{kl} y_l$, which player $1$ maximizes and player $2$ minimizes.`,
  },
  {
    id: 'minimax-theorem',
    label: 'Minimax Theorem',
    title: 'Minimax Theorem',
    kind: 'theorem',
    tags: ['Game Theory'],
    dependencies: ['zero-sum-game', 'mixed-strategy', 'nash-existence-theorem', 'strategic-game'],
    description: String.raw`Von Neumann's founding theorem: in a finite two-player zero-sum game, what the maximizer can guarantee by planning for the worst equals what the minimizer can hold him to. The two operations $\max\min$ and $\min\max$ — securing against an adversary who moves second versus first — give the same number $v$, the value of the game, and each player has a mixed strategy achieving it regardless of the opponent. The order of play stops mattering. Equivalent to linear-programming duality, it is the special, sharper face of Nash existence when interests are exactly opposed.`,
    statement: String.raw`For a finite two-player **zero-sum game** with payoff matrix $A$, there is a number $v$ (the **value**) with
$$\max_{x\in\Delta(S_1)}\ \min_{y\in\Delta(S_2)}\, x^{\top} A y \;=\; \min_{y\in\Delta(S_2)}\ \max_{x\in\Delta(S_1)}\, x^{\top} A y \;=\; v,$$
and **optimal mixed strategies** $x^{*}, y^{*}$ attaining it: $x^{*}$ guarantees player $1$ at least $v$ against any $y$, and $y^{*}$ holds player $1$ to at most $v$ against any $x$.`,
    proof: String.raw`*Easy inequality (always holds).* For any fixed $x_0, y_0$, $\min_y x_0^{\top} A y \le x_0^{\top} A y_0 \le \max_x x^{\top} A y_0$. The outer terms no longer depend on the inner variables, so taking $\sup_{x_0}$ on the left and $\inf_{y_0}$ on the right gives
$$\max_x \min_y x^{\top} A y \;\le\; \min_y \max_x x^{\top} A y. \tag{1}$$
(Both extrema are attained: the maps are continuous and the simplices **compact** convex sets of **mixed strategies**.)

*Reverse inequality, via Nash.* View the matrix game as a two-player **strategic game** with payoffs $u_1(x,y) = x^{\top} A y$ and $u_2 = -u_1$ — a **zero-sum game**. By the **Nash existence theorem** it has a Nash equilibrium $(x^{*}, y^{*})$ in mixed strategies. Equilibrium means each player best-responds: $x^{*}$ maximizes $u_1(\cdot, y^{*})$ and $y^{*}$ maximizes $u_2(x^{*}, \cdot) = -u_1(x^{*}, \cdot)$, i.e. minimizes $u_1(x^{*}, \cdot)$. Put $v := x^{*\top} A y^{*}$. Then
$$\min_y \max_x x^{\top} A y \;\le\; \max_x x^{\top} A y^{*} \;=\; x^{*\top} A y^{*} \;=\; v \;=\; \min_y x^{*\top} A y \;\le\; \max_x \min_y x^{\top} A y. \tag{2}$$
Chaining (1) and (2) forces all quantities equal to $v$. The same computation shows $x^{*\top} A y \ge v$ for all $y$ (so $x^{*}$ secures $v$) and $x^{\top} A y^{*} \le v$ for all $x$ (so $y^{*}$ caps player $1$ at $v$); thus $x^{*}, y^{*}$ are optimal. $\square$`,
  },
  {
    id: 'prisoners-dilemma',
    label: "Prisoner's Dilemma",
    title: "Prisoner's Dilemma",
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['dominant-strategy', 'nash-equilibrium', 'best-response'],
    description: String.raw`The emblematic game where individual rationality and the common good collide. Each of two players chooses to cooperate or defect; defecting is better whatever the other does, so both defect — yet both would prefer the outcome where both cooperate. The unique equilibrium is Pareto-inefficient, which is the whole point: it shows that self-interested rational play can produce a result everyone dislikes. The same structure recurs in arms races, price wars, and climate policy, and motivates the study of repetition and enforcement, where the threat of future punishment can rescue cooperation.`,
    definition: String.raw`The **prisoner's dilemma** is the two-player **strategic game** with strategy set $\{C, D\}$ (cooperate / defect) for each player and symmetric payoffs given, for the row player, by the matrix
$$\begin{pmatrix} R & S \\ T & P \end{pmatrix} \quad (\text{rows } C, D;\ \text{columns } C, D),$$
the column player's payoffs being the transpose, where the four numbers satisfy
$$T > R > P > S.$$
Here $R$ is the mutual-cooperation reward, $P$ the mutual-defection punishment, $T$ the temptation to defect on a cooperator, and $S$ the sucker's payoff. (For the repeated game one also imposes $2R > T + S$, so that alternating exploitation is worse than steady cooperation.)`,
    proof: String.raw`*Defection is strictly dominant and $(D,D)$ is the unique Nash equilibrium.* For the row player, compare $D$ to $C$ holding the column fixed: if the column plays $C$, defecting yields $T$ versus $R$, and $T > R$; if the column plays $D$, defecting yields $P$ versus $S$, and $P > S$. So $D$ strictly dominates $C$ for the row player whatever the column does, and by symmetry likewise for the column player — $D$ is a strictly **dominant strategy** for both. In any **Nash equilibrium** each player plays a **best response**; but against any (mixed) profile of the opponent, the strictly dominant $D$ strictly outperforms $C$ and any mixture using $C$, so the unique best response is the pure $D$. Hence the only equilibrium is $(D, D)$, with payoffs $(P, P)$ — strictly worse for both than the unchosen $(C, C)$ outcome $(R, R)$ since $R > P$. $\square$`,
  },

  // ── Dynamic games ──────────────────────────────────────────────────────────
  {
    id: 'extensive-form-game',
    label: 'Extensive-Form Game',
    title: 'Extensive-Form Game',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'tree'],
    description: String.raw`Sequential play is modelled by a game tree: players move in turn, and the structure makes timing, commitment, and observation explicit — everything the flat normal form hides. Each non-terminal node is a decision point belonging to some player; the branches are the moves available there; the leaves carry the payoffs. Information sets record what a player can and cannot distinguish when called to move, which is how imperfect information (simultaneous or hidden moves) is encoded. Under perfect information every information set is a single node, and the game is solved by reasoning backward from the leaves.`,
    definition: String.raw`An **extensive-form game** consists of a finite rooted **tree** whose non-leaf nodes are partitioned among the players (each such node is a **decision node** of its owner) and a **chance** player if desired; the edges out of a node are the **actions** there; each leaf carries a payoff vector $(u_i)_{i\in N}$. Each player's decision nodes are grouped into **information sets**, where nodes in the same set have the same available actions and the player cannot tell which of them has been reached. The game has **perfect information** if every information set is a singleton. A (pure) **strategy** for player $i$ is a choice of action at each of $i$'s information sets; in the absence of chance a strategy profile determines a single path from root to leaf — with chance moves it induces a probability distribution over root-to-leaf paths — and hence the (expected) payoffs, so the extensive game induces a **strategic game** on these strategies. A **subgame** is the extensive game on the subtree rooted at a node $v$ such that $\{v\}$ is a singleton information set **and** the subtree cuts no information set — for every information set $I$, either all nodes of $I$ lie in the subtree or none do. This last condition (Selten's) ensures the subtree is a self-contained game: whenever a player moves inside it, she knows that play has reached this subgame. Under perfect information every node automatically satisfies it, so every node roots a subgame.`,
  },
  {
    id: 'subgame-perfect-equilibrium',
    label: 'Subgame Perfection',
    title: 'Subgame-Perfect Equilibrium',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['extensive-form-game', 'nash-equilibrium'],
    description: String.raw`Nash equilibrium in extensive games is too permissive: it can be propped up by threats a player would never actually carry out, because nothing forces equilibrium behaviour off the path of play. Subgame perfection closes this loophole by demanding that the strategies form a Nash equilibrium not just overall but in every subgame — including ones reached only after someone deviates. This rules out non-credible threats and enforces sequential rationality at every decision point; in finite games of perfect information it is exactly what backward induction computes.`,
    definition: String.raw`A strategy profile in an **extensive-form game** is a **subgame-perfect equilibrium (SPE)** if its restriction to every **subgame** is a **Nash equilibrium** of that subgame. Equivalently, at the root of every subgame — a node whose singleton forms its own information set and whose subtree cuts no information set — the continuation strategies form a Nash equilibrium of the subgame that starts there, so the prescribed play is optimal even after histories that the equilibrium itself would never produce, ruling out **non-credible threats**. Under **perfect information** every decision node roots a subgame, so the requirement applies at every node; under imperfect information it applies only at genuine subgame roots (insisting on optimality at *every* decision node is the stronger notion of sequential rationality). Every SPE is in particular a Nash equilibrium of the whole game (the whole tree is a subgame), but not conversely.`,
  },
  {
    id: 'backward-induction',
    label: 'Backward Induction',
    title: 'Backward Induction (Kuhn–Zermelo)',
    kind: 'theorem',
    tags: ['Game Theory'],
    dependencies: ['extensive-form-game', 'subgame-perfect-equilibrium', 'nash-equilibrium'],
    description: String.raw`In a finite game where everyone always sees the full history, the game can simply be solved from its end: at each last decision the mover picks the best action, those payoffs are folded back into the preceding node, and so on up to the root. This procedure not only finds an equilibrium, it finds a subgame-perfect one in pure strategies — establishing that such equilibria always exist for finite perfect-information games (Zermelo's theorem on chess is the special case of a strictly competitive win/lose/draw game). The construction is the algorithmic heart of sequential rationality.`,
    statement: String.raw`Every finite **extensive-form game** of **perfect information** has a **subgame-perfect equilibrium** in pure strategies, obtained by **backward induction**: starting from the decision nodes nearest the leaves and proceeding toward the root, at each node the owning player chooses an action leading to a successor of maximal continuation payoff for that player.`,
    proof: String.raw`By induction on the height $h$ (longest root-to-leaf path) of the subtree rooted at a node $v$, we show the subgame at $v$ has a pure SPE together with a well-defined **value vector** $V(v) \in \mathbb{R}^N$ recording the payoffs it yields.

*Base ($h = 0$).* $v$ is a leaf; set $V(v)$ to be its payoff vector, with the empty strategy.

*Step.* Suppose every child of $v$, each rooting a subgame of smaller height, has by hypothesis a pure SPE with value vector $V(c)$. (Perfect information makes each child the root of its own singleton-information-set **subgame**, so the hypothesis applies.) Let $i$ be the player who moves at $v$. Have $i$ choose an action to a child $c^{*} \in \arg\max_{c} V(c)_i$ (any maximizer; for a chance node take the expectation over children instead), and combine this choice with the inductively chosen SPE strategies in all the children. Set $V(v) := V(c^{*})$.

The resulting profile is an SPE of the subgame at $v$. First, in any proper subgame — rooted at some descendant — it restricts to the SPE built there, hence is a **Nash equilibrium** of it by hypothesis. It remains to check that the profile is a Nash equilibrium of the subgame at $v$ itself, which requires bounding *arbitrary* strategies of the mover $i$, not only a one-shot change of action at $v$: a strategy of $i$ in the subgame at $v$ prescribes an action at every one of $i$'s decision nodes throughout the whole subtree, so a deviation may alter the action at $v$ **and** play a different continuation below the chosen child. So consider any strategy of player $i$ in the subgame at $v$, and let $c$ be the child it directs play to at $v$. Once $c$ is reached, the others follow their prescribed continuation; by the inductive hypothesis the prescribed profile restricted to the subgame at $c$ is a Nash equilibrium, so $i$'s prescribed continuation there is a best response to those fixed continuations, and therefore *no* continuation of $i$ in the subgame at $c$ does better than $V(c)_i$. Hence $i$'s payoff from any strategy that reaches $c$ is at most $V(c)_i \le \max_{c'} V(c')_i = V(c^{*})_i$, which is exactly the payoff $i$ obtains under the prescribed profile. So $i$ has no profitable deviation; and no other player acts at $v$. Combined with the proper-subgame check, the profile is a Nash equilibrium of *every* subgame, i.e. a **subgame-perfect equilibrium**. Taking $v$ the root completes the proof. $\square$`,
  },
  {
    id: 'repeated-game',
    label: 'Repeated Game',
    title: 'Repeated Game',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'nash-equilibrium', 'expectation'],
    description: String.raw`Playing the same stage game again and again changes everything: a player's choice today is observed and can be rewarded or punished tomorrow, so the shadow of the future disciplines present behaviour. Payoffs across periods are aggregated, typically by geometric discounting that weighs the present more than the distant future. Strategies become history-dependent plans — like tit-for-tat or grim trigger — and outcomes unreachable as equilibria of the one-shot game (notably cooperation in the prisoner's dilemma) can become self-enforcing, which is the content of the folk theorem.`,
    definition: String.raw`Given a finite **strategic game** $G$ (the **stage game**) with payoffs $g_i$, the **infinitely repeated game** $G^{\infty}(\delta)$ plays $G$ in periods $t = 0, 1, 2, \dots$. A **history** $h^t = (a^0, \dots, a^{t-1})$ records the action profiles played so far; a **strategy** for player $i$ maps each history to a stage choice, so play may depend on the entire past. With **discount factor** $\delta \in (0,1)$, player $i$'s overall payoff for an action stream $(a^t)_{t\ge 0}$ is the normalized discounted sum (an **expectation** when strategies randomize)
$$(1 - \delta)\sum_{t=0}^{\infty} \delta^{t}\, g_i(a^{t}),$$
normalized so that a constant stream of stage payoff $c$ is worth exactly $c$. Equilibria are defined as for any strategic game; subgame-perfect equilibria require optimality after every history.`,
  },
  {
    id: 'folk-theorem',
    label: 'Folk Theorem',
    title: 'Folk Theorem',
    kind: 'theorem',
    tags: ['Game Theory'],
    dependencies: ['repeated-game', 'nash-equilibrium', 'subgame-perfect-equilibrium', 'prisoners-dilemma'],
    description: String.raw`Repetition vastly enlarges the set of equilibrium outcomes. The folk theorem says that with patient enough players, essentially any individually rational outcome — in particular mutually beneficial cooperation that is impossible in the one-shot game — can be sustained as an equilibrium, held in place by the credible threat of future punishment. The simplest version uses grim-trigger strategies that revert forever to a stage-game equilibrium after any defection: when the future matters enough, the once-off gain from cheating is outweighed by the permanent loss of cooperation. It explains how cooperation can emerge among purely self-interested agents — the resolution of the prisoner's dilemma under repetition.`,
    statement: String.raw`Let $G$ be a finite stage game with a **Nash equilibrium** $e$ of stage payoff $g_i(e)$, and let $a^{*}$ be an action profile with $g_i(a^{*}) > g_i(e)$ for every player $i$. Then there is a threshold $\underline{\delta} < 1$ such that for all discount factors $\delta \in (\underline{\delta}, 1)$ the **repeated game** $G^{\infty}(\delta)$ has a **subgame-perfect equilibrium** whose outcome is $a^{*}$ played every period, yielding each player the cooperative payoff $g_i(a^{*})$. In particular, in the repeated **prisoner's dilemma** mutual cooperation $(C,C)$ is sustainable for patient players.`,
    proof: String.raw`*Grim-trigger profile.* Each player plays $a_i^{*}$ in every period as long as the full history consists only of $a^{*}$; if ever any player has deviated from $a^{*}$, all players play the stage-equilibrium action $e_i$ forever after. On the equilibrium path everyone plays $a^{*}$ each period, for normalized discounted payoff $g_i(a^{*})$.

*No profitable deviation (one-shot deviation principle).* For discounted repeated games payoffs are continuous at infinity, so a profile is subgame perfect iff no player can gain by a **single-period** deviation after any history (the *one-shot deviation principle*). We check this. After a history already containing a deviation, every continuation prescribes the constant stream $e$; since $e$ is a stage **Nash equilibrium**, no single-period change is profitable. On the equilibrium path, if player $i$ deviates this period he earns at most $M_i := \max_{a_i} g_i(a_i, a_{-i}^{*})$ now and triggers reversion to $e$ forever after, for a normalized payoff at most
$$(1 - \delta) M_i + \delta\, g_i(e),$$
whereas conforming yields $g_i(a^{*})$. Conformity is optimal iff
$$g_i(a^{*}) \;\ge\; (1 - \delta) M_i + \delta\, g_i(e) \iff (1 - \delta)\bigl(M_i - g_i(e)\bigr) \;\le\; g_i(a^{*}) - g_i(e).$$
The right side is a fixed positive number (as $g_i(a^{*}) > g_i(e)$) and the left side tends to $0$ as $\delta \to 1$, so the inequality holds for $\delta$ near $1$; taking $\underline{\delta} = \max_i\bigl(1 - \tfrac{g_i(a^{*}) - g_i(e)}{M_i - g_i(e)}\bigr)$ (terms with $M_i = g_i(e)$ impose no constraint) makes it hold for all players simultaneously when $\delta > \underline{\delta}$.

Thus for $\delta > \underline{\delta}$ no one-shot deviation is profitable after any history, so the grim-trigger profile is a **subgame-perfect equilibrium** sustaining $a^{*}$. For the **prisoner's dilemma**, take $a^{*} = (C,C)$ and $e = (D,D)$: since $R > P$, the hypothesis $g_i(a^{*}) > g_i(e)$ holds, so cooperation is sustainable. $\square$`,
  },

  // ── Cooperative games ──────────────────────────────────────────────────────
  {
    id: 'shapley-value',
    label: 'Shapley Value',
    title: 'Cooperative Games & the Shapley Value',
    kind: 'definition',
    tags: ['Game Theory'],
    dependencies: ['strategic-game', 'expectation'],
    description: String.raw`Cooperative game theory drops strategies and asks only what each coalition can achieve together, then how to divide the spoils fairly among the players. The Shapley value answers with a single formula: pay each player their average marginal contribution, taken over all orders in which the players might join the grand coalition. Equivalently, imagine the players arriving in a uniformly random order and credit each with the worth they add on arrival; the Shapley value is the expected credit. It is the canonical notion of a fair allocation, used to attribute cost, value, and (in machine learning) feature importance.`,
    definition: String.raw`A **cooperative (coalitional) game** on a finite player set $N$ is a function $v : 2^{N} \to \mathbb{R}$ with $v(\varnothing) = 0$, where $v(S)$ is the **worth** of coalition $S$. The **Shapley value** $\phi(v) \in \mathbb{R}^{N}$ assigns to player $i$ the average marginal contribution over all orderings of $N$:
$$\phi_i(v) = \frac{1}{|N|!} \sum_{\pi} \bigl[\, v(P_i^{\pi} \cup \{i\}) - v(P_i^{\pi}) \,\bigr] = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!\,(|N| - |S| - 1)!}{|N|!}\,\bigl[\, v(S \cup \{i\}) - v(S) \,\bigr],$$
where the first sum is over all $|N|!$ orderings $\pi$ of $N$ and $P_i^{\pi}$ is the set of players preceding $i$ in $\pi$. It is the **expectation** of $i$'s marginal contribution $v(S\cup\{i\}) - v(S)$ when the players join in a uniformly random order, with $S$ the random set of predecessors.`,
  },
  {
    id: 'shapley-axioms',
    label: 'Shapley Axioms',
    title: 'Axiomatic Characterization of the Shapley Value',
    kind: 'theorem',
    tags: ['Game Theory'],
    dependencies: ['shapley-value', 'vector-space', 'basis'],
    description: String.raw`The Shapley value is not just one reasonable allocation among many — it is the only allocation rule obeying four elementary fairness requirements: it divides exactly the whole pie (efficiency), treats interchangeable players alike (symmetry), gives nothing to a player who never contributes (null player), and is additive over independent games (linearity). The uniqueness proof is a clean piece of linear algebra: the unanimity games form a basis for the space of all cooperative games, the axioms pin down the value on each basis game, and linearity extends it uniquely to all games.`,
    statement: String.raw`On the space of cooperative games on a fixed finite player set $N$, the **Shapley value** $\phi$ is the unique map $v \mapsto \phi(v) \in \mathbb{R}^{N}$ satisfying: (i) **Efficiency** — $\sum_{i\in N} \phi_i(v) = v(N)$; (ii) **Symmetry** — if players $i, j$ are interchangeable ($v(S\cup\{i\}) = v(S\cup\{j\})$ for all $S$ containing neither), then $\phi_i(v) = \phi_j(v)$; (iii) **Null player** — if $v(S\cup\{i\}) = v(S)$ for all $S$, then $\phi_i(v) = 0$; (iv) **Linearity** — $\phi(av + bw) = a\,\phi(v) + b\,\phi(w)$.`,
    proof: String.raw`*The Shapley value satisfies the axioms.* Each term of the random-order formula is, for a fixed ordering, an exact split of $v(N)$ as a telescoping sum of marginal contributions, so averaging gives **efficiency**. Linearity is immediate since $\phi_i$ is a fixed linear combination of the values $v(S)$. If $i$ is a null player every marginal contribution $v(S\cup\{i\}) - v(S)$ vanishes, so $\phi_i(v) = 0$. If $i, j$ are interchangeable, the bijection on orderings swapping $i$ and $j$ matches their marginal contributions term by term, giving $\phi_i = \phi_j$ — symmetry.

*Uniqueness.* The cooperative games on $N$ form a real **vector space** of dimension $2^{|N|} - 1$ (one coordinate $v(S)$ per nonempty $S$). For each nonempty $T \subseteq N$ define the **unanimity game** $u_T$ by $u_T(S) = 1$ if $T \subseteq S$ and $0$ otherwise. These $\{u_T\}$ are a **basis**: any $v$ has the unique expansion $v = \sum_{\varnothing \ne T} c_T\, u_T$ with **Harsanyi dividends** $c_T = \sum_{R \subseteq T} (-1)^{|T| - |R|} v(R)$ (Möbius inversion), and there are $2^{|N|}-1$ of them, matching the dimension.

Now let $\psi$ be *any* map satisfying (i)–(iv). On a scaled unanimity game $c\,u_T$: every player $i \notin T$ is a null player (adding $i$ never completes $T$), so $\psi_i(c\,u_T) = 0$ by (iii); the players $i \in T$ are pairwise interchangeable, so by (ii) they share a common value, and by (i) efficiency these must sum to $(c\,u_T)(N) = c$, forcing $\psi_i(c\,u_T) = c/|T|$ for $i \in T$. Thus $\psi$ is completely determined on every scaled unanimity game. By **linearity** (iv) applied to the basis expansion $v = \sum_T c_T u_T$, $\psi(v) = \sum_T \psi(c_T u_T)$ is determined for every $v$. Since the Shapley value $\phi$ is one such map, $\psi = \phi$; the value is unique. $\square$`,
  },
]
