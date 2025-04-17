import type { FunctionalComponent, SVGAttributes } from 'vue'
import siteConfig from '@/site.config'
import TablerBrandGithub from '~icons/tabler/brand-github'
import TablerBrandBluesky from '~icons/tabler/brand-bluesky'
import TablerBrandDiscord from '~icons/tabler/brand-discord'
import MingcuteFacebookLine from '~icons/mingcute/facebook-line'
import TablerRss from '~icons/tabler/rss'

export interface NavItem {
  text: string
  link: string
  match?: string
}

export const nav = [
  { text: '文章', link: '/posts', match: '/posts' },
  { text: '專案', link: '/projects', match: '/projects' },
  { text: '關於', link: '/about' },
] satisfies NavItem[] as NavItem[]

export interface SocialLink {
  name: string
  label?: string
  href?: string
  notes?: string
  icon: FunctionalComponent<SVGAttributes>
}

export const socialLinks = [
  {
    name: 'GitHub',
    label: '@ycs77',
    href: siteConfig.github,
    icon: TablerBrandGithub,
  },
  {
    name: 'Bluesky',
    label: '@ycs77.star-note-lucas.me',
    href: siteConfig.bluesky,
    icon: TablerBrandBluesky,
  },
  {
    name: 'Discord',
    label: '✨星星の聊天室',
    href: siteConfig.discord,
    icon: TablerBrandDiscord,
  },
  {
    name: 'Facebook',
    label: '星星的筆記．Lucas',
    href: siteConfig.facebook,
    icon: MingcuteFacebookLine,
  },
  {
    name: 'RSS',
    href: siteConfig.rss,
    icon: TablerRss,
  },
] satisfies SocialLink[] as SocialLink[]
