// Optrawear design tokens for JS/TS consumers (SVG fills, charts, emails).
// Mirrors tokens.json; prefer Tailwind utilities in components.

export const color = {
  cream: "#fffae5",
  creamSunken: "#f7f1d8",
  creamTint: "#f4edd2",
  creamPress: "#eae6d5",
  board: "#e7e2d5",
  ink: "#191919",
  inkSoft: "#4d4c46",
  inkMuted: "#6f6d64",
  inkFaint: "#76736a",
  line: "#e2decd",
  lineStrong: "#c9c6b7",
  slate: "#2a3138",
  slateDeep: "#262b31",
  slatePad: "#474d52",
  finishTitanium: "#b9b4a8",
  finishGraphite: "#3d4249",
  finishChampagne: "#d8c9a6",
  danger: "#9b2c1f",
} as const;

export const font = {
  serif: ["Newsreader", "Footlight MT", "Georgia", "serif"],
  sans: ["Archivo", "Neue Haas Grotesk Text", "Helvetica Neue", "Arial", "sans-serif"],
} as const;

type TextStyle = { size: number; lineHeight: number; letterSpacing?: string; family: "serif" | "sans"; weight: number; uppercase?: true };

export const text = {
  displayXl: { size: 96, lineHeight: 0.84, letterSpacing: "-0.025em", family: "serif", weight: 300 },
  displayLg: { size: 64, lineHeight: 1, letterSpacing: "-0.02em", family: "serif", weight: 400 },
  displayMd: { size: 56, lineHeight: 1, letterSpacing: "-0.02em", family: "serif", weight: 400 },
  displaySm: { size: 48, lineHeight: 1.04, letterSpacing: "-0.015em", family: "serif", weight: 400 },
  headingXl: { size: 44, lineHeight: 1.05, letterSpacing: "-0.015em", family: "serif", weight: 400 },
  headingLg: { size: 32, lineHeight: 1.1, letterSpacing: "-0.01em", family: "serif", weight: 400 },
  headingMd: { size: 24, lineHeight: 1.2, family: "serif", weight: 400 },
  headingSm: { size: 20, lineHeight: 1.25, family: "serif", weight: 400 },
  headingXs: { size: 17, lineHeight: 1.3, family: "serif", weight: 400 },
  bodyLg: { size: 15, lineHeight: 1.7, family: "sans", weight: 400 },
  body: { size: 14, lineHeight: 1.72, family: "sans", weight: 400 },
  small: { size: 13, lineHeight: 1.5, family: "sans", weight: 400 },
  meta: { size: 12, lineHeight: 1.5, family: "sans", weight: 400 },
  label: { size: 11, lineHeight: 1.3, letterSpacing: "0.16em", family: "sans", weight: 500, uppercase: true },
  micro: { size: 10, lineHeight: 1.3, letterSpacing: "0.12em", family: "sans", weight: 400 },
} as const satisfies Record<string, TextStyle>;

export const spacing = { base: 4 } as const;
export const layout = { page: 1344, prose: 576, gutter: { sm: 16, md: 32, xl: 48 } } as const;
export const radius = { xs: 2, sm: 3 } as const;
export const motion = {
  easeOut: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  durationFast: 120,
  durationBase: 200,
  durationSlow: 320,
} as const;
export const breakpoint = { sm: 640, md: 768, lg: 1024, xl: 1280, board: 1440 } as const;
