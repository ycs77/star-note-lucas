<template>
  <footer class="my-12 text-center space-y-6">
    <ul class="flex justify-center space-x-4">
      <li v-for="item in nav" :key="item.link">
        <a
          :href="item.link"
          class="flex text-indigo-300 hover:text-yellow-400 font-light tracking-wide underline"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>

    <ul class="flex items-center justify-center space-x-6">
      <li v-for="link in socialLinks" :key="link.name">
        <a
          :href="link.href"
          :title="link.name"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white hover:text-yellow-400"
        >
          <component :is="link.icon" class="size-6" />
        </a>
      </li>
    </ul>

    <div>
      <p>© 2021-PRESENT Lucas Yang</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { nav, socialLinks } from '@/nav'
</script>
