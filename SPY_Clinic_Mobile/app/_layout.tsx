import { useAuthStore } from "@/context/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, usePathname } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import LoginMobile from "../components/LoginForm";
import { theme } from "../style/layout/Theme";
import Header from "./Header";
import Nav from "./Nav";
const queryClient = new QueryClient();
export default function Layout() {
  const user = useAuthStore();
  const pathname = usePathname();
  if (!user) {
    return <LoginMobile />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {pathname !== "/" && (
          <>
            <Header />
            <Nav />
          </>
        )}

        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
