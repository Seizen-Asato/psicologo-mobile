import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AgendaForm from "../components/AgendaForm";
import CalenderView from "../components/CalenderView";
import { AgendaDto } from "../models/AgendaDto";
import {
  create,
  getAll,
  getByDate,
  getByPatient,
} from "../services/calendarService";

const AgendaScreen = () => {
  const queryClient = useQueryClient();

  const {
    data: agenda = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agenda"],
    queryFn: getAll,
  });

  const createAgendaMutation = useMutation({
    mutationFn: (agenda: AgendaDto) => create(agenda),
    onSuccess: (newAgenda) => {
      queryClient.setQueryData(["agenda"], (old: AgendaDto[] = []) => [
        ...old,
        newAgenda,
      ]);
    },
  });

  const handleCreateAgenda = async (agenda: AgendaDto) => {
    await createAgendaMutation.mutateAsync(agenda);
  };

  const mapAgendaToEvents = (items: AgendaDto[]) =>
    items.map((a) => ({
      id: a.agendaId,
      title: `${a.psicologoNombre} ${a.psicologoApellido}`,
      start: new Date(`${a.fecha}T${a.horaInicio}`),
      end: new Date(`${a.fecha}T${a.horaFin}`),
      descripcion: a.descripcion,
    }));

  const events = mapAgendaToEvents(agenda);

  const handleGetByDate = async (date: string) =>
    mapAgendaToEvents(await getByDate(date));

  const handleGetByPatient = async (patientId: string) =>
    mapAgendaToEvents(await getByPatient(patientId));

  if (isLoading)
    return (
      <View style={styles.feedback}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.feedbackText}>Cargando agendas...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.feedback}>
        <Text style={[styles.feedbackText, { color: "red" }]}>
          Error al cargar agendas
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Psicólogos</Text>

      <AgendaForm onCreate={handleCreateAgenda} />

      <CalenderView
        events={events}
        getByDate={handleGetByDate}
        getByPatient={handleGetByPatient}
        reload={() => {
          void queryClient.invalidateQueries({ queryKey: ["agenda"] });
        }}
      />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  feedback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
