import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import icons from 'unplugin-icons/vite'
import { expressiveCodeOutputPlugin } from './src/integrations/expressiveCodeOutputPlugin'
import { satteriHeadingAutolinkPlugin } from './src/integrations/satteriHeadingAutolinkPlugin'

const markdownProcessor = satteri({
  hastPlugins: [
    satteriHeadingIdsPlugin(),
    satteriHeadingAutolinkPlugin(),
  ],
})

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
      plugins: [expressiveCodeOutputPlugin()],
    }),
    mdx({
      processor: markdownProcessor,
    }),
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
    processor: markdownProcessor,
  },
  devToolbar: {
    enabled: false,
  },
})
