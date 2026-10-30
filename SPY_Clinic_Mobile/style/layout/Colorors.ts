// design-system.md §1.1 — Primitivas (no cambian con el tema).
// Prohibido inventar hex nuevos: todo color sale de aquí.
export const Primitives = {
  brand300: "#bcd916",
  brand400: "#a6c205",
  brand500: "#8ea604",
  brand600: "#748703",
  accent400: "#f0ad24",
  accent500: "#ec9f05",
  gray50: "#f8f9fa",
  gray100: "#edf2f7",
  gray300: "#cbd5e0",
  gray400: "#a0aec0",
  gray600: "#4a5568",
  gray800: "#2d3748",
  gray900: "#1a202c",
  darkBg: "#121418",
  darkSurface: "#1e2228",
  surfaceLight: "#ffffff",
  textDarkPrimary: "#f7fafc",
  /** Tinta sobre lima/ámbar. §1.4: 5.91:1 light / 9.08:1 dark. */
  ink: "#121418",
} as const;

// design-system.md §1.2 — Tokens semánticos LIGHT (`:root`).
export const LightColors = {
  background: "#f8f9fa",
  surface: "#ffffff",
  textPrimary: "#1a202c",
  textSecondary: "#4a5568",
  textDisabled: "#a0aec0",
  actionPrimary: "#8ea604",
  actionHover: "#748703",
  actionSecondary: "#ec9f05",
  border: "#edf2f7",
  borderInput: "#cbd5e0",
  success: "#8ea604",
  error: "#bf3100",
  warning: "#f5bb00",
  info: "#2b6cb0",
};

export const DarkColors = {
  background: "#121418",
  surface: "#1e2228",
  textPrimary: "#f7fafc",
  textSecondary: "#a0aec0",
  textDisabled: "#4a5568",
  actionPrimary: "#a6c205",
  actionHover: "#bcd916",
  actionSecondary: "#f0ad24",
  border: "#2d3748",
  borderInput: "#4a5568",
  success: "#a6c205",
  error: "#e04814",
  warning: "#fcd34d",
  info: "#63b3ed",
};

// design-system.md §1.4 — Contraste y táctil (obligatorios en mobile).
export const Contrast = {
  /** Texto sobre brand/accent en ambos modos. Nunca blanco sobre lima. */
  onAction: "#121418",
} as const;

export type ColorTokens = typeof LightColors;
