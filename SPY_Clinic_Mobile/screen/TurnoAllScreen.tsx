import { TurnoCard } from "@/components/TurnoCard";
import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import TurnoFilterPicker from "@/components/TurnoFilterPicker";

export default function TurnoAllScreen() {
  const {
    turnos,
    loading,
    error,
    fetchTurnosALL,
    removeTurno,
    filterTurnos,
    apellido,
    estado,
    setEstado,
    setApellido,
  } = useTurno();
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
      <TurnoFilterPicker
        apellido={apellido}
        estado={estado}
        setApellido={setApellido}
        setEstado={setEstado}
      />

      <FlatList
        data={filterTurnos()}
        keyExtractor={(item: TurnoDto, index) =>
          item.turnoId ? item.turnoId.toString() : index.toString()
        }
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
            {turnos.length === 0 ? (
              <>
                <Text style={styles.emptyTitle}>No hay turnos registrados</Text>
                <Text style={styles.emptySubtitle}>
                  Presiona “Nuevo turno” para crear uno.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>
                  No se encontraron resultados
                </Text>
                <Text style={styles.emptySubtitle}>
                  Ajusta los filtros para ver otros turnos.
                </Text>
              </>
            )}
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
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
