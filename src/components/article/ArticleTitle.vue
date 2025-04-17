<template>
  <h1 :class="cn('text-3xl/[1.25] md:text-4xl/[1.25] xl:text-5xl/[1.25] font-medium font-serif', props.class)">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/className'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
