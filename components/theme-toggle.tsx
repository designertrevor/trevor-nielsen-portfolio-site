"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/* Sun that morphs into a moon. The shapes are styled and animated entirely
   from CSS off the .dark class (see globals.css), so the icon itself is
   correct on first paint with no JS.

   aria-pressed is the one thing that can't be: the server has no idea which
   theme this visitor uses, while next-themes resolves it synchronously on the
   client's first render, so the two disagree. Gate it on hydration — false to
   match the server, then the real value once mounted. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      aria-pressed={hydrated && resolvedTheme === "dark"}
      className={cn(
        /* Bare icon button, matching the social icons: the glyph itself
           colors on hover, no padding or hover fill box */
        "cursor-pointer text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-5">
        <defs>
          {/* Inverted mask: the white rect shows the disc, the black circle
              parks off to the right until dark mode slides it in to cut the
              crescent. */}
          <mask id="sunmoon-disc-mask">
            <rect x="0" y="0" width="32" height="32" fill="white" />
            <circle className="sunmoon-bite" cx="40" cy="16" r="8" fill="black" />
          </mask>
          <mask id="sunmoon-rays-mask">
            <circle className="sunmoon-ray-mask" cx="16" cy="16" r="16" fill="white" />
          </mask>
        </defs>
        <circle
          className="sunmoon-disc"
          mask="url(#sunmoon-disc-mask)"
          cx="16"
          cy="16"
          r="8"
          fill="currentColor"
        />
        <path
          mask="url(#sunmoon-rays-mask)"
          d="M6,16l-6,0 M8.929,8.929l-4.243,-4.243 M8.929,23.071l-4.243,4.243 M16,26l-0,6 M27.314,27.314l-4.243,-4.243 M32,16l-6,0 M27.314,4.686l-4.243,4.243 M16,-0l-0,6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
