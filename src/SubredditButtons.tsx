import { MdFavorite } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'
import { hasFavorite, useAppStore } from './store'
import type { Post } from './util'
import Button from './Button'
import { dbPromise } from './savedPostsDb'
import { useState } from 'react'

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

  return (
    <div>
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
                await removeSavedPost(post)
                store.forceRerender()
              } catch (error) {
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
                await savePost(post)
              } catch (error) {
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
