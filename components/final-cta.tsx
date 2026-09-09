import { CopyEmailButton } from "@/components/copy-email-button";
import { ContourLayer, GlowHalftone } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-20 text-center sm:px-9 sm:py-24">
      <ContourLayer className="opacity-25" />
      {/* Lantern glow centered behind the heading, a notch above the badge
          instance but still a whisper */}
      <GlowHalftone className="top-28 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] sm:top-32" />
      <Reveal>
        <h2 className="font-serif text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-[44px]">
          Have a gap to fill?
        </h2>
        <p className="mt-3 text-[15px] text-muted-foreground">
          30 minutes. Bring the situation, leave with a plan.
        </p>
      </Reveal>
      <Reveal
        delay={120}
        className="mt-7 flex flex-wrap items-center justify-center gap-4"
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
    </section>
  );
}
