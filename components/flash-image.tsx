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
export function FlashImage({
  projectName,
  frames,
  className,
}: {
  projectName: string;
  frames: WorkFrame[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(false);

  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return stop;
  }, []);

  function handleEnter() {
    setEngaged(true);
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
        "relative cursor-pointer touch-manipulation overflow-hidden outline-1 -outline-offset-1 outline-(--image-outline)",
        className
      )}
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
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-120",
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
