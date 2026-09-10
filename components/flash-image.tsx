"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { WorkFrame } from "@/lib/work";

const FLASH_MS = 350;

/* Hover-flash work image. At rest it shows the first frame. On hover it
   cycles through the project's frames every ~350ms, crossfading, with a
   label and counter chip overlaid ("Premium web app · 2/6"). Reduced motion
   turns the cycle into a single swap to the next frame. On touch, a tap
   advances one frame. */
const TINT_BG = {
  blue: "bg-tint-blue",
  pink: "bg-tint-pink",
  sand: "bg-tint-sand",
} as const;

export function FlashImage({
  projectName,
  frames,
  tint,
  className,
}: {
  projectName: string;
  frames: WorkFrame[];
  /* Ground behind the frames. The tint tokens darken themselves in dark
     mode (DD rules), so when Trevor's transparent UI shots replace the
     opaque placeholders, dark mode stops being a wall of bright panels.
     Omit for a plain card ground (brand tiles). */
  tint?: keyof typeof TINT_BG;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(false);
  const hoverCapable = useRef(false);

  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    hoverCapable.current = window.matchMedia("(hover: hover)").matches;
    return stop;
  }, []);

  function handleEnter() {
    /* Touch fires a phantom mouseenter before the tap; without real hover,
       the click handler owns the interaction (one frame per tap) */
    if (!hoverCapable.current) return;
    setEngaged(true);
    if (frames.length < 2) return;
    if (reducedMotion.current) {
      setIndex((i) => (i + 1) % frames.length);
      return;
    }
    setIndex(0);
    stop();
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, FLASH_MS);
  }

  function handleLeave() {
    /* Touch fires stray mouseleaves too; keep the tapped frame in place */
    if (!hoverCapable.current) return;
    stop();
    setEngaged(false);
    setIndex(0);
  }

  function handleTap() {
    /* Touch: no hover cycle running, so advance a frame per tap */
    if (timer.current) return;
    setEngaged(true);
    setIndex((i) => (i + 1) % frames.length);
  }

  return (
    <figure
      className={cn(
        "relative cursor-pointer touch-manipulation overflow-hidden",
        tint ? TINT_BG[tint] : "bg-card",
        className
      )}
      style={{ backgroundImage: "var(--grain)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTap}
    >
      {frames.map((frame, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={frame.src}
          src={frame.src}
          alt={`${projectName}: ${frame.label}`}
          loading={i === 0 ? "eager" : "lazy"}
          className={cn(
            /* dark:brightness dims the opaque placeholder frames; drop it
               once real transparent UI shots land on the tinted ground */
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-120 dark:brightness-75",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <figcaption
        aria-hidden={!engaged}
        className={cn(
          "absolute bottom-3 left-3 z-10 bg-panel px-3 py-2 font-sans text-[11px] font-extrabold tracking-[0.07em] text-panel-foreground uppercase transition-opacity duration-120",
          engaged ? "opacity-100" : "opacity-0"
        )}
      >
        {frames[index].label} · {index + 1}/{frames.length}
      </figcaption>
    </figure>
  );
}
