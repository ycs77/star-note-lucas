import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: vercel(),
  integrations: [vue()],
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
})
