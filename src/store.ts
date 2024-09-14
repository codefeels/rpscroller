import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Favorite {
  visitedCount: number
  name: string
  dateAdded: Date
}

interface AppState {
  rerenderCount: number
  noGifs: boolean
  redGifsOnly: boolean
  blocked: string[]
  fullscreen: boolean
  defaultPage: string
  lists: { val: string; name: string }[]
  page?: string
  showLists: boolean
  showMostVisitedUsers: boolean
  showMostVisitedSubreddits: boolean
  showRecentlyVisited: boolean
  headerOnBottomOfScreen: boolean
  prev?: string
  recentlyVisited: string[]
  mode: string
  favorites: Favorite[]
  val: string
  skipPinned: boolean
  dedupe: boolean
  hideButtons: boolean
  confirmed: boolean
  setHeaderOnBottomOfScreen: (arg: boolean) => void
  forceRerender: () => void
  addList: (val: string, name: string) => void
  removeList: (name: string) => void
  setBlocked: (arg: string) => void
  removeBlocked: (arg: string) => void
  clearRecentlyVisited: () => void
  setDefaultPage: (arg: string) => void
  setHideButtons: (arg: boolean) => void
  setConfirmed: (arg: boolean) => void
  setDedupe: (arg: boolean) => void
  setShowMostVisitedUsers: (arg: boolean) => void
  setShowMostVisitedSubreddits: (arg: boolean) => void
  setShowRecentlyVisited: (arg: boolean) => void
  setShowLists: (arg: boolean) => void
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

const params = new URLSearchParams(window.location.search)
const mode = params.get('mode')
const val = params.get('val')

const filterSet = new Set(['page', 'prev', 'val'])

export const settingsMap = {
  noGifs: [
    'No gifs (the slow, old file format)',
    (f: boolean, store: AppState) => {
      store.setNoGifs(f)
    },
  ],
  redGifsOnly: [
    'RedGifs only',
    (f: boolean, store: AppState) => {
      store.setRedGifsOnly(f)
    },
  ],
  hideButtons: [
    'Hide card Buttons',
    (f: boolean, store: AppState) => {
      store.setHideButtons(f)
    },
  ],
  dedupe: [
    'De-duplicate posts',
    (f: boolean, store: AppState) => {
      store.setDedupe(f)
    },
  ],
  skipPinned: [
    'Skip pinned posts',
    (f: boolean, store: AppState) => {
      store.setSkipPinned(f)
    },
  ],
  fullscreen: [
    'Fullscreen',
    (f: boolean, store: AppState) => {
      store.setFullscreen(f)
    },
  ],
  headerOnBottomOfScreen: [
    'Put header on bottom of screen (better for mobile hand position maybe)',
    (f: boolean, store: AppState) => {
      store.setHeaderOnBottomOfScreen(f)
    },
  ],
} as const

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

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      blocked: [],
      defaultPage: '/r/funny',
      noGifs: true,
      lists: [],
      headerOnBottomOfScreen: false,
      recentlyVisited: [],
      bottomOfScreen: false,
      fullscreen: false,
      rerenderCount: 0,
      showLists: false,
      showMostVisitedUsers: false,
      showMostVisitedSubreddits: false,
      showRecentlyVisited: false,
      redGifsOnly: false,
      hideButtons: false,
      skipPinned: false,
      dedupe: false,
      confirmed: false,
      mode: mode || 'hot',
      page: undefined as string | undefined,
      prev: undefined as string | undefined,
      val: `${val}`,
      favorites: [],
      setHeaderOnBottomOfScreen: arg => {
        set(() => ({ headerOnBottomOfScreen: arg }))
      },
      forceRerender: () => {
        set(state => ({ rerenderCount: state.rerenderCount + 1 }))
      },
      setShowMostVisitedUsers: arg => {
        set(() => ({ showMostVisitedUsers: arg }))
      },
      setShowMostVisitedSubreddits: arg => {
        set(() => ({ showMostVisitedSubreddits: arg }))
      },
      setShowLists: arg => {
        set(() => ({ showLists: arg }))
      },
      setShowRecentlyVisited: arg => {
        set(() => ({ showRecentlyVisited: arg }))
      },

      addList: (val: string, name: string) => {
        set(state => ({
          lists: [...state.lists, { val, name }],
        }))
      },
      removeList: (name: string) => {
        set(state => ({
          lists: state.lists.filter(f => f.name !== name),
        }))
      },
      clearRecentlyVisited: () => {
        set(() => ({
          recentlyVisited: [],
        }))
      },
      setBlocked: user => {
        set(state => ({
          blocked: [...new Set([...state.blocked, user])],
        }))
      },
      removeBlocked: user => {
        set(state => ({
          blocked: state.blocked.filter(f => f !== user),
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
        set(state => ({
          val: s,
          page: undefined,
          prev: undefined,
          mode: 'hot',
          favorites: state.favorites.map(favorite => ({
            ...favorite,
            visitedCount:
              s &&
              normalizeForComparison(s) ===
                normalizeForComparison(favorite.name) &&
              normalizeForComparison(s) !== normalizeForComparison(state.val)
                ? favorite.visitedCount + 1
                : favorite.visitedCount,
          })),
          recentlyVisited:
            s === undefined
              ? state.recentlyVisited
              : state.recentlyVisited.length > 5
                ? [...new Set([s, ...state.recentlyVisited.slice(1)])]
                : [...new Set([s, ...state.recentlyVisited])],
        }))
      },
      addFavorite: val => {
        const s = normalizeSubreddit(val)
        set(state => ({
          favorites: hasFavorite(s, state.favorites)
            ? state.favorites
            : [
                ...state.favorites,
                {
                  name: s,
                  visitedCount: 0,
                  dateAdded: new Date(),
                },
              ],
        }))
      },
      removeFavorite: val => {
        set(s => ({
          favorites: s.favorites.filter(f => f.name !== val),
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
            state.val = val || '' || state.defaultPage
          }
        }
      },
    },
  ),
)
