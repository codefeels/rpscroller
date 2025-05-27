import SearchBox from './SearchBox'
import SidebarExtra from './SidebarExtra'
import SidebarFeedList from './SidebarFeedList'
import SidebarRecentlyVisitedSubreddits from './SidebarRecentlyVisitedSubreddits'
import SidebarRecentlyVisitedUsers from './SidebarRecentlyVisitedUsers'
import SidebarSimilarSubreddits from './SidebarSimilarSubreddits'
import SidebarWrapper from './SidebarWrapper'
import { useSmallScreen } from './useSmallScreen'

export default function Sidebar() {
  const small = useSmallScreen()
  return (
    <SidebarWrapper>
      {small ? <SearchBox /> : null}

      <SidebarSimilarSubreddits />
      <SidebarRecentlyVisitedSubreddits />
      <SidebarRecentlyVisitedUsers />
      <SidebarFeedList />
      <SidebarExtra />
    </SidebarWrapper>
  )
}
