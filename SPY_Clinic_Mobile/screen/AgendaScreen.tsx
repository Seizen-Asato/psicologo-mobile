import { AgendaDto } from "@/models/AgendaDto";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import AgendaForm from "../components/AgendaForm";
import CalendarView from "../components/CalenderView";
import { useAgenda } from "../hooks/useAgenda";
import { makeFeedbackStyles } from "../style/ui/Feedback";

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
  const theme = useTheme();
  const styles = makeStyles(theme);
  const feedback = makeFeedbackStyles(theme, "error");

  const handleCreateAgenda = async (newAgenda: AgendaDto) => {
    await createAgenda.mutateAsync(newAgenda);
  };

  if (isLoading)
    return (
      <View style={styles.feedback}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
        <Text style={styles.feedbackText}>Cargando agendas...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.feedback}>
        <View style={feedback.panel}>
          <Text style={feedback.text}>Error al cargar agendas</Text>
        </View>
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

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme.colors.textPrimary,
      textAlign: "center",
    },
    feedback: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    feedbackText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });
