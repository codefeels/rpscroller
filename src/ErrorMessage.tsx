export default function ErrorMessage({ error }: { error: unknown }) {
  return (
    <div className="text-red-600 m-20">
      <div>{`${error}`}</div>
      <div>
        {`${error}` ===
        'TypeError: NetworkError when attempting to fetch resource.'
          ? "If you are on firefox then you can disable 'Enhanced Tracking Protection' (at your own risk) to fix this error"
          : ''}{' '}
      </div>
    </div>
  )
}
