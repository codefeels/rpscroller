import { useLocation } from 'react-router-dom'

import { normalizeSubreddit } from './util'

export function useCurrentPage(defaultPage: string) {
  const location = useLocation()
  return normalizeSubreddit(location.pathname.slice(1) || defaultPage)
}
