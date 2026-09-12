<script setup lang="ts">
import { config } from "@/lib/config";

const items = config.marquee.items;
</script>

<template>
  <section
    class="border-y hairline bg-surface/40 py-6 marquee-mask overflow-hidden"
    :aria-label="config.marquee.ariaLabel"
  >
    <div class="marquee-track flex items-center gap-10 whitespace-nowrap">
      <template v-for="item in items" :key="item">
        <span
          class="font-mono text-sm uppercase tracking-[0.15em] text-ink-300"
        >
          {{ item }}
        </span>
        <span class="text-ink-600" aria-hidden="true"> / </span>
      </template>
      <template v-for="item in items" :key="`dup-${item}`">
        <span
          class="font-mono text-sm uppercase tracking-[0.15em] text-ink-300"
          aria-hidden="true"
        >
          {{ item }}
        </span>
        <span class="text-ink-600" aria-hidden="true"> / </span>
      </template>
    </div>
  </section>
</template>