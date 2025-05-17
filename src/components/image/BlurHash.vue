<template>
  <Transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-opacity duration-500"
  >
    <div
      v-if="blurhash && !loaded"
      :class="cn('scale-105', props.class)"
      :style="{
        backgroundImage: `url(${dataUri})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { blurhashToDataUri } from '@unpic/placeholder'
import { cn } from '@/utils/className';

const props = defineProps<{
  src: string
  blurhash: string
  class?: HTMLAttributes['class']
}>()

const loaded = ref(false)

const dataUri = blurhashToDataUri(props.blurhash, 32, 32)

onMounted(() => {
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    loaded.value = true
  }
})
</script>
