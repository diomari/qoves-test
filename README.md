# Qoves Frontend Test

Single-page Next.js landing page for Qoves with responsive media, GSAP-driven motion, accessible FAQ interactions, and a section-based component architecture.

## Stack

- Next.js App Router
- React
- TypeScript
- Sass / SCSS Modules
- GSAP + `@gsap/react`

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

### Dev server
- `npm run dev` runs on `0.0.0.0:3000`
- LAN/mobile URL uses your machine's local IP, e.g. `http://<your-local-ip>:3000`
- `.next` is cleared before dev/build to avoid stale Next cache issues

## Structure

- `src/app` - App Router entry, global styles, page composition
- `src/components/sections` - folder-per-section organization, e.g. `Hero/HeroSection.tsx`
- `src/components/shared` - folder-per-component reusable UI, e.g. `CTAButton/CTAButton.tsx`
- `src/content` - typed, serializable page content/data
- `src/lib` - utilities, fonts, hooks
- `public/images` and `public/videos` - local media assets

## Architecture notes

- `src/app/page.tsx` should only compose section components
- content files should stay presentation-agnostic and contain no JSX
- shared UI belongs in `src/components/shared`
- section-specific composition belongs in `src/components/sections`
- animations should use GSAP via `useGSAP`
- styling uses colocated SCSS modules for component-local concerns
- `src/app/globals.css` should stay focused on tokens, reset/base styles, and rare global behavior

## Media notes

The project uses responsive local media from `public/images` and `public/videos`.
Optimize large assets before shipping, especially:
- hero images
- PNG cutouts
- desktop video variants
- fonts (prefer `woff2`)

## Quality checks

Before merging meaningful changes, run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Contributor guidance

See `AGENTS.md` for project conventions, performance rules, accessibility expectations, and front-end architecture guidance.
