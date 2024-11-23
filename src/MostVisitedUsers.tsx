// icons
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa6'

// store
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

// components
import SpanMenuItem from './SpanMenuItem'
import Button from './Button'

export default function MostVisitedUsers() {
  const store = useAppStore()
  const { showMoreMostVisitedUsers, recentlyVisited, showMostVisitedUsers } =
    store
  console.log(
    recentlyVisited.filter(f => isUserSubreddit(f.name)),
    recentlyVisited
      .filter(f => isUserSubreddit(f.name))
      .sort((a, b) => b.visitedCount - a.visitedCount)
      .slice(0, showMoreMostVisitedUsers ? 20 : 5),
  )
  return (
    <>
      <div>
        Most visited users{' '}
        <Button
          onClick={() => {
            store.setCurrentlyOpenDialog('favoriteUsers')
          }}
        >
          <MdFavorite />
        </Button>
        :{' '}
        <Button
          onClick={() => {
            store.setShowMostVisitedUsers(!showMostVisitedUsers)
          }}
        >
          {showMostVisitedUsers ? (
            <FaMinus className="inline" />
          ) : (
            <FaPlus className="inline" />
          )}
        </Button>
      </div>
      {showMostVisitedUsers ? (
        <>
          {recentlyVisited
            .filter(f => isUserSubreddit(f.name))
            .sort((a, b) => b.visitedCount - a.visitedCount)
            .slice(0, showMoreMostVisitedUsers ? 20 : 5)
            .map(l => (
              <div key={l.name}>
                <SpanMenuItem
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
              store.setShowMoreMostVisitedUsers(!showMoreMostVisitedUsers)
            }}
          >
            {showMoreMostVisitedUsers ? 'Show less' : 'Show more'}
          </Button>
        </>
      ) : null}
    </>
  )
}
