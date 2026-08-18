"use client";

import { useState, useEffect, useCallback } from "react";

type SectionId = "top" | "about" | "work" | "techstack" | "codingstat" | "contact";

const sectionIds: SectionId[] = ["top", "about", "work", "techstack", "codingstat", "contact"];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    
    if (visibleEntries.length > 0) {
      const closest = visibleEntries.reduce((prev, current) => {
        const prevRect = prev.boundingClientRect;
        const currentRect = current.boundingClientRect;
        const viewportCenter = window.innerHeight / 2;
        const prevDistance = Math.abs(prevRect.top + prevRect.height / 2 - viewportCenter);
        const currentDistance = Math.abs(currentRect.top + currentRect.height / 2 - viewportCenter);
        return currentDistance < prevDistance ? current : prev;
      });
      
      const id = closest.target.id as SectionId;
      if (sectionIds.includes(id)) {
        setActiveSection(id);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

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