import type { APIRoute } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import vueRenderer from '@astrojs/vue/server.js'
import mdxRenderer from '@astrojs/mdx/server.js'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import { getCollection, render } from 'astro:content'
import siteConfig from '@/site.config'
import { parsePostSlug } from '@/utils/slug'

export const GET: APIRoute = async context => {
  const baseUrl = (context.site?.href || '').replace(/\/$/, '')

  const posts = await getCollection('posts')
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  const container = await AstroContainer.create()
  // @ts-ignore
  container.addServerRenderer({ renderer: vueRenderer })
  // @ts-ignore
  container.addServerRenderer({ renderer: mdxRenderer })
  container.addClientRenderer({
    name: '@astrojs/vue',
    entrypoint: '@astrojs/vue/client.js',
  })

  const items: RSSFeedItem[] = []

  for (const post of posts) {
    const { Content } = await render(post)
    const html = await container.renderToString(Content)
    const sanitizedHtml = sanitizeArticleHtml(html, baseUrl)

    items.push({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${parsePostSlug(post.id).slug}/`,
      content: sanitizedHtml,
    })
  }

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    trailingSlash: false,
    items,
    // (optional) inject custom xml
    customData: `<language>zh-TW</language>`,
  });
}

// Sanitize HTML
// Also make sure that relative links are converted to absolute links.
//
// Reference: https://github.com/withastro/roadmap/discussions/419#discussioncomment-11488764
function sanitizeArticleHtml(html: string, baseUrl: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.href && {
            href: attribs.href.startsWith('/')
              ? baseUrl + attribs.href
              : attribs.href,
          }),
        },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.src && {
            src: attribs.src.startsWith('/')
              ? baseUrl + attribs.src
              : attribs.src,
          }),
          ...(attribs.href && {
            href: attribs.href.startsWith('/')
              ? baseUrl + attribs.href
              : attribs.href,
          }),
        },
      }),
    },
  })
}
