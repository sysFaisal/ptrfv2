<script setup lang="ts">
import { computed, type StyleValue } from "vue";

const props = withDefaults(
  defineProps<{ priority?: boolean; fill?: boolean; style?: StyleValue }>(),
  { priority: false, fill: false },
);

const fillStyle: StyleValue = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

const mergedStyle = computed<StyleValue>(() =>
  props.fill ? [fillStyle, props.style] : props.style,
);
</script>

<template>
  <img
    :loading="priority ? 'eager' : 'lazy'"
    :decoding="priority ? 'sync' : 'async'"
    :fetchpriority="priority ? 'high' : undefined"
    :style="mergedStyle"
  />
</template>