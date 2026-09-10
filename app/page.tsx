import { BrandingSection } from "@/components/branding-section";
import { Eyebrow } from "@/components/eyebrow";
import { FinalCta } from "@/components/final-cta";
import { Rail } from "@/components/rail";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";
import { ContourLayer } from "@/components/texture";
import { TintPanel } from "@/components/tint-panel";
import { TwoWaysIn } from "@/components/two-ways-in";
import { WebsitesSection } from "@/components/websites-section";
import { WorkProjectSection } from "@/components/work-project";
import { WritingSection } from "@/components/writing-section";
import { PROJECTS } from "@/lib/work";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-[380px_1fr]">
      <Rail />
      <main>
        {PROJECTS.map((project) => (
          <WorkProjectSection key={project.slug} project={project} />
        ))}
        <BrandingSection />
        <WebsitesSection />
        <section className="px-6 py-16 sm:px-9 sm:py-24">
          {/* Floating box, matching the final CTA treatment */}
          <TintPanel className="relative isolate overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
            <ContourLayer className="opacity-40" />
            <Reveal>
              <Eyebrow as="h2" className="mb-12">
                What clients say
              </Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <Testimonials />
            </Reveal>
          </TintPanel>
        </section>
        <TwoWaysIn />
        <WritingSection />
        <FinalCta />
        <SiteFooter />
      </main>
    </div>
  );
}
