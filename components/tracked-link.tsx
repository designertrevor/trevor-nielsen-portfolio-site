"use client";

import { track } from "@vercel/analytics";

type TrackedLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  destination: string;
  placement: string;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  destination,
  placement,
  className,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("Outbound Link", { destination, placement })}
      {...rest}
    >
      {children}
    </a>
  );
}
