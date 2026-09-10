import { LocalClock } from "@/components/local-clock";

/* The bottom of the scroll: Trevor's hand-drawn trailhead scene, edge to
   edge, with the copyright line hugged underneath. The scene ships in a
   light and a dark version; a soft token-colored fade at the top blends
   the artwork's sky into the page background in both themes. */
export function SiteFooter() {
  return (
    <footer>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/textures/footer-scene-light.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/textures/footer-scene-dark.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="hidden w-full dark:block"
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
