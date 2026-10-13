/* Generates DD-styled placeholder SVGs for every frame in lib/work.ts.
   Temporary scaffolding: real screenshots replace these files one by one
   (same folder, any raster format, then update the src in lib/work.ts).
   Frame lists are duplicated from lib/work.ts because Node can't import TS;
   this script dies with the last placeholder, so drift doesn't matter.
   Run: node scripts/make-placeholder-frames.mjs */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/* Placeholders are TRANSPARENT: the FlashImage container paints the ground
   (pastel tint in light mode, gray surface in dark), exactly like the real
   transparent UI shots will. Mid-gray ink reads on both grounds. */
const INK = "#8b8680";

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

function svg({ name, label, index, total }) {
  const w = 1440;
  const h = 960;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="${w / 2 - 340}" y="${h / 2 - 150}" width="680" height="300" fill="none" stroke="${INK}" stroke-opacity="0.6" stroke-dasharray="10 8"/>
  <text x="50%" y="${h / 2 - 24}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="3" fill="${INK}">${label.toUpperCase()}</text>
  <text x="50%" y="${h / 2 + 28}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="${INK}" fill-opacity="0.8">${name.toUpperCase()} · PLACEHOLDER · ${index}/${total}</text>
  <text x="50%" y="${h / 2 + 96}" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="17" fill="${INK}" fill-opacity="0.7">Drop the real screenshot in /public/work and update lib/work.ts</text>
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
