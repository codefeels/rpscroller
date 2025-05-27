export function getFeedKey(url: string) {
  return (
    pageIndex: number,
    previousPageData?: {
      after?: string
    },
  ) => {
    // reached the end
    if (previousPageData && !previousPageData.after) {
      return null
    }

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `${url}${url.includes('?') ? '&' : '?'}limit=25`
    }

    // add the cursor to the API endpoint
    return `${url}${url.includes('?') ? '&' : '?'}after=${previousPageData?.after}&limit=25`
  }
}
