import { EventoDto } from "@/models/EventoDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";
import TurnoFiltradoForm from "./TurnoFiltradoForm";

const CalendarView: React.FC<
  FiltroTurnosProps & {
    events: EventoDto[];
    onSelectAgenda: (agenda: any) => void;
  }
> = ({ events, getByDate, reload, onSelectAgenda }) => {
  const [mode, setMode] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState<EventoDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleFilter = async (filters: { date?: string; titulo?: string }) => {
    try {
      if (filters.titulo?.trim()) {
        const agendaEncontrada = events.find((agenda) =>
          agenda.title?.toLowerCase().includes(filters.titulo!.toLowerCase()),
        );

        if (agendaEncontrada) {
          setError(null);
          setFilteredEvents([agendaEncontrada]);
          return;
        }

        setError("No se encontró la agenda");
        return;
      }

      if (filters.date) {
        const result = await getByDate(filters.date);
        setFilteredEvents(result);
        setError(null);
        return;
      }

      reload();
      setFilteredEvents([]);
      setError(null);
    } catch (err: any) {
      setError(err.message ?? "Error al filtrar");
    }
  };

  const handleReset = () => {
    reload();
    setFilteredEvents([]);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <TurnoFiltradoForm onFilter={handleFilter} onReset={handleReset} />

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.modeRow}>
        {(
          [
            { key: "month", label: "Mes" },
            { key: "week", label: "Semana" },
            { key: "day", label: "Día" },
          ] as const
        ).map((item) =>
          mode === item.key ? (
            <PrimaryButton
              key={item.key}
              style={styles.modeButton}
              onPress={() => setMode(item.key)}
              accessibilityRole="button"
              accessibilityLabel={`Vista ${item.label}`}
              accessibilityState={{ selected: true }}
            >
              <PrimaryButtonLabel>{item.label}</PrimaryButtonLabel>
            </PrimaryButton>
          ) : (
            <SecondaryButton
              key={item.key}
              style={styles.modeButton}
              onPress={() => setMode(item.key)}
              accessibilityRole="button"
              accessibilityLabel={`Vista ${item.label}`}
              accessibilityState={{ selected: false }}
            >
              <SecondaryButtonLabel>{item.label}</SecondaryButtonLabel>
            </SecondaryButton>
          ),
        )}
      </View>

      <Calendar
        events={filteredEvents.length ? filteredEvents : events}
        height={600}
        mode={mode}
        date={currentDate}
        onPressEvent={(event: any) => onSelectAgenda(event.resource)}
      />
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    error: { color: theme.colors.error, marginBottom: 8 },
    modeRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    modeButton: { flex: 1, marginHorizontal: 4 },
  });

export default CalendarView;
