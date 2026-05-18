---
description: Review accessibility of the current implementation with focus on semantics, keyboard support, focus, and motion
argument-hint: "[scope]"
---
Run an accessibility review${@:1:+ for $@}.

Focus on:
- semantic HTML correctness
- button vs link usage
- keyboard accessibility
- focus visibility and interaction flow
- accordion/disclosure ARIA behavior
- reduced-motion handling
- images, decorative media, and alt text
- overlays or animations that may block interaction
- mobile/touch accessibility concerns

Provide:
1. critical issues
2. important improvements
3. implementation recommendations
4. any quick wins that should be fixed immediately
