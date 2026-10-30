import { TurnoDto } from "@/models/TurnoDto";
import { compartirTurno } from "@/utils/CompartirTurno";
import { useRef } from "react";
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
  onAsistio?: (id: string) => Promise<{ success: boolean }>;
  onAusente?: (id: string) => Promise<{ success: boolean }>;
}

export function TurnoCard({
  turno,
  onEdit,
  onRemove,
  onAsistio,
  onAusente,
}: TurnoCardProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const cardRef = useRef<View>(null);

  return (
    <View style={styles.card} ref={cardRef}>
      <Text style={styles.title}>
        {turno.fecha} {turno.hora} -{" "}
        {(turno.estado ?? "pendiente").toUpperCase()}
      </Text>
      <Text style={styles.subtitle}>
        Paciente: {turno.paciente?.nombre} {turno.paciente?.apellido}
      </Text>
      <Text style={styles.subtitle}>
        Psicólogo: {turno.psicologo?.nombre} {turno.psicologo?.apellido}
      </Text>
      <Text style={styles.detail}>Duración: {turno.minutos} min</Text>
      {turno.modalidadVirtual && (
        <Text style={styles.detail}>Sesión virtual: {turno.url}</Text>
      )}

      {(onAsistio || onAusente) && (
        <AsistenciaComponent
          turno={turno}
          onAsistio={onAsistio ?? (async () => ({ success: false }))}
          onAusente={onAusente ?? (async () => ({ success: false }))}
        />
      )}

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
        <SecondaryButton
          style={styles.action}
          onPress={() => compartirTurno(cardRef)}
        >
          <SecondaryButtonLabel>Compartir</SecondaryButtonLabel>
        </SecondaryButton>
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
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
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
