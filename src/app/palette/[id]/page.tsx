import { notFound } from "next/navigation";
import { getInitialPalettes } from "@/lib/colors";
import { PaletteDetailClient } from "@/components/PaletteDetailClient";

export const runtime = 'edge';

export default async function PalettePage({ params }: { params: Promise<{ id: string }> }) {
  // Await params in Next.js 16
  const { id } = await params;
  
  // Find the palette by ID on the server
  const initialPalettes = getInitialPalettes();
  const palette = initialPalettes.find((p) => p.id === id);

  if (!palette) {
    notFound();
  }

  return <PaletteDetailClient palette={palette} />;
}

