import { MdFavorite } from 'react-icons/md'
import { MdBlock } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'
import { hasFavorite, useAppStore } from './store'
import type { Post } from './util'
import Button from './Button'
import { dbPromise } from './savedPostsDb'

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
  const { author, subreddit_name_prefixed: subreddit } = post
  const { val, blocked } = store
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            store.setVal(`/user/${author}`)
          }}
        >
          Browse {`/u/${author}`}
        </Button>
        {hasFavorite(`/user/${author}`, store.favorites) ? null : (
          <Button
            onClick={() => {
              store.addFavorite(`/user/${author}`)
            }}
          >
            <MdFavorite className="inline" /> {`/u/${author}`}
          </Button>
        )}
        {blocked.includes(author) ? null : (
          <Button
            onClick={() => {
              store.setBlocked(author)
            }}
          >
            <MdBlock className="inline" /> Block {`/u/${author}`}
          </Button>
        )}
      </div>
      <div>
        <Button
          onClick={() => {
            store.setVal(subreddit)
          }}
        >
          Browse {subreddit}
        </Button>
        {hasFavorite(subreddit, store.favorites) ? null : (
          <Button
            onClick={() => {
              store.addFavorite(subreddit)
            }}
          >
            <MdFavorite className="inline" /> {subreddit}
          </Button>
        )}
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
          }}
        >
          <FaSave className="inline" /> Save post
        </Button>
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
        ) : null}
      </div>
    </div>
  )
}
