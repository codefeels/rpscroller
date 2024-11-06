import { useState } from 'react'
import { useAppStore } from './store'
// utils
import type { Feed } from './util'
// icons
import { FaTrash } from 'react-icons/fa6'
// components
import BaseDialog from './BaseDialog'
import Button from './Button'

export default function EditFeedDialog({
  onClose,
  feed,
}: {
  onClose: () => void
  feed: Feed
}) {
  const store = useAppStore()
  const [feedName, setFeedName] = useState(feed.name)
  return (
    <BaseDialog open onClose={onClose}>
      <div className="m-2">
        <h4>Edit feed</h4>
        <form
          onSubmit={event => {
            event.preventDefault()
            store.updateFeed({
              feedName: feed.name,
              newFeed: {
                name: feedName,
                subreddits: feed.subreddits,
              },
            })
          }}
        >
          <label htmlFor="feedname">Feed name </label>
          <input
            id="feedname"
            type="text"
            value={feedName}
            onChange={event => {
              setFeedName(event.target.value)
            }}
          />
          <button type="submit">Submit</button>
          <div className="mt-10">
            List of subreddits in feed
            <ul>
              {feed.subreddits.map(r => (
                <li key={r}>
                  - {r}{' '}
                  <Button
                    onClick={() => {
                      store.updateFeed({
                        feedName: feed.name,
                        newFeed: {
                          name: feed.name,
                          subreddits: feed.subreddits.filter(f => f !== r),
                        },
                      })
                    }}
                  >
                    <FaTrash />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </BaseDialog>
  )
}
