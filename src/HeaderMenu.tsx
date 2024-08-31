// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import Link from './Link'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import { isUserSubreddit, normalizeForDisplay, useAppStore } from './store'
import Button from './Button'
import type { DialogTypes } from './Header'

export default function HeaderMenu({
  setCurrentlyOpen,
}: {
  setCurrentlyOpen: (arg: DialogTypes) => void
}) {
  const store = useAppStore()
  const { favorites, recentlyVisited } = store

  return (
    <div
      className="absolute left-0 z-10 m-1 p-1 origin-top-right rounded-md shadow-lg focus:outline-none bg-white dark:bg-black max-h-screen overflow-auto"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="max-w-3xl ">
        <div>
          <SearchBox />
        </div>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('settings')
          }}
        >
          <IoIosSettings className="inline" /> Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('favoriteSubreddits')
          }}
        >
          <MdFavorite className="inline" /> Favorite subreddits
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('favoriteUsers')
          }}
        >
          <MdFavorite className="inline" /> Favorite users
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('multi')
          }}
        >
          <FaShoppingCart className="inline" /> Multi-reddit maker
        </MenuItem>
        <hr />
        <div>
          Most visited <MdFavorite className="inline" /> subreddits:
        </div>
        {favorites
          .filter(f => !isUserSubreddit(f.name))
          .sort((a, b) => b.visitedCount - a.visitedCount)
          .slice(0, 5)
          .map(l => (
            <MenuItem
              key={l.name}
              onClick={() => {
                store.setVal(l.name)
              }}
            >
              - {normalizeForDisplay(l.name)} ({l.visitedCount})
            </MenuItem>
          ))}
        <hr />
        <div>
          Most visited <MdFavorite className="inline" /> users:{' '}
        </div>
        {favorites
          .filter(f => isUserSubreddit(f.name))
          .sort((a, b) => b.visitedCount - a.visitedCount)
          .slice(0, 5)
          .map(l => (
            <MenuItem
              key={l.name}
              onClick={() => {
                store.setVal(l.name)
              }}
            >
              - {normalizeForDisplay(l.name)} ({l.visitedCount})
            </MenuItem>
          ))}
        <hr />
        <div>Recently visited: </div>
        {recentlyVisited.map(l => (
          <MenuItem
            key={l}
            onClick={() => {
              store.setVal(l)
            }}
          >
            - {normalizeForDisplay(l)}
          </MenuItem>
        ))}
        <Button
          onClick={() => {
            store.clearRecentlyVisited()
          }}
        >
          Clear
        </Button>
        <hr />

        <div>
          <Link
            href="https://github.com/codefeels/rpscroller/"
            target="_blank"
            rel="noreferrer"
          >
            Source code/about
          </Link>
        </div>
      </div>
    </div>
  )
}
