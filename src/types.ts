export interface CardModel {
  id: string
  data: {
    title: string
    pubDate: Date
    description: string
    category: 'coding' | 'acg' | 'life'
    image?: string
    imageUnsplashAuthor?: {
      name: string
      username: string
    }
    tags?: string[]
    draft?: boolean
  }
}
