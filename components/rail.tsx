import { CopyEmailButton } from "@/components/copy-email-button";
import { LocalClock } from "@/components/local-clock";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const STATS = [
  { value: "13 yrs", label: "designing products" },
  { value: "21+", label: "clients in 3 years" },
  { value: "1yr 8mo", label: "longest engagement" },
];

const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin, destination: "linkedin" },
  { label: "X", href: SITE.x, destination: "x" },
  {
    label: "Discoverable Designer",
    href: SITE.newsletter,
    destination: "discoverable-designer",
  },
];

/* The sticky left rail: the zero-click layer. Collapses to a normal top
   section on mobile. */
export function Rail() {
  return (
    <header className="flex flex-col border-b border-border px-6 py-8 lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:border-r lg:border-b-0 lg:px-9 lg:py-10">
      <div className="rise rise-1 flex items-center justify-between gap-4">
        <span className="font-sans text-base font-extrabold tracking-tight">
          trevor nielsen
        </span>
        <span className="text-xs text-muted-foreground">
          Smithfield · <LocalClock />
        </span>
      </div>

      <span className="rise rise-2 mt-9 inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 font-sans text-xs font-semibold">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-success"
        />
        Available for new projects
      </span>

      <h1 className="rise rise-3 mt-5 font-serif text-[34px] leading-[1.1] font-semibold tracking-tight text-balance">
        Senior product design for teams with a gap to fill.
      </h1>
      <p className="rise rise-3 mt-4 text-[15px] leading-relaxed text-pretty text-muted-foreground">
        I join fast, adapt to your design system, and hold my own without
        oversight.
      </p>

      <dl className="rise rise-4 mt-7 flex flex-col gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-serif text-2xl font-semibold tracking-tight">
              {stat.value}
            </dd>
            <dd className="text-[13px] text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="rise rise-5 mt-7 flex flex-col gap-3.5">
        <Button
          asChild
          className="h-14 w-full border-0 px-8 text-base font-semibold hover:bg-foreground/85 active:scale-[0.96]"
        >
          <TrackedLink
            href={SITE.booking}
            destination="tidycal"
            placement="rail"
          >
            Book a call
          </TrackedLink>
        </Button>
        <CopyEmailButton className="w-full" />
      </div>

      <p className="rise rise-6 mt-auto pt-10 text-[13px] text-muted-foreground">
        {SOCIALS.map((social, i) => (
          <span key={social.label}>
            {i > 0 && " · "}
            <TrackedLink
              href={social.href}
              destination={social.destination}
              placement="rail"
              className="transition-colors hover:text-foreground"
            >
              {social.label}
            </TrackedLink>
          </span>
        ))}
      </p>
    </header>
  );
}
