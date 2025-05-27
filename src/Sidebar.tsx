import { FaSave, FaShoppingCart } from 'react-icons/fa'
import { MdBlock, MdInfo } from 'react-icons/md'
import { Link } from 'react-router-dom'

import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import SidebarFeeds from './SidebarFeeds'
import SidebarRecentlyVisitedSubreddits from './SidebarRecentlyVisitedSubreddits'
import SidebarRecentlyVisitedUsers from './SidebarRecentlyVisitedUsers'
import SidebarSimilarSubreddits from './SidebarSimilarSubreddits'
import SidebarWrapper from './SidebarWrapper'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

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

      <SidebarSimilarSubreddits />
      <hr />
      <SidebarRecentlyVisitedSubreddits />
      <hr />
      <SidebarRecentlyVisitedUsers />
      <hr />
      <SidebarFeeds />
      <hr />
      <Link to="/savedposts">
        <MenuItem>
          <FaSave className="inline" /> Saved posts
        </MenuItem>
      </Link>
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
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('about')
        }}
      >
        <MdInfo className="inline" /> About
      </MenuItem>
    </SidebarWrapper>
  )
}
