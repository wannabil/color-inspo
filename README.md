# Color Palette Inspiration 🎨

A minimal, interactive web app that displays harmonious color palette inspirations. Each palette features 4 carefully selected shades with smooth Framer Motion animations.

## ✨ Features

- **Curated Palettes**: Browse 12 beautiful, hand-picked color palettes
- **Dynamic Generation**: Generate new random harmonious palettes using color theory
- **Interactive Details**: Click any palette to view detailed color information
- **Copy to Clipboard**: Easily copy HEX codes for use in your projects
- **Smooth Animations**: Delightful Framer Motion animations throughout
- **Responsive Design**: Works beautifully on all screen sizes

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd color-inspo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with palette grid
│   ├── globals.css         # Global styles and CSS variables
│   └── palette/
│       └── [id]/
│           └── page.tsx    # Palette detail page
├── components/
│   ├── ui/
│   │   └── button.tsx      # shadcn/ui button component
│   ├── CopyButton.tsx      # Copy-to-clipboard button
│   └── PaletteCard.tsx     # Palette card with hover effects
└── lib/
    ├── colors.ts           # Color utilities and generation logic
    └── utils.ts            # shadcn/ui utilities
```

## 🎨 Color Generation

The app uses HSL color theory to generate harmonious palettes with four different harmony types:

- **Analogous**: Colors close to each other on the color wheel
- **Complementary**: Opposite colors with variations
- **Triadic**: Three colors evenly spaced around the wheel
- **Monochromatic**: Same hue with varying saturation and lightness

## 🎭 Animations

Framer Motion powers smooth animations throughout:

- **Staggered fade-in** on palette grid load
- **Lift and scale** on palette card hover
- **Spring entrance** for detail page
- **Rotate animation** on refresh button click
- **Scale feedback** on button interactions

## 🌐 Deployment

This app is ready for deployment on Cloudflare Pages or any Next.js-compatible platform:

### Cloudflare Pages

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy!

### Vercel (Alternative)

```bash
npm run build
vercel deploy
```

## 🎯 Usage

1. **Browse Palettes**: Scroll through the curated color palettes on the home page
2. **Refresh**: Click the refresh button to generate 12 new random palettes
3. **View Details**: Click any palette to see detailed color information
4. **Copy Colors**: Click the copy button next to any color to copy its HEX code
5. **Navigate Back**: Use the back button to return to the home page

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add more curated palettes
- Improve color generation algorithms
- Enhance animations
- Add new features

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Color theory inspiration from various design resources
- shadcn/ui for the beautiful component library
- Framer Motion for making animations delightful
