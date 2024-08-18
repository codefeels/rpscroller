import { useAppStore } from './store'
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
          disabled={store.favs.includes(`/user/${author}`)}
          onClick={() => {
            store.addFavorite(`/user/${author}`)
          }}
        >
          Add {`/u/${author}`} to favs
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
          disabled={store.favs.includes(subreddit)}
          onClick={() => {
            store.addFavorite(subreddit)
          }}
        >
          Add {subreddit} to favs
        </button>
      </div>
    </div>
  )
}
