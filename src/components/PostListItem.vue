<template>
  <a
    :href="`/posts/${parsePostSlug(post.id).slug}`"
    class="flex flex-col sm:flex-row"
    :target="target"
  >
    <div v-if="post.data.image" class="shrink-0 sm:order-2 sm:ml-4">
      <div class="relative w-full pb-16/9 bg-yellow-400 rounded overflow-hidden sm:rounded-md sm:w-48 lg:w-60">
        <img
          :src="post.data.image.url"
          :alt="post.data.image.alt"
          class="absolute w-full h-full object-cover hover:opacity-75 rounded sm:rounded-md md:transition-opacity md:duration-150"
          :class="{ 'border-2 border-yellow-400': border }"
        />
      </div>
    </div>

    <div class="group grow min-w-0 mt-4 sm:order-1 sm:mt-0">
      <div class="flex items-center text-gray-400 space-x-2">
        <Draft v-if="post.data.draft" />
        <Date :datetime="post.data.pubDate" class="text-xs" />
      </div>

      <h5 class="mt-2 text-white group-hover:text-yellow-400 text-xl font-medium leading-tight transition-colors duration-100">
        {{ post.data.title }}
      </h5>

      <div v-if="post.data.description" class="mt-2 text-indigo-200 font-light max-w-2xl">
        {{ post.data.description }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { CollectionEntry } from 'astro:content'
import Date from '@/components/Date.vue'
import Draft from '@/components/Draft.vue'
import { parsePostSlug } from '@/utils/slug'

defineProps<{
  post: CollectionEntry<'posts'>
  border?: boolean
  target?: '_blank'
}>()
</script>
