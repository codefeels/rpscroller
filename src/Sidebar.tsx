import SearchBox from './SearchBox'
import SidebarExtra from './SidebarExtra'
import SidebarFeedList from './SidebarFeedList'
import SidebarRecentlyVisitedSubreddits from './SidebarRecentlyVisitedSubreddits'
import SidebarRecentlyVisitedUsers from './SidebarRecentlyVisitedUsers'
import SidebarMostVisitedSubreddits from './SidebarMostVisitedSubreddits'
import SidebarMostVisitedUsers from './SidebarMostVisitedUsers'
import SidebarSimilarSubreddits from './SidebarSimilarSubreddits'
import SidebarWrapper from './SidebarWrapper'
import { useSmallScreen } from './useSmallScreen'

export default function Sidebar() {
  const small = useSmallScreen()
  return (
    <SidebarWrapper>
      {small ? <SearchBox /> : null}

      <SidebarSimilarSubreddits />
      <SidebarMostVisitedSubreddits />
      <SidebarMostVisitedUsers />
      <SidebarRecentlyVisitedSubreddits />
      <SidebarRecentlyVisitedUsers />
      <SidebarFeedList />
      <SidebarExtra />
    </SidebarWrapper>
  )
}
