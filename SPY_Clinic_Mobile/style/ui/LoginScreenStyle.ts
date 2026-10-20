import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

// design-system.md §1.2/1.3 + Expo v54 safe-area-context.
// Mobile-first: sin anchos fijos, táctil mínimo 44px (§1.4).

export const LoginSafeArea = styled(SafeAreaView)`
  flex: 1;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

// Toggle de tema: fijo en la esquina superior derecha, fuera del ScrollView
// para que siga siendo alcanzable con el teclado abierto.
// `$top` lleva el inset del safe area: los hijos absolutos se posicionan
// respecto al padding box, sin el inset el toggle caería bajo la barra de
// estado. Prop transitoria: no se propaga al View nativo.
export const LoginThemeToggle = styled.View<{ $top: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  right: 12px;
  z-index: 10;
`;

export const LoginWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoginCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.large}px
    ${({ theme }) => theme.spacing.medium}px;
  border-radius: ${({ theme }) => theme.radius.medium}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  align-items: stretch;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  width: 100%;
  min-height: 44px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.small}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderInput};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LoginButton = styled.Pressable`
  width: 100%;
  min-height: 44px;
  background-color: ${({ theme }) => theme.colors.actionPrimary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.small}px;
  margin-top: ${({ theme }) => theme.spacing.small}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.onAction};
  font-weight: 700;
  font-size: 16px;
`;
