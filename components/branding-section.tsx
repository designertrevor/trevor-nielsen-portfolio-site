import { Eyebrow } from "@/components/eyebrow";
import { FlashImage } from "@/components/flash-image";
import { Reveal } from "@/components/reveal";
import { BRANDS } from "@/lib/work";

export function BrandingSection() {
  return (
    <article className="border-b border-border px-6 py-12 sm:px-9 sm:py-16">
      <Reveal>
        <Eyebrow tone="soft">Also in the toolkit</Eyebrow>
        <h2 className="mt-2 font-serif text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
          Branding and logos
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-[1.75] text-muted-foreground">
          Marks built for screens first, print always. I started in graphic
          design in 2013 and never stopped drawing logos. A dedicated branding
          page with packages is on the way; until then, here&apos;s a taste,
          and I&apos;m happy to share more on a call.
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-7 grid gap-4 sm:grid-cols-3">
        {BRANDS.map((brand) => (
          <FlashImage
            key={brand.slug}
            projectName={brand.name}
            frames={brand.frames}
            className="aspect-[4/3]"
          />
        ))}
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Saddle Rock · Linkd Performance · Meridian · Bandit · Rivet Health ·
          Cheal King
        </p>
      </Reveal>
    </article>
  );
}
