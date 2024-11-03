import { useState } from 'react'

// locals
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'
import { hasFavorite, type Post } from './util'

// icons
import { MdFavorite } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'

// components
import Button from './Button'
import ErrorMessage from './ErrorMessage'

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
  const { subreddit_name_prefixed, crosspost_parent_list } = post
  const { val } = store
  const origsubreddit =
    crosspost_parent_list?.[0]?.subreddit_name_prefixed ?? ''
  const thissubreddit = subreddit_name_prefixed
  const hasFavSubOrig = hasFavorite(origsubreddit, store.favorites)
  const hasFavSubThis = hasFavorite(thissubreddit, store.favorites)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<unknown>()

  return (
    <div>
      {error ? <ErrorMessage error={error} /> : null}
      {origsubreddit ? (
        <>
          <Button
            onClick={() => {
              store.setVal(origsubreddit)
            }}
          >
            Browse {origsubreddit}
          </Button>
          {hasFavSubOrig ? null : (
            <Button
              onClick={() => {
                store.addFavorite(origsubreddit)
              }}
            >
              <MdFavorite className="inline" /> {origsubreddit}
            </Button>
          )}
        </>
      ) : null}
      <Button
        onClick={() => {
          store.setVal(thissubreddit)
        }}
      >
        Browse {thissubreddit}
      </Button>
      {hasFavSubThis ? null : (
        <Button
          onClick={() => {
            store.addFavorite(thissubreddit)
          }}
        >
          <MdFavorite className="inline" /> {thissubreddit}
        </Button>
      )}
      {val === 'savedposts' ? (
        <Button
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
        </Button>
      ) : (
        <Button
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
        </Button>
      )}
    </div>
  )
}
