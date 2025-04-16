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
  title: string
  href: string
  icon: FunctionalComponent<SVGAttributes>
}

export const socialLinks = [
  {
    title: 'GitHub',
    href: siteConfig.github,
    icon: TablerBrandGithub,
  },
  {
    title: 'Bluesky',
    href: siteConfig.bluesky,
    icon: TablerBrandBluesky,
  },
  {
    title: 'Discord',
    href: siteConfig.discord,
    icon: TablerBrandDiscord,
  },
  {
    title: 'Facebook',
    href: siteConfig.facebook,
    icon: MingcuteFacebookLine,
  },
  {
    title: 'RSS',
    href: siteConfig.rss,
    icon: TablerRss,
  },
] satisfies SocialLink[] as SocialLink[]
