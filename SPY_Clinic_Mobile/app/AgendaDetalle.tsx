import AgendaDetalleComponent from "@/components/AgendaDetalle";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useAgenda } from "../hooks/useAgenda";

export default function AgendaDetalleScreen() {
  const theme: DefaultTheme = useTheme();
  const styles = makeStyles(theme);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { removeAgenda } = useAgenda();

  const agenda = params.agenda ? JSON.parse(params.agenda as string) : null;

  if (!agenda)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontró la agenda</Text>
      </View>
    );

  return (
    <AgendaDetalleComponent
      agenda={agenda}
      onEdit={() =>
        router.push({
          pathname: "/AgendaFormEdicion",
          params: { agendaId: agenda.agendaId },
        })
      }
      onDelete={async () => {
        await removeAgenda.mutateAsync(agenda.agendaId);
        router.back();
      }}
    />
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    errorText: { color: theme.colors.textSecondary, fontSize: 16 },
  });
