import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import type React from "react";

// ─── Cal.com wordmark ──────────────────────────────────────────────────────────

function CalWordmark() {
  return (
    <a
      href="https://cal.com"
      className="inline-block text-[22px] font-extrabold tracking-tight text-foreground leading-none"
    >
      Cal.com
    </a>
  );
}

// ─── Social icons (inline SVG — public brand marks) ───────────────────────────

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </a>
  );
}

function IconX() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
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
  { label: "Support", href: "https://cal.com/help" },
  { label: "Affiliate / Partners", href: "https://cal.com/affiliate-program" },
];

const COLUMNS = [
  { title: "Product", links: PRODUCT_LINKS },
  { title: "Solutions", links: SOLUTIONS_LINKS },
  { title: "Developers", links: DEVELOPERS_LINKS },
  { title: "Resources", links: RESOURCES_LINKS },
  { title: "Company", links: COMPANY_LINKS },
] as const;

const SOCIAL = [
  { label: "X (formerly Twitter)", href: "https://x.com/calcom", Icon: IconX },
  {
    label: "GitHub",
    href: "https://github.com/calcom/cal.com",
    Icon: IconGitHub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/calcom",
    Icon: IconLinkedIn,
  },
  { label: "YouTube", href: "https://youtube.com/@calcom", Icon: IconYouTube },
] as const;

const DOWNLOADS: NavLink[] = [
  { label: "macOS", href: "https://cal.com/download" },
  { label: "Windows", href: "https://cal.com/download" },
  { label: "Linux", href: "https://cal.com/download" },
  { label: "iOS", href: "https://cal.com/app" },
  { label: "Android", href: "https://go.cal.com/android" },
  { label: "Chrome", href: "https://go.cal.com/chrome" },
  { label: "Safari", href: "https://go.cal.com/safari" },
  { label: "Firefox", href: "https://go.cal.com/firefox" },
];

const LEGAL: NavLink[] = [
  { label: "Privacy", href: "https://cal.com/privacy" },
  { label: "Terms", href: "https://cal.com/terms" },
  { label: "Security", href: "https://cal.com/security" },
  { label: "Cookies", href: "https://cal.com/privacy" },
];

// Compliance labels — V1 text representation.
// The actual certification mark images (SOC 2, ISO 27001, HIPAA, GDPR, CCPA)
// are trademark-restricted assets that need to be sourced from the certifying
// bodies or licensed directly from Cal.com's asset library.
const COMPLIANCE = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "CCPA"] as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="w-full bg-neutral-50 border-t border-border">
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        {/* ── Main grid: left identity + 5 link columns ── */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[260px_1fr]">
          {/* Left: wordmark, mission, compliance */}
          <div>
            <CalWordmark />

            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
              Connecting a billion people by 2031 through calendar scheduling.
            </p>

            <div className="mt-8">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Security &amp; compliance
              </h3>
              <div className="flex flex-wrap gap-2">
                {COMPLIANCE.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {label}
                  </span>
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
        <div className="flex flex-col gap-8 border-t border-border py-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Follow us
            </h3>
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ label, href, Icon }) => (
                <SocialButton key={label} href={href} label={label}>
                  <Icon />
                </SocialButton>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-right">
              Downloads
            </h3>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {DOWNLOADS.map((dl) => (
                <a
                  key={dl.label}
                  href={dl.href}
                  className="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {dl.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Legal bar ── */}
        <div className="flex flex-col gap-3 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
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
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              All systems operational
            </a>

            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GlobeIcon className="h-3.5 w-3.5" aria-hidden="true" />
              English
              <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
