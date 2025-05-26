import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaClock, FaTrash } from 'react-icons/fa6'

import Button from './Button'
import SpanMenuItem from './SpanMenuItem'
import { useAppStore } from './store'
import { normalizeForDisplay } from './util'

export default function RecentlyVisited() {
  const store = useAppStore()
  const { showMoreRecentlyVisited, recentlyVisited, showRecentlyVisited } =
    store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))

  return (
    <div>
      Recently visited <FaClock className="inline" />:
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
            .slice(0, showMoreRecentlyVisited ? 1000 : 5)
            .filter(recentVisit => !s.has(recentVisit.name))
            .map(recentVisit => (
              <div key={recentVisit.name}>
                <SpanMenuItem
                  onClick={() => {
                    store.setVal(recentVisit.name)
                  }}
                >
                  - {normalizeForDisplay(recentVisit.name)} (
                  {recentVisit.visitedCount})
                </SpanMenuItem>
                <Button
                  onClick={() => {
                    store.removeFromRecentlyVisited(recentVisit.name)
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
          <Button
            onClick={() => {
              store.setShowMoreRecentlyVisited(!showMoreRecentlyVisited)
            }}
          >
            {showMoreRecentlyVisited ? 'Show less' : 'Show more'}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
