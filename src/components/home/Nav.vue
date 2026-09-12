<script setup lang="ts">
import ArrowIcon from "@/components/ArrowIcon.vue";
import Img from "@/components/Img.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { config } from "@/lib/config";

const { nav, site } = config;
</script>

<template>
  <header
    class="fixed top-5 left-0 right-0 mx-auto z-50 w-[calc(100%-1.5rem)] max-w-3xl"
  >
    <nav
      class="nav-pill backdrop-blur-[20px] backdrop-saturate-[180%] rounded-full px-2 py-2 flex items-center justify-between"
      :aria-label="nav.ariaLabel"
    >
      <div class="flex items-center gap-2 sm:md-3 pl-3">
        <MobileMenu />
        <a href="#top" class="flex items-center gap-2.5 pr-4 py-1.5">
          <span class="w-7 h-7 rounded-full overflow-hidden">
            <Img
              src="/me.jpg"
              :alt="site.name"
              :width="28"
              :height="28"
              class="w-full h-full object-cover"
            />
          </span>
          <span class="font-medium text-sm tracking-tight hidden sm:block">
            {{ site.name }}
          </span>
        </a>
      </div>
      <div class="flex items-center gap-2">
        <ul class="hidden md:flex items-center gap-1 text-sm">
          <li v-for="item in nav.items" :key="item.href">
            <a
              :href="item.href"
              class="px-3 py-1.5 text-ink-300 hover:text-ink-100 transition-colors duration-300 rounded-full"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
      <div class="flex flex-row items-center">
        <ThemeToggle />
        <a href="#contact" class="ml-2 btn-primary" :aria-label="nav.cta">
          <span class="hidden sm:inline">{{ nav.cta }}</span>
          <span class="sm:hidden">{{ nav.ctaShort }}</span>
          <span class="btn-icon">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </nav>
  </header>
</template>