import { isUserSubreddit, useAppStore } from './store'
import Favorites from './FavoritesDialog'

export default function FavoriteSubredditsDialog({
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
      title="Favorite subreddits"
      open={open}
      onClose={onClose}
      favorites={[
        ...favorites
          .filter(f => !isUserSubreddit(f.name))
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          ),
      ]}
    />
  )
}
