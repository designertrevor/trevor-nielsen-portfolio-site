import { LocalClock } from "@/components/local-clock";

/* The bottom of the scroll: Trevor's hand-drawn trailhead scene, edge to
   edge, with the copyright line hugged underneath. The scene ships in a
   light and a dark version; a soft token-colored fade at the top blends
   the artwork's sky into the page background in both themes. */
export function SiteFooter() {
  return (
    <footer>
      <div className="relative">
        {/* One artwork, blended instead of pasted: multiply sinks the sky
            into the paper in light mode; invert + screen turns the same ink
            into light linework on the dark page. No baked background, no
            seam, and the drawing sits a register quieter. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/textures/footer-scene-light.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full mix-blend-multiply opacity-90 dark:opacity-45 dark:grayscale dark:invert dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
          style={{
            background:
              "linear-gradient(to bottom, var(--background), transparent)",
          }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-6 pt-3 pb-8 text-[13px] text-muted-foreground sm:px-9">
        <span>
          © Trevor Nielsen · Smithfield, UT · <LocalClock />
        </span>
        {/* TODO: Trevor supplies the real sign-off line */}
        <span className="italic">Fun personal sign-off line goes here</span>
      </div>
    </footer>
  );
}
