"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@vercel/analytics";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/* One click copies the email. Icon becomes a check, text becomes "Copied,"
   style inverts, everything reverts after 4.5s. The email string stays in
   the DOM (invisible) while "Copied" shows, so the width never changes. */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function copy() {
    navigator.clipboard.writeText(SITE.email).catch(() => {});
    track("Copy Email");
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 4500);
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-14 cursor-pointer items-center justify-center gap-2.5 border border-border px-6 font-sans text-[15px] font-semibold transition-colors",
        copied
          ? "border-foreground bg-foreground text-background"
          : "bg-transparent hover:bg-muted",
        className
      )}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="grid text-left">
        <span className={cn("col-start-1 row-start-1", copied && "invisible")}>
          {SITE.email}
        </span>
        <span
          aria-hidden={!copied}
          className={cn("col-start-1 row-start-1", !copied && "invisible")}
        >
          Copied
        </span>
      </span>
    </button>
  );
}
