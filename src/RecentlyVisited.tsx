// icons
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

// store
import { useAppStore } from './store'
import { normalizeForDisplay } from './util'

// components
import Button from './Button'
import SpanMenuItem from './SpanMenuItem'

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
              <div key={l}>
                <SpanMenuItem
                  onClick={() => {
                    store.setVal(l)
                  }}
                >
                  - {normalizeForDisplay(l)}
                </SpanMenuItem>
                <Button
                  onClick={() => {
                    store.removeFromRecentlyVisited(l)
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
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
