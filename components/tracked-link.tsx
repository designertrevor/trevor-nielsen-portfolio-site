"use client";

import { track } from "@vercel/analytics";

type TrackedLinkProps = {
  href: string;
  destination: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  destination,
  placement,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("Outbound Link", { destination, placement })}
    >
      {children}
    </a>
  );
}
