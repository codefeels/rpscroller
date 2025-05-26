import flame from './favicon.svg'

export default function Logo() {
  return (
    <>
      <a href="/">rpscroller</a>
      <img className="h-8 inline" src={flame} alt="app icon" />
    </>
  )
}
