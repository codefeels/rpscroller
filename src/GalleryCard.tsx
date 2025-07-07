import { useState } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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

      <div className="flex items-center">
        {/* Left navigation button */}
        <button
          className="p-2 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 rounded transition-colors duration-200"
          disabled={frame <= 0}
          onClick={() => {
            setFrame(frame - 1)
          }}
        >
          <FaChevronLeft size={32} className="text-gray-600" />
        </button>

        <ImageCard
          title={caption}
          url={decode(
            media_metadata?.[media_id]?.s.u ??
              media_metadata?.[media_id]?.s.gif ??
              '',
          )}
        />

        {/* Right navigation button */}
        <button
          className="p-2 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 rounded transition-colors duration-200"
          disabled={frame >= items.length - 1}
          onClick={() => {
            setFrame(frame + 1)
          }}
        >
          <FaChevronRight size={32} className="text-gray-600" />
        </button>
      </div>
    </div>
  ) : (
    <div>Unknown gallery format (post may have been deleted)</div>
  )
}
