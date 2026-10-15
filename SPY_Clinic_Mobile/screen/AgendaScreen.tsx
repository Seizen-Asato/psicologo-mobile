import { AgendaDto } from "@/models/AgendaDto";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AgendaForm from "../components/AgendaForm";
import CalendarView from "../components/CalenderView";
import { useAgenda } from "../hooks/useAgenda";

const AgendaScreen = () => {
  const {
    agenda,
    isLoading,
    error,
    createAgenda,
    getAgendaByDate,
    getAgendaByPatient,
    reload,
  } = useAgenda();

  const handleCreateAgenda = async (newAgenda: AgendaDto) => {
    await createAgenda.mutateAsync(newAgenda);
  };

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
      <CalendarView
        events={agenda}
        getByDate={getAgendaByDate}
        getByPatient={getAgendaByPatient}
        reload={reload}
      />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  feedback: { flex: 1, justifyContent: "center", alignItems: "center" },
  feedbackText: { marginTop: 10, fontSize: 16, color: "#555" },
});
