import { useState } from 'react'
import { useAppStore } from './store'

export default function Favorites() {
  const store = useAppStore()
  const { favs } = store
  const [multi, setMulti] = useState<string[]>([])
  const [makeMultiReddit, setMakeMultiReddit] = useState(false)
  const [showUsers, setShowUsers] = useState(true)
  const [showSubreddits, setShowSubreddits] = useState(true)
  const multiVal = `/r/${multi.join('+')}`
  return (
    <div className="lg:m-10">
      <h4>
        Favorites{' '}
        <span>
          <button onClick={() => setMakeMultiReddit(!makeMultiReddit)}>
            {makeMultiReddit ? 'Hide multi-reddit maker' : 'Make multi-reddit?'}
          </button>
          {makeMultiReddit ? (
            <div>
              <label htmlFor="multireddit">Multi-reddit</label>
              <input id="multireddit" readOnly type="text" value={multiVal} />
              <button onClick={() => store.setVal(multiVal)}>Submit</button>
              <button onClick={() => setMulti([])}>Clear</button>
            </div>
          ) : null}
          <label htmlFor="reddits">Show subreddits</label>
          <input
            id="reddits"
            type="checkbox"
            checked={showSubreddits}
            onChange={event => setShowSubreddits(event.target.checked)}
          />
          <label htmlFor="users">Show users</label>
          <input
            id="users"
            type="checkbox"
            checked={showUsers}
            onChange={event => setShowUsers(event.target.checked)}
          />
        </span>
      </h4>
      <table>
        <tbody>
          {showSubreddits
            ? favs
                .map(f => f.replace(/^\//, ''))
                .filter(
                  f =>
                    !(
                      f.startsWith('u/') ||
                      f.startsWith('user/') ||
                      f.startsWith('u_')
                    ),
                )
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map(f => (
                  <tr key={f}>
                    <td>
                      <button onClick={() => store.setVal(f)}>{f}</button>
                    </td>
                    <td>
                      <button onClick={() => store.removeFavorite(f)}>
                        Remove
                      </button>
                    </td>
                    {makeMultiReddit ? (
                      <td>
                        <button
                          onClick={() =>
                            setMulti([
                              ...multi,
                              f.replace('user/', 'u_').replace('r/', ''),
                            ])
                          }
                        >
                          Add to multi
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
            : null}
          {showUsers
            ? favs
                .map(f => f.replace(/^\//, ''))
                .filter(
                  f =>
                    f.startsWith('u/') ||
                    f.startsWith('user/') ||
                    f.startsWith('u_'),
                )
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map(f => (
                  <tr key={f}>
                    <td>
                      <button onClick={() => store.setVal(f)}>{f}</button>
                    </td>
                    <td>
                      <button onClick={() => store.removeFavorite(f)}>
                        Remove
                      </button>
                    </td>
                    {makeMultiReddit ? (
                      <td>
                        <button
                          onClick={() =>
                            setMulti([
                              ...multi,
                              f.replace('user/', 'u_').replace('r/', ''),
                            ])
                          }
                        >
                          Add to multi
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
