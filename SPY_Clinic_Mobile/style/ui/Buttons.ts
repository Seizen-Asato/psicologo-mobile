import styled from "styled-components/native";
import { FontFamily } from "../layout/Typography";

// design-system.md §1.4 — Primario: fondo brand + texto ink (#121418)
// (light 5.91:1 / dark 9.08:1). Secundario/peligro: fondo surface +
// borde + texto primario; nunca texto pequeño en lima/ámbar/rojo sobre
// superficie. Táctil mínimo 44px en todos.

const BaseButton = styled.Pressable`
  min-height: 44px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.small}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.actionPrimary};
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderInput};
`;

export const DangerButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error};
`;

const BaseLabel = styled.Text`
  font-family: ${FontFamily.bold};
  font-size: 16px;
  font-weight: 700;
`;

export const PrimaryButtonLabel = styled(BaseLabel)`
  color: ${({ theme }) => theme.colors.onAction};
`;

export const SecondaryButtonLabel = styled(BaseLabel)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

// El peligro lo marca el borde/error del botón; el texto queda primario
// porque el design-system prohíbe texto pequeño en rojo sobre surface (§1.4).
export const DangerButtonLabel = styled(BaseLabel)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;
