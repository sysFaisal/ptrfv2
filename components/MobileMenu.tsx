"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Starside from "@/assets/starside.svg";
import { config } from "@/lib/config";

const { menu, nav } = config;
const menuItems = nav.items;

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 500);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMenu]);

  const openMenu = () => {
    setIsVisible(true);
    setTimeout(() => setIsOpen(true), 10);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const sidebarContent = isVisible && (
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMenu}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      />
      <aside
        id="mobile-menu-sidebar"
        className={`absolute top-0 left-0 bottom-0 h-full w-[280px] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#000000", margin: 0, padding: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={menu.dialogLabel}
      >
        <div className="flex flex-col h-full px-6 py-6 relative overflow-hidden">
          <div
            className="absolute top-0 -right-24 w-[360px] h-[360px] bg-white/[0.10] rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          ></div>
          <div
            className="absolute -bottom-24 -left-24 w-[460px] h-[460px] bg-white/[0.15] rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          ></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[clamp(2.75rem,6.8vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.04em]">
              {menu.heading.pre}
              <span
                className="text-accent italic"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                {menu.heading.accent}
              </span>
            </h2>
            <button
              onClick={closeMenu}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              aria-label={menu.closeLabel}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#f5f5f4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 2L10 10M10 2L2 10" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 mb-8 mt-5">
            <div
              className="w-[50%] h-auto aspect-square rounded-xl overflow-hidden relative border border-white/10"
              style={{ backgroundColor: "#1f1f1f" }}
            >
              <Image
                src="/me.jpg"
                alt={menu.imageAlt}
                fill
                sizes="(max-width: 768px) 50vw, 280px"
                className="object-cover"
              />
            </div>
            <div className="w-[50%] h-fit aspect-square rounded-xl overflow-hidden relative">
              <Starside className="w-full h-full text-accent" />
            </div>
          </div>

          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block text-lg font-medium pl-0 pr-3 py-1 rounded-xl transition-all duration-300"
                  style={{ color: "#e7e5e4" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="mt-auto pt-6"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
          >
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="inline-flex items-center w-full justify-center font-medium text-sm rounded-full"
              style={{
                backgroundColor: "#f5f5f4",
                color: "#0a0a0a",
                padding: "8px 20px",
              }}
            >
              {menu.cta}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden flex flex-col justify-center items-center w-7 h-7 rounded-full border border-white/[0.08] gap-[3px] transition-all duration-300 hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ backgroundColor: "#111111" }}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        aria-expanded={isOpen}
        aria-label={isOpen ? menu.closeLabel : menu.openLabel}
      >
        <span
          className={`w-3 h-[1.5px] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
            isOpen ? "rotate-45 translate-y-[4.5px]" : ""
          }`}
          style={{ backgroundColor: "#f5f5f4" }}
        />
        <span
          className={`w-3 h-[1.5px] rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: "#f5f5f4" }}
        />
        <span
          className={`w-3 h-[1.5px] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
            isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
          }`}
          style={{ backgroundColor: "#f5f5f4" }}
        />
      </button>

      {mounted && sidebarContent && createPortal(sidebarContent, document.body)}
    </>
  );
}
