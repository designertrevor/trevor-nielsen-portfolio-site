import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { WebsiteCycler } from "@/components/website-cycler";
import { WEBSITES } from "@/lib/work";

export function WebsitesSection() {
  return (
    <article className="border-b border-border px-6 py-12 sm:px-9 sm:py-16">
      <Reveal>
        <Eyebrow tone="soft">Also in the toolkit</Eyebrow>
        <h2 className="mt-2 font-serif text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
          Websites
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-[1.75] text-muted-foreground">
          Marketing sites designed by someone who builds products all day, so
          the site and the product feel like the same company. One is in
          progress right now.
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-7">
        <WebsiteCycler frames={WEBSITES} />
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Auto-cycles every few seconds: Rock Creek Crates · LabFinder · Nuage
          · Adan
        </p>
      </Reveal>
    </article>
  );
}
