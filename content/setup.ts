// ─── Connect ─────────────────────────────────────────────────────────────────

export type CalendarKey = "google" | "outlook" | "apple";

export type CalendarEntry = {
  key: CalendarKey;
  name: string;
  accountLabel: string;
};

export type ConnectContent = {
  cardTitle: string;
  cardDescription: string;
  calendars: readonly CalendarEntry[];
  confirmationTitle: string;
  confirmationTime: string;
  busyLabel: string;
  busyDetail: string;
};

export const CONNECT_CONTENT: ConnectContent = {
  cardTitle: "Connected calendars",
  cardDescription:
    "Cal.com checks your existing events to prevent double-booking.",
  calendars: [
    { key: "google", name: "Google Calendar", accountLabel: "Personal" },
    { key: "outlook", name: "Microsoft Outlook", accountLabel: "Work" },
    { key: "apple", name: "Apple Calendar", accountLabel: "iCloud" },
  ],
  confirmationTitle: "Calendars in sync",
  confirmationTime: "Just now",
  busyLabel: "Busy",
  busyDetail: "Thu 10:00 – 11:00 hidden",
};

// ─── Availability ─────────────────────────────────────────────────────────────

export type DayEntry = {
  key: string;
  label: string;
  short: string;
  start: string | null;
  end: string | null;
};

export type AvailabilityContent = {
  cardTitle: string;
  cardDescription: string;
  timezone: string;
  days: readonly DayEntry[];
};

export const AVAILABILITY_CONTENT: AvailabilityContent = {
  cardTitle: "Your availability",
  cardDescription: "When can people book time with you?",
  timezone: "Europe / Berlin",
  days: [
    { key: "sun", label: "Sunday", short: "Sun", start: null, end: null },
    {
      key: "mon",
      label: "Monday",
      short: "Mon",
      start: "9:00 AM",
      end: "5:00 PM",
    },
    {
      key: "tue",
      label: "Tuesday",
      short: "Tue",
      start: "9:00 AM",
      end: "5:00 PM",
    },
    {
      key: "wed",
      label: "Wednesday",
      short: "Wed",
      start: "9:00 AM",
      end: "5:00 PM",
    },
    {
      key: "thu",
      label: "Thursday",
      short: "Thu",
      start: "9:00 AM",
      end: "5:00 PM",
    },
    {
      key: "fri",
      label: "Friday",
      short: "Fri",
      start: "9:00 AM",
      end: "5:00 PM",
    },
    { key: "sat", label: "Saturday", short: "Sat", start: null, end: null },
  ],
};

// ─── Meet ────────────────────────────────────────────────────────────────────

export type MeetingKey = "cal-video" | "google-meet" | "zoom" | "inperson";

export type MeetEntry = {
  key: MeetingKey;
  label: string;
  description: string;
  isLogo: boolean;
};

export type BookerOption = {
  key: string;
  label: string;
  iconSrc: string | null;
  isActive: boolean;
};

export type MeetContent = {
  cardTitle: string;
  cardDescription: string;
  meetingTypes: readonly MeetEntry[];
  activateKeys: readonly string[];
  bookerCardTitle: string;
  bookerOptions: readonly BookerOption[];
};

export const MEET_CONTENT: MeetContent = {
  cardTitle: "How would you like to meet?",
  cardDescription: "Choose the formats available for this event type",
  meetingTypes: [
    {
      key: "cal-video",
      label: "Cal Video",
      description: "Built-in video, no account needed",
      isLogo: true,
    },
    {
      key: "google-meet",
      label: "Google Meet",
      description: "Google Meet link sent with confirmation",
      isLogo: true,
    },
    {
      key: "zoom",
      label: "Zoom",
      description: "Zoom link sent with confirmation",
      isLogo: true,
    },
    {
      key: "inperson",
      label: "In person",
      description: "Set a location",
      isLogo: false,
    },
  ],
  activateKeys: ["cal-video", "zoom", "inperson"],
  bookerCardTitle: "Booker's choice",
  bookerOptions: [
    {
      key: "cal-video",
      label: "Cal Video",
      iconSrc: "/icons/cal-video.svg",
      isActive: true,
    },
    {
      key: "zoom",
      label: "Zoom",
      iconSrc: "/icons/zoom.svg",
      isActive: false,
    },
    {
      key: "inperson",
      label: "In person",
      iconSrc: null,
      isActive: false,
    },
  ],
};
