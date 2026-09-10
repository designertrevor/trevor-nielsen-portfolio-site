import Link from "next/link";

import { ArrowRight } from "@/components/arrow-right";
import { Eyebrow } from "@/components/eyebrow";
import { ContourLayer } from "@/components/texture";

/* The one place the terrain gets to speak up a little: no work imagery to
   compete with. */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <ContourLayer density="dense" className="opacity-60" />
      <Eyebrow tone="soft">404</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        There is nothing at this address.
      </p>
      <Link
        href="/"
        className="group mt-7 font-semibold underline underline-offset-4 transition-colors hover:text-muted-foreground"
      >
        Back to the front page <ArrowRight />
      </Link>
    </div>
  );
}
