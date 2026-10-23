import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

interface AgendaItem {
  agendaId: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  horaInicio?: string;
  horaFin?: string;
}

interface AgendaFormEdicionProps {
  agendaInicial: AgendaItem;
  onSave: (agendaModificada: AgendaItem) => void;
  onCancel: () => void;
}

export default function AgendaFormEdicion({
  agendaInicial,
  onSave,
  onCancel,
}: AgendaFormEdicionProps) {
  const [titulo, setTitulo] = useState(agendaInicial.titulo || "");
  const [descripcion, setDescripcion] = useState(
    agendaInicial.descripcion || "",
  );
  const [fecha, setFecha] = useState(agendaInicial.fecha || "");

  const handleGuardar = () => {
    onSave({
      ...agendaInicial,
      titulo,
      descripcion,
      fecha,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Agenda</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Fecha</Text>
      <TextInput style={styles.input} value={fecha} onChangeText={setFecha} />

      <View style={styles.buttons}>
        <PrimaryButton onPress={handleGuardar}>
          <PrimaryButtonLabel>Guardar Cambios</PrimaryButtonLabel>
        </PrimaryButton>
        <SecondaryButton onPress={onCancel}>
          <SecondaryButtonLabel>Cancelar</SecondaryButtonLabel>
        </SecondaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor:
      "#ccc`, padding: 8, marginTop: 4, borderRadius: 6, backgroundColor: #fff",
  },
  buttons: { marginTop: 30, gap: 12 },
});
