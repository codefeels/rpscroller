import { Suspense, lazy, useState } from 'react'

import { FaHome, FaSave } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'
import { Link } from 'react-router-dom'

import ButtonM1 from './ButtonM1'
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

export default function SubredditButtons({ post }: { post: Post }) {
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
          <Link to={origsubreddit}>
            <ButtonM1>Browse {origsubreddit}</ButtonM1>
          </Link>
          {hasFavSubOrig ? null : (
            <ButtonM1
              onClick={() => {
                store.addFavorite(origsubreddit)
              }}
            >
              <MdFavorite className="inline" /> {origsubreddit}
            </ButtonM1>
          )}
        </>
      ) : null}
      {thissubreddit === userreddit ? null : (
        <>
          <Link to={thissubreddit}>
            <ButtonM1>Browse {thissubreddit}</ButtonM1>
          </Link>
          {hasFavSubThis ? null : (
            <ButtonM1
              onClick={() => {
                store.addFavorite(thissubreddit)
              }}
            >
              <MdFavorite className="inline" /> {thissubreddit}
            </ButtonM1>
          )}
        </>
      )}
      {val === 'savedposts' ? (
        <ButtonM1
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
        </ButtonM1>
      ) : (
        <ButtonM1
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
        </ButtonM1>
      )}
      <ButtonM1
        onClick={() => {
          setAddToFeedDialogOpen(true)
        }}
      >
        <FaPlus className="inline" /> Add {subreddit_name_prefixed} to feed
      </ButtonM1>
      <ButtonM1
        onClick={() => {
          store.setDefaultPage(subreddit_name_prefixed)
        }}
      >
        <FaHome className="inline" /> Set {subreddit_name_prefixed} as home
      </ButtonM1>
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
