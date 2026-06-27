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
  'Algebraic Geometry': [
    {
      url: 'https://www.quantamagazine.org/how-alexander-grothendieck-revolutionized-20th-century-mathematics-20260520/',
      title: `How Alexander Grothendieck Revolutionized 20th-Century Mathematics`,
      kind: 'essay',
      blurb: `Quanta Magazine's Konstantin Kakaes profiles the hermit genius who rebuilt the whole field from the ground up, replacing points and curves with schemes, sheaves, and topoi. It captures Grothendieck's conviction that what fascinated him was 'neither number nor size, but invariably shape,' and why mathematicians compare his reorientation of the discipline to what Einstein did for physics.`,
    },
    {
      url: 'https://johncarlosbaez.wordpress.com/2019/03/15/algebraic-geometry/',
      title: `How I Learned to Stop Worrying and Love Algebraic Geometry`,
      kind: 'essay',
      blurb: `Mathematical physicist John Baez recounts decades of dismissing algebraic geometry as too abstract, until he saw that varieties make quantization 'completely systematic' and that Grothendieck had quietly reduced topology to algebra. A warm, candid first-person essay about finding the inside track into a subject that once seemed forbidding.`,
    },
  ],
  'Algebraic Number Theory': [
    {
      url: 'https://www.mathpages.com/home/kmath447.htm',
      title: `Kummer's Objection`,
      kind: 'essay',
      blurb: `Kevin Brown's mathpages essay reconstructs the electric 1847 Paris Academy session where Lame announced a proof of Fermat's Last Theorem and Liouville quietly objected that it assumed unique factorization of cyclotomic integers that simply does not hold. It is the conceptual birth story of the whole subject: how Kummer's 'ideal numbers' and class numbers grew out of repairing exactly this failure.`,
    },
    {
      url: 'https://www.jmilne.org/math/CourseNotes/ant.html',
      title: `Algebraic Number Theory (J.S. Milne)`,
      kind: 'book',
      blurb: `James Milne's freely downloadable graduate notes are the field's beloved standard reference, marching cleanly from rings of integers and Dedekind domains through finiteness of the class number, the unit theorem, and cyclotomic fields toward Fermat's Last Theorem. Polished, precise, and the notes a working number theorist actually keeps open.`,
    },
  ],
  'Algebraic Topology': [
    {
      url: 'https://pi.math.cornell.edu/~hatcher/AT/ATpage.html',
      title: `Allen Hatcher, Algebraic Topology (free book)`,
      kind: 'book',
      blurb: `Allen Hatcher's beloved Cornell textbook, the unofficial standard introduction to the field, made freely downloadable in full by the author. Its four chapters walk from the fundamental group and covering spaces through homology, cohomology, and homotopy theory, all in a warm, picture-rich, geometrically grounded style.`,
    },
    {
      url: 'https://www.quantamagazine.org/how-mathematicians-use-homology-to-make-sense-of-topology-20210511/',
      title: `How Mathematicians Use Homology to Make Sense of Topology (Quanta)`,
      kind: 'essay',
      blurb: `Kelsey Houston-Edwards, writing for Quanta Magazine, replaces the hand-wavy idea of a 'hole' with the precise machinery of homology: a hole is a closed loop that bounds nothing. The piece shows how chain complexes turn vague shapes into rigorous algebra, robust enough for computers to find the structure hidden in real data.`,
    },
  ],
  'Analytic Number Theory': [
    {
      url: 'https://www.youtube.com/watch?v=sD0NjbwqlYw',
      title: `But what is the Riemann zeta function? Visualizing analytic continuation`,
      kind: 'video',
      blurb: `Grant Sanderson (3Blue1Brown) animates the Riemann zeta function as a living transformation of the complex plane, making analytic continuation feel inevitable rather than mysterious and revealing why the zeros of this single object govern the distribution of the primes.`,
    },
    {
      url: 'https://terrytao.wordpress.com/2008/01/07/ams-lecture-structure-and-randomness-in-the-prime-numbers/',
      title: `Structure and Randomness in the Prime Numbers (Terence Tao)`,
      kind: 'talk',
      blurb: `Fields Medalist Terence Tao's AMS Current Events lecture, written up on his blog, offers a luminous tour of how primes can look both perfectly random and deeply structured, weaving together random models, sieve theory, and the Green-Tao theorem on arithmetic progressions in the primes.`,
    },
  ],
  'Calculus of Variations': [
    {
      url: 'https://www.3blue1brown.com/lessons/brachistochrone',
      title: `The Brachistochrone, with Steven Strogatz (3Blue1Brown)`,
      kind: 'video',
      blurb: `Grant Sanderson and Steven Strogatz tell the story of the founding problem of the calculus of variations: Johann Bernoulli's 1696 challenge to find the curve of fastest descent. The heart is Bernoulli's gorgeous trick of treating the falling bead as a ray of light obeying Snell's law, plus Mark Levi's one-line geometric insight that the answer is a cycloid.`,
    },
  ],
  'Coding Theory': [
    {
      url: 'https://www.3blue1brown.com/lessons/hamming-codes/',
      title: `Hamming codes and error correction`,
      kind: 'video',
      blurb: `Grant Sanderson's 3Blue1Brown lesson rebuilds Hamming codes from scratch, leading you to re-discover error correction yourself rather than memorizing it. With trademark animations it shows how cleverly placed parity bits let a message detect and repair its own single-bit flips.`,
    },
  ],
  Combinatorics: [
    {
      url: 'https://www.youtube.com/watch?v=bOXCLR3Wric',
      title: `Olympiad Level Counting (Generating Functions) — 3Blue1Brown`,
      kind: 'video',
      blurb: `Grant Sanderson takes a deceptively simple Olympiad puzzle — how many subsets of {1,…,2000} have a sum divisible by 5? — and conjures the answer out of generating functions and the fifth roots of unity. A masterclass in how algebra quietly does combinatorics' bookkeeping.`,
    },
    {
      url: 'https://algo.inria.fr/flajolet/Publications/AnaCombi/anacombi.html',
      title: `Analytic Combinatorics — Philippe Flajolet & Robert Sedgewick`,
      kind: 'book',
      blurb: `The 824-page landmark by Flajolet and Sedgewick, free in full from the authors, that turns counting into a calculus: symbolic methods build generating functions automatically, then complex analysis extracts the asymptotics of permutations, trees, graphs, and maps. The definitive bridge between classical combinatorics and the analysis of algorithms.`,
    },
  ],
  'Commutative Algebra': [
    {
      url: 'https://stacks.math.columbia.edu/tag/00AO',
      title: `The Stacks Project — Chapter 10: Commutative Algebra`,
      kind: 'reference',
      blurb: `The Stacks Project, the famous open, collaboratively-written reference begun by Aise Johan de Jong, opens its foundations with a single mammoth Commutative Algebra chapter — 168 sections marching from finite modules and localization through Nullstellensatz, dimension theory, flatness, and regular local rings. Every result is hyperlinked by a permanent four-character tag, a delight to fall into and never quite climb out of.`,
    },
    {
      url: 'https://web.mit.edu/18.705/www/13Ed.pdf',
      title: `A Term of Commutative Algebra — Allen Altman & Steven Kleiman`,
      kind: 'book',
      blurb: `Allen Altman and Steven Kleiman's free textbook is a lean, modern reworking of the legendary Atiyah–Macdonald, distilling a one-term MIT course (18.705) into crisp theory plus a full slate of exercises with complete solutions. It is the rare introduction that is both rigorous and genuinely teachable on your own.`,
    },
  ],
  'Convex Analysis': [
    {
      url: 'https://stanford.edu/~boyd/cvxbook/',
      title: `Convex Optimization (Boyd & Vandenberghe)`,
      kind: 'book',
      blurb: `Stephen Boyd and Lieven Vandenberghe's modern classic, kept freely downloadable with Cambridge's blessing, alongside full Stanford lecture slides and code. Its early chapters on convex sets, convex functions, and duality are the most beloved on-ramp to convex analysis ever written.`,
    },
    {
      url: 'https://press.princeton.edu/books/paperback/9780691015866/convex-analysis',
      title: `Rockafellar, Convex Analysis (Princeton Landmarks)`,
      kind: 'reference',
      blurb: `R. Tyrrell Rockafellar's 1970 treatise that single-handedly named and founded the field, replacing differentiability assumptions with convexity ones. Half a century on it remains the standard reference for subgradients, conjugate functions, and Fenchel duality.`,
    },
  ],
  'Descriptive Set Theory': [
    {
      url: 'https://www.quantamagazine.org/a-new-bridge-links-the-strange-math-of-infinity-to-computer-science-20251121/',
      title: `A New Bridge Links the Strange Math of Infinity to Computer Science`,
      kind: 'essay',
      blurb: `Joseph Howlett's Quanta Magazine feature on Anton Bernshteyn's startling 2023 discovery that questions about measurably coloring infinite Borel graphs can be translated, exactly, into problems about networks of communicating computers. A warm, accessible tour of how descriptive set theory's wrangling with infinity suddenly speaks the concrete language of distributed algorithms.`,
    },
    {
      url: 'http://homepages.math.uic.edu/~marker/math512/dst.pdf',
      title: `David Marker — Descriptive Set Theory (lecture notes)`,
      kind: 'course',
      blurb: `David Marker's beloved free lecture notes from his University of Illinois at Chicago graduate course, building classical descriptive set theory from Polish spaces and Borel sets up through analytic sets and determinacy. Compact, clean, and a standard first map of the subject that generations of students have learned from.`,
    },
  ],
  'Differential Topology': [
    {
      url: 'https://www.youtube.com/watch?v=OI-To1eUtuU',
      title: `Outside In — Turning a Sphere Inside Out (The Geometry Center)`,
      kind: 'video',
      blurb: `The Geometry Center's legendary 1994 film, narrated with belts, train tracks and infectious wonder, shows how Smale's astonishing theorem lets you turn a sphere inside out through itself without creasing — Bill Thurston's corrugation method made gloriously visible. The single most delightful way to feel why regular homotopy is the soul of differential topology.`,
    },
    {
      url: 'https://www.quantamagazine.org/an-old-conjecture-falls-making-spheres-a-lot-more-complicated-20230822/',
      title: `An Old Conjecture Falls, Making Spheres a Lot More Complicated`,
      kind: 'essay',
      blurb: `Kevin Hartnett's Quanta dispatch on exotic spheres — John Milnor's 1956 discovery of seven-spheres that are topologically ordinary yet smoothly alien — and how a 2023 disproof of the telescope conjecture reveals their numbers (16,256 in dimension 15!) exploding beyond anyone's expectations. A vivid window onto why smooth structure is differential topology's deepest mystery.`,
    },
  ],
  'Dynamical Systems': [
    {
      url: 'https://www.youtube.com/watch?v=ovJcsL7vyrk',
      title: `This equation will change how you see the world (the logistic map)`,
      kind: 'video',
      blurb: `Derek Muller's Veritasium takes one deceptively simple equation, x_{n+1} = rx_n(1-x_n), and reveals how it spirals from steady population growth into period-doubling and full-blown chaos. Along the way it ties together the Feigenbaum constant, dripping faucets, neuron firing, and a hidden copy of the logistic map inside the Mandelbrot set.`,
    },
    {
      url: 'https://www.youtube.com/playlist?list=PLbN57C5Zdl6j_qJA-pARJnKsmROzPnO9V',
      title: `Nonlinear Dynamics and Chaos — Steven Strogatz (Cornell)`,
      kind: 'course',
      blurb: `The complete 25-lecture course filmed at Cornell in 2014 by Steven Strogatz, following his beloved textbook with its hallmark emphasis on geometric intuition and concrete examples. A warm, rigorous first journey from fixed points and bifurcations through the Lorenz equations and strange attractors.`,
    },
  ],
  'Game Theory': [
    {
      url: 'https://ncase.me/trust/',
      title: `The Evolution of Trust`,
      kind: 'interactive',
      blurb: `Nicky Case's playable explorable walks you from a single round of the Prisoner's Dilemma to full Axelrod-style tournaments, letting you pit Tit-for-Tat, Cheaters, and Copycats against each other to feel firsthand why trust emerges (or collapses). A modern classic of interactive game-theory pedagogy.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=mScpHTIi-kM',
      title: `What Game Theory Reveals About Life, The Universe, and Everything (Veritasium)`,
      kind: 'video',
      blurb: `Derek Muller's Veritasium documentary retells Robert Axelrod's iterated Prisoner's Dilemma tournaments, narrating how the humble Tit-for-Tat strategy beat far cleverer programs and what its 'nice, retaliating, forgiving' character says about cooperation in evolution, the Cold War, and everyday life.`,
    },
  ],
  'Graph Theory': [
    {
      url: 'https://www.youtube.com/watch?v=-9OUyo8NFZg',
      title: `Euler's Formula and Graph Duality`,
      kind: 'video',
      blurb: `Grant Sanderson (3Blue1Brown) unfurls a gorgeous, almost magical proof of Euler's characteristic formula V - E + F = 2, building it up from spanning trees and the duality between a planar graph and its faces. A fifteen-minute reminder that the deepest combinatorial truths can be seen rather than computed.`,
    },
    {
      url: 'https://old.maa.org/press/periodicals/convergence/leonard-eulers-solution-to-the-konigsberg-bridge-problem',
      title: `Leonhard Euler's Solution to the Königsberg Bridge Problem`,
      kind: 'essay',
      blurb: `Teo Paoletti's MAA Convergence essay walks through the 1736 puzzle that Euler turned into the founding act of graph theory — abstracting Königsberg's seven bridges and two islands into vertices and edges, and proving no single walk can cross each bridge exactly once. The humble, even frivolous origin of an entire branch of mathematics.`,
    },
  ],
  'Harmonic Analysis': [
    {
      url: 'https://www.youtube.com/watch?v=spUNpyF58BY',
      title: `But what is the Fourier Transform? A visual introduction.`,
      kind: 'video',
      blurb: `Grant Sanderson (3Blue1Brown) builds the Fourier transform from scratch by winding a signal around a circle and watching its center of mass swing toward the hidden frequencies. It is the rare animation that makes the defining integral feel inevitable rather than memorized.`,
    },
    {
      url: 'https://terrytao.wordpress.com/2007/09/11/pcm-article-harmonic-analysis/',
      title: `PCM article: Harmonic analysis (Terence Tao)`,
      kind: 'essay',
      blurb: `Fields medalist Terence Tao recounts writing the harmonic analysis entry for the Princeton Companion to Mathematics, distilling the field as 'the quantitative study of oscillation, transforms, and other features of functions and sets on domains.' A warm, authoritative bird's-eye view from one of the subject's leading practitioners.`,
    },
  ],
  'Homological Algebra': [
    {
      url: 'https://www.youtube.com/watch?v=etbcKWEKnvg',
      title: `The Snake Lemma in "It's My Turn" (1980)`,
      kind: 'video',
      blurb: `The opening scene of Claudia Weill's film, in which Jill Clayburgh — playing mathematician Kate Gunzinger — chalks out a technically flawless proof of the Snake Lemma to a heckling grad student. Charles Weibel's textbook declines to print the proof because "it is best done visually"; this is the most erudite mathematics ever filmed in a Hollywood movie.`,
    },
  ],
  'Information Theory': [
    {
      url: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf',
      title: `A Mathematical Theory of Communication (Claude Shannon, 1948)`,
      kind: 'essay',
      blurb: `The founding document of the entire field: Claude Shannon's 1948 Bell System Technical Journal paper, where bits, entropy, channel capacity, and the noisy-coding theorem all spring into existence at once. This is the corrected reprint, reading as freshly as the day a Bell Labs engineer decided to make 'information' a precise mathematical quantity.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=v68zYyaEmEA',
      title: `Solving Wordle using information theory (3Blue1Brown)`,
      kind: 'video',
      blurb: `Grant Sanderson uses the daily word game Wordle as a Trojan horse to teach Shannon entropy from scratch, building up the intuition that information is measured in expected bits of surprise. A delightful, visually gorgeous demonstration that the abstract -p log p formula is really just a recipe for asking the most useful question.`,
    },
  ],
  'Knot Theory': [
    {
      url: 'https://www.quantamagazine.org/why-mathematicians-study-knots-20221031/',
      title: `Why Mathematicians Study Knots`,
      kind: 'essay',
      blurb: `David S. Richeson's Quanta essay traces knot theory from Lord Kelvin's 1867 idea that atoms were knotted vortices in the ether, through Tait's hand-drawn knot tables and the embarrassing Perko-pair duplication, to Lisa Piccirillo's recent four-dimensional resolution of the Conway knot. A warm, historically grounded tour of why tangled loops became serious mathematics.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=aqyyhhnGraw',
      title: `What is a Knot? - Numberphile`,
      kind: 'video',
      blurb: `Berkeley's Carlo Sequin opens Numberphile's knot series by explaining the deceptively simple idea behind a mathematical knot: a closed loop with no loose ends, classified by its crossings, from the humble trefoil to the figure-eight. A delightful, hands-on visual introduction to the subject.`,
    },
  ],
  'Lie Theory': [
    {
      url: 'https://www.aimath.org/E8/',
      title: `Mapping E8 — Atlas of Lie Groups and Representations`,
      kind: 'essay',
      blurb: `In 2007 a team of 18 mathematicians and a supercomputer mapped the structure of E8, the most intricate of the exceptional Lie groups; the answer fills 60 gigabytes — larger than the data of the Human Genome Project. The American Institute of Mathematics' page tells the story of charting this 248-dimensional object and why mathematicians regard it with awe.`,
    },
    {
      url: 'https://math.ucr.edu/home/baez/octonions/',
      title: `The Octonions — John Baez`,
      kind: 'essay',
      blurb: `John Baez's celebrated expository paper journeys from the strangest of the normed division algebras to the exceptional Lie groups G2, F4, E6, E7 and E8 and the haunting symmetry of the Magic Square. Rigorous yet enchanting, it is the place to see why Lie theory's rarest objects are bound up with the octonions.`,
    },
  ],
  'Machine Learning Theory': [
    {
      url: 'https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/',
      title: `Understanding Machine Learning: From Theory to Algorithms`,
      kind: 'book',
      blurb: `Shai Shalev-Shwartz and Shai Ben-David's Cambridge textbook, made free to download by its authors and publisher, is the canonical mathematical grounding of learning theory — from PAC learning and VC dimension to convexity, stability, and the bias-complexity tradeoff, built rigorously from first principles.`,
    },
    {
      url: 'https://arxiv.org/abs/1611.03530',
      title: `Understanding deep learning requires rethinking generalization`,
      kind: 'essay',
      blurb: `The landmark 2016 paper by Chiyuan Zhang, Samy Bengio, Moritz Hardt, Benjamin Recht, and Oriol Vinyals that upended classical wisdom by showing deep networks can perfectly memorize randomly-labeled images yet still generalize on real data — a delightfully unsettling result that forced the field to reconsider what generalization even means.`,
    },
  ],
  'Model Theory': [
    {
      url: 'https://plato.stanford.edu/entries/modeltheory-fo/',
      title: `First-order Model Theory (Stanford Encyclopedia of Philosophy)`,
      kind: 'reference',
      blurb: `Written by Wilfrid Hodges and Thomas Scanlon, two leading model theorists, this is the field's grounding article: it builds first-order model theory from the relationship between formal descriptions and the structures that satisfy them, then walks through compactness, ultrapowers, saturation, categoricity, geometric stability, and o-minimality with unusual conceptual clarity.`,
    },
    {
      url: 'https://terrytao.wordpress.com/2009/03/07/infinite-fields-finite-fields-and-the-ax-grothendieck-theorem/',
      title: `Infinite fields, finite fields, and the Ax-Grothendieck theorem`,
      kind: 'essay',
      blurb: `Terence Tao's blog post is model theory's magic trick laid bare: to prove that an injective polynomial map of the complex numbers must be surjective, he transfers the question down to finite fields, where it becomes almost obvious, via the compactness-style principle that positive characteristic can model characteristic zero.`,
    },
  ],
  'Multilinear Algebra': [
    {
      url: 'https://www.youtube.com/watch?v=f5liqUk0ZTw',
      title: `What's a Tensor? — Dan Fleisch`,
      kind: 'video',
      blurb: `In twelve disarming minutes, physicist Dan Fleisch builds a tensor out of arrows and the corners of a room, turning the dreaded 'object that transforms like a tensor' into something you can hold in your hands. Endorsed by Steven Strogatz and watched by millions, it is the gentlest possible doorway into multilinear thinking.`,
    },
    {
      url: 'https://alexkritchevsky.com/2018/10/08/exterior-1.html',
      title: `Exterior Algebra Notes — Alex Kritchevsky`,
      kind: 'essay',
      blurb: `Alex Kritchevsky's sprawling, opinionated series rebuilds exterior algebra from oriented areas upward, treating wedge products, bivectors, the Hodge star, and determinants not as abstract machinery but as 'simple intuitive procedures you could rederive whenever you wanted.' It is the kind of writing that makes you wonder why multivectors were ever made to seem hard.`,
    },
  ],
  'Numerical Analysis': [
    {
      url: 'https://people.maths.ox.ac.uk/trefethen/publication/PDF/1992_55.pdf',
      title: `The Definition of Numerical Analysis (Lloyd N. Trefethen, 1992)`,
      kind: 'essay',
      blurb: `Lloyd N. Trefethen's six-page polemic from SIAM News opens by demolishing the lazy textbook view that numerical analysis is merely 'the study of rounding errors,' then offers a definition that has since become canonical: 'Numerical analysis is the study of algorithms for the problems of continuous mathematics.' A rousing, opinionated rehabilitation of a field too long held in low esteem.`,
    },
    {
      url: 'https://people.maths.ox.ac.uk/trefethen/NAessay.pdf',
      title: `Numerical Analysis — The Princeton Companion to Mathematics (Trefethen)`,
      kind: 'essay',
      blurb: `Trefethen's chapter for the Princeton Companion to Mathematics is a warm, sweeping tour from Galileo's measurements to floating-point arithmetic, fast algorithms, and the SVD, making the case that the discipline is the analytical heart of how mathematics meets the physical world. The ideal cold landing for anyone curious what numerical analysts actually do.`,
    },
  ],
  'Operator Algebras': [
    {
      url: 'https://www.quantamagazine.org/if-the-universe-is-a-hologram-this-long-forgotten-math-could-decode-it-20240925/',
      title: `If the Universe Is a Hologram, This Long-Forgotten Math Could Decode It`,
      kind: 'essay',
      blurb: `Charlie Wood's 2024 Quanta Magazine feature on how von Neumann's classification of operator algebras into types I, II, and III — abstruse 1930s mathematics once 'scary' to physicists — quietly resurfaced as the language for entanglement, holography, and the emergence of smooth spacetime in quantum gravity. A vivid demonstration that the type III factor was waiting decades for its moment.`,
    },
    {
      url: 'https://bhavana.org.in/sir-vaughan-frederick-randal-jones-1952-2020/',
      title: `Sir Vaughan Frederick Randal Jones (1952–2020)`,
      kind: 'essay',
      blurb: `Bhāvanā magazine's warm memorial to Vaughan Jones, the Fields Medalist whose study of subfactors and the index of inclusions of II_1 factors spilled out into knot theory and the Jones polynomial. Tributes by Popa, Evans, and Sunder mingle the mathematics with kitesurfing, rugby, and a Fasnacht-carnival epiphany.`,
    },
  ],
  'Partial Differential Equations': [
    {
      url: 'https://www.youtube.com/watch?v=ly4S0oi3Yz8',
      title: `But what is a partial differential equation? (3Blue1Brown)`,
      kind: 'video',
      blurb: `Grant Sanderson's 3Blue1Brown introduction builds intuition for what a PDE actually is by watching heat diffuse along a metal rod, turning the heat equation from intimidating notation into a vivid story of values reacting to their neighbors. A philosophically grounding first encounter with the subject.`,
    },
    {
      url: 'https://paveldogreat.github.io/WebGL-Fluid-Simulation/',
      title: `WebGL Fluid Simulation (Pavel Dobryakov)`,
      kind: 'interactive',
      blurb: `Pavel Dobryakov's GPU-powered demo solves a simplified form of the Navier-Stokes equations live in your browser: drag a finger and watch dye swirl into turbulent eddies, advected and pressure-projected in real time. A delightful, hands-on encounter with the most famous PDE in fluid dynamics.`,
    },
  ],
  'Proof Theory': [
    {
      url: 'https://plato.stanford.edu/entries/proof-theory/',
      title: `Proof Theory (Stanford Encyclopedia of Philosophy)`,
      kind: 'essay',
      blurb: `The Stanford Encyclopedia's definitive map of the field, tracing the arc from Hilbert's metamathematics through Gentzen's cut elimination to ordinal analysis and the discovery that arithmetic's consistency rests on transfinite induction up to ε₀. A rigorous yet readable tour of how mathematicians learned to make proofs themselves into objects of study.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/hilbert-program/',
      title: `Hilbert's Program (Stanford Encyclopedia of Philosophy)`,
      kind: 'essay',
      blurb: `Richard Zach's gripping account of the dream that launched proof theory: Hilbert's bid to secure all of mathematics with finitary consistency proofs, the finitist standpoint reasoning 'intuitively present prior to all thought,' and the dramatic collision with Gödel's incompleteness theorems and Gentzen's ε₀ rescue. The philosophical origin story behind every modern proof-theoretic technique.`,
    },
  ],
  'Representation Theory': [
    {
      url: 'https://www.quantamagazine.org/mathematicians-chase-moonshine-string-theory-connections-20150312/',
      title: `Mathematicians Chase Moonshine's Shadow`,
      kind: 'essay',
      blurb: `Erica Klarreich's Quanta feature opens on the 1978 night John McKay noticed that 196,884 (a coefficient of the modular j-function) is just 1 + 196,883, the first two dimensions in which the colossal Monster group can be represented. From that coincidence she unspools 'monstrous moonshine,' Borcherds' Fields-Medal proof, and how a group's representations turned out to encode the secrets of number theory.`,
    },
    {
      url: 'https://arxiv.org/abs/0901.0827',
      title: `Introduction to Representation Theory (Etingof et al.)`,
      kind: 'book',
      blurb: `Pavel Etingof and six co-authors distilled lectures from the Clay Institute and MIT into a famously readable free book, building representation theory of finite groups, Lie algebras, and quivers from the ground up. Brisk, exercise-rich, and beloved as a first serious encounter with the idea that symmetries can be made to act linearly.`,
    },
  ],
  'Spectral Geometry': [
    {
      url: 'https://arxiv.org/abs/math/9207215',
      title: `One Cannot Hear the Shape of a Drum`,
      kind: 'reference',
      blurb: `The landmark 1992 paper by Carolyn Gordon, David Webb, and Scott Wolpert that finally answered Mark Kac's 1966 riddle in the negative — exhibiting two differently shaped planar drums whose Laplacians share every eigenvalue, so they sound exactly alike. Built from an elegant extension of Sunada's theorem and orbifold tricks, it is the founding artifact of modern isospectrality.`,
    },
    {
      url: 'https://www.scientificamerican.com/article/mathematicians-are-trying-to-lsquo-hear-rsquo-shapes/',
      title: `Mathematicians Are Trying to 'Hear' Shapes — And Reach Higher Dimensions`,
      kind: 'essay',
      blurb: `Rachel Crowell's warm Scientific American feature traces Kac's drum question from 1966 to the present, explaining how eigenvalues of the Laplacian encode (and sometimes fail to encode) geometry, and why researchers now chase isospectral pairs into ever-higher dimensions. A perfect cold landing for anyone curious what it means to 'hear' a shape.`,
    },
  ],
  'Stochastic Processes': [
    {
      url: 'https://setosa.io/ev/markov-chains/',
      title: `Markov Chains Explained Visually`,
      kind: 'interactive',
      blurb: `Victor Powell and Lewis Lehe's beloved "Explained Visually" piece lets you watch a particle hop between states in real time, then build your own chain by editing a transition matrix live. A perfect first encounter with the memoryless heart of stochastic processes.`,
    },
    {
      url: 'https://www.youtube.com/watch?v=KZeIEiBrT_w',
      title: `The Strange Math That Predicts (Almost) Anything`,
      kind: 'video',
      blurb: `Veritasium tells how a bitter feud in 1905 Russia between Andrey Markov "the Furious" and Pavel Nekrasov birthed the Markov chain, then traces its line to PageRank, predictive text, and Monte Carlo. A rare blend of vivid history and the mathematics of memoryless randomness.`,
    },
  ],
  'Symplectic Geometry': [
    {
      url: 'https://www.quantamagazine.org/how-physics-gifted-math-with-a-new-geometry-20200729/',
      title: `How Physics Found a Geometric Structure for Math to Play With`,
      kind: 'essay',
      blurb: `Kevin Hartnett's Quanta feature traces symplectic geometry from Hamilton's planetary mechanics to Arnold's conjectures and Floer's modern machinery, using the image of a floppy tarp versus a rigid tent to explain why this geometry of signed area is so much stiffer than mere topology. A warm, story-driven answer to the question 'what is this field actually about?'`,
    },
    {
      url: 'https://people.math.ethz.ch/~acannas/Papers/lsg.pdf',
      title: `Lectures on Symplectic Geometry — Ana Cannas da Silva`,
      kind: 'book',
      blurb: `Ana Cannas da Silva's beloved Springer lecture notes, made freely available by the author from her ETH Zurich page and still updated with errata. A fast, elegant graduate-level tour from symplectomorphisms and Darboux's theorem through moment maps, symplectic reduction, and toric manifolds, with guided homework woven throughout.`,
    },
  ],
  'Theory of Computation': [
    {
      url: 'https://www.scottaaronson.com/writings/bignumbers.html',
      title: `Who Can Name the Bigger Number?`,
      kind: 'essay',
      blurb: `Scott Aaronson's beloved 1999 essay turns a 15-second party game — name the biggest number you can — into a breathtaking ascent through exponentials, Ackermann's function, Turing machines, and finally Radó's Busy Beaver, whose values outgrow every computable sequence. A funny, profound tour of the very edge of computability that doubles as a meditation on how paradigms shape what minds can grasp.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/turing-machine/',
      title: `Turing Machines (Stanford Encyclopedia of Philosophy)`,
      kind: 'reference',
      blurb: `The Stanford Encyclopedia of Philosophy's authoritative entry on Turing machines, tracing Turing's 1936 a-machine from formal definition to the universal machine, the halting problem, and Hilbert's Entscheidungsproblem. It weaves together the rival formalisms — lambda-calculus, recursive functions, Post systems — and even scrutinizes the popular myth of Turing as 'father of the computer.'`,
    },
  ],
  'Universal Algebra': [
    {
      url: 'http://www.math.uwaterloo.ca/~snburris/htdocs/ualg.html',
      title: `A Course in Universal Algebra (Millennium Edition)`,
      kind: 'book',
      blurb: `Stanley Burris and H. P. Sankappanavar's classic 1981 graduate text, released free by the authors and still the canonical introduction to varieties, congruence lattices, and Birkhoff's theorems. Warm, complete, and downloadable in full from the authors' Waterloo page.`,
    },
    {
      url: 'https://plato.stanford.edu/entries/algebra/',
      title: `Algebra — Stanford Encyclopedia of Philosophy`,
      kind: 'essay',
      blurb: `Vaughan Pratt's sweeping survey climbs from elementary algebra through abstract algebra to universal algebra, framing it as 'the next level of abstraction' that studies whole classes of algebras and crowning the tour with Birkhoff's characterization of varieties.`,
    },
  ],
}
