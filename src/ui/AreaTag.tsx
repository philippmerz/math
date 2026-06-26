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
  const open = () => {
    const link = links[Math.floor(Math.random() * links.length)]
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }
  return (
    <button
      type="button"
      className={`${className} area-tag--linked`}
      title="A curated gem for this area ↗"
      onClick={open}
    >
      {tag}
    </button>
  )
}
