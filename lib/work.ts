/* The image system: every project's frames are files in
   /public/work/<slug>/, listed here in display order. Adding a frame is a
   file drop plus one line. `label` is what the hover-flash overlay shows. */

export type WorkFrame = {
  /* Path under /public, e.g. "/work/kleo/01-chrome-extension.svg" */
  src: string;
  label: string;
};

export type WorkProject = {
  slug: string;
  name: string;
  /* Path to the client's logo SVG in /public/logos, e.g. "/logos/kleo.svg".
     Until Trevor drops the file and sets this, the section shows the client
     name as a wordmark placeholder in the same slot. */
  logo?: string;
  eyebrow: string;
  title: string;
  intro: string;
  tag: string;
  /* DD poster tint used for this project's placeholder frames */
  tint: "blue" | "pink" | "sand";
  hero: WorkFrame[];
  details: [WorkFrame[], WorkFrame[]];
};

/* Bump when regenerating placeholders in place, so browsers drop their
   cached copies. Real screenshots get fresh filenames and don't need it. */
const PLACEHOLDER_VERSION = 2;

function frames(slug: string, labels: string[]): WorkFrame[] {
  return labels.map((label, i) => ({
    src: `/work/${slug}/${String(i + 1).padStart(2, "0")}-${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.svg?v=${PLACEHOLDER_VERSION}`,
    label,
  }));
}

export type Brand = {
  slug: string;
  name: string;
  /* The short mark shown on the tile at rest (first frame placeholder) */
  mark: string;
  frames: WorkFrame[];
};

export const BRANDS: Brand[] = [
  {
    slug: "saddle-rock",
    name: "Saddle Rock",
    mark: "SR",
    frames: frames("brands/saddle-rock", ["Mark", "Signage", "Business card", "App icon"]),
  },
  {
    slug: "linkd-performance",
    name: "Linkd Performance",
    mark: "▲▲",
    frames: frames("brands/linkd-performance", ["Mark", "Signage", "Business card", "App icon"]),
  },
  {
    slug: "meridian",
    name: "Meridian",
    mark: "M◈",
    frames: frames("brands/meridian", ["Mark", "Signage", "Business card", "App icon"]),
  },
  {
    slug: "bandit",
    name: "Bandit",
    mark: "BB",
    frames: frames("brands/bandit", ["Mark", "Packaging", "Tote", "Sticker"]),
  },
  {
    slug: "rivet-health",
    name: "Rivet Health",
    mark: "RH",
    frames: frames("brands/rivet-health", ["Mark", "Style guide", "App icon"]),
  },
  {
    slug: "cheal-king",
    name: "Cheal King",
    mark: "CK",
    frames: frames("brands/cheal-king", ["Mark", "Badge set", "Poster"]),
  },
];

export const WEBSITES: WorkFrame[] = frames("websites", [
  "Rock Creek Crates",
  "LabFinder",
  "Nuage",
  "Adan",
]);

export const PROJECTS: WorkProject[] = [
  {
    slug: "kleo",
    name: "Kleo",
    eyebrow: "When you're going zero to one",
    title: "70,000 users and $170k in one launch week",
    intro:
      "Kleo gave LinkedIn creators the tools LinkedIn wouldn't build. I joined as founding product designer and designed all of it over 18 months: the Chrome extension, the premium web app, the design system, and the landing pages. The free extension grew to 70,000 users. The paid launch filled 500+ annual seats and brought in $170k in its first week.",
    tag: "Embedded · 18 months",
    tint: "blue",
    hero: frames("kleo", [
      "Chrome extension",
      "Premium web app",
      "Design system",
      "Landing page",
      "Analytics view",
      "Launch page",
    ]),
    details: [
      frames("kleo/detail-a", ["Extension detail", "Formatting tools"]),
      frames("kleo/detail-b", ["Premium dashboard", "Analytics"]),
    ],
  },
  {
    slug: "dozen",
    name: "Dozen",
    eyebrow: "When you're racing a funding window",
    title: "A two-sided marketplace designed in 3 months",
    intro:
      "A founder with a closing funding window needed a full marketplace for local baked goods, like DoorDash for home bakers. I designed the entire seller side in month one, the entire buyer side in month two, and tested and refined in month three. Every goal hit on schedule, and the client came back for a second sprint.",
    tag: "Sprint · 3 months",
    tint: "pink",
    hero: frames("dozen", [
      "Seller onboarding",
      "Storefront",
      "Buyer browse",
      "Checkout",
      "Order tracking",
    ]),
    details: [
      frames("dozen/detail-a", ["Seller flows", "Listings"]),
      frames("dozen/detail-b", ["Buyer flows", "Cart"]),
    ],
  },
  {
    slug: "ifit",
    name: "iFIT",
    eyebrow: "When you need senior help while you hire",
    title: "Kicking off AI Coach at a global fitness brand",
    intro:
      "iFIT wanted AI working alongside their celebrity trainers, and someone had to take it from idea to design while the team hired. I kicked off AI Coach with one PM, defined the early flows and screens, and stayed 1 year 8 months as the team's only contractor at a company where contractors typically cycle out fast.",
    tag: "Embedded · 1 yr 8 mo",
    tint: "sand",
    hero: frames("ifit", [
      "AI Coach chat",
      "Workout flow",
      "EGYM screens",
      "Coach profile",
      "Progress view",
    ]),
    details: [
      frames("ifit/detail-a", ["Coach chat", "Check-ins"]),
      frames("ifit/detail-b", ["EGYM", "Quick start"]),
    ],
  },
];
