export default function Button({
  onClick,
  type,
  disabled,
  children,
  id,
  className,
}: {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  id?: string
  className?: string
  type?: 'reset' | 'submit' | 'button' | undefined
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      id={id}
      className={[
        'bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 p-0.5 m-0.5 rounded',
        className,
      ]
        .filter(f => !!f)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
