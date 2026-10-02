"use client";

import { Code2Icon, VideoIcon } from "lucide-react";
import * as React from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type DevTab = "atoms" | "apiv2" | "webhooks";
type CodeToken = { t: string; c: string };
type CodeEntry = { id: string; tokens: CodeToken[] };

const kw = (t: string): CodeToken => ({ t, c: "text-code-keyword" });
const str = (t: string): CodeToken => ({ t, c: "text-code-string" });
const tag = (t: string): CodeToken => ({ t, c: "text-code-tag" });
const att = (t: string): CodeToken => ({ t, c: "text-code-attr" });
const pln = (t: string): CodeToken => ({ t, c: "text-code-plain" });
const dim = (t: string): CodeToken => ({ t, c: "text-code-muted" });

const DEV_CODE: Record<DevTab, CodeEntry[]> = {
  atoms: [
    {
      id: "a0",
      tokens: [
        kw("import"),
        dim(" { "),
        pln("CalProvider"),
        dim(", "),
        pln("Booker"),
        dim(" } "),
        kw("from"),
        dim(" "),
        str('"@calcom/atoms"'),
      ],
    },
    { id: "a1", tokens: [] },
    {
      id: "a2",
      tokens: [
        tag("<CalProvider"),
        dim(" "),
        att("clientId"),
        dim("={"),
        pln("CAL_CLIENT_ID"),
        dim("}>"),
      ],
    },
    {
      id: "a3",
      tokens: [
        dim("  "),
        tag("<Booker"),
        dim(" "),
        att("username"),
        dim("="),
        str('"acme-health"'),
      ],
    },
    {
      id: "a4",
      tokens: [
        dim("      "),
        att("eventSlug"),
        dim("="),
        str('"consult"'),
        dim(" />"),
      ],
    },
    { id: "a5", tokens: [tag("</CalProvider>")] },
  ],
  apiv2: [
    {
      id: "v0",
      tokens: [
        pln("curl"),
        dim(" -X POST "),
        str("https://api.cal.com/v2/bookings"),
        dim(" \\"),
      ],
    },
    {
      id: "v1",
      tokens: [dim("  -H "), str('"Authorization: Bearer $TOKEN"'), dim(" \\")],
    },
    {
      id: "v2",
      tokens: [dim("  -H "), str('"cal-api-version: 2026-02-25"'), dim(" \\")],
    },
    {
      id: "v3",
      tokens: [
        dim("  -H "),
        str('"Content-Type: application/json"'),
        dim(" \\"),
      ],
    },
    {
      id: "v4",
      tokens: [
        dim("  -d '"),
        dim("{"),
        att('"start"'),
        dim(":"),
        str('"2026-10-08T08:00:00Z"'),
        dim(","),
      ],
    },
    {
      id: "v5",
      tokens: [
        dim("    "),
        att('"eventTypeId"'),
        dim(":"),
        pln("42"),
        dim(","),
        att('"attendee"'),
        dim(":{"),
      ],
    },
    {
      id: "v6",
      tokens: [
        dim("    "),
        att('"name"'),
        dim(":"),
        str('"Kai Nakamura"'),
        dim(","),
        att('"email"'),
        dim(":"),
        str('"kai@acme.co"'),
        dim(","),
      ],
    },
    {
      id: "v7",
      tokens: [
        dim("    "),
        att('"timeZone"'),
        dim(":"),
        str('"Asia/Tokyo"'),
        dim("}}}'"),
      ],
    },
  ],
  webhooks: [
    {
      id: "w0",
      tokens: [
        kw("export async function"),
        dim(" "),
        pln("POST"),
        dim("("),
        att("req"),
        dim(": "),
        pln("Request"),
        dim(") {"),
      ],
    },
    {
      id: "w1",
      tokens: [
        dim("  "),
        kw("const"),
        dim(" { "),
        pln("triggerEvent"),
        dim(", "),
        pln("payload"),
        dim(" } = "),
        kw("await"),
        dim(" req.json()"),
      ],
    },
    {
      id: "w2",
      tokens: [
        dim("  "),
        kw("if"),
        dim(" (triggerEvent !== "),
        str('"BOOKING_CREATED"'),
        dim(") "),
        kw("return"),
      ],
    },
    { id: "w3", tokens: [dim("  "), kw("await"), dim(" crm.createVisit({")] },
    {
      id: "w4",
      tokens: [
        dim("    "),
        att("contact"),
        dim(": payload.attendees["),
        pln("0"),
        dim("],"),
      ],
    },
    { id: "w5", tokens: [dim("  })")] },
  ],
};

