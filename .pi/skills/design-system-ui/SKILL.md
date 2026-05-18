---
name: design-system-ui
description: UI consistency and reusable component standards for this Next.js landing page. Use when creating or refactoring shared UI, section headings, cards, buttons, surfaces, spacing systems, text hierarchy, or repeated layout patterns.
---

# Design System UI

This skill defines the UI consistency rules for the project.

## Primary goals
- Keep the UI visually consistent across sections
- Prefer reusable primitives over repeated custom markup
- Reduce drift in spacing, typography, surfaces, and interactions
- Keep section-level composition clean and maintainable
- Keep component styles local, predictable, and easy to scan

## Architecture rules
- Major page composition belongs in `src/components/sections`
- Reusable UI belongs in `src/components/shared`
- Prefer folder-per-component organization for sections and shared UI
- Prefer colocated `*.module.scss` files for component-local styling
- Keep `src/app/globals.css` for tokens/base behavior, not component styling
- If a pattern appears multiple times, consider extracting it
- Extract for clarity, not abstraction for its own sake

## What belongs in shared
Typical candidates:
- pills / badges
- buttons / links
- section wrappers
- section intros
- shared card surfaces
- carousel cards
- repeated text blocks with consistent hierarchy

## What should remain local to a section
- highly custom one-off decorative markup
- animation-specific wrapper structures that are unique to one section
- section-only composition logic
- styles that only exist to support one section layout

## Visual consistency rules

### Typography
- Keep heading hierarchy predictable
- Reuse size/weight patterns where possible
- Avoid one-off text sizing unless it is intentional and justified
- Muted text treatments should remain visually consistent across sections

### Spacing
- Prefer a small set of spacing rhythms
- Similar section intros should share similar vertical spacing
- Avoid arbitrary spacing drift between sections unless there is a clear design reason

### Surfaces and cards
- Reuse surface logic for:
  - glass panels
  - bordered cards
  - muted informational cards
- Border radius, shadow, and translucency should feel related across the page

### CTA behavior
- Primary action styling should stay consistent
- Hover and focus behavior should feel like the same product language
- Avoid multiple competing primary button styles unless there is a hierarchy reason

### Color usage
- Accent color usage should feel deliberate
- Decorative gradients should support hierarchy, not fight it
- Repeated semantic roles should map to consistent color treatments

## SCSS module guidance
- Prefer flat, readable class structures over deep nesting
- Name classes by responsibility, not by HTML tag alone
- Keep modifier classes explicit and predictable
- Avoid leaking component styles into globals
- If a stylesheet becomes hard to scan, split the component before adding more selectors

## Refactor workflow
When asked to improve maintainability of UI:
1. identify repeated structures
2. decide if the pattern is truly shared
3. extract a focused primitive with a clean API
4. colocate or simplify the related SCSS module
5. keep section composition readable
6. avoid over-generalizing the primitive too early

## Quality bar for shared components
A shared component should be:
- genuinely reused or clearly reusable
- easy to understand
- visually consistent with the rest of the UI
- small in API surface
- not tightly coupled to one section’s content

## What to avoid
- creating shared components for one-off markup too early
- burying layout logic in overly generic primitives
- inconsistent naming between section and shared components
- scattered visual variants with no clear system
- reintroducing utility-class-heavy styling patterns

## Good outcomes
A good refactor should make the project feel:
- more consistent
- easier to extend
- easier to scan
- less repetitive
without making the code harder to understand.
