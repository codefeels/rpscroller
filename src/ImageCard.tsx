export default function ImageCard({
  title,
  url,
}: {
  title: string
  url: string
}) {
  return (
    <img
      alt={title}
      loading="lazy"
      className="w-full max-h-[80vh] object-contain"
      src={url}
    />
  )
}
