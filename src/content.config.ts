import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.string().optional(),
    imageUnsplashAuthor: z.object({
      name: z.string(),
      username: z.string(),
    }).optional(),
    showImage: z.boolean().optional(),
    category: z.enum(['coding', 'acg', 'life']),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postsCollection,
}
