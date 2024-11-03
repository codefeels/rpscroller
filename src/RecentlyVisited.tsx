// icons
import { FaMinus, FaPlus } from 'react-icons/fa'

// store
import { useAppStore } from './store'
import { normalizeForDisplay } from './util'

// components
import Button from './Button'
import MenuItem from './MenuItem'

export default function RecentlyVisited() {
  const store = useAppStore()
  const { recentlyVisited, showRecentlyVisited } = store

  return (
    <div>
      Recently visited:
      <Button
        onClick={() => {
          store.setShowRecentlyVisited(!showRecentlyVisited)
        }}
      >
        {showRecentlyVisited ? (
          <FaMinus className="inline" />
        ) : (
          <FaPlus className="inline" />
        )}
      </Button>
      {showRecentlyVisited ? (
        <div>
          {recentlyVisited
            .filter(f => f !== 'savedposts')
            .map(l => (
              <MenuItem
                key={l}
                onClick={() => {
                  store.setVal(l)
                }}
              >
                - {normalizeForDisplay(l)}
              </MenuItem>
            ))}
          <Button
            onClick={() => {
              store.clearRecentlyVisited()
            }}
          >
            Clear
          </Button>
        </div>
      ) : null}
    </div>
  )
}
