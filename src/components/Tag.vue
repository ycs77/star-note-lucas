<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href?.toLowerCase()"
    :class="cn([
      'inline-block bg-yellow-400 text-yellow-800 rounded-full transition-colors',
      large ? 'px-6 py-1 text-lg duration-150' : 'px-3 py-0.5 text-sm duration-100',
      href ? 'hover:bg-yellow-300' : '',
      props.class,
    ])"
  >
    {{ name }}<span v-if="count"> ({{ count }})</span>
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/className'

const props = withDefaults(defineProps<{
  name: string
  href?: string
  count?: number
  large?: boolean
  class?: HTMLAttributes['class']
}>(), {
  count: 0,
  large: false,
})
</script>
