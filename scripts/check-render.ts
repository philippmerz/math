/**
 * Render check: run every node's definition through the same unified pipeline the
 * app uses (remark-math + rehype-mathjax) and fail on any MathJax error node.
 * Catches LaTeX that parses as text but breaks typesetting — which the graph
 * check cannot see. Run: node --experimental-strip-types scripts/check-render.ts
 */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMathjax from 'rehype-mathjax'
import { MATH_NODES } from '../src/data/nodes/index.ts'

const proc = unified().use(remarkParse).use(remarkMath).use(remarkRehype).use(rehypeMathjax)

let failures = 0
for (const node of MATH_NODES) {
  const out = await proc.run(proc.parse(node.definition))
  const json = JSON.stringify(out)
  if (json.includes('"dataMmlNode":"merror"') || json.includes('dataMjxError')) {
    failures++
    const errs = [...json.matchAll(/"dataMjxError":"([^"]*)"/g)].map((m) => m[1])
    console.error(`✗ ${node.id}: ${errs.length ? errs.join(' | ') : 'MathJax merror node present'}`)
  }
}

if (failures === 0) {
  console.log(`✓ render OK — all ${MATH_NODES.length} nodes typeset with no MathJax errors`)
} else {
  console.error(`\n${failures} node(s) with MathJax errors`)
  process.exit(1)
}
