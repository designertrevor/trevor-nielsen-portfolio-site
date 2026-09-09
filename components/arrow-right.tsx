import { cn } from "@/lib/utils";

/* Arrow for links that take the reader somewhere new. Sized in em so it
   tracks whatever text it sits beside; the hover reach lives in globals.css
   and is driven by a `group` on the parent link or button. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block size-[1.15em] overflow-visible align-[-0.15em]", className)}
    >
      <path className="arrow-shaft" d="M5 12H19" />
      <path className="arrow-head" d="M12 19L19 12L12 5" />
    </svg>
  );
}
