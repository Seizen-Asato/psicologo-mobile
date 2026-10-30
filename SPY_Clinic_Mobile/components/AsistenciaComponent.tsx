import { TurnoDto } from "@/models/TurnoDto";
import {
  DangerButton,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButtonLabel,
} from "@/style/ui/Buttons";
import React from "react";
import { Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

interface AsistenciaProps {
  turno: TurnoDto;
  onAsistio: (id: string) => Promise<{ success: boolean }>;
  onAusente: (id: string) => Promise<{ success: boolean }>;
}

export default function AsistenciaComponent({
  turno,
  onAsistio,
  onAusente,
}: AsistenciaProps) {
  const theme: DefaultTheme = useTheme();

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={{ color: theme.colors.textPrimary }}>Asistencia</Text>
      <PrimaryButton onPress={() => onAsistio(turno.turnoId!)}>
        <PrimaryButtonLabel>Asistió</PrimaryButtonLabel>
      </PrimaryButton>
      <DangerButton onPress={() => onAusente(turno.turnoId!)}>
        <SecondaryButtonLabel>No asistió</SecondaryButtonLabel>
      </DangerButton>
    </View>
  );
}
