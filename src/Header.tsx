import { useEffect, useRef, useState } from 'react'

import SettingsDialog from './SettingsDialog'
import FavoriteSubredditsDialog from './FavoriteSubredditsDialog'
import FavoriteUsersDialog from './FavoriteUsersDialog'
import MakeMultiRedditDialog from './MakeMultiRedditDialog'
import BlockedUsersDialog from './BlockedUsersDialog'
import HeaderMenu from './HeaderMenu'
import { useAppStore } from './store'

// icons
import flame from './favicon.svg'
import { GiHamburgerMenu } from 'react-icons/gi'

export type DialogTypes =
  | 'settings'
  | 'favoriteSubreddits'
  | 'favoriteUsers'
  | 'blocked'
  | 'multi'
  | undefined

export default function Header() {
  const { keepMenuOpen } = useAppStore()
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
    <div className="mb-10 sticky top-0 bg-inherit header">
      <h1>
        <span ref={ref} className="relative">
          <GiHamburgerMenu
            className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600"
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
        </span>{' '}
        rpscroller{' '}
        <img className="h-8 inline" src={flame} alt="app icon of flames" />
      </h1>

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
    </div>
  )
}
