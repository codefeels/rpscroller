// icons
import { FaSave, FaShoppingCart } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'

// store
import Button from './Button'
import Feeds from './Feeds'
import MenuItem from './MenuItem'
import MostVisitedSubreddits from './MostVisitedSubreddits'
import MostVisitedUsers from './MostVisitedUsers'
import RecentlyVisited from './RecentlyVisited'
import SearchBox from './SearchBox'
import SidebarWrapper from './SidebarWrapper'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

// components

export default function Sidebar() {
  const store = useAppStore()
  const small = useSmallScreen()
  return (
    <SidebarWrapper>
      {small ? (
        <>
          <SearchBox />
          <hr />
        </>
      ) : null}

      <RecentlyVisited />
      <hr />
      <Feeds />
      <hr />
      <MostVisitedUsers />
      <hr />
      <MostVisitedSubreddits />
      <hr />
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('settings')
        }}
      >
        <IoIosSettings className="inline" /> Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.setVal('savedposts')
        }}
      >
        <FaSave className="inline" /> Saved posts
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('multi')
        }}
      >
        <FaShoppingCart className="inline" /> Make list
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('blocked')
        }}
      >
        <MdBlock className="inline" /> Blocked users
      </MenuItem>

      <hr />

      <MenuItem>
        <Button
          onClick={() => {
            store.setCurrentlyOpenDialog('about')
          }}
        >
          About
        </Button>
      </MenuItem>
      <div style={{ height: 300 }} />
    </SidebarWrapper>
  )
}
