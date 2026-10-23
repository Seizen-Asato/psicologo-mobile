// components/AgendaForm.tsx
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

interface AgendaItem {
  agendaId?: number;
  titulo?: string;
  descripcion?: string;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
}

interface AgendaFormProps {
  agenda?: AgendaItem;
  onCreate?: (data: any) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AgendaForm({
  agenda,
  onCreate,
  onEdit,
  onDelete,
}: AgendaFormProps) {
  if (!agenda) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Formulario de creación de agenda</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{agenda.titulo ?? "Sin título"}</Text>
      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.value}>
        {agenda.descripcion ?? "Sin descripción"}
      </Text>
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{agenda.fecha ?? "Sin fecha"}</Text>

      <View style={styles.buttons}>
        {onEdit && (
          <PrimaryButton onPress={onEdit}>
            <PrimaryButtonLabel>Editar</PrimaryButtonLabel>
          </PrimaryButton>
        )}
        {onDelete && (
          <SecondaryButton onPress={onDelete}>
            <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
          </SecondaryButton>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { marginTop: 4 },
  buttons: { marginTop: 30, gap: 12 },
  errorText: { fontSize: 16, color: "gray", textAlign: "center" },
});
