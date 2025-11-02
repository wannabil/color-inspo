"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ColorPalette } from "@/lib/colors";

interface PaletteCardProps {
  palette: ColorPalette;
}

export function PaletteCard({ palette }: PaletteCardProps) {
  return (
    <Link href={`/palette/${palette.id}`}>
      <motion.div
        className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex h-32">
          {palette.colors.map((color, index) => (
            <motion.div
              key={index}
              className="flex-1"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          ))}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
            {palette.name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}

