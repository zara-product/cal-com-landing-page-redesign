import { ArrowRightIcon, CheckIcon } from "lucide-react";
import type * as React from "react";

// ─── SVG Logos ────────────────────────────────────────────────────────────────

function GoogleCalendarLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="4"
        fill="#fff"
        stroke="#e0e0e0"
        strokeWidth="1"
      />
      <rect x="6" y="14" width="36" height="4" fill="#4285F4" />
      <rect x="6" y="18" width="36" height="24" rx="0" fill="#fff" />
      <rect x="6" y="14" width="36" height="8" fill="#4285F4" />
      <rect x="14" y="6" width="4" height="12" rx="2" fill="#4285F4" />
      <rect x="30" y="6" width="4" height="12" rx="2" fill="#4285F4" />
      <text
        x="24"
        y="38"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#4285F4"
        fontFamily="sans-serif"
      >
        31
      </text>
    </svg>
  );
}

function ZoomLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#2D8CFF" />
      <path
        d="M8 17a4 4 0 014-4h14a4 4 0 014 4v14a4 4 0 01-4 4H12a4 4 0 01-4-4V17z"
        fill="#fff"
      />
      <path d="M30 21l8-5v16l-8-5V21z" fill="#fff" />
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <path
        d="M18 6a4 4 0 00-4 4v2H10a4 4 0 000 8h2v4H10a4 4 0 000 8h2v2a4 4 0 008 0v-2h4v2a4 4 0 008 0v-2h2a4 4 0 000-8h-2v-4h2a4 4 0 000-8h-2v-2a4 4 0 00-8 0v2h-4V10a4 4 0 00-4-4z"
        fill="none"
      />
      <rect x="14" y="6" width="8" height="20" rx="4" fill="#E01E5A" />
      <rect x="26" y="22" width="8" height="20" rx="4" fill="#ECB22E" />
      <rect x="6" y="26" width="20" height="8" rx="4" fill="#36C5F0" />
      <rect x="22" y="14" width="20" height="8" rx="4" fill="#2EB67D" />
    </svg>
  );
}

function SalesforceLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <ellipse cx="18" cy="26" rx="10" ry="12" fill="#00A1E0" />
      <ellipse cx="24" cy="20" rx="8" ry="10" fill="#00A1E0" />
      <ellipse cx="30" cy="24" rx="9" ry="11" fill="#00A1E0" />
      <ellipse cx="36" cy="28" rx="7" ry="9" fill="#00A1E0" />
      <ellipse cx="24" cy="26" rx="14" ry="10" fill="#00A1E0" />
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <rect width="48" height="48" rx="8" fill="#FF7A59" />
      <circle cx="32" cy="16" r="5" fill="#fff" />
      <path
        d="M32 21v6M20 24a8 8 0 1016 0 8 8 0 00-16 0z"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="5" fill="#fff" />
    </svg>
  );
}

function TeamsLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true">
      <rect width="48" height="48" rx="8" fill="#5059C9" />
      <circle cx="30" cy="16" r="5" fill="#fff" opacity="0.9" />
      <rect x="22" y="22" width="18" height="16" rx="4" fill="#7B83EB" />
      <circle cx="18" cy="18" r="6" fill="#fff" />
      <rect x="8" y="25" width="20" height="15" rx="4" fill="#fff" />
    </svg>
  );
}

function CalLogo() {
  return (
    <div
      className="w-12 h-12 rounded-xl bg-[var(--color-fg-default)] flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-[var(--color-bg-default)] font-bold text-lg tracking-tight">
        Cal
      </span>
    </div>
  );
}

// ─── Integration card ──────────────────────────────────────────────────────────

