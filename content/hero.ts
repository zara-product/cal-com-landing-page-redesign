// ─── Individuals ─────────────────────────────────────────────────────────────

export type IndividualsContent = {
  hostName: string;
  hostAvatarSrc: string;
  hostAvatarFallback: string;
  eventTitle: string;
  duration: string;
  meetingType: string;
  timezoneShort: string;
  timezoneLong: string;
  calendarMonth: string;
  calendarYear: string;
  calendarMonthOffset: number;
  calendarDaysInMonth: number;
  availableDays: readonly number[];
  selectedDay: number;
  selectedDayLabel: string;
  timeSlots: readonly string[];
  selectedSlot: string;
};

export const INDIVIDUALS_CONTENT: IndividualsContent = {
  hostName: "Ewa Nowak",
  hostAvatarSrc: "/avatars/individuals-ewa.png",
  hostAvatarFallback: "EN",
  eventTitle: "Intro call",
  duration: "30m",
  meetingType: "Cal Video",
  timezoneShort: "Warsaw",
  timezoneLong: "Europe/Warsaw",
  calendarMonth: "October",
  calendarYear: "2026",
  calendarMonthOffset: 4,
  calendarDaysInMonth: 31,
  availableDays: [5, 6, 7, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27],
  selectedDay: 8,
  selectedDayLabel: "Thu",
  timeSlots: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
  selectedSlot: "10:00",
};

// ─── Teams ───────────────────────────────────────────────────────────────────

export type TeamAvatar = { key: string; src: string };

export type TeamsContent = {
  eventTitle: string;
  teamName: string;
  routingType: string;
  duration: string;
  teamAvatars: readonly TeamAvatar[];
  selectedAvatarIndex: number;
  customerAvatarSrc: string;
  selectedHostName: string;
  resultTitle: string;
  resultDetail: string;
};

export const TEAMS_CONTENT: TeamsContent = {
  eventTitle: "Product demo",
  teamName: "Sales team",
  routingType: "Round robin",
  duration: "45m",
  teamAvatars: [
    { key: "m1", src: "/avatars/teams-member-1.png" },
    { key: "m2", src: "/avatars/teams-member-2.png" },
    { key: "sofia", src: "/avatars/teams-sofia.png" },
    { key: "m4", src: "/avatars/teams-member-4.png" },
  ],
  selectedAvatarIndex: 2,
  customerAvatarSrc: "/avatars/teams-customer.png",
  selectedHostName: "Sofia Ruiz",
  resultTitle: "This event is scheduled",
  resultDetail: "Sofia Ruiz · Thu 8 Oct, 10:00 · least booked this week",
};

// ─── Organizations ───────────────────────────────────────────────────────────

export type OrgTeamKey = "sales" | "support" | "hiring";

export type OrgMeeting = {
  id: number;
  day: number;
  startHour: number;
  span: number;
  team: OrgTeamKey;
  label: string;
};

export type OrgsContent = {
  orgName: string;
  orgInitial: string;
  weekLabel: string;
  teams: readonly OrgTeamKey[];
  meetings: readonly OrgMeeting[];
  dayLabels: readonly string[];
  hourLabels: readonly number[];
};

export const ORGS_CONTENT: OrgsContent = {
  orgName: "Acme",
  orgInitial: "A",
  weekLabel: "Week of 5 Oct",
  teams: ["sales", "support", "hiring"],
  meetings: [
    { id: 1, day: 1, startHour: 9, span: 2, team: "sales", label: "Demo" },
    {
      id: 2,
      day: 2,
      startHour: 10,
      span: 1,
      team: "support",
      label: "Onboarding",
    },
    {
      id: 3,
      day: 3,
      startHour: 9,
      span: 1,
      team: "hiring",
      label: "Interview",
    },
    {
      id: 4,
      day: 4,
      startHour: 11,
      span: 2,
      team: "sales",
      label: "Discovery",
    },
    {
      id: 5,
      day: 5,
      startHour: 9,
      span: 1,
      team: "support",
      label: "Check-in",
    },
    {
      id: 6,
      day: 2,
      startHour: 12,
      span: 1,
      team: "hiring",
      label: "Interview",
    },
    {
      id: 7,
      day: 3,
      startHour: 11,
      span: 1,
      team: "support",
      label: "Support",
    },
    { id: 8, day: 5, startHour: 11, span: 2, team: "sales", label: "Demo" },
  ],
  dayLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  hourLabels: [9, 10, 11, 12],
};

