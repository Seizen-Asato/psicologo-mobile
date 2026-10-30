import * as SecureStore from "expo-secure-store";
import { Platform, useColorScheme } from "react-native";
import { create } from "zustand";

export type ColorMode = "light" | "dark";

const STORAGE_KEY = "spy_color_mode";

const canPersist = Platform.OS !== "web";

const READ_TIMEOUT_MS = 2000;

type ThemeState = {
  preference: ColorMode | null;
  hydrated: boolean;
  setMode: (mode: ColorMode) => void;
  hydrate: () => Promise<void>;
};

async function readStoredMode(): Promise<ColorMode | null> {
  if (!canPersist) return null;
  try {
    const raw = await SecureStore.getItemAsync(STORAGE_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

async function writeStoredMode(mode: ColorMode): Promise<void> {
  if (!canPersist) return;
  try {
    await SecureStore.setItemAsync(STORAGE_KEY, mode);
  } catch {}
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  preference: null,
  hydrated: false,
  setMode: (mode) => {
    set({ preference: mode });
    void writeStoredMode(mode);
  },
  hydrate: async () => {
    if (get().hydrated) return;
    const stored = await Promise.race([
      readStoredMode(),
      new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), READ_TIMEOUT_MS),
      ),
    ]);
    set({ preference: stored, hydrated: true });
  },
}));

export function useColorMode() {
  const preference = useThemeStore((state) => state.preference);
  const setMode = useThemeStore((state) => state.setMode);
  const systemScheme = useColorScheme();

  const mode: ColorMode =
    preference ?? (systemScheme === "dark" ? "dark" : "light");

  return {
    mode,
    isDark: mode === "dark",
    setMode,
    toggle: () => setMode(mode === "dark" ? "light" : "dark"),
  };
}
