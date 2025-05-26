import { GiHamburgerMenu } from 'react-icons/gi'

import { useAppStore } from './store'

export default function HamburgerMenu() {
  const store = useAppStore()
  return (
    <GiHamburgerMenu
      id="menubutton"
      className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
      onClick={() => {
        store.toggleSidebarOpen()
      }}
    />
  )
}
