// icons
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'

// store
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

// components
import SpanMenuItem from './SpanMenuItem'
import Button from './Button'

export default function MostVisitedSubreddits() {
  const store = useAppStore()
  const { recentlyVisited, showMostVisitedSubreddits } = store
  return (
    <>
      <div>
        Most visited subreddits{' '}
        <Button
          onClick={() => {
            store.setCurrentlyOpenDialog('favoriteSubreddits')
          }}
        >
          <MdFavorite />
        </Button>
        :{' '}
        <Button
          onClick={() => {
            store.setShowMostVisitedSubreddits(!showMostVisitedSubreddits)
          }}
        >
          {showMostVisitedSubreddits ? (
            <FaMinus className="inline" />
          ) : (
            <FaPlus className="inline" />
          )}
        </Button>
      </div>
      {showMostVisitedSubreddits
        ? recentlyVisited
            .filter(f => !isUserSubreddit(f.name))
            .sort((a, b) => b.visitedCount - a.visitedCount)
            .slice(0, 5)
            .map(l => (
              <div key={l.name}>
                <SpanMenuItem
                  key={l.name}
                  onClick={() => {
                    store.setVal(l.name)
                  }}
                >
                  - {normalizeForDisplay(l.name)} ({l.visitedCount})
                </SpanMenuItem>
              </div>
            ))
        : null}
    </>
  )
}
