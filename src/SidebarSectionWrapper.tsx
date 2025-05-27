export default function SidebarSectionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="border-b border-r-slate-600 pb-2 pt-2">{children}</div>
}
