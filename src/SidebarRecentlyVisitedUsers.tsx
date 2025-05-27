import { useState } from 'react'

import { FaMinus, FaPlus, FaSort, FaFilter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { SortDialog } from './SortDialog'
import { useAppStore } from './store'
import { isUserSubreddit, maybeSort, normalizeForDisplay } from './util'

import type { FilterTypes, SortTypes } from './consts'
import { FilterDialog } from './FilterDialog'

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
  const [filterMode, setFilterMode] = useLocalStorage<FilterTypes>(
    'filterMode',
    'all',
  )
  const [sortDialogOpen, setSortDialogOpen] = useState(false)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const list = maybeSort(
    recentlyVisited.filter(f => isUserSubreddit(f.name)),
    sortMode === 'visitedCount',
    (a, b) => b.visitedCount - a.visitedCount,
  )
    .slice(0, showMoreRecentlyVisitedUsers ? 1000 : 7)
    .filter(recentVisit => !s.has(recentVisit.name))

  return (
    <SidebarSectionWrapper>
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
        <Button
          onClick={() => {
            setSortDialogOpen(true)
          }}
        >
          <FaSort />
        </Button>
        <Button
          onClick={() => {
            setFilterDialogOpen(true)
          }}
        >
          <FaFilter />
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
      {sortDialogOpen ? (
        <SortDialog
          sortMode={sortMode}
          setSortMode={setSortMode}
          onClose={() => {
            setSortDialogOpen(false)
          }}
        />
      ) : null}
      {filterDialogOpen ? (
        <FilterDialog
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          onClose={() => {
            setSortDialogOpen(false)
          }}
        />
      ) : null}
    </SidebarSectionWrapper>
  )
}
