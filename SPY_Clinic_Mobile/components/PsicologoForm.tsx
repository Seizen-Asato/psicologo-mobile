import { usePsicologo } from "@/hooks/usePsicologo";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { PrimaryButton, PrimaryButtonLabel } from "../style/ui/Buttons";

export default function PsicologoForm() {
  const { create, loading, error } = usePsicologo();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rolId: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    setFormError(null);
    setSuccessMsg(null);

    if (!form.nombre || !form.apellido) {
      setFormError("Nombre y apellido son obligatorios");
      return;
    }
    if (!form.email.includes("@")) {
      setFormError("Email inválido");
      return;
    }
    if (!form.telefono) {
      setFormError("Teléfono es obligatorio");
      return;
    }

    const result = await create(form);

    if (result.success) {
      setSuccessMsg("¡Psicólogo creado con éxito!");
      setForm({ nombre: "", apellido: "", email: "", telefono: "", rolId: "" });
    } else {
      setFormError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nuevo Psicólogo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.nombre}
        onChangeText={(text) => setForm({ ...form, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={form.apellido}
        onChangeText={(text) => setForm({ ...form, apellido: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={form.telefono}
        onChangeText={(text) => setForm({ ...form, telefono: text })}
      />

      <PrimaryButton
        onPress={handleSubmit}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel="Crear psicólogo"
      >
        <PrimaryButtonLabel>
          {loading ? "Guardando..." : "Crear Psicólogo"}
        </PrimaryButtonLabel>
      </PrimaryButton>

      {formError && (
        <View style={styles.errorBox}>
          <Text style={styles.messageText}>{formError}</Text>
        </View>
      )}
      {successMsg && (
        <View style={styles.successBox}>
          <Text style={styles.messageText}>{successMsg}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.messageText}>Error: {String(error)}</Text>
        </View>
      )}
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { padding: 16, backgroundColor: theme.colors.background },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme.colors.textPrimary,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      minHeight: 44,
      padding: 12,
      marginBottom: 10,
      borderRadius: 6,
    },
    errorBox: {
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.error,
      borderRadius: 4,
      padding: 8,
      marginTop: 8,
    },
    successBox: {
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.success,
      borderRadius: 4,
      padding: 8,
      marginTop: 8,
    },
    messageText: { color: theme.colors.textPrimary },
  });
