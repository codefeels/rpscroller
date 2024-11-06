// icons
import { MdFavorite } from 'react-icons/md'
import { MdBlock } from 'react-icons/md'
// locals
import { useAppStore } from './store'
import { hasFavorite, type Post } from './util'
// components
import Button from './Button'
import { lazy, Suspense, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

// lazies
const AddToListDialog = lazy(() => import('./AddToListDialog'))

export default function UserButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author } = post
  const { favorites, blocked } = store
  const [addToListDialogOpen, setAddToListDialogOpen] = useState(false)
  const hasFavUser = hasFavorite(`/user/${author}`, favorites)
  const userreddit = `/u/${author}`
  return (
    <div>
      <Button
        onClick={() => {
          store.setVal(`/user/${author}`)
        }}
      >
        Browse {`/u/${author}`}
      </Button>
      {hasFavUser ? null : (
        <Button
          onClick={() => {
            store.addFavorite(`/user/${author}`)
          }}
        >
          <MdFavorite className="inline" /> {userreddit}
        </Button>
      )}
      {hasFavUser || blocked.includes(author) ? null : (
        <Button
          onClick={() => {
            store.setBlocked(author)
          }}
        >
          <MdBlock className="inline" /> Block {userreddit}
        </Button>
      )}
      <Button
        onClick={() => {
          setAddToListDialogOpen(true)
        }}
      >
        <FaPlus className="inline" /> Add {userreddit} to list
      </Button>
      {addToListDialogOpen ? (
        <Suspense fallback={null}>
          <AddToListDialog
            subreddit={author}
            onClose={() => {
              setAddToListDialogOpen(false)
            }}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
