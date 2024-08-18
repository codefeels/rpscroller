import { MdFavorite } from 'react-icons/md'
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
          disabled={store.favs.includes(subreddit)}
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
