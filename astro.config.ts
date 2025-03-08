import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: vercel(),
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
