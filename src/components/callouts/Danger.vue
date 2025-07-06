<template>
  <Callout
    :title="title"
    class="bg-red-900 text-white border-red-400"
    main-class="text-red-400"
  >
    <template #icon="{ iconClass }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :class="iconClass">
        <path d="M12 12s-5.6 4.6-3.6 8c1.6 2.6 5.7 2.7 7.2 0 2-3.7-3.6-8-3.6-8Z" />
        <path d="M13.004 2 8.5 9 6.001 6s-4.268 7.206-1.629 11.8c3.016 5.5 11.964 5.7 15.08 0C23.876 10 13.004 2 13.004 2Z" />
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
  title: 'Danger',
})
</script>
