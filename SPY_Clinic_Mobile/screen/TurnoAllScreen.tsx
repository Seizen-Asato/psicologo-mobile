import { TurnoCard } from "@/components/TurnoCard";
import TurnoFilterPicker from "@/components/TurnoFilterPicker";
import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import { PrimaryButton, PrimaryButtonLabel } from "@/style/ui/Buttons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

export default function TurnoAllScreen() {
  const {
    turnos,
    loading,
    error,
    fetchTurnosALL,
    removeTurno,
    filterTurnos,
    markAsistio,
    markAusente,
    apellido,
    estado,
    setEstado,
    setApellido,
  } = useTurno();
  const router = useRouter();
  const theme = useTheme();
  const styles = makeStyles(theme);

  useEffect(() => {
    fetchTurnosALL();
  }, []);

  if (loading) {
    return <Text style={styles.message}>Cargando turnos...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>Error al cargar los turnos</Text>;
  }

  return (
    <View style={styles.container}>
      <PrimaryButton
        onPress={() => router.push("/turnos" as any)}
        accessibilityRole="button"
        accessibilityLabel="Nuevo turno"
      >
        <PrimaryButtonLabel>Nuevo turno</PrimaryButtonLabel>
      </PrimaryButton>
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
                pathname: "/turnos",
                params: { id: t.turnoId },
              } as any)
            }
            onRemove={async (id) => {
              await removeTurno(id);
              await fetchTurnosALL();
            }}
            onAsistio={markAsistio}
            onAusente={markAusente}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {turnos.length === 0 ? (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push("/turno" as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.emptyTitle}>No hay turnos registrados</Text>
                <Text style={styles.emptySubtitle}>
                  Presiona “Nuevo turno” para crear uno.
                </Text>
              </TouchableOpacity>
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

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: theme.colors.background,
    },
    message: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    emptyContainer: {
      alignItems: "center",
      marginTop: 40,
    },
    emptyButton: {
      alignItems: "center",
      padding: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });
