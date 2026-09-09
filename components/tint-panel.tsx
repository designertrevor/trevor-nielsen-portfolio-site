import { cn } from "@/lib/utils";

const tints = {
  sand: "bg-tint-sand",
  pink: "bg-tint-pink",
  blue: "bg-tint-blue",
} as const;

/* Pastel poster surface: tint + paper grain. Every tinted box on the site
   goes through this so the grain can never be forgotten. Padding is the
   caller's job — it varies by context (p-6 sm:p-9, px-7 py-12 sm:px-12...). */
export function TintPanel({
  tint = "sand",
  as: Comp = "div",
  className,
  children,
}: {
  tint?: keyof typeof tints;
  as?: "div" | "figure" | "aside" | "section";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Comp
      className={cn(tints[tint], className)}
      style={{ backgroundImage: "var(--grain)" }}
    >
      {children}
    </Comp>
  );
}
