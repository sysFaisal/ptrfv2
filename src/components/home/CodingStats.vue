<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  fallbackCodingStats,
  type CodingData,
} from "@/lib/data";
import { config } from "@/lib/config";
import Reveal from "@/components/Reveal.vue";

const { coding } = config;

const TIMEOUT_MS = 4000;

function formatHours(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

const data = ref<CodingData | null>(null);
const error = ref(false);

let ctrl: AbortController | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

function renderError() {
  error.value = true;
  data.value = fallbackCodingStats;
}

onMounted(() => {
  if (typeof fetch !== "function") {
    data.value = fallbackCodingStats;
    return;
  }

  ctrl = typeof AbortController === "function" ? new AbortController() : null;
  timer = setTimeout(() => ctrl?.abort(), TIMEOUT_MS);

  fetch("/api/coding-stats", {
    headers: { Accept: "application/json" },
    signal: ctrl ? ctrl.signal : undefined,
  })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((d: { data: CodingData }) => {
      if (timer) clearTimeout(timer);
      const payload = d?.data;
      if (!payload || !Array.isArray(payload.languages)) {
        renderError();
        return;
      }
      data.value = {
        languages: payload.languages,
        total_seconds: payload.total_seconds,
        days_tracked: payload.days_including_holidays ?? payload.days_tracked,
        daily_average: payload.daily_average,
      } as CodingData;
    })
    .catch(() => {
      if (timer) clearTimeout(timer);
      renderError();
    });
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
  ctrl?.abort();
});

const maxPercent = computed(() =>
  data.value?.languages.length ? data.value.languages[0].percent : 100,
);
</script>

<template>
  <section
    id="codingstat"
    class="px-6 md:px-10 py-24 md:py-36 border-t hairline"
  >
    <div class="max-w-7xl mx-auto">
      <Reveal class="mb-12 md:mb-16">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] mb-4 max-w-2xl text-balance"
        >
          {{ coding.heading.pre
          }}<span class="text-accent italic font-medium">{{
            coding.heading.accent
          }}</span
          >{{ coding.heading.post }}
        </h2>
        <p class="text-ink-300 leading-[1.6] max-w-xl">{{ coding.subline }}</p>
      </Reveal>

      <Reveal :delay="1">
        <div class="bezel">
          <div class="bezel-inner p-5 pb-5 md:p-7 md:pb-7 relative">
            <div
              class="cloud cloud-1 -top-24 -right-16 w-[420px] h-[420px]"
              aria-hidden="true"
            ></div>
            <div class="cs-header">
              <p
                class="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-0 truncate"
              >
                {{ coding.breakdown }}
              </p>
              <p class="cs-total">
                <span class="cs-total-value">{{
                  data ? formatHours(data.total_seconds) : "—"
                }}</span>
                tracked ·
                <span>{{ data ? data.days_tracked : "—" }}</span> days
              </p>
            </div>
            <p class="cs-total cs-daily">
              avg
              <span class="cs-total-value">{{
                data ? formatHours(data.daily_average) : "—"
              }}</span>
              <span class="cs-daily-label">/ day</span>
            </p>

            <template v-if="data">
              <div
                v-for="(lang, i) in data.languages.slice(0, 6)"
                :key="lang.name"
                class="cs-row"
              >
                <span class="cs-rank">#{{ i + 1 }}</span>
                <div class="cs-lang">
                  <span class="cs-lang-name">{{ lang.name }}</span>
                  <div class="cs-bar">
                    <div
                      class="cs-fill"
                      :style="{ width: `${(lang.percent / maxPercent) * 100}%` }"
                    />
                  </div>
                </div>
                <span class="cs-time">{{ formatHours(lang.total_seconds) }}</span>
                <span class="cs-percent">{{ lang.percent.toFixed(1) }}%</span>
              </div>
            </template>
            <template v-else>
              <div v-for="w in [70, 50, 35, 25, 18, 12]" :key="w" class="cs-row">
                <span class="cs-rank cs-skel">&nbsp;</span>
                <div class="cs-lang">
                  <span class="cs-lang-name cs-skel"
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  >
                  <div class="cs-bar">
                    <div class="cs-fill cs-skel" :style="{ width: `${w}%` }" />
                  </div>
                </div>
                <span class="cs-time cs-skel">&nbsp;&nbsp;&nbsp;</span>
                <span class="cs-percent cs-skel">&nbsp;&nbsp;&nbsp;</span>
              </div>
            </template>

            <p v-if="error" class="mt-4 text-xs font-mono text-ink-400">
              {{ coding.error }}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>