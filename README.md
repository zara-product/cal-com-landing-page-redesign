# Cal.com homepage redesign

A product-led redesign of the Cal.com homepage, exploring how the experience can preserve the simplicity of individual scheduling while revealing the product's depth across teams, organisations and developer use cases.

> **Preserve the simplicity of entering Cal.com. Reveal the power of growing with Cal.com.**

## Live demo

[View the live redesign](https://cal-com-landing-page-redesign.vercel.app/)

## The opportunity

Cal.com is immediately understandable as a simple scheduling product, but its broader capabilities — team coordination, routing, workflows, organisational controls and developer infrastructure — are harder to understand from the homepage hierarchy.

I focused the redesign on making that progression clearer without turning Cal.com into something visually unfamiliar.

The product story progresses through:

**Individuals → Teams → Organisations → Developers**

Rather than presenting those as disconnected feature groups, the experience shows how scheduling can become more sophisticated while the product remains approachable.

## What I changed

- Reworked the information architecture around a clearer progression from individual scheduling to more complex use cases.
- Redesigned the hero around four working product demonstrations for Individuals, Teams, Organisations and Developers.
- Preserved Cal.com's neutral, product-led visual language rather than treating the exercise as a rebrand.
- Positioned Simple Scheduling as the entry point, then progressively introduced routing, automation, team coordination, organisational controls and developer tooling.
- Used interaction and motion to explain product behaviour, including round-robin assignment, routing logic, booking states and developer workflows.
- Refined social proof, integrations, FAQs and conversion points to support the page narrative.
- Implemented the redesign as a responsive working webpage rather than stopping at static design.

## Design-system approach

The implementation stays within the project's existing Cal.com / coss UI direction and Base UI foundation.

I prioritised:

- existing design tokens and primitives;
- reusable patterns rather than one-off UI;
- consistent spacing, states, borders, radii and motion;
- semantic links and controls;
- keyboard and focus behaviour;
- reduced-motion support;
- responsive behaviour across desktop and smaller screens;
- avoiding unnecessary third-party component libraries.

## Motion with intent

Motion is used to explain state and product logic rather than as decoration.

Examples include:

- booking selection and confirmation;
- round-robin team assignment;
- attribute-based organisation routing;
- developer code-to-result flows;
- Simple Scheduling step transitions.

Where reduced motion is preferred, animated sequences resolve directly to their completed state.

## Built with

- Next.js
- React
- TypeScript
- Tailwind CSS
- coss UI
- Base UI
- Claude Code

## Run locally

```bash
bun install
bun dev
```
