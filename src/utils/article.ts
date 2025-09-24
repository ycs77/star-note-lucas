import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import vueRenderer from '@astrojs/vue/server.js'
import mdxRenderer from '@astrojs/mdx/server.js'
import { render } from 'astro:content'
import type { CollectionEntry, CollectionKey } from 'astro:content'
import { convert } from 'html-to-text'

const DEFAULT_POST_TRUNCATE = 120

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

export async function createExcerpt<C extends CollectionKey>(options: {
  container: AstroContainer
  post: CollectionEntry<C>
  Content?: AstroComponentFactory
  truncate?: number
}): Promise<string> {
  const { container, post, truncate = DEFAULT_POST_TRUNCATE } = options

  const Content = options.Content || (await render(post)).Content
  const html = await container.renderToString(Content)
  if (!html) {
    return ''
  }

  const convertOptions = {
    wordwrap: null,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'figure', format: 'skip' },
    ],
  }
  // 為了要徹底清除標籤，原因可參考：
  // https://chenhuijing.com/blog/creating-excerpts-in-astro/
  const text = convert(html, convertOptions)
  const distilled = convert(text, convertOptions).substring(0, truncate)
  return distilled + (text.length > truncate ? '...' : '')
}

export async function loadPostsExcerpt<C extends CollectionKey>(
  container: AstroContainer,
  posts: CollectionEntry<C>[],
  truncate?: number,
): Promise<(CollectionEntry<C> & { excerpt: string })[]> {
  const postsWithExcerpt = await Promise.all(
    posts.map(async post => {
      const excerpt = await createExcerpt<C>({ container, post, truncate })
      return { ...post, excerpt }
    })
  )
  return postsWithExcerpt
}
