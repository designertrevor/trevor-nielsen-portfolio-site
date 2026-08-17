# Trevor Nielsen Portfolio Site

Trevor's personal portfolio site, served at https://trevornielsen.com. The current one-pager in `app/page.tsx` is a **temporary placeholder** (handwritten-style note on a warm cream background) that replaced his old Framer site; the real portfolio is being rebuilt in public in this repo.

Tech stack: Next.js App Router (TypeScript), Tailwind CSS v4 (CSS-first config in `app/globals.css` — no tailwind.config), shadcn components.
When building UI, use shadcn components from `@/components/ui/` (add more with `npx shadcn@latest add <name>`).

Notes:
- Fonts are loaded in `app/layout.tsx` via `next/font/google`: Geist (`--font-sans`), Geist Mono (`--font-mono`), and Caveat (`--font-hand`, used by the placeholder page).
- The `:root` `--background`/`--foreground` tokens in `app/globals.css` are set to the placeholder palette (#EBE4DB / #090806); restore a proper token palette when the real design system lands.

Analytics: Vercel Web Analytics only (cookieless — no consent banner needed). `<Analytics />` renders once in `app/layout.tsx`; there is no Google Analytics tag and none should be added. Speed Insights was deliberately skipped — it is a paid add-on.
**Every new outbound/CTA link should use `<TrackedLink>` from `@/components/tracked-link` rather than a bare `<a>`,** so clicks fire a custom `Outbound Link` event. Pass `destination` (where it goes) and `placement` (where on the page it lives) — keep those values short and stable so they stay groupable in the dashboard as the site grows.
