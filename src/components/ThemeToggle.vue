<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type Theme = "light" | "dark";

const theme = ref<Theme>("dark");
const mounted = ref(false);

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.dataset.theme;
  return attr === "light" ? "light" : "dark";
}

onMounted(() => {
  mounted.value = true;
  theme.value = getInitialTheme();
});

function toggle() {
  const next: Theme = theme.value === "dark" ? "light" : "dark";
  theme.value = next;
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* noop */
  }
}

const label = computed(() =>
  theme.value === "dark" ? "Switch to light mode" : "Switch to dark mode",
);
</script>

<template>
  <button
    type="button"
    @click="toggle"
    class="theme-toggle"
    :aria-label="label"
    :aria-pressed="theme === 'light'"
    :title="label"
  >
    <svg
      class="icon-moon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <svg
      class="icon-sun"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
    <span v-if="!mounted" class="sr-only">{{ label }}</span>
  </button>
</template>