import { usePlanTurno } from "@/hooks/usePlanTurno";
import { PacienteDto } from "@/models/PacienteDto";
import { PsicologoDto } from "@/models/PsicolgoDto";
import * as pacientesService from "@/services/PacienteService";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import {
  DangerButton,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

export interface PlanTurnoDto {
  planTurnoId?: number;
  fechaInicio: string;
  fechaFin: string;
  paciente: PacienteDto;
  psicologo: PsicologoDto;
}

export default function PlanTurnoScreen() {
  const { planes, loading, error, createPlan, deletePlan } = usePlanTurno();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [pacientes, setPacientes] = useState<PacienteDto[]>([]);
  const [form, setForm] = useState<{
    paciente: PacienteDto | null;
    fechaInicio: string;
    fechaFin: string;
  }>({
    paciente: null,
    fechaInicio: "",
    fechaFin: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setPacientes(await pacientesService.getAll());
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setFormError(null);
    setSuccessMsg(null);

    if (!form.paciente) {
      setFormError("Agregar al paciente es obligatorio");
      return;
    }

    const payload = {
      pacienteId: form.paciente.Id,
      pacienteNombre: form.paciente.Nombre,
      pacienteApellido: form.paciente.Apellido,
      fechaInicio: form.fechaInicio
        ? new Date(form.fechaInicio).toISOString().split("T")[0]
        : null,
      fechaFin: form.fechaFin
        ? new Date(form.fechaFin).toISOString().split("T")[0]
        : null,
    };

    const result = await createPlan(payload);

    if (result.success) {
      setSuccessMsg("¡Plan Turno creado con éxito!");
      setForm({ paciente: null, fechaInicio: "", fechaFin: "" });
    } else {
      setFormError(result.error);
    }
  };

  const renderTurno = ({ item }: { item: PlanTurnoDto }) => {
    const pTId = item.planTurnoId;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardActivo}>Estado: </Text>
          {new Date(item.fechaFin) >= new Date() ? "Pendiente" : "Finalizado"}
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Nombre del Paciente:</Text>{" "}
            {item.paciente.Nombre || "N/A"}
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Apellido del Paciente:</Text>{" "}
            {item.paciente.Apellido || "N/A"}
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>FechaInicio:</Text>{" "}
            {item.fechaInicio
              ? new Date(item.fechaInicio).toLocaleDateString()
              : "No especificada"}
          </Text>

          <Text style={styles.bodyText}>
            <Text style={styles.bold}>FechaFin:</Text>{" "}
            {item.fechaFin
              ? new Date(item.fechaFin).toLocaleDateString()
              : "No especificada"}
          </Text>
        </View>
        <DangerButton
          onPress={() => pTId && deletePlan(String(pTId))}
          accessibilityRole="button"
          accessibilityLabel="Eliminar turno"
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={planes}
      keyExtractor={(item) => String(item.planTurnoId)}
      renderItem={renderTurno}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Gestión de Plan Turnos</Text>
          <Text style={styles.subtitle}>
            Crea nuevos turnos y visualiza el listado en tiempo real.
          </Text>

          {formError && (
            <View style={styles.errorBox}>
              <Text style={styles.messageText}>{formError}</Text>
            </View>
          )}
          {successMsg && (
            <View style={styles.successBox}>
              <Text style={styles.messageText}>{successMsg}</Text>
            </View>
          )}

          <View style={styles.formCard}>
            <Text style={styles.label}>Paciente</Text>
            <Picker
              style={styles.input}
              selectedValue={form.paciente?.Id || ""}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  paciente:
                    pacientes.find((p) => p.Id === Number(value)) ?? null,
                })
              }
            >
              <Picker.Item label="Seleccione..." value="" />
              {pacientes.map((p) => (
                <Picker.Item
                  key={p.Id}
                  label={`${p.Nombre} ${p.Apellido}`}
                  value={p.Id}
                />
              ))}
            </Picker>

            <Text style={styles.label}>Fecha y Hora de Inicio</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DDTHH:mm"
              value={form.fechaInicio}
              onChangeText={(text) => setForm({ ...form, fechaInicio: text })}
            />

            <Text style={styles.label}>Fecha y Hora de Fin</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DDTHH:mm"
              value={form.fechaFin}
              onChangeText={(text) => setForm({ ...form, fechaFin: text })}
            />

            <PrimaryButton
              onPress={handleSubmit}
              accessibilityRole="button"
              accessibilityLabel="Crear turno"
            >
              <PrimaryButtonLabel>Crear Plan</PrimaryButtonLabel>
            </PrimaryButton>
          </View>

          <Text style={styles.sectionTitle}> Plan de Turnos Registrados</Text>

          {loading && (
            <ActivityIndicator
              size="large"
              color={theme.colors.actionPrimary}
            />
          )}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.messageText}>Error: {error}</Text>
            </View>
          )}
          {!loading && planes.length === 0 && (
            <Text style={styles.bodyText}>
              No hay nignun plan de turnos registrados todavía.
            </Text>
          )}
        </View>
      }
    />
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },

    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },

    formCard: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    label: {
      fontWeight: "600",
      fontSize: 12,
      marginBottom: 6,
      color: theme.colors.textSecondary,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      minHeight: 44,
      padding: 12,
      marginBottom: 12,
      borderRadius: 6,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme.colors.textPrimary,
    },

    card: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    cardActivo: {
      fontWeight: "600",
      color: theme.colors.textPrimary,
    },
    cardBody: {
      marginBottom: 8,
    },
    bodyText: {
      color: theme.colors.textPrimary,
    },
    bold: {
      fontWeight: "600",
    },

    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.surface,
    },
    badgeConfirmado: {
      borderColor: theme.colors.success,
    },
    badgeCancelado: {
      borderColor: theme.colors.error,
    },
    badgePendiente: {
      borderColor: theme.colors.warning,
    },

    errorBox: {
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.error,
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
    },
    successBox: {
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.success,
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
    },
    messageText: {
      color: theme.colors.textPrimary,
    },

    buttonContainer: {
      marginTop: 12,
      marginBottom: 20,
      alignItems: "center",
    },
  });
