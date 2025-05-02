import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import vueRenderer from '@astrojs/vue/server.js'
import mdxRenderer from '@astrojs/mdx/server.js'
import { render, type CollectionEntry } from 'astro:content'
import { convert } from 'html-to-text'

export async function createAstroContainerWithMdx() {
  const container = await AstroContainer.create()
  // @ts-ignore
  container.addServerRenderer({ renderer: vueRenderer })
  // @ts-ignore
  container.addServerRenderer({ renderer: mdxRenderer })
  container.addClientRenderer({
    name: '@astrojs/vue',
    entrypoint: '@astrojs/vue/client.js',
  })
  return container
}

export async function createExcerpt(container: AstroContainer, post: CollectionEntry<'posts'>, truncate = 200): Promise<string> {
  const { Content } = await render(post)
  const html = await container.renderToString(Content)
  if (!html) {
    return ''
  }

  const options = {
    wordwrap: null,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'figure', format: 'skip' },
    ],
  }
  // 為了要徹底清除標籤，原因可參考：
  // https://chenhuijing.com/blog/creating-excerpts-in-astro/
  const text = convert(html, options)
  const distilled = convert(text, options).substring(0, truncate)
  return distilled + (distilled.length > truncate ? '...' : '')
}

export async function loadPostsExcerpt<
  T extends CollectionEntry<'posts'> = CollectionEntry<'posts'>
>(container: AstroContainer, posts: T[], truncate?: number): Promise<
(T & { excerpt: string })[]> {
  const postsWithExcerpt = await Promise.all(
    posts.map(async post => {
      const excerpt = await createExcerpt(container, post, truncate)
      return { ...post, excerpt }
    })
  )
  return postsWithExcerpt
}
