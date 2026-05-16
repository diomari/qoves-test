# AGENTS.md

## Project overview
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS v4, GSAP
- Package manager: npm
- Main route: `src/app/page.tsx`
- Styling approach: Tailwind-first. Do not introduce SCSS unless explicitly requested.
- Animation approach: GSAP with `@gsap/react` `useGSAP`

## Key commands
- Dev: `npm run dev`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Build: `npm run build`

## Current architecture

### App
- `src/app/page.tsx`
  - should only compose page section components

### Sections
- `src/components/sections`
  - `PersonalizedPlanSection.tsx`
  - `HeroSection.tsx`
  - `FAQSection.tsx`
  - `StorySection.tsx`

### Shared components
- `src/components/shared`
  - reusable UI primitives and repeated elements only
  - examples: `TextPill`, `CTAButton`, `FAQAccordion`, `Section`, `MediaCarousel`

### Content/data
- `src/content/landing.ts`
  - keep content serializable and presentation-agnostic
  - no JSX in content files
  - prefer strings/objects over `ReactNode`

### Utilities
- `src/lib`
  - fonts
  - reduced-motion hook
  - class helpers

## Structural rules
- Keep `page.tsx` thin and declarative
- Major page areas belong in `sections`
- Repeated UI patterns belong in `shared`
- Avoid putting business/content data directly inside section components
- Prefer extracting small helper components before adding complexity to a section
- Prefer aliases like `@/components/...` over deep relative imports

## Styling rules
- Tailwind is the default and preferred styling system
- Keep global CSS limited to:
  - theme tokens
  - reset/base styles
  - global selection/scroll behavior
  - rare global utilities
- Do not add SCSS unless there is a clear maintainability reason approved by the team
- If class strings become too long:
  1. extract smaller components
  2. extract shared primitives
  3. only then consider alternative styling abstraction

## Animation rules
- Use GSAP with `useGSAP`
- Register plugins once in the file where used
- Scope animations with refs
- Prefer `revertOnUpdate` where timelines depend on responsive state
- Avoid mixing multiple animation systems
- Respect reduced motion via `usePrefersReducedMotion`
- Avoid animating layout-heavy properties unless necessary
- Prefer `transform` and `opacity` for performant motion
- Be careful with height animations; measure intentionally and avoid nested layout thrash

## Performance rules
- Prefer server components unless interactivity/animation requires client components
- Keep client boundaries as small as practical
- Avoid making entire sections client components if only a small animated/internal part needs it
- Use `next/image` unless there is a strong reason not to
- Avoid `unoptimized` on images without a clear need
- Prefer modern image formats when possible:
  - WebP
  - AVIF
- Optimize large PNGs and videos before shipping
- Fonts should prefer `woff2` over `otf`/`ttf`
- Avoid unnecessary `matchMedia` duplication; centralize responsive hooks if logic grows
- Lazy-load heavy below-the-fold experiences where reasonable
- For video:
  - default to `preload="metadata"`
  - avoid aggressive eager loading
  - use posters/fallbacks
- Watch bundle size when adding libraries

## Accessibility rules
- Use semantic HTML first
- All interactive controls must be keyboard accessible
- Buttons for actions, links for navigation
- Preserve visible focus states
- Never remove focus styles without replacing them accessibly
- Decorative media/layers should use `aria-hidden="true"` and `pointer-events-none` where needed
- Every meaningful image must have useful `alt`
- Empty alt only for decorative images
- Ensure color contrast remains acceptable
- Respect `prefers-reduced-motion`
- Accordion/disclosure UI must maintain correct:
  - `aria-expanded`
  - `aria-controls`
  - region labeling where applicable

## Content rules
- Content files should not contain JSX
- Keep copy centralized in `src/content`
- Section components should render presentation details such as highlighted spans
- Prefer explicit fields like:
  - `heading`
  - `headingHighlight`
  - `cta.label`
  - `cta.href`

## File naming rules
- Sections: `SomethingSection.tsx`
- Shared components: concise UI names like `TextPill.tsx`, `CTAButton.tsx`
- Hooks: `useSomething.ts`
- Content: plain `.ts` files

## Dev environment notes
- Dev server is configured for LAN access on port `3000`
- `next.config.ts` includes allowed dev origins for local network access
- `scripts/clean-next-cache.mjs` clears `.next` before dev/build

## When refactoring
- Preserve existing visual behavior unless the task says otherwise
- Run after meaningful changes:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`
- Prefer incremental refactors over broad rewrites
- Keep imports and component boundaries clean

## What to avoid
- Do not reintroduce JSX into content/data files
- Do not add another styling system casually
- Do not create oversized section components when smaller internal components would help
- Do not add animation libraries besides GSAP
- Do not add global styles for component-local concerns
- Do not ship large unoptimized assets without checking impact

## Senior front-end quality bar
- Code should be readable before clever
- Optimize for maintainability, not just output
- Make responsive behavior explicit
- Make side effects scoped and reversible
- Keep UI primitives reusable and boring
- Keep product copy/data separate from rendering logic
- Prefer predictable component APIs over implicit behavior
