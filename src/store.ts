import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  hasFavorite,
  maybeNormalizeSubreddit,
  normalizeForComparison,
  normalizeSubreddit,
  type List,
  type Favorite,
} from './util'

const MAX_RECENTLY_VISITED = 20

interface AppState {
  rerenderCount: number
  noGifs: boolean
  redGifsOnly: boolean
  sidebarOpen: boolean
  blocked: string[]
  fullscreen: boolean
  defaultPage: string
  lists: List[]
  showLists: boolean
  isFullscreen: boolean
  showMostVisitedUsers: boolean
  showMostVisitedSubreddits: boolean
  showRecentlyVisited: boolean
  headerOnBottomOfScreen: boolean
  recentlyVisited: string[]
  mode: string
  favorites: Favorite[]
  val: string
  skipPinned: boolean
  dedupe: boolean
  hideButtons: boolean
  confirmed: boolean
  currentlyOpenDialog: string | undefined

  setCurrentlyOpenDialog: (arg: string | undefined) => void
  setSidebarOpen: (arg: boolean) => void
  toggleSidebarOpen: () => void

  // detect if something has put the app into fullscreen e.g. redgifs
  setIsFullscreen: (arg: boolean) => void

  // lists
  createList: (arg: { subreddits: string[]; listName: string }) => void
  addToList: (arg: { subreddit: string; listName: string }) => void
  removeList: (name: string) => void

  // blocks
  setBlocked: (arg: string) => void
  removeBlocked: (arg: string) => void

  // recently visited
  clearRecentlyVisited: () => void
  removeFromRecentlyVisited: (arg: string) => void

  forceRerender: () => void
  setHeaderOnBottomOfScreen: (arg: boolean) => void
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
  setMode: (arg?: string) => void
  setVal: (arg?: string) => void

  // favorites
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}

const params = new URLSearchParams(window.location.search)

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const mode = params.get('mode') || 'hot'
const val = params.get('val')
const filterSet = new Set(['val'])

export const settingsMap = {
  noGifs: {
    smallScreensOnly: false,
    title: 'No gifs (the slow, old file format)',
    callback: (f: boolean, store: AppState) => {
      store.setNoGifs(f)
    },
  },
  redGifsOnly: {
    smallScreensOnly: false,
    title: 'RedGifs only',
    callback: (f: boolean, store: AppState) => {
      store.setRedGifsOnly(f)
    },
  },
  hideButtons: {
    smallScreensOnly: false,
    title: 'Hide card Buttons',
    callback: (f: boolean, store: AppState) => {
      store.setHideButtons(f)
    },
  },
  dedupe: {
    smallScreensOnly: false,
    title: 'De-duplicate posts',
    callback: (f: boolean, store: AppState) => {
      store.setDedupe(f)
    },
  },
  skipPinned: {
    smallScreensOnly: false,
    title: 'Skip pinned posts',
    callback: (f: boolean, store: AppState) => {
      store.setSkipPinned(f)
    },
  },
  fullscreen: {
    smallScreensOnly: false,
    title: 'Fullscreen',
    callback: (f: boolean, store: AppState) => {
      store.setFullscreen(f)
    },
  },
  headerOnBottomOfScreen: {
    smallScreensOnly: true,
    title: 'Put header on bottom of screen (mobile only)',
    callback: (f: boolean, store: AppState) => {
      store.setHeaderOnBottomOfScreen(f)
    },
  },
} as const

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      blocked: [],
      currentlyOpenDialog: undefined,
      sidebarOpen: false,
      isFullscreen: false,
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
      mode,
      val: `${val}`,
      favorites: [],
      setCurrentlyOpenDialog: arg => {
        set(() => ({ currentlyOpenDialog: arg }))
      },
      setSidebarOpen: arg => {
        set(() => ({ sidebarOpen: arg }))
      },
      toggleSidebarOpen: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }))
      },
      setIsFullscreen: arg => {
        set(() => ({ isFullscreen: arg }))
      },
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

      createList: ({
        subreddits,
        listName,
      }: {
        subreddits: string[]
        listName: string
      }) => {
        set(state => ({
          lists: [...state.lists, { name: listName, subreddits }],
        }))
      },

      addToList: ({
        subreddit,
        listName,
      }: {
        subreddit: string
        listName: string
      }) => {
        set(state => ({
          lists: state.lists.map(list => {
            return list.name === listName
              ? { ...list, subreddits: [...list.subreddits, subreddit] }
              : list
          }),
        }))
      },
      removeFromRecentlyVisited: (name: string) => {
        set(state => ({
          recentlyVisited: state.recentlyVisited.filter(f => f !== name),
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
      setMode: mode => {
        set(() => ({
          mode,
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
            s === undefined || state.recentlyVisited.includes(s)
              ? state.recentlyVisited
              : state.recentlyVisited.length > MAX_RECENTLY_VISITED
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
            state.val = val || state.defaultPage || ''
          }
        }
      },
    },
  ),
)
