import "styled-components";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      background: string;
      card: string;
      text: string;
      accent: string;
      border: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
  }
}
