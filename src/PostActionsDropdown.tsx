import { Suspense, lazy, useState } from 'react'

import { FaHome, FaSave } from 'react-icons/fa'
import { FaPlay, FaPlus } from 'react-icons/fa6'
import { MdBlock, MdFavorite, MdMoreHoriz } from 'react-icons/md'
import { Link } from 'react-router-dom'

import ButtonM1 from './ButtonM1'
import ErrorMessage from './ErrorMessage'
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { useCurrentPage } from './useCurrentPage'
import { type Post, hasFavorite, normalizeForComparison } from './util'

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

export default function PostActionsDropdown({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit, subreddit_name_prefixed, crosspost_parent_list } =
    post
  const { defaultPage, favorites, blocked } = store
  const val = useCurrentPage(defaultPage)

  // User-related states
  const userreddit = `/u/${author}`
  const hasFavUser = hasFavorite(`/user/${author}`, favorites)

  // Subreddit-related states
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed
  const hasFavSubOrig = hasFavorite(origsubreddit, favorites)
  const hasFavSubThis = hasFavorite(thissubreddit, favorites)

  // Common states
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<unknown>()
  const [addToFeedDialogOpen, setAddToFeedDialogOpen] = useState(false)
  const [addToFeedSubreddit, setAddToFeedSubreddit] = useState('')

  // Open add to feed dialog
  const openAddToFeedDialog = (sub: string) => {
    setAddToFeedSubreddit(sub)
    setAddToFeedDialogOpen(true)
  }

  const isUserSubreddit =
    normalizeForComparison(userreddit) ===
    normalizeForComparison(subreddit_name_prefixed)

  return (
    <div className="inline">
      <Link to={userreddit}>
        <ButtonM1>
          <FaPlay className="inline" /> Browse {userreddit}
        </ButtonM1>
      </Link>
      {origsubreddit ? (
        <Link to={origsubreddit}>
          <ButtonM1>
            <FaPlay className="inline" /> Browse {origsubreddit}
          </ButtonM1>
        </Link>
      ) : null}
      {isUserSubreddit ? null : (
        <Link to={thissubreddit}>
          <ButtonM1>
            <FaPlay className="inline" /> Browse {thissubreddit}
          </ButtonM1>
        </Link>
      )}
      <div className="dropdown">
        {error ? <ErrorMessage error={error} /> : null}

        <ButtonM1 className="inline">
          More options <MdMoreHoriz />
        </ButtonM1>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-300 z-1 w-80 shadow-sm"
        >
          <li className="menu-title">User ({userreddit})</li>
          {!hasFavUser && (
            <li>
              <button
                onClick={() => {
                  store.addFavorite(`/user/${author}`)
                }}
              >
                <MdFavorite className="inline" /> Favorite user
              </button>
            </li>
          )}
          {!hasFavUser && !blocked.includes(author) && (
            <li>
              <button
                onClick={() => {
                  store.setBlocked(author)
                }}
              >
                <MdBlock className="inline" /> Block user
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => {
                openAddToFeedDialog(`u_${author}`)
              }}
            >
              <FaPlus className="inline" /> Add user to feed
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                store.setDefaultPage(userreddit)
              }}
            >
              <FaHome className="inline" /> Set user as home
            </button>
          </li>

          {isUserSubreddit ? null : (
            <>
              <li className="menu-title">Subreddit {origsubreddit}</li>

              {origsubreddit && (
                <>
                  {!hasFavSubOrig && (
                    <li>
                      <button
                        onClick={() => {
                          store.addFavorite(origsubreddit)
                        }}
                      >
                        <MdFavorite className="inline" /> Favorite{' '}
                        {origsubreddit}
                      </button>
                    </li>
                  )}
                </>
              )}

              {thissubreddit !== userreddit && (
                <>
                  {!hasFavSubThis && (
                    <li>
                      <button
                        onClick={() => {
                          store.addFavorite(thissubreddit)
                        }}
                      >
                        <MdFavorite className="inline" /> Favorite{' '}
                        {thissubreddit}
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        openAddToFeedDialog(subreddit)
                      }}
                    >
                      <FaPlus className="inline" /> Add {thissubreddit} to feed
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        store.setDefaultPage(thissubreddit)
                      }}
                    >
                      <FaHome className="inline" /> Set {thissubreddit} as home
                    </button>
                  </li>
                </>
              )}
            </>
          )}

          {/* Save Post Actions */}
          <li>
            {val === 'savedposts' ? (
              <button
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  ;(async () => {
                    try {
                      setError(undefined)
                      await removeSavedPost(post)
                      store.forceRerender()
                    } catch (error) {
                      setError(error)
                      console.error(error)
                    }
                  })()
                }}
              >
                <FaSave className="inline" /> Remove from saved
              </button>
            ) : (
              <button
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  ;(async () => {
                    try {
                      setError(undefined)
                      await savePost(post)
                    } catch (error) {
                      setError(error)
                      console.error(error)
                    }
                  })()
                  setSaved(true)
                  setTimeout(() => {
                    setSaved(false)
                  }, 400)
                }}
              >
                <FaSave className="inline" /> {saved ? 'Saved!' : 'Save post'}
              </button>
            )}
          </li>
        </ul>

        {/* Dialog for adding to feed */}
        {addToFeedDialogOpen ? (
          <Suspense fallback={null}>
            <AddToFeedDialog
              subreddit={addToFeedSubreddit}
              onClose={() => {
                setAddToFeedDialogOpen(false)
              }}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  )
}
