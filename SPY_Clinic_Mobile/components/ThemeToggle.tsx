import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { Animated, Easing, Platform, Pressable, StyleSheet } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useColorMode } from "../context/Theme";
import { MoonIcon, SunIcon } from "./icons";

// design-system.md §1.4 — táctil mínimo 44x44 (theme.touchMin) y foco
// visible: contorno 3px en ámbar (theme.colors.focus) + offset 2px.
//
// El icono muestra el modo ACTUAL (sol = estás en claro) y la etiqueta
// anuncia la ACCIÓN. El color va en `textSecondary` a propósito: lima/ámbar
// sobre superficie clara no alcanzan 3:1 (WCAG 1.4.11, §1.4).
//
// `outline*` se aplica como style nativo de RN (0.76+). El botón usa
// `StyleSheet` en vez de styled-components para que las propiedades
// `outlineWidth/Color/Offset` lleguen al estilo nativo sin intermediarios.

export default function ThemeToggle() {
  const theme = useTheme();
  const { isDark, toggle } = useColorMode();
  const styles = makeStyles(theme);

  // `useState` y no `useRef`: el valor es inmutable y el linter de React
  // Compiler (react-hooks/refs) no permite leer refs durante el render.
  const [progress] = useState(() => new Animated.Value(isDark ? 1 : 0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isDark ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isDark, progress]);

  const sunOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const sunRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const moonOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const moonRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "0deg"],
  });

  const handlePress = () => {
    if (Platform.OS !== "web") {
      void Haptics.selectionAsync();
    }
    toggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel="Modo oscuro"
      accessibilityHint="Activa o desactiva el modo oscuro de la aplicación"
    >
      <Animated.View
        style={[
          styles.icon,
          { opacity: sunOpacity, transform: [{ rotate: sunRotate }] },
        ]}
      >
        <SunIcon color={theme.colors.textSecondary} />
      </Animated.View>
      <Animated.View
        style={[
          styles.icon,
          { opacity: moonOpacity, transform: [{ rotate: moonRotate }] },
        ]}
      >
        <MoonIcon color={theme.colors.textSecondary} />
      </Animated.View>
    </Pressable>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    button: {
      width: theme.touchMin,
      height: theme.touchMin,
      borderRadius: theme.touchMin / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      // El anillo de foco (outlineWidth 3 + outlineOffset 2) se dibuja 5px
      // fuera de la caja: sin este margen se solapaba con el avatar.
      marginHorizontal: 8,
      outlineWidth: 3,
      outlineColor: theme.colors.focus,
      outlineOffset: 2,
    },
    pressed: {
      opacity: 0.7,
    },
    icon: {
      // Cubre el botón entero para que el icono quede centrado con
      // independencia de cómo Yoga posicione el hijo absoluto.
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
  });
