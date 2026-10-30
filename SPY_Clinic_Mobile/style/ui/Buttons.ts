import styled from "styled-components/native";
import { FontFamily } from "../layout/Typography";

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

export const DangerButtonLabel = styled(BaseLabel)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;
