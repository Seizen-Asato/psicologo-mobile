import React, { useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import TurnoFiltradoForm from "../components/TurnoFiltradoForm";

interface CalendarViewProps {
  events: { id: number; title: string; start: Date; end: Date }[];
  getByDate: (date: string) => Promise<any>;
  getByPatient: (id: string) => Promise<any>;
  getByTurno?: (id: string) => Promise<any>;
  getByTurnoPaciente?: (id: string) => Promise<any>;
  getByTurnoPacienteId?: (id: string) => Promise<any>;
  reload: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
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
  const [filteredEvents, setFilteredEvents] = useState(events);

  const goToToday = () => setCurrentDate(new Date());
  const goToNextDay = () =>
    setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
  const goToPrevDay = () =>
    setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));

  const handleFilter = async ({
    date,
    patientId,
    turnoId,
    turnoPaciente,
    turnoPacienteId,
  }: {
    date?: string;
    patientId?: string;
    turnoId?: string;
    turnoPaciente?: string;
    turnoPacienteId?: string;
  }) => {
    let response;

    if (date) {
      response = await getByDate(date);
    } else if (patientId) {
      response = await getByPatient(patientId);
    } else if (turnoId && getByTurno) {
      response = await getByTurno(turnoId);
    } else if (turnoPaciente && getByTurnoPaciente) {
      response = await getByTurnoPaciente(turnoPaciente);
    } else if (turnoPacienteId && getByTurnoPacienteId) {
      response = await getByTurnoPacienteId(turnoPacienteId);
    } else {
      reload();
      response = events;
    }

    setFilteredEvents(response);
  };

  const handleReset = () => {
    reload();
    setFilteredEvents(events);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TurnoFiltradoForm onFilter={handleFilter} onReset={handleReset} />

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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        <Button title="Anterior" onPress={goToPrevDay} />
        <Button title="Hoy" onPress={goToToday} />
        <Button title="Siguiente" onPress={goToNextDay} />
      </View>

      {/* Calendario */}
      <Calendar
        events={filteredEvents}
        height={600}
        mode={mode}
        date={currentDate}
        onPressEvent={(event) => console.log("Evento seleccionado:", event)}
      />
    </View>
  );
};

export default CalendarView;
