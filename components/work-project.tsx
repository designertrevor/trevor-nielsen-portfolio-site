import { Eyebrow } from "@/components/eyebrow";
import { FlashImage } from "@/components/flash-image";
import { Reveal } from "@/components/reveal";
import type { WorkProject } from "@/lib/work";

/* Thumbnails are aspect-ratio driven so they scale tall with the column
   instead of going letterbox-skinny on wide screens; mobile heroes go
   portrait-ish so the work stays large. */
export function WorkProjectSection({ project }: { project: WorkProject }) {
  return (
    <article className="border-b border-border px-6 py-16 sm:px-9 sm:py-24">
      <Reveal>
        <div className="flex items-center justify-between gap-6">
          <div>
            <Eyebrow tone="soft">{project.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h2>
          </div>
          {/* Client-logo slot, centered against the eyebrow + headline
              block as one component */}
          {project.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="h-12 w-auto shrink-0 opacity-80 sm:h-16 dark:invert"
            />
          ) : (
            <span className="shrink-0 font-sans text-xl font-extrabold tracking-tight text-muted-foreground sm:text-2xl">
              {project.name}
            </span>
          )}
        </div>
        <p className="mt-5 mb-2 max-w-2xl text-[15px] leading-relaxed text-pretty text-muted-foreground">
          {project.intro}
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-8">
        <FlashImage
          projectName={project.name}
          frames={project.hero}
          tint={project.tint}
          className="aspect-[4/5] sm:aspect-[16/10]"
        />
      </Reveal>
      <Reveal delay={200} className="mt-5 grid gap-5 sm:grid-cols-2">
        {project.details.map((frames) => (
          <FlashImage
            key={frames[0].src}
            projectName={project.name}
            frames={frames}
            tint={project.tint}
            className="aspect-[4/3]"
          />
        ))}
      </Reveal>
      <Reveal delay={240} className="mt-6">
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
