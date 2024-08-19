import { formatDistance } from 'date-fns'
// components
import CardButtons from './CardButtons'
// utils
import { useAppStore } from './store'
import { decode, type Post } from './util'
// icons
import { BiSolidUpvote } from 'react-icons/bi'

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
        {formatDistance(new Date(post.created * 1000), new Date(), {
          addSuffix: true,
        })}
        ) [{post.score} <BiSolidUpvote />]
      </h4>{' '}
      (
      <a
        href={`https://reddit.com/u/${author}`}
        target="_blank"
        rel="noreferrer"
      >
        user
      </a>
      ) (
      <a href={url} target="_blank" rel="noreferrer">
        url
      </a>
      ) (
      <a
        href={`https://reddit.com/${subreddit}`}
        target="_blank"
        rel="noreferrer"
      >
        subreddit
      </a>
      ) (
      <a
        href={`https://reddit.com${permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        comments
      </a>
      ){hideButtons ? null : <CardButtons post={post} />}
    </div>
  )
}
