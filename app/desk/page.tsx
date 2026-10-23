import type { Metadata, Viewport } from "next";

import { DeskScene } from "@/components/desk/desk-scene";

/* Prototype of the virtual office entry (desk-prototype branch only) */
export const metadata: Metadata = {
  title: "Trevor's office · Trevor Nielsen",
  robots: { index: false },
};

/* The scene runs edge to edge under Safari's bars (seamless-mobile-safari) */
export const viewport: Viewport = { viewportFit: "cover" };

export default async function DeskPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return <DeskScene startInside={from === "site"} />;
}
