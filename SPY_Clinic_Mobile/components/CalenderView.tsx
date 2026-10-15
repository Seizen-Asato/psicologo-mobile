import { EventoDto } from "@/models/EventoDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import TurnoFiltradoForm from "./TurnoFiltradoForm";

const CalendarView: React.FC<FiltroTurnosProps & { events: EventoDto[] }> = ({
  events,
  getByDate,
  getByPatient,
  reload,
}) => {
  const [mode, setMode] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState<EventoDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async (filters: {
    date?: string;
    pacienteApellido?: string;
    pacienteNombre?: string;
  }) => {
    try {
      let result: EventoDto[] = [];

      if (filters.date) {
        result = await getByDate(filters.date);
      } else if (filters.pacienteApellido || filters.pacienteNombre) {
        result = await getByPatient(
          filters.pacienteApellido ?? filters.pacienteNombre ?? "",
        );
      } else {
        reload();
        result = [];
      }

      setFilteredEvents(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al filtrar turnos");
    }
  };

  const handleReset = () => {
    reload();
    setFilteredEvents([]);
    setError(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TurnoFiltradoForm onFilter={handleFilter} onReset={handleReset} />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        <Button title="Mes" onPress={() => setMode("month")} />
        <Button title="Semana" onPress={() => setMode("week")} />
        <Button title="Día" onPress={() => setMode("day")} />
      </View>

      <Calendar
        events={filteredEvents.length ? filteredEvents : events}
        height={600}
        mode={mode}
        date={currentDate}
        onPressEvent={(event) => console.log("Evento seleccionado:", event)}
      />
    </View>
  );
};

export default CalendarView;
