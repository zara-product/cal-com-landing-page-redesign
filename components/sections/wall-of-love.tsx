"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface WallCard {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
  platform?: string;
  quote: string;
}

interface ColumnConfig {
  id: string;
  delay: string;
  height?: number;
  maskTop?: number; // percent, default 13
  cards: WallCard[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLUMNS: ColumnConfig[] = [
  {
    id: "col-1",
    delay: "-8s",
    height: 860,
    maskTop: 10,
    cards: [
      {
        id: "rotimi",
        name: "Rotimi Best",
        avatar: "https://github.com/rotimi-best.png?size=400",
        username: "rotimi_best",
        platform: "X",
        quote:
          "for the love of me, why do people still use Calendly? Just today I have seen products reference Calendly while they know of @calcom It's a no brainer for me to use , their brand is amazing, cool team + they even have more compelling features 🥳",
      },
      {
        id: "jeroen",
        name: "Jeroen C.",
        platform: "G2",
        quote:
          "I came from calendly, where I had a lot of features I didn't need in a paid account. Cal.com's free account for a freelancer like me is great. It packs quite some features, including Google Analytics and workflows. Support has been very responsive in fixing things, big plus!",
      },
      {
        id: "mrugesh",
        name: "Mrugesh Mohapatra",
        avatar: "https://github.com/raisedadead.png?size=400",
        username: "raisedadead",
        platform: "X",
        quote:
          "Ya'll, I just moved my calendar booking page from Calendly to – Use this to book some face time with me.",
      },
      {
        id: "nickolas",
        name: "Nickolas Tazes",
        username: "nickolas_tazes",
        platform: "X",
        quote:
          "I had a Calendly and a cal.com account. Now I only have @calcom. It's a no-brainer!",
      },
    ],
  },
  {
    id: "col-2",
    delay: "-19s",
    height: 600,
    maskTop: 13,
    cards: [
      {
        id: "david-g",
        name: "David Guyon",
        avatar: "https://github.com/DavidGuyon.png?size=400",
        username: "DavidGuyon",
        platform: "X",
        quote:
          "Testing out as an alternative to Calendly and loving it so far. Configurable, good onboarding, simple to use 👍.",
      },
      {
        id: "regina",
        name: "Regina Gerbeaux",
        username: "regina_gerbeaux",
        platform: "Product Hunt",
        quote:
          "Second to none on all calendar scheduling apps - team ships fast and new features / versions are constantly being released.",
      },
      {
        id: "clement",
        name: "Clément Dutoict",
        username: "clement_dutoict",
        platform: "Product Hunt",
        quote: "I love the minimalist style of this app.",
      },
    ],
  },
  {
    id: "col-3",
    delay: "-4s",
    height: 600,
    maskTop: 13,
    cards: [
      {
        id: "aria",
        name: "Aria Minaei",
        avatar: "https://github.com/AriaMinaei.png?size=400",
        username: "ariaminaei",
        platform: "Product Hunt",
        quote:
          "Just gave it a go and it's definitely the easiest meeting I've ever scheduled! No context switching, no distractions, and works even better on mobile too.",
      },
      {
        id: "jay",
        name: "Jay Fajardo",
        avatar: "https://github.com/jayfajardo.png?size=400",
        username: "jayfajardo",
        platform: "X",
        quote: "Stoked to try out as a replacement for Calendly.",
      },
      {
        id: "shivansh",
        name: "Shivansh",
        avatar: "https://github.com/ShivanshC.png?size=400",
        username: "Shivansh_C",
        platform: "X",
        quote:
          "I've officially transitioned out of Calendly to for personal calendar needs. Simple onboarding, automated workflows and comprehensive documentation- that's the reason why. The fact that it's open source is a cherry on cake.",
      },
    ],
  },
  {
    id: "col-4",
    delay: "-24s",
    height: 860,
    maskTop: 10,
    cards: [
      {
        id: "david-a",
        name: "David Asabina",
        avatar: "https://github.com/vidbina.png?size=400",
        username: "vidbina",
        platform: "Product Hunt",
        quote:
          "Had an issue logging in and Peer (CEO) tended to the matter within the hour. I haven't had such responsive customer service so this was quite the experience. It's refreshing to find a customer-centric open source project do so well.",
      },
      {
        id: "zach",
        name: "Zach Waterfield",
        quote:
          "I use cal to manage all my external meetings and it's the perfect solution. Has all the features I need and couldn't live without it.",
      },
      {
        id: "berkant",
        name: "Berkant Seyhan",
        quote:
          "One of the best organizing apps I've used lately. At the same time, I cannot help but mention that they are actively responsive and open to development.",
      },
    ],
  },
];

// ─── Wall card ─────────────────────────────────────────────────────────────────

function WallCardItem({ card }: { card: WallCard }) {
  const handle = card.username ? `@${card.username}` : undefined;
  const metaLine = [handle, card.platform].filter(Boolean).join(" · ");

  const nameParts = card.name.trim().split(" ");
  const initials = (
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0].slice(0, 2)
  ).toUpperCase();

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div
        className={`flex gap-3 mb-3 ${metaLine ? "items-start" : "items-center"}`}
      >
        <Avatar className="size-10 shrink-0">
          <AvatarImage src={card.avatar} alt="" />
          <AvatarFallback className="bg-muted text-xs font-semibold text-foreground/50">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <span className="block text-sm font-semibold text-foreground leading-tight">
            {card.name}
          </span>
          {metaLine && (
            <span className="block text-xs text-muted-foreground leading-tight mt-0.5">
              {metaLine}
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        &ldquo;{card.quote}&rdquo;
      </p>
    </div>
  );
}

// ─── Scroll column ─────────────────────────────────────────────────────────────

const PX_PER_SECOND = 34;

function ScrollColumn({
  col,
  reduced,
}: {
  col: ColumnConfig;
  reduced: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [animDuration, setAnimDuration] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;
    const el = trackRef.current;
    if (!el) return;
    const compute = () =>
      setAnimDuration(`${(el.offsetHeight / 2 / PX_PER_SECOND).toFixed(1)}s`);
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <div className="flex flex-col gap-4">
        {col.cards.map((card) => (
          <WallCardItem key={card.id} card={card} />
        ))}
      </div>
    );
  }

  const maskTopPct = col.maskTop ?? 13;
  // Flat-transparent dead zone (0 → maskTopPct) then a short fade into full opacity.
  const colMask = `linear-gradient(to bottom, transparent 0%, transparent ${maskTopPct}%, black ${maskTopPct + 4}%, black 87%, transparent 100%)`;

  // Build two unique-keyed repetitions so each set's height exceeds the clip
  // height. translateY(-50%) then moves exactly one set (2 reps) with no gap.
  const rep0 = col.cards.map((c) => ({ ...c, _k: `${c.id}-r0` }));
  const rep1 = col.cards.map((c) => ({ ...c, _k: `${c.id}-r1` }));

  return (
    <div
      style={{
        height: col.height ?? 600,
        overflow: "hidden",
        WebkitMaskImage: colMask,
        maskImage: colMask,
      }}
    >
      {/* Screen-reader list — static, not animated */}
      <ul className="sr-only">
        {col.cards.map((card) => (
          <li key={card.id}>
            <strong>{card.name}</strong>: {card.quote}
          </li>
        ))}
      </ul>

      {/* Animated track — hidden from assistive tech */}
      <div
        ref={trackRef}
        aria-hidden="true"
        style={{
          animation: animDuration
            ? `scroll-up ${animDuration} linear ${col.delay} infinite`
            : undefined,
        }}
      >
        {/* Set 1 — two reps so set height > clip height */}
        <div className="flex flex-col gap-4 pb-4">
          {rep0.map(({ _k, ...card }) => (
            <WallCardItem key={`s1-${_k}`} card={card} />
          ))}
          {rep1.map(({ _k, ...card }) => (
            <WallCardItem key={`s1-${_k}`} card={card} />
          ))}
        </div>
        {/* Set 2 — identical to set 1; translateY(-50%) lands here seamlessly */}
        <div className="flex flex-col gap-4 pb-4">
          {rep0.map(({ _k, ...card }) => (
            <WallCardItem key={`s2-${_k}`} card={card} />
          ))}
          {rep1.map(({ _k, ...card }) => (
            <WallCardItem key={`s2-${_k}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function WallOfLoveSection() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section
      aria-label="Wall of love"
      className="w-full bg-background py-24 overflow-hidden"
    >
      <Container>
        <div className="relative z-10 flex flex-col items-center text-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <SectionEyebrow>Wall of love</SectionEyebrow>
          </div>
          <SectionHeading className="max-w-lg">
            Why our users love Cal.com.
          </SectionHeading>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Real feedback from people using Cal.com to schedule, coordinate and
            build scheduling into their products.
          </p>
        </div>

        <div className="lg:-mt-80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:items-end gap-4">
          {COLUMNS.map((col, i) => (
            <div
              key={col.id}
              className={
                i === 1
                  ? "hidden sm:block lg:-translate-y-10"
                  : i === 2
                    ? "hidden lg:block lg:-translate-y-10"
                    : i >= 3
                      ? "hidden lg:block"
                      : undefined
              }
            >
              <ScrollColumn col={col} reduced={reduced} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
