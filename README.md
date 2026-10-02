# Cal.com homepage redesign

A product-led redesign of Cal.com's homepage, completed as part of a Senior Product Design Engineer trial task.

**Live site:** https://cal-com-landing-page-redesign.vercel.app/

> **Preserve the simplicity of entering Cal.com. Reveal the power of growing with Cal.com.**

## What I found

From auditing the current homepage and product surfaces, I found that Cal.com communicates the individual scheduling use case very strongly.

What is less immediate is the depth behind that entry point. Team distribution, routing, workflows, organizational controls and developer infrastructure are all part of the product, but they take more effort to discover and understand as a connected story.

The opportunity was not to add more information.

It was to surface more of Cal.com's value without making the product feel more complicated.

I approached this as a **redesign, not a rebrand**.

## Before → after

**Before:** the homepage makes simple scheduling easy to understand, while deeper product value takes more effort to discover.

**After:** the entry point stays simple, but different types of users can recognize Cal.com's relevance earlier, while deeper capability is progressively revealed through the page.

## Information architecture

I worked through the page story before designing individual sections.

The structure became:

**Relevance → simplicity → deeper value → ease of adoption → proof → questions → conversion**

Conversion is also available from the beginning for users who already know what they want.

The goal was to let someone understand more of Cal.com progressively rather than asking them to learn the whole product at once.

## Hero — help more users recognise themselves

The hero needed to stay simple while allowing different kinds of Cal.com users to arrive and quickly think:

**"Okay, this is talking to me too."**

I introduced four lightweight audience views:

**Individuals · Teams · Organizations · Developers**

These are not the information architecture of the page. They are a compact way to signal the breadth of Cal.com without turning the hero into a heavy product explanation.

Each view demonstrates a product behavior:

- Individuals — selecting and confirming a booking.
- Teams — round-robin meeting distribution.
- Organizations — one shared view of scheduling across teams.
- Developers — Atoms, API and webhook flows producing a scheduling outcome.

The headline stays deliberately simple while the interaction carries more of the product depth.

## Conversion strategy

The existing hero offers different signup methods, but they ultimately serve the same self-serve intent.

I asked whether the two primary CTA positions could instead serve two meaningfully different user intents:

**Sign up for free** — for someone ready to start immediately.  
**Book a demo** — for a team or organization that may need a higher-consideration path.

The global navigation also does not expose a prominent Book a demo or sales action, so the hero became a useful place to surface that path without adding another navigation item.

The more specific signup options then appear at the end of the page:

**Sign up with Google**  
**Sign up with email**

At that point, someone has already moved through the product story and decided they want to start.

I would still treat this CTA change as a **conversion hypothesis**. With real conversion data, I would test it against Cal.com's existing one-click signup approach rather than assume the new version performs better.

## Why I used motion

Motion became a way to compress explanation.

A round-robin workflow, for example, could require several static states, more copy, or another section entirely.

Instead, a short sequence can show:

**available team → distribution logic → selected host**

The same applies to booking confirmation, organizational routing and developer workflows.

The intention was to let someone understand deeper product value by watching it happen instead of asking them to study Cal.com.

This allowed me to communicate more without making the homepage significantly denser.

Motion is focused on product state and logic rather than decoration. Reduced-motion preferences resolve those sequences directly into their completed states.

## Simple Scheduling — make starting feel easy

After the hero establishes relevance, the next thing I wanted someone to understand was:

**Cal.com is easy to start with.**

The experience reduces back to three steps:

1. Connect your calendar.
2. Set your availability.
3. Choose how to meet.

For me, this section communicates:

**This is where Cal.com starts, not what Cal.com is limited to.**

The product can become much more capable without making the starting experience feel complicated.

## Scheduling that grows with you — reveal deeper value

Once the simple entry point is established, the page can reveal what happens as scheduling needs become more complex.

That includes:

- routing;
- payments;
- workflows and automation;
- team distribution;
- organizational controls;
- embedded scheduling.

The intention was not to create another flat feature list.

It was to show how the same product can move from a simple booking link into something capable of handling increasingly complex scheduling problems.

