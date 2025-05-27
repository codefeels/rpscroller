import { Link } from 'react-router-dom'
import flame from './favicon.svg'

export default function Logo() {
  return (
    <>
      <Link to="/">rpscroller</Link>
      <img className="h-8 inline" src={flame} alt="app icon" />
    </>
  )
}
