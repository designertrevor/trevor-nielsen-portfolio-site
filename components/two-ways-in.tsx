import { Check } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { SurveyorGrid } from "@/components/texture";
import { TintPanel } from "@/components/tint-panel";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const WAYS = [
  {
    key: "embedded",
    label: "Embedded design",
    headline: "3–12 months",
    includes: [
      "Your senior designer, full weeks or fractional",
      "Your tools, your design system, your cadence",
      "Product design end to end, without oversight",
      "Best for leaves, hiring bridges, and funding pushes",
    ],
  },
  {
    key: "sprint",
    label: "The 3-month sprint",
    headline: "Fixed scope",
    includes: [
      "One product, three months, a defined outcome",
      "Two months of building, one month of testing and finishing",
      "Modeled on real shipped projects",
      "One fixed price, scoped on the intro call",
    ],
  },
];

/* Pricing-page style cards: what the client gets, glanceable, with a
   booking CTA in each. The sprint card carries the DD poster surface
   (static variant: these cards are not clickable, so no hover lift). */
export function TwoWaysIn() {
  return (
    <section className="relative isolate border-b border-border px-6 py-20 sm:px-9 sm:py-28">
      <SurveyorGrid
        className="opacity-85"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 90% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 90% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <Reveal>
        <Eyebrow as="h2" className="mb-12 text-center">
          Two ways in
        </Eyebrow>
      </Reveal>
      <Reveal
        delay={120}
        className="mx-auto grid max-w-[1040px] gap-6 sm:grid-cols-2"
      >
        {WAYS.map((way) => {
          const inner = (
            <>
              <Eyebrow as="h3" size="sm" tone="soft">
                {way.label}
              </Eyebrow>
              <p className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {way.headline}
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {way.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-success"
                    />
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-2">
                <Button
                  asChild
                  className="h-13 w-full border-0 px-8 text-[15px] font-semibold hover:bg-foreground/85 active:scale-[0.96]"
                >
                  <TrackedLink
                    href={SITE.booking}
                    destination="tidycal"
                    placement={`two-ways-${way.key}`}
                  >
                    Book a call
                  </TrackedLink>
                </Button>
              </div>
            </>
          );
          return way.key === "sprint" ? (
            <TintPanel
              key={way.key}
              className="card-sand-static flex flex-col p-8 sm:p-12"
            >
              {inner}
            </TintPanel>
          ) : (
            <div
              key={way.key}
              className="flex flex-col border border-border bg-card p-8 sm:p-12"
            >
              {inner}
            </div>
          );
        })}
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-10 text-center text-[15px] text-muted-foreground">
          Pricing is scoped to the engagement on the intro call.
        </p>
      </Reveal>
    </section>
  );
}
