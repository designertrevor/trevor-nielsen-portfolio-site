import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
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
    <html lang="en" className={`${crimson.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
