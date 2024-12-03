export default function Link({
  href,
  target,
  rel,
  children,
}: {
  href: string
  target?: string
  rel?: string
  children: React.ReactNode
}) {
  return (
    <a className="link" target={target} rel={rel} href={href}>
      {children}
    </a>
  )
}
