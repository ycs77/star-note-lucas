import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import vueRenderer from '@astrojs/vue/server.js'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import defaultTemplate from '../content/og/default.astro'

const width = 1200
const height = 630

export async function getOGImageHtml({ title, template }: {
  title: string
  template: AstroComponentFactory | undefined
}) {
  const container = await AstroContainer.create()

  container.addServerRenderer({ renderer: vueRenderer })

  const html = await container.renderToString(template || defaultTemplate, {
    props: {
      title,
    },
  })

  return {
    width,
    height,
    html,
  }
}
