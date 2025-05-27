import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa6'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import SidebarFeedRow from './SidebarFeedRow'
import { useAppStore } from './store'


export default function Feeds() {
  const store = useAppStore()
  const { feeds } = store
  const [showFeeds, setShowFeeds] = useLocalStorage('showFeeds', true)
  return (
    <>
      {feeds.length > 0 ? (
        <div>
          <div>
            Feeds <FaBook className="inline" />:{' '}
            <Button
              onClick={() => {
                setShowFeeds(!showFeeds)
              }}
            >
              {showFeeds ? (
                <FaMinus className="inline" />
              ) : (
                <FaPlus className="inline" />
              )}
            </Button>
          </div>
          {showFeeds
            ? feeds.map(l => <SidebarFeedRow feed={l} key={l.name} />)
            : null}
        </div>
      ) : null}
    </>
  )
}
