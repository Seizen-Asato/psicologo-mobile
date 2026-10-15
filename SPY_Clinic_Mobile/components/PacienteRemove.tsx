import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ✅ Función auxiliar arriba del componente
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
      {isLoading && <ActivityIndicator size="small" color="#007AFF" />}
      {error && (
        <Text style={styles.error}>Error: {getErrorMessage(error)}</Text>
      )}

      <Button title="Eliminar paciente" color="red" onPress={handleRemove} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  error: { color: "red", marginTop: 4 },
});

export default PacienteRemove;
