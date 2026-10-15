import { usePlanTurno } from "@/hooks/usePlanTurno";
import { PacienteDto } from "@/models/PacienteDto";
import { PsicologoDto } from "@/models/PsicolgoDto";
import * as pacientesService from "@/services/PacienteService";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export interface PlanTurnoDto {
  planTurnoId?: number;
  fecha: string;
  observaciones?: string;
  paciente: PacienteDto;
  psicologo: PsicologoDto;
}

export default function PlanTurnoScreen() {
  const { planes, loading, error, createPlan, deletePlan } = usePlanTurno();
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
          <Text>
            <Text style={styles.bold}>Paciente ID:</Text>{" "}
            {item.pacienteId || "N/A"}
          </Text>
          <Text>
            <Text style={styles.bold}>Fecha:</Text>{" "}
            {item.fecha
              ? new Date(item.fecha).toLocaleString()
              : "No especificada"}
          </Text>
          {item.observaciones && (
            <Text>
              <Text style={styles.bold}>Obs:</Text> {item.observaciones}
            </Text>
          )}
        </View>
        <Button
          title="Eliminar"
          color="red"
          onPress={() => deletePlan(turnoId)}
        />
      </View>
    );
  };

  const getEstadoBadgeStyle = (estado: string) => {
    if (estado === "Confirmado") return styles.badgeConfirmado;
    if (estado === "Cancelado") return styles.badgeCancelado;
    return styles.badgePendiente;
  };

  return (
    <FlatList
      style={styles.container}
      data={planes}
      keyExtractor={(item) => String(item.id || item._id)}
      renderItem={renderTurno}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Gestión de Plan Turnos</Text>
          <Text style={styles.subtitle}>
            Crea nuevos turnos y visualiza el listado en tiempo real.
          </Text>

          {formError && <Text style={styles.error}>{formError}</Text>}
          {successMsg && <Text style={styles.success}>{successMsg}</Text>}

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

            <View style={styles.buttonContainer}>
              <Button title="Crear Turno" onPress={handleSubmit} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Turnos Registrados</Text>

          {loading && <ActivityIndicator size="large" color="#000" />}
          {error && <Text style={styles.error}>Error: {error}</Text>}
          {!loading && planes.length === 0 && (
            <Text>No hay turnos registrados todavía.</Text>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 16 },
  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  buttonContainer: { marginTop: 12, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardId: { fontWeight: "600" },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#fff",
  },
  badgeConfirmado: { backgroundColor: "green" },
  badgeCancelado: { backgroundColor: "red" },
  badgePendiente: { backgroundColor: "orange" },
  cardBody: { marginBottom: 8 },
  bold: { fontWeight: "600" },
  error: { color: "red", marginBottom: 8 },
  success: { color: "green", marginBottom: 8 },
});
