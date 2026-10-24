import { useDashboard } from "@/hooks/useDashBoard";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { SecondaryButton, SecondaryButtonLabel } from "../style/ui/Buttons";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
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
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
    {
      name: "Ausente",
      population: stats.ausentes,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Gráfico de Torta</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
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
  },
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 15,
  },
  statText: {
    fontSize: 15,
    marginBottom: 5,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 8,
  },
  centerText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 40,
  },
});
