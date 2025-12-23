import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export async function getPostCollection(
  transform?: (posts: CollectionEntry<'posts'>[]) => CollectionEntry<'posts'>[]
): Promise<CollectionEntry<'posts'>[]> {
  let posts = await getCollection('posts')

  // 過濾草稿
  if (import.meta.env.PROD) {
    posts = posts.filter(post => !post.data.draft)
  }

  // 依最新日期排序
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  // 處理文章集合
  if (transform) {
    posts = transform(posts)
  }

  return posts
}
