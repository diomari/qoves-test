# Qoves Frontend Test

Mobile-first Next.js scaffold for a single-page beauty-tech landing page with video-ready media sections, restrained motion, accessible accordions, and responsive layout foundations.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Motion for React

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run dev` clears the generated `.next` cache before starting. This prevents stale build artifacts from causing Next's dev-only "missing required error components" refresh loop after switching between `build` and `dev`.

## Structure

- `src/app` - App Router entry, global styles, page composition
- `src/components` - focused landing-page primitives
- `src/content` - typed page copy, FAQ groups, carousel content
- `src/lib` - small shared utilities
- `public/images` and `public/videos` - local media slots

The hero and media sections are video-ready. They currently render poster images with empty `src` values to avoid development 404s; replace those `src` values in `src/content/landing.ts` when final `.mp4` assets are available.
