import { TurnoDto } from "@/models/TurnoDto";
import { StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import {
  DangerButton,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";
import AsistenciaComponent from "./AsistenciaComponent";

interface TurnoCardProps {
  turno: TurnoDto;
  onEdit: (turno: TurnoDto) => void;
  onRemove: (id: string) => void;
}

export function TurnoCard({ turno, onEdit, onRemove }: TurnoCardProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {turno.fecha} {turno.hora} - {turno.estado.toUpperCase()}
      </Text>
      <Text style={styles.subtitle}>
        Paciente: {turno.paciente?.Nombre} {turno.paciente?.Apellido}
      </Text>
      <Text style={styles.subtitle}>
        Psicólogo: {turno.psicologo?.nombre} {turno.psicologo?.apellido}
      </Text>
      <Text style={styles.detail}>Duración: {turno.minutos} min</Text>
      {turno.modalidadVirtual && (
        <Text style={styles.detail}>Sesión virtual: {turno.url}</Text>
      )}

      <AsistenciaComponent turno={turno} />

      <View style={styles.actions}>
        <SecondaryButton
          style={styles.action}
          onPress={() => onEdit(turno)}
          accessibilityRole="button"
          accessibilityLabel="Editar turno"
        >
          <SecondaryButtonLabel>Editar</SecondaryButtonLabel>
        </SecondaryButton>
        <DangerButton
          style={styles.action}
          onPress={() => onRemove(turno.turnoId!)}
          accessibilityRole="button"
          accessibilityLabel="Eliminar turno"
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      // En dark la sombra no se ve (sobre #1e2228): se withdrawa la elevation
      // y la separación la aporta el borde.
      elevation: theme.scheme === "dark" ? 0 : 3,
      shadowColor: "#000",
      shadowOpacity: theme.scheme === "dark" ? 0 : 0.1,
      shadowRadius: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 2,
      color: theme.colors.textPrimary,
    },
    detail: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
      gap: 8,
    },
    action: { flex: 1 },
  });
