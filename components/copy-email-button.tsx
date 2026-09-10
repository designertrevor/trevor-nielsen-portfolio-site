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

  /* An invisible sizer (icon + email) pins the button's width; the live
     state renders centered on top, so icon and label stay together in
     both states and the width never changes. */
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "relative inline-flex h-14 cursor-pointer items-center justify-center border border-border px-6 font-sans text-[15px] font-semibold transition-colors",
        copied
          ? "border-foreground bg-foreground text-background"
          : "bg-transparent hover:bg-muted",
        className
      )}
    >
      <span aria-hidden="true" className="invisible flex items-center gap-2.5">
        <Copy className="size-4 shrink-0" />
        <span>{SITE.email}</span>
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2.5">
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span>{copied ? "Copied" : SITE.email}</span>
      </span>
    </button>
  );
}
