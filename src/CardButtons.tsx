import SubredditButtons from './SubredditButtons'
import UserButtons from './UserButtons'
import type { Post } from './util'

export default function CardButtons({ post }: { post: Post }) {
  return (
    <div>
      <UserButtons post={post} />
      <SubredditButtons post={post} />
    </div>
  )
}
