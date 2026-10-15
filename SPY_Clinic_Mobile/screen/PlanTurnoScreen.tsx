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
  fecha: string;
  observaciones?: string;
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
    fecha: string;
    observaciones: string;
  }>({
    paciente: null,
    fecha: "",
    observaciones: "",
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
      fecha: form.fecha ? new Date(form.fecha).toISOString() : null,
      observaciones: form.observaciones,
    };

    const result = await createPlan(payload);

    if (result.success) {
      setSuccessMsg("¡Plan Turno creado con éxito!");
      setForm({ paciente: null, fecha: "", observaciones: "" });
    } else {
      setFormError(result.error);
    }
  };

  const renderTurno = ({ item }: { item: any }) => {
    const turnoId = item.id || item._id;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardId}>ID: {turnoId}</Text>
          <Text style={[styles.badge, getEstadoBadgeStyle(item.estado)]}>
            {item.estado || "Pendiente"}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Paciente ID:</Text>{" "}
            {item.pacienteId || "N/A"}
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Fecha:</Text>{" "}
            {item.fecha
              ? new Date(item.fecha).toLocaleString()
              : "No especificada"}
          </Text>
          {item.observaciones && (
            <Text style={styles.bodyText}>
              <Text style={styles.bold}>Obs:</Text> {item.observaciones}
            </Text>
          )}
        </View>
        <DangerButton
          onPress={() => deletePlan(turnoId)}
          accessibilityRole="button"
          accessibilityLabel="Eliminar turno"
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    );
  };

  const getEstadoBadgeStyle = (estado: string) => {
    if (estado === "Confirmado") return styles.badgeConfirmado;
    if (estado === "Cancelado") return styles.badgeCancelado;
    return styles.badgePendiente;
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.form}>
        <Text style={styles.label}>Paciente</Text>
        <Picker
          selectedValue={form.paciente?.Id || ""}
          onValueChange={(value) =>
            setForm({
              ...form,
              paciente: pacientes.find((p) => p.Id === Number(value)) ?? null,
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

        <Text style={styles.label}>Fecha y Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DDTHH:mm"
          value={form.fecha}
          onChangeText={(text) => setForm({ ...form, fecha: text })}
        />

        <Text style={styles.label}>Observaciones</Text>
        <TextInput
          style={styles.input}
          placeholder="Detalles adicionales..."
          value={form.observaciones}
          onChangeText={(text) => setForm({ ...form, observaciones: text })}
        />

        <PrimaryButton
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="Crear turno"
        >
          <PrimaryButtonLabel>Crear Turno</PrimaryButtonLabel>
        </PrimaryButton>
      </View>

      <Text style={styles.sectionTitle}>Turnos Registrados</Text>

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      )}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.messageText}>Error: {error}</Text>
        </View>
      )}
      {!loading && planes.length === 0 && (
        <Text style={styles.bodyText}>No hay turnos registrados todavía.</Text>
      )}

      <FlatList
        data={planes}
        keyExtractor={(item) => String(item.id || item._id)}
        renderItem={renderTurno}
      />
    </View>
  );
}

// design-system.md §1.4: estado/error solo como borde + texto primario,
// nunca texto pequeño en lima/ámbar/rojo sobre superficie.
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
    form: { marginBottom: 20 },
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
    cardId: { fontWeight: "600", color: theme.colors.textPrimary },
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
    badgeConfirmado: { borderColor: theme.colors.success },
    badgeCancelado: { borderColor: theme.colors.error },
    badgePendiente: { borderColor: theme.colors.warning },
    cardBody: { marginBottom: 8 },
    bodyText: { color: theme.colors.textPrimary },
    bold: { fontWeight: "600" },
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
    messageText: { color: theme.colors.textPrimary },
  });
