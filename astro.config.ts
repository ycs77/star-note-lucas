import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: vercel(),
  integrations: [
    vue(),
    mdx(),
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
      icons(),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight',
      // langAlias: {
      //   cjs: 'javascript',
      // },
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
})
