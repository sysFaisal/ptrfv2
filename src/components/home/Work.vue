<script setup lang="ts">
import { computed, ref } from "vue";
import { projects, type Project } from "@/lib/data";
import { config } from "@/lib/config";
import ProjectCard from "@/components/ProjectCard.vue";
import Reveal from "@/components/Reveal.vue";

type Tab = "all" | Project["cat"];

const tabs = config.work.tabs;

const counts = {
  all: projects.length,
  frontend: projects.filter((p) => p.cat === "frontend").length,
  backend: projects.filter((p) => p.cat === "backend").length,
  fullstack: projects.filter((p) => p.cat === "fullstack").length,
};

const visibleTabs = computed(() =>
  tabs.filter((tab) => tab.id === "all" || counts[tab.id] > 0),
);

const active = ref<Tab>("all");
const tabRefs = ref<(HTMLButtonElement | null)[]>([]);

function onKeyDown(e: KeyboardEvent, index: number) {
  const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
  if (!keys.includes(e.key)) return;
  let idx = index;
  const len = visibleTabs.value.length;
  if (e.key === "ArrowRight") idx = (idx + 1) % len;
  if (e.key === "ArrowLeft") idx = (idx - 1 + len) % len;
  if (e.key === "Home") idx = 0;
  if (e.key === "End") idx = len - 1;
  const target = tabRefs.value[idx];
  if (target) {
    target.focus();
    target.click();
  }
  e.preventDefault();
}
</script>

<template>
  <section id="work" class="px-6 md:px-10 py-24 md:py-36">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 md:mb-12">
        <div class="lg:col-span-7">
          <Reveal>
            <h2
              class="text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.02]"
            >
              {{ config.work.heading.pre
              }}<span class="text-accent italic font-medium">{{
                config.work.heading.accent
              }}</span
              >{{ config.work.heading.post }}
            </h2>
          </Reveal>
        </div>
        <div class="lg:col-span-5 flex lg:items-end">
          <Reveal :delay="1">
            <p class="text-ink-300 text-lg leading-[1.55] max-w-md">
              {{ config.work.subline }}
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal
        :delay="2"
        class="flex flex-wrap items-center gap-2 mb-10 md:mb-14"
      >
        <div
          role="tablist"
          :aria-label="config.work.filterAria"
          class="flex flex-wrap items-center gap-2"
        >
          <button
            v-for="(tab, i) in visibleTabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="active === tab.id"
            :data-tab="tab.id"
            :ref="(el) => (tabRefs[i] = el as HTMLButtonElement | null)"
            @click="active = tab.id"
            @keydown="(e) => onKeyDown(e as KeyboardEvent, i)"
            :class="`px-5 py-2 rounded-full text-sm font-medium transition-all duration-[400ms] ease-spring ${
              active === tab.id
                ? 'bg-accent text-bg'
                : 'border hairline text-ink-200 hover:text-ink-100'
            }`"
            :style="
              active === tab.id ? undefined : { backgroundColor: 'var(--bezel-bg)' }
            "
          >
            {{ tab.label }}
            <span class="font-mono text-[10px] ml-1.5 opacity-70">
              {{ counts[tab.id] }}
            </span>
          </button>
        </div>
      </Reveal>

      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr"
      >
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          :project="project"
          :hidden="active !== 'all' && project.cat !== active"
        />
      </div>
    </div>
  </section>
</template>