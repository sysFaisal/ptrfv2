<script setup lang="ts">
import ArrowIcon from "@/components/ArrowIcon.vue";
import Reveal from "@/components/Reveal.vue";
import { config } from "@/lib/config";
import Star from "@/assets/star.svg?component";

const { hero } = config;
</script>

<template>
  <section
    id="top"
    class="relative min-h-[100dvh] hero-mesh pt-28 md:pt-32 pb-20 md:pb-24 px-6 md:px-10"
  >
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
    >
      <div class="lg:col-span-7">
        <Reveal>
          <p
            class="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400 mb-7 inline-flex items-center gap-2.5"
          >
            <Star
              class="w-4 h-4 rounded-full text-accent pulse-dot"
              aria-hidden="true"
            />
            {{ hero.availability }}
          </p>
        </Reveal>

        <Reveal :delay="1">
          <h1
            class="text-balance text-[clamp(2.75rem,6.8vw,6.25rem)] font-medium tracking-[-0.04em] leading-[0.96] mb-8"
          >
            {{ hero.headline.pre
            }}<span
              class="text-accent italic font-medium"
              style="font-feature-settings: 'ss01'"
            >
              <br />{{ hero.headline.accent }}<br />
            </span>
            {{ hero.headline.post }}
          </h1>
        </Reveal>

        <Reveal :delay="2">
          <p
            class="text-lg md:text-xl text-ink-300 max-w-2xl leading-[1.55] mb-10"
          >
            {{ hero.subline }}
          </p>
        </Reveal>

        <Reveal :delay="3" class="flex flex-wrap items-center gap-3">
          <a href="#contact" class="btn-primary">
            <span>{{ hero.ctaPrimary }}</span>
            <span class="btn-icon">
              <ArrowIcon />
            </span>
          </a>
          <a href="#work" class="btn-ghost">
            <span>{{ hero.ctaSecondary }}</span>
          </a>
        </Reveal>
      </div>

      <Reveal :delay="2" class="lg:col-span-5">
        <div class="bezel">
          <div class="bezel-inner p-6 md:p-7">
            <div class="flex items-start justify-between mb-7">
              <div>
                <p
                  class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-1.5"
                >
                  {{ hero.nowLabel }}
                </p>
                <p class="text-sm text-ink-200">
                  {{ hero.workingFrom.pre
                  }}<span class="text-ink-100">{{
                    hero.workingFrom.accent
                  }}</span
                  >{{ hero.workingFrom.post }}
                </p>
              </div>
              <div
                class="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style="
                  background-color: var(--pill-bg);
                  border: 1px solid var(--pill-border);
                "
              >
                <span
                  class="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-100"
                >
                  {{ hero.openLabel }}
                </span>
              </div>
            </div>

            <div
              class="aspect-[4/5] rounded-2xl overflow-hidden bg-ink-800 relative mb-6"
            >
              <img
                :src="hero.portrait.src"
                :alt="hero.portrait.alt"
                class="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                decoding="sync"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[var(--grad-tint-from)] via-transparent to-transparent"
              ></div>
              <div class="absolute bottom-4 left-4 right-4">
                <p
                  class="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-300 mb-0.5"
                >
                  {{ hero.nameCard }}
                </p>
                <p class="text-sm text-ink-100 font-medium">
                  {{ hero.roleCard }}
                </p>
              </div>
            </div>

            <dl class="grid grid-cols-3 gap-4 pt-5 border-t hairline">
              <div v-for="stat in hero.stats" :key="stat.srLabel">
                <dt class="sr-only">{{ stat.srLabel }}</dt>
                <dd class="stat-num text-2xl font-medium tracking-tight">
                  {{ stat.value }}
                </dd>
                <p class="text-[11px] text-ink-400 mt-1">{{ stat.label }}</p>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>