import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useAuthStore } from "../context/Auth";
import { LogoutIcon } from "./icons";

export default function LogoutButton({
  compact = false,
}: {
  compact?: boolean;
}) {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleLogout = () => {
    logout();
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
    button: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    iconButton: {
      minWidth: 44,
      paddingHorizontal: 0,
      alignItems: "center",
    },
    label: { color: theme.colors.error, fontWeight: "bold" },
  });
