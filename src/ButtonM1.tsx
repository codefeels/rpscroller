import Button from './Button'

export default function ButtonM1(props: {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  id?: string
  className?: string
  type?: 'reset' | 'submit' | 'button' | undefined
  disabled?: boolean
  children: React.ReactNode
}) {
  const { children, ...rest } = props
  return (
    <Button {...rest} className="m-0.5">
      {children}
    </Button>
  )
}
