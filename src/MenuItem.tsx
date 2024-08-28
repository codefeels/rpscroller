export default function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div
      className="hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer m-1 whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
