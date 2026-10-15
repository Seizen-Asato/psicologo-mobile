import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

interface TurnoFiltradoFormProps {
  onFilter: (filters: {
    date?: string;
    pacienteApellido?: string;
    pacienteNombre?: string;
  }) => void;
  onReset: () => void;
}

const TurnoFiltradoForm: React.FC<TurnoFiltradoFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [dateFilter, setDateFilter] = useState("");
  const [patientLastNameFilter, setPatientLastNameFilter] = useState("");
  const [patientNameFilter, setPatientNameFilter] = useState("");
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleSubmit = () => {
    onFilter({
      date: dateFilter,
      pacienteApellido: patientLastNameFilter,
      pacienteNombre: patientNameFilter,
    });
  };

  const handleReset = () => {
    setDateFilter("");
    setPatientLastNameFilter("");
    setPatientNameFilter("");
    onReset();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Paciente (apellido)"
        value={patientLastNameFilter}
        onChangeText={setPatientLastNameFilter}
        style={styles.input}
      />

      <TextInput
        placeholder="Paciente (nombre)"
        value={patientNameFilter}
        onChangeText={setPatientNameFilter}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={dateFilter}
        onChangeText={setDateFilter}
        style={styles.input}
      />

      <PrimaryButton
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Buscar turnos"
      >
        <PrimaryButtonLabel>Buscar</PrimaryButtonLabel>
      </PrimaryButton>
      <View style={styles.spacer} />
      <SecondaryButton
        onPress={handleReset}
        accessibilityRole="button"
        accessibilityLabel="Ver todos los turnos"
      >
        <SecondaryButtonLabel>Ver todos</SecondaryButtonLabel>
      </SecondaryButton>
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
      padding: 12,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.background,
      color: theme.colors.textPrimary,
      borderRadius: 6,
      minHeight: 44,
      marginBottom: 10,
      padding: 12,
    },
    spacer: { height: 8 },
  });

export default TurnoFiltradoForm;
