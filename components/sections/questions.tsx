import { ArrowRightIcon } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Content ───────────────────────────────────────────────────────────────────

const FAQS = [
  {
    id: "what-is",
    question: "What is Cal.com and how does it work?",
    answer:
      "Cal.com lets people share when they're available and get booked without the back-and-forth. It can start as a simple booking link, then extend into team scheduling, routing, workflows and more complex scheduling systems.",
  },
  {
    id: "different",
    question: "What makes Cal.com different?",
    answer:
      "Cal.com is built for flexibility. You can control how and when you're booked, customise the experience, automate what happens around meetings, route bookings and connect scheduling to the tools and products you already use.",
  },
  {
    id: "cost",
    question: "How much does Cal.com cost?",
    answer:
      "Cal.com is free forever for individuals. Paid plans add capabilities for teams and organisations, including round robin scheduling, routing, shared availability, administration and enterprise controls. Enterprise pricing is custom.",
  },
  {
    id: "teams",
    question: "Can Cal.com work for my team or organisation?",
    answer:
      "Yes. Teams can coordinate availability, distribute meetings and automate workflows, while organisations can add sub-teams, permissions, company-wide routing, SSO and other central controls.",
  },
  {
    id: "use-cases",
    question: "What kinds of teams and use cases is Cal.com built for?",
    answer:
      "Cal.com supports scheduling across sales, support, healthcare, recruiting and other team workflows — from routing an inbound lead to coordinating several people or embedding scheduling inside another product.",
  },
] as const;

// ─── Section ───────────────────────────────────────────────────────────────────

export function QuestionsSection() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-foreground" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest uppercase text-foreground">
              Questions
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-[1.05] tracking-tight">
            The questions we hear most.
          </h2>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-2xl border-t border-b border-border">
          <Accordion>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base font-semibold py-5 text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel className="text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer link */}
        <div className="flex justify-center mt-10">
          <a
            href="https://cal.com/sales"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
          >
            Still have questions? Talk to sales
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
