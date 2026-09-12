<script setup lang="ts">
import type { Project } from "@/lib/data";
import ArrowIcon from "./ArrowIcon.vue";
import StackLogos from "./StackLogos.vue";
import Img from "./Img.vue";

defineProps<{ project: Project; hidden: boolean }>();
</script>

<template>
  <article :class="`${project.cols} ${hidden ? 'hidden' : ''}`" :data-cat="project.cat">
    <a
      href="#"
      :class="`project-card bezel${project.large ? ' bezel-lg' : ''} block h-full`"
      :aria-label="project.ariaLabel"
    >
      <div class="bezel-inner h-full flex flex-col relative">
        <div
          class="cloud cloud-1 -bottom-14 -right-14 w-[280px] h-[280px]"
          aria-hidden="true"
        ></div>
        <div
          :class="`${project.large ? 'aspect-[16/10]' : 'aspect-[16/9]'} overflow-hidden relative`"
        >
          <Img
            :src="project.image"
            :alt="project.alt"
            class="project-image object-cover"
            fill
            sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
          />
          <div
            v-if="project.large"
            class="absolute inset-0 bg-gradient-to-t from-[var(--grad-tint-soft)] via-transparent to-transparent"
          ></div>
        </div>
        <div :class="`${project.large ? 'p-6 md:p-8' : 'p-5 md:p-6'} flex flex-col flex-1`">
          <div class="flex items-center justify-between mb-3">
            <span
              class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400"
            >
              {{ project.meta }}
            </span>
            <span
              :class="`project-arrow ${project.large ? 'w-8 h-8' : 'w-7 h-7'} rounded-full text-ink-100 flex items-center justify-center`"
              style="background-color: var(--bezel-bg)"
            >
              <ArrowIcon :size="project.large ? 13 : 12" />
            </span>
          </div>
          <StackLogos
            :stack="project.stack"
            :label="project.stackAria"
            class="mb-3"
          />
          <h3
            :class="`${project.large ? 'text-2xl md:text-3xl' : 'text-xl'} font-medium ${project.large ? 'tracking-[-0.02em]' : 'tracking-tight'} ${project.large ? 'mb-2' : 'mb-1.5'}`"
          >
            {{ project.name }}
          </h3>
          <p :class="`text-ink-300 leading-[1.55] ${project.large ? '' : 'text-sm'}`">
            {{ project.desc }}
          </p>
        </div>
      </div>
    </a>
  </article>
</template>