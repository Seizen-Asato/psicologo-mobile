import PacienteFilter from "@/components/PacienteFilter";
import PacienteForm from "@/components/PacienteForm";
import PacienteRemove from "@/components/PacienteRemove";
import { usePaciente } from "@/hooks/usePaciente";
import { usePacienteFilter } from "@/hooks/usePacienteFilter";
import { PacienteDto } from "@/models/PacienteDto";
import * as PacienteService from "@/services/PacienteService";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { SecondaryButton, SecondaryButtonLabel } from "../style/ui/Buttons";

export default function PacienteScreen() {
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

  const [formVisible, setFormVisible] = useState(false);

  const { pacienteNameFilter, filter, filterPaciente } =
    usePacienteFilter(pacientesData);

  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  const openNewPatientForm = () => {
    setSelectedPaciente(undefined);
    setFormVisible(true);
  };

  const openEditPatientForm = (paciente: PacienteDto) => {
    setSelectedPaciente(paciente);
    setFormVisible(true);
  };

  const closePatientForm = () => {
    setSelectedPaciente(undefined);
    setFormVisible(false);
  };

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
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={[styles.layout, isWideScreen && styles.layoutWide]}>
        {formVisible && (
          <View
            style={[styles.formSection, isWideScreen && styles.formSectionWide]}
          >
            <Text style={styles.sectionTitle}>
              {selectedPaciente ? "Editar paciente" : "Nuevo paciente"}
            </Text>

            <PacienteForm
              key={selectedPaciente?.pacienteId ?? "nuevo-paciente"}
              onSave={(paciente) => {
                if (selectedPaciente) {
                  updatePacienteMutation.mutate(paciente, {
                    onSuccess: closePatientForm,
                  });
                } else {
                  createPacienteMutation.mutate(paciente, {
                    onSuccess: closePatientForm,
                  });
                }
              }}
              selected={selectedPaciente}
            />

            <Button title="Cancelar" onPress={closePatientForm} />
          </View>
        )}

        <View
          style={[
            styles.patientsSection,
            isWideScreen && formVisible && styles.patientsSectionWide,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Pacientes registrados</Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Nuevo paciente"
              style={styles.newButton}
              onPress={openNewPatientForm}
            >
              <Feather name="plus" size={18} color="#FFFFFF" />
              <Text style={styles.newButtonText}>Nuevo paciente</Text>
            </Pressable>
          </View>

          <PacienteFilter filter={filter} onFilterChange={pacienteNameFilter} />

          {filterPaciente.map((p) => (
            <View key={p.pacienteId} style={styles.patientCard}>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>
                  {p.nombre} {p.apellido}
                </Text>

                {p.telefono ? (
                  <Text style={styles.patientDetail}>{p.telefono}</Text>
                ) : null}
              </View>

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Editar ${p.nombre}`}
                  style={styles.actionButton}
                  onPress={() => openEditPatientForm(p)}
                >
                  <Feather name="edit-2" size={20} color="#3984E8" />
                </Pressable>

                {p.pacienteId != null && (
                  <PacienteRemove
                    pacienteId={p.pacienteId}
                    pacienteNombre={p.nombre}
                    onRemove={removePacienteMutation.mutate}
                    isLoading={removePacienteMutation.isPending}
                    error={removePacienteMutation.error}
                  />
                )}
              </View>
            </View>
          ))}

          {filterPaciente.length === 0 && (
            <Text style={styles.emptyText}>No hay pacientes para mostrar.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 12,
    flexGrow: 1,
  },
  layout: {
    gap: 24,
  },
  layoutWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  formSection: {
    width: "100%",
    gap: 12,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  formSectionWide: {
    flex: 1,
    minWidth: 0,
  },
  patientsSection: {
    width: "100%",
    gap: 10,
  },
  patientsSectionWide: {
    flex: 1,
    minWidth: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  newButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#2478D4",
  },
  newButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginVertical: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  patientInfo: {
    flex: 1,
    marginRight: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  patientDetail: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyText: {
    color: "#6B7280",
    marginTop: 8,
  },
  error: {
    color: "red",
  },
});
