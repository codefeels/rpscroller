import { type Post, deduplicate } from './util'

export interface FilterStats {
  totalPosts: number
  commentTypeFiltered: number
  urlTypeFiltered: number
  gifFiltered: number
  redGifsOnlyFiltered: number
  noRedGifsFiltered: number
  pinnedFiltered: number
  blockedFiltered: number
  remainingPosts: number
}

export interface FilterOptions {
  noGifs: boolean
  blocked: string[]
  skipPinned: boolean
  dedupe: boolean
  noRedGifs: boolean
  redGifsOnly: boolean
}

export function filterPosts(
  posts: Post[],
  options: FilterOptions,
): { filteredPosts: Post[]; stats: FilterStats } {
  let result = posts
  const totalPosts = posts.length
  const stats: FilterStats = {
    totalPosts,
    commentTypeFiltered: 0,
    urlTypeFiltered: 0,
    gifFiltered: 0,
    redGifsOnlyFiltered: 0,
    noRedGifsFiltered: 0,
    pinnedFiltered: 0,
    blockedFiltered: 0,
    remainingPosts: 0,
  }

  // Filter out comments
  const afterCommentFilter = result.filter(post => !('comment_type' in post))
  stats.commentTypeFiltered = result.length - afterCommentFilter.length
  result = afterCommentFilter

  // Filter by URL type
  const afterUrlFilter = result.filter(
    ({ url }) =>
      url.includes('redgifs') ||
      url.endsWith('.jpg') ||
      url.endsWith('.webp') ||
      url.endsWith('.jpeg') ||
      url.endsWith('.png') ||
      url.endsWith('.gif') ||
      url.endsWith('.webp') ||
      url.startsWith('https://www.reddit.com/gallery'),
  )
  stats.urlTypeFiltered = result.length - afterUrlFilter.length
  result = afterUrlFilter

  // Filter GIFs if needed
  const afterGifFilter = result.filter(post =>
    options.noGifs ? !post.url.endsWith('.gif') : true,
  )
  stats.gifFiltered = result.length - afterGifFilter.length
  result = afterGifFilter

  // Filter for RedGifs only if needed
  const afterRedGifsOnlyFilter = result.filter(post =>
    options.redGifsOnly ? post.url.includes('redgifs') : true,
  )
  stats.redGifsOnlyFiltered = result.length - afterRedGifsOnlyFilter.length
  result = afterRedGifsOnlyFilter

  // Filter out RedGifs if needed
  const afterNoRedGifsFilter = result.filter(post =>
    options.noRedGifs ? !post.url.includes('redgifs') : true,
  )
  stats.noRedGifsFiltered = result.length - afterNoRedGifsFilter.length
  result = afterNoRedGifsFilter

  // Filter pinned posts if needed
  const afterPinnedFilter = result.filter(post =>
    options.skipPinned ? !post.pinned : true,
  )
  stats.pinnedFiltered = result.length - afterPinnedFilter.length
  result = afterPinnedFilter

  // Filter blocked authors
  const afterBlockedFilter = result.filter(
    post => !options.blocked.includes(post.author),
  )
  stats.blockedFiltered = result.length - afterBlockedFilter.length
  result = afterBlockedFilter

  if (options.dedupe) {
    result = deduplicate(result, post => post.url)
  }

  stats.remainingPosts = result.length

  return {
    filteredPosts: result,
    stats,
  }
}
