import { useAppStore } from './store'

// icons
import flame from './favicon.svg'
import HeaderHamburger from './HeaderHamburger'

export default function Header() {
  const { headerOnBottomOfScreen } = useAppStore()
  return (
    <div
      className={`bg-initial header p-2 ${headerOnBottomOfScreen ? 'fixed bottom-0 right-0' : 'sticky top-0'}`}
    >
      <HeaderHamburger />
      <button
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        rpscroller
        <img className="h-8 inline" src={flame} alt="app icon" />
      </button>
    </div>
  )
}
