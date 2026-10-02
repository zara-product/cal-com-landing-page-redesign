"use client";

import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import NextImage from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/ui/menu";
import { SectionDivider } from "@/components/ui/page-rail";
import { cn } from "@/lib/utils";

// ─── Cal.com wordmark ──────────────────────────────────────────────────────────
// Official letterform paths from cal.com/logo.svg, rendered at footer scale.

function CalWordmark() {
  return (
    <a
      href="https://cal.com"
      className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="sr-only">Cal.com home</span>
      <svg
        width={101}
        height={22}
        viewBox="0 0 101 22"
        fill="none"
        aria-hidden="true"
        className="text-foreground"
      >
        <path
          d="M10.0582 20.817C4.32115 20.817 0 16.2763 0 10.6704C0 5.04589 4.1005 0.467773 10.0582 0.467773C13.2209 0.467773 15.409 1.43945 17.1191 3.66311L14.3609 5.96151C13.2025 4.72822 11.805 4.11158 10.0582 4.11158C6.17833 4.11158 4.04533 7.08268 4.04533 10.6704C4.04533 14.2582 6.38059 17.1732 10.0582 17.1732C11.7866 17.1732 13.2577 16.5566 14.4161 15.3233L17.1375 17.7151C15.501 19.8453 13.2577 20.817 10.0582 20.817Z"
          fill="currentColor"
        />
        <path
          d="M29.0161 5.88601H32.7304V20.4612H29.0161V18.331C28.2438 19.8446 26.9566 20.8536 24.4927 20.8536C20.5577 20.8536 17.4133 17.4341 17.4133 13.2297C17.4133 9.02528 20.5577 5.60571 24.4927 5.60571C26.9383 5.60571 28.2438 6.61477 29.0161 8.12835V5.88601ZM29.1264 13.2297C29.1264 10.95 27.5634 9.06266 25.0995 9.06266C22.7274 9.06266 21.1828 10.9686 21.1828 13.2297C21.1828 15.4346 22.7274 17.3967 25.0995 17.3967C27.5451 17.3967 29.1264 15.4907 29.1264 13.2297Z"
          fill="currentColor"
        />
        <path d="M35.3599 0H39.0742V20.4427H35.3599V0Z" fill="currentColor" />
        <path
          d="M40.7291 18.5182C40.7291 17.3223 41.6853 16.3132 42.9908 16.3132C44.2964 16.3132 45.2158 17.3223 45.2158 18.5182C45.2158 19.7515 44.278 20.7605 42.9908 20.7605C41.7037 20.7605 40.7291 19.7515 40.7291 18.5182Z"
          fill="currentColor"
        />
        <path
          d="M59.4296 18.1068C58.0505 19.7885 55.9543 20.8536 53.4719 20.8536C49.0404 20.8536 45.7858 17.4341 45.7858 13.2297C45.7858 9.02528 49.0404 5.60571 53.4719 5.60571C55.8623 5.60571 57.9402 6.61477 59.3193 8.20309L56.4508 10.6136C55.7336 9.71667 54.7958 9.04397 53.4719 9.04397C51.0999 9.04397 49.5553 10.95 49.5553 13.211C49.5553 15.472 51.0999 17.378 53.4719 17.378C54.9062 17.378 55.8991 16.6306 56.6346 15.6215L59.4296 18.1068Z"
          fill="currentColor"
        />
        <path
          d="M59.7422 13.2297C59.7422 9.02528 62.9968 5.60571 67.4283 5.60571C71.8598 5.60571 75.1144 9.02528 75.1144 13.2297C75.1144 17.4341 71.8598 20.8536 67.4283 20.8536C62.9968 20.8349 59.7422 17.4341 59.7422 13.2297ZM71.3449 13.2297C71.3449 10.95 69.8003 9.06266 67.4283 9.06266C65.0563 9.04397 63.5117 10.95 63.5117 13.2297C63.5117 15.4907 65.0563 17.3967 67.4283 17.3967C69.8003 17.3967 71.3449 15.4907 71.3449 13.2297Z"
          fill="currentColor"
        />
        <path
          d="M100.232 11.5482V20.4428H96.518V12.4638C96.518 9.94119 95.3412 8.85739 93.576 8.85739C91.921 8.85739 90.7442 9.67958 90.7442 12.4638V20.4428H87.0299V12.4638C87.0299 9.94119 85.8346 8.85739 84.0878 8.85739C82.4329 8.85739 80.9802 9.67958 80.9802 12.4638V20.4428H77.2659V5.8676H80.9802V7.88571C81.7525 6.31607 83.15 5.53125 85.3014 5.53125C87.3425 5.53125 89.0525 6.5403 89.9903 8.24074C90.9281 6.50293 92.3072 5.53125 94.8079 5.53125C97.8603 5.54994 100.232 7.86702 100.232 11.5482Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

// ─── Icon tile ────────────────────────────────────────────────────────────────
// Shared tile used for both social and download icons.

function IconTile({
  href,
  label,
  src,
  size,
}: {
  href: string;
  label: string;
  src: string;
  size: number;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-11 items-center justify-center rounded-lg border border-border bg-card transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <NextImage
        src={src}
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </a>
  );
}

// ─── Link column ──────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              {link.badge && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {link.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_LINKS: NavLink[] = [
  { label: "Scheduling", href: "https://cal.com" },
  { label: "Routing", href: "https://cal.com/routing" },
  { label: "Workflows", href: "https://cal.com/features/workflows" },
  { label: "Cal.ai", href: "https://cal.com/ai" },
  { label: "App Store", href: "https://cal.com/features/app-store" },
  { label: "Payments", href: "https://cal.com/features/payments" },
  { label: "Self-hosted", href: "https://github.com/calcom/cal.com" },
  { label: "Pricing", href: "https://cal.com/pricing" },
];

const SOLUTIONS_LINKS: NavLink[] = [
  { label: "Individuals", href: "https://cal.com" },
  { label: "Teams", href: "https://cal.com/teams" },
  { label: "Organizations", href: "https://cal.com/enterprise" },
  { label: "Enterprise", href: "https://cal.com/enterprise" },
  { label: "Sales", href: "https://cal.com/scheduling/sales-teams" },
  {
    label: "Recruiting",
    href: "https://cal.com/scheduling/talent-acquisition-teams",
  },
  {
    label: "Customer Support",
    href: "https://cal.com/scheduling/customer-support",
  },
];

const DEVELOPERS_LINKS: NavLink[] = [
  { label: "Documentation", href: "https://cal.com/docs" },
  { label: "API", href: "https://cal.com/docs/enterprise-features/api" },
  { label: "Cal.com Atoms", href: "https://cal.com/atoms" },
  { label: "Embed", href: "https://cal.com/embed" },
  {
    label: "Enterprise API",
    href: "https://cal.com/docs/enterprise-features/api",
  },
  { label: "GitHub", href: "https://github.com/calcom/cal.com" },
  {
    label: "Docker",
    href: "https://cal.com/docs/introduction/quick-start/self-hosting/docker",
  },
];

const RESOURCES_LINKS: NavLink[] = [
  { label: "Help Docs", href: "https://cal.com/help" },
  { label: "Blog", href: "https://cal.com/blog" },
  { label: "Changelog", href: "https://cal.com/subscribe" },
  { label: "Security", href: "https://cal.com/security" },
  { label: "Cal Fonts", href: "https://cal.com/font" },
  { label: "Cal.com vs Calendly", href: "https://cal.com/calcom-vs-calendly" },
  { label: "FAQ", href: "https://cal.com/faq" },
];

const COMPANY_LINKS: NavLink[] = [
  { label: "About", href: "https://cal.com/about" },
  { label: "Jobs", href: "https://cal.com/jobs", badge: "Hiring" },
  { label: "Open Startup", href: "https://cal.com/open" },
  { label: "Support", href: "https://app.cal.com/support" },
  { label: "Affiliate / Partners", href: "https://cal.com/affiliate-program" },
];

const COLUMNS = [
  { title: "Product", links: PRODUCT_LINKS },
  { title: "Solutions", links: SOLUTIONS_LINKS },
  { title: "Developers", links: DEVELOPERS_LINKS },
  { title: "Resources", links: RESOURCES_LINKS },
  { title: "Company", links: COMPANY_LINKS },
] as const;

// Optical icon sizes calibrated per brand mark at 40×40 tile.
const SOCIAL = [
  {
    label: "X (formerly Twitter)",
    href: "https://x.com/calcom",
    src: "/icons/x.svg",
    size: 20,
  },
  {
    label: "GitHub",
    href: "https://github.com/calcom/cal.com",
    src: "/icons/github.svg",
    size: 21,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/calcom",
    src: "/icons/linkedin.svg",
    size: 21,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@calcom",
    src: "/icons/youtube.svg",
    size: 23,
  },
] as const;

const DOWNLOADS = [
  {
    label: "macOS",
    href: "https://cal.com/download",
    src: "/icons/apple.svg",
    size: 20,
  },
  {
    label: "Windows",
    href: "https://cal.com/download",
    src: "/icons/windows.svg",
    size: 19,
  },
  {
    label: "Linux",
    href: "https://cal.com/download",
    src: "/icons/linux.svg",
    size: 23,
  },
  {
    label: "iOS / App Store",
    href: "https://cal.com/app",
    src: "/icons/app-store.svg",
    size: 21,
  },
  {
    label: "Android",
    href: "https://go.cal.com/android",
    src: "/icons/android.svg",
    size: 22,
  },
  {
    label: "Chrome",
    href: "https://go.cal.com/chrome",
    src: "/icons/chrome.svg",
    size: 23,
  },
  {
    label: "Safari",
    href: "https://go.cal.com/safari",
    src: "/icons/safari.svg",
    size: 23,
  },
  {
    label: "Firefox",
    href: "https://go.cal.com/firefox",
    src: "/icons/firefox.svg",
    size: 23,
  },
] as const;

const COMPLIANCE_BADGES = [
  { src: "/badges/soc2.svg", alt: "AICPA SOC 2", w: 34, h: 35 },
  { src: "/badges/iso-27001.svg", alt: "ISO 27001", w: 47, h: 48 },
  { src: "/badges/hipaa.svg", alt: "HIPAA Compliant", w: 71, h: 48 },
  { src: "/badges/gdpr.svg", alt: "GDPR Aligned", w: 35, h: 48 },
  { src: "/badges/ccpa.svg", alt: "CCPA Compliant", w: 33, h: 48 },
] as const;

const LEGAL: NavLink[] = [
  { label: "Privacy", href: "https://cal.com/privacy" },
  { label: "Terms", href: "https://cal.com/terms" },
  { label: "Security", href: "https://cal.com/security" },
  { label: "Cookies", href: "https://cal.com/privacy" },
];

const LANGUAGES = [
  { label: "English", href: "/" },
  { label: "German (Germany)", href: "/de" },
  { label: "French (France)", href: "/fr" },
  { label: "Dutch (Netherlands)", href: "/nl" },
  { label: "Portuguese (Portugal)", href: "/pt" },
  { label: "Spanish (Spain)", href: "/es" },
  { label: "Italian (Italy)", href: "/it" },
] as const;

// ─── Language selector — drop-up via coss Menu ────────────────────────────────

function LanguageSelector() {
  const [open, setOpen] = React.useState(false);
  return (
    <Menu onOpenChange={setOpen}>
      <MenuTrigger
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-sm text-xs text-muted-foreground",
          "transition-colors hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <GlobeIcon className="size-3.5" aria-hidden="true" />
        <span>English</span>
        <ChevronDownIcon
          className={cn(
            "size-3 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </MenuTrigger>
      <MenuPopup side="top" sideOffset={8} align="start">
        {LANGUAGES.map(({ label, href }) => (
          <MenuLinkItem key={label} href={href}>
            {label}
          </MenuLinkItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        {/* ── Main grid: left identity + 5 link columns ── */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[260px_1fr]">
          {/* Left: wordmark, mission, CTAs, compliance */}
          <div>
            <CalWordmark />

            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
              Connecting a billion people by 2031 through calendar scheduling.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button
                size="sm"
                // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
                render={<a href="https://cal.com/sales" />}
              >
                Get a demo
              </Button>
              <Button
                size="sm"
                variant="outline"
                // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
                render={<a href="https://cal.com/sales" />}
              >
                Talk to sales
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Security &amp; compliance
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {COMPLIANCE_BADGES.map(({ src, alt, w, h }) => (
                  <NextImage
                    key={alt}
                    src={src}
                    alt={alt}
                    width={w}
                    height={h}
                    className="h-7 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: 5 link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <FooterColumn
                key={col.title}
                title={col.title}
                links={col.links}
              />
            ))}
          </div>
        </div>

        {/* ── Follow us + Downloads row ── */}
        <div className="flex flex-col gap-8 pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Follow us
            </h3>
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ label, href, src, size }) => (
                <IconTile
                  key={label}
                  href={href}
                  label={label}
                  src={src}
                  size={size}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-right">
              Downloads
            </h3>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {DOWNLOADS.map(({ label, href, src, size }) => (
                <IconTile
                  key={label}
                  href={href}
                  label={label}
                  src={src}
                  size={size}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider with plus markers — standard frame intersection treatment ── */}
      <SectionDivider />

      {/* ── Legal bar ── */}
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-xs text-muted-foreground">
              © 2026 Cal.com, Inc.
            </span>
            {LEGAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://status.cal.com"
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
                aria-hidden="true"
              />
              All systems operational
            </a>

            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
