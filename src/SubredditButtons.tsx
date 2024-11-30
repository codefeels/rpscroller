import { Suspense, lazy, useState } from 'react'

// locals

// icons
import { FaSave } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'

// components
import ErrorMessage from './ErrorMessage'
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { type Post, hasFavorite } from './util'

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

export default function Subredditlis({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit, subreddit_name_prefixed, crosspost_parent_list } =
    post
  const { val } = store
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed
  const hasFavSubOrig = hasFavorite(subreddit_name_prefixed, store.favorites)
  const hasFavSubThis = hasFavorite(subreddit_name_prefixed, store.favorites)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<unknown>()
  const [addToFeedDialogOpen, setAddToFeedDialogOpen] = useState(false)

  const userreddit = `/u/${author}`
  return (
    <div>
      {error ? <ErrorMessage error={error} /> : null}
      {origsubreddit ? (
        <>
          <li
            onClick={() => {
              store.setVal(origsubreddit)
            }}
          >
            Browse {origsubreddit}
          </li>
          {hasFavSubOrig ? null : (
            <li
              onClick={() => {
                store.addFavorite(origsubreddit)
              }}
            >
              <MdFavorite className="inline" /> {origsubreddit}
            </li>
          )}
        </>
      ) : null}
      {thissubreddit === userreddit ? null : (
        <>
          <li
            onClick={() => {
              store.setVal(thissubreddit)
            }}
          >
            Browse {thissubreddit}
          </li>
          {hasFavSubThis ? null : (
            <li
              onClick={() => {
                store.addFavorite(thissubreddit)
              }}
            >
              <MdFavorite className="inline" /> {thissubreddit}
            </li>
          )}
        </>
      )}
      {val === 'savedposts' ? (
        <li
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
        </li>
      ) : (
        <li
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
        </li>
      )}
      <li
        onClick={() => {
          setAddToFeedDialogOpen(true)
        }}
      >
        <FaPlus className="inline" /> Add {subreddit_name_prefixed} to feed
      </li>
      {addToFeedDialogOpen ? (
        <Suspense fallback={null}>
          <AddToFeedDialog
            subreddit={subreddit}
            onClose={() => {
              setAddToFeedDialogOpen(false)
            }}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
