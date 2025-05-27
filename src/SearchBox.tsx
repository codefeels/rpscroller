import { useEffect, useState } from 'react'

import { MdFavorite } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import ButtonM1 from './ButtonM1'
import { useAppStore } from './store'
import { hasFavorite } from './util'

export default function SearchBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  const navigate = useNavigate()
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <form
      className="inline"
      onSubmit={event => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(text)
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
