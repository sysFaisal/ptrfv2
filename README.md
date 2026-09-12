# minimax-m3

Personal portfolio. Vue 3 SPA built with Vite, served by Bun.

## Development

```bash
bun install
bun run dev
```

Vite serves the SPA on :5173 and proxies `/api` to the Bun API on :3001.

## Build

```bash
bun run build
bun run start
```

`bun run build` runs `vue-tsc --noEmit` then `vite build` into `dist/`. `bun run start` serves `dist/` and `/api/coding-stats` from `server.ts`.

## Environment

- `WAKAPI_INTERNAL_URL` — Wakapi base URL (default `https://wakapi.sakuspace.my.id`)
- `PORT` — server port (default `3000`)