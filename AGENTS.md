# minimax-m3

Vue 3 (Vite SPA) + Bun. Static SPA, API `/api/coding-stats` served by `server.ts` via `Bun.serve`.

## Commands

- `bun run dev` — Vite dev + API watch (2 processes; Vite proxies `/api` → :3001)
- `bun run build` — `vue-tsc --noEmit && vite build` → `dist/`
- `bun run start` — serve `dist/` + API on :3000

## Layout

- `src/` — Vue SPA (`main.ts`, `App.vue`, `components/`, `composables/`, `lib/`, `styles/`, `assets/`)
- `server.ts` — Bun.serve: Wakapi proxy + SPA fallback
- `public/` — fonts and images served as-is