//aun no se implemento, post examenes se implementara el registro

import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { UsuarioDto } from "../models/UsuarioDto";
import { create } from "../services/UsuarioService";

export default function RegisterScreen() {
  const [form, setForm] = useState<UsuarioDto>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    consultorio: "",
    rol: "Psicólogo",
  });

  const router = useRouter();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleChange = (key: keyof UsuarioDto, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.lastName || !form.email || !form.password) {
      return Alert.alert("Error", "Todos los campos son obligatorios");
    }

    try {
      const newUser = await create(form);
      Alert.alert("Éxito", "Usuario creado correctamente");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear nuevo usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={theme.colors.textDisabled}
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Consultorio"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.consultorio ?? ""}
        onChangeText={(text) => handleChange("consultorio", text)}
      />

      <Pressable
        style={styles.button}
        onPress={handleRegister}
        accessibilityRole="button"
        accessibilityLabel="Registrar usuario"
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      textAlign: "center",
      color: theme.colors.textPrimary,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      borderRadius: 6,
      minHeight: 44,
      padding: 12,
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
    },
    button: {
      backgroundColor: theme.colors.actionPrimary,
      minHeight: 44,
      justifyContent: "center",
      padding: 12,
      borderRadius: 6,
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.onAction,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
