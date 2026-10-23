import { AgendaDto } from "@/models/AgendaDto";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

import { useRouter } from "expo-router";

import AgendaForm from "../components/AgendaForm";
import CalendarView from "../components/CalenderView";
import { useAgenda } from "../hooks/useAgenda";

const AgendaScreen = () => {
  const router = useRouter();
  const { agenda, isLoading, error, createAgenda, getAgendaByDate, reload } =
    useAgenda();
  const theme = useTheme();
  const styles = makeStyles(theme);

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
        <Text style={styles.errorText}>Error al cargar agendas</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Psicólogos</Text>
      <AgendaForm onCreate={handleCreateAgenda} />

      <CalendarView
        events={agenda}
        getByDate={getAgendaByDate}
        reload={reload}
        onSelectAgenda={(agendaData) => {
          router.push({
            pathname: "/AgendaFormEdicion",
            params: { agenda: JSON.stringify(agendaData) },
          });
        }}
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
    errorText: { marginTop: 10, fontSize: 16, color: theme.colors.error },
  });
