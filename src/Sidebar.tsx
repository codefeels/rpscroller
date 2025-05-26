import { FaSave, FaShoppingCart } from 'react-icons/fa'
import { MdBlock, MdInfo } from 'react-icons/md'

import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import SidebarFeeds from './SidebarFeeds'
import SidebarMostVisitedSubreddits from './SidebarMostVisitedSubreddits'
import SidebarMostVisitedUsers from './SidebarMostVisitedUsers'
import SidebarRecentlyVisitedSubreddits from './SidebarRecentlyVisitedSubreddits'
import SidebarRecentlyVisitedUsers from './SidebarRecentlyVisitedUsers'
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

      <SidebarRecentlyVisitedUsers />
      <hr />
      <SidebarRecentlyVisitedSubreddits />
      <hr />
      <SidebarFeeds />
      <hr />
      <SidebarMostVisitedUsers />
      <hr />
      <SidebarMostVisitedSubreddits />
      <hr />
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
