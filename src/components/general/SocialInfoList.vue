<template>
  <div class="max-w-lg p-4 mx-auto bg-indigo-700 rounded-lg shadow-md shadow-indigo-950/50">
    <ul class="!space-y-2 !p-0 !m-0 !list-none">
      <li
        v-for="link in list"
        :key="link.name"
        class="!p-0 first:!mt-0 last:!mb-0"
      >
        <component
          :is="link.href ? 'a' : 'span'"
          :href="link.href"
          :title="link.href ? link.name : undefined"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          class="flex justify-between items-center px-3 py-1.5 !text-white hover:!text-yellow-400 hover:bg-indigo-600 no-underline rounded-md transition-colors"
        >
          <div class="inline-flex items-center shrink-0">
            <component :is="link.icon" class="size-6 mr-4 sm:mr-3" />
            <div>
              <div class="text-sm sm:text-base">{{ link.name }}</div>
              <div v-if="link.label" class="sm:hidden text-indigo-300/75 text-xs">{{ link.label }}</div>
            </div>
          </div>

          <div v-if="link.label" class="hidden sm:inline">{{ link.label }}</div>
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SocialLink } from '@/nav'

defineProps<{
  list: SocialLink[]
}>()
</script>
