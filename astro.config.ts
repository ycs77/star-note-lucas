import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
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
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      components({
        resolvers: [
          IconsResolver({ prefix: '' }),
        ],
        dts: 'src/shims/components.d.ts',
      }),
      icons({
        compiler: 'vue3',
      }),
    ],
    ssr: {
      external: ['astro/container', '@astrojs/mdx'],
    },
  },
  markdown: {
    // shikiConfig: {
    //   theme: 'material-theme-palenight',
    //   // langAlias: {
    //   //   cjs: 'javascript',
    //   // },
    // },
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
})
