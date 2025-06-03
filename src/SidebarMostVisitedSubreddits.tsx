import AbstractSidebarList from './AbstractSidebarList'
import { useAppStore } from './store'
import { isUserSubreddit } from './util'

export default function SidebarMostVisitedSubreddits() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))

  return (
    <AbstractSidebarList
      list={recentlyVisited
        .filter(f => !isUserSubreddit(f.name))
        .sort((a, b) => b.visitedCount - a.visitedCount)
        .filter(entry => !s.has(entry.name))}
      label="Most visited subreddits"
      localStorageKey="mostVisitedSubreddits"
    />
  )
}
