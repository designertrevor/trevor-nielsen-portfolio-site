import { CopyEmailButton } from "@/components/copy-email-button";
import { ContourLayer } from "@/components/texture";
import { TintPanel } from "@/components/tint-panel";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="px-6 py-16 sm:px-9 sm:py-24">
      {/* Floating box at the same width as the large thumbnails, so the
          footer scene beneath reads as connected background */}
      <TintPanel className="relative isolate overflow-hidden px-6 py-20 text-center sm:px-12 sm:py-28">
        <ContourLayer className="opacity-40" />
        <Reveal>
          <h2 className="font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-7xl">
            Have a gap to fill?
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            30 minutes. Bring the situation, leave with a plan.
          </p>
        </Reveal>
        <Reveal
          delay={120}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
        <Button
          asChild
          className="h-14 w-full border-0 px-8 text-base font-semibold hover:bg-foreground/85 active:scale-[0.96] sm:w-auto"
        >
          <TrackedLink
            href={SITE.booking}
            destination="tidycal"
            placement="final-cta"
          >
            Book an intro call
          </TrackedLink>
        </Button>
          <CopyEmailButton className="w-full sm:w-auto" />
        </Reveal>
      </TintPanel>
    </section>
  );
}
