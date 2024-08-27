import { useState } from 'react'
import { isUserSubreddit, normalizeSubreddit, useAppStore } from './store'

import { FaCartShopping } from 'react-icons/fa6'

export default function MakeMultiReddit() {
  const store = useAppStore()
  const { favorites } = store
  const [multi, setMulti] = useState<string[]>([])
  const multiVal = `/r/${multi.map(s => s.replace('r/', '')).join('+')}`
  return (
    <div className="lg:m-10">
      <h4>
        Make multi-reddit
        <div>
          <div>
            <input id="multireddit" readOnly type="text" value={multiVal} />
            <button
              onClick={() => {
                store.setVal(multiVal)
              }}
            >
              Submit
            </button>
            <button
              onClick={() => {
                setMulti([])
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </h4>
      <>
        <table>
          <tbody>
            {[
              ...favorites
                .filter(f => !isUserSubreddit(f))
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
              ...favorites
                .filter(f => isUserSubreddit(f))
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
            ].map(f => (
              <tr key={f}>
                <td>{f}</td>
                <td>
                  <button
                    disabled={multi.includes(f)}
                    onClick={() => {
                      setMulti([...multi, normalizeSubreddit(f)])
                    }}
                  >
                    <FaCartShopping className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  )
}
