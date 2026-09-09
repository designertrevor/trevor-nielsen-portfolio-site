# Trevor Nielsen Portfolio Site

Trevor's personal portfolio site, served at https://trevornielsen.com. This branch holds the MVP rebuild: a single-page freelance portfolio (sticky left rail + scrolling work column) that converts founders and product leaders into intro calls. It replaces the handwritten-note placeholder still live on `main`; do not push to `main` until Trevor says to go live.

Source-of-truth split for this build:
- **Structure, section order, copy, and interaction behavior** come from Trevor's wireframe (`trevornielsen-mvp-wireframe.html`, kept outside the repo). Copy is verbatim; no em dashes anywhere; bracketed placeholders like `[Last name]` are deliberate visible TODOs. Do not add sections the wireframe doesn't have.
- **All visual styling** comes from the DD design system (`designertrevor/dd-starter`): see `DESIGN.md` rules there. Cream paper + grain, espresso ink, pastel poster tints, sharp corners (`--radius: 0rem`), hard offset shadows, Crimson Pro display / Manrope UI. Tokens and motion live in `app/globals.css`; ported components: `TintPanel`, `Eyebrow`, `ArrowRight`, `Reveal`.

Tech stack: Next.js App Router (TypeScript), Tailwind CSS v4 (CSS-first config in `app/globals.css` — no tailwind.config), shadcn components.
When building UI, use shadcn components from `@/components/ui/` (add more with `npx shadcn@latest add <name>`).

Notes:
- Fonts load in `app/layout.tsx` via `next/font/google`: Crimson Pro (`--font-crimson` → `font-serif`) and Manrope (`--font-manrope` → `font-sans`).
- Canonical links (TidyCal booking is still a placeholder) live in `lib/site.ts`.
- Work imagery is config-driven: frames are files under `public/work/<slug>/`, listed in `lib/work.ts` (one line per frame). Current SVGs are generated placeholders (`scripts/make-placeholder-frames.mjs`); real screenshots replace them file-for-file.
- Interactive pieces are client components: `FlashImage` (hover-flash cycling), `WebsiteCycler`, `Testimonials` (10s conic progress ring), `LocalClock` (America/Denver), `CopyEmailButton`. All respect `prefers-reduced-motion`.
- Dark mode: next-themes + the DD `.dark` palette in globals; `ThemeToggle` (DD sun/moon morph) sits beside the clock in the rail. Never pass `disableTransitionOnChange`.
- Texture system (`components/texture.tsx`): wayfinding/terrain layers — contour webp art in `public/textures/`, procedural glow/grid SVG. Textures whisper (≤~10% perceived ink), never behind or over work screenshots, static only, and flip to inverted screen-blend on dark grounds. Draw contour art at native device pixels; never let `cover` upscale it.

Analytics: Vercel Web Analytics only (cookieless — no consent banner needed). `<Analytics />` renders once in `app/layout.tsx`; there is no Google Analytics tag and none should be added. Speed Insights was deliberately skipped — it is a paid add-on.
**Every new outbound/CTA link should use `<TrackedLink>` from `@/components/tracked-link` rather than a bare `<a>`,** so clicks fire a custom `Outbound Link` event. Pass `destination` (where it goes) and `placement` (where on the page it lives) — keep those values short and stable so they stay groupable in the dashboard as the site grows.
