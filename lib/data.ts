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
    count: 4,
    order: "card-first",
    cardCols: "md:col-span-5",
    listCols: "md:col-span-7",
    stackAria: "Frontend stack: Next.js, React, TypeScript, Tailwind CSS",
    stack: [
      { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", label: "Next.js" },
      { src: "https://cdn.simpleicons.org/react/ffffff", label: "React" },
      { src: "https://cdn.simpleicons.org/typescript/ffffff", label: "TypeScript" },
      { src: "https://cdn.simpleicons.org/tailwindcss/ffffff", label: "Tailwind CSS" },
    ],
    skills: [
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
        proficiency: "Advanced",
        experience: "2 years",
        projects: 3,
        notes: "Built responsive sites using RSC pattern.",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/ffffff",
        proficiency: "Expert",
        experience: "5 years",
        projects: 12,
        notes: "Comfortable with hooks, suspense, and concurrent rendering.",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/ffffff",
        proficiency: "Expert",
        experience: "5 years",
        projects: 14,
        notes: "Default for any new JS project. Strict mode always on.",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/ffffff",
        proficiency: "Advanced",
        experience: "4 years",
        projects: 9,
        notes: "Utility-first, custom design tokens via CSS variables.",
      },
    ],
  },
  {
    name: "Backend",
    count: 4,
    order: "list-first",
    short: true,
    cardCols: "md:col-span-4",
    listCols: "md:col-span-8",
    stackAria: "Backend stack: Rust, Node.js, gRPC, Axum",
    stack: [
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      { src: "https://cdn.simpleicons.org/nodedotjs/ffffff", label: "Node.js" },
      { src: "https://cdn.simpleicons.org/grpc/ffffff", label: "gRPC" },
      { label: "Axum" },
    ],
    skills: [
      {
        name: "Rust",
        icon: "https://cdn.simpleicons.org/rust/ffffff",
        proficiency: "Intermediate",
        experience: "2 years",
        projects: 4,
        notes: "Ownership model clicked; reach for it on perf-critical paths.",
      },
      {
        name: "Axum",
        icon: "https://cdn.simpleicons.org/rust/ffffff",
        proficiency: "Intermediate",
        experience: "1 year",
        projects: 2,
        notes: "Tower middleware, minimal boilerplate.",
      },
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs/ffffff",
        proficiency: "Advanced",
        experience: "6 years",
        projects: 10,
        notes: "Mostly behind a typed wrapper these days.",
      },
      {
        name: "gRPC",
        icon: "https://cdn.simpleicons.org/grpc/ffffff",
        proficiency: "Intermediate",
        experience: "1 year",
        projects: 2,
        notes: "Protobuf schemas + tonic clients on the server side.",
      },
    ],
  },
  {
    name: "Database",
    count: 4,
    order: "card-first",
    tall: true,
    cardCols: "md:col-span-6",
    listCols: "md:col-span-6",
    stackAria: "Database stack: PostgreSQL, Redis, SQLite, MongoDB",
    stack: [
      { src: "https://cdn.simpleicons.org/postgresql/ffffff", label: "PostgreSQL" },
      { src: "https://cdn.simpleicons.org/redis/ffffff", label: "Redis" },
      { src: "https://cdn.simpleicons.org/sqlite/ffffff", label: "SQLite" },
      { src: "https://cdn.simpleicons.org/mongodb/ffffff", label: "MongoDB" },
    ],
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/ffffff",
        proficiency: "Advanced",
        experience: "6 years",
        projects: 11,
        notes: "Default DB. Window functions, CTEs, JSONB when needed.",
      },
      {
        name: "Redis",
        icon: "https://cdn.simpleicons.org/redis/ffffff",
        proficiency: "Intermediate",
        experience: "4 years",
        projects: 6,
        notes: "Cache, queues, pub/sub. Never as a primary store.",
      },
      {
        name: "SQLite",
        icon: "https://cdn.simpleicons.org/sqlite/ffffff",
        proficiency: "Intermediate",
        experience: "3 years",
        projects: 4,
        notes: "Single-file apps, local-first tools, embedded analytics.",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.simpleicons.org/mongodb/ffffff",
        proficiency: "Junior",
        experience: "1 year",
        projects: 1,
        notes: "Document fits when shape genuinely varies. Rare.",
      },
    ],
  },
  {
    name: "Deployment",
    count: 4,
    order: "list-first",
    short: true,
    cardCols: "md:col-span-5",
    listCols: "md:col-span-7",
    stackAria: "Deployment stack: Vercel, Cloudflare, Docker, GitHub Actions",
    stack: [
      { src: "https://cdn.simpleicons.org/vercel/ffffff", label: "Vercel" },
      { src: "https://cdn.simpleicons.org/cloudflare/ffffff", label: "Cloudflare" },
      { src: "https://cdn.simpleicons.org/docker/ffffff", label: "Docker" },
      { src: "https://cdn.simpleicons.org/githubactions/ffffff", label: "GitHub Actions" },
    ],
    skills: [
      {
        name: "Vercel",
        icon: "https://cdn.simpleicons.org/vercel/ffffff",
        proficiency: "Advanced",
        experience: "3 years",
        projects: 7,
        notes: "Edge runtime + ISR for content sites; CI by default.",
      },
      {
        name: "Cloudflare",
        icon: "https://cdn.simpleicons.org/cloudflare/ffffff",
        proficiency: "Intermediate",
        experience: "2 years",
        projects: 4,
        notes: "Workers for small compute, R2 for blobs, DNS for everything.",
      },
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker/ffffff",
        proficiency: "Advanced",
        experience: "4 years",
        projects: 8,
        notes: "Multi-stage images, distroless when I can.",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions/ffffff",
        proficiency: "Advanced",
        experience: "4 years",
        projects: 9,
        notes: "Reusable workflows, matrix builds, OIDC to cloud.",
      },
    ],
  },
];

