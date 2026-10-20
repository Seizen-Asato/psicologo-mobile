import { StyleSheet } from "react-native";
import type { DefaultTheme } from "styled-components";

/**
 * Patrón "tinta" — design-system.md §1.4.
 *
 * El token `error` da 3.88:1 sobre `surface` en dark, así que solo es válido
 * para texto grande o iconografía. Para el cuerpo de un mensaje, la regla del
 * design system es: el color de estado va en el borde y el texto va en
 * `textPrimary` sobre tinta.
 *
 * El mismo patrón ya se usaba en PlanTurnoScreen y PsicologoForm; aquí queda
 * en un solo lugar para no duplicarlo en cada pantalla.
 */
export type FeedbackTone = "error" | "success" | "warning";

export function makeFeedbackStyles(theme: DefaultTheme, tone: FeedbackTone) {
  const toneColor = theme.colors[tone];

  return StyleSheet.create({
    panel: {
      backgroundColor: theme.colors.background,
      borderLeftWidth: 3,
      borderLeftColor: toneColor,
      borderRadius: theme.radius.small,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginTop: 8,
    },
    text: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      lineHeight: 20,
    },
  });
}
