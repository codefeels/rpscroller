import { useMediaQuery } from 'usehooks-ts'

export function useIsSmallScreen() {
  const matches = useMediaQuery('(min-width: 768px)')
  return !matches
}
