import { Suspense, lazy, useState } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { MdFavorite } from 'react-icons/md'

import ErrorMessage from './ErrorMessage'
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { type Post, hasFavorite } from './util'

// icons

// components

// lazies
const AddToFeedDialog = lazy(() => import('./AddToFeedDialog'))

async function savePost(post: Post) {
  const db = await dbPromise
  await db.put('savedPosts', post, post.id)
}

async function removeSavedPost(post: Post) {
  const db = await dbPromise
  await db.delete('savedPosts', post.id)
}

export default function CardButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit, subreddit_name_prefixed, crosspost_parent_list } =
    post
  const userreddit = `u/${author}`

  const { favorites, blocked } = store
  const [addToFeedDialogOpen, setAddToFeedDialogOpen] = useState(false)
  const hasFavUser = hasFavorite(`/user/${author}`, favorites)

  const { val } = store
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed
  const hasFavSubOrig = hasFavorite(subreddit_name_prefixed, store.favorites)

  return (
    <>
      <details className="dropdown">
        <summary className="btn">
          <GiHamburgerMenu />
        </summary>
        <ul className="menu dropdown-content bg-base-100 w-auto z-[1] p-1 whitespace-nowrap">
          {thissubreddit === userreddit ? null : (
            <li
              onClick={() => {
                store.setVal(thissubreddit)
              }}
            >
              Browse {thissubreddit}
            </li>
          )}

          {thissubreddit === userreddit ? null : (
            <li
              onClick={() => {
                store.addFavorite(thissubreddit)
              }}
            >
              Fav {thissubreddit}
            </li>
          )}

          <li
            onClick={() => {
              setAddToFeedDialogOpen(true)
            }}
          >
            Add {subreddit_name_prefixed} to feed
          </li>
        </ul>
      </details>
      <details className="dropdown">
        <summary className="btn">
          <GiHamburgerMenu />
        </summary>
        <ul className="menu dropdown-content bg-base-100 w-auto z-[1] p-1 whitespace-nowrap">
          <li
            onClick={() => {
              store.setVal(`/user/${author}`)
            }}
          >
            Browse {`/u/${author}`}
          </li>

          {hasFavUser ? null : (
            <li
              onClick={() => {
                store.addFavorite(`/user/${author}`)
              }}
            >
              Fav {userreddit}
            </li>
          )}

          <li
            onClick={() => {
              setAddToFeedDialogOpen(true)
            }}
          >
            Add {userreddit} to feed
          </li>
        </ul>
      </details>
    </>
  )
}
