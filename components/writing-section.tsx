import { ArrowRight } from "@/components/arrow-right";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { SITE } from "@/lib/site";

const PROOF = [
  {
    value: "70k",
    label: "LinkedIn followers",
    linkText: "Follow along",
    href: SITE.linkedin,
    destination: "linkedin",
  },
  {
    value: "1,000+",
    label: "newsletter subscribers",
    linkText: "Discoverable Designer",
    href: SITE.newsletter,
    destination: "discoverable-designer",
  },
];

export function WritingSection() {
  return (
    <section className="border-b border-border px-6 py-16 text-center sm:px-9 sm:py-20">
      <Reveal>
        <Eyebrow as="h2" className="mb-11">
          I also think and write about design
        </Eyebrow>
      </Reveal>
      <Reveal
        delay={120}
        className="mb-9 flex flex-wrap justify-center gap-x-16 gap-y-8"
      >
        {PROOF.map((item) => (
          <div key={item.label}>
            <p className="font-serif text-4xl font-semibold tracking-tight">
              {item.value}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-2 text-[13px]">
              <TrackedLink
                href={item.href}
                destination={item.destination}
                placement="writing"
                className="group font-semibold underline underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                {item.linkText} <ArrowRight />
              </TrackedLink>
            </p>
          </div>
        ))}
      </Reveal>
      <Reveal delay={200}>
        <p className="mx-auto max-w-[540px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
          Weekly writing on design careers and getting found. Mostly for
          designers, but clients tell me it&apos;s how they knew I could
          think, not just push pixels.
        </p>
        <p className="mt-7 text-[13px] text-muted-foreground/80">
          This site is young and growing. I&apos;m rebuilding it in public,
          one piece at a time.
        </p>
      </Reveal>
    </section>
  );
}
