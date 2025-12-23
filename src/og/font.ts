export async function fetchFont(
  text: string,
  font: string
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  // console.log('css', css)

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource) {
    throw new Error('Fetch font failed: no resource found in CSS')
  }

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}

export function getCJKCharacters(text: string): string {
  const metches = text.match(/[\p{Script=Han}\u3000-\u303F\u30A0-\u30FF\uFF01-\uFF60\uFF61-\uFFDC\uFFE0-\uFFEF]/gu)
  if (!metches) return ''

  return Array.from(new Set(metches)).join('')
}
