<template>
  <Callout
    :title="title"
    class="bg-green-800 text-white border-green-400"
    main-class="text-green-400"
  >
    <template #icon="{ iconClass }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :class="iconClass">
        <path d="m8 12 2.7 2.7L16 9.3" />
        <circle cx="12" cy="12" r="10" />
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
  title: 'Tip',
})
</script>
