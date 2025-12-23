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
      <div v-if="showMenu" class="fixed z-20 inset-0 bg-indigo-800 md:hidden" />
    </Transition>

    <!--
      首頁需要設定成 `absolute`，
      原因是首頁必須要讓[流星區塊]頂到頁面最上面，
      防止流星畫面從上面掉下來的時候，會有一個留白的區塊。
    -->
    <nav
      class="top-0 inset-x-0 z-20 p-6 flex justify-between items-center"
      :class="pathname === '/' ? 'absolute' : 'relative'"
    >
      <a href="/" class="text-lg text-white font-light md:text-xl lg:text-2xl">
        <Star class="size-6 md:size-8 mr-1 mb-1 text-yellow-400" />星星的筆記．<span class="text-yellow-400 font-bold">Lucas</span>
      </a>

      <button
        type="button"
        class="p-1 text-white rounded-md md:hidden focus:outline-none"
        aria-controls="navbar-content"
        :aria-expanded="showMenu"
        aria-label="Toggle navigation"
        @click="showMenu = !showMenu"
      >
        <div class="relative size-8">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -rotate-90"
            enter-to-class="opacity-100 rotate-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 rotate-0"
            leave-to-class="opacity-0 rotate-90"
          >
            <svg v-if="!showMenu" class="absolute size-8 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
              <path fill="currentColor" fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="absolute size-8 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
              <path fill="currentColor" d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94L6.28 5.22Z" />
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
          class="absolute top-20 bottom-0 inset-x-0 md:static md:!flex md:space-x-3 xl:space-x-5"
        >
          <ul class="px-4 pt-2 pb-6 space-y-4 md:flex md:px-0 md:py-0 md:space-x-1 md:space-y-0">
            <li v-for="item in siteConfig.nav" :key="item.link">
              <a
                :href="item.link"
                class="relative flex px-4 py-2 md:py-1 md:px-3 font-light tracking-wider rounded-full"
                :class="
                  isActive(item)
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-300 transition-colors duration-150 hover:bg-indigo-800'
                "
              >
                <Star
                  v-if="isActive(item)"
                  class="size-6 mr-1"
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

          <ul class="flex items-center justify-center space-x-6 mt-2 md:hidden">
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
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '@/types'
import { useScrollLock } from '@vueuse/core'
import { ref } from 'vue'
import { Star } from '@/components/icons'
import { socialLinks } from '@/nav'
import siteConfig from '@/site.config'

const props = defineProps<{
  // pathname 必須要從 Astro 傳入，因為要讓 SSR 的時候也能正確顯示
  pathname: string
}>()

const showMenu = ref(false)

const isLocked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

function isActive(item: NavItem) {
  if (item.match) {
    return new RegExp(`^${item.match}`).test(props.pathname)
  }
  return props.pathname === item.link
}
</script>
