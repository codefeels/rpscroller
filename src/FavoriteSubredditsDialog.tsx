import { isUserSubreddit, useAppStore } from './store'
import Favorites from './FavoritesDialog'

export default function FavoriteSubredditsDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
  const { favorites } = store

  return (
    <Favorites
      title="Favorite subreddits"
      open={open}
      setOpen={setOpen}
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
