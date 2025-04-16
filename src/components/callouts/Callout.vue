<template>
  <div
    :class="cn([
      'my-[1.6em] md:my-[1.6666667em] p-4 border-l-4 rounded',
      props.class,
    ])"
  >
    <div :class="cn('flex items-center font-medium mb-2', mainClass)">
      <slot
        name="icon"
        :icon-class="cn('mr-2', mainClass)"
      />{{ title }}
    </div>
    <div
      :class="cn([
        'break-all [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
        contentClass,
      ])"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/className'

const props = defineProps<{
  title: string
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  mainClass?: HTMLAttributes['class']
}>()
</script>
