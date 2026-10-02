export const TESTIMONIALS = [
  {
    id: "flo",
    company: "Mintlify",
    quote:
      "More elegant than Calendly, more open than SavvyCal, Cal.com works and it feels just right.",
    name: "Flo Merian",
    role: "Product Marketing, Mintlify",
    portrait: "/avatars/testimonials/fmerian.png",
  },
  {
    id: "guillermo",
    company: "Vercel",
    quote:
      "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    role: "CEO, Vercel",
    portrait: "/avatars/testimonials/rauchg.png",
  },
  {
    id: "kent",
    company: "EpicWeb.dev",
    quote: "I just migrated from Calendly to Cal.com.",
    name: "Kent C. Dodds",
    role: "Founder, EpicWeb.dev",
    portrait: "/avatars/testimonials/kentcdodds.png",
  },
  {
    id: "aria",
    company: "Theatre.JS",
    quote:
      "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    role: "CEO, Theatre.JS",
    portrait: "/avatars/testimonials/ariaminaei.png",
  },
  {
    id: "ant",
    company: "Supabase",
    quote:
      "I finally made the move to Cal.com after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    role: "Co-Founder & CTO, Supabase",
    portrait: "/avatars/testimonials/awalias.png",
  },
  {
    id: "micah",
    company: "Navi",
    quote:
      "At Navi, protecting personal health information is a non-negotiable, so choosing Cal.com for scheduling just makes sense.",
    name: "Micah Friedland",
    role: "CEO & Founder, Navi",
    portrait: null,
  },
] as const;

export const COUNT = TESTIMONIALS.length; // 6

// Two clones on each side so the clone's neighbor always renders a real card.
// Layout: [clone(Ant), clone(Micah), Flo…Micah, clone(Flo), clone(Guillermo)]
// Index:        0           1         2…7          8             9
export const REAL_START = 2; // index of first real slide
export const REAL_END = COUNT + 1; // index of last real slide (= 7)

export const SLIDES = [
  TESTIMONIALS[COUNT - 2], // 0: clone of Ant
  TESTIMONIALS[COUNT - 1], // 1: clone of Micah
  ...TESTIMONIALS, // 2–7: real slides
  TESTIMONIALS[0], // 8: clone of Flo
  TESTIMONIALS[1], // 9: clone of Guillermo
];

export const SLIDE_KEYS = [
  "clone-prev-2",
  "clone-prev-1",
  ...TESTIMONIALS.map((t) => t.id),
  "clone-next-1",
  "clone-next-2",
];

// Gap wide enough to place the arrow between the neighbouring card and the
// active card with clear breathing room on both sides.
export const GAP = 80;
export const AUTOPLAY_MS = 4500;
export const SWIPE_THRESHOLD = 50;
export const TILE_SIZE = 96;
export const TILE_GAP = 12;
export const TILE_COLS = 10;
export const TILE_ROWS = 10;
