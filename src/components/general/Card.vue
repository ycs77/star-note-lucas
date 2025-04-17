<template>
  <div class="flex flex-col group rounded-lg shadow-md shadow-indigo-950/50 overflow-hidden md:flex-row md:h-[12rem] md:transition md:duration-300 md:scale-100 md:hover:scale-105 md:hover:shadow-lg">
    <div v-if="model.data.image">
      <a
        :href="`/posts/${parsePostSlug(model.id).slug}`"
        class="block w-full aspect-16/9 md:w-auto md:h-full"
        :target="target"
      >
        <img
          class="w-full h-full object-cover"
          :src="model.data.image"
          :alt="model.data.title"
        >
      </a>
    </div>

    <div class="w-full flex flex-col justify-between min-w-0 p-6 bg-indigo-800 transition-colors duration-150 group-hover:bg-indigo-700">
      <div v-if="model.data.pubDate" class="flex items-center text-gray-400">
        <Draft v-if="model.data.draft" />
        <Date :datetime="model.data.pubDate" class="text-xs" />
      </div>

      <a
        :href="`/posts/${parsePostSlug(model.id).slug}`"
        class="block mt-2"
        :target="target"
      >
        <h5 class="text-white text-2xl font-medium leading-tight">
          {{ model.data.title }}
        </h5>
      </a>

      <div v-if="model.data.description" class="mt-2 text-indigo-200 text-sm font-light line-clamp-2">
        {{ model.data.description }}
      </div>

      <div v-if="model.data.category || model.data.tags?.length" class="mt-3 relative mask-r-from-80%">
        <div class="flex gap-2 overflow-hidden">
          <Tag
            v-if="model.data.category"
            type="category"
            :name="categoriesMap[model.data.category].name"
            :href="`/${model.data.category}`"
            class="mt-1 shrink-0"
          />
          <Tag
            v-for="tag in [...(model.data.tags || [])]"
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
import Date from './Date.vue'
import { categoriesMap } from '@/category'
import { parsePostSlug } from '@/utils/slug'
import type { CardModel } from '@/types'

defineProps<{
  model: CardModel
  target?: '_blank'
}>()
</script>
