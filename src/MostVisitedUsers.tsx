// icons
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'

// store
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

// components
import SpanMenuItem from './SpanMenuItem'
import Button from './Button'

export default function MostVisitedUsers() {
  const store = useAppStore()
  const { recentlyVisited, showMostVisitedUsers } = store
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
      {showMostVisitedUsers
        ? recentlyVisited
            .filter(f => isUserSubreddit(f.name))
            .sort((a, b) => b.visitedCount - a.visitedCount)
            .slice(0, 5)
            .map(l => (
              <div key={l.name}>
                <SpanMenuItem
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
