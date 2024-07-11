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

export function decode(html: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

type Hasher<T> = (input: T) => string

// from https://github.com/seriousManual/dedupe/blob/master/LICENSE
export function de<T>(list: T[], hasher: Hasher<T> = JSON.stringify) {
  const clone: T[] = []
  const lookup = new Set<string>()

  for (const entry of list) {
    const hashed = hasher(entry)

    if (!lookup.has(hashed)) {
      clone.push(entry)
      lookup.add(hashed)
    }
  }

  return clone
}
