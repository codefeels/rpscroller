import Card from './Card'
import NoResultsMessage from './NoResultsMessage'
import { type FilterStats } from './postFilters'
import { useAppStore } from './store'
import { type Post } from './util'

export default function CardList({
  posts,
  stats,
}: {
  posts: Post[]
  stats?: FilterStats
}) {
  const { fullscreen } = useAppStore()
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {posts.length > 0 ? (
            posts.map(post => <Card key={post.id} post={post} />)
          ) : stats ? (
            <NoResultsMessage
              totalPosts={stats.totalPosts}
              commentTypeFiltered={stats.commentTypeFiltered}
              urlTypeFiltered={stats.urlTypeFiltered}
              gifFiltered={stats.gifFiltered}
              redGifsOnlyFiltered={stats.redGifsOnlyFiltered}
              noRedGifsFiltered={stats.noRedGifsFiltered}
              pinnedFiltered={stats.pinnedFiltered}
              blockedFiltered={stats.blockedFiltered}
              remainingPosts={stats.remainingPosts}
              totalFiltered={stats.totalPosts - stats.remainingPosts}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
