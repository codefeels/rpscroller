import { useDialogShown } from './util'
import { useEffect, useRef } from 'react'

export default function BaseDialog({
  open,
  setOpen,
  children,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
  children: React.ReactNode
}) {
  const ref = useDialogShown(open)
  const ref2 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref2.current && !ref2.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpen])

  return (
    <dialog ref={ref}>
      <div ref={ref2} className="lg:m-10">
        {children}
      </div>
    </dialog>
  )
}
