const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/trevordesign/" },
  { label: "X", href: "https://x.com/designtrev" },
  { label: "Newsletter", href: "https://www.discoverabledesigner.com" },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="font-hand max-w-xl text-2xl leading-relaxed sm:text-3xl sm:leading-relaxed">
        <p>
          Hey there, thanks for visiting my site. I&apos;m currently remaking
          it (in case that isn&apos;t obvious enough). I&apos;ll be making
          updates publicly &mdash; you can follow along on my socials if
          you&apos;d like.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10">- Trevor</p>
      </div>
    </main>
  );
}
