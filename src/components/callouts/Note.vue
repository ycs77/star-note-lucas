<template>
  <Callout
    :title="title"
    class="bg-indigo-800 text-white border-indigo-400"
    main-class="text-indigo-400"
  >
    <template #icon="{ iconClass }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :class="iconClass">
        <path d="M12 8h.01M12 12v4"/>
        <circle cx="12" cy="12" r="10"/>
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
  title: 'Info',
})
</script>
