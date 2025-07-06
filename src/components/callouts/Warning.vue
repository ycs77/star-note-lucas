<template>
  <Callout
    :title="title"
    class="bg-yellow-900 text-white border-yellow-500"
    main-class="text-yellow-500"
  >
    <template #icon="{ iconClass }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :class="iconClass">
        <path d="M12 9v4m0 4h.01M8.681 4.082C9.351 2.797 10.621 2 12 2s2.649.797 3.319 2.082l6.203 11.904a4.28 4.28 0 0 1-.046 4.019C20.793 21.241 19.549 22 18.203 22H5.797c-1.346 0-2.59-.759-3.273-1.995a4.28 4.28 0 0 1-.046-4.019L8.681 4.082Z" />
      </svg>
    </template>

    <slot />
  </Callout>
</template>

<script setup lang="ts">
import Callout from './Callout.vue'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Warning',
})
</script>