## Integrations — make adoption feel easy

The integrations section has a different role.

After showing that Cal.com can be both simple and powerful, it reassures someone that adopting it does not mean rebuilding the way they already work.

Calendars, meeting platforms, communication tools and CRMs can continue to sit around the scheduling experience.

The message is:

**Cal.com can work with the stack you already have.**

## Proof and questions

Testimonials, review scores and Wall of Love provide external validation after the product story has been established.

The FAQ then resolves remaining practical questions rather than introducing the product.

## What I deliberately kept

I did not want to change Cal.com simply to make the redesign look different.

I retained its:

- neutral, monochrome visual language;
- product-led UI;
- typography direction;
- restrained borders and radii;
- rail and grid language;
- coss ui direction;
- distinction between self-serve and sales.

I also deliberately kept the global navigation structure.

The navigation connects a wider information architecture than this homepage. Redesigning it responsibly would require auditing the destinations behind those links and understanding how they relate across the wider site.

Without that work, changing it would have been a visual redesign of a system I had not fully investigated.

## Design engineering

I implemented the redesign as a working responsive Next.js experience rather than stopping at static designs.

The implementation uses:

- Next.js
- React
- TypeScript
- Tailwind CSS
- coss ui
- Base UI

I worked within the existing component and primitive foundation rather than introducing another UI library.

The final implementation pass included checks for:

- semantic links and controls;
- keyboard and focus behavior;
- reduced-motion support;
- responsive behavior;
- design-token consistency;
- dead and placeholder code;
- TypeScript and production build errors.

## Quality pass after submission

After submitting, I audited the project against the role's expectations and tightened it:

- **Responsive:** checked at 320, 375, 390, 768, 1024 and 1440px with no horizontal overflow. The hero demo has its own small-screen layout.
- **System:** type scale, motion timings and colors are defined as tokens. Section headings share one component. The auto-advancing showcases in the hero and Simple Scheduling are built on coss Tabs (Base UI), following the W3C tabbed-carousel pattern, with the autoplay and progress behavior layered on top.
- **Accuracy:** the developer samples follow Cal.com's API v2 and webhook documentation.
- **Accessibility:** inactive panels are inert, text meets 4.5:1 contrast with an 11px minimum, and reduced motion resolves every sequence to its final state.
- **Codebase:** only the coss components in use are kept, the hero and setup panels live in focused files, and lint and the production build pass on a fresh clone.
- **Handoff:** the hero is a marketing illustration with example content. To ship it, I would move that content into props and propose the autoplay-with-progress showcase to coss as a shared pattern.

## Process

I used:

- ChatGPT for research synthesis, documentation and working through the information architecture;
- Lovable and Figma for visual exploration and direction-setting;
- ChatGPT image generation for supporting visual assets;
- Claude Code for frontend implementation and refinement directly in code.

The information architecture came before the visual redesign.

I worked through what the homepage needed someone to understand, what Cal.com already communicates effectively, where deeper value should surface, what should remain simple, and which ideas could be demonstrated through interaction rather than explained with more copy.

That strategy then informed the content hierarchy, interaction design, motion and implementation.

## What I would test next

I would treat this as the first iteration of a product hypothesis rather than a finished answer.

The first thing I would test is whether people beyond the individual scheduling use case recognise Cal.com's relevance to them quickly.

For example:

- Does someone managing a team immediately understand that Cal.com can coordinate and distribute meetings?
- Does an organizational user recognize routing, controls and scheduling standards as relevant to how they operate?
- Does a developer quickly understand that Cal.com can become scheduling infrastructure inside their own product?

I would also test:

- whether the progression from simple entry to deeper capability increases understanding without increasing perceived complexity;
- whether the hero interactions help different audiences recognise themselves;
- whether motion improves comprehension compared with static explanation;
- whether the hero CTA split between self-serve and sales performs better or worse than the current signup options;
- movement from product understanding into signup or sales;
- where users still need more or less information.

Those findings would shape the next iteration.

## Run locally

```bash
bun install
bun dev
```
