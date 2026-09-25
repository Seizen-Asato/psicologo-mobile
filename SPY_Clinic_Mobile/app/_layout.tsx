import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../style/layout/Theme";
import Nav from "./Nav";
const queryClient = new QueryClient();
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Nav />
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
