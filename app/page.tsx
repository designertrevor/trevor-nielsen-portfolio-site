import { TrackedLink } from "@/components/tracked-link";

const linkStyle =
  "underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="font-hand max-w-xl text-2xl leading-relaxed text-pretty sm:text-3xl sm:leading-relaxed">
        <p>Hey there,</p>
        <p className="mt-10">
          Thanks for visiting my site. I&apos;m currently remaking
          it (in case that isn&apos;t obvious enough). I&apos;ll be making
          updates publicly. You can follow along on{" "}
          <TrackedLink
            href="https://www.linkedin.com/in/trevordesign/"
            destination="LinkedIn"
            placement="intro"
            className={linkStyle}
          >
            LinkedIn
          </TrackedLink>{" "}
          or&nbsp;<TrackedLink
            href="https://x.com/designtrev"
            destination="X"
            placement="intro"
            className={linkStyle}
          >
            X
          </TrackedLink>&nbsp;if you&apos;d&nbsp;like.
        </p>
        <p className="mt-10">- Trevor</p>
        <p className="mt-10">
          P.S. I also write{" "}
          <TrackedLink
            href="https://www.discoverabledesigner.com"
            destination="Discoverable Designer"
            placement="postscript"
            className={linkStyle}
          >
            Discoverable Designer
          </TrackedLink>
          , a newsletter about getting seen as&nbsp;a&nbsp;designer.
        </p>
      </div>
    </main>
  );
}
