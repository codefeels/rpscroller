import { useState } from 'react'

import BaseDialog from './BaseDialog'
import Button from './Button'
import { useAppStore } from './store'

export default function AddToFeedDialog({
  subreddit,
  onClose,
}: {
  subreddit: string
  onClose: () => void
}) {
  const store = useAppStore()
  const [feedName, setFeedName] = useState('')
  return (
    <BaseDialog open onClose={onClose}>
      <div style={{ minWidth: 500, minHeight: 200 }}>
        {store.feeds.length > 0 ? (
          <div>
            <h1>Add &quot;{subreddit}&quot; to existing feed:</h1>
            <ul>
              {store.feeds.map(feed => (
                <li key={feed.name}>
                  -{' '}
                  <Button
                    onClick={() => {
                      store.addToFeed({
                        feedName: feed.name,
                        subreddit,
                      })
                    }}
                  >
                    {feed.name}{' '}
                    {feed.subreddits.includes(subreddit)
                      ? '(already in feed)'
                      : ''}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          Create new feed with &quot;{subreddit}&quot;
          <form
            onSubmit={event => {
              event.preventDefault()
              if (feedName) {
                store.createFeed({
                  subreddits: [subreddit],
                  feedName,
                })
                onClose()
              }
            }}
          >
            <div>
              <label htmlFor="feedname">Feed name:</label>
              <input
                id="feedname"
                type="text"
                className="input"
                value={feedName}
                onChange={event => {
                  setFeedName(event.target.value)
                }}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </BaseDialog>
  )
}
