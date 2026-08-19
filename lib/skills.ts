import type { SkillCategory } from "./data";

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    count: 2,
    order: "card-first",
    cardCols: "md:col-span-5",
    listCols: "md:col-span-7",
    stackAria: "Frontend stack: Next.js, Tailwind CSS",
    stack: [
      { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", label: "Next.js" },
      {
        src: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        label: "Tailwind CSS",
      },
    ],
    skills: [
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
        proficiency: "Intermediate",
        experience: "1 year",
        projects: 2,
        notes:
          "Building full-stack apps with App Router and server components.",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        proficiency: "Intermediate",
        experience: "1 year",
        projects: 3,
        notes: "Utility-first styling, responsive design, custom themes.",
      },
    ],
  },
  {
    name: "Backend",
    count: 2,
    order: "list-first",
    short: true,
    cardCols: "md:col-span-4",
    listCols: "md:col-span-8",
    stackAria: "Backend stack: Supabase, Axum",
    stack: [
      { src: "https://cdn.simpleicons.org/supabase/ffffff", label: "Supabase" },
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
    ],
    skills: [
      {
        name: "Supabase",
        icon: "https://cdn.simpleicons.org/supabase/ffffff",
        proficiency: "Intermediate",
        experience: "3 month",
        projects: 2,
        notes: "Auth, real-time subscriptions, and edge functions.",
      },
      {
        name: "Axum",
        icon: "https://cdn.simpleicons.org/rust/ffffff",
        proficiency: "Intermediate",
        experience: "1 month",
        projects: 2,
        notes: "Tower middleware, minimal boilerplate.",
      },
    ],
  },
  {
    name: "Database",
    count: 2,
    order: "card-first",
    tall: true,
    cardCols: "md:col-span-6",
    listCols: "md:col-span-6",
    stackAria: "Database stack: PostgreSQL, SQLite",
    stack: [
      {
        src: "https://cdn.simpleicons.org/postgresql/ffffff",
        label: "PostgreSQL",
      },
      { src: "https://cdn.simpleicons.org/sqlite/ffffff", label: "SQLite" },
    ],
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/ffffff",
        proficiency: "Intermediate",
        experience: "1 month",
        projects: 2,
        notes: "Basic queries, joins, and schema design.",
      },
      {
        name: "SQLite",
        icon: "https://cdn.simpleicons.org/sqlite/ffffff",
        proficiency: "Intermediate",
        experience: "1 month",
        projects: 2,
        notes: "Single-file databases for local apps and prototyping.",
      },
    ],
  },
  {
    name: "Deployment",
    count: 3,
    order: "list-first",
    short: true,
    cardCols: "md:col-span-5",
    listCols: "md:col-span-7",
    stackAria: "Deployment stack: Vercel, Docker, Cloudflare Tunnel",
    stack: [
      { src: "https://cdn.simpleicons.org/vercel/ffffff", label: "Vercel" },
      { src: "https://cdn.simpleicons.org/docker/ffffff", label: "Docker" },
      {
        src: "https://cdn.simpleicons.org/cloudflare/ffffff",
        label: "Cloudflare Tunnel",
      },
    ],
    skills: [
      {
        name: "Vercel",
        icon: "https://cdn.simpleicons.org/vercel/ffffff",
        proficiency: "Intermediate",
        experience: "6 month",
        projects: 2,
        notes: "Deploying Next.js apps, environment variables, previews.",
      },
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker/ffffff",
        proficiency: "Intermediate",
        experience: "1 month",
        projects: 1,
        notes: "Containerizing apps, Docker Compose for local dev.",
      },
      {
        name: "Cloudflare Tunnel",
        icon: "https://cdn.simpleicons.org/cloudflare/ffffff",
        proficiency: "Intermediate",
        experience: "1 month",
        projects: 1,
        notes: "Expose local services securely without opening ports.",
      },
    ],
  },
];