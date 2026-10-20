import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useAuthStore } from "@/context/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import LoginMobile from "../components/LoginForm";
import { useThemeStore } from "../context/Theme";
import { darkTheme, lightTheme } from "../style/layout/Theme";
import Header from "./Header";
import Nav from "./Nav";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const scheme = useColorScheme();
  const { preference, hydrate, hydrated } = useThemeStore();

  // Preferencia del usuario si existe; si no, el ajuste del sistema.
  const isDark =
    (preference ?? (scheme === "dark" ? "dark" : "light")) === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    // El splash espera también al tema: sin esto la app abre con el tema del
    // sistema y salta al guardado (destello).
    if (fontsLoaded && hydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, hydrated]);

  if (!fontsLoaded || !hydrated) {
    return null;
  }
  if (!user) {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <LoginMobile />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StatusBar style={isDark ? "light" : "dark"} />
          {pathname !== "/" && (
            <>
              <Header />
              <Nav />
            </>
          )}

          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
