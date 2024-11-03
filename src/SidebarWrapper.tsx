import BaseDialog from './BaseDialog'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

function LargeScreen({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

function SmallScreen({ children }: { children: React.ReactNode }) {
  const store = useAppStore()
  return (
    <BaseDialog
      open
      onClose={() => {
        store.setSidebarOpen(false)
      }}
    >
      <div className="w-screen h-screen">{children}</div>
    </BaseDialog>
  )
}

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const small = useSmallScreen()
  return small ? (
    <SmallScreen>{children}</SmallScreen>
  ) : (
    <LargeScreen>{children}</LargeScreen>
  )
}
