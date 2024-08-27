import { useEffect, useState } from 'react'
import { hasFavorite, useAppStore } from './store'
import { MdFavorite } from 'react-icons/md'
import Button from './Button'

export default function SearchBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        store.setVal(text)
      }}
    >
      <div className="flex max-w-full">
        <input
          id="box"
          type="text"
          className="m-1 rounded"
          value={text}
          onChange={event => {
            setText(event.target.value)
          }}
        />
        <Button type="submit">Submit</Button>
        {hasFavorite(text, store.favorites) ? null : (
          <Button
            onClick={() => {
              store.addFavorite(text)
            }}
          >
            <MdFavorite />
          </Button>
        )}
      </div>
    </form>
  )
}
