import type { Project } from "./data";

export const projects: Project[] = [
  {
    name: "Portofolio",
    cat: "frontend",
    cols: "md:col-span-7",
    image: "/templates.jpg",
    alt: "Portofolio personal developer portfolio website",
    meta: "2025 · Portfolio",
    ariaLabel: "Portofolio, personal developer portfolio",
    stackAria: "Stack: Next.js, TypeScript, Tailwind CSS",
    stack: [
      { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", label: "Next.js" },
      {
        src: "https://cdn.simpleicons.org/typescript/ffffff",
        label: "TypeScript",
      },
      {
        src: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        label: "Tailwind CSS",
      },
    ],
    desc: "A modern developer portfolio with animated skill charts, project showcases, and coding statistics. Built with Next.js App Router and buttery smooth animations.",
  },
  {
    name: "Mini Chat Apps",
    cat: "fullstack",
    cols: "md:col-span-5",
    image: "/templates.jpg",
    alt: "Mini Chat Apps real-time messaging application",
    meta: "2025 · Fullstack App",
    ariaLabel: "Mini Chat Apps, real-time messaging application",
    stackAria: "Stack: Next.js, TypeScript, Tailwind CSS, Supabase, PostgreSQL",
    stack: [
      { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", label: "Next.js" },
      {
        src: "https://cdn.simpleicons.org/typescript/ffffff",
        label: "TypeScript",
      },
      {
        src: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        label: "Tailwind CSS",
      },
      {
        src: "https://cdn.simpleicons.org/supabase/ffffff",
        label: "Supabase",
      },
      {
        src: "https://cdn.simpleicons.org/postgresql/ffffff",
        label: "PostgreSQL",
      },
    ],
    desc: "A real-time chat application with instant messaging, user authentication, and persistent message history. Powered by Supabase for live subscriptions.",
  },
  {
    name: "Decant Cashier",
    cat: "fullstack",
    cols: "md:col-span-6",
    large: true,
    image: "/templates.jpg",
    alt: "Decant Cashier point of sale system",
    meta: "2026 · Work In Progress",
    ariaLabel: "Decant Cashier, point of sale system",
    stackAria: "Stack: Next.js, Axum, Tailwind CSS, PostgreSQL",
    stack: [
      { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", label: "Next.js" },
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Axum" },
      {
        src: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        label: "Tailwind CSS",
      },
      {
        src: "https://cdn.simpleicons.org/postgresql/ffffff",
        label: "PostgreSQL",
      },
    ],
    desc: "A modern POS solution for decant sellers. Features precise inventory tracking and real-time dashboards, backed by a blazingly fast Rust (Axum) API",
  },
];