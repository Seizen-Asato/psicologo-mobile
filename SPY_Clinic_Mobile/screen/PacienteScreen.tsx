import PacienteFilter from "@/components/PacienteFilter";
import PacienteForm from "@/components/PacienteForm";
import PacienteRemove from "@/components/PacienteRemove";
import { usePaciente } from "@/hooks/usePaciente";
import { usePacienteFilter } from "@/hooks/usePacienteFilter";
import { PacienteDto } from "@/models/PacienteDto";
import * as PacienteService from "@/services/PacienteService";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { SecondaryButton, SecondaryButtonLabel } from "../style/ui/Buttons";

export default function PacienteScren() {
  const {
    createPacienteMutation,
    updatePacienteMutation,
    removePacienteMutation,
    pacientesData,
    isLoading,
    error,
  } = usePaciente({
    getAll: PacienteService.getAll,
    getById: PacienteService.getById,
    create: PacienteService.create,
    update: PacienteService.update,
    remove: PacienteService.remove,
  });
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [selectedPaciente, setSelectedPaciente] = useState<
    PacienteDto | undefined
  >(undefined);

  const { pacienteNameFilter, filter, filterPaciente } =
    usePacienteFilter(pacientesData);
  if (isLoading) {
    return (
      <View style={styles.feedback}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.feedback}>
        <Text style={styles.error}>Error al cargar pacientes</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <PacienteForm
        onSave={
          selectedPaciente
            ? updatePacienteMutation.mutate
            : createPacienteMutation.mutate
        }
        selected={selectedPaciente}
      />

      <PacienteFilter filter={filter} onFilterChange={pacienteNameFilter} />
      {filterPaciente.map((p) => (
        <View key={p.Id} style={{ marginVertical: 8 }}>
          <SecondaryButton
            onPress={() => setSelectedPaciente(p)}
            accessibilityRole="button"
            accessibilityLabel={`Editar ${p.nombre}`}
          >
            <SecondaryButtonLabel>Editar {p.nombre}</SecondaryButtonLabel>
          </SecondaryButton>
          <PacienteRemove
            pacienteId={p.Id!}
            pacienteNombre={p.nombre}
            onRemove={removePacienteMutation.mutate}
            isLoading={removePacienteMutation.isPending}
            error={removePacienteMutation.error}
          />
        </View>
      ))}
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    feedback: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    error: { color: theme.colors.error, fontSize: 16 },
  });
