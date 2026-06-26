/**
 * Curated links per area, used two ways:
 *   1. Easter egg — clicking an area's name anywhere opens one of its links in a
 *      new tab with no label or explanation, just the destination (use `url`;
 *      for a two-link area, opening one at random per click makes it replayable).
 *   2. A "collection" page that lists every resource with its title, kind, and
 *      blurb for context.
 *
 * Keyed by the area name exactly as it appears in `MathNode.tags`. Each area has
 * 1–2 picks chosen for being philosophically grounding, exceptionally
 * illuminating, or simply delightful — quality over quantity. Every URL was
 * HTTP-verified (200) on 2026-06-26.
 *
 * Some resources serve two fields (e.g. Wadler's "Propositions as Types" under
 * both Logic and Type Theory; the 3Blue1Brown zeta video under both Complex
 * Analysis and Number Theory; Seeing Theory under both Probability and
 * Statistics) — each entry is self-contained per area.
 */
export type AreaLink = {
  url: string
  title: string
  kind: 'video' | 'interactive' | 'essay' | 'book' | 'talk' | 'reference' | 'course'
  blurb: string
}

export const AREA_LINKS: Record<string, AreaLink[]> = {
  Algebra: [
    {
      url: 'https://www.3blue1brown.com/lessons/groups-and-monsters',
      title: 'Group theory, abstraction, and the 196,883-dimensional monster',
      kind: 'video',
      blurb: `Grant Sanderson distills what a group really is — the pure abstraction of symmetry — then rides that idea all the way up to the Monster, a symmetry object that only fits in 196,883 dimensions.`,
    },
    {
      url: 'https://nathancarter.github.io/group-explorer/index.html',
      title: 'Group Explorer',
      kind: 'interactive',
      blurb: `Spin Cayley diagrams in 3D and flip through multiplication tables and cycle graphs until abstract groups stop being axioms and become shapes you can grab and rotate.`,
    },
  ],
  Analysis: [
    {
      url: 'https://www.3blue1brown.com/lessons/essence-of-calculus/',
      title: 'Essence of Calculus (3Blue1Brown)',
      kind: 'video',
      blurb: `Grant Sanderson rebuilds calculus from scratch with gorgeous animation, starting from a circle's area so you feel you could have invented derivatives and integrals yourself.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/continuity/',
      title: 'Continuity and Infinitesimals (Stanford Encyclopedia of Philosophy)',
      kind: 'essay',
      blurb: `The deep backstory of what analysis is really about: a sweeping history of the continuum and the infinitely small, from Zeno to the 19th-century rigorization that banished infinitesimals and to their modern rehabilitation.`,
    },
  ],
  'Category Theory': [
    {
      url: 'https://www.math3ma.com/blog/what-is-category-theory-anyway',
      title: 'What is Category Theory Anyway? (Tai-Danae Bradley, Math3ma)',
      kind: 'essay',
      blurb: `A short, vivid essay that reframes category theory not as another branch of math but as the common gene uniting them all, where objects are understood entirely by the web of relationships they keep.`,
    },
    {
      url: 'https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/',
      title: 'Category Theory for Programmers (Bartosz Milewski)',
      kind: 'book',
      blurb: `The beloved free book that makes the abstract concrete, arguing that composition is the essence of both category theory and programming, with every idea backed by real code.`,
    },
  ],
  'Complex Analysis': [
    {
      url: 'https://www.youtube.com/watch?v=0z1fIsUNhO4',
      title: 'Möbius Transformations Revealed',
      kind: 'video',
      blurb: `A gorgeous three-minute film showing that the seemingly disparate motions of the complex plane are all just a single sphere being moved around in space — the geometric soul of complex analysis made visible.`,
    },
    {
      url: 'https://www.3blue1brown.com/lessons/zeta',
      title: 'Visualizing the Riemann zeta function and analytic continuation (3Blue1Brown)',
      kind: 'video',
      blurb: `Grant Sanderson animates how a complex function bends and stretches the plane, turning the mysterious idea of analytic continuation — and the legendary Riemann zeta function — into something you can actually see.`,
    },
  ],
  'Differential Equations': [
    {
      url: 'https://www.youtube.com/watch?v=p_di4Zn4wz4',
      title: "Differential equations, a tourist's guide | DE1 (3Blue1Brown)",
      kind: 'video',
      blurb: `Grant Sanderson's gorgeously animated tour of what differential equations actually are: vector fields, phase space, swinging pendulums, and the humbling fact that most of them can't be solved.`,
    },
    {
      url: 'http://www.malinc.se/m/Lorenz.php',
      title: 'Interactive Lorenz Attractor',
      kind: 'interactive',
      blurb: `Release 10,000 butterflies into the Lorenz system and watch near-identical starting points fan out into chaos: the butterfly effect made tangible and mesmerizing in your browser.`,
    },
  ],
  'Differential Geometry': [
    {
      url: 'https://www.numberphile.com/videos/the-remarkable-way-we-eat-pizza',
      title: 'The Remarkable Way We Eat Pizza (Numberphile)',
      kind: 'video',
      blurb: `Cliff Stoll shows that folding a floppy slice to eat it IS Gauss's Theorema Egregium in action — turning an everyday hack into the soul of the field: curvature is intrinsic.`,
    },
    {
      url: 'https://www.cs.cmu.edu/~kmcrane/Projects/DDG/',
      title: 'Discrete Differential Geometry — Keenan Crane',
      kind: 'course',
      blurb: `A free, breathtakingly illustrated course (notes, video lectures, and code) that builds geometry from curves and surfaces up through curvature and exterior calculus, making the abstract tangible and computable.`,
    },
  ],
  'Functional Analysis': [
    {
      url: 'https://thenumb.at/Functions-are-Vectors/',
      title: 'Functions are Vectors',
      kind: 'essay',
      blurb: `A gorgeous, interactively illustrated essay that takes one idea — a function is just an infinite-dimensional vector — and runs it all the way to inner products, eigenfunctions, the spectral theorem and Fourier series.`,
    },
    {
      url: 'https://mathshistory.st-andrews.ac.uk/Extras/Ulam_Scottish_Cafe/',
      title: 'Ulam: The Scottish Café',
      kind: 'essay',
      blurb: `Stanisław Ulam's firsthand memoir of the café in Lwów where Banach and friends invented functional analysis over coffee on erasable marble tabletops — the most legendary mathematical hangout in history.`,
    },
  ],
  Geometry: [
    {
      url: 'https://www.c82.net/euclid/',
      title: "Byrne's Euclid (interactive edition)",
      kind: 'interactive',
      blurb: `Oliver Byrne's dazzling 1847 color edition of Euclid's Elements, reborn as clickable diagrams where every shape in a proof lights up the axioms it rests on.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/geometry-19th/',
      title: 'Nineteenth Century Geometry (Stanford Encyclopedia of Philosophy)',
      kind: 'reference',
      blurb: `The story of how geometry stopped being the single true picture of space and exploded into a family of geometries (non-Euclidean, Riemann, Klein's Erlangen Program), shattering the Kantian dream of certainty.`,
    },
  ],
  'Linear Algebra': [
    {
      url: 'https://www.3blue1brown.com/lessons/eola-preview/',
      title: 'Essence of Linear Algebra (3Blue1Brown)',
      kind: 'video',
      blurb: `Grant Sanderson's animated series rebuilds linear algebra from the ground up as geometry, so you finally see what a matrix, determinant, or eigenvector actually does to space.`,
    },
    {
      url: 'https://immersivemath.com/ila/index.html',
      title: 'Immersive Linear Algebra',
      kind: 'interactive',
      blurb: `A free textbook whose every figure is a live, draggable diagram, letting you grab vectors and watch transformations, projections, and eigenvalues respond in real time.`,
    },
  ],
  Logic: [
    {
      url: 'https://www.youtube.com/watch?v=HeQX2HjkcNo',
      title: "Math's Fundamental Flaw (Veritasium)",
      kind: 'video',
      blurb: `A gorgeously animated tour of Gödel's incompleteness and Turing's undecidability that shows — with playing cards and infinity — why some true statements can never be proven.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=IOiZatlZtGU',
      title: '"Propositions as Types" by Philip Wadler',
      kind: 'talk',
      blurb: `Wadler's electric talk reveals the pun uniting logic and computation — propositions are types, proofs are programs, running a proof is running a program — one of the deepest ideas in the field.`,
    },
  ],
  'Measure Theory': [
    {
      url: 'https://www.youtube.com/watch?v=s86-Z-CbaHA',
      title: 'The Banach-Tarski Paradox (Vsauce)',
      kind: 'video',
      blurb: `A 25-minute mind-bender on how a solid ball can be carved into a few pieces and reassembled into two identical balls — the famous paradox that is really a story about the sets so pathological they cannot be assigned any measure.`,
    },
    {
      url: 'https://terrytao.wordpress.com/books/an-introduction-to-measure-theory/',
      title: 'An Introduction to Measure Theory (Terence Tao)',
      kind: 'book',
      blurb: `The canonical, freely downloadable text by a Fields medalist that builds Lebesgue measure and integration from the ground up with unusual clarity — the one book to open if you actually want to learn the subject.`,
    },
  ],
  'Multivariable Calculus': [
    {
      url: 'https://www.3blue1brown.com/lessons/divergence-and-curl/',
      title: '3Blue1Brown — Divergence and Curl',
      kind: 'video',
      blurb: `Grant Sanderson turns the abstract symbols of vector calculus into flowing fluid, so you finally see what divergence and curl measure and why Maxwell's equations are written this way.`,
    },
    {
      url: 'https://anvaka.github.io/fieldplay/',
      title: 'Field Play — a vector field explorer',
      kind: 'interactive',
      blurb: `Type a formula and watch a million particles swirl through your vector field in real time on the GPU — the most fun way to build intuition for the central objects of multivariable calculus.`,
    },
  ],
  'Number Theory': [
    {
      url: 'https://www.3blue1brown.com/lessons/prime-spirals',
      title: 'Why do prime numbers make these spirals? (3Blue1Brown)',
      kind: 'video',
      blurb: `Starts from a weird spiral pattern in plotted primes and unwinds it into residue classes, rational approximations of pi, and Dirichlet's theorem — the whole soul of number theory: startling hidden order inside the chaos of primes.`,
    },
    {
      url: 'https://www.3blue1brown.com/lessons/zeta',
      title: 'Visualizing the Riemann zeta function and analytic continuation (3Blue1Brown)',
      kind: 'video',
      blurb: `A mesmerizing visual tour of the zeta function and analytic continuation that makes the field's deepest open mystery, the million-dollar Riemann Hypothesis, feel tangible.`,
    },
  ],
  Optimization: [
    {
      url: 'https://stanford.edu/~boyd/cvxbook/',
      title: 'Boyd & Vandenberghe, Convex Optimization',
      kind: 'book',
      blurb: `The free, canonical text of the field — it makes the case that the true watershed of tractable optimization is the convex/non-convex divide, and builds duality and optimality certificates from the ground up.`,
    },
    {
      url: 'https://distill.pub/2017/momentum/',
      title: 'Why Momentum Really Works (Distill)',
      kind: 'interactive',
      blurb: `Drag the step-size and momentum sliders and watch gradient descent race or stall down a valley — a gorgeous interactive that reveals what momentum is actually doing.`,
    },
  ],
  'Order Theory': [
    {
      url: 'https://math.libretexts.org/Bookshelves/Applied_Mathematics/Seven_Sketches_in_Compositionality:_An_Invitation_to_Applied_Category_Theory_(Fong_and_Spivak)/01:_Generative_Effects_-_Orders_and_Adjunctions',
      title: 'Seven Sketches, Ch. 1: Generative Effects — Orders and Adjunctions (Fong & Spivak)',
      kind: 'book',
      blurb: `Fong and Spivak open their applied-category-theory book with order theory itself — preorders, meets and joins, and the quietly profound Galois connection — revealing why arranging things by "≤" is one of mathematics' deepest organizing ideas.`,
    },
    {
      url: 'https://web.archive.org/web/20260501232546/https://www.logicmatters.net/resources/pdfs/Galois.pdf',
      title: 'The Galois Connection between Syntax and Semantics (Peter Smith)',
      kind: 'essay',
      blurb: `Peter Smith's elegant little exposition of the Galois connection sitting between sets of axioms and their classes of models — the order-theoretic adjunction quietly linking syntax and semantics.`,
    },
  ],
  Probability: [
    {
      url: 'https://seeing-theory.brown.edu/',
      title: 'Seeing Theory',
      kind: 'interactive',
      blurb: `Drag sliders and watch distributions, expectation, and Bayes' rule come alive in real time — a gorgeous interactive playground that turns abstract probability into something you can touch.`,
    },
    {
      url: 'https://www.3blue1brown.com/lessons/bayes-theorem/',
      title: "3Blue1Brown: Bayes' theorem",
      kind: 'video',
      blurb: `Grant Sanderson rebuilds Bayes' theorem from a 1×1 square of all possibilities, revealing the soul of probability — that evidence should update beliefs, not replace them.`,
    },
  ],
  'Set Theory': [
    {
      url: 'https://plato.stanford.edu/entries/set-theory/',
      title: 'Set Theory (Stanford Encyclopedia of Philosophy)',
      kind: 'reference',
      blurb: `Joan Bagaria's masterful essay on how a theory of infinite collections became the bedrock language in which every mathematical object can be written as a set.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=SrU9YDoXE88',
      title: 'How to Count Past Infinity (Vsauce)',
      kind: 'video',
      blurb: `A giddy, mind-stretching tour from ordinary counting up through aleph-null, ordinals, and inaccessible cardinals that makes the different sizes of infinity feel real.`,
    },
  ],
  Statistics: [
    {
      url: 'https://seeing-theory.brown.edu/',
      title: 'Seeing Theory',
      kind: 'interactive',
      blurb: `A gorgeous interactive playground where you can drag, perturb, and re-roll your way from chance events through frequentist and Bayesian inference to regression, watching the math of statistics come alive.`,
    },
    {
      url: 'https://www.research.autodesk.com/publications/same-stats-different-graphs/',
      title: 'Same Stats, Different Graphs (the Datasaurus Dozen)',
      kind: 'interactive',
      blurb: `A dozen datasets share the same mean, variance, and correlation yet draw a dinosaur, a star, and a cross — statistics' deepest lesson in one delightful animation: never trust summary numbers, always look at your data.`,
    },
  ],
  Topology: [
    {
      url: 'https://www.3blue1brown.com/lessons/inscribed-rect-v2/',
      title: 'This open problem taught me what topology is (3Blue1Brown)',
      kind: 'video',
      blurb: `Grant Sanderson uses a deceptively simple unsolved puzzle (does every loop inscribe a square?) to reveal that topology is really about how a Möbius strip is forced to self-intersect — finally showing what the field is for.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=OI-To1eUtuU',
      title: 'Outside In: turning a sphere inside out (Geometry Center)',
      kind: 'video',
      blurb: `The legendary computer-animated film that walks you, step by impossible step, through smoothly turning a sphere inside out without tearing or creasing it — one of topology's most jaw-dropping results made visible.`,
    },
  ],
  Trigonometry: [
    {
      url: 'https://betterexplained.com/articles/intuitive-trigonometry/',
      title: 'How To Learn Trigonometry Intuitively (BetterExplained)',
      kind: 'essay',
      blurb: `Kalid Azad throws out SOH-CAH-TOA and reframes trig as the anatomy of a circle, where sine and cosine are just percentages and a dome/wall/ceiling picture makes the six functions and their identities obvious instead of memorized.`,
    },
    {
      url: 'https://1ucasvb.tumblr.com/post/79557434791/the-sine-and-cosine-functions-for-the-circle-as',
      title: 'The sine and cosine functions, as every student should see them (1ucasvb)',
      kind: 'interactive',
      blurb: `The famous animation where a point circles the unit circle and its shadow traces out the sine and cosine waves, delivering the "oh, THAT'S what a sine wave is" moment that most classrooms skip.`,
    },
  ],
  'Type Theory': [
    {
      url: 'https://www.youtube.com/watch?v=IOiZatlZtGU',
      title: 'Philip Wadler — Propositions as Types (Strange Loop 2015)',
      kind: 'talk',
      blurb: `A famous, funny, profound talk revealing that mathematical proofs and computer programs are literally the same thing — the Curry–Howard correspondence beating at the heart of type theory.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/type-theory-intuitionistic/',
      title: 'Intuitionistic Type Theory (Stanford Encyclopedia of Philosophy)',
      kind: 'reference',
      blurb: `The philosophical home of modern type theory: Martin-Löf's vision where propositions are types and proofs are programs, laid out as the foundation of constructive mathematics.`,
    },
  ],
}
