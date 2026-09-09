import { cn } from "@/lib/utils";

const sizes = {
  md: "text-[13px]",
  sm: "text-xs",
} as const;

const tones = {
  ink: "text-foreground",
  soft: "text-foreground/60",
  softer: "text-foreground/50",
} as const;

/* Section label: chunky sans caps in ink — serif is reserved for display
   sizes and long-form reading, never tiny text. Softer tones are the one
   sanctioned use of opacity on --foreground (card/list numbering). */
export function Eyebrow({
  children,
  className,
  as: Comp = "p",
  size = "md",
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
}) {
  return (
    <Comp
      className={cn(
        "font-sans font-extrabold tracking-[0.07em] uppercase",
        sizes[size],
        tones[tone],
        className
      )}
    >
      {children}
    </Comp>
  );
}
