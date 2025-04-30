import type { FunctionalComponent, SVGAttributes } from 'vue'
import { categoriesMap } from '@/category'

export interface UserSiteConfig {
  title: string
  description: string

  author: string

  nav: NavItem[]

  facebook: string
  x: string
  bluesky: string
  github: string
  discord: string
  rss: string
  email: string
}

export interface NavItem {
  text: string
  link: string
  match?: string
}

export interface SocialLink {
  name: string
  label?: string
  href?: string
  notes?: string
  icon: FunctionalComponent<SVGAttributes>
}

export interface CardModel {
  id: string
  data: {
    title: string
    pubDate?: Date
    description?: string
    category?: keyof typeof categoriesMap
    image?: string
    imageUnsplashAuthor?: {
      name: string
      username: string
    }
    tags?: string[]
    draft?: boolean
  }
}
