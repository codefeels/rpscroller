import { FaMinus, FaPlus } from 'react-icons/fa'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import MenuItem from './MenuItem'
import { useAppStore } from './store'
import { isUserSubreddit, maybeSort, normalizeForDisplay } from './util'
import { BiSortAlt2 } from 'react-icons/bi'
import RadioCheckbox from './RadioCheckbox'
import { sortModes } from './consts'

export default function RecentlyVisitedUsers() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))
  const [showRecentlyVisitedUsers, setShowRecentlyVisitedUsers] =
    useLocalStorage('showRecentlyVisitedUsers', true)
  const [showMoreRecentlyVisitedUsers, setShowMoreRecentlyVisitedUsers] =
    useLocalStorage('showMoreRecentlyVisitedUsers', true)
  const [sortMode, setSortMode] = useLocalStorage<
    'visitedCount' | 'recentlyVisited'
  >('sortMode', 'recentlyVisited')

  return (
    <div>
      <div className="flex gap-1">
        {sortMode === 'recentlyVisited' ? 'Recently visited' : 'Most visited'}{' '}
        users:
        <Button
          onClick={() => {
            setShowRecentlyVisitedUsers(!showRecentlyVisitedUsers)
          }}
        >
          {showRecentlyVisitedUsers ? (
            <FaMinus className="inline" />
          ) : (
            <FaPlus className="inline" />
          )}
        </Button>
        <div className="dropdown dropdown-bottom">
          <Button>
            <BiSortAlt2 />
          </Button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {Object.entries(sortModes).map(([key, val]) => (
              <li key={key}>
                <RadioCheckbox
                  id={key}
                  checked={key === sortMode}
                  label={val}
                  onChange={event => {
                    if (event.target.checked) {
                      setSortMode(key as 'recentlyVisited' | 'visitedCount')
                    }
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => {
            setShowMoreRecentlyVisitedUsers(!showMoreRecentlyVisitedUsers)
          }}
        >
          {showMoreRecentlyVisitedUsers ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {showRecentlyVisitedUsers ? (
        <SidebarSectionWrapper>
          <div>
            {maybeSort(
              recentlyVisited.filter(f => isUserSubreddit(f.name)),
              sortMode === 'visitedCount',
              (a, b) => b.visitedCount - a.visitedCount,
            )
              .slice(0, showMoreRecentlyVisitedUsers ? 1000 : 10)
              .filter(recentVisit => !s.has(recentVisit.name))
              .map(recentVisit => (
                <MenuItem
                  onClick={() => {
                    store.setVal(recentVisit.name)
                  }}
                >
                  - {normalizeForDisplay(recentVisit.name)} (
                  {recentVisit.visitedCount})
                </MenuItem>
              ))}
          </div>
        </SidebarSectionWrapper>
      ) : null}
    </div>
  )
}
