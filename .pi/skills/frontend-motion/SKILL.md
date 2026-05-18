---
name: frontend-motion
description: Project-specific motion system for this Next.js landing page. Use when implementing, refactoring, reviewing, or tuning animations, hover states, scroll motion, accordion interactions, GSAP timelines, or responsive motion behavior.
---

# Frontend Motion

This skill defines the animation standards for this project.

## Project motion stack
- Use **GSAP** only
- Use **`@gsap/react` `useGSAP`** for React integration
- Do not introduce Framer Motion, Motion One, CSS-only animation systems for major interactions, or other animation libraries unless explicitly requested

## Primary goals
- Motion should feel premium, restrained, and intentional
- Motion should improve clarity, not decoration for its own sake
- Motion must remain smooth on mobile devices
- Motion must respect reduced-motion preferences
- Motion must not hurt interaction responsiveness

## Implementation rules

### Use GSAP correctly
- Prefer `useGSAP` over raw `useEffect`/`useLayoutEffect` for GSAP lifecycles
- Scope animations with refs
- Use `revertOnUpdate: true` when timelines depend on responsive state or changing dependencies
- Keep animation setup local to the component that owns the DOM
- Extract complex timeline logic if a section becomes difficult to read

### Prefer performant properties
Use these first:
- `transform`
- `opacity`
- `autoAlpha`
- `filter` only when visually justified and not overused

Avoid or minimize:
- animating `width`
- animating `height` unless the interaction requires real collapse/expand behavior
- animating large layout trees repeatedly
- triggering layout thrash from nested measured animations

### Scroll animations
- Use `ScrollTrigger` for scroll-linked motion
- Keep scrub values moderate and intentional
- Avoid too many simultaneous scroll triggers in one viewport
- Do not over-animate every element in a section
- For section storytelling, animate groups, not every small child individually

### Hover and microinteraction motion
- Keep hover motion subtle
- Prefer short durations and small offsets
- Hover should feel responsive, not floaty
- Cursor feedback and motion should reinforce clickability

### Accordion/disclosure motion
- Expansion should feel smooth but not slow
- If height animation is used, measure intentionally
- Avoid parent/child collapse race conditions
- Trigger secondary effects like snap scroll only after expansion is complete when required

## Timing guidelines
These are defaults, not hard laws.

### Microinteractions
- hover/focus: `0.12s`–`0.24s`
- button/icon transitions: `0.14s`–`0.22s`

### Reveal/enter motion
- small reveal: `0.35s`–`0.65s`
- stagger delay: keep light, usually `0.04s`–`0.08s`

### Larger section motion
- content block movement: `0.4s`–`0.9s`
- scrubbed scroll motion: smooth, restrained, avoid exaggerated travel

### Accordion motion
- nested answer open: usually slower than close only if readability benefits
- category open: should feel smooth, not delayed
- close should usually be slightly faster than open

## Easing guidelines
Prefer:
- `power2.out`
- `power3.out`
- `power2.inOut`
- `sine.inOut` for looping subtle motion

Avoid:
- overly elastic/bouncy easing unless specifically requested
- inconsistent easing across similar interactions

## Reduced motion rules
Always account for reduced motion.
- Use the project hook: `@/lib/usePrefersReducedMotion`
- For reduced motion:
  - disable non-essential looping animation
  - remove parallax/scrub-heavy motion
  - prefer instant or nearly instant state changes
  - preserve clarity of UI state changes

## Mobile rules
- Mobile motion must be lighter than desktop when needed
- Avoid excessive blur and large animated distances on mobile
- Keep interactions responsive under touch
- Decorative motion should never block taps or scrolling
- Non-interactive overlays should use `pointer-events-none`

## Accessibility rules
- Motion must not block interaction
- Interactive elements must remain keyboard accessible
- Do not rely on motion alone to communicate state
- Accordions must keep correct ARIA attributes
- Focus states must remain visible during and after animation

## Codebase-specific rules
- `src/app/page.tsx` should stay composition-only
- Section-level motion belongs in `src/components/sections`
- Shared repeated animation patterns belong in `src/components/shared`
- Keep content/data in `src/content` presentation-agnostic
- If motion requires content-specific markup changes, keep those changes in section components, not content files

## When reviewing existing animations
Check for:
- unnecessary client-side scope
- repeated `matchMedia` listeners
- layout-janky height animations
- inconsistent durations/easing
- mobile interactions blocked by decorative layers
- missing reduced-motion behavior
- oversized animation distances

## When asked to improve an animation
Default workflow:
1. Identify the interaction goal
2. Reduce complexity before adding more motion
3. Prefer transforms/opacity over layout mutation
4. Tune timing and easing conservatively
5. Verify mobile interaction and reduced-motion behavior
6. Run typecheck/lint/build after meaningful code changes

## Project quality bar
Good motion in this project should feel:
- polished
- modern
- restrained
- fast enough to feel responsive
- smooth on mobile
- consistent across sections

If a requested animation conflicts with performance, accessibility, or clarity, prefer the simpler implementation and explain the tradeoff.
