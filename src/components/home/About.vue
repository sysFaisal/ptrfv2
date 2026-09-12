<script setup lang="ts">
import Reveal from "@/components/Reveal.vue";
import Img from "@/components/Img.vue";
import { config } from "@/lib/config";

const { about } = config;
</script>

<template>
  <section id="about" class="px-6 md:px-10 py-20 md:py-28">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col gap-10 mb-14 md:mb-20">
        <div>
          <Reveal>
            <h2
              class="text-balance text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.02] pb-2"
            >
              {{ about.heading.pre
              }}<span class="text-accent italic font-medium">{{
                about.heading.accent
              }}</span
              >{{ about.heading.post }}
            </h2>
          </Reveal>
        </div>

        <Reveal :delay="1">
          <div
            class="font-mono text-sm md:text-[15px] leading-[1.75] text-ink-300 space-y-4 max-w-md md:max-w-lg 2xl:max-w-xl"
          >
            <p v-for="line in about.codeLines" :key="line">{{ line }}</p>
          </div>
        </Reveal>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
        <Reveal :delay="1" class="md:col-span-5">
          <article class="h-full">
            <div class="bezel h-full">
              <div class="bezel-inner p-6 md:p-7 relative">
                <div
                  class="cloud cloud-2 -bottom-16 -left-20 w-[300px] h-[300px]"
                  aria-hidden="true"
                ></div>
                <div class="flex items-center justify-between mb-5">
                  <span
                    class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400"
                  >
                    {{ about.locations.label }}
                  </span>
                  <span class="font-mono text-[10px] text-ink-500">
                    {{ about.locations.badge }}
                  </span>
                </div>

                <ul class="divide-y hairline">
                  <li
                    v-for="loc in about.locations.items"
                    :key="loc.name"
                    class="flex items-baseline justify-between gap-4 py-3"
                  >
                    <div class="flex items-baseline gap-3 min-w-0">
                      <span
                        class="font-mono text-[10px] text-ink-500 w-6 shrink-0"
                      >
                        {{ loc.index }}
                      </span>
                      <span
                        class="text-base md:text-lg text-ink-100 font-medium tracking-tight"
                      >
                        {{ loc.name }}
                      </span>
                    </div>
                    <span
                      class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 shrink-0"
                    >
                      {{ loc.timezone }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal :delay="2" class="md:col-span-7">
          <article class="h-full">
            <div class="bezel h-full">
              <div class="bezel-inner p-6 md:p-7 relative">
                <div
                  class="cloud cloud-1 -top-20 -right-16 w-[360px] h-[360px]"
                  aria-hidden="true"
                ></div>
                <div class="flex items-center justify-between mb-5">
                  <span
                    class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400"
                  >
                    {{ about.education.label }}
                  </span>
                  <span class="font-mono text-[10px] text-ink-500">
                    {{ about.education.badge }}
                  </span>
                </div>

                <ul class="space-y-4">
                  <li class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-full overflow-hidden border border-accent/25 shrink-0"
                    >
                      <Img
                        src="/unjayni.png"
                        :alt="about.education.school"
                        :width="40"
                        :height="40"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <p
                        class="text-base md:text-lg text-ink-100 font-medium tracking-tight leading-tight"
                      >
                        {{ about.education.school }}
                      </p>
                      <p
                        class="font-mono text-[11px] uppercase hidden tracking-[0.18em] text-ink-400 mt-1"
                      >
                        {{ about.education.degree }}
                      </p>
                    </div>
                    <div class="shrink-0 pt-0.5 text-right">
                      <p
                        class="stat-num text-lg md:text-xl font-medium tracking-tight text-ink-100"
                      >
                        {{ about.education.gpa }}
                      </p>
                      <p
                        class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 mt-0.5"
                      >
                        {{ about.education.gpaLabel }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
</template>