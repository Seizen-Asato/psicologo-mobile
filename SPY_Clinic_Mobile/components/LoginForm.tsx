import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "../context/Auth";
import { Login } from "../services/authService";
import {
  ButtonText,
  Input,
  InputGroup,
  Label,
  LoginButton,
  LoginCard,
  LoginWrapper,
  Title,
} from "../style/ui/LoginScreenStyle";

const LoginMobile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Faltan datos");
    }

    try {
      const data = await Login(email, password);
      console.log("Login exitoso", data);
      login({ id: data.user.id, email: data.user.email }, data.token);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Iniciar sesión</Title>
        <InputGroup>
          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputGroup>

        <InputGroup>
          <Label>Password</Label>
          <Input secureTextEntry value={password} onChangeText={setPassword} />
        </InputGroup>

        <LoginButton onPress={handleLogin}>
          <ButtonText>Iniciar Sesión</ButtonText>
        </LoginButton>
      </LoginCard>
    </LoginWrapper>
  );
};

export default LoginMobile;
