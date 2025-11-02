"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { getInitialPalettes, generateHarmoniousPalette, ColorPalette, hexToRgb } from "@/lib/colors";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/CopyButton";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  const [colorCount, setColorCount] = useState<3 | 4>(4);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(getInitialPalettes()[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Generate a new random palette with the selected color count
    const newPalette = generateHarmoniousPalette(colorCount);
    setCurrentPalette(newPalette);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleToggle = (checked: boolean) => {
    const newCount = checked ? 4 : 3;
    setColorCount(newCount);
    // Generate new palette with the new color count
    setIsRefreshing(true);
    const newPalette = generateHarmoniousPalette(newCount);
    setCurrentPalette(newPalette);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
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
      
      {/* Floating orbs for dreamy effect */}
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
      <motion.div
        className="absolute bottom-[10%] left-[40%] h-72 w-72 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2,
        }}
      />
      
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Color Palette Inspiration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 px-4 text-base text-gray-400 sm:mt-3 sm:text-lg md:text-xl"
          >
            Discover harmonious color combinations for your next project
          </motion.p>
          
          {/* Color Count Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex items-center justify-center gap-3 sm:mt-6"
          >
            <span className="text-sm font-medium text-gray-300 sm:text-base">3 Colors</span>
            <Switch
              checked={colorCount === 4}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-purple-500"
            />
            <span className="text-sm font-medium text-gray-300 sm:text-base">4 Colors</span>
          </motion.div>
        </div>

        {/* Main Palette Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPalette.id}-${colorCount}`}
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-6 overflow-hidden rounded-2xl bg-white shadow-2xl sm:mb-8 sm:rounded-3xl"
          >
            {/* Palette Name */}
            <div className="bg-gray-800 px-4 py-4 sm:px-8 sm:py-6">
              <h2 className="text-center text-lg font-semibold text-white sm:text-xl md:text-2xl">
                {currentPalette.name}
              </h2>
            </div>

            {/* Color Strips */}
            <div className={`grid gap-0 ${colorCount === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
              {currentPalette.colors.map((color, index) => {
                const rgb = hexToRgb(color);
                const isLight = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 128;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div
                      className="flex h-48 items-center justify-center sm:h-56 md:h-64"
                      style={{ backgroundColor: color }}
                    >
                      <div
                        className={`text-center px-2 ${
                          isLight ? "text-gray-900" : "text-white"
                        }`}
                      >
                        <p className="text-xl font-bold sm:text-2xl md:text-3xl">{color.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 bg-gray-800 px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-400">RGB</p>
                          <p className="truncate font-mono text-xs text-white sm:text-sm">
                            {rgb.r}, {rgb.g}, {rgb.b}
                          </p>
                        </div>
                        <CopyButton text={color.toUpperCase()} label="Copy" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Refresh Button */}
        <div className="flex justify-center px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full gap-2 px-6 py-5 text-base shadow-lg sm:w-auto sm:gap-3 sm:px-8 sm:py-6 sm:text-lg"
              size="lg"
            >
              <motion.div
                animate={
                  isRefreshing
                    ? {
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                      }
                    : { rotate: 0, scale: 1 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
              Generate New Palette
            </Button>
          </motion.div>
        </div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 px-4 text-center text-xs text-gray-300 sm:mt-6 sm:text-sm"
        >
          Click any color to copy its HEX code to clipboard
        </motion.p>
      </div>
    </div>
  );
}
