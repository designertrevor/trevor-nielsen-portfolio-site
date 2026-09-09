import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

/* Tracks --background light/dark in globals.css */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1b19" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trevornielsen.com"),
  title: "Trevor Nielsen · Senior Product Design",
  description:
    "Senior product design for teams with a gap to fill. I join fast, adapt to your design system, and hold my own without oversight.",
  openGraph: {
    title: "Trevor Nielsen · Senior Product Design",
    description:
      "Senior product design for teams with a gap to fill. I join fast, adapt to your design system, and hold my own without oversight.",
    url: "https://trevornielsen.com",
    /* TODO: replace with the real OG image Trevor supplies */
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimson.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
