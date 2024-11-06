import { useState } from 'react'
import BaseDialog from './BaseDialog'
import Button from './Button'
import { useAppStore } from './store'

export default function AddToListDialog({
  subreddit,
  onClose,
}: {
  subreddit: string
  onClose: () => void
}) {
  const store = useAppStore()
  const [listName, setListName] = useState('')
  return (
    <BaseDialog open onClose={onClose}>
      <div style={{ minWidth: 500, minHeight: 200 }}>
        Add {subreddit} to list
        {store.lists.length > 0 ? (
          <div>
            <h1>Existing lists:</h1>
            <ul>
              {store.lists.map(list => (
                <li key={list.name}>
                  <Button
                    onClick={() => {
                      store.addToList({
                        listName: list.name,
                        subreddit,
                      })
                    }}
                  >
                    {list.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          Create new list
          <form
            onSubmit={event => {
              event.preventDefault()
              if (listName) {
                store.createList({
                  subreddits: [subreddit],
                  listName,
                })
                onClose()
              }
            }}
          >
            <div>
              <label htmlFor="listname">List name:</label>
              <input
                id="listname"
                type="text"
                value={listName}
                onChange={event => {
                  setListName(event.target.value)
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
