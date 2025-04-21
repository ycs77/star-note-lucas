import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import satori, { type Font } from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'
import tailwindConfig from './tailwindConfig'
import defaultTemplate from '../content/og/default.astro'

export async function getOGImage({ title, template }: {
  title: string
  template: AstroComponentFactory | undefined
}) {
  const width = 1200
  const height = 630

  const fontFile = await fetch('https://og-playground.vercel.app/inter-latin-ext-700-normal.woff')
  const fontData = await fontFile.arrayBuffer()
  const fonts = [
    {
      name: 'Inter Latin',
      data: fontData,
      style: 'normal',
    },
  ] satisfies Font[] as Font[]

  const container = await AstroContainer.create()
  const htmlTemplate = await container.renderToString(template || defaultTemplate, {
    props: {
      title,
    },
  })

  const svg = await satori(html(htmlTemplate), {
    width,
    height,
    fonts,
    tailwindConfig,
  })

  const jpegBuffer = await sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 80 })
    .toBuffer()
  return jpegBuffer
}
