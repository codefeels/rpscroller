import { useEffect, useState } from 'react'
import { hasFavorite, useAppStore } from './store'
import { MdFavorite } from 'react-icons/md'

export default function SearchBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <div className="m-2">
      <form
        onSubmit={event => {
          event.preventDefault()
          store.setVal(text)
        }}
      >
        <label htmlFor="box">Reddit:</label>
        <input
          id="box"
          type="text"
          value={text}
          onChange={event => {
            setText(event.target.value)
          }}
        />
        <button type="submit">Submit</button>
        {hasFavorite(text, store.favorites) ? null : (
          <button
            onClick={() => {
              store.addFavorite(text)
            }}
          >
            Add to favorites <MdFavorite />
          </button>
        )}
      </form>
    </div>
  )
}
