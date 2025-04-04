import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: vercel(),
  integrations: [vue()],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
