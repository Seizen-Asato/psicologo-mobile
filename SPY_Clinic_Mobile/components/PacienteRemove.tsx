import React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
      {isLoading ? (
        <ActivityIndicator size="small" color="#D9534F" />
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Eliminar a ${pacienteNombre}`}
          onPress={handleRemove}
          style={styles.actionButton}
        >
          <Feather name="trash-2" size={20} color="#D9534F" />
        </Pressable>
      )}

      {error != null && (
        <Text style={styles.error}>Error: {getErrorMessage(error)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    padding: 8,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});

export default PacienteRemove;
