import { allTags } from '../data/graph'

type Props = {
  active: string | null
  onSelect: (tag: string | null) => void
}

/** Area chips; selecting one greys out every node outside that area. */
export function FilterBar({ active, onSelect }: Props) {
  return (
    <div className="filterbar" role="group" aria-label="Focus an area">
      {allTags.map((tag) => {
        const isActive = active === tag
        return (
          <button
            key={tag}
            type="button"
            className={`filterbar__chip${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? null : tag)}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
