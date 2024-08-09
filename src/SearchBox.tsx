import { useEffect, useState } from 'react'
import { useAppStore } from './store'

export default function SearchBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <div>
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
          onChange={event => setText(event.target.value)}
        />
        <button type="submit">Submit</button>
        <button
          onClick={event => {
            event.preventDefault() // not sure why but otherwise does onSubmit
            store.addFavorite(text)
          }}
        >
          Add to favs
        </button>
      </form>
    </div>
  )
}
