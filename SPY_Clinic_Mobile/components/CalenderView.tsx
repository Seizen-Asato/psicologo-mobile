import React, { useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-big-calendar";

interface CalendarViewProps {
  events: { id: number; title: string; start: Date; end: Date }[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [mode, setMode] = useState<"month" | "week" | "day">("week");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
        events={events}
        height={600}
        mode={mode}
        onPressEvent={(event) => console.log("Evento seleccionado:", event)}
      />
    </View>
  );
};

export default CalendarView;
