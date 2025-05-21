import { useEffect, useState } from 'react'

import { MdFavorite } from 'react-icons/md'

import Button from './Button'
import { useAppStore } from './store'
import { hasFavorite } from './util'

export default function SearchBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <form
      className="inline"
      onSubmit={event => {
        event.preventDefault()
        store.setVal(text)
      }}
    >
      <label htmlFor="box">Search: </label>
      <input
        id="box"
        type="text"
        tabIndex={0}
        className="rounded-sm"
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
          <MdFavorite className="inline" />
        </Button>
      )}
    </form>
  )
}
