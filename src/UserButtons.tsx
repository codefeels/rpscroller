import { Suspense, lazy, useState } from 'react'

import { FaPlus } from 'react-icons/fa6'
import { MdBlock, MdFavorite } from 'react-icons/md'

import ButtonM1 from './ButtonM1'
import { useAppStore } from './store'
import { hasFavorite } from './util'

import type { Post } from './util'
import { Link } from 'react-router-dom'

// lazies
const AddToFeedDialog = lazy(() => import('./AddToFeedDialog'))

export default function UserButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author } = post
  const { favorites, blocked } = store
  const [addToFeedDialogOpen, setAddToFeedDialogOpen] = useState(false)
  const hasFavUser = hasFavorite(`/user/${author}`, favorites)
  const userreddit = `/u/${author}`
  return (
    <div>
      <Link to={`/user/${author}`}>
        <ButtonM1>Browse {`/u/${author}`}</ButtonM1>
      </Link>
      {hasFavUser ? null : (
        <ButtonM1
          onClick={() => {
            store.addFavorite(`/user/${author}`)
          }}
        >
          <MdFavorite className="inline" /> {userreddit}
        </ButtonM1>
      )}
      {hasFavUser || blocked.includes(author) ? null : (
        <ButtonM1
          onClick={() => {
            store.setBlocked(author)
          }}
        >
          <MdBlock className="inline" /> Block {userreddit}
        </ButtonM1>
      )}
      <ButtonM1
        onClick={() => {
          setAddToFeedDialogOpen(true)
        }}
      >
        <FaPlus className="inline" /> Add {userreddit} to feed
      </ButtonM1>
      {addToFeedDialogOpen ? (
        <Suspense fallback={null}>
          <AddToFeedDialog
            subreddit={`u_${author}`}
            onClose={() => {
              setAddToFeedDialogOpen(false)
            }}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
