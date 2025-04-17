<template>
  <PostlistNav :slug="slug" />

  <div class="mt-10">
    <ul class="grid gap-8">
      <li v-for="post in posts" :key="post.id" class="min-w-0">
        <Card :model="post" />
      </li>
    </ul>

    <!-- <Pagination /> -->
  </div>
</template>

<script setup lang="ts">
import { categoriesMap } from '@/categories'
import type { CollectionEntry } from 'astro:content'

defineProps<{
  slug: keyof typeof categoriesMap | 'all'
  posts: CollectionEntry<'posts'>[]
}>()
</script>
