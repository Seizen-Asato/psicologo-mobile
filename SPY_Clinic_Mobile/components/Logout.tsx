import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useAuthStore } from "../context/Auth";
import { LogoutIcon } from "./icons";

/**
 * `compact` = botón-icono 44x44 (Header en pantallas estrechas).
 * El botón de texto se mantiene intacto en anchos y tablets.
 */
export default function LogoutButton({ compact = false }: { compact?: boolean }) {
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
      style={[styles.button, compact && styles.iconButton]}
      accessibilityRole="button"
      accessibilityLabel="Cerrar sesión"
      accessibilityHint="Cierra la sesión actual"
    >
      {compact ? (
        <LogoutIcon color={theme.colors.error} />
      ) : (
        <Text style={styles.label}>Cerrar sesión</Text>
      )}
    </Pressable>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    // design-system.md §1.4 + style/ui/Buttons.ts: en una acción de peligro
    // el color va en el BORDE y el texto va en textPrimary. El token `error`
    // en dark da 3.88:1 y no es válido para texto pequeño.
    button: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 12,
      borderRadius: theme.radius.small,
      borderWidth: 1,
      borderColor: theme.colors.error,
    },
    // Icono 44x44 táctil: mismo mínimo que el botón de texto.
    iconButton: {
      minWidth: 44,
      paddingHorizontal: 0,
      alignItems: "center",
    },
    label: { color: theme.colors.textPrimary, fontWeight: "bold" },
  });
