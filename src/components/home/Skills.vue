<script setup lang="ts">
import { skillCategories } from "@/lib/data";
import { config } from "@/lib/config";
import Reveal from "@/components/Reveal.vue";
import SkillRow from "@/components/SkillRow.vue";
import StackLogos from "@/components/StackLogos.vue";
import StarIcon from "@/assets/star.svg?component";

const STAR_VARIANTS = [
  { rotate: "-12deg", size: "0.9em", mr: "0.35rem" },
  { rotate: "8deg", size: "0.65em", mr: "0.5rem" },
  { rotate: "-20deg", size: "1.1em", mr: "0.25rem" },
  { rotate: "15deg", size: "0.75em", mr: "0.45rem" },
];

const CARD_CLOUDS = [
  "cloud cloud-3 -top-24 -right-16 w-[380px] h-[380px]",
  "cloud cloud-1 -top-16 -right-24 w-[460px] h-[420px]",
  "cloud cloud-5 -top-32 -right-10 w-[300px] h-[300px]",
  "cloud cloud-4 -top-20 -right-20 w-[520px] h-[460px]",
];

const LIST_CLOUDS = [
  "cloud cloud-2 -bottom-20 -left-16 w-[360px] h-[360px]",
  "cloud cloud-4 -bottom-12 -left-24 w-[440px] h-[400px]",
  "cloud cloud-6 -bottom-28 -left-8 w-[280px] h-[280px]",
  "cloud cloud-7 -bottom-16 -left-20 w-[500px] h-[440px]",
];

function starStyle(index: number) {
  const star = STAR_VARIANTS[index % STAR_VARIANTS.length];
  return {
    height: star.size,
    transform: `rotate(${star.rotate})`,
    marginRight: star.mr,
  };
}

function visualClass(cat: (typeof skillCategories)[number]) {
  return cat.short
    ? "cat-card-visual--short"
    : cat.tall
      ? "cat-card-visual--tall"
      : "";
}
</script>

<template>
  <section
    id="techstack"
    class="px-6 md:px-10 py-24 md:py-36 border-t hairline"
  >
    <div class="max-w-7xl mx-auto">
      <div class="max-w-[65ch] mb-14 md:mb-20">
        <Reveal>
          <h2
            class="text-balance text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.02] pb-2"
          >
            {{ config.skills.heading.pre
            }}<span class="text-accent italic font-medium">{{
              config.skills.heading.accent
            }}</span
            >{{ config.skills.heading.post }}
          </h2>
        </Reveal>
        <Reveal :delay="1">
          <p class="text-ink-300 text-lg leading-[1.6] mt-6">
            {{ config.skills.subline }}
          </p>
        </Reveal>
      </div>

      <div v-for="(cat, i) in skillCategories" :key="cat.name">
        <div
          v-if="cat.order === 'card-first'"
          :class="`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 ${i === skillCategories.length - 1 ? '' : 'mb-10 md:mb-14'} items-start`"
        >
          <Reveal :class="cat.cardCols">
            <article class="h-full">
              <div class="bezel h-full">
                <div class="bezel-inner h-full flex flex-col relative">
                  <div :class="CARD_CLOUDS[i % CARD_CLOUDS.length]" aria-hidden="true"></div>
                  <div :class="`cat-card-visual ${visualClass(cat)}`">
                    <h3>
                      <StarIcon
                        class="inline-block w-auto align-[-0.1em]"
                        :style="starStyle(i)"
                      />
                      {{ cat.name }}
                    </h3>
                  </div>
                  <div class="p-6 md:p-7">
                    <StackLogos
                      :stack="cat.stack"
                      :label="cat.stackAria"
                      large
                    />
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal :delay="1" :class="cat.listCols">
            <div class="bezel h-full">
              <div class="bezel-inner p-6 md:p-7 relative">
                <div :class="LIST_CLOUDS[i % LIST_CLOUDS.length]" aria-hidden="true"></div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400"
                  >
                    {{ cat.name }}
                  </span>
                  <span class="font-mono text-[10px] text-ink-500">
                    {{ String(cat.count).padStart(2, "0") }}
                  </span>
                </div>
                <ul class="divide-y divide-[var(--hairline-soft)]">
                  <li v-for="skill in cat.skills" :key="skill.name">
                    <SkillRow :skill="skill" />
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div
          v-else
          :class="`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 ${i === skillCategories.length - 1 ? '' : 'mb-10 md:mb-14'} items-start`"
        >
          <div :class="`${cat.cardCols} order-1 md:order-2`">
            <Reveal :class="cat.cardCols">
              <article class="h-full">
                <div class="bezel h-full">
                  <div class="bezel-inner h-full flex flex-col relative">
                    <div :class="CARD_CLOUDS[i % CARD_CLOUDS.length]" aria-hidden="true"></div>
                    <div :class="`cat-card-visual ${visualClass(cat)}`">
                      <h3>
                        <StarIcon
                          class="inline-block w-auto align-[-0.1em]"
                          :style="starStyle(i)"
                        />
                        {{ cat.name }}
                      </h3>
                    </div>
                    <div class="p-6 md:p-7">
                      <StackLogos
                        :stack="cat.stack"
                        :label="cat.stackAria"
                        large
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
          <div :class="`${cat.listCols} order-2 md:order-1`">
            <Reveal :delay="1" :class="cat.listCols">
              <div class="bezel h-full">
                <div class="bezel-inner p-6 md:p-7 relative">
                  <div :class="LIST_CLOUDS[i % LIST_CLOUDS.length]" aria-hidden="true"></div>
                  <div class="flex items-center justify-between mb-2">
                    <span
                      class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400"
                    >
                      {{ cat.name }}
                    </span>
                    <span class="font-mono text-[10px] text-ink-500">
                      {{ String(cat.count).padStart(2, "0") }}
                    </span>
                  </div>
                  <ul class="divide-y divide-[var(--hairline-soft)]">
                    <li v-for="skill in cat.skills" :key="skill.name">
                      <SkillRow :skill="skill" />
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>