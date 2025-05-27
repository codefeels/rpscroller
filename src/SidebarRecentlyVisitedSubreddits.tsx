import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { useAppStore } from './store'
import { isUserSubreddit, maybeSort, normalizeForDisplay } from './util'
import MenuItem from './MenuItem'
import RadioCheckbox from './RadioCheckbox'
import { BiSortAlt2 } from 'react-icons/bi'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { sortModes } from './consts'
import { Link } from 'react-router-dom'

export default function RecentlyVisitedSubreddits() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))
  const [showRecentlyVisitedSubreddits, setShowRecentlyVisitedSubreddits] =
    useLocalStorage('showRecentlyVisitedSubreddits', true)
  const [
    showMoreRecentlyVisitedSubreddits,
    setShowMoreRecentlyVisitedSubreddits,
  ] = useLocalStorage('showMoreRecentlyVisitedSubreddits', true)
  const [sortMode, setSortMode] = useLocalStorage<
    'visitedCount' | 'recentlyVisited'
  >('sortMode', 'recentlyVisited')

  return (
    <div>
      <div className="flex gap-1">
        {sortMode === 'recentlyVisited' ? 'Recently visited' : 'Most visited'}{' '}
        subs:
        <Button
          onClick={() => {
            setShowRecentlyVisitedSubreddits(!showRecentlyVisitedSubreddits)
          }}
        >
          {showRecentlyVisitedSubreddits ? (
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
            setShowMoreRecentlyVisitedSubreddits(
              !showMoreRecentlyVisitedSubreddits,
            )
          }}
        >
          {showMoreRecentlyVisitedSubreddits ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {showRecentlyVisitedSubreddits ? (
        <SidebarSectionWrapper>
          <div>
            {maybeSort(
              recentlyVisited.filter(f => !isUserSubreddit(f.name)),
              sortMode === 'visitedCount',
              (a, b) => b.visitedCount - a.visitedCount,
            )
              .slice(0, showMoreRecentlyVisitedSubreddits ? 1000 : 10)
              .filter(recentVisit => !s.has(recentVisit.name))
              .map(recentVisit => (
                <Link key={recentVisit.name} to={`${recentVisit.name}`}>
                  <MenuItem>
                    - {normalizeForDisplay(recentVisit.name)} (
                    {recentVisit.visitedCount})
                  </MenuItem>
                </Link>
              ))}
          </div>
        </SidebarSectionWrapper>
      ) : null}
    </div>
  )
}
