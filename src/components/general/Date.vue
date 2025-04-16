<template>
  <time
    v-if="datetime"
    :datetime="datetime.toISOString()"
    :title="datetime.format('YYYY/MM/DD HH:mm:ss')"
    :class="cn('text-indigo-300', props.class)"
  >
    {{ datetime.format('YYYY/MM/DD') }}
  </time>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import dayjs from 'dayjs'
import { cn } from '@/utils/className'

const props = defineProps<{
  datetime?: string | Date,
  class?: HTMLAttributes['class']
}>()

const datetime = computed(() =>
  props.datetime
    ? dayjs(props.datetime)
    : undefined
)
</script>
