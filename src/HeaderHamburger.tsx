import { lazy, Suspense, useRef, useState } from 'react'
import { useAppStore } from './store'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'

// lazies
const HeaderMenu = lazy(() => import('./HeaderMenu'))
const SettingsDialog = lazy(() => import('./SettingsDialog'))
const FavoriteUsersDialog = lazy(() => import('./FavoriteUsersDialog'))
const FavoriteSubredditsDialog = lazy(
  () => import('./FavoriteSubredditsDialog'),
)
const BlockedUsersDialog = lazy(() => import('./BlockedUsersDialog'))
const MakeMultiRedditDialog = lazy(() => import('./MakeMultiRedditDialog'))

export type DialogTypes =
  | 'settings'
  | 'favoriteSubreddits'
  | 'favoriteUsers'
  | 'blocked'
  | 'multi'
  | undefined

export default function HeaderHamburger() {
  const { headerOnBottomOfScreen } = useAppStore()
  const [currentlyOpen, setCurrentlyOpen] = useState<DialogTypes>()
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <span ref={ref} className={headerOnBottomOfScreen ? undefined : 'relative'}>
      <GiHamburgerMenu
        className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
        onClick={() => {
          setMenuOpen(true)
        }}
      />
      <Suspense fallback={null}>
        {menuOpen ? (
          <HeaderMenu
            setOpen={arg => {
              setCurrentlyOpen(arg)
              setMenuOpen(false)
            }}
          />
        ) : null}

        {currentlyOpen === 'settings' ? (
          <SettingsDialog
            open
            setOpen={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'favoriteUsers' ? (
          <FavoriteUsersDialog
            open
            setOpen={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'favoriteSubreddits' ? (
          <FavoriteSubredditsDialog
            open
            setOpen={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'blocked' ? (
          <BlockedUsersDialog
            open
            setOpen={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'multi' ? (
          <MakeMultiRedditDialog
            open
            setOpen={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
      </Suspense>
    </span>
  )
}
