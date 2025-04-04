<template>
  <header>
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showMenu" class="fixed isolate inset-0 bg-indigo-800 md:hidden" />
    </Transition>

    <nav class="isolate p-6 flex justify-between items-center">
      <a href="/" class="text-lg text-whi font-lightte md:text-xl lg:text-2xl">
        <Star class="w-6 h-6 md:w-8 md:h-8 mr-1 mb-1 text-yellow-400" />星星的筆記．<span class="text-yellow-400 font-bold">Lucas</span>
      </a>

      <button
        type="button"
        class="p-1 text-white rounded-md md:hidden focus:outline-none"
        aria-controls="navbar-content"
        :aria-expanded="showMenu"
        aria-label="Toggle navigation"
        @click="showMenu = !showMenu"
      >
        <div class="relative w-8 h-8">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -rotate-90"
            enter-to-class="opacity-100 rotate-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 rotate-0"
            leave-to-class="opacity-0 rotate-90"
          >
            <svg v-if="!showMenu" class="absolute w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
              <path fill="currentColor" fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="absolute w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
              <path fill="currentColor" d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94L6.28 5.22Z"/>
            </svg>
          </Transition>
        </div>
      </button>

      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        @before-enter="isLocked = true"
        @after-leave="isLocked = false"
      >
        <div
          v-show="showMenu"
          id="navbar-content"
          class="absolute top-20 bottom-0 inset-x-0 md:static md:!block"
        >
          <ul class="px-4 pb-6 space-y-2 md:flex md:px-0 md:pb-0 md:space-x-1 md:space-y-0">
            <li v-for="item in nav" :key="item.link">
              <a
                :href="item.link"
                class="relative flex px-4 py-2 md:py-1 md:px-3 font-light tracking-wider rounded-lg"
                :class="
                  isActive(item)
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-300 transition-colors duration-150 hover:bg-indigo-800'
                "
              >
                <Star
                  v-if="isActive(item)"
                  class="w-6 h-6 mr-1"
                  :class="
                    isActive(item)
                      ? 'absolute top-0 left-0 text-yellow-400 -translate-x-1 -translate-y-2'
                      : ''
                  "
                />
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollLock } from '@vueuse/core'
import Star from './Star.vue'
import type { NavItem } from '@/types'

const props = defineProps<{
  currentPath: string
}>()

const isLocked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

const showMenu = ref(false)

const nav = [
  { text: '文章', link: '/posts', match: '/posts' },
  { text: '標籤', link: '/tags', match: '/tags' },
  { text: '專案', link: '/projects', match: '/projects' },
  { text: '關於', link: '/about' },
] satisfies NavItem[]

function isActive(item: NavItem) {
  if (item.match) {
    return new RegExp(`^${item.match}`).test(props.currentPath)
  }
  return props.currentPath === item.link
}
</script>
