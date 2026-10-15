import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useAuthStore } from "../context/Auth";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleLogout = () => {
    logout();
    // por ahora redirige al login pero se hara un screen especial como "despedida de la app"
    router.replace("/login");
  };

  return (
    <Pressable
      onPress={handleLogout}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel="Cerrar sesión"
    >
      <Text style={styles.label}>Cerrar sesión</Text>
    </Pressable>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    button: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    // Nota §1.4: error en dark sobre surface 3.88:1 (límite). Fase 5: pill con borde.
    label: { color: theme.colors.error, fontWeight: "bold" },
  });
