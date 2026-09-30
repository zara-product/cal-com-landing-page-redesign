@AGENTS.md

# Cal.com landing page redesign

This repository contains a focused redesign of the Cal.com landing-page experience.

Before substantial implementation work:
- follow the Next.js guidance imported from `AGENTS.md`
- read the relevant approved files in `.claude/context/`
- use the installed coss skill as the source of truth for coss components and conventions

Approved design decisions live in `.claude/context/`.
Do not silently change approved product, copy, information architecture, or interaction decisions.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- coss UI
- Base UI through coss UI
- Biome
- Bun

Do not introduce another component library.
Ask before adding a dependency.

## UI system

Prefer, in order:

1. existing coss UI component
2. composition of existing coss components
3. small project-specific component
4. custom primitive only when the existing system cannot support the required behaviour

Use coss semantic tokens and established conventions before introducing custom values.

Do not create a parallel design system.

## Design system and component ownership

coss UI is the foundation for this project.

Use existing coss primitives when they correctly solve the interaction. Do not recreate an existing coss primitive locally. Do not install, copy, or import components from another public UI or component library.

If a required component or interaction pattern does not exist in coss, design and engineer it ourselves using:
1. existing coss primitives where relevant;
2. Base UI or native browser primitives for behaviour and semantics;
3. existing coss semantic tokens for colour, typography, spacing, radius, states and focus.

New components should be reusable when the pattern is reusable. A new component should look and behave as though it could reasonably belong in coss.

Do not introduce raw hex colours when an appropriate semantic token exists. Do not create unnecessary new colour token names, a parallel spacing scale, arbitrary radii, or a separate elevation/shadow system. Custom shadows require an explicit visual reason.

Custom surfaces must use semantic tokens rather than hard-coded light-theme values so they remain compatible with the system and dark mode.

## Project structure

Keep the architecture proportional to a single landing page.

- `app/` — routes and page composition
- `components/ui/` — coss UI components
- `components/sections/` — page-level sections
- `components/hero/` — hero-specific interactive components, if needed
- `content/` — verified static marketing content, if needed
- `lib/` — shared logic only when genuinely shared logic exists

Do not create speculative architecture.

Use client components only where client-side behaviour requires them.

## Product integrity

Never invent:
- Cal.com functionality
- product claims
- metrics
- customer logos
- testimonials
- quotes
- implementation syntax presented as real Cal.com code

If real Cal.com behaviour is unclear, surface the assumption before implementing it.

Do not rewrite approved copy without discussion.

## Accessibility

Prefer native semantic HTML.

Interactive UI must:
- work with keyboard input
- expose visible focus states
- maintain appropriate contrast
- remain understandable without animation
- respect `prefers-reduced-motion`

Use ARIA only when native semantics are insufficient.

## Responsive quality

Explicitly review:
- 1440px
- 1024px
- 768px
- 390px

Responsive behaviour should be intentionally designed rather than mechanically stacking the desktop layout.

## Motion

Use motion only when it communicates cause and effect, state change, continuity, or hierarchy.

Prefer CSS transitions for simple states.

Do not add an animation dependency unless the approved interaction requires capabilities that justify it.

## Quality gates

Before considering an approved slice complete:

1. run `bun run lint`
2. run `bun run build`
3. resolve errors introduced by the change
4. check the browser console
5. review the defined responsive widths
6. verify keyboard behaviour where applicable

`bun run build` currently includes the project's TypeScript compilation check.

## Workflow

Before a major new slice or architectural change:

1. inspect the existing implementation and reusable components
2. explain the proposed approach
3. identify assumptions or risks
4. wait for approval

After approval, complete the agreed slice autonomously.

Do not stop after every individual file change.

When the slice is complete, report:
- what changed
- what was reused
- any deliberate deviation from the approved specification
- anything still requiring design review

Then stop.

Do not automatically begin the next major section.

## Engineering discipline

- keep components focused
- avoid premature abstraction
- avoid unnecessary dependencies
- do not refactor unrelated code
- keep changes reviewable
- use conventional commit messages
