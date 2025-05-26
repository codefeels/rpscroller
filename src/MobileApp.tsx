import Feed from './Feed'
import Sidebar from './Sidebar'
import { useAppStore } from './store'

export default function MobileApp() {
  const store = useAppStore()
  const { sidebarOpen } = store

  return (
    <>
      {sidebarOpen ? <Sidebar /> : null}
      <Feed />
    </>
  )
}
