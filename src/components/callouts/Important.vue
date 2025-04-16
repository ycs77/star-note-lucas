<template>
  <Callout
    :title="title"
    class="bg-purple-800 text-white border-purple-400"
    main-class="text-purple-400"
  >
    <template #icon="{ iconClass }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :class="iconClass">
        <path d="M12.5 7.5h.01m-.01 4v4m-7.926.685L2 21l6.136-1.949c1.307.606 2.791.949 4.364.949 5.243 0 9.5-3.809 9.5-8.5S17.743 3 12.5 3 3 6.809 3 11.5c0 1.731.579 3.341 1.574 4.685" />
      </svg>
    </template>

    <slot />
  </Callout>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Important',
})
</script>
