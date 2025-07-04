import SearchBox from './SearchBox'
import SidebarExtra from './SidebarExtra'
import SidebarFavoriteSubreddits from './SidebarFavoriteSubreddits'
import SidebarFavoriteUsers from './SidebarFavoriteUsers'
import SidebarFeedList from './SidebarFeedList'
import SidebarMostVisitedSubreddits from './SidebarMostVisitedSubreddits'
import SidebarMostVisitedUsers from './SidebarMostVisitedUsers'
import SidebarRecentlyVisitedSubreddits from './SidebarRecentlyVisitedSubreddits'
import SidebarRecentlyVisitedUsers from './SidebarRecentlyVisitedUsers'
import SidebarSimilarSubreddits from './SidebarSimilarSubreddits'
import SidebarWrapper from './SidebarWrapper'
import { useIsSmallScreen } from './useIsSmallScreen'

export default function Sidebar() {
  const small = useIsSmallScreen()
  return (
    <SidebarWrapper>
      {small ? <SearchBox /> : null}

      <SidebarSimilarSubreddits />
      <SidebarMostVisitedSubreddits />
      <SidebarMostVisitedUsers />
      <SidebarRecentlyVisitedSubreddits />
      <SidebarRecentlyVisitedUsers />
      <SidebarFavoriteSubreddits />
      <SidebarFavoriteUsers />
      <SidebarFeedList />
      <SidebarExtra />
    </SidebarWrapper>
  )
}
