import React, { useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import CalendarFilter from "../components/CalenderFilter";

interface CalendarViewProps {
  events: { id: number; title: string; start: Date; end: Date }[];
  getByDate: (date: string) => Promise<any>;
  getByPatient: (id: string) => Promise<any>;
  reload: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  getByDate,
  getByPatient,
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
  }: {
    date?: string;
    patientId?: string;
  }) => {
    if (date) {
      const response = await getByDate(date);
      setFilteredEvents(response);
    } else if (patientId) {
      const response = await getByPatient(patientId);
      setFilteredEvents(response);
    } else {
      reload();
      setFilteredEvents(events);
    }
  };

  const handleReset = () => {
    reload();
    setFilteredEvents(events);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CalendarFilter onFilter={handleFilter} onReset={handleReset} />

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
