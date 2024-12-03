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
      className={['btn', className].filter(f => !!f).join(' ')}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
