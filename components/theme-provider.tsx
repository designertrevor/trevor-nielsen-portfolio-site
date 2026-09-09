"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/* Follows the visitor's OS preference until they touch the toggle, then
   remembers their choice.

   Deliberately no disableTransitionOnChange: it blanket-disables transitions
   during the switch, which would kill the sun/moon animation. Nothing else on
   the site transitions color except nav links and buttons, so the flip still
   reads as instant. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
