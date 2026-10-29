import { useDashboard } from "@/hooks/useDashBoard";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { SecondaryButton, SecondaryButtonLabel } from "../style/ui/Buttons";

const screenWidth = Dimensions.get("window").width;

/** Convierte un hex de _layout/Colorors a rgba para react-native-chart-kit. */
const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function DashboardScreen() {
  const theme: DefaultTheme = useTheme();
  const styles = makeStyles(theme);
  const today = new Date();
  const [anio, setAnio] = useState(today.getFullYear());
  const [mes, setMes] = useState(today.getMonth() + 1);

  const { stats, loading, error, refetch } = useDashboard(anio, mes);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handlePrevMonth = () => {
    if (mes === 1) {
      setMes(12);
      setAnio(anio - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const handleNextMonth = () => {
    if (mes === 12) {
      setMes(1);
      setAnio(anio + 1);
    } else {
      setMes(mes + 1);
    }
  };

  if (loading)
    return <Text style={styles.centerText}>Cargando estadísticas...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!stats)
    return <Text style={styles.centerText}>No hay datos disponibles</Text>;

  const barData = {
    labels: ["Presentes", "Ausentes"],
    datasets: [{ data: [stats.presentes, stats.ausentes] }],
  };

  const pieData = [
    {
      name: "Asistió",
      population: stats.presentes,
      color: theme.colors.success,
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 13,
    },
    {
      name: "Ausente",
      population: stats.ausentes,
      color: theme.colors.error,
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 13,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: theme.colors.background }}
    >
      <Text style={styles.heading}>📊 Dashboard de Asistencias</Text>

      <View style={styles.navContainer}>
        <SecondaryButton style={styles.navButton} onPress={handlePrevMonth}>
          <SecondaryButtonLabel>◀ Anterior</SecondaryButtonLabel>
        </SecondaryButton>

        <Text style={styles.headerTitle}>
          {mes} / {anio}
        </Text>

        <SecondaryButton style={styles.navButton} onPress={handleNextMonth}>
          <SecondaryButtonLabel>Siguiente ▶</SecondaryButtonLabel>
        </SecondaryButton>
      </View>

      <View style={styles.card}>
        <Text style={styles.statText}>
          Total de turnos: {stats.totalTurnos}
        </Text>
        <Text style={styles.statText}>
          Porcentaje de asistencia: {stats.porcentajeAsistencia}%
        </Text>
      </View>

      <Text style={styles.chartTitle}>Gráfico de Barras</Text>
      <BarChart
        data={barData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) =>
            hexToRgba(theme.colors.actionPrimary, opacity),
          labelColor: (opacity = 1) =>
            hexToRgba(theme.colors.textPrimary, opacity),
          barPercentage: 0.8,
          propsForLabels: {
            fontSize: 12,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Gráfico de Torta</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) =>
            hexToRgba(theme.colors.textPrimary, opacity),
          labelColor: (opacity = 1) =>
            hexToRgba(theme.colors.textPrimary, opacity),
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </ScrollView>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.colors.textPrimary,
    },
    navContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 15,
    },
    navButton: {
      paddingHorizontal: 10,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
    },
    card: {
      width: "100%",
      padding: 15,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginBottom: 15,
    },
    statText: {
      fontSize: 15,
      marginBottom: 5,
      color: theme.colors.textPrimary,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 10,
      alignSelf: "flex-start",
      color: theme.colors.textPrimary,
    },
    chart: {
      marginVertical: 10,
      borderRadius: 8,
    },
    centerText: {
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.background,
      textAlign: "center",
      marginTop: 40,
      fontSize: 16,
      flex: 1,
    },
    errorText: {
      color: theme.colors.error,
      backgroundColor: theme.colors.background,
      textAlign: "center",
      marginTop: 40,
      flex: 1,
    },
  });
