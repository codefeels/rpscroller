import { useState } from 'react'

export default function ImageCard({
  title,
  url,
}: {
  title: string
  url: string
}) {
  const [fullSize, setFullSize] = useState(false)
  return (
    <img
      alt={title}
      loading="lazy"
      onClick={() => {
        setFullSize(!fullSize)
      }}
      className={fullSize ? undefined : 'w-full max-h-[80vh] object-contain'}
      src={url}
    />
  )
}
