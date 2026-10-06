/**
 * Swiss Dossier Design Tokens
 * Light-first, editorial, grid-driven system inspired by printed design annuals.
 */

export const TOKENS = {
  // Color palette
  colors: {
    light: {
      bg: '#F4F1EA',          // Warm paper background
      ink: '#111110',         // Near-black ink
      muted: '#666560',       // Muted editorial secondary grey
      hairline: 'rgba(17, 17, 16, 0.12)', // Subtle guide rule
      accent: '#E8421F',      // Single vermilion accent for dots, underlines & active states
    },
    dark: {
      bg: '#121110',          // Deep warm black
      ink: '#F4F1EA',         // Off-white ink
      muted: '#9E9B93',       // Secondary warm grey
      hairline: 'rgba(244, 241, 234, 0.12)',
      accent: '#E8421F',      // Same vermilion accent
    },
  },

  // Font family names
  fonts: {
    display: "'Plus Jakarta Sans', sans-serif",
    serif: "'Instrument Serif', Georgia, serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  // Restrained typographic scale (in rem / clamp)
  typeScale: {
    hero: 'clamp(1.75rem, 3.4vw, 2.75rem)',
    sectionHeading: 'clamp(1.4rem, 2.4vw, 2rem)',
    projectName: 'clamp(1.25rem, 1.8vw, 1.75rem)',
    body: '1.0625rem', // 17px, between 1rem and 1.0625rem
    monoLabel: '0.75rem', // 12px
  },

  // Layout grid
  grid: {
    columns: 12,
    railWidthDesktop: '72px',
    maxWidthContent: '1280px',
  },
} as const
