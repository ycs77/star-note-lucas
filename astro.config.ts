import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: vercel(),
})
