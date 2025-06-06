import { formatDistanceToNowStrict } from 'date-fns'
import { BiSolidUpvote } from 'react-icons/bi'

import CardButtons from './CardButtons'
import Link from './Link'
import { useAppStore } from './store'
import { type Post, decode } from './util'

export default function CardHeader({ post }: { post: Post }) {
  const { hideButtons } = useAppStore()
  const {
    author,
    subreddit_name_prefixed: subreddit,
    title,
    permalink,
    url,
  } = post
  return (
    <div>
      <h4 className="inline">
        {decode(title)} (
        {formatDistanceToNowStrict(new Date(post.created * 1000), {
          addSuffix: true,
        })}
        ) [{post.score} <BiSolidUpvote className="inline" />]
      </h4>{' '}
      (
      <Link
        href={`https://reddit.com/u/${author}`}
        target="_blank"
        rel="noreferrer"
      >
        user
      </Link>
      ) (
      <Link href={url} target="_blank" rel="noreferrer">
        url
      </Link>
      ) (
      <Link
        href={`https://reddit.com/${subreddit}`}
        target="_blank"
        rel="noreferrer"
      >
        subreddit
      </Link>
      ) (
      <Link
        href={`https://reddit.com${permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        comments
      </Link>
      ){hideButtons ? null : <CardButtons post={post} />}
    </div>
  )
}
