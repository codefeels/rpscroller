import { lazy, Suspense, useState } from 'react'
// icons
import { FaEdit, FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa6'

// store
import { useAppStore } from './store'

// components
import Button from './Button'
import SpanMenuItem from './SpanMenuItem'
import type { Feed } from './util'

const EditFeedDialog = lazy(() => import('./EditFeedDialog'))

function FeedRow({ feed }: { feed: Feed }) {
  const store = useAppStore()
  const [editFeedDialogOpen, setEditFeedDialogOpen] = useState(false)
  return (
    <div>
      <SpanMenuItem
        onClick={() => {
          store.setVal(`/r/${feed.subreddits.join('+')}`)
        }}
      >
        - {feed.name}
      </SpanMenuItem>
      <Button
        onClick={() => {
          setEditFeedDialogOpen(true)
        }}
      >
        <FaEdit />
      </Button>
      <Button
        onClick={() => {
          store.removeFeed(feed.name)
        }}
      >
        <FaTrash />
      </Button>
      {editFeedDialogOpen ? (
        <Suspense fallback={null}>
          <EditFeedDialog
            onClose={() => {
              setEditFeedDialogOpen(false)
            }}
            feed={feed}
          />
        </Suspense>
      ) : null}
    </div>
  )
}

export default function Feeds() {
  const store = useAppStore()
  const { showFeeds, feeds } = store
  return (
    <>
      {feeds.length > 0 ? (
        <div>
          <div>
            Feeds <FaBook className="inline" />:{' '}
            <Button
              onClick={() => {
                store.setShowFeeds(!showFeeds)
              }}
            >
              {showFeeds ? (
                <FaMinus className="inline" />
              ) : (
                <FaPlus className="inline" />
              )}
            </Button>
          </div>
          {showFeeds ? feeds.map(l => <FeedRow feed={l} key={l.name} />) : null}
        </div>
      ) : null}
    </>
  )
}
