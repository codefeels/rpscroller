import { useEffect, useState } from 'react'

import { MdFavorite } from 'react-icons/md'

import ButtonM1 from './ButtonM1'
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
      <div className="flex">
        <input
          id="box"
          type="text"
          tabIndex={0}
          className="input m-1"
          value={text}
          onChange={event => {
            setText(event.target.value)
          }}
        />
        <ButtonM1 type="submit">Submit</ButtonM1>
        {hasFavorite(text, store.favorites) ? null : (
          <ButtonM1
            onClick={() => {
              store.addFavorite(text)
            }}
          >
            <MdFavorite className="inline" />
          </ButtonM1>
        )}
      </div>
    </form>
  )
}
