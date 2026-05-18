---
name: frontend-performance
description: Performance rules and workflow for this Next.js landing page. Use when optimizing bundle size, hydration, GSAP behavior, fonts, images, videos, rendering boundaries, or runtime responsiveness on mobile and desktop.
---

# Frontend Performance

This skill defines how to evaluate and improve front-end performance in this project.

## Primary goals
- Keep initial load lean
- Keep interactions responsive on mobile
- Minimize unnecessary client-side JavaScript
- Optimize media aggressively without hurting perceived quality
- Preserve accessibility and UX while improving speed

## Project-specific priorities
The biggest likely performance costs in this project are:
1. video assets
2. large PNG/hero imagery
3. font formats and font payload
4. GSAP/client-side sections
5. unnecessary hydration scope
6. oversized or overly complex component stylesheets

## Core rules

### Prefer server components by default
- Use server components unless interactivity or animation requires client execution
- Keep client boundaries as small as practical
- If only part of a section animates, consider making the shell server-rendered and the animated part client-side

### Keep JavaScript lean
- Avoid adding libraries casually
- Review bundle impact when adding animation, UI, or utility packages
- Prefer small abstractions over large framework additions
- Watch shared client chunks for section creep

### Media optimization rules
#### Images
- Use `next/image` unless there is a strong reason not to
- Avoid `unoptimized` unless required
- Prefer WebP/AVIF where practical
- Tighten `sizes` to real layout usage
- Do not ship large PNGs if transparency is not required

#### Video
- Default to `preload="metadata"`
- Prefer poster-first UX
- Use responsive variants intentionally
- Avoid eager loading large desktop video where possible
- Consider delayed/lazy initialization for below-the-fold video

#### Fonts
- Prefer `woff2`
- Avoid shipping large `otf`/`ttf` formats in production unless necessary
- Keep font variants minimal
- Preload only what is actually required

### Styling performance rules
- Prefer scoped SCSS modules over broad global selectors
- Keep `src/app/globals.css` small and stable
- Avoid deep selector nesting that is hard to reason about and maintain
- Favor predictable class composition over high-specificity overrides
- Be mindful of expensive paint-heavy effects on large surfaces

### Animation performance rules
- Prefer animating `transform` and `opacity`
- Use `filter` sparingly, especially blur on large surfaces
- Avoid animating large layout trees repeatedly
- Limit scroll-linked animations and scrub complexity on mobile
- Avoid over-staggering content
- For GSAP, scope animations tightly and clean up properly

### Rendering and hydration rules
- Avoid making entire pages client-side for small interactions
- Reduce repeated responsive hooks/listeners when possible
- Centralize repeated `matchMedia` behavior if it grows
- Use dynamic import for heavy below-the-fold client experiences when appropriate

## Performance review checklist
When reviewing a component or section, check:
- Is this a client component because it truly needs to be?
- Are large assets optimized and appropriately sized?
- Are images/videos loaded too early?
- Is GSAP animating only what matters?
- Are expensive CSS properties being animated?
- Are styles scoped and maintainable?
- Are fonts in efficient web formats?
- Is a large dependency being used for a small need?

## Build-analysis workflow
When asked to analyze performance:
1. inspect build output sizes
2. inspect public media sizes
3. identify large fonts/images/videos
4. identify heavy client sections
5. review large or high-complexity stylesheets
6. recommend highest-ROI changes first

## Recommendation priority order
When optimizing this project, prioritize:
1. fonts to `woff2`
2. large images to WebP/AVIF where possible
3. video loading strategy
4. client/server boundary tightening
5. stylesheet simplification where complexity is growing
6. bundle analysis for large chunks

## Tradeoff rule
Do not optimize blindly.
- Preserve clarity and product quality
- Use premium-feeling motion and imagery where it meaningfully improves UX
- Prefer high-value optimization work over micro-optimizations

## Expected output quality
Recommendations should be:
- practical
- prioritized
- specific to this codebase
- explicit about impact vs effort
