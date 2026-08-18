import {
  siCloudflare,
  siDocker,
  siGrafana,
  siNextdotjs,
  siPostgresql,
  siPrometheus,
  siRust,
  siSocketdotio,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Supabase: siSupabase,
  Rust: siRust,
  Axum: siRust,
  PostgreSQL: siPostgresql,
  Postgres: siPostgresql,
  SQLite: siSqlite,
  Vercel: siVercel,
  Docker: siDocker,
  "Cloudflare Tunnel": siCloudflare,
  TypeScript: siTypescript,
  "Socket.IO": siSocketdotio,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
};

export default function BrandIcon({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const icon = ICONS[label ?? ""];

  if (!icon) {
    return (
      <span className={`${className} inline-flex items-center justify-center`}>
        {label?.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() ?? "??"}
      </span>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
