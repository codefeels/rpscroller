import type { Favorite, Feed, RecentlyVisited } from './util'

export interface AppState {
  rerenderCount: number
  smallScreen: boolean
  noGifs: boolean
  redGifsOnly: boolean
  noRedGifs: boolean
  sidebarOpen: boolean
  blocked: string[]
  fullscreen: boolean
  defaultPage: string
  feeds: Feed[]
  isFullscreen: boolean
  headerOnBottomOfScreen: boolean
  recentlyVisited: RecentlyVisited[]
  mode: string
  favorites: Favorite[]
  val: string
  skipPinned: boolean
  dedupe: boolean
  hideButtons: boolean
  confirmed: boolean
  currentlyOpenDialog: string | undefined

  setSmallScreen: (arg: boolean) => void
  setCurrentlyOpenDialog: (arg: string | undefined) => void
  setSidebarOpen: (arg: boolean) => void
  toggleSidebarOpen: () => void

  // detect if something has put the app into fullscreen e.g. redgifs
  setIsFullscreen: (arg: boolean) => void

  // feeds
  createFeed: (arg: { subreddits: string[]; feedName: string }) => void
  updateFeed: (arg: { newFeed: Feed; feedName: string }) => void
  addToFeed: (arg: { subreddit: string; feedName: string }) => void
  removeFeed: (name: string) => void

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
  setNoGifs: (arg: boolean) => void
  setSkipPinned: (arg: boolean) => void
  setFullscreen: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
  setNoRedGifs: (arg: boolean) => void
  setMode: (arg?: string) => void
  setVal: (arg?: string) => void

  // favorites
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}
