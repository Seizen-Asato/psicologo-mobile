import PsicologoCard from "@/components/PsicologoCard";
import PsicologoForm from "@/components/PsicologoForm";
import { usePsicologo } from "@/hooks/usePsicologo";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { makeFeedbackStyles } from "../style/ui/Feedback";

export default function PsicologoScreen() {
  const { psicologos, loading, error } = usePsicologo();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const feedback = makeFeedbackStyles(theme, "error");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Psicólogos</Text>

      <PsicologoForm />

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      )}
      {error && (
        <View style={feedback.panel}>
          <Text style={feedback.text}>Error: {String(error)}</Text>
        </View>
      )}

      <FlatList
        data={psicologos}
        keyExtractor={(item) => String(item.psicologoId)}
        renderItem={({ item }) => <PsicologoCard psicologo={item} />}
      />
    </View>
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
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: theme.colors.textPrimary,
    },
  });
