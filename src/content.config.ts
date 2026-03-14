import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const posts = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
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

const talks = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/talks',
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
  }),
})

export const collections = { posts, talks }
