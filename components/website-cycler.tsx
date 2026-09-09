"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { WorkFrame } from "@/lib/work";

const CYCLE_MS = 3200;

/* One large frame slowly auto-cycling through the site screenshots with a
   label and counter. Reduced motion disables the auto-cycle; a click or tap
   advances a frame either way. */
export function WebsiteCycler({ frames }: { frames: WorkFrame[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % frames.length),
      CYCLE_MS
    );
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <figure
      className="relative cursor-pointer touch-manipulation overflow-hidden outline-1 -outline-offset-1 outline-(--image-outline)"
      onClick={() => setIndex((i) => (i + 1) % frames.length)}
    >
      <div className="h-[300px] sm:h-[420px]">
        {frames.map((frame, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={frame.src}
            src={frame.src}
            alt={`Website: ${frame.label}`}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
      <figcaption className="absolute bottom-3 left-3 z-10 bg-panel px-3 py-2 font-sans text-[11px] font-extrabold tracking-[0.07em] text-panel-foreground uppercase">
        {frames[index].label}
      </figcaption>
      <span className="absolute right-3 bottom-3 z-10 bg-panel px-3 py-2 font-sans text-[11px] font-extrabold tracking-[0.07em] text-panel-foreground uppercase">
        {index + 1}/{frames.length}
      </span>
    </figure>
  );
}
