<template>
  <div class="flex flex-col group rounded-lg shadow-md shadow-indigo-950/50 overflow-hidden md:flex-row md:h-[12rem] md:transition md:duration-300 md:scale-100 md:hover:scale-105 md:hover:shadow-lg">
    <div v-if="post.data.image">
      <a
        :href="`/posts/${parsePostSlug(post.id).slug}`"
        class="block w-full aspect-16/9 md:w-auto md:h-full"
        :target="target"
      >
        <img
          class="w-full h-full object-cover"
          :src="post.data.image"
        >
      </a>
    </div>

    <div class="w-full flex flex-col justify-between min-w-0 p-6 bg-indigo-800 transition-colors duration-150 group-hover:bg-indigo-700">
      <div class="flex items-center text-gray-400">
        <Date :datetime="post.data.pubDate" class="text-xs" />
      </div>

      <a
        :href="`/posts/${parsePostSlug(post.id).slug}`"
        class="block mt-2"
        :target="target"
      >
        <h5 class="text-white text-2xl font-medium leading-tight">
          {{ post.data.title }}
        </h5>
      </a>

      <div v-if="post.data.description" class="mt-2 text-indigo-200 text-sm font-light line-clamp-2">
        {{ post.data.description }}
      </div>

      <div v-if="post.data.tags" class="mt-3 relative mask-r-from-80%">
        <div class="flex gap-2 overflow-hidden">
          <Tag
            v-for="tag in [...post.data.tags, ...post.data.tags]"
            :name="tag"
            :href="`/tags/${tag}`"
            class="mt-1 shrink-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CollectionEntry } from 'astro:content'
import Date from './Date.vue'
import { parsePostSlug } from '@/utils/slug'

defineProps<{
  post: CollectionEntry<'posts'>
  target?: '_blank'
}>()
</script>
