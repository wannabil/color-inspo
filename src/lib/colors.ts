export interface ColorPalette {
  id: string;
  name: string;
  colors: string[]; // Array of 3 or 4 HEX colors
}

/**
 * Converts HEX color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Converts HSL to HEX
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Generates a harmonious color palette using HSL color theory
 */
export function generateHarmoniousPalette(colorCount: number = 4): ColorPalette {
  // Random base hue
  const baseHue = Math.floor(Math.random() * 360);
  
  // Choose a random harmony type with weighted selection
  const harmonyTypes = [
    "analogous",
    "complementary",
    "triadic",
    "monochromatic",
    "split-complementary",
    "tetradic",
  ];
  const harmonyType = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
  
  let hues: number[] = [];
  let saturations: number[] = [];
  let lightnesses: number[] = [];
  
  // Base saturation: vibrant but not oversaturated
  const baseSaturation = 65 + Math.random() * 20;
  
  switch (harmonyType) {
    case "analogous":
      // Colors close to each other on the color wheel (30° apart)
      if (colorCount === 3) {
        hues = [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 10];
        lightnesses = [60, 55, 50];
      } else {
        hues = [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360, (baseHue + 90) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 10, baseSaturation - 15];
        lightnesses = [60, 55, 50, 45];
      }
      break;
      
    case "complementary":
      // Opposite colors with their neighbors
      if (colorCount === 3) {
        hues = [baseHue, (baseHue + 30) % 360, (baseHue + 180) % 360];
        saturations = [baseSaturation, baseSaturation - 10, baseSaturation];
        lightnesses = [55, 60, 50];
      } else {
        hues = [baseHue, (baseHue + 30) % 360, (baseHue + 180) % 360, (baseHue + 210) % 360];
        saturations = [baseSaturation, baseSaturation - 10, baseSaturation, baseSaturation - 10];
        lightnesses = [55, 60, 50, 55];
      }
      break;
      
    case "triadic":
      // Three colors evenly spaced (120° apart) + one variation
      if (colorCount === 3) {
        hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
        saturations = [baseSaturation, baseSaturation, baseSaturation];
        lightnesses = [55, 55, 55];
      } else {
        hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 30) % 360];
        saturations = [baseSaturation, baseSaturation, baseSaturation, baseSaturation - 15];
        lightnesses = [55, 55, 55, 60];
      }
      break;
      
    case "monochromatic":
      // Same hue, varied saturation and lightness
      if (colorCount === 3) {
        hues = [baseHue, baseHue, baseHue];
        saturations = [baseSaturation, baseSaturation - 15, baseSaturation - 30];
        lightnesses = [65, 55, 45];
      } else {
        hues = [baseHue, baseHue, baseHue, baseHue];
        saturations = [baseSaturation, baseSaturation - 15, baseSaturation - 30, baseSaturation - 10];
        lightnesses = [65, 55, 45, 35];
      }
      break;
      
    case "split-complementary":
      // Base color + two colors adjacent to its complement
      if (colorCount === 3) {
        hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 5];
        lightnesses = [55, 52, 52];
      } else {
        hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360, (baseHue + 30) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 5, baseSaturation - 10];
        lightnesses = [55, 52, 52, 58];
      }
      break;
      
    case "tetradic":
      // Rectangle on color wheel (two complementary pairs)
      if (colorCount === 3) {
        hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 10];
        lightnesses = [55, 52, 50];
      } else {
        hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
        saturations = [baseSaturation, baseSaturation - 5, baseSaturation - 10, baseSaturation - 5];
        lightnesses = [55, 52, 50, 52];
      }
      break;
  }
  
  // Generate colors with calculated HSL values
  const colors = hues.map((hue, index) => {
    return hslToHex(hue, saturations[index], lightnesses[index]);
  });
  
  const id = `palette-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Create readable name
  const formattedName = harmonyType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return {
    id,
    name: `${formattedName} Harmony`,
    colors,
  };
}

/**
 * Returns a curated set of beautiful starter palettes following color theory
 */
export function getInitialPalettes(): ColorPalette[] {
  return [
    {
      id: "warm-analogous",
      name: "Warm Analogous Harmony",
      colors: ["#FF6B6B", "#FF8E53", "#FFB84D", "#FFD93D"],
    },
    {
      id: "ocean-monochromatic",
      name: "Ocean Monochromatic",
      colors: ["#0EA5E9", "#0284C7", "#0369A1", "#075985"],
    },
    {
      id: "nature-triadic",
      name: "Nature Triadic",
      colors: ["#22C55E", "#EAB308", "#EF4444", "#86EFAC"],
    },
    {
      id: "sunset-complementary",
      name: "Sunset Complementary",
      colors: ["#F97316", "#FB923C", "#0891B2", "#06B6D4"],
    },
    {
      id: "purple-monochromatic",
      name: "Purple Monochromatic",
      colors: ["#C084FC", "#A855F7", "#9333EA", "#7E22CE"],
    },
    {
      id: "spring-split-complementary",
      name: "Spring Split Complementary",
      colors: ["#10B981", "#F59E0B", "#EC4899", "#34D399"],
    },
    {
      id: "royal-tetradic",
      name: "Royal Tetradic",
      colors: ["#6366F1", "#F59E0B", "#EF4444", "#8B5CF6"],
    },
    {
      id: "coral-analogous",
      name: "Coral Analogous",
      colors: ["#FB7185", "#FCA5A5", "#FDBA74", "#FCD34D"],
    },
    {
      id: "forest-triadic",
      name: "Forest Triadic",
      colors: ["#15803D", "#B45309", "#1E40AF", "#4ADE80"],
    },
    {
      id: "rose-monochromatic",
      name: "Rose Monochromatic",
      colors: ["#FDA4AF", "#FB7185", "#F43F5E", "#E11D48"],
    },
    {
      id: "sky-complementary",
      name: "Sky Complementary",
      colors: ["#38BDF8", "#7DD3FC", "#FB923C", "#FDBA74"],
    },
    {
      id: "berry-split",
      name: "Berry Split Complementary",
      colors: ["#BE185D", "#7C3AED", "#059669", "#EC4899"],
    },
  ];
}