function IntegrationCard({
  name,
  status,
  logo,
}: {
  name: string;
  status: string;
  logo: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-[var(--color-bg-default)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 shadow-sm min-w-[200px]">
      <div className="shrink-0">{logo}</div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-[var(--color-fg-default)] leading-tight truncate">
          {name}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-fg-subtle)]">
          <CheckIcon
            className="w-3 h-3 text-[var(--color-accent-emphasis)] shrink-0"
            aria-hidden="true"
          />
          {status}
        </span>
      </div>
    </div>
  );
}

// ─── Connector lines (SVG) ─────────────────────────────────────────────────────

function ConnectorLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Center point ~ 50% 50% */}
      {/* top-left card center ~ 22% 22% */}
      <line
        x1="50%"
        y1="50%"
        x2="22%"
        y2="22%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* top-right card ~ 78% 22% */}
      <line
        x1="50%"
        y1="50%"
        x2="78%"
        y2="22%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* mid-left ~ 12% 50% */}
      <line
        x1="50%"
        y1="50%"
        x2="12%"
        y2="50%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* mid-right ~ 88% 50% */}
      <line
        x1="50%"
        y1="50%"
        x2="88%"
        y2="50%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* bottom-left ~ 22% 78% */}
      <line
        x1="50%"
        y1="50%"
        x2="22%"
        y2="78%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* bottom-right ~ 78% 78% */}
      <line
        x1="50%"
        y1="50%"
        x2="78%"
        y2="78%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

// ─── Visual panel ──────────────────────────────────────────────────────────────

function IntegrationsVisual() {
  return (
    <div className="relative w-full h-[480px] bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
      <ConnectorLines />

      {/* Centre card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col items-center gap-3 bg-[var(--color-bg-default)] border border-[var(--color-border-subtle)] rounded-2xl px-8 py-6 shadow-md min-w-[220px] text-center">
          <CalLogo />
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 inline-block"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[var(--color-fg-default)]">
                Meeting booked
              </span>
            </div>
            <p className="text-xs text-[var(--color-fg-subtle)] max-w-[160px] leading-relaxed">
              Automatically keeps your tools in sync
            </p>
          </div>
        </div>
      </div>

      {/* Top-left: Google Calendar */}
      <div className="absolute top-[10%] left-[4%]">
        <IntegrationCard
          name="Google Calendar"
          status="Event added"
          logo={<GoogleCalendarLogo />}
        />
      </div>

      {/* Top-right: Zoom */}
      <div className="absolute top-[10%] right-[4%]">
        <IntegrationCard
          name="Zoom"
          status="Meeting link created"
          logo={<ZoomLogo />}
        />
      </div>

      {/* Mid-left: Slack */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[4%]">
        <IntegrationCard
          name="Slack"
          status="Team notified"
          logo={<SlackLogo />}
        />
      </div>

      {/* Mid-right: Salesforce */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[4%]">
        <IntegrationCard
          name="Salesforce"
          status="Activity updated"
          logo={<SalesforceLogo />}
        />
      </div>

      {/* Bottom-left: HubSpot */}
      <div className="absolute bottom-[10%] left-[4%]">
        <IntegrationCard
          name="HubSpot"
          status="Contact synced"
          logo={<HubSpotLogo />}
        />
      </div>

      {/* Bottom-right: Microsoft Teams */}
      <div className="absolute bottom-[10%] right-[4%]">
        <IntegrationCard
          name="Microsoft Teams"
          status="Meeting created"
          logo={<TeamsLogo />}
        />
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function IntegrationsSection() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-px bg-[var(--color-fg-default)]"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-fg-default)]">
                Integrations
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-fg-default)] leading-[1.05] tracking-tight max-w-md">
              Your meetings, connected to the tools that keep work moving.
            </h2>

            <p className="text-base text-[var(--color-fg-subtle)] leading-relaxed max-w-sm">
              Sync calendars, create meeting links, update CRM records and keep
              your team in the loop — automatically from every booking.
            </p>

            <a
              href="/apps"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-fg-default)] hover:opacity-70 transition-opacity"
            >
              Explore apps
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Right: visual */}
          <div>
            <IntegrationsVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
