import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

import Button from './Button'
import SpanMenuItem from './SpanMenuItem'
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

export default function RecentlyVisitedUsers() {
  const store = useAppStore()
  const { showMoreRecentlyVisited, recentlyVisited, showRecentlyVisited } =
    store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))

  return (
    <div>
      Recently visited users:
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
      <div className="overflow-auto max-h-80">
        {showRecentlyVisited ? (
          <div>
            {recentlyVisited
              .filter(f => isUserSubreddit(f.name))
              .slice(0, showMoreRecentlyVisited ? 1000 : 20)
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
                store.setShowMoreRecentlyVisited(!showMoreRecentlyVisited)
              }}
            >
              {showMoreRecentlyVisited ? 'Show less' : 'Show more'}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
