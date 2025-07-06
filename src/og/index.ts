import fs from 'node:fs/promises'
import path from 'node:path'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import satori from 'satori'
import type { Font } from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'
import tailwindConfig from './tailwind.config'
import { fetchFont, getCJKCharacters } from './font'
import defaultTemplate from '../content/og/default.astro'

const width = 1200
const height = 630

export async function getOGImage({ title, template }: {
  title: string
  template: AstroComponentFactory | undefined
}) {
  const container = await AstroContainer.create()
  const htmlTemplate = await container.renderToString(template || defaultTemplate, {
    props: {
      title,
    },
  })

  const fonts: Font[] = []

  const [
    inter100Font,
    inter300Font,
    inter700Font,
  ] = await Promise.all([
    fs.readFile(path.resolve(process.cwd(), 'src/assets/fonts/inter-latin-100-normal.woff')),
    fs.readFile(path.resolve(process.cwd(), 'src/assets/fonts/inter-latin-300-normal.woff')),
    fs.readFile(path.resolve(process.cwd(), 'src/assets/fonts/inter-latin-700-normal.woff')),
  ])

  fonts.push({
    name: 'Inter Latin',
    data: inter100Font,
    weight: 100,
    style: 'normal',
  })
  fonts.push({
    name: 'Inter Latin',
    data: inter300Font,
    weight: 300,
    style: 'normal',
  })
  fonts.push({
    name: 'Inter Latin',
    data: inter700Font,
    weight: 700,
    style: 'normal',
  })

  const cjkChars = getCJKCharacters(htmlTemplate)
  if (cjkChars) {
    const [
      notoSansTc100Font,
      notoSansTc300Font,
      notoSansTc700Font,
    ] = await Promise.all([
      fetchFont(cjkChars, 'Noto+Sans+TC:wght@100'),
      fetchFont(cjkChars, 'Noto+Sans+TC:wght@300'),
      fetchFont(cjkChars, 'Noto+Sans+TC:wght@700'),
    ])

    fonts.push({
      name: 'Noto Sans TC',
      data: notoSansTc100Font,
      weight: 100,
      style: 'normal',
    })
    fonts.push({
      name: 'Noto Sans TC',
      data: notoSansTc300Font,
      weight: 300,
      style: 'normal',
    })
    fonts.push({
      name: 'Noto Sans TC',
      data: notoSansTc700Font,
      weight: 700,
      style: 'normal',
    })
  }

  const svg = await satori(html(htmlTemplate), {
    width,
    height,
    fonts,
    tailwindConfig,
  })

  const jpegBuffer = await sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 100 })
    .toBuffer()
  return jpegBuffer
}

export async function getOGImageHtml({ title, template }: {
  title: string
  template: AstroComponentFactory | undefined
}) {
  const container = await AstroContainer.create()
  const html = await container.renderToString(template || defaultTemplate, {
    props: {
      title,
    },
  })
  return {
    width,
    height,
    html,
    tailwindConfig,
  }
}
