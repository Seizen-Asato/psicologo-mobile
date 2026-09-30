import { useFiltroTurnos } from "@/hooks/useTurnoFilter";
import { EventoDto } from "@/models/EventoDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import TurnoFiltradoForm from "../components/TurnoFiltradoForm";

const CalendarView: React.FC<FiltroTurnosProps & { events: EventoDto[] }> = ({
  events,
  getByDate,
  getByPatient,
  getByTurno,
  getByTurnoPaciente,
  getByTurnoPacienteId,
  reload,
}) => {
  const [mode, setMode] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const { filteredEvents, filterTurnos, resetTurnos, error } = useFiltroTurnos({
    getByDate,
    getByPatient,
    getByTurno,
    getByTurnoPaciente,
    getByTurnoPacienteId,
    reload,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TurnoFiltradoForm onFilter={filterTurnos} onReset={resetTurnos} />

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
