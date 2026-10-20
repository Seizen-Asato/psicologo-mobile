import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import {
  DangerButton,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButtonLabel,
} from "@/style/ui/Buttons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

interface AsistenciaProps {
  turno: TurnoDto;
}

export default function AsistenciaComponent({ turno }: AsistenciaProps) {
  const { markAsistio, markAusente } = useTurno();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const pacienteNombre =
    turno.paciente?.Nombre && turno.paciente?.Apellido
      ? `${turno.paciente.Nombre} ${turno.paciente.Apellido}`
      : "el paciente";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencia</Text>
      <PrimaryButton
        onPress={() => markAsistio(turno.turnoId!)}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={`Marcar que ${pacienteNombre} asistió`}
      >
        <PrimaryButtonLabel>Asistió</PrimaryButtonLabel>
      </PrimaryButton>
      <DangerButton
        onPress={() => markAusente(turno.turnoId!)}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={`Marcar que ${pacienteNombre} no asistió`}
      >
        <SecondaryButtonLabel>No asistió</SecondaryButtonLabel>
      </DangerButton>
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      marginTop: 8,
      padding: 12,
      borderRadius: theme.radius.small,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    button: { marginTop: 8 },
  });
