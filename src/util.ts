import { useEffect, useRef } from 'react'

export function useDialogShown(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null)
  const shown = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (open) {
      if (!shown.current) {
        ref.current.showModal()
      }
      shown.current = true
    } else {
      if (shown.current) {
        ref.current.close()
      }
      shown.current = false
    }
  }, [open])
  return ref
}

export function redGifUrlToId(url: string) {
  // watch to ifr
  const matches = url.match(/redgifs.com\/watch\/([\w-]+)\/?/i)
  if (matches?.length) {
    return matches[1]
  }

  // already iframe
  const matches2 = url.match(/redgifs.com\/ifr\/([\w-]+)\/?/i)
  if (matches2?.length) {
    return matches2[1]
  }

  // image
  const matches3 = url.match(/redgifs.com\/i\/([\w-]+)\/?/i)
  if (matches3?.length) {
    return matches3[1]
  }

  return false
}
