import { Platform, StyleSheet } from "react-native";

// design-system.md §2 — Roboto con mismos fallbacks que la web.
// Familias cargadas vía @expo-google-fonts/roboto en app/_layout.tsx.
// Pesos relativos: light 300 / regular 400 / medium 500 / bold 700.
export const FontFamily = {
  light: "Roboto_300Light",
  regular: "Roboto_400Regular",
  medium: "Roboto_500Medium",
  bold: "Roboto_700Bold",
} as const;

const stack = (family: string) =>
  Platform.select({
    web: `${family}, "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif`,
    default: family,
  });

export const Typography = StyleSheet.create({
  title: {
    fontFamily: stack(FontFamily.bold),
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: stack(FontFamily.medium),
    fontWeight: "500",
    fontSize: 16,
  },
  body: {
    fontFamily: stack(FontFamily.regular),
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  label: {
    fontFamily: stack(FontFamily.bold),
    fontWeight: "700",
    fontSize: 12,
  },
});
