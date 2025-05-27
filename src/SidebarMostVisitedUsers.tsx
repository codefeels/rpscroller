import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

export default function SidebarMostVisitedUsers() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))
  const [showRecentlyVisitedUsers, setShowRecentlyVisitedUsers] =
    useLocalStorage('showRecentlyVisitedUsers', true)
  const [showMoreRecentlyVisitedUsers, setShowMoreRecentlyVisitedUsers] =
    useLocalStorage('showMoreRecentlyVisitedUsers', true)

  const list = recentlyVisited
    .filter(f => isUserSubreddit(f.name))
    .sort((a, b) => b.visitedCount - a.visitedCount)
    .slice(0, showMoreRecentlyVisitedUsers ? 1000 : 7)
    .filter(recentVisit => !s.has(recentVisit.name))

  return (
    <SidebarSectionWrapper>
      <div className="flex gap-1">
        Most visited users:
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
        <Button
          onClick={() => {
            setShowMoreRecentlyVisitedUsers(!showMoreRecentlyVisitedUsers)
          }}
        >
          {showMoreRecentlyVisitedUsers ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {showRecentlyVisitedUsers ? (
        <div>
          {list.length > 0
            ? list.map(recentVisit => (
                <Link key={recentVisit.name} to={recentVisit.name}>
                  <MenuItem>
                    - {normalizeForDisplay(recentVisit.name)} (
                    {recentVisit.visitedCount})
                  </MenuItem>
                </Link>
              ))
            : 'No items'}
        </div>
      ) : null}
    </SidebarSectionWrapper>
  )
}
