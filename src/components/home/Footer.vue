<script setup lang="ts">
import Img from "@/components/Img.vue";
import { config } from "@/lib/config";

const { footer, site } = config;
</script>

<template>
  <footer class="px-6 md:px-10 py-10 md:py-12 border-t hairline">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-full overflow-hidden" aria-hidden="true">
          <Img
            src="/me.jpg"
            :alt="site.name"
            :width="28"
            :height="28"
            class="w-full h-full object-cover"
          />
        </span>
        <div>
          <p class="text-sm font-medium">{{ site.name }}</p>
          <p class="text-xs text-ink-400 font-mono">{{ footer.location }}</p>
        </div>
      </div>

      <nav
        aria-label="Social"
        class="flex items-center gap-5 text-sm text-ink-300"
      >
        <a
          v-for="soc in footer.socials"
          :key="soc.label"
          :href="soc.href"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-ink-100 transition-colors duration-300"
        >
          {{ soc.label }}
        </a>
      </nav>

      <p class="text-xs text-ink-500 font-mono">{{ footer.copyright }}</p>
    </div>
  </footer>
</template>