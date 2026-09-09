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
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${INK}" stroke-opacity="0.15"/>
  <rect x="${w / 2 - 340}" y="${h / 2 - 150}" width="680" height="300" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-dasharray="10 8"/>
  <text x="50%" y="${h / 2 - 24}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="3" fill="${INK}">${label.toUpperCase()}</text>
  <text x="50%" y="${h / 2 + 28}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="${INK}" fill-opacity="0.55">${name.toUpperCase()} · PLACEHOLDER · ${index}/${total}</text>
  <text x="50%" y="${h / 2 + 96}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="17" fill="${INK}" fill-opacity="0.45">Drop the real screenshot in /public/work and update lib/work.ts</text>
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
console.log(`Wrote ${count} placeholder frames.`);
