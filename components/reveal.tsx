"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* Fades + rises children when they enter the viewport (top crosses 90% of
   viewport height). Plain scroll checks instead of IntersectionObserver —
   sturdier across embedded/throttled browsers, and 9 elements cost nothing. */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (window.innerHeight === 0) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        setVisible(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
}
