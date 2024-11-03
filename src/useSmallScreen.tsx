import { useMediaQuery } from 'usehooks-ts'
export function useSmallScreen() {
  const matches = useMediaQuery('(min-width: 768px)')
  return !matches
}
