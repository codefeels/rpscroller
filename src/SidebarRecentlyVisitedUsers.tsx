import AbstractSidebarList from './AbstractSidebarList'
import { useAppStore } from './store'
import { isUserSubreddit } from './util'

export default function RecentlyVisitedSubreddits() {
  const store = useAppStore()
  const { recentlyVisited } = store
  const s = new Set(store.feeds.map(f => `r/${f.subreddits.join('+')}`))

  return (
    <AbstractSidebarList
      label="Recently visited users"
      localStorageKey="recentlyVisitedUsers"
      list={recentlyVisited
        .filter(f => isUserSubreddit(f.name))
        .sort((a, b) => +b.lastVisited - +a.lastVisited)
        .filter(entry => !s.has(entry.name))}
    />
  )
}
