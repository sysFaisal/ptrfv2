import { ref, onMounted, onUnmounted } from "vue";

export type SectionId =
  | "top"
  | "about"
  | "work"
  | "techstack"
  | "codingstat"
  | "contact";

const sectionIds: SectionId[] = [
  "top",
  "about",
  "work",
  "techstack",
  "codingstat",
  "contact",
];

export function useActiveSection() {
  const activeSection = ref<SectionId>("top");
  let observer: IntersectionObserver | null = null;

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      const closest = visibleEntries.reduce((prev, current) => {
        const prevRect = prev.boundingClientRect;
        const currentRect = current.boundingClientRect;
        const viewportCenter = window.innerHeight / 2;
        const prevDistance = Math.abs(
          prevRect.top + prevRect.height / 2 - viewportCenter,
        );
        const currentDistance = Math.abs(
          currentRect.top + currentRect.height / 2 - viewportCenter,
        );
        return currentDistance < prevDistance ? current : prev;
      });
      const id = closest.target.id as SectionId;
      if (sectionIds.includes(id)) {
        activeSection.value = id;
      }
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: [0, 0.5],
    });
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer?.observe(element);
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return activeSection;
}

export function sectionIdToNavLabel(sectionId: SectionId): string {
  const map: Record<SectionId, string> = {
    top: "Home",
    about: "About",
    work: "Project",
    techstack: "Techstack",
    codingstat: "Codingstats",
    contact: "Contact",
  };
  return map[sectionId];
}