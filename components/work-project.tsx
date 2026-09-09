import { Eyebrow } from "@/components/eyebrow";
import { FlashImage } from "@/components/flash-image";
import { Reveal } from "@/components/reveal";
import type { WorkProject } from "@/lib/work";

export function WorkProjectSection({ project }: { project: WorkProject }) {
  return (
    <article className="border-b border-border px-6 py-12 sm:px-9 sm:py-16">
      <Reveal>
        <Eyebrow tone="soft">{project.eyebrow}</Eyebrow>
        <h2 className="mt-2 font-serif text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-[1.75] text-muted-foreground">
          {project.intro}
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-7">
        <FlashImage
          projectName={project.name}
          frames={project.hero}
          className="h-[360px] sm:h-[480px]"
        />
      </Reveal>
      <Reveal delay={200} className="mt-5 grid gap-5 sm:grid-cols-2">
        {project.details.map((frames) => (
          <FlashImage
            key={frames[0].src}
            projectName={project.name}
            frames={frames}
            className="h-[240px] sm:h-[280px]"
          />
        ))}
      </Reveal>
      <Reveal delay={240} className="mt-5">
        <Eyebrow
          as="span"
          size="sm"
          tone="soft"
          className="inline-block border border-border px-3 py-1.5"
        >
          {project.tag}
        </Eyebrow>
      </Reveal>
    </article>
  );
}
