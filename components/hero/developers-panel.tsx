"use client";

import { Code2Icon, VideoIcon } from "lucide-react";
import * as React from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import type {
  ApiV2ResultContent,
  AtomsResultContent,
  DevContent,
  DevTabKey,
  WebhooksResultContent,
} from "@/content/hero";
import { cn } from "@/lib/utils";

// Result card bottom offset per tab — atoms/webhooks have 6 lines vs 8 for apiv2,
// so their code window has empty space at the bottom that the card can overlap.
const TAB_RESULT_BOTTOM: Record<DevTabKey, string> = {
  atoms: "bottom-10",
  apiv2: "bottom-0",
  webhooks: "bottom-16",
} as const;

function AtomsResult({ content }: { content: AtomsResultContent }) {
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
            {content.browserUrl}
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
        <span className="text-micro text-muted-foreground">
          {content.atomsBadgeLabel}
        </span>
      </div>

      <div className="flex gap-1.5">
        {content.dates.map((date, i) => (
          <div
            key={date}
            className={cn(
              "flex-1 rounded-md py-1 text-center text-2xs",
              i === 0
                ? "bg-foreground font-semibold text-background"
                : "border border-border text-muted-foreground",
            )}
          >
            {date}
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        {content.timeSlots.map((slot) => (
          <div
            key={slot}
            className={cn(
              "flex-1 rounded-md py-1 text-center text-2xs",
              slot === content.selectedSlot
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

function ApiV2Result({ content }: { content: ApiV2ResultContent }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-micro font-semibold text-success">
          {content.statusCode}
        </span>
        <span className="text-micro text-muted-foreground">
          {content.responseTime}
        </span>
      </div>
      <div className="flex flex-col gap-1 font-mono text-micro">
        <div>
          <span className="text-muted-foreground">status: </span>
          <span className="text-code-value">"{content.status}"</span>
        </div>
        <div>
          <span className="text-muted-foreground">{content.startLabel}: </span>
          <span className="text-foreground">{content.startValue}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5">
        <VideoIcon
          className="size-3 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate font-mono text-2xs text-muted-foreground">
          {content.videoLink}
        </span>
      </div>
    </div>
  );
}

function WebhooksResult({ content }: { content: WebhooksResultContent }) {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className="text-xs font-semibold text-foreground">
          {content.deliveredEvent}
        </span>
        <span className="ml-auto rounded bg-success/10 px-1.5 py-0.5 text-2xs font-semibold text-success">
          {content.statusCode}
        </span>
      </div>
      <p className="text-2xs leading-snug text-muted-foreground">
        Also: <span className="text-foreground/60">{content.alsoEvents}</span>
      </p>
    </div>
  );
}

export function DevelopersPanel({
  isActive,
  prefersReducedMotion,
  onRestartProgress,
  content,
}: {
  isActive: boolean;
  prefersReducedMotion: boolean;
  onRestartProgress: () => void;
  content: DevContent;
}) {
  const [activeDevTab, setActiveDevTab] = React.useState<DevTabKey>("atoms");
  const [devKey, setDevKey] = React.useState(0);
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      setActiveDevTab("atoms");
      setDevKey((k) => k + 1);
    }
  }, [isActive]);

  const lineCount = content.tabs[activeDevTab].code.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: devKey is an intentional restart trigger
  React.useEffect(() => {
    if (!isActive) {
      setVisibleLines(0);
      setShowResult(false);
      return;
    }
    setVisibleLines(0);
    setShowResult(false);
    const count = content.tabs[activeDevTab].code.length;
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
            const tab = v as DevTabKey;
            setActiveDevTab(tab);
            setDevKey((k) => k + 1);
            onRestartProgress();
          }}
        >
          {/* Code window */}
          <div className="overflow-hidden rounded-2xl border border-code-border/60 bg-code-surface shadow-sm">
            {/* Tab + filename bar */}
            <div className="flex items-center border-b border-code-border/60">
              <TabsList
                aria-label="Developer examples"
                className="gap-0 rounded-none bg-transparent p-0 [&_[data-slot=tab-indicator]]:hidden"
              >
                {content.orderedTabs.map((tab) => (
                  <TabsTab
                    key={tab}
                    value={tab}
                    className="h-auto rounded-none rounded-t border-none px-3.5 py-2.5 text-xs sm:h-auto sm:text-xs text-code-dim hover:text-code-dim-hover data-active:rounded-t data-active:bg-code-tab-active data-active:text-code-tab-text"
                  >
                    {content.tabs[tab].label}
                  </TabsTab>
                ))}
              </TabsList>
              <span className="ml-auto pr-4 font-mono text-2xs text-code-dim">
                {content.tabs[activeDevTab].filename}
              </span>
            </div>

            {/* Code lines */}
            <div className="min-h-[196px] px-4 py-4" aria-hidden="true">
              {content.tabs[activeDevTab].code.map((entry, i) => (
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
          {content.orderedTabs.map((tab) => (
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
              <div className="pointer-events-auto overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {tab === "atoms" && (
                  <AtomsResult content={content.atomsResult} />
                )}
                {tab === "apiv2" && (
                  <ApiV2Result content={content.apiv2Result} />
                )}
                {tab === "webhooks" && (
                  <WebhooksResult content={content.webhooksResult} />
                )}
              </div>
            </TabsPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