const DEV_TAB_LABELS: Record<DevTab, string> = {
  atoms: "Atoms",
  apiv2: "API v2",
  webhooks: "Webhooks",
};

const DEV_TAB_FILES: Record<DevTab, string> = {
  atoms: "BookConsult.tsx",
  apiv2: "create-booking.sh",
  webhooks: "api/cal-webhook.ts",
};

const DEV_ORDERED_TABS: DevTab[] = ["atoms", "apiv2", "webhooks"];

// Result card bottom offset per tab — atoms/webhooks have 6 lines vs 8 for apiv2,
// so their code window has empty space at the bottom that the card can overlap.
const TAB_RESULT_BOTTOM: Record<DevTab, string> = {
  atoms: "bottom-10",
  apiv2: "bottom-0",
  webhooks: "bottom-16",
} as const;
const DEV_TIME_SLOTS = ["9:00", "9:30", "10:00"] as const;
const DEV_SELECTED_SLOT = "10:00";

function AtomsResult() {
  return (
    <div className="space-y-1.5 p-2">
      <div className="flex items-center gap-2 rounded-md bg-muted/60 px-2 py-1">
        <div className="flex shrink-0 items-center gap-0.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-foreground/20" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="rounded-full bg-background px-2 py-0.5 text-micro text-muted-foreground">
            acmehealth.com/visits/new
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1">
        <div className="flex items-center gap-1">
          <Code2Icon
            className="size-3 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="font-mono text-2xs text-foreground">
            &lt;Booker /&gt;
          </span>
        </div>
        <span className="text-micro text-muted-foreground">Cal.com Atoms</span>
      </div>

      <div className="flex gap-1.5">
        <div className="flex-1 rounded-md bg-foreground py-1 text-center text-2xs font-semibold text-background">
          Thu 8
        </div>
        <div className="flex-1 rounded-md border border-border py-1 text-center text-2xs text-muted-foreground">
          Fri 9
        </div>
        <div className="flex-1 rounded-md border border-border py-1 text-center text-2xs text-muted-foreground">
          Mon 12
        </div>
      </div>

      <div className="flex gap-1.5">
        {DEV_TIME_SLOTS.map((slot) => (
          <div
            key={slot}
            className={cn(
              "flex-1 rounded-md py-1 text-center text-2xs",
              slot === DEV_SELECTED_SLOT
                ? "border-2 border-foreground font-semibold text-foreground"
                : "border border-border text-foreground",
            )}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiV2Result() {
  return (
    <div className="flex flex-col gap-2 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-micro font-semibold text-success">
          201 Created
        </span>
        <span className="text-micro text-muted-foreground">142 ms</span>
      </div>
      <div className="flex flex-col gap-1 font-mono text-micro">
        <div>
          <span className="text-muted-foreground">status: </span>
          <span className="text-code-value">"accepted"</span>
        </div>
        <div>
          <span className="text-muted-foreground">start (Tokyo): </span>
          <span className="text-foreground">Thu 8 Oct, 17:00</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5">
        <VideoIcon
          className="size-3 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate font-mono text-2xs text-muted-foreground">
          app.cal.com/video/9fJw3xT2pQ
        </span>
      </div>
    </div>
  );
}

function WebhooksResult() {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className="text-xs font-semibold text-foreground">
          BOOKING_CREATED delivered
        </span>
        <span className="ml-auto rounded bg-success/10 px-1.5 py-0.5 text-2xs font-semibold text-success">
          200
        </span>
      </div>
      <p className="text-2xs leading-snug text-muted-foreground">
        Also:{" "}
        <span className="text-foreground/60">
          RESCHEDULED · CANCELLED · MEETING_ENDED
        </span>
      </p>
    </div>
  );
}

export function DevelopersPanel({
  isActive,
  prefersReducedMotion,
  onRestartProgress,
}: {
  isActive: boolean;
  prefersReducedMotion: boolean;
  onRestartProgress: () => void;
}) {
  const [activeDevTab, setActiveDevTab] = React.useState<DevTab>("atoms");
  const [devKey, setDevKey] = React.useState(0);
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      setActiveDevTab("atoms");
      setDevKey((k) => k + 1);
    }
  }, [isActive]);

  const lineCount = DEV_CODE[activeDevTab].length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: devKey is an intentional restart trigger
  React.useEffect(() => {
    if (!isActive) {
      setVisibleLines(0);
      setShowResult(false);
      return;
    }
    setVisibleLines(0);
    setShowResult(false);
    const count = DEV_CODE[activeDevTab].length;
    if (prefersReducedMotion) {
      setVisibleLines(count);
      setShowResult(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * 180));
    }
    timers.push(setTimeout(() => setShowResult(true), count * 180 + 200));
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [activeDevTab, devKey, isActive, prefersReducedMotion]);

  const allLinesVisible = visibleLines >= lineCount;
  const showCursor =
    !prefersReducedMotion && !allLinesVisible && visibleLines > 0;

  return (
    <div
      className={cn(
        !prefersReducedMotion &&
          isActive &&
          "transition-transform duration-450 ease-out",
      )}
      style={
        prefersReducedMotion
          ? undefined
          : { transform: isActive ? "none" : "translateY(6px) scale(0.98)" }
      }
    >
      <div className="relative pb-32 pr-4">
        <Tabs
          value={activeDevTab}
          onValueChange={(v: string) => {
            const tab = v as DevTab;
            setActiveDevTab(tab);
            setDevKey((k) => k + 1);
            onRestartProgress();
          }}
        >
          {/* Code window */}
          <div className="overflow-hidden rounded-xl border border-code-border/60 bg-code-surface shadow-sm">
            {/* Tab + filename bar */}
            <div className="flex items-center border-b border-code-border/60">
              <TabsList
                aria-label="Developer examples"
                className="gap-0 rounded-none bg-transparent p-0 [&_[data-slot=tab-indicator]]:hidden"
              >
                {DEV_ORDERED_TABS.map((tab) => (
                  <TabsTab
                    key={tab}
                    value={tab}
                    className="h-auto rounded-none rounded-t border-none px-3.5 py-2.5 text-xs sm:h-auto sm:text-xs text-code-dim hover:text-code-dim-hover data-active:rounded-t data-active:bg-code-tab-active data-active:text-code-tab-text"
                  >
                    {DEV_TAB_LABELS[tab]}
                  </TabsTab>
                ))}
              </TabsList>
              <span className="ml-auto pr-4 font-mono text-2xs text-code-dim">
                {DEV_TAB_FILES[activeDevTab]}
              </span>
            </div>

            {/* Code lines */}
            <div className="min-h-[196px] px-4 py-4" aria-hidden="true">
              {DEV_CODE[activeDevTab].map((entry, i) => (
                <div
                  key={entry.id}
                  className={cn(
                    "flex",
                    !prefersReducedMotion &&
                      "transition-opacity duration-150 ease-out",
                  )}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: i < visibleLines ? 1 : 0 }
                  }
                >
                  <span className="w-7 select-none pr-3 text-right font-mono text-xs leading-[1.7] text-code-line-number">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre font-mono text-xs leading-[1.7]">
                    {entry.tokens.map((tok, j) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: syntax tokens static per line
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                    {showCursor && i === visibleLines - 1 && (
                      <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[1px] animate-pulse bg-code-cursor" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Result cards — positioned per tab so atoms/webhooks overlap the empty
              bottom of the code window; apiv2 sits in the pb-32 space below */}
          {DEV_ORDERED_TABS.map((tab) => (
            <TabsPanel
              key={tab}
              value={tab}
              className={cn(
                "pointer-events-none absolute right-0 z-10 w-[62%]",
                TAB_RESULT_BOTTOM[tab],
                !prefersReducedMotion &&
                  "transition-[opacity,transform] duration-450 ease-out",
              )}
              style={
                prefersReducedMotion
                  ? { opacity: showResult ? 1 : 0 }
                  : {
                      opacity: showResult ? 1 : 0,
                      transform: showResult
                        ? "translateY(0)"
                        : "translateY(8px)",
                    }
              }
            >
              <div className="pointer-events-auto overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                {tab === "atoms" && <AtomsResult />}
                {tab === "apiv2" && <ApiV2Result />}
                {tab === "webhooks" && <WebhooksResult />}
              </div>
            </TabsPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
