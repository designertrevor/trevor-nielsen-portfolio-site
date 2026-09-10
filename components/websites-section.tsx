import { Eyebrow } from "@/components/eyebrow";
import { FlashImage } from "@/components/flash-image";
import { Reveal } from "@/components/reveal";
import { WEBSITES } from "@/lib/work";

/* Same layout language as the product projects: one full-width hero and a
   two-up below. The hero flips through all four sites on hover; Rock Creek
   Crates shows at rest. */
export function WebsitesSection() {
  return (
    <article className="border-b border-border px-6 py-16 sm:px-9 sm:py-24">
      <Reveal>
        <Eyebrow tone="soft">Also in the toolkit</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
          Websites
        </h2>
        <p className="mt-5 mb-2 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          Marketing sites designed by someone who builds products all day, so
          the site and the product feel like the same company. One is in
          progress right now.
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-8">
        <FlashImage
          projectName="Websites"
          tint="blue"
          frames={WEBSITES}
          className="aspect-[4/5] sm:aspect-[16/10]"
        />
      </Reveal>
      <Reveal delay={200} className="mt-5 grid gap-5 sm:grid-cols-2">
        <FlashImage
          projectName="Websites"
          tint="blue"
          frames={[WEBSITES[1]]}
          className="aspect-[4/3]"
        />
        <FlashImage
          projectName="Websites"
          tint="blue"
          frames={[WEBSITES[2]]}
          className="aspect-[4/3]"
        />
      </Reveal>
      <Reveal delay={240}>
        <p className="mt-4 text-[13px] text-muted-foreground/80">
          Rock Creek Crates · LabFinder · Nuage · Adan
        </p>
      </Reveal>
    </article>
  );
}
