// icons
import { MdFavorite } from 'react-icons/md'
import { MdBlock } from 'react-icons/md'
// locals
import { useAppStore } from './store'
import { hasFavorite, type Post } from './util'
// components
import Button from './Button'

export default function UserButtons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author } = post
  const { favorites, blocked } = store
  const hasFavUser = hasFavorite(`/user/${author}`, favorites)
  return (
    <div>
      <Button
        onClick={() => {
          store.setVal(`/user/${author}`)
        }}
      >
        Browse {`/u/${author}`}
      </Button>
      {hasFavUser ? null : (
        <Button
          onClick={() => {
            store.addFavorite(`/user/${author}`)
          }}
        >
          <MdFavorite className="inline" /> {`/u/${author}`}
        </Button>
      )}
      {hasFavUser || blocked.includes(author) ? null : (
        <Button
          onClick={() => {
            store.setBlocked(author)
          }}
        >
          <MdBlock className="inline" /> Block {`/u/${author}`}
        </Button>
      )}
    </div>
  )
}
