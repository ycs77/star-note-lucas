import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import expressiveCode from 'astro-expressive-code'
import { pluginCodeOutput } from '@fujocoded/expressive-code-output'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  site: 'https://star-note-lucas.me',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  adapter: vercel(),
  integrations: [
    vue(),
    expressiveCode({
      themes: ['night-owl'],
      plugins: [pluginCodeOutput()],
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: 'vue3',
      }),
    ],
    ssr: {
      external: ['astro/container', '@astrojs/mdx'],
    },
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
})
