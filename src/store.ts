import { create } from 'zustand'

interface AppState {
  noGifs: boolean
  redGifsOnly: boolean
  setNoGifs: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
}

export const useAppStore = create<AppState>()(set => ({
  noGifs: true,
  redGifsOnly: false,
  setNoGifs: flag => set(() => ({ noGifs: flag })),
  setRedGifsOnly: flag => set(() => ({ redGifsOnly: flag })),
}))
