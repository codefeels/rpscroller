import { useState } from 'react'

import { BiSortAlt2 } from 'react-icons/bi'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { SortDialog } from './SortDialog'
import { useAppStore } from './store'
import { isUserSubreddit, maybeSort, normalizeForDisplay } from './util'

import type { SortTypes } from './consts'

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
  const [sortMode, setSortMode] = useLocalStorage<SortTypes>(
    'sortMode',
    'recentlyVisited',
  )
  const [sortDialogOpen, setSortDialogOpen] = useState(false)
  const list = maybeSort(
    recentlyVisited.filter(f => !isUserSubreddit(f.name)),
    sortMode === 'visitedCount',
    (a, b) => b.visitedCount - a.visitedCount,
  )
    .slice(0, showMoreRecentlyVisitedSubreddits ? 1000 : 7)
    .filter(recentVisit => !s.has(recentVisit.name))

  return (
    <SidebarSectionWrapper>
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
        <Button
          onClick={() => {
            setSortDialogOpen(true)
          }}
        >
          <BiSortAlt2 />
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
      {sortDialogOpen ? (
        <SortDialog
          sortMode={sortMode}
          setSortMode={setSortMode}
          onClose={() => {
            setSortDialogOpen(false)
          }}
        />
      ) : null}
    </SidebarSectionWrapper>
  )
}
