import { defineSiteConfig } from './utils/config'

export default defineSiteConfig({
  title: '星星的筆記．Lucas',
  description: 'Lucas Yang 的部落格 - 即使是一顆小星星 也會閃耀著光芒✨',

  author: 'Lucas Yang',

  nav: [
    { text: '程式', link: '/coding' },
    { text: 'ACG', link: '/acg' },
    { text: '生活', link: '/life' },
    { text: '專案', link: '/projects', match: '/projects' },
    { text: '關於', link: '/about' },
  ],

  facebook: 'https://star-note-lucas.me/fb',
  x: 'https://star-note-lucas.me/x',
  bluesky: 'https://star-note-lucas.me/bsky',
  github: 'https://star-note-lucas.me/github',
  discord: 'https://star-note-lucas.me/discord',
  rss: 'https://star-note-lucas.me/rss',
  email: 'yangchenshin77@gmail.com',
})
