<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Img from "@/components/Img.vue";
import Starside from "@/assets/starside.svg?component";
import { config } from "@/lib/config";
import {
  useActiveSection,
  sectionIdToNavLabel,
} from "@/composables/useActiveSection";

const { menu, nav } = config;
const menuItems = nav.items;

const isOpen = ref(false);
const isVisible = ref(false);
const mounted = ref(false);
const activeSection = useActiveSection();

let cleanup: (() => void) | null = null;

onMounted(() => {
  mounted.value = true;
});

function closeMenu() {
  isOpen.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 500);
}

function openMenu() {
  isVisible.value = true;
  setTimeout(() => {
    isOpen.value = true;
  }, 10);
}

function toggle() {
  if (isOpen.value) closeMenu();
  else openMenu();
}

function handleLinkClick() {
  closeMenu();
}

function getItemColor(label: string) {
  const activeLabel = sectionIdToNavLabel(activeSection.value);
  return label === activeLabel ? "var(--color-ink-50)" : "var(--color-ink-400)";
}

watch(isOpen, (open) => {
  if (open) {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    cleanup = () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  } else {
    cleanup?.();
    cleanup = null;
  }
});
</script>

<template>
  <button
    class="md:hidden flex flex-col justify-center items-center w-7 h-7 rounded-full border hairline gap-[3px] transition-all duration-300 hover:border-[var(--bezel-border-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    style="background-color: var(--color-surface)"
    @click="toggle"
    :aria-expanded="isOpen"
    :aria-label="isOpen ? menu.closeLabel : menu.openLabel"
  >
    <span
      :class="`w-3 h-[1.5px] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`"
      style="background-color: var(--color-ink-100)"
    />
    <span
      :class="`w-3 h-[1.5px] rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-0' : 'opacity-100'}`"
      style="background-color: var(--color-ink-100)"
    />
    <span
      :class="`w-3 h-[1.5px] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`"
      style="background-color: var(--color-ink-100)"
    />
  </button>

  <Teleport v-if="mounted && isVisible" to="body">
    <div class="fixed inset-0 z-[9999] md:hidden">
      <div
        :class="`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-100' : 'opacity-0'}`"
        @click="closeMenu"
        style="background-color: var(--menu-overlay)"
      />
      <aside
        id="mobile-menu-sidebar"
        :class="`absolute top-0 left-0 bottom-0 h-full w-[280px] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`"
        style="background-color: var(--menu-sidebar); margin: 0; padding: 0"
        role="dialog"
        aria-modal="true"
        :aria-label="menu.dialogLabel"
      >
        <div class="flex flex-col h-full px-6 py-6 relative overflow-hidden">
          <div
            class="cloud cloud-7 top-0 -right-24 w-[360px] h-[360px]"
            aria-hidden="true"
          ></div>
          <div
            class="cloud cloud-7 -bottom-24 -left-24 w-[460px] h-[460px]"
            aria-hidden="true"
          ></div>
          <div class="flex items-center justify-between mb-6">
            <h2
              class="text-[clamp(2.75rem,6.8vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.04em]"
            >
              {{ menu.heading.pre
              }}<span
                class="text-accent italic"
                style="font-feature-settings: 'ss01'"
                >{{ menu.heading.accent }}</span
              >
            </h2>
            <button
              @click="closeMenu"
              class="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style="
                background-color: var(--pill-bg);
                border: 1px solid var(--pill-border);
              "
              :aria-label="menu.closeLabel"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="var(--color-ink-100)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 2L10 10M10 2L2 10" />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-2 mb-8 mt-5">
            <div
              class="w-[50%] h-auto aspect-square rounded-xl overflow-hidden relative hairline"
              style="background-color: var(--color-surface)"
            >
              <Img
                src="/me.jpg"
                :alt="menu.imageAlt"
                fill
                sizes="(max-width: 768px) 80px, 280px"
                class="object-cover"
              />
            </div>
            <div
              class="w-[50%] h-fit aspect-square rounded-xl overflow-hidden relative"
            >
              <Starside class="w-full h-full text-accent" />
            </div>
          </div>

          <ul class="flex flex-col gap-1">
            <li v-for="item in menuItems" :key="item.href">
              <a
                :href="item.href"
                @click="handleLinkClick"
                class="block text-lg font-medium pl-0 pr-3 py-1 rounded-xl transition-all duration-300"
                :style="{ color: getItemColor(item.label) }"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <div
            class="mt-auto pt-6"
            style="border-top: 1px solid var(--hairline-soft)"
          >
            <a
              href="#contact"
              @click="handleLinkClick"
              class="inline-flex items-center w-full justify-center font-medium text-sm rounded-full"
              style="
                background-color: var(--btn-primary-bg);
                color: var(--btn-primary-fg);
                padding: 8px 20px;
              "
            >
              {{ menu.cta }}
            </a>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>