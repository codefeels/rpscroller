import { useEffect, useRef, useState } from 'react'
import HeaderMenu from './HeaderMenu'
import { useAppStore } from './store'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'
import SettingsDialog from './SettingsDialog'
import FavoriteUsersDialog from './FavoriteUsersDialog'
import FavoriteSubredditsDialog from './FavoriteSubredditsDialog'
import BlockedUsersDialog from './BlockedUsersDialog'
import MakeMultiRedditDialog from './MakeMultiRedditDialog'

export type DialogTypes =
  | 'settings'
  | 'favoriteSubreddits'
  | 'favoriteUsers'
  | 'blocked'
  | 'multi'
  | undefined

export default function HeaderHamburger() {
  const { keepMenuOpen, headerOnBottomOfScreen } = useAppStore()
  const [currentlyOpen, setCurrentlyOpen] = useState<DialogTypes>()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !keepMenuOpen
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [keepMenuOpen])
  return (
    <span ref={ref} className={headerOnBottomOfScreen ? undefined : 'relative'}>
      <GiHamburgerMenu
        className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
        onClick={() => {
          setOpen(!open)
        }}
      />
      {open ? (
        <HeaderMenu
          setCurrentlyOpen={arg => {
            setCurrentlyOpen(arg)
            setOpen(false)
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
    </span>
  )
}
