import { usePsicologo } from "@/hooks/usePsicologo";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function PsicologoForm() {
  const { create, loading, error } = usePsicologo();

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

      <Button
        title={loading ? "Guardando..." : "Crear Psicólogo"}
        onPress={handleSubmit}
      />

      {formError && <Text style={styles.error}>{formError}</Text>}
      {successMsg && <Text style={styles.success}>{successMsg}</Text>}
      {error && <Text style={styles.error}>Error: {String(error)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  error: { color: "red", marginTop: 8 },
  success: { color: "green", marginTop: 8 },
});
