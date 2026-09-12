<script setup lang="ts">
import { computed } from "vue";
import {
  siCloudflare,
  siDocker,
  siGrafana,
  siNextdotjs,
  siPostgresql,
  siPrometheus,
  siRust,
  siSocketdotio,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const props = withDefaults(
  defineProps<{ label?: string; className?: string }>(),
  { label: "", className: "" },
);

const ICONS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Supabase: siSupabase,
  Rust: siRust,
  Axum: siRust,
  PostgreSQL: siPostgresql,
  Postgres: siPostgresql,
  SQLite: siSqlite,
  Vercel: siVercel,
  Docker: siDocker,
  "Cloudflare Tunnel": siCloudflare,
  TypeScript: siTypescript,
  "Socket.IO": siSocketdotio,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
};

const icon = computed(() => ICONS[props.label ?? ""] ?? null);
const fallback = computed(
  () =>
    props.label?.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() ?? "??",
);
</script>

<template>
  <span
    v-if="!icon"
    :class="`${className} inline-flex items-center justify-center`"
    >{{ fallback }}</span
  >
  <svg
    v-else
    :class="className"
    viewBox="0 0 24 24"
    role="img"
    :aria-label="label"
    fill="currentColor"
  >
    <path :d="icon.path" />
  </svg>
</template>