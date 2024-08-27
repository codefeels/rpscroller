import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import queryString from 'query-string'

interface AppState {
  noGifs: boolean
  redGifsOnly: boolean
  fullscreen: boolean
  infiniteScroll: boolean
  defaultPage: string
  page?: string
  prev?: string
  mode: string
  favorites: string[]
  val: string
  skipPinned: boolean
  dedupe: boolean
  hideButtons: boolean
  confirmed: boolean
  setDefaultPage: (arg: string) => void
  setInfiniteScroll: (arg: boolean) => void
  setHideButtons: (arg: boolean) => void
  setConfirmed: (arg: boolean) => void
  setDedupe: (arg: boolean) => void
  setNoGifs: (arg: boolean) => void
  setSkipPinned: (arg: boolean) => void
  setFullscreen: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
  setPage: (arg?: string) => void
  setMode: (arg?: string) => void
  setVal: (arg?: string) => void
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}

const { mode, val } = queryString.parse(window.location.search)

const filterSet = new Set(['page', 'prev', 'val'])

export const settingsMap = {
  infiniteScroll: [
    'Infinite scroll?',
    (f: boolean, store: AppState) => {
      store.setInfiniteScroll(f)
    },
  ],
  noGifs: [
    'No gifs?',
    (f: boolean, store: AppState) => {
      store.setNoGifs(f)
    },
  ],
  redGifsOnly: [
    'RedGifs only?',
    (f: boolean, store: AppState) => {
      store.setRedGifsOnly(f)
    },
  ],
  hideButtons: [
    'Hide card Buttons?',
    (f: boolean, store: AppState) => {
      store.setHideButtons(f)
    },
  ],
  dedupe: [
    'De-duplicate posts?',
    (f: boolean, store: AppState) => {
      store.setDedupe(f)
    },
  ],
  skipPinned: [
    'Skip pinned posts?',
    (f: boolean, store: AppState) => {
      store.setSkipPinned(f)
    },
  ],
  fullscreen: [
    'Fullscreen?',
    (f: boolean, store: AppState) => {
      store.setFullscreen(f)
    },
  ],
} as const

export function isUserSubreddit(f: string) {
  const s = normalizeSubreddit(f)
  return s.startsWith('user/') || s.startsWith('u_')
}

export function normalizeSubreddit(val: string) {
  return val.replace(/^\//, '').replace('u/', 'user/').toLowerCase()
}

export function maybeNormalizeSubreddit(val?: string) {
  return val === undefined ? undefined : normalizeSubreddit(val)
}
export function hasFavorite(val: string, favorites: string[]) {
  return favorites.includes(normalizeSubreddit(val))
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      defaultPage: '/r/funny',
      infiniteScroll: false,
      noGifs: true,
      fullscreen: false,
      redGifsOnly: false,
      hideButtons: false,
      skipPinned: false,
      dedupe: false,
      confirmed: false,
      mode: `${mode ?? ''}` || 'hot',
      page: undefined as string | undefined,
      prev: undefined as string | undefined,
      val: `${val}`,
      favorites: ['r/funny', 'r/midriff+gonemild', 'r/gonewild'],

      setInfiniteScroll: flag => {
        set(() => ({
          infiniteScroll: flag,
        }))
      },
      setConfirmed: flag => {
        set(() => ({
          confirmed: flag,
        }))
      },
      setNoGifs: flag => {
        set(() => ({
          noGifs: flag,
        }))
      },
      setDedupe: flag => {
        set(() => ({
          dedupe: flag,
        }))
      },
      setFullscreen: flag => {
        set(() => ({
          fullscreen: flag,
        }))
      },
      setSkipPinned: flag => {
        set(() => ({
          skipPinned: flag,
        }))
      },
      setHideButtons: flag => {
        set(() => ({
          hideButtons: flag,
        }))
      },
      setRedGifsOnly: flag => {
        set(() => ({
          redGifsOnly: flag,
        }))
      },
      setPage: page => {
        set(store => ({
          page,
          prev: store.page,
        }))
      },
      setMode: mode => {
        set(() => ({
          mode,
          page: undefined,
          prev: undefined,
        }))
      },
      setDefaultPage: defaultPage => {
        set(() => ({
          defaultPage,
        }))
      },
      setVal: val => {
        const s = maybeNormalizeSubreddit(val)
        set(() => ({
          val: s,
          page: undefined,
          prev: undefined,
          mode: 'hot',
        }))
      },
      addFavorite: val => {
        const s = normalizeSubreddit(val)
        set(state => ({
          favorites: hasFavorite(s, state.favorites)
            ? state.favorites
            : [...state.favorites, s],
        }))
      },
      removeFavorite: val => {
        set(s => ({
          favorites: s.favorites.filter(f => f !== val),
        }))
      },
    }),
    {
      name: 'settings',
      partialize: state => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !filterSet.has(key)),
        )
      },
      onRehydrateStorage: () => {
        return state => {
          if (state) {
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            state.val = `${val || ''}` || state.defaultPage
          }
        }
      },
    },
  ),
)
