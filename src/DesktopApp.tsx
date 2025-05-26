import Feed from './Feed'
import Sidebar from './Sidebar'
import { useAppStore } from './store'

export default function DesktopApp() {
  const store = useAppStore()
  const { sidebarOpen } = store

  return (
    <div className="relative">
      {sidebarOpen ? (
        <div className="grid grid-cols-12">
          <div className="col-span-2 border-r-2 border-slate-500">
            <div className="sticky overflow-auto max-h-screen top-12">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-10">
            <Feed />
          </div>
        </div>
      ) : (
        <Feed />
      )}
    </div>
  )
}
