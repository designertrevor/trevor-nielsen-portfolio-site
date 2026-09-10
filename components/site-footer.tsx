import { LocalClock } from "@/components/local-clock";
import { SocialLinks } from "@/components/social-links";
import { ContourLayer } from "@/components/texture";
import { ThemeToggle } from "@/components/theme-toggle";

/* Footer info line on paper, then the bottom of the scroll fills edge to
   edge with the hand-drawn terrain illustration (Trevor's scratchy black
   and white LinkedIn style). Until the real artwork lands, a dense-contour
   stand-in holds the slot. Drop the final art at
   public/textures/footer-scene.webp (wide, ~2880px, paper or transparent
   ground) and swap the placeholder block for an <img>. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="px-6 pt-8 pb-4 sm:px-9">
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-[15px] text-muted-foreground">
          <span>
            © Trevor Nielsen · Smithfield, UT · <LocalClock />
          </span>
          {/* TODO: Trevor supplies the real sign-off line */}
          <span className="italic">Fun personal sign-off line goes here</span>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <SocialLinks placement="footer" iconClassName="size-6" />
          <ThemeToggle />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative isolate mt-6 h-[240px] overflow-hidden sm:h-[340px]"
      >
        <ContourLayer
          density="dense"
          className="opacity-50"
          style={{
            backgroundPosition: "bottom",
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />
        <p className="absolute inset-x-6 bottom-8 text-center font-sans text-[11px] font-extrabold tracking-[0.07em] text-muted-foreground/60 uppercase">
          Illustration slot: hand-drawn terrain scene lands here, edge to edge
        </p>
      </div>
    </footer>
  );
}
