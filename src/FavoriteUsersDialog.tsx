import { isUserSubreddit, useAppStore } from './store'
import Favorites from './FavoritesDialog'

export default function FavoriteUsersDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const store = useAppStore()
  const { favorites } = store

  return (
    <Favorites
      title="Favorite users"
      open={open}
      onClose={onClose}
      favorites={[
        ...favorites
          .filter(f => isUserSubreddit(f.name))
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          ),
      ]}
    />
  )
}
