<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href?.toLowerCase()"
    :class="cn([
      'inline-block bg-indigo-600 text-white font-normal rounded-full transition-colors',
      large ? 'px-4 py-1 text-lg duration-150' : 'px-2.5 py-0.5 text-xs duration-100',
      href ? 'hover:bg-yellow-300 hover:text-yellow-800' : '',
      props.class,
    ])"
  >
    <span v-if="type === 'tag'"># </span>
    <TablerLayoutGridFilled v-else-if="type === 'category'" class="inline-block mr-1" />
    <span>{{ name }}</span>
    <span v-if="count"> ({{ count }})</span>
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/className'

const props = withDefaults(defineProps<{
  name: string
  type?: 'tag' | 'category'
  href?: string
  count?: number
  large?: boolean
  class?: HTMLAttributes['class']
}>(), {
  type: 'tag',
  count: 0,
  large: false,
})
</script>
