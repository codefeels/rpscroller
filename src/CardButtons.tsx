import PostActionsDropdown from './PostActionsDropdown'

import type { Post } from './util'

export default function CardButtons({ post }: { post: Post }) {
  return (
    <div>
      <PostActionsDropdown post={post} />
    </div>
  )
}
