import SubredditButtons from './SubredditButtons'
import UserButtons from './UserButtons'
import type { Post } from './util'

export default function CardButtons({ post }: { post: Post }) {
  const { subreddit_name_prefixed, author } = post
  const userreddit = `u/${author}`
  return (
    <div>
      <UserButtons post={post} />
      {userreddit === subreddit_name_prefixed ? null : (
        <SubredditButtons post={post} />
      )}
    </div>
  )
}
