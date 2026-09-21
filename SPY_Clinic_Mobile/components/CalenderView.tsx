import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-big-calendar";

interface CalendarViewProps {
  events: { id: number; title: string; start: Date; end: Date }[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Calendar
        events={events}
        height={600}
        mode="week"
        onPressEvent={(event) => console.log("Evento seleccionado:", event)}
      />
    </View>
  );
};

export default CalendarView;
