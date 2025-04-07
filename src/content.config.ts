import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/data/posts',
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postsCollection,
}
