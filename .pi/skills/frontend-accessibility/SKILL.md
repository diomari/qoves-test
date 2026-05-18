---
name: frontend-accessibility
description: Accessibility rules and review workflow for this Next.js landing page. Use when building or reviewing interactive UI, animations, keyboard behavior, accordions, buttons, links, focus states, semantics, contrast, and reduced-motion support.
---

# Frontend Accessibility

This skill defines the accessibility quality bar for this project.

## Primary goals
- Ensure all core interactions are usable by keyboard and assistive technology
- Preserve visual clarity and focus visibility
- Ensure motion does not harm usability
- Keep semantics correct and intentional

## Core rules

### Semantic HTML first
- Use `button` for actions
- Use `a`/`Link` for navigation
- Use headings in a logical hierarchy
- Use landmarks and sectioning meaningfully
- Avoid div-only interaction patterns unless absolutely necessary

### Keyboard accessibility
- Every interactive element must be reachable and operable by keyboard
- Preserve visible focus styles
- Do not remove focus rings without an accessible replacement
- Hover-only behavior must not hide functionality from keyboard users

### Focus management
- Focus should remain stable during animation
- Expanding/collapsing content must not create confusing focus jumps
- Avoid motion that makes focused UI difficult to track

### ARIA usage
Use ARIA only when needed, but correctly.
For accordions/disclosures, maintain:
- `aria-expanded`
- `aria-controls`
- meaningful region labeling where appropriate

Do not add ARIA redundantly when native semantics already provide the behavior.

### Images and media
- Informative images need meaningful `alt`
- Decorative images should use empty alt or `aria-hidden` as appropriate
- Decorative overlays/media layers should not intercept input
- Autoplaying media must not be the only way information is conveyed

### Motion and reduced motion
- Respect `prefers-reduced-motion`
- Remove or greatly reduce non-essential animation when reduced motion is enabled
- Do not rely on motion alone to communicate state changes
- Keep accordion, scroll, and hover motion readable and non-disorienting

### Color and contrast
- Ensure text contrast is acceptable against all backgrounds, including gradients and overlays
- Review subdued text carefully, especially on media-heavy surfaces
- Focus states must remain visible in light and dark contexts

### Touch and mobile accessibility
- Tap targets should be large enough
- Decorative layers must not block taps
- Interactions must remain responsive under touch
- Horizontal scroll areas should remain understandable and usable

## Project-specific review areas
Check carefully in this project:
- FAQ accordion behavior
- CTA buttons and interactive links
- hero/media sections with decorative overlays
- GSAP-based animated sections
- reduced-motion handling across storytelling sections

## Accessibility review workflow
When asked to review or implement UI:
1. verify semantics
2. verify keyboard access
3. verify focus visibility
4. verify ARIA for custom disclosure patterns
5. verify reduced-motion support
6. verify overlays do not block interaction
7. verify alt text and decorative media handling

## What to avoid
- clickable `div`s in place of buttons
- relying only on hover to expose important meaning
- hidden focus states
- decorative content intercepting pointer/touch input
- animation-driven state with no non-motion fallback

## Expected output quality
Accessibility recommendations should be:
- concrete
- implementation-aware
- compatible with the project’s visual goals
- balanced between usability and product design
