import { encode } from 'blurhash'
import { getPixels } from '@unpic/pixels'

const blurhashMap = new Map<string, string>()

export async function getBlurhash(src: string) {
  if (blurhashMap.has(src)) {
    return blurhashMap.get(src)!
  }

  const imgData = await getPixels(src)
  const data = Uint8ClampedArray.from(imgData.data)
  const blurhash = encode(data, imgData.width, imgData.height, 4, 4)
  blurhashMap.set(src, blurhash)
  return blurhash
}
