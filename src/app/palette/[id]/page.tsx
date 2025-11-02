"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { getInitialPalettes, hexToRgb, ColorPalette } from "@/lib/colors";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const palettes = getInitialPalettes();
  return palettes.map((palette) => ({
    id: palette.id,
  }));
}

export default function PalettePage() {
  const params = useParams();
  const router = useRouter();
  const [palette, setPalette] = useState<ColorPalette | null>(null);

  useEffect(() => {
    // Find the palette by ID
    const initialPalettes = getInitialPalettes();
    const foundPalette = initialPalettes.find((p) => p.id === params.id);
    
    if (foundPalette) {
      setPalette(foundPalette);
    } else {
      // If not found in initial palettes, redirect to home
      router.push("/");
    }
  }, [params.id, router]);

  if (!palette) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(45deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a1a2e 100%)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <p className="relative z-10 text-gray-400">Loading...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Dreamy Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(45deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a1a2e 100%)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute right-[15%] top-[60%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="mb-4 gap-2 text-gray-300 hover:text-white sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back to palettes</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {palette.name}
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base md:text-lg">
            Click any color to copy its HEX code
          </p>
        </motion.div>

        {/* Color Grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {palette.colors.map((color, index) => {
            const rgb = hexToRgb(color);
            const isLight = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 128;

            return (
              <motion.div
                key={index}
                className="group overflow-hidden rounded-xl bg-gray-800 shadow-lg sm:rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="flex h-48 items-center justify-center sm:h-56 md:h-64"
                  style={{ backgroundColor: color }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`text-center px-4 ${
                      isLight ? "text-gray-900" : "text-white"
                    }`}
                  >
                    <p className="text-3xl font-bold sm:text-4xl md:text-5xl">{color.toUpperCase()}</p>
                  </div>
                </motion.div>
                <div className="space-y-2 p-4 sm:space-y-3 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-400 sm:text-sm">HEX</p>
                      <p className="truncate font-mono text-base font-semibold text-white sm:text-lg">
                        {color.toUpperCase()}
                      </p>
                    </div>
                    <CopyButton text={color.toUpperCase()} label="Copy HEX" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 sm:text-sm">RGB</p>
                    <p className="font-mono text-base text-white sm:text-lg">
                      {rgb.r}, {rgb.g}, {rgb.b}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

