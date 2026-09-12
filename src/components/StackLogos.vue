<script setup lang="ts">
import type { StackLogo } from "@/lib/data";
import BrandIcon from "./BrandIcon.vue";

withDefaults(
  defineProps<{
    stack: StackLogo[];
    label: string;
    large?: boolean;
  }>(),
  { large: false },
);
</script>

<template>
  <div
    :class="`stack-logos${large ? ' stack-logos-lg' : ''}`"
    :aria-label="label"
  >
    <BrandIcon
      v-for="(logo, i) in stack"
      :key="i"
      class="stack-logo text-ink-300"
      :label="logo.label"
    />
  </div>
</template>