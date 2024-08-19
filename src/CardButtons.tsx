import { MdFavorite } from 'react-icons/md'
import { hasFavorite, useAppStore } from './store'
import type { Post } from './util'

export default function CardButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed: subreddit } = post
  return (
    <div>
      <div>
        <button
          onClick={() => {
            store.setVal(`/user/${author}`)
          }}
        >
          Browse {`/u/${author}`}
        </button>
        <button
          disabled={hasFavorite(`/user/${author}`, store.favorites)}
          onClick={() => {
            store.addFavorite(`/user/${author}`)
          }}
        >
          <MdFavorite /> {`/u/${author}`}
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            store.setVal(subreddit)
          }}
        >
          Browse {subreddit}
        </button>
        <button
          disabled={hasFavorite(subreddit, store.favorites)}
          onClick={() => {
            store.addFavorite(subreddit)
          }}
        >
          <MdFavorite /> {subreddit}
        </button>
      </div>
    </div>
  )
}
