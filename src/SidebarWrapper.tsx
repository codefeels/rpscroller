import SidebarWrapperForLargeScreen from './SidebarWrapperForLargeScreen'
import SidebarWrapperForSmallScreen from './SidebarWrapperForSmallScreen'
import { useSmallScreen } from './useSmallScreen'

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const small = useSmallScreen()
  return small ? (
    <SidebarWrapperForSmallScreen>{children}</SidebarWrapperForSmallScreen>
  ) : (
    <SidebarWrapperForLargeScreen>{children}</SidebarWrapperForLargeScreen>
  )
}
