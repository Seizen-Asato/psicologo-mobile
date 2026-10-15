import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useAuthStore } from "../context/Auth";
import { Login } from "../services/authService";
import {
  ButtonText,
  Input,
  InputGroup,
  Label,
  LoginButton,
  LoginCard,
  LoginSafeArea,
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
    <LoginSafeArea>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
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
                  autoCorrect={false}
                  textContentType="emailAddress"
                  returnKeyType="next"
                  accessibilityLabel="Correo electrónico"
                  accessibilityHint="Ingresa tu correo para iniciar sesión"
                />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  accessibilityLabel="Contraseña"
                  accessibilityHint="Ingresa tu contraseña"
                />
              </InputGroup>

              <LoginButton
                onPress={handleLogin}
                accessibilityRole="button"
                accessibilityLabel="Iniciar sesión"
                accessibilityHint="Envía tus credenciales e ingresa a la app"
              >
                <ButtonText>Iniciar Sesión</ButtonText>
              </LoginButton>
            </LoginCard>
          </LoginWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </LoginSafeArea>
  );
};

export default LoginMobile;
