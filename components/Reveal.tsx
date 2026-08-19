"use client";

import { useEffect, useRef } from "react";
import { observeReveal } from "@/lib/hooks/useReveal";

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
    const cleanup = observeReveal(el);
    return cleanup;
  }, []);

  const delayClass = delay ? ` reveal-d${delay}` : "";

  return (
    <div ref={ref} className={`reveal${delayClass} ${className}`}>
      {children}
    </div>
  );
}