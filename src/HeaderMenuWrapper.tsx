import { useMediaQuery } from 'usehooks-ts'
import BaseDialog from './BaseDialog'
import { useAppStore } from './store'
import { useEffect, useRef } from 'react'

function LargeScreen({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  const store = useAppStore()
  const { headerOnBottomOfScreen } = store

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== 'menubutton'
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])
  return (
    <div
      ref={ref}
      className={`absolute ${headerOnBottomOfScreen ? 'right-0 bottom-10 origin-bottom-right' : 'origin-top-right left-0'}  z-10 m-1 p-1 rounded-md shadow-lg focus:outline-none bg-white dark:bg-black max-h-[85vh] overflow-auto`}
    >
      {children}
    </div>
  )
}

function SmallScreen({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      {children}
    </BaseDialog>
  )
}

export default function HeaderMenuWrapper({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const matches = useMediaQuery('(min-width: 768px)')
  return matches ? (
    <LargeScreen onClose={onClose}>{children}</LargeScreen>
  ) : (
    <SmallScreen open={open} onClose={onClose}>
      {children}
    </SmallScreen>
  )
}
