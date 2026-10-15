import { TurnoDto } from "@/models/TurnoDto";
import { Button, StyleSheet, Text, View } from "react-native";

interface TurnoCardProps {
  turno: TurnoDto;
  onEdit: (turno: TurnoDto) => void;
  onRemove: (id: string) => void;
}

export function TurnoCard({ turno, onEdit, onRemove }: TurnoCardProps) {
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

      <View style={styles.actions}>
        <Button title="Editar" onPress={() => onEdit(turno)} />
        <Button
          title="Eliminar"
          color="red"
          onPress={() => onRemove(turno.turnoId!)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  detail: {
    fontSize: 12,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
