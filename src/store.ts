import { create } from 'zustand'
import queryString from 'querystring'

interface AppState {
  noGifs: boolean
  fullscreen: boolean
  redGifsOnly: boolean
  page?: string
  val: string
  setFullscreen: (arg: boolean) => void
  setNoGifs: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
  setPage: (arg?: string) => void
  setVal: (arg?: string) => void
}

const {
  noGifs,
  redGifsOnly,
  fullscreen,
  page,
  val = '/r/nsfw',
} = queryString.parse(window.location.search)

export const useAppStore = create<AppState>()(set => ({
  noGifs: !!noGifs,
  redGifsOnly: !!redGifsOnly,
  fullscreen: !!fullscreen,
  page: page as string | undefined,
  val: val as string,
  setFullscreen: flag => set(() => ({ fullscreen: flag })),
  setNoGifs: flag => set(() => ({ noGifs: flag })),
  setRedGifsOnly: flag => set(() => ({ redGifsOnly: flag })),
  setPage: page => set(() => ({ page })),
  setVal: val => set(() => ({ val })),
}))