export type Project = {
  name: string;
  cat: "frontend" | "backend";
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
  {
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
      { src: "https://cdn.simpleicons.org/postgresql/ffffff", label: "Postgres" },
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
      { src: "https://cdn.simpleicons.org/typescript/ffffff", label: "TypeScript" },
      { src: "https://cdn.simpleicons.org/rust/ffffff", label: "Rust" },
      { src: "https://cdn.simpleicons.org/socketdotio/ffffff", label: "Socket.IO" },
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
      { src: "https://cdn.simpleicons.org/prometheus/ffffff", label: "Prometheus" },
      { src: "https://cdn.simpleicons.org/grafana/ffffff", label: "Grafana" },
      { label: "OpenTelemetry" },
    ],
    desc: "Observability mesh for edge workloads. OpenTelemetry, without the YAML.",
  },
  {
    name: "Atlas",
    cat: "frontend",
    cols: "md:col-span-7",
    image: "https://picsum.photos/seed/atlas-design-system-2025/900/500",
    alt: "Atlas design system component library",
    meta: "2025 · Design system",
    ariaLabel: "Atlas, design system",
    stackAria: "Stack: React, TypeScript, Tailwind, Storybook",
    stack: [
      { src: "https://cdn.simpleicons.org/react/ffffff", label: "React" },
      { src: "https://cdn.simpleicons.org/typescript/ffffff", label: "TypeScript" },
      { src: "https://cdn.simpleicons.org/tailwindcss/ffffff", label: "Tailwind CSS" },
      { src: "https://cdn.simpleicons.org/storybook/ffffff", label: "Storybook" },
    ],
    desc: "A typed component library with documented primitives, tokens, and motion. Built so the next product ships in days, not weeks.",
  },
  {
    name: "Lumen",
    cat: "frontend",
    cols: "md:col-span-5",
    image: "https://picsum.photos/seed/lumen-collab-canvas-2025/900/500",
    alt: "Lumen real-time collaborative canvas",
    meta: "2025 · Interface",
    ariaLabel: "Lumen, real-time collaborative canvas",
    stackAria: "Stack: React, Vite, TypeScript, WebSockets",
    stack: [
      { src: "https://cdn.simpleicons.org/react/ffffff", label: "React" },
      { src: "https://cdn.simpleicons.org/vite/ffffff", label: "Vite" },
      { src: "https://cdn.simpleicons.org/typescript/ffffff", label: "TypeScript" },
      { src: "https://cdn.simpleicons.org/socketdotio/ffffff", label: "Socket.IO" },
    ],
    desc: "A real-time collaborative canvas for data viz. 60fps cursors, optimistic updates, zero perceptible lag.",
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
