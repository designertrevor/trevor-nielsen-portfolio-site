import { Eyebrow } from "@/components/eyebrow";
import { SurveyorGrid } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { TintPanel } from "@/components/tint-panel";

/* The two engagement models. The sprint card carries the DD poster
   treatment (tint + hard offset shadow) to echo the wireframe's heavier
   border: it is the emphasized option. */
export function TwoWaysIn() {
  return (
    <section className="relative isolate border-b border-border px-6 py-16 sm:px-9 sm:py-20">
      {/* Surveyor grid: planning/scoping terrain under the two engagement
          cards, fading out toward the section edges */}
      <SurveyorGrid
        className="opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 90% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 90% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <Reveal>
        <Eyebrow as="h2" className="mb-11 text-center">
          Two ways in
        </Eyebrow>
      </Reveal>
      <Reveal delay={120} className="mx-auto grid max-w-[860px] gap-5 sm:grid-cols-2">
        <div className="border border-border bg-card p-7 sm:p-9">
          <Eyebrow as="h3" size="sm" tone="soft">
            Embedded design
          </Eyebrow>
          <p className="mt-2 font-serif text-[28px] font-semibold tracking-tight">
            3–12 months
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            Your senior designer, full weeks or fractional. Your tools, your
            design system, your cadence. Best for leaves, hiring bridges, and
            funding pushes.
          </p>
        </div>
        <TintPanel tint="sand" className="card-sand p-7 sm:p-9">
          <Eyebrow as="h3" size="sm" tone="soft">
            The 3-month sprint
          </Eyebrow>
          <p className="mt-2 font-serif text-[28px] font-semibold tracking-tight">
            Fixed scope
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-foreground/70">
            One product, three months, a defined outcome. Build, build, then
            test and finish. Modeled on real shipped projects.
          </p>
        </TintPanel>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Pricing is scoped to the engagement on the intro call.
        </p>
      </Reveal>
    </section>
  );
}
