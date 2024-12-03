import { Suspense, lazy, useState } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'

import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { normalizeSubreddit, type Post } from './util'

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
    <li onClick={onClick}>
      <a onClick={onClick}>{children}</a>
    </li>
  )
}

function Items({
  val,
  onFeedOpen,
}: {
  val: string
  onFeedOpen: (arg: string) => void
}) {
  const store = useAppStore()
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
          onFeedOpen(val)
        }}
      >
        Add {val} to feed
      </MenuItem>
    </>
  )
}

export default function CardDropdown({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed, crosspost_parent_list } = post
  const userreddit = `u/${author}`
  const [addToFeedDialogVal, setAddToFeedDialogVal] = useState<string>()

  const { val } = store
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed

  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          <GiHamburgerMenu />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {thissubreddit === userreddit ? null : (
            <Items
              onFeedOpen={() => {
                setAddToFeedDialogVal(thissubreddit)
              }}
              val={thissubreddit}
            />
          )}

          <hr />
          <Items
            onFeedOpen={() => {
              setAddToFeedDialogVal(normalizeSubreddit(`/u/${author}`))
            }}
            val={`/u/${author}`}
          />
          {origsubreddit ? (
            <>
              <hr />
              <Items
                onFeedOpen={() => {
                  setAddToFeedDialogVal(origsubreddit)
                }}
                val={origsubreddit}
              />
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
      </div>

      {addToFeedDialogVal ? (
        <Suspense fallback={null}>
          <AddToFeedDialog
            subreddit={addToFeedDialogVal}
            onClose={() => {
              setAddToFeedDialogVal(undefined)
            }}
          />
        </Suspense>
      ) : null}
    </>
  )
}
