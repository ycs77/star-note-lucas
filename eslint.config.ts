import ycs77, { GLOB_VUE } from '@ycs77/eslint-config'

export default ycs77({
  astro: true,
  typescript: true,
  vue: true,
})
  .append({
    files: [GLOB_VUE],
    rules: {
      'vue/no-undef-components': ['error'],
    },
  })
