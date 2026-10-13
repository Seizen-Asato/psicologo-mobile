import { TurnoCard } from "@/components/TurnoCard";
import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function TurnoAllScreen() {
  const { turnos, loading, error, fetchTurnosALL, removeTurno } = useTurno();
  const router = useRouter();

  useEffect(() => {
    fetchTurnosALL();
  }, []);

  console.log("Turnos:", turnos.length);
  if (loading) {
    return <Text style={styles.message}>Cargando turnos...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>Error al cargar los turnos</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Nuevo turno"
        onPress={() => router.push("/turno" as any)}
      />
      <FlatList
        data={turnos}
        keyExtractor={(item: TurnoDto) => item.turnoId!.toString()}
        renderItem={({ item }: { item: TurnoDto }) => (
          <TurnoCard
            turno={item}
            onEdit={(t) =>
              router.push({
                pathname: "/turno",
                params: { id: t.turnoId },
              } as any)
            }
            onRemove={(id) => removeTurno(id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No hay turnos registrados</Text>
            <Text style={styles.emptySubtitle}>
              Presiona “Nuevo turno” para crear uno.
            </Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }} // 👈 asegura que se muestre aunque esté vacío
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
