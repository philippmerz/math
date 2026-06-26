import { AREA_LINKS } from '../data/areaLinks'

/**
 * An area/tag label that hides a small easter egg. When the content agents have
 * curated link(s) for the area, the label becomes quietly clickable: a click
 * opens one of them in a new tab, chosen uniformly at random — so with `n` links
 * each opens with probability 1/n. Areas without a curated link render as a
 * plain, non-interactive label. The affordance is intentionally faint (just a
 * pointer cursor + a hint of the border on hover); you find it by trying.
 */
type Props = {
  tag: string
  className: string
}

export function AreaTag({ tag, className }: Props) {
  const links = AREA_LINKS[tag]
  if (!links || links.length === 0) {
    return <span className={className}>{tag}</span>
  }
  return (
    <button
      type="button"
      className={`${className} area-tag--linked`}
      title="A curated gem for this area ↗"
      // Stop the press/click from reaching the graph pane (pan / deselect) when
      // this label sits on a cluster hull.
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        const link = links[Math.floor(Math.random() * links.length)]
        window.open(link.url, '_blank', 'noopener,noreferrer')
      }}
    >
      {tag}
    </button>
  )
}
