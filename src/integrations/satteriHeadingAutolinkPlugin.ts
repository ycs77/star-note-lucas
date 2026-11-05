import { defineHastPlugin } from 'satteri'

export function satteriHeadingAutolinkPlugin() {
  return defineHastPlugin({
    name: 'satteri-heading-autolink',
    element: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      visit(node, ctx) {
        const id = node.properties.id
        if (typeof id !== 'string' || !id) return

        ctx.prependChild(node, {
          type: 'element',
          tagName: 'a',
          properties: { href: `#${id}`, ariaHidden: 'true', tabIndex: -1 },
          children: [{
            type: 'element',
            tagName: 'span',
            properties: { className: ['icon', 'icon-link'] },
            children: [],
          }],
        })
      },
    },
  })
}
