import { notFound } from "next/navigation";
import { getInitialPalettes } from "@/lib/colors";
import { PaletteDetailClient } from "@/components/PaletteDetailClient";

export const runtime = 'edge';

export default function PalettePage({ params }: { params: { id: string } }) {
  // Find the palette by ID on the server
  const initialPalettes = getInitialPalettes();
  const palette = initialPalettes.find((p) => p.id === params.id);

  if (!palette) {
    notFound();
  }

  return <PaletteDetailClient palette={palette} />;
}

