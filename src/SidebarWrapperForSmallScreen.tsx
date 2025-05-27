import BaseDialog from './BaseDialog'
import { useAppStore } from './store'

export default function SidebarWrapperForSmallScreen({
  children,
}: {
  children: React.ReactNode
}) {
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
