import AbstractSidebarList from './AbstractSidebarList'
import { useAppStore } from './store'
import { isUserSubreddit } from './util'

export default function SidebarFavoriteSubreddits() {
  const store = useAppStore()
  const { favorites } = store

  return (
    <AbstractSidebarList
      label="Favorite users"
      localStorageKey="favUsers"
      list={favorites.filter(f => isUserSubreddit(f.name))}
    />
  )
}
