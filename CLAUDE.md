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

## Implementation workflow

- When the user provides an approved implementation brief, treat that brief as approval to build.
- Do not re-propose the design or ask for another approval.
- Do one SHORT inspection pass only: read the existing implementation and the minimum directly relevant components needed.
- Then start coding immediately.
- Do not perform open-ended research, browse external references, or inspect unrelated files during implementation.
- Only research when a specific missing fact or asset is genuinely blocking implementation.
- If a non-critical detail cannot be resolved quickly, use a clearly identified V1 treatment and flag it for the refinement pass rather than continuing to research.
- For V1 section builds, prioritise a complete, working implementation over exhaustive optimisation.
- Reuse existing project patterns and coss primitives.
- Do not refactor unrelated code.
- Do not revisit already approved product/design decisions unless implementation exposes a real problem.

## Validation workflow

After implementing each approved section:

1. Run Biome only on files changed for that section.
2. Run the production build/type check.
3. Test the section in the real browser.
4. Verify its primary interaction actually works.
5. Check for runtime/console errors.
6. Capture the requested screenshot.
7. Report:
   - files changed
   - coss components reused
   - custom components created
   - temporary/V1 treatments
   - validation results
8. Stop.

Do not print or explain the entire source code unless requested.

## Research budget

- Do not repeatedly search for a better reference or asset once enough context exists to implement.
- One focused lookup is acceptable for a concrete blocker.
- If that lookup does not resolve a non-critical issue, continue with the V1 and flag it for later.
- Never spend an implementation pass researching optional details.

## Build strategy

- First complete every landing-page section to a solid V1.
- After the full page exists, refine each section for content, visual design, product authenticity, UI detail, responsive behaviour, motion, animation and accessibility.
- Do not attempt final-polish quality while the rest of the page is still missing.

Do not automatically begin the next major section.

## Engineering discipline

- keep components focused
- avoid premature abstraction
- avoid unnecessary dependencies
- do not refactor unrelated code
- keep changes reviewable
- use conventional commit messages
