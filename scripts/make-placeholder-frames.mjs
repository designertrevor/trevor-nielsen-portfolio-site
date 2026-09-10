/* Generates DD-styled placeholder SVGs for every frame in lib/work.ts.
   Temporary scaffolding: real screenshots replace these files one by one
   (same folder, any raster format, then update the src in lib/work.ts).
   Frame lists are duplicated from lib/work.ts because Node can't import TS;
   this script dies with the last placeholder, so drift doesn't matter.
   Run: node scripts/make-placeholder-frames.mjs */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TINTS = {
  blue: "#d3d8eb",
  pink: "#e7dae4",
  sand: "#ebe4db",
};
const INK = "#2d1f1a";

const PROJECTS = [
  {
    slug: "kleo",
    name: "Kleo",
    tint: "blue",
    sets: {
      "": ["Chrome extension", "Premium web app", "Design system", "Landing page", "Analytics view", "Launch page"],
      "detail-a": ["Extension detail", "Formatting tools"],
      "detail-b": ["Premium dashboard", "Analytics"],
    },
  },
  {
    slug: "dozen",
    name: "Dozen",
    tint: "pink",
    sets: {
      "": ["Seller onboarding", "Storefront", "Buyer browse", "Checkout", "Order tracking"],
      "detail-a": ["Seller flows", "Listings"],
      "detail-b": ["Buyer flows", "Cart"],
    },
  },
  {
    slug: "ifit",
    name: "iFIT",
    tint: "sand",
    sets: {
      "": ["AI Coach chat", "Workout flow", "EGYM screens", "Coach profile", "Progress view"],
      "detail-a": ["Coach chat", "Check-ins"],
      "detail-b": ["EGYM", "Quick start"],
    },
  },
];

function slugify(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function svg({ name, label, index, total, tint }) {
  const w = 1440;
  const h = 960;
  const bg = TINTS[tint];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="${w / 2 - 340}" y="${h / 2 - 150}" width="680" height="300" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-dasharray="10 8"/>
  <text x="50%" y="${h / 2 - 24}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="3" fill="${INK}">${label.toUpperCase()}</text>
  <text x="50%" y="${h / 2 + 28}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="${INK}" fill-opacity="0.55">${name.toUpperCase()} · PLACEHOLDER · ${index}/${total}</text>
  <text x="50%" y="${h / 2 + 96}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="17" fill="${INK}" fill-opacity="0.45">Drop the real screenshot in /public/work and update lib/work.ts</text>
</svg>
`;
}

const BRANDS = [
  { slug: "saddle-rock", name: "Saddle Rock", mark: "SR", labels: ["Mark", "Signage", "Business card", "App icon"] },
  { slug: "linkd-performance", name: "Linkd Performance", mark: "▲▲", labels: ["Mark", "Signage", "Business card", "App icon"] },
  { slug: "meridian", name: "Meridian", mark: "M◈", labels: ["Mark", "Signage", "Business card", "App icon"] },
  { slug: "bandit", name: "Bandit", mark: "BB", labels: ["Mark", "Packaging", "Tote", "Sticker"] },
  { slug: "rivet-health", name: "Rivet Health", mark: "RH", labels: ["Mark", "Style guide", "App icon"] },
  { slug: "cheal-king", name: "Cheal King", mark: "CK", labels: ["Mark", "Badge set", "Poster"] },
];

const WEBSITES = ["Rock Creek Crates", "LabFinder", "Nuage", "Adan"];
const WEBSITE_TINTS = ["sand", "blue", "pink", "sand"];

/* Brand tiles: white card surface; the first frame shows the mark itself */
function brandSvg({ name, mark, label, index, total }) {
  const w = 1200;
  const h = 900;
  const center =
    index === 1
      ? `<text x="50%" y="${h / 2 + 55}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="170" font-weight="800" fill="${INK}">${mark}</text>`
      : `<text x="50%" y="${h / 2 - 10}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="40" font-weight="800" letter-spacing="4" fill="${INK}">${label.toUpperCase()}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#ffffff"/>
  ${center}
  <text x="50%" y="${h - 60}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="24" font-weight="600" letter-spacing="2" fill="${INK}" fill-opacity="0.45">${name.toUpperCase()} · PLACEHOLDER · ${index}/${total}</text>
</svg>
`;
}

let count = 0;
for (const project of PROJECTS) {
  for (const [set, labels] of Object.entries(project.sets)) {
    const dir = join("public", "work", project.slug, set);
    mkdirSync(dir, { recursive: true });
    labels.forEach((label, i) => {
      const file = join(dir, `${String(i + 1).padStart(2, "0")}-${slugify(label)}.svg`);
      writeFileSync(
        file,
        svg({ name: project.name, label, index: i + 1, total: labels.length, tint: project.tint })
      );
      count++;
    });
  }
}
for (const brand of BRANDS) {
  const dir = join("public", "work", "brands", brand.slug);
  mkdirSync(dir, { recursive: true });
  brand.labels.forEach((label, i) => {
    const file = join(dir, `${String(i + 1).padStart(2, "0")}-${slugify(label)}.svg`);
    writeFileSync(
      file,
      brandSvg({ name: brand.name, mark: brand.mark, label, index: i + 1, total: brand.labels.length })
    );
    count++;
  });
}

{
  const dir = join("public", "work", "websites");
  mkdirSync(dir, { recursive: true });
  WEBSITES.forEach((label, i) => {
    const file = join(dir, `${String(i + 1).padStart(2, "0")}-${slugify(label)}.svg`);
    writeFileSync(
      file,
      svg({ name: "Websites", label, index: i + 1, total: WEBSITES.length, tint: WEBSITE_TINTS[i] })
    );
    count++;
  });
}

console.log(`Wrote ${count} placeholder frames.`);
