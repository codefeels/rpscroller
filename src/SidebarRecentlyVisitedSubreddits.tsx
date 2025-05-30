import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { useAppStore } from './store'
import { isUserSubreddit, normalizeForDisplay } from './util'

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

  const list = recentlyVisited
    .filter(f => !isUserSubreddit(f.name))
    .slice(0, showMoreRecentlyVisitedSubreddits ? 1000 : 7)
    .filter(recentVisit => !s.has(recentVisit.name))

  return (
    <SidebarSectionWrapper>
      <div className="flex gap-1">
        Recently visited subs:
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
