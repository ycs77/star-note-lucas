import type { CategoryItem } from '@/types'

export type CategoriesMap<Key extends string> = Record<Key, CategoryItem>

export function defineCategoriesMap<Key extends string>(categoriesMap: Record<Key, CategoryItem>) {
  return categoriesMap
}
