import { LocalClock } from "@/components/local-clock";
import { ContourLayer } from "@/components/texture";
import { TrackedLink } from "@/components/tracked-link";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin, destination: "linkedin" },
  { label: "X", href: SITE.x, destination: "x" },
  {
    label: "Discoverable Designer",
    href: SITE.newsletter,
    destination: "discoverable-designer",
  },
];

/* Slim footer bar on the DD dark inset panel. Hand-applied grain is the
   design system's one grandfathered exception for the dark panel. */
export function SiteFooter() {
  return (
    <footer
      className="relative isolate flex flex-wrap items-center justify-between gap-2.5 overflow-hidden bg-panel px-6 py-6 text-[13px] text-panel-foreground/70 sm:px-9"
      style={{ backgroundImage: "var(--grain)" }}
    >
      {/* Dense terrain strip along the bottom edge; the panel is dark in
          both themes, so the art is always inverted to light linework */}
      <ContourLayer
        density="dense"
        className="invert mix-blend-screen opacity-[0.13]"
        style={{
          backgroundPosition: "bottom",
          maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 40%, transparent 100%)",
        }}
      />
      <span>
        © Trevor Nielsen · Smithfield, UT · <LocalClock />
      </span>
      {/* TODO: Trevor supplies the real sign-off line */}
      <span className="italic">Fun personal sign-off line goes here</span>
      <span>
        {SOCIALS.map((social, i) => (
          <span key={social.label}>
            {i > 0 && " · "}
            <TrackedLink
              href={social.href}
              destination={social.destination}
              placement="footer"
              className="transition-colors hover:text-panel-foreground"
            >
              {social.label}
            </TrackedLink>
          </span>
        ))}
      </span>
    </footer>
  );
}
