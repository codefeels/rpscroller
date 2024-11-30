import { Button } from '@radix-ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import SubredditButtons from './SubredditButtons'
import UserButtons from './UserButtons'

// import { Button } from './components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './components/ui/dropdown-menu'

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
      <details className="dropdown">
        <summary className="btn m-1">open or close</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
    </div>
  )
}
