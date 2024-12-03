import { lazy, useState } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'

import ErrorMessage from './ErrorMessage'
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { type Post, hasFavorite } from './util'
import Link from './Link'

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

function MenuItem({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <li>
      <a>{children}</a>
    </li>
  )
}

function Items({ val }: { val: string }) {
  const store = useAppStore()
  const [addToFeedDialogOpen, setAddToFeedDialogOpen] = useState(false)
  return (
    <>
      <MenuItem
        onClick={() => {
          store.setVal(val)
        }}
      >
        Browse {val}
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.addFavorite(val)
        }}
      >
        Fav {val}
      </MenuItem>

      <MenuItem
        onClick={() => {
          setAddToFeedDialogOpen(true)
        }}
      >
        Add {val} to feed
      </MenuItem>
    </>
  )
}

export default function CardButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed, crosspost_parent_list } = post
  const userreddit = `u/${author}`

  const { val } = store
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed

  return (
    <>
      <details className="dropdown">
        <summary className="btn">
          <GiHamburgerMenu />
        </summary>
        <ul className="menu dropdown-content bg-base-200 rounded-box w-auto z-[1] whitespace-nowrap">
          {thissubreddit === userreddit ? null : <Items val={thissubreddit} />}

          <hr />
          <Items val={`/u/${author}`} />
          {origsubreddit ? (
            <>
              <hr />
              <Items val={origsubreddit} />
            </>
          ) : null}

          <hr />
          {val === 'savedposts' ? (
            <MenuItem
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                ;(async () => {
                  try {
                    await removeSavedPost(post)
                    store.forceRerender()
                  } catch (error) {
                    console.error(error)
                  }
                })()
              }}
            >
              Remove from saved
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                ;(async () => {
                  try {
                    await savePost(post)
                  } catch (error) {
                    console.error(error)
                  }
                })()
              }}
            >
              Save post
            </MenuItem>
          )}
        </ul>
      </details>
    </>
  )
}
