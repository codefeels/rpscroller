import { useLocation } from 'react-router-dom'

export function useCurrentPage(defaultPage: string) {
  const location = useLocation()
  return location.pathname.slice(1) || defaultPage
}
