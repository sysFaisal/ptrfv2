# Konversi Next.js 16 → Vue 3 (Vite SPA) + Bun

Target: SPA statis, API `/api/coding-stats` dihandle Bun.serve. Tanpa SSR/SEO server-side.
`lib/*` dan `public/*` dipakai ulang apa adanya.

## 1. Struktur akhir

```
index.html
server.ts
vite.config.ts
tsconfig.json
package.json
src/
  main.ts
  App.vue
  styles/globals.css
  assets/{star.svg,starside.svg}
  lib/{config,data,projects,skills,coding-fallback}.ts
  composables/{useReveal,useActiveSection}.ts
  components/
    ArrowIcon.vue BrandIcon.vue StackLogos.vue Reveal.vue Img.vue
    GrainOverlay.vue ThemeToggle.vue SkillRow.vue ProjectCard.vue MobileMenu.vue
    home/{Nav,Hero,Marquee,About,Skills,Work,GitHubStats,CodingStats,Contact,Footer}.vue
public/{fonts,me.jpg,templates.jpg,unjayni.png,icon.png}
```

## 2. Dependensi

Tambah: `vue`, `vite`, `@vitejs/plugin-vue`, `vue-tsc`, `tailwindcss`, `@tailwindcss/vite`, `vite-svg-loader`, `simple-icons`.
Hapus: `next`, `react`, `react-dom`, `eslint-config-next`, `@svgr/webpack`, `@tailwindcss/postcss`, `postcss`.

## 3. Urutan eksekusi

1. `package.json` + `bun install`; `tsconfig.json` (jsx→preserve hilang, `types: ["vite/client"]`, alias `@/*` → `./src/*`).
2. `vite.config.ts`: plugin vue, tailwind, svgLoader, alias `@`, `server.proxy["/api"] → http://localhost:3001`, `build.outDir="dist"`.
3. `index.html`: `<html lang="en" data-theme>` default, meta title/description/themeColor/OG (dari `config.meta`), icon, preload font, ThemeScript inline (anti-FOUC), `<div id="app">`, `<script type="module" src="/src/main.ts">`.
4. `src/main.ts`: `createApp(App).mount("#app")`; import `globals.css`.
5. `src/styles/globals.css`: salin utuh. Ganti referensi font ke `@font-face` manual (4 file woff2 di `/fonts/`, definisikan `--font-geist-sans` & `--font-geist-mono`). Sisanya (Tailwind v4, token, bezel, cloud, dll) tidak berubah.
6. Pindah `lib/*` → `src/lib/*` tanpa edit.
7. Composables: `useReveal.ts` apa adanya; `useActiveSection.ts` ganti `useState`→`ref`, `useEffect`→`onMounted`/`onUnmounted`.
8. Komponen atomik:
   - `ArrowIcon.vue`, `BrandIcon.vue`, `StackLogos.vue`: template + props, logika identik.
   - `Reveal.vue`: `<div ref>` + `onMounted` observeReveal, `<slot/>`, prop `delay`.
   - `Img.vue`: props `priority`/`fill`, render `<img>` dengan style fill; `sizes` diteruskan.
   - `GrainOverlay.vue`, `ThemeToggle.vue`: `ref` + `onMounted`.
9. Komponen home:
   - `Nav.vue`, `Hero.vue`, `Marquee.vue`, `About.vue`: murni presentational, konversi langsung (SVG via import komponen).
   - `Skills.vue`: `v-for` ganti `.map`; `CategoryCard`/`CategoryList` jadi child component atau inline template.
   - `Work.vue`: `ref active`, `ref tabRefs`, `@keydown`, `v-show`/`:class` untuk filter.
   - `SkillRow.vue`: `ref open`, `aria-expanded`.
   - `GitHubStats.vue`: `onMounted` fetch + `onUnmounted` abort; state `ref`.
   - `CodingStats.vue`: fetch `/api/coding-stats`, fallback `fallbackCodingStats`.
   - `Contact.vue`, `Footer.vue`: langsung.
   - `MobileMenu.vue`: `<Teleport to="body">` ganti `createPortal`, state buka/tutup + `watch` untuk lock scroll & Escape.
10. `App.vue`: import statis semua section (bundle kecil; `next/dynamic` tidak diperlukan). Susunan: Nav, main(Hero…Contact), Footer, GrainOverlay.
11. `server.ts` (Bun.serve):
    - `GET /api/coding-stats`: fetch Wakapi (`WAKAPI_INTERNAL_URL` default `http://wakapi:3000`), timeout 4s, cache in-memory 1 jam, header `Cache-Control` sama seperti route lama; error → 502 JSON.
    - fallback: serve `dist/` via `Bun.file`; path tak dikenal → `index.html` (SPA fallback).
    - port dari `PORT` default 3000.
12. `Dockerfile`: stage build `oven/bun:1-alpine` (`bun install --frozen-lockfile`, `bun run build`), stage runtime copy `dist/`, `server.ts`, `public/` → `CMD ["bun", "server.ts"]`. `compose.yml` tinggal ganti command/port (3100:3000, env `WAKAPI_INTERNAL_URL`).
13. Hapus: `app/`, `next.config.ts`, `next-env.d.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.tsbuildinfo`, `.next/`. Opsional: `database.db*` (sisa, tidak dipakai).
14. Update `AGENTS.md` (buang blok Next.js), `README.md`, `.gitignore` (`.next` → `dist`).
15. Verifikasi: `bun run build`, `bunx vue-tsc --noEmit`, `bun run dev`, cek 9 section, toggle tema, menu mobile, filter Work, API coding-stats.

## 4. Scripts

```json
"dev":     "bun run dev:api & bun run dev:web",
"dev:web": "vite",
"dev:api": "bun --watch server.ts",
"build":   "vue-tsc --noEmit && vite build",
"start":   "bun server.ts"
```

## 5. Risiko

- SEO hilang (SPA). Mitigasi: meta statis di `index.html` + OG tags. Upgrade path: `vite-ssg` bila perlu.
- `vite-svg-loader` default svgo bisa mengubah path; set `svgo: false` untuk `star.svg`/`starside.svg`.
- Dev butuh 2 proses; proxy Vite menangani `/api`.
- Cache coding-stats di memori hilang saat restart — sama seperti revalidate lama.