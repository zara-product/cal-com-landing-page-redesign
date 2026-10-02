"use client";

import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionPrimitive,
} from "@/components/ui/accordion";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

// ─── Content ───────────────────────────────────────────────────────────────────

const FAQS = [
  {
    id: "what-is",
    question: "What is Cal.com and how does it work?",
    answer:
      "Cal.com lets people share when they're available and get booked without the back-and-forth. It can start as a simple booking link, then extend into team scheduling, routing, workflows and more complex scheduling systems.",
  },
  {
    id: "cost",
    question: "Is Cal.com free to use?",
    answer:
      "Cal.com is free forever for individuals. Paid plans add capabilities for teams and organizations, including round robin scheduling, routing, shared availability, administration and enterprise controls. Enterprise pricing is custom.",
  },
  {
    id: "different",
    question: "What makes Cal.com different from other scheduling tools?",
    answer:
      "Cal.com is built for flexibility. You can control how and when you're booked, customize the experience, automate what happens around meetings, route bookings and connect scheduling to the tools and products you already use.",
  },
  {
    id: "teams",
    question: "Can Cal.com work for teams and organizations?",
    answer:
      "Yes. Teams can coordinate availability, distribute meetings and automate workflows, while organizations can add sub-teams, permissions, company-wide routing, SSO and other central controls.",
  },
  {
    id: "embed",
    question: "Can I bring Cal.com into my own product?",
    answer:
      "Yes. Cal.com can be embedded into any product via an iFrame embed or Cal.com Atoms — a set of UI components that let you build a fully native scheduling experience using Cal.com's scheduling infrastructure.",
  },
] as const;

// ─── FAQ trigger — plus/× treatment ──────────────────────────────────────────
// Rotates the plus 45deg on open (becomes ×). No chevron swap — same icon.

function FaqTrigger({ question }: { question: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-md py-5 text-left outline-none transition-all",
          "focus-visible:ring-[3px] focus-visible:ring-ring",
          "data-panel-open:*:data-[slot=faq-indicator]:rotate-45",
        )}
        data-slot="accordion-trigger"
      >
        <span className="text-base font-semibold text-foreground">
          {question}
        </span>
        <PlusIcon
          data-slot="faq-indicator"
          className="pointer-events-none size-4 shrink-0 opacity-80 transition-transform duration-250 ease-out"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function QuestionsSection() {
  return (
    <section aria-label="Questions" className="w-full py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <SectionEyebrow>Questions</SectionEyebrow>
          </div>
          <SectionHeading>
            Got a question about Cal.com? Start here.
          </SectionHeading>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-2xl border-t border-b border-border">
          <Accordion>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <FaqTrigger question={faq.question} />
                <AccordionPanel className="text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA — plain text + single clickable link */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <span className="text-sm text-muted-foreground">
            Still have questions?
          </span>
          <a
            href="https://cal.com/sales"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
          >
            Talk to sales
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
