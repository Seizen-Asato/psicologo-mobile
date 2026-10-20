import "styled-components/native";
import "styled-components";

// styled-components v6 declara DefaultTheme por separado en
// "styled-components" (web) y "styled-components/native" (este proyecto).
// Ambos aumentos deben mantenerse idénticos: el tipado es estructural,
// así `useTheme()` (native) es asignable a `DefaultTheme` (principal).
interface AppThemeColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  actionPrimary: string;
  actionHover: string;
  actionSecondary: string;
  border: string;
  borderInput: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  /** Texto sobre acción primaria/secundaria (#121418). Contraste §1.4. */
  onAction: string;
  /** Color de foco visible (ámbar). §1.4: contorno 3px + offset 2px. */
  focus: string;
}

interface AppThemeShape {
  colors: AppThemeColors;
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  radius: {
    small: number;
    medium: number;
    large: number;
  };
  /** Tamaño táctil mínimo WCAG §1.4. */
  touchMin: number;
  /** Esquema activo: permite ramificar (sombras, gráficos) sin comparar hex. */
  scheme: "light" | "dark";
}

declare module "styled-components" {
  export interface DefaultTheme extends AppThemeShape {}
}

declare module "styled-components/native/dist/models/ThemeProvider" {
  export interface DefaultTheme extends AppThemeShape {}
}
