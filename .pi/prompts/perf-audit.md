---
description: Audit front-end performance, bundle size, media cost, and hydration/client-side complexity
argument-hint: "[scope]"
---
Perform a front-end performance audit${@:1:+ for $@}.

Focus on:
- build size and client-side JavaScript cost
- server vs client component boundaries
- GSAP/runtime cost and animation performance
- image, font, and video payloads
- hydration scope and unnecessary client rendering
- mobile interaction/perceived performance risks

Provide:
1. biggest performance risks
2. why they matter
3. highest-ROI fixes first
4. recommended implementation order
5. tradeoffs where relevant
