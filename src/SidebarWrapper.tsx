import SidebarWrapperForLargeScreen from './SidebarWrapperForLargeScreen'
import SidebarWrapperForSmallScreen from './SidebarWrapperForSmallScreen'
import { useIsSmallScreen } from './useIsSmallScreen'

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const small = useIsSmallScreen()
  return small ? (
    <SidebarWrapperForSmallScreen>{children}</SidebarWrapperForSmallScreen>
  ) : (
    <SidebarWrapperForLargeScreen>{children}</SidebarWrapperForLargeScreen>
  )
}
