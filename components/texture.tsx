import { cn } from "@/lib/utils";

/* Brand texture layers: wayfinding and terrain (topo contours, surveyor
   grid, lantern-light falloff). Global rules:
   - Textures whisper. Perceived ink stays at or under ~10%; the supplied
     contour artwork is pre-lightened, so the CSS opacity values used at
     call sites are tuned to land below that ceiling, not at it.
   - Never behind or on top of work screenshots.
   - Static only, aria-hidden, pointer-events-none, -z-10 inside a
     positioned, isolated parent (`relative isolate`). */

/* Artwork ships at native resolution (1536px landscape / rotated portrait
   for the tall rail). Draw it at or below native device pixels — size with
   an explicit backgroundSize at ~half the source's pixel width for retina
   1:1 — rather than letting `cover` upscale it, or the lines go soft. */
const CONTOURS = {
  light: "/textures/01-contour-light.webp",
  lightTall: "/textures/01-contour-light-tall.webp",
  dense: "/textures/02-contour-dense.webp",
} as const;

/* Topographic contour wash. Multiply blend lets the artwork's white ground
   disappear into the paper. Pass opacity (and any mask) via className/style;
   keep it faint. */
export function ContourLayer({
  density = "light",
  className,
  style,
}: {
  density?: keyof typeof CONTOURS;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 mix-blend-multiply",
        className
      )}
      style={{
        backgroundImage: `url(${CONTOURS[density]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    />
  );
}

/* Lantern-glow halftone: a radial dot grid whose dots decay from the
   center, drawn procedurally so it stays crisp at any size. Sized by its
   container via viewBox; ink follows --foreground. */
export function GlowHalftone({ className }: { className?: string }) {
  const size = 360;
  const spacing = 11;
  const maxDot = 2.4;
  const half = size / 2;
  const dots: React.ReactNode[] = [];
  for (let y = spacing / 2; y < size; y += spacing) {
    for (let x = spacing / 2; x < size; x += spacing) {
      const d = Math.hypot(x - half, y - half) / half;
      if (d >= 1) continue;
      const r = maxDot * Math.pow(1 - d, 1.7);
      if (r < 0.2) continue;
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={r} />);
    }
  }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10", className)}
      fill="var(--foreground)"
    >
      {dots}
    </svg>
  );
}

/* Surveyor grid: 32px cells with small plus-marks every 4th intersection.
   Procedural for crispness; hairlines at ~5%, plus-marks at ~10% of the
   layer's own ink, with the whole layer faded further at the call site. */
export function SurveyorGrid({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const cell = 32;
  const tile = cell * 4;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${tile}' height='${tile}'>
    <g stroke='%231A1A1A' stroke-opacity='0.05' stroke-width='1'>
      ${[1, 2, 3].map((i) => `<path d='M${i * cell} 0V${tile} M0 ${i * cell}H${tile}'/>`).join("")}
      <path d='M${tile} 0V${tile} M0 ${tile}H${tile}'/>
    </g>
    <path d='M-4 0H4 M0 -4V4 M${tile - 4} 0h8 M${tile} -4v8 M-4 ${tile}h8 M0 ${tile - 4}v8 M${tile - 4} ${tile}h8 M${tile} ${tile - 4}v8' stroke='%231A1A1A' stroke-opacity='0.1' stroke-width='1'/>
  </svg>`;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg.replace(/\n\s*/g, " ")}")`,
        backgroundRepeat: "repeat",
        ...style,
      }}
    />
  );
}
