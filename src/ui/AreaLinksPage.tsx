import { AREA_LINKS, type AreaLink } from '../data/areaLinks'

const KIND_LABEL: Record<AreaLink['kind'], string> = {
  video: 'Video',
  interactive: 'Interactive',
  essay: 'Essay',
  book: 'Book',
  talk: 'Talk',
  reference: 'Reference',
  course: 'Course',
}

/**
 * A standalone page (reached at `#/links`) collecting the curated "if you click
 * one thing, click this" resources per field — the same links hidden as the
 * area-label easter egg, surfaced openly here. Linked from the Settings menu.
 */
export function AreaLinksPage() {
  const areas = Object.keys(AREA_LINKS).sort()
  const total = areas.reduce((n, a) => n + AREA_LINKS[a].length, 0)

  return (
    <main className="index">
      <header className="index__bar">
        <a className="index__back" href="#/">
          ← Graph
        </a>
        <h1 className="index__title">Further reading</h1>
        <span className="index__count">{total} curated links</span>
      </header>

      <div className="index__scroll">
        {areas.map((area) => (
          <section key={area} className="index__section">
            <h2 className="index__heading">
              {area}
              <span className="index__n">{AREA_LINKS[area].length}</span>
            </h2>
            <ul className="links__list">
              {AREA_LINKS[area].map((link) => (
                <li key={link.url} className="links__item">
                  <a
                    className="links__link"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="links__title">{link.title}</span>
                    <span className="links__kind">{KIND_LABEL[link.kind] ?? link.kind}</span>
                  </a>
                  <p className="links__blurb">{link.blurb}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
