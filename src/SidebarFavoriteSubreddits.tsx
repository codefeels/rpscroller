import AbstractSidebarList from './AbstractSidebarList'
import { useAppStore } from './store'
import { isUserSubreddit } from './util'

export default function SidebarFavoriteSubreddits() {
  const store = useAppStore()
  const { favorites } = store

  return (
    <AbstractSidebarList
      label="Favorite subreddits"
      localStorageKey="favSubreddits"
      list={favorites.filter(f => !isUserSubreddit(f.name))}
    />
  )
}
