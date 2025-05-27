import BaseDialog from './BaseDialog'
import Link from './Link'
import flame from './favicon.svg'

export default function AboutDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <div className="mt-5 flex flex-col gap-6">
        <div className="font-extrabold">
          rpscroller <img className="h-8 inline" src={flame} alt="app icon" />
        </div>

        <div>If you have any bugs or suggestions send a issue to the repo</div>
        <div>
          Don&apos;t scroll too hard, you only get about 100 requests per minute
          and I&apos;m not using the authenticated API
        </div>
        <div>
          By using this app, you agree to{' '}
          <Link href="https://www.redditinc.com/policies">
            Reddit&apos;s user agreement
          </Link>
        </div>
        <div>
          Similar reddit data from{' '}
          <a href="https://github.com/anvaka/map-of-reddit-data">
            https://github.com/anvaka/map-of-reddit-data
          </a>
        </div>
        <div>
          Contact/Report issues/Source code:{' '}
          <Link href="https://github.com/codefeels/rpscroller?tab=readme-ov-file">
            GitHub
          </Link>
        </div>
      </div>
    </BaseDialog>
  )
}
