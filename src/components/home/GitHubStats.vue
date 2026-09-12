<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Reveal from "@/components/Reveal.vue";
import { config } from "@/lib/config";

const { gh } = config;
const USERNAME = gh.username;
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${gh.username}?y=last`;
const TIMEOUT_MS = 8000;
const SKELETON_COUNT = 371;
const LEVELS = [
  "var(--shimmer-1)",
  "rgba(57,211,83,0.18)",
  "rgba(57,211,83,0.40)",
  "rgba(57,211,83,0.70)",
  "#39d353",
];

type Day = { date: string; contributionCount: number };
type Stats = {
  total: number;
  longest: number;
  current: number;
  bestCount: number;
  bestDate: string;
};

function levelFor(count: number): number {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}

function fmtMonth(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function fmtBestDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function computeStats(days: Day[]): Stats {
  let total = 0;
  let bestCount = 0;
  let bestDate = "";
  for (const d of days) {
    total += d.contributionCount;
    if (d.contributionCount > bestCount) {
      bestCount = d.contributionCount;
      bestDate = d.date;
    }
  }
  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.contributionCount > 0) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  let current = 0;
  for (let k = days.length - 1; k >= 0; k--) {
    if (days[k].contributionCount > 0) current++;
    else break;
  }
  return { total, longest, current, bestCount, bestDate };
}

const days = ref<Day[] | null>(null);
const range = ref("");
const stats = ref<Stats | null>(null);
const error = ref(false);
const loading = ref(true);

let ctrl: AbortController | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  ctrl = typeof AbortController === "function" ? new AbortController() : null;
  timer = setTimeout(() => ctrl?.abort(), TIMEOUT_MS);

  fetch(ENDPOINT, {
    headers: { Accept: "application/vnd.github+json" },
    signal: ctrl ? ctrl.signal : undefined,
  })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((data: { contributions?: { date: string; count: number }[] }) => {
      if (timer) clearTimeout(timer);
      const raw = data?.contributions;
      if (!raw || raw.length === 0) {
        error.value = true;
        loading.value = false;
        return;
      }
      const flat: Day[] = raw.map((d) => ({
        date: d.date,
        contributionCount: d.count,
      }));
      days.value = flat;
      stats.value = computeStats(flat);
      if (flat.length > 0) {
        range.value = `${fmtMonth(new Date(flat[0].date + "T00:00:00Z"))} — ${fmtMonth(
          new Date(flat[flat.length - 1].date + "T00:00:00Z"),
        )}`;
      }
      loading.value = false;
    })
    .catch(() => {
      if (timer) clearTimeout(timer);
      error.value = true;
      loading.value = false;
    });
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
  ctrl?.abort();
});

const skeleton = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

function statValue(key: string): string {
  if (!stats.value) return "—";
  if (key === "total") return fmtNum(stats.value.total);
  if (key === "current") return String(stats.value.current);
  if (key === "longest") return String(stats.value.longest);
  return fmtNum(stats.value.bestCount);
}
</script>

<template>
  <section
    id="github-contrib"
    class="px-6 md:px-10 py-24 md:py-36 border-t hairline"
  >
    <div class="max-w-7xl mx-auto">
      <Reveal class="mb-12 md:mb-16">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] mb-4 max-w-2xl text-balance"
        >
          {{ gh.heading.pre
          }}<span class="text-accent italic font-medium">{{
            gh.heading.accent
          }}</span
          >{{ gh.heading.post }}
        </h2>
        <p class="text-ink-300 leading-[1.6] max-w-xl">{{ gh.subline }}</p>
      </Reveal>

      <div class="grid grid-cols-1 gap-6 2xl:gap-8">
        <Reveal :delay="1">
          <div class="bezel">
            <div class="bezel-inner p-5 md:p-7 relative">
              <div
                class="cloud cloud-1 -top-20 -left-16 w-[420px] h-[420px]"
                aria-hidden="true"
              ></div>
              <div class="flex items-start justify-between mb-5">
                <div>
                  <p
                    class="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-1.5"
                  >
                    {{ gh.graphLabel }}
                  </p>
                  <p class="text-sm text-ink-200 font-mono tracking-[-0.01em]">
                    {{ range || "—" }}
                  </p>
                </div>
                <a
                  :href="`https://github.com/${USERNAME}`"
                  target="_blank"
                  rel="noopener"
                  class="text-xs font-mono text-ink-400 hover:text-ink-100 transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  @{{ USERNAME }}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>

              <div
                class="gh-grid"
                role="figure"
                aria-label="GitHub contribution graph"
              >
                <template v-if="loading">
                  <span
                    v-for="i in skeleton"
                    :key="i"
                    class="gh-cell gh-skel"
                    aria-hidden="true"
                  />
                </template>
                <template v-else>
                  <button
                    v-for="day in days ?? []"
                    :key="day.date"
                    type="button"
                    class="gh-cell"
                    :style="{ background: LEVELS[levelFor(day.contributionCount)] }"
                    :aria-label="`${day.date}, ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`"
                    :title="`${fmtBestDate(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`"
                  />
                </template>
              </div>

              <div
                class="flex items-center justify-between mt-5 text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono"
              >
                <span>{{ gh.last12Months }}</span>
                <div class="flex items-center gap-1.5">
                  <span>{{ gh.less }}</span>
                  <span
                    v-for="color in LEVELS"
                    :key="color"
                    class="gh-legend-swatch"
                    :style="{ background: color }"
                    aria-hidden="true"
                  />
                  <span>{{ gh.more }}</span>
                </div>
              </div>
            </div>
          </div>

          <p v-if="error" class="mt-4 text-xs font-mono text-ink-400">
            {{ gh.error
            }}<a
              class="underline hover:text-ink-100 transition-colors duration-300"
              :href="`https://github.com/${USERNAME}`"
              target="_blank"
              rel="noopener"
              >github.com/{{ USERNAME }}</a
            >
            {{ gh.errorSuffix }}
          </p>
        </Reveal>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div v-for="stat in gh.stats" :key="stat.key" class="bezel">
            <div class="bezel-inner p-5 relative">
              <div
                class="cloud cloud-2 -bottom-12 -right-12 w-[220px] h-[220px]"
                aria-hidden="true"
              ></div>
              <p
                class="text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-3"
              >
                {{ stat.label }}
              </p>
              <p
                class="font-mono text-4xl md:text-5xl tracking-[-0.04em] leading-none text-ink-50"
              >
                {{ statValue(stat.key) }}
                <span v-if="stat.suffix" class="text-ink-400 text-2xl ml-1">{{
                  stat.suffix
                }}</span>
              </p>
              <p
                v-if="stat.key === 'best'"
                class="text-xs text-ink-400 mt-2 font-mono"
              >
                {{ stats?.bestDate ? fmtBestDate(stats.bestDate) : "—" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>