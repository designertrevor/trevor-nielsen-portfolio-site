"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* Bracketed placeholders are deliberate visible TODOs until Trevor confirms
   the details. */
const QUOTES = [
  {
    quote:
      "AI Coach is one of the only projects where I don’t constantly hear ‘it’s blocked by design.’",
    attribution: "Becca [Last name] · Product Manager · iFIT",
    initials: "B",
  },
  {
    quote:
      "He treated our product like it was his own. Great collaborators like him are rare.",
    attribution: "Tyler Kukahiko · [Title] · [Company]",
    initials: "TK",
  },
  {
    quote:
      "He got up to speed on our complex financial workflows incredibly quickly.",
    attribution: "Laura Halliday · Product Manager · Baselane",
    initials: "LH",
  },
  {
    quote:
      "Trevor changed our look from a startup to a professional organization.",
    attribution: "Christina [Last name] · [Title] · [Company]",
    initials: "C",
  },
  {
    quote:
      "You designed it all and gave us a brand, my man! Added legitimacy to the product.",
    attribution: "Jason [Last name] · Founder · [Company]",
    initials: "J",
  },
];

const DURATION = 10_000;

/* Testimonial selector: initials dots, the active one enlarged with a conic
   progress ring that fills over 10s then auto-advances. Pauses while
   hovered; click any dot to jump. Fixed min-heights keep the layout from
   shifting between quotes. Reduced motion disables the auto-advance. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);

  /* Frame-driven fill so the ring sweeps smoothly instead of stepping */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf: number;
    let last = performance.now();
    let elapsed = 0;
    const frame = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        elapsed += dt;
        if (elapsed >= DURATION) {
          setIndex((i) => (i + 1) % QUOTES.length);
          return;
        }
        setProgress((elapsed / DURATION) * 100);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  const active = QUOTES[index];

  return (
    <div
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <blockquote className="mx-auto flex min-h-[260px] max-w-[880px] items-center justify-center sm:min-h-[240px]">
        <p className="font-serif text-[26px] leading-snug font-medium text-balance sm:text-4xl sm:leading-[1.3]">
          &ldquo;{active.quote}&rdquo;
        </p>
      </blockquote>
      <p className="mt-6 min-h-[24px] text-[15px] text-muted-foreground">
        {active.attribution}
      </p>
      <div className="mt-9 flex min-h-[76px] items-center justify-center gap-3 sm:gap-5">
        {QUOTES.map((quote, i) => {
          const isActive = i === index;
          return (
            <button
              key={quote.attribution}
              type="button"
              aria-label={`Show testimonial ${i + 1}: ${quote.attribution}`}
              aria-current={isActive}
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
              className={cn(
                "relative cursor-pointer rounded-full transition-all duration-250",
                isActive ? "size-[66px]" : "size-[46px]"
              )}
            >
              {isActive && (
                <span aria-hidden="true" className="absolute -inset-[5px]">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(var(--foreground) ${progress}%, var(--border) 0)`,
                    }}
                  />
                  {/* Rounded caps on both ends of the arc: one fixed at the
                      start, one riding the leading edge */}
                  {progress > 0.5 && (
                    <>
                      <span className="absolute top-0 left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-foreground" />
                      <span
                        className="absolute inset-0"
                        style={{ transform: `rotate(${progress * 3.6}deg)` }}
                      >
                        <span className="absolute top-0 left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-foreground" />
                      </span>
                    </>
                  )}
                </span>
              )}
              <span
                className={cn(
                  "relative z-10 flex h-full w-full items-center justify-center rounded-full border border-border bg-muted font-sans text-[13px] font-bold",
                  isActive ? "text-foreground" : "text-muted-foreground/70"
                )}
              >
                {quote.initials}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
