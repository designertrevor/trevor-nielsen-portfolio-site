import { ArrowRight } from "@/components/arrow-right";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SocialLinks } from "@/components/social-links";
import { ContourLayer, GlowHalftone } from "@/components/texture";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocalClock } from "@/components/local-clock";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

/* Stat values split into number and unit parts so units can render
   smaller and softer than the figures */
const STATS: { parts: { text: string; unit?: boolean }[]; label: string }[] = [
  { parts: [{ text: "13" }, { text: "yrs", unit: true }], label: "designing products" },
  { parts: [{ text: "21+" }], label: "clients in 3 years" },
  {
    parts: [
      { text: "1" },
      { text: "yr", unit: true },
      { text: "8" },
      { text: "mo", unit: true },
    ],
    label: "longest engagement",
  },
];

/* The sticky left rail: the zero-click layer. Collapses to a normal top
   section on mobile. */
export function Rail() {
  return (
    <header className="relative isolate flex flex-col overflow-hidden border-b border-border px-6 py-8 lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:border-r lg:border-b-0 lg:px-9 lg:py-10">
      {/* Contour wash, strongest in the empty space at the bottom of the
          rail, fading out under the text */}
      <ContourLayer
        density="lightTall"
        className="opacity-50"
        style={{
          backgroundSize: "512px auto",
          backgroundPosition: "bottom",
          maskImage:
            "linear-gradient(to top, black 25%, rgba(0,0,0,0.45) 55%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 25%, rgba(0,0,0,0.45) 55%, transparent 80%)",
        }}
      />
      <div className="rise rise-1 flex items-center justify-between gap-4">
        <span className="font-sans text-base font-extrabold tracking-tight">
          trevor nielsen
        </span>
        <span className="text-xs text-muted-foreground">
          Smithfield · <LocalClock />
        </span>
      </div>

      <div className="rise rise-2 relative mt-9 self-start">
        {/* Faint lantern-glow patch centered behind the badge */}
        <GlowHalftone className="top-1/2 left-1/2 size-[230px] -translate-x-1/2 -translate-y-1/2 opacity-[0.09]" />
        {/* Availability badge doubles as a booking link: the resting label
            swipes up and away on hover, "Book a 15-minute call" swipes in
            with the DD arrow reveal */}
        <TrackedLink
          href={SITE.booking}
          destination="tidycal"
          placement="rail-availability"
          className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-sans text-xs font-semibold"
        >
          <span aria-hidden="true" className="relative size-2 shrink-0">
            <span className="pulse-ring absolute inset-0 rounded-full bg-success-bright" />
            <span className="absolute inset-0 rounded-full bg-success-bright" />
          </span>
          <span className="grid overflow-hidden">
            <span className="col-start-1 row-start-1 whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-[130%] motion-reduce:transition-none">
              Available for new projects
            </span>
            <span
              aria-hidden="true"
              className="col-start-1 row-start-1 translate-y-[130%] whitespace-nowrap text-center transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 motion-reduce:transition-none"
            >
              Book a 15-minute call <ArrowRight className="arrow-reveal" />
            </span>
          </span>
        </TrackedLink>
      </div>

      <h1 className="rise rise-3 mt-6 font-serif text-[40px] leading-[1.05] font-semibold tracking-tight text-balance">
        Senior product design for teams with a gap to fill.
      </h1>
      <p className="rise rise-3 mt-4 text-[15px] leading-relaxed text-pretty text-muted-foreground">
        I join fast, adapt to your design system, and hold my own without
        oversight.
      </p>

      <dl className="rise rise-4 mt-7 flex flex-col gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-serif text-2xl font-semibold tracking-tight">
              {stat.parts.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.unit
                      ? "mr-1 ml-0.5 text-base font-medium text-foreground/55"
                      : undefined
                  }
                >
                  {part.text}
                </span>
              ))}
            </dd>
            <dd className="text-[13px] text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="rise rise-5 mt-7 flex flex-col gap-3.5">
        <Button
          asChild
          className="h-14 w-full border-0 px-8 text-base font-semibold hover:bg-foreground/85 active:scale-[0.96]"
        >
          <TrackedLink
            href={SITE.booking}
            destination="tidycal"
            placement="rail"
          >
            Book a call
          </TrackedLink>
        </Button>
        <CopyEmailButton className="w-full" />
      </div>

      <div className="rise rise-6 mt-auto flex items-center justify-between pt-10">
        <SocialLinks placement="rail" />
        <ThemeToggle />
      </div>
    </header>
  );
}
