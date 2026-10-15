import styled from "styled-components/native";

export const LoginWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoginCard = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  width: 400px;
  padding: 40px 0;
  border-radius: 12px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  align-items: center;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const InputGroup = styled.View`
  width: 90%;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const LoginButton = styled.Pressable`
  width: 85%;
  background-color: ${({ theme }) => theme.colors.accent};
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
