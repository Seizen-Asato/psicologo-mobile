import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { FechaPicker } from "./FechaHoraPicker";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

interface TurnoFiltradoFormProps {
  onFilter: (filters: { titulo?: string; date?: string }) => void;

  onReset: () => void;
}
const TurnoFiltradoForm: React.FC<TurnoFiltradoFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [dateFilter, setDateFilter] = useState("");
  const [tituloFilter, setTituloFilter] = useState("");

  const theme = useTheme();
  const styles = makeStyles(theme);
  const handleSubmit = () => {
    onFilter({
      titulo: tituloFilter,
      date: dateFilter,
    });
  };
  const handleReset = () => {
    setTituloFilter("");
    setDateFilter("");
    onReset();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={tituloFilter}
        onChangeText={setTituloFilter}
        style={styles.input}
      />

      <FechaPicker
        value={dateFilter}
        onChange={setDateFilter}
        placeholder="Seleccionar fecha para filtrar..."
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
