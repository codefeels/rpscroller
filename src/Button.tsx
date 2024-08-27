export default function Button({
  onClick,
  type,
  children,
}: {
  onClick?: () => void
  type?: 'reset' | 'submit' | 'button' | undefined
  children: React.ReactNode
}) {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm p-1 m-1 rounded"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
