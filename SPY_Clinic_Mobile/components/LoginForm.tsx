import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Login } from "../services/authService";

const LoginMobile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Faltan datos");
    }

    try {
      const data = await Login(email, password);

      // En React Native no existe localStorage.
      // Se recomienda usar AsyncStorage o expo-secure-store.
      // await SecureStore.setItemAsync("token", data.token);

      console.log("Login exitoso", data);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.loginWrapper}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Sección comentada adaptada a React Native */}
        {/* 
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <View style={styles.socialSection}>
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Iniciar sesión con Facebook</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            ¿No tienes una cuenta? <Text style={styles.signupLink}>Crear cuenta</Text>
          </Text>
        </View> 
        */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  loginCard: {
    backgroundColor: "#1e293b",
    width: "90%",
    maxWidth: 400,
    paddingVertical: 40,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    width: "90%",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
    color: "white",
  },
  loginButton: {
    width: "85%",
    backgroundColor: "#38bdf8",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#090e17",
    fontWeight: "bold",
    fontSize: 14,
  },
  forgotPassword: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 16,
  },
  socialSection: {
    width: "85%",
    marginTop: 20,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },
  separatorText: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 10,
  },
  socialBtn: {
    backgroundColor: "transparent",
    borderColor: "#334155",
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  socialBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
  signupLink: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginMobile;
