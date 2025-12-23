import type { RSSFeedItem } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { render } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import { getPostCollection } from '@/post'
import siteConfig from '@/site.config'
import { createAstroContainerWithMdx } from '@/utils/article'
import { parsePostSlug } from '@/utils/slug'

export const GET: APIRoute = async context => {
  const baseUrl = (context.site?.href || '').replace(/\/$/, '')

  const container = await createAstroContainerWithMdx()
  const posts = await getPostCollection()

  const items: RSSFeedItem[] = []

  for (const post of posts) {
    const { Content } = await render(post)
    const html = await container.renderToString(Content)
    const sanitizedHtml = sanitizeArticleHtml(html, baseUrl)

    items.push({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${parsePostSlug(post).slug}/`,
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
  })
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
