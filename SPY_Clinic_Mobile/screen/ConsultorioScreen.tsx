import { ConsultorioDto } from "@/models/Consultorio";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import ConsultorioForm from "../components/ConsultorioForm";
import { useConsultorio } from "../hooks/useConsultorio";
import {
  DangerButton,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";
import { makeFeedbackStyles } from "../style/ui/Feedback";

export default function ConsultorioScreen() {
  const { consultorio, fetchAll, remove, loading, error } = useConsultorio();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const feedback = makeFeedbackStyles(theme, "error");

  useEffect(() => {
    fetchAll();
  }, []);

  const renderConsultorio = ({ item }: { item: ConsultorioDto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Nombre}</Text>
      <Text style={styles.body}>{formatDireccion(item)}</Text>
      <Text style={styles.body}>Modalidad: {item.TipoModalidadNombre}</Text>
      <View style={styles.actions}>
        <SecondaryButton
          style={styles.actionButton}
          onPress={() => console.log("Editar", item)}
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.Nombre}`}
        >
          <SecondaryButtonLabel>Editar</SecondaryButtonLabel>
        </SecondaryButton>
        <DangerButton
          style={styles.actionButton}
          onPress={() => remove(item.Id)}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar ${item.Nombre}`}
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gestión de Consultorios</Text>

      <ConsultorioForm />

      <Text style={styles.heading}>Consultorios Registrados</Text>
      {loading && <Text style={styles.body}>Cargando...</Text>}
      {error && (
        <View style={feedback.panel}>
          <Text style={feedback.text}>Error: {String(error)}</Text>
        </View>
      )}

      <FlatList
        data={consultorio}
        keyExtractor={(item) => String(item.Id)}
        renderItem={renderConsultorio}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Calle y Número son opcionales: sin esto se imprimía "null null".
const formatDireccion = (item: ConsultorioDto) => {
  const partes = [item.Calle, item.Numero].filter(
    (p) => p !== null && p !== undefined && p !== "",
  );
  return partes.length ? partes.join(" ") : "Sin dirección";
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.textPrimary,
    },
    body: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.textSecondary,
    },
    list: {
      paddingBottom: 24,
    },
    card: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: 12,
      marginBottom: 10,
      borderRadius: theme.radius.small,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 4,
    },
  });
