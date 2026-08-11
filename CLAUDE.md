# Trevor Nielsen Portfolio Site

Trevor's personal portfolio site, served at https://trevornielsen.com. The current one-pager in `app/page.tsx` is a **temporary placeholder** (handwritten-style note on a near-black background) that replaced his old Framer site; the real portfolio is being rebuilt in public in this repo.

Tech stack: Next.js App Router (TypeScript), Tailwind CSS v4 (CSS-first config in `app/globals.css` — no tailwind.config), shadcn components.
When building UI, use shadcn components from `@/components/ui/` (add more with `npx shadcn@latest add <name>`).

Notes:
- Fonts are loaded in `app/layout.tsx` via `next/font/google`: Geist (`--font-sans`), Geist Mono (`--font-mono`), and Caveat (`--font-hand`, used by the placeholder page).
- The `:root` `--background`/`--foreground` tokens in `app/globals.css` are set to the placeholder palette (#090806 / white); restore a proper token palette when the real design system lands.
