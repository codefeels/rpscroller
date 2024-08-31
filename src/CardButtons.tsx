import { MdFavorite } from 'react-icons/md'
import { MdBlock } from 'react-icons/md'
import { hasFavorite, useAppStore } from './store'
import type { Post } from './util'
import Button from './Button'

export default function CardButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed: subreddit } = post
  const { blocked } = store
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
            <MdBlock className="inline" /> {`/u/${author}`}
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
      </div>
    </div>
  )
}
