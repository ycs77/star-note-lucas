export function parsePostSlug(slug: string) {
  const m = slug.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-(.+)$/)
  if (m)
    return { date: `${m[1]}-${m[2]}-${m[3]}`, slug: m[4] }
  return { date: null, slug }
}
