let observer: IntersectionObserver | null = null;
const elements = new WeakMap<Element, () => void>();

function ensureObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          const cb = elements.get(entry.target);
          cb?.();
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
  );
  return observer;
}

export function observeReveal(el: Element) {
  const o = ensureObserver();
  if (!o) {
    el.classList.add("in");
    return () => {};
  }
  o.observe(el);
  const cleanup = () => o.unobserve(el);
  elements.set(el, cleanup);
  return cleanup;
}