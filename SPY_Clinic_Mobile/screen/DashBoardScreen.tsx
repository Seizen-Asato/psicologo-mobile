import { useDashboard } from "@/hooks/useDashBoard";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { makeFeedbackStyles } from "../style/ui/Feedback";

/** "#a1b2c3" + alpha -> "rgba(161, 178, 195, 0.5)" */
const withAlpha = (hex: string, opacity: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function DashboardScreen() {
  const today = new Date();
  const [anio] = useState(today.getFullYear());
  const [mes] = useState(today.getMonth() + 1);

  const { stats, loading, error } = useDashboard(anio, mes);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const feedback = makeFeedbackStyles(theme, "error");
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - 40, 240);

  if (loading)
    return (
      <View style={styles.feedback}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
        <Text style={styles.feedbackText}>Cargando estadísticas...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.feedback}>
        <View style={feedback.panel}>
          <Text style={feedback.text}>{error}</Text>
        </View>
      </View>
    );

  if (!stats)
    return (
      <View style={styles.feedback}>
        <Text style={styles.feedbackText}>No hay datos disponibles</Text>
      </View>
    );

  const barData = {
    labels: ["Presentes", "Ausentes"],
    datasets: [{ data: [stats.presentes, stats.ausentes] }],
  };

  const pieData = [
    {
      name: "Asistió",
      population: stats.presentes,
      color: theme.colors.success,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 13,
    },
    {
      name: "Ausente",
      population: stats.ausentes,
      color: theme.colors.error,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 13,
    },
  ];

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => withAlpha(theme.colors.actionPrimary, opacity),
    labelColor: (opacity = 1) => withAlpha(theme.colors.textSecondary, opacity),
    decimalPlaces: 0,
    propsForBackgroundLines: { stroke: theme.colors.border },
    propsForLabels: { fill: theme.colors.textSecondary },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencias {mes}/{anio}</Text>

      <View style={styles.card}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total de turnos</Text>
          <Text style={styles.statValue}>{stats.totalTurnos}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Porcentaje de asistencia</Text>
          <Text style={styles.statValue}>{stats.porcentajeAsistencia}%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Presentes</Text>
          <Text style={styles.statValue}>{stats.presentes}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Ausentes</Text>
          <Text style={styles.statValue}>{stats.ausentes}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Comparativa</Text>
      <BarChart
        data={barData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
      />

      <Text style={styles.sectionTitle}>Distribución</Text>
      <PieChart
        data={pieData}
        width={chartWidth}
        height={220}
        chartConfig={{ color: (opacity = 1) => withAlpha(theme.colors.actionPrimary, opacity) }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.textPrimary,
      marginTop: 8,
      marginBottom: 4,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.small,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
    },
    statRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    statValue: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.textPrimary,
    },
    chart: {
      marginVertical: 12,
      borderRadius: theme.radius.small,
    },
    feedback: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    feedbackText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });
