import { useState } from 'react'

import Button from './Button'
import ImageCard from './ImageCard'
import { type Post, decode } from './util'

export default function GalleryCard({ post }: { post: Post }) {
  const { gallery_data, crosspost_parent_list } = post
  const [frame, setFrame] = useState(0)
  const items =
    gallery_data?.items ?? crosspost_parent_list?.[0]?.gallery_data?.items
  const media_metadata =
    post.media_metadata ?? crosspost_parent_list?.[0]?.media_metadata

  const { media_id = '', caption = '' } = items?.[frame] ?? {}
  return items ? (
    <div>
      <div className="text-center">
        {caption} {frame + 1}/{items.length}
      </div>

      <ImageCard
        title={caption}
        url={decode(
          media_metadata?.[media_id]?.s.u ??
            media_metadata?.[media_id]?.s.gif ??
            '',
        )}
      />

      <div className="flex justify-center">
        <Button
          disabled={frame <= 0}
          onClick={() => {
            setFrame(frame - 1)
          }}
        >
          &lt;
        </Button>
        <Button
          disabled={frame >= items.length - 1}
          onClick={() => {
            setFrame(frame + 1)
          }}
        >
          &gt;
        </Button>
      </div>
    </div>
  ) : (
    <div>Unknown gallery format (post may have been deleted)</div>
  )
}
