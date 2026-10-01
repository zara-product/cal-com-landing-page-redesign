"use client";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/ui/menu";
import { cn } from "@/lib/utils";

// ─── Nav data ─────────────────────────────────────────────────────────────────

type NavLeaf = { label: string; href: string; items?: never };
type NavGroup = {
  label: string;
  href?: never;
  items: Array<{ label: string; href: string }>;
};
type NavItem = NavLeaf | NavGroup;

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    items: [
      { label: "Scheduling", href: "https://cal.com" },
      { label: "Routing", href: "https://cal.com/routing" },
      { label: "Workflows", href: "https://cal.com/features/workflows" },
      { label: "Teams", href: "https://cal.com/teams" },
      { label: "Enterprise", href: "https://cal.com/enterprise" },
      { label: "Embed", href: "https://cal.com/embed" },
    ],
  },
  { label: "Enterprise", href: "https://cal.com/enterprise" },
  { label: "Cal.ai", href: "https://cal.com/ai" },
  {
    label: "Developer",
    items: [
      { label: "Documentation", href: "https://cal.com/docs" },
      { label: "API", href: "https://cal.com/docs/enterprise-features/api" },
      { label: "Cal.com Atoms", href: "https://cal.com/atoms" },
      { label: "Embed", href: "https://cal.com/embed" },
      { label: "GitHub", href: "https://github.com/calcom/cal.com" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Help Docs", href: "https://cal.com/help" },
      { label: "Blog", href: "https://cal.com/blog" },
      { label: "Changelog", href: "https://cal.com/subscribe" },
      { label: "Security", href: "https://cal.com/security" },
      { label: "FAQ", href: "https://cal.com/faq" },
    ],
  },
  { label: "Pricing", href: "https://cal.com/pricing" },
];

// ─── Cal.com wordmark ──────────────────────────────────────────────────────────
// Official asset from cal.com/logo.svg — letterforms only, no icon mark.
// Rendered at 88×19 for correct visual weight in the header.

function CalWordmarkSvg() {
  return (
    <svg
      width={88}
      height={19}
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
  );
}

// ─── Hover dropdown ────────────────────────────────────────────────────────────

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
}) {
  const [open, setOpen] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancelClose = () => clearTimeout(closeTimerRef.current);
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 100);
  };

  React.useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  return (
    <div
      role="none"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger
          className={cn(
            "flex cursor-pointer items-center gap-1 px-3 py-2 text-sm text-muted-foreground",
            "transition-colors hover:text-foreground",
            "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {label}
          <ChevronDownIcon
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </MenuTrigger>
        <MenuPopup
          side="bottom"
          sideOffset={8}
          align="start"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {items.map((item) => (
            <MenuLinkItem key={item.label} href={item.href}>
              {item.label}
            </MenuLinkItem>
          ))}
        </MenuPopup>
      </Menu>
    </div>
  );
}

// ─── SiteHeader ────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Reserves the header's layout height so page content starts below it */}
      <div aria-hidden="true" className="h-14" />

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Outer wrapper — px-5 is always present so content positions match in both states */}
        <div
          className={cn("px-5", scrolled ? "pt-2" : "")}
          style={{ transition: "padding-top 300ms ease-out" }}
        >
          {/* Inner bar — transitions to floating pill on scroll; same max-w/px in both states */}
          <div
            className={cn(
              "mx-auto flex h-14 items-center justify-between max-w-[1160px] px-6",
              scrolled
                ? "rounded-2xl border border-border bg-card shadow-sm"
                : "",
            )}
            style={{
              transition:
                "background-color 300ms ease-out, border-color 300ms ease-out, border-radius 300ms ease-out, box-shadow 300ms ease-out",
            }}
          >
            {/* Logo — wordmark only, no icon mark */}
            <a
              href="https://cal.com"
              className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Cal.com home"
            >
              <CalWordmarkSvg />
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-0.5 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) =>
                item.items ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    items={item.items}
                  />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>

            {/* CTA — dark filled pill */}
            <a
              href="https://app.cal.com"
              className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
            >
              Go to app
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
