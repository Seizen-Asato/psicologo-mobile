import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import {
  DangerButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

// Función auxiliar arriba del componente
const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : String(err);

type PacienteRemoveProps = {
  pacienteId: number;
  pacienteNombre: string;
  onRemove: (id: number) => void;
  isLoading?: boolean;
  error?: unknown;
};

const PacienteRemove: React.FC<PacienteRemoveProps> = ({
  pacienteId,
  pacienteNombre,
  onRemove,
  isLoading,
  error,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleRemove = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que quieres eliminar a ${pacienteNombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onRemove(pacienteId),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="small" color={theme.colors.actionPrimary} />
      )}
      {error ? (
        <Text style={styles.error}>Error: {getErrorMessage(error)}</Text>
      ) : null}

      <DangerButton
        onPress={handleRemove}
        accessibilityRole="button"
        accessibilityLabel="Eliminar paciente"
      >
        <SecondaryButtonLabel>Eliminar paciente</SecondaryButtonLabel>
      </DangerButton>
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { marginVertical: 8 },
    error: { color: theme.colors.error, marginTop: 4 },
  });

export default PacienteRemove;
