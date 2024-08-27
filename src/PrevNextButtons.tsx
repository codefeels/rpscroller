import Button from './Button'
import { useAppStore } from './store'
import type { Data } from './util'

export default function PrevNextButtons({ data }: { data: Data }) {
  const store = useAppStore()
  const { prev } = store
  return (
    <div className="flex justify-center m-10">
      <Button
        disabled={!prev}
        onClick={() => {
          store.setPage(prev ?? '')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Prev
      </Button>
      <Button
        disabled={!data.after}
        onClick={() => {
          store.setPage(data.after ?? '')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Next
      </Button>
    </div>
  )
}