// ─── Developers ──────────────────────────────────────────────────────────────

export type DevTabKey = "atoms" | "apiv2" | "webhooks";
export type CodeToken = { t: string; c: string };
export type CodeEntry = { id: string; tokens: CodeToken[] };

const kw = (t: string): CodeToken => ({ t, c: "text-code-keyword" });
const str = (t: string): CodeToken => ({ t, c: "text-code-string" });
const tag = (t: string): CodeToken => ({ t, c: "text-code-tag" });
const att = (t: string): CodeToken => ({ t, c: "text-code-attr" });
const pln = (t: string): CodeToken => ({ t, c: "text-code-plain" });
const dim = (t: string): CodeToken => ({ t, c: "text-code-muted" });

export type DevTabData = {
  label: string;
  filename: string;
  code: CodeEntry[];
};

export type AtomsResultContent = {
  browserUrl: string;
  atomsBadgeLabel: string;
  dates: readonly string[];
  timeSlots: readonly string[];
  selectedSlot: string;
};

export type ApiV2ResultContent = {
  statusCode: string;
  responseTime: string;
  status: string;
  startLabel: string;
  startValue: string;
  videoLink: string;
};

export type WebhooksResultContent = {
  deliveredEvent: string;
  statusCode: string;
  alsoEvents: string;
};

export type DevContent = {
  orderedTabs: readonly DevTabKey[];
  tabs: Record<DevTabKey, DevTabData>;
  atomsResult: AtomsResultContent;
  apiv2Result: ApiV2ResultContent;
  webhooksResult: WebhooksResultContent;
};

export const DEV_CONTENT: DevContent = {
  orderedTabs: ["atoms", "apiv2", "webhooks"],
  tabs: {
    atoms: {
      label: "Atoms",
      filename: "BookConsult.tsx",
      code: [
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
    },
    apiv2: {
      label: "API v2",
      filename: "create-booking.sh",
      code: [
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
          tokens: [
            dim("  -H "),
            str('"Authorization: Bearer $TOKEN"'),
            dim(" \\"),
          ],
        },
        {
          id: "v2",
          tokens: [
            dim("  -H "),
            str('"cal-api-version: 2026-02-25"'),
            dim(" \\"),
          ],
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
    },
    webhooks: {
      label: "Webhooks",
      filename: "api/cal-webhook.ts",
      code: [
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
        {
          id: "w3",
          tokens: [dim("  "), kw("await"), dim(" crm.createVisit({")],
        },
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
    },
  },
  atomsResult: {
    browserUrl: "acmehealth.com/visits/new",
    atomsBadgeLabel: "Cal.com Atoms",
    dates: ["Thu 8", "Fri 9", "Mon 12"],
    timeSlots: ["9:00", "9:30", "10:00"],
    selectedSlot: "10:00",
  },
  apiv2Result: {
    statusCode: "201 Created",
    responseTime: "142 ms",
    status: "accepted",
    startLabel: "start (Tokyo)",
    startValue: "Thu 8 Oct, 17:00",
    videoLink: "app.cal.com/video/9fJw3xT2pQ",
  },
  webhooksResult: {
    deliveredEvent: "BOOKING_CREATED delivered",
    statusCode: "200",
    alsoEvents: "RESCHEDULED · CANCELLED · MEETING_ENDED",
  },
};
