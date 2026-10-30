import { usePlanTurno } from "@/hooks/usePlanTurno";
import {
  type CreatePlanTurnoPayload,
  type PlanTurno,
} from "@/models/PlanTurnoDto";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
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

const isDateLike = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

const pad2 = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DDTHH:mm" a partir de un Date (lo que espera el formulario). */
function fechaAForma(date: Date) {
  return (
    `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}` +
    ` ${pad2(date.getHours())}:${pad2(date.getMinutes())}`
  );
}

/** Parsea el valor del form ("YYYY-MM-DDTHH:mm") a Date. */
function formaADate(valor: string) {
  if (!isDateLike.test(valor)) return new Date();
  return new Date(valor);
}

export default function PlanTurnoScreen() {
  const { planes, loading, error, createPlan, deletePlan } = usePlanTurno();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [form, setForm] = useState<{
    fechaInicio: string;
    fechaFin: string;
    cantidadTurno: string;
  }>({
    fechaInicio: "",
    fechaFin: "",
    cantidadTurno: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [pickerCampo, setPickerCampo] = useState<
    "fechaInicio" | "fechaFin" | null
  >(null);
  const [pickerModo, setPickerModo] = useState<"date" | "time">("date");
  const [tempDate, setTempDate] = useState(new Date());

  const handleSubmit = async () => {
    setFormError(null);
    setSuccessMsg(null);

    if (!form.fechaInicio || !form.fechaFin) {
      setFormError("Las fechas de inicio y fin son obligatorias.");
      return;
    }

    if (!form.cantidadTurno || Number(form.cantidadTurno) < 1) {
      setFormError(
        "La cantidad de turnos es obligatoria y debe ser mayor a 0.",
      );
      return;
    }

    const fechaInicio = new Date(form.fechaInicio);
    const fechaFin = new Date(form.fechaFin);

    if (
      Number.isNaN(fechaInicio.getTime()) ||
      Number.isNaN(fechaFin.getTime())
    ) {
      setFormError("Las fechas ingresadas no son válidas.");
      return;
    }

    if (fechaFin <= fechaInicio) {
      setFormError(
        "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio.",
      );
      return;
    }

    const payload: CreatePlanTurnoPayload = {
      fechaInicio: form.fechaInicio.slice(0, 10),
      fechaFin: form.fechaFin.slice(0, 10),
      cantidadTurno: Number(form.cantidadTurno),
    };

    const result = await createPlan(payload);

    if (result.success) {
      setSuccessMsg("¡Plan de turno creado con éxito!");
      setForm({
        fechaInicio: "",
        fechaFin: "",
        cantidadTurno: "",
      });
    } else {
      setFormError(result.error || "Error al crear el plan de turno.");
    }
  };

  const abrirSelector = (campo: "fechaInicio" | "fechaFin") => {
    setPickerCampo(campo);
    setPickerModo("date");
    setTempDate(formaADate(form[campo]));
  };

  const confirmarSelector = (event: DateTimePickerEvent, date?: Date) => {
    const campo = pickerCampo;
    setPickerCampo(null);

    if (event.type === "dismissed" || !date || !campo) return;

    if (pickerModo === "date") {
      setTempDate(date);
      setPickerModo("time");
      setPickerCampo(campo);
      return;
    }

    // Modo "time": combino la fecha elegida con la hora elegida.
    const base = tempDate;
    const fechaCompleta = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      date.getHours(),
      date.getMinutes(),
    );

    setForm((prev) => ({
      ...prev,
      [campo]: fechaCompleta.toISOString(),
    }));
  };

  const handleDelete = async (id: number | string | undefined) => {
    if (id == null) return;

    const result = await deletePlan(String(id));

    if (!result.success) {
      setFormError(result.error || "No se pudo eliminar el plan.");
      return;
    }

    setSuccessMsg("Plan de turno eliminado correctamente.");
    setFormError(null);
  };

  const renderTurno = ({ item, index }: { item: PlanTurno; index: number }) => {
    const pTId =
      item.planTurnoId ??
      (item as unknown as { id?: number }).id ??
      (item as unknown as { _id?: string })._id;

    const finalizado = item.fechaFin && new Date(item.fechaFin) < new Date();

    console.log("PLAN", JSON.stringify(item, null, 2));
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardActivo}>Plan #{pTId ?? "N/A"}</Text>

          <View
            style={[
              styles.badge,
              finalizado ? styles.badgeCancelado : styles.badgePendiente,
            ]}
          >
            <Text style={styles.badgeText}>
              {finalizado ? "Finalizado" : "Pendiente"}
            </Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Cantidad de turnos:</Text>{" "}
            {item.cantidadTurno ?? "N/A"}
          </Text>

          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Fecha de inicio:</Text>{" "}
            {item.fechaInicio
              ? new Date(item.fechaInicio).toLocaleString()
              : "No especificada"}
          </Text>

          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Fecha de fin:</Text>{" "}
            {item.fechaFin
              ? new Date(item.fechaFin).toLocaleString()
              : "No especificada"}
          </Text>
        </View>

        <DangerButton
          onPress={() => handleDelete(pTId)}
          disabled={pTId == null}
          accessibilityRole="button"
          accessibilityLabel="Eliminar plan de turno"
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    );
  };

  return (
    <>
      <FlatList
        style={styles.container}
        data={planes}
        keyExtractor={(item, index) =>
          String(
            item.planTurnoId ??
              (item as unknown as { id?: number }).id ??
              (item as unknown as { _id?: string })._id ??
              index,
          )
        }
        renderItem={renderTurno}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Gestión de Planes de Turnos</Text>
            <Text style={styles.subtitle}>
              Crea nuevos planes de turnos y visualiza los registrados.
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
              <Text style={styles.label}>Fecha y hora de inicio (desde)</Text>
              <Pressable
                style={styles.input}
                onPress={() => abrirSelector("fechaInicio")}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar fecha y hora de inicio"
              >
                <Text
                  style={[
                    styles.pickerText,
                    !form.fechaInicio && styles.pickerPlaceholder,
                  ]}
                >
                  {form.fechaInicio
                    ? fechaAForma(formaADate(form.fechaInicio))
                    : "Seleccionar..."}
                </Text>
              </Pressable>

              <Text style={styles.label}>Fecha y hora de fin (hasta)</Text>
              <Pressable
                style={styles.input}
                onPress={() => abrirSelector("fechaFin")}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar fecha y hora de fin"
              >
                <Text
                  style={[
                    styles.pickerText,
                    !form.fechaFin && styles.pickerPlaceholder,
                  ]}
                >
                  {form.fechaFin
                    ? fechaAForma(formaADate(form.fechaFin))
                    : "Seleccionar..."}
                </Text>
              </Pressable>

              <Text style={styles.label}>Cantidad de turnos</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                placeholderTextColor={theme.colors.textDisabled}
                keyboardType="numeric"
                value={form.cantidadTurno}
                onChangeText={(text) =>
                  setForm({ ...form, cantidadTurno: text })
                }
              />

              <PrimaryButton
                onPress={handleSubmit}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Crear plan de turno"
              >
                <PrimaryButtonLabel>Crear Plan</PrimaryButtonLabel>
              </PrimaryButton>
            </View>

            <Text style={styles.sectionTitle}>
              {" "}
              Planes de Turnos Registrados
            </Text>

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
                No hay ningún plan de turnos registrado todavía.
              </Text>
            )}
          </View>
        }
      />
      {pickerCampo && (
        <DateTimePicker
          value={tempDate}
          mode={pickerModo}
          is24Hour
          display="default"
          onChange={confirmarSelector}
        />
      )}
    </>
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

    pickerText: {
      color: theme.colors.textPrimary,
    },
    pickerPlaceholder: {
      color: theme.colors.borderInput,
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
      marginBottom: 4,
    },
    bold: {
      fontWeight: "600",
    },

    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      fontSize: 12,
      fontWeight: "600",
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.textPrimary,
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
