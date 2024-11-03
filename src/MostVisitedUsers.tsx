// icons
import { FaMinus, FaPlus } from 'react-icons/fa'

// store
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

// components
import MenuItem from './MenuItem'
import Button from './Button'

export default function MostVisitedUsers() {
  const store = useAppStore()
  const { favorites, showMostVisitedUsers } = store
  return (
    <>
      <div>
        Most visited (fav&apos;d) users:{' '}
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
        ? favorites
            .filter(f => isUserSubreddit(f.name))
            .sort((a, b) => b.visitedCount - a.visitedCount)
            .slice(0, 5)
            .map(l => (
              <MenuItem
                key={l.name}
                onClick={() => {
                  store.setVal(l.name)
                }}
              >
                - {normalizeForDisplay(l.name)} ({l.visitedCount})
              </MenuItem>
            ))
        : null}
    </>
  )
}
