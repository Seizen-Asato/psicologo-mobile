// components/AgendaDetalle.tsx
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
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

interface AgendaDetalleComponentProps {
  agenda?: AgendaItem;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AgendaDetalleComponent({
  agenda,
  onEdit,
  onDelete,
}: AgendaDetalleComponentProps) {
  const theme: DefaultTheme = useTheme();
  const styles = makeStyles(theme);

  if (!agenda) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontró la información de la agenda.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.container}
    >
      <Text style={styles.title}>{agenda.titulo}</Text>
      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.value}>{agenda.descripcion}</Text>
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{agenda.fecha}</Text>

      <View style={styles.buttons}>
        <PrimaryButton onPress={onEdit}>
          <PrimaryButtonLabel>Editar</PrimaryButtonLabel>
        </PrimaryButton>
        <SecondaryButton onPress={onDelete}>
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </SecondaryButton>
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { padding: 20, backgroundColor: theme.colors.background },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.textPrimary,
    },
    label: {
      fontWeight: "bold",
      marginTop: 10,
      color: theme.colors.textPrimary,
    },
    value: { marginTop: 4, color: theme.colors.textSecondary },
    buttons: { marginTop: 30, gap: 12 },
    errorText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginTop: 20,
    },
  });
