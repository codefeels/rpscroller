// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import Link from './Link'
import Sorts from './Sorts'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import { normalizeForDisplay, useAppStore } from './store'
import Button from './Button'

export default function HeaderMenu({
  setCurrentlyOpen,
}: {
  setCurrentlyOpen: (
    arg: 'settings' | 'favorites' | 'multi' | undefined,
  ) => void
}) {
  const store = useAppStore()
  const { recentlyVisited } = store

  return (
    <div
      className="absolute left-0 z-10 m-1 p-1 origin-top-right rounded-md shadow-lg focus:outline-none bg-white dark:bg-black"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <SearchBox />
      <MenuItem
        onClick={() => {
          setCurrentlyOpen('settings')
        }}
      >
        <IoIosSettings className="inline" /> Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          setCurrentlyOpen('favorites')
        }}
      >
        <MdFavorite className="inline" /> Favorites
      </MenuItem>
      <MenuItem
        onClick={() => {
          setCurrentlyOpen('multi')
        }}
      >
        <FaShoppingCart className="inline" /> Multi-reddit maker
      </MenuItem>
      <Sorts />
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
  )
}
