import type { APIRoute } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import type { CollectionEntry } from 'astro:content'
import { getOGImage } from '@/og'
import { getPostCollection } from '@/post'

interface Props {
  post: CollectionEntry<'posts'>
  template?: AstroComponentFactory
}

export async function getStaticPaths() {
  const posts = await getPostCollection()
  const templates = import.meta.glob('../../content/og/*.astro')
  const paths = await Promise.all(
    posts.map(async post => {
      const templatePath = `../../content/og/${post.id}.astro`
      const template: AstroComponentFactory | undefined = templates[templatePath]
        ? await templates[templatePath]().then((m: any) => m.default || m)
        : undefined
      return {
        params: { filename: post.id },
        props: { post, template },
      }
    })
  )
  return paths.filter(({ props }) => props.template)
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const post = props.post
  const image = await getOGImage({
    title: post.data.title,
    template: props.template,
  })

  return new Response(Buffer.from(image), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Length': image.length.toString(),
    },
  })
}
