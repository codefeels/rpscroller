import { create } from 'zustand'
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
  favs: string[]
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

const defaultPage = getString('defaultPage', '/r/funny')
const { mode = 'hot', val = defaultPage } = queryString.parse(
  window.location.search,
)

export function getBool(key: string, def = false): boolean {
  try {
    return JSON.parse(
      localStorage.getItem(key) ?? JSON.stringify(def),
    ) as boolean
  } catch (error) {
    console.error('key:', key, error)
    return def
  }
}

export function setBool(key: string, val: boolean) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function setString(key: string, val: string) {
  localStorage.setItem(key, val)
}

export function getString(key: string, def = ''): string {
  try {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return localStorage.getItem(key) || def
  } catch (error) {
    console.error(error)
    return def
  }
}

export function getStringArray(key: string, def = [] as string[]): string[] {
  try {
    return JSON.parse(
      localStorage.getItem(key) ?? JSON.stringify(def),
    ) as string[]
  } catch (error) {
    console.error(error)
    return def
  }
}

export function setStringArray(key: string, val: string[]) {
  return localStorage.setItem(key, JSON.stringify(val))
}

export const useAppStore = create<AppState>()(set => ({
  defaultPage,
  infiniteScroll: getBool('infiniteScroll'),
  noGifs: getBool('noGifs'),
  fullscreen: getBool('fullscreen'),
  redGifsOnly: getBool('redGifsOnly'),
  hideButtons: getBool('hideButtons'),
  skipPinned: getBool('skipPinned'),
  dedupe: getBool('dedupe'),
  confirmed: getBool('confirmed'),
  mode: `${mode as string}`,
  page: undefined as string | undefined,
  prev: undefined as string | undefined,
  val: val as string,
  favs: getStringArray('favorites', [
    'r/funny',
    'r/midriff+gonemild',
    'r/gonewild',
  ]),
  setInfiniteScroll: flag => set(() => ({ infiniteScroll: flag })),
  setConfirmed: flag => set(() => ({ confirmed: flag })),
  setNoGifs: flag => set(() => ({ noGifs: flag })),
  setDedupe: flag => set(() => ({ dedupe: flag })),
  setFullscreen: flag => set(() => ({ fullscreen: flag })),
  setSkipPinned: flag => set(() => ({ skipPinned: flag })),
  setHideButtons: flag => set(() => ({ hideButtons: flag })),
  setRedGifsOnly: flag => set(() => ({ redGifsOnly: flag })),
  setPage: page => set(store => ({ page, prev: store.page })),
  setMode: mode => set(() => ({ mode, page: undefined, prev: undefined })),
  setDefaultPage: defaultPage => set(() => ({ defaultPage })),
  setVal: val => {
    const s = val?.replace('u/', 'user/')
    return set(() => ({ val: s, page: undefined, prev: undefined }))
  },
  addFavorite: val => {
    const s = val.replace('u/', 'user/')
    return set(state => ({
      favs: state.favs.includes(s) ? state.favs : [...state.favs, s],
    }))
  },
  removeFavorite: val =>
    set(state => ({ favs: state.favs.filter(f => f !== val) })),
}))
