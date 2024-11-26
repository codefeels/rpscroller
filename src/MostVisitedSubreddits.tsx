// icons
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'

// store
import Button from './Button'
import SpanMenuItem from './SpanMenuItem'
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

// components

export default function MostVisitedSubreddits() {
  const store = useAppStore()
  const {
    showMoreMostVisitedSubreddits,
    recentlyVisited,
    showMostVisitedSubreddits,
  } = store
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
      {showMostVisitedSubreddits ? (
        <>
          {recentlyVisited
            .filter(f => !isUserSubreddit(f.name))
            .sort((a, b) => b.visitedCount - a.visitedCount)
            .slice(0, showMoreMostVisitedSubreddits ? 20 : 5)
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
                <Button
                  onClick={() => {
                    store.removeFromRecentlyVisited(l.name)
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
          <Button
            onClick={() => {
              store.setShowMoreMostVisitedSubreddits(
                !showMoreMostVisitedSubreddits,
              )
            }}
          >
            {showMoreMostVisitedSubreddits ? 'Show less' : 'Show more'}
          </Button>
        </>
      ) : null}
    </>
  )
}
