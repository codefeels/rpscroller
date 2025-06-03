import { useAppStore } from './store'
import { isUserSubreddit } from './util'
import AbstractSidebarList from './AbstractSidebarList'

export default function RecentlyVisitedSubreddits() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))

  return (
    <AbstractSidebarList
      label="Recently visited subreddits"
      localStorageKey="recentlyVisitedSubreddits"
      list={recentlyVisited
        .filter(f => !isUserSubreddit(f.name))
        .filter(entry => !s.has(entry.name))}
    />
  )
}
