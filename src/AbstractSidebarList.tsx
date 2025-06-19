import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { normalizeForDisplay } from './util'
import { useAppStore } from './store'
import { useIsSmallScreen } from './useIsSmallScreen'

export default function AbstractSidebarList({
  label,
  localStorageKey,
  list,
}: {
  label: string
  localStorageKey: string
  list: { name: string; visitedCount?: number }[]
}) {
  const store = useAppStore()
  const isSmall = useIsSmallScreen()
  const [show, setShow] = useLocalStorage(localStorageKey, true)
  const [showMore, setShowMore] = useLocalStorage(
    'showMore-' + localStorageKey,
    true,
  )

  return (
    <SidebarSectionWrapper>
      <div className="flex gap-1">
        {label}:
        <Button
          onClick={() => {
            setShow(!show)
          }}
        >
          {show ? (
            <FaMinus className="inline" />
          ) : (
            <FaPlus className="inline" />
          )}
        </Button>
        <Button
          onClick={() => {
            setShowMore(!showMore)
          }}
        >
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {show ? (
        <div>
          {list.length > 0
            ? list.slice(0, showMore ? 1000 : 7).map(entry => (
                <Link
                  key={entry.name}
                  to={entry.name}
                  onClick={() => {
                    if (isSmall) {
                      store.setSidebarOpen(false)
                    }
                  }}
                >
                  <MenuItem>
                    - {normalizeForDisplay(entry.name)}
                    {entry.visitedCount ? `(${entry.visitedCount})` : ''}
                  </MenuItem>
                </Link>
              ))
            : 'No items'}
        </div>
      ) : null}
    </SidebarSectionWrapper>
  )
}
