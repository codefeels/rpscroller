import { Suspense, lazy, useState } from 'react'

import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Button from './Button'
import SpanMenuItem from './SpanMenuItem'
import { useAppStore } from './store'

import type { Feed } from './util'

const EditFeedDialog = lazy(() => import('./EditFeedDialog'))

export default function SidebarFeedRow({ feed }: { feed: Feed }) {
  const store = useAppStore()
  const [editFeedDialogOpen, setEditFeedDialogOpen] = useState(false)
  return (
    <div>
      <Link to={`/r/${feed.subreddits.join('+')}`}>
        <SpanMenuItem>- {feed.name}</SpanMenuItem>
      </Link>
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
