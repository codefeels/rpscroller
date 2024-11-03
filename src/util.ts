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
  const matches = /redgifs.com\/watch\/([\w-]+)\/?/i.exec(url)
  if (matches?.length) {
    return matches[1]
  }

  // already iframe
  const matches2 = /redgifs.com\/ifr\/([\w-]+)\/?/i.exec(url)
  if (matches2?.length) {
    return matches2[1]
  }

  // image
  const matches3 = /redgifs.com\/i\/([\w-]+)\/?/i.exec(url)
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
export function deduplicate<T>(list: T[], hasher: Hasher<T> = JSON.stringify) {
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

interface GalleryEntry {
  s: {
    u?: string
    gif?: string
  }
}
export interface Post {
  score: number
  created: number
  id: string
  subreddit_name_prefixed: string
  title: string
  pinned: boolean
  url: string
  permalink: string
  author: string
  media_metadata?: Record<string, GalleryEntry>
  gallery_data?: {
    items?: {
      media_id: string
      caption: string
    }[]
  }
  crosspost_parent_list?: Post[]
}

export interface RedditResponse {
  data: Data
}

export interface Data {
  before?: string
  after?: string
  children: {
    data: Post
  }[]
}

export interface Favorite {
  visitedCount: number
  name: string
  dateAdded: Date
}

export interface List {
  val: string
  name: string
}

export function isUserSubreddit(f: string) {
  const s = normalizeForComparison(f)
  return s.startsWith('user/') || s.startsWith('u_')
}

export function normalizeForComparison(val: string) {
  return normalizeSubreddit(val).toLowerCase()
}

export function normalizeForDisplay(val: string) {
  return normalizeSubreddit(val).replace('user/', 'u/')
}

export function normalizeSubreddit(val: string) {
  return val.replace(/^\//, '').replace('u/', 'user/')
}

export function maybeNormalizeSubreddit(val?: string) {
  return val === undefined ? undefined : normalizeSubreddit(val)
}

export function hasFavorite(val: string, favorites: Favorite[]) {
  return favorites
    .map(s => normalizeForComparison(s.name))
    .includes(normalizeForComparison(val))
}
