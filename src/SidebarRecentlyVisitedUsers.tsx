import { useState } from 'react'

import { BiSortAlt2 } from 'react-icons/bi'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { SortDialog } from './SortDialog'
import { useAppStore } from './store'
import { isUserSubreddit, maybeSort, normalizeForDisplay } from './util'

import type { SortTypes } from './consts'




export default function RecentlyVisitedUsers() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))
  const [showRecentlyVisitedUsers, setShowRecentlyVisitedUsers] =
    useLocalStorage('showRecentlyVisitedUsers', true)
  const [showMoreRecentlyVisitedUsers, setShowMoreRecentlyVisitedUsers] =
    useLocalStorage('showMoreRecentlyVisitedUsers', true)
  const [sortMode, setSortMode] = useLocalStorage<SortTypes>(
    'sortMode',
    'recentlyVisited',
  )
  const [sortDialogOpen, setSortDialogOpen] = useState(false)

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
        <Button onClick={() => { setSortDialogOpen(true); }}>
          <BiSortAlt2 />
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
                <Link key={recentVisit.name} to={recentVisit.name}>
                  <MenuItem>
                    - {normalizeForDisplay(recentVisit.name)} (
                    {recentVisit.visitedCount})
                  </MenuItem>
                </Link>
              ))}
          </div>
        </SidebarSectionWrapper>
      ) : null}
      {sortDialogOpen ? (
        <SortDialog
          sortMode={sortMode}
          setSortMode={setSortMode}
          onClose={() => { setSortDialogOpen(false); }}
        />
      ) : null}
    </div>
  )
}
