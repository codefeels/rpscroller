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
      <div className="mt-5">
        <div className="font-extrabold">
          rpscroller <img className="h-8 inline" src={flame} alt="app icon" />
        </div>

        <div className="mt-5">
          If you have any bugs or suggestions send a issue to the repo
        </div>
        <div className="mt-5">
          Don&apos;t scroll too hard, you only get about 100 requests per minute
          and I&apos;m not using the authenticated API
        </div>
        <div className="mt-5">
          By using this app, you agree to{' '}
          <Link href="https://www.redditinc.com/policies">
            Reddit&apos;s user agreement
          </Link>
        </div>
        <div className="mt-5">
          <Link href="https://github.com/codefeels/rpscroller?tab=readme-ov-file">
            Source code
          </Link>
        </div>
      </div>
    </BaseDialog>
  )
}
