export type StackLogo = {
  src?: string;
  label?: string;
};

export type Skill = {
  name: string;
  icon: string;
  proficiency: string;
  experience: string;
  projects: number;
  notes: string;
};

export type SkillCategory = {
  name: string;
  short?: boolean;
  tall?: boolean;
  count: number;
  order: "card-first" | "list-first";
  cardCols: string;
  listCols: string;
  stack: StackLogo[];
  stackAria: string;
  skills: Skill[];
};

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
      { label: "Axum" },
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

export type Project = {
  name: string;
  cat: "frontend" | "backend" | "fullstack";
  cols: string;
  large?: boolean;
  image: string;
  alt: string;
  meta: string;
  ariaLabel: string;
  stack: StackLogo[];
  stackAria: string;
  desc: string;
};

export const projects: Project[] = [
  /*{
    name: "Helix",
    cat: "backend",
    cols: "md:col-span-7",
    large: true,
    image: "https://picsum.photos/seed/helix-build-orchestrator-2025/1200/750",
    alt: "Helix distributed build orchestrator dashboard",
    meta: "2025 · Distributed systems",
    ariaLabel: "Helix, distributed build orchestrator",
    stackAria: "Stack: Rust, Axum, Postgres, Redis",
    stack: [
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      {
        src: "https://cdn.simpleicons.org/postgresql/ffffff",
        label: "Postgres",
      },
      { src: "https://cdn.simpleicons.org/redis/ffffff", label: "Redis" },
      { label: "Axum" },
    ],
    desc: "A build orchestrator that treats your CI graph as a first-class data structure. Cached, parallel, and predictable across fleets of a thousand nodes.",
  },
  {
    name: "Tessera",
    cat: "backend",
    cols: "md:col-span-5",
    image: "https://picsum.photos/seed/tessera-vector-retrieval-2025/800/450",
    alt: "Tessera vector retrieval engine",
    meta: "2025 · Search",
    ariaLabel: "Tessera, vector retrieval engine",
    stackAria: "Stack: Rust, Axum, gRPC, ONNX",
    stack: [
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      { src: "https://cdn.simpleicons.org/grpc/ffffff", label: "gRPC" },
      { label: "Axum" },
      { label: "ONNX Runtime" },
    ],
    desc: "Vector retrieval engine with on-device hybrid ranking. 4ms p99 on a phone.",
  },
  {
    name: "Driftwood",
    cat: "backend",
    cols: "md:col-span-5",
    image: "https://picsum.photos/seed/driftwood-collab-sdk-2024/800/450",
    alt: "Driftwood real-time collaboration SDK",
    meta: "2024 · SDK",
    ariaLabel: "Driftwood, real-time collaboration SDK",
    stackAria: "Stack: TypeScript, Rust, WebSockets, CRDT",
    stack: [
      {
        src: "https://cdn.simpleicons.org/typescript/ffffff",
        label: "TypeScript",
      },
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      {
        src: "https://cdn.simpleicons.org/socketdotio/ffffff",
        label: "Socket.IO",
      },
      { label: "CRDT" },
    ],
    desc: "A CRDT collaboration SDK that ships under 12kb gzipped, with offline-first sync.",
  },
  {
    name: "Polar",
    cat: "backend",
    cols: "md:col-span-7",
    image: "https://picsum.photos/seed/polar-observability-mesh-2024/900/500",
    alt: "Polar observability mesh for edge workloads",
    meta: "2024 · Infrastructure",
    ariaLabel: "Polar, observability mesh",
    stackAria: "Stack: Rust, OpenTelemetry, Prometheus, Grafana",
    stack: [
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      {
        src: "https://cdn.simpleicons.org/prometheus/ffffff",
        label: "Prometheus",
      },
      { src: "https://cdn.simpleicons.org/grafana/ffffff", label: "Grafana" },
      { label: "OpenTelemetry" },
    ],
    desc: "Observability mesh for edge workloads. OpenTelemetry, without the YAML.",
  },
  */
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

export type CodingStat = {
  name: string;
  total_seconds: number;
  percent: number;
};

export const fallbackCodingStats: {
  languages: CodingStat[];
  total_seconds: number;
  days_tracked: number;
} = {
  languages: [
    { name: "TypeScript", total_seconds: 561600, percent: 32.4 },
    { name: "JavaScript", total_seconds: 352800, percent: 20.3 },
    { name: "Python", total_seconds: 241200, percent: 13.9 },
    { name: "Go", total_seconds: 162000, percent: 9.3 },
    { name: "Rust", total_seconds: 136800, percent: 7.9 },
    { name: "HTML/CSS", total_seconds: 104400, percent: 6.0 },
  ],
  total_seconds: 1735200,
  days_tracked: 90,
};
