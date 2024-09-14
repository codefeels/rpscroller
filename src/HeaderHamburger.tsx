import { lazy, Suspense, useRef, useState } from 'react'
import { useAppStore } from './store'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'

// lazies
const HeaderMenu = lazy(() => import('./HeaderMenu'))
const AboutDialog = lazy(() => import('./AboutDialog'))
const SettingsDialog = lazy(() => import('./SettingsDialog'))
const FavoriteUsersDialog = lazy(() => import('./FavoriteUsersDialog'))
const BlockedUsersDialog = lazy(() => import('./BlockedUsersDialog'))
const MakeMultiRedditDialog = lazy(() => import('./MakeMultiRedditDialog'))
const FavoriteSubredditsDialog = lazy(
  () => import('./FavoriteSubredditsDialog'),
)

export type DialogTypes =
  | 'settings'
  | 'favoriteSubreddits'
  | 'favoriteUsers'
  | 'blocked'
  | 'multi'
  | 'menu'
  | 'about'
  | undefined

export default function HeaderHamburger() {
  const { headerOnBottomOfScreen } = useAppStore()
  const [currentlyOpen, setCurrentlyOpen] = useState<DialogTypes>()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <span ref={ref} className={headerOnBottomOfScreen ? undefined : 'relative'}>
      <GiHamburgerMenu
        id="menubutton"
        className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
        onClick={() => {
          setCurrentlyOpen(currentlyOpen === 'menu' ? undefined : 'menu')
        }}
      />
      <Suspense fallback={null}>
        {currentlyOpen === 'menu' ? (
          <HeaderMenu
            setOpen={arg => {
              setCurrentlyOpen(arg)
            }}
          />
        ) : null}

        {currentlyOpen === 'settings' ? (
          <SettingsDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'favoriteUsers' ? (
          <FavoriteUsersDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'favoriteSubreddits' ? (
          <FavoriteSubredditsDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'blocked' ? (
          <BlockedUsersDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'multi' ? (
          <MakeMultiRedditDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
        {currentlyOpen === 'about' ? (
          <AboutDialog
            open
            onClose={() => {
              setCurrentlyOpen(undefined)
            }}
          />
        ) : null}
      </Suspense>
    </span>
  )
}
