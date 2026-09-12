<script setup lang="ts">
import { ref } from "vue";
import type { Skill } from "@/lib/data";
import BrandIcon from "./BrandIcon.vue";

defineProps<{ skill: Skill }>();

const open = ref(false);
</script>

<template>
  <button
    type="button"
    class="skill-row w-full flex items-center justify-between gap-4 py-3.5 text-left"
    :aria-expanded="open"
    @click="open = !open"
  >
    <div class="flex items-center gap-4 min-w-0">
      <BrandIcon
        class="skill-icon-text shrink-0 text-ink-300"
        :label="skill.name"
      />
      <span
        class="text-base md:text-lg text-ink-100 font-medium tracking-tight truncate"
      >
        {{ skill.name }}
      </span>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <span
        class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-300 px-2 py-0.5 rounded-full border hairline"
      >
        {{ skill.proficiency }}
      </span>
      <svg
        class="skill-chevron w-4 h-4 text-ink-400 transition-transform duration-400 ease-spring"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  </button>
  <div
    class="skill-note grid grid-rows-[0fr] transition-[grid-template-rows] duration-[400ms] ease-spring"
  >
    <div class="overflow-hidden">
      <dl
        class="grid grid-cols-2 pt-3 gap-x-6 gap-y-4 pb-5 pl-0 md:pl-9 pr-4"
      >
        <div>
          <dt
            class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1"
          >
            Experience
          </dt>
          <dd class="text-sm text-ink-100">{{ skill.experience }}</dd>
        </div>
        <div>
          <dt
            class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1"
          >
            Proficiency
          </dt>
          <dd class="text-sm text-ink-100">{{ skill.proficiency }}</dd>
        </div>
        <div>
          <dt
            class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1"
          >
            Projects
          </dt>
          <dd class="text-sm text-ink-100 stat-num">
            {{ skill.projects }} projects
          </dd>
        </div>
        <div class="col-span-2">
          <dt
            class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mb-1"
          >
            Notes
          </dt>
          <dd class="text-sm text-ink-200 leading-[1.55]">{{ skill.notes }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>