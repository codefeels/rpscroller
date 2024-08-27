import { useEffect, useRef } from 'react'
import { settingsMap, useAppStore } from './store'
import { useDialogShown } from './util'

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
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
    <dialog ref={ref} className="max-w-xl">
      <div ref={ref2} className="lg:m-10">
        <h4>Settings</h4>
        {Object.entries(settingsMap).map(([key, [title, callback]]) => {
          return (
            <div key={key}>
              <input
                id={key}
                type="checkbox"
                checked={store[key as keyof typeof store] as boolean}
                onChange={event => {
                  callback(event.target.checked, store)
                }}
              />
              <label htmlFor={key}>{title}</label>
            </div>
          )
        })}
      </div>
    </dialog>
  )
}
