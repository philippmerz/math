import { frequentTags } from '../data/graph'

/**
 * A small always-visible bar of the busiest areas, for one-click focusing. It
 * shares the `focusTag` state with the Filter popover's Area section, so the two
 * stay in sync.
 */
type Props = {
  active: string | null
  onSelect: (tag: string | null) => void
}

export function FrequentTags({ active, onSelect }: Props) {
  return (
    <div className="freqbar">
      {frequentTags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`filterbar__chip${active === tag ? ' is-active' : ''}`}
          aria-pressed={active === tag}
          onClick={() => onSelect(active === tag ? null : tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
