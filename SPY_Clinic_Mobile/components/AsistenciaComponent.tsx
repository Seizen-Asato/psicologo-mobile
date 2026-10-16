import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import {
  DangerButton,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButtonLabel,
} from "@/style/ui/Buttons";
import React from "react";
import { Text, View } from "react-native";

interface AsistenciaProps {
  turno: TurnoDto;
}

export default function AsistenciaComponent({ turno }: AsistenciaProps) {
  const { markAsistio, markAusente } = useTurno();

  return (
    <View style={{ marginTop: 8 }}>
      <Text>Asistencia</Text>
      <PrimaryButton onPress={() => markAsistio(turno.turnoId!)}>
        <PrimaryButtonLabel>Asistió</PrimaryButtonLabel>
      </PrimaryButton>
      <DangerButton onPress={() => markAusente(turno.turnoId!)}>
        <SecondaryButtonLabel>No asistió</SecondaryButtonLabel>
      </DangerButton>
    </View>
  );
}
