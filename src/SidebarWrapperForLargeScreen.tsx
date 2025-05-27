export default function SidebarWrapperForLargeScreen({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-5 mb-20">{children}</div>
}
