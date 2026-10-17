import { useDashboard } from "@/hooks/useDashBoard";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const today = new Date();
  const [anio, setAnio] = useState(today.getFullYear());
  const [mes, setMes] = useState(today.getMonth() + 1);

  const { stats, loading, error } = useDashboard(anio, mes);

  if (loading) return <Text>Cargando estadísticas...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!stats) return <Text>No hay datos disponibles</Text>;

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
      legendFontSize: 15,
    },
    {
      name: "Ausente",
      population: stats.ausentes,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        📊 Dashboard de Asistencias {mes}/{anio}
      </Text>

      <Text>Total de turnos: {stats.totalTurnos}</Text>
      <Text>Porcentaje de asistencia: {stats.porcentajeAsistencia}%</Text>
      <BarChart
        {...({
          data: barData,
          width: screenWidth - 40,
          height: 220,
          chartConfig: {
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          },
          style: { marginVertical: 20 },
        } as any)}
      />
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
    </View>
  );
}
