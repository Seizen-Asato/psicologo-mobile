import { DefaultTheme } from "styled-components";
import { Contrast, DarkColors, LightColors } from "./Colorors";

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const radius = {
  small: 6,
  medium: 12,
  large: 16,
};

// WCAG §1.4 — mínimo táctil 44x44px.
const touchMin = 44;

export const lightTheme: DefaultTheme = {
  colors: {
    ...LightColors,
    onAction: Contrast.onAction,
    focus: LightColors.actionSecondary,
  },
  spacing,
  radius,
  touchMin,
};

export const darkTheme: DefaultTheme = {
  colors: {
    ...DarkColors,
    onAction: Contrast.onAction,
    focus: DarkColors.actionSecondary,
  },
  spacing,
  radius,
  touchMin,
};
