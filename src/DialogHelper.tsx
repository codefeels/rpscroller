import { Suspense, lazy } from 'react'

import { useAppStore } from './store'

// lazies
const AboutDialog = lazy(() => import('./AboutDialog'))
const FavoriteUsersDialog = lazy(() => import('./FavoriteUsersDialog'))
const BlockedUsersDialog = lazy(() => import('./BlockedUsersDialog'))
const MakeMultiRedditDialog = lazy(() => import('./MakeMultiRedditDialog'))
const FavoriteSubredditsDialog = lazy(
  () => import('./FavoriteSubredditsDialog'),
)

export default function DialogHelper() {
  const store = useAppStore()
  const { currentlyOpenDialog } = store

  return (
    <Suspense fallback={null}>
      {currentlyOpenDialog === 'favoriteUsers' ? (
        <FavoriteUsersDialog
          open
          onClose={() => {
            store.setCurrentlyOpenDialog(undefined)
          }}
        />
      ) : null}
      {currentlyOpenDialog === 'favoriteSubreddits' ? (
        <FavoriteSubredditsDialog
          open
          onClose={() => {
            store.setCurrentlyOpenDialog(undefined)
          }}
        />
      ) : null}
      {currentlyOpenDialog === 'blocked' ? (
        <BlockedUsersDialog
          open
          onClose={() => {
            store.setCurrentlyOpenDialog(undefined)
          }}
        />
      ) : null}
      {currentlyOpenDialog === 'multi' ? (
        <MakeMultiRedditDialog
          open
          onClose={() => {
            store.setCurrentlyOpenDialog(undefined)
          }}
        />
      ) : null}
      {currentlyOpenDialog === 'about' ? (
        <AboutDialog
          open
          onClose={() => {
            store.setCurrentlyOpenDialog(undefined)
          }}
        />
      ) : null}
    </Suspense>
  )
}
