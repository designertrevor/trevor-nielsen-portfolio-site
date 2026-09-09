import { Rail } from "@/components/rail";
import { WorkProjectSection } from "@/components/work-project";
import { PROJECTS } from "@/lib/work";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-[380px_1fr]">
      <Rail />
      <main>
        {PROJECTS.filter((p) => p.slug === "kleo").map((project) => (
          <WorkProjectSection key={project.slug} project={project} />
        ))}
        {/* Remaining sections (Dozen, iFIT, branding, websites, testimonials,
            Two Ways In, writing, final CTA, footer) land after the design
            direction is confirmed. */}
      </main>
    </div>
  );
}
