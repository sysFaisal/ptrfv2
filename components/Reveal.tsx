"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  className = "",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-d${delay}` : "";

  return (
    <div ref={ref} className={`reveal${delayClass} ${className}`}>
      {children}
    </div>
  );
}
