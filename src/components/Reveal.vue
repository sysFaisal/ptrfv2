<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { observeReveal } from "@/composables/useReveal";

const props = withDefaults(
  defineProps<{ className?: string; delay?: 1 | 2 | 3 | 4 | 5 }>(),
  { className: "" },
);

const el = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (el.value) observeReveal(el.value);
});

const cls = computed(
  () => `reveal${props.delay ? ` reveal-d${props.delay}` : ""} ${props.className}`,
);
</script>

<template>
  <div ref="el" :class="cls">
    <slot />
  </div>
</template>