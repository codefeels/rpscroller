import Card from './Card'
import { useAppStore } from './store'
import { deduplicate, type Data } from './util'

export default function CardList({ data }: { data: Data }) {
  const { noGifs, skipPinned, dedupe, fullscreen, redGifsOnly } = useAppStore()
  let result = data.children
    .filter(({ data }) => !('comment_type' in data))
    .filter(
      ({ data: { url } }) =>
        url.includes('redgifs') ||
        url.endsWith('.jpg') ||
        url.endsWith('.webp') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp') ||
        url.startsWith('https://www.reddit.com/gallery'),
    )
    .filter(({ data }) => (noGifs ? !data.url.endsWith('.gif') : true))
    .filter(({ data }) => (redGifsOnly ? data.url.includes('redgifs') : true))
    .filter(({ data }) => (skipPinned ? !data.pinned : true))

  if (dedupe) {
    result = deduplicate(result, r => r.data.url)
  }
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {result.length > 0 ? (
            result.map(({ data }) => <Card key={data.id} post={data} />)
          ) : (
            <h1>
              No results on this page, check your filters in the settings or
              this may just have been a page of comments if you are browsing a
              user page
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
