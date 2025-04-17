import type { CollectionEntry } from 'astro:content'

export function preprocessPosts(posts: CollectionEntry<'posts'>[]) {
  let newPosts = posts.slice()

  // 過濾草稿
  if (import.meta.env.PROD) {
    newPosts = newPosts.filter(post => !post.data.draft)
  }

  // 依最新日期排序
  newPosts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  return newPosts
}
