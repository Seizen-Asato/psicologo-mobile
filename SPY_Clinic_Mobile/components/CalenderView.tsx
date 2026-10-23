import { AgendaDto } from "@/models/AgendaDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import type { CalendarEvent } from "../utils/CalendarEvents";
import { toCalendarEvents } from "../utils/CalendarEvents";
import {
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";
import TurnoFiltradoForm from "./TurnoFiltradoForm";

const CalendarView: React.FC<
  FiltroTurnosProps & {
    events: AgendaDto[];
    onSelectAgenda: (agenda: AgendaDto) => void;
  }
> = ({ events, getByDate, reload, onSelectAgenda }) => {
  const [mode, setMode] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState<AgendaDto[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleFilter = async (filters: { date?: string; titulo?: string }) => {
    try {
      if (filters.titulo?.trim()) {
        const agendaEncontrada = events.find((agenda) =>
          agenda.titulo
            ?.toLowerCase()
            .includes(filters.titulo!.toLowerCase()),
        );

        if (agendaEncontrada) {
          setError(null);
          setFilteredEvents([agendaEncontrada]);
          return;
        }

        setError("No se encontró la agenda");
        setFilteredEvents([]);
        return;
      }

      if (filters.date) {
        const result = await getByDate(filters.date);
        setFilteredEvents(result);
        setError(null);
        return;
      }

      reload();
      setFilteredEvents(null);
      setError(null);
    } catch (err: any) {
      setError(err.message ?? "Error al filtrar");
    }
  };

  const handleReset = () => {
    reload();
    setFilteredEvents(null);
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
        events={toCalendarEvents(filteredEvents ?? events)}
        height={600}
        mode={mode}
        date={currentDate}
        onPressEvent={(event: CalendarEvent) =>
          onSelectAgenda(event.resource)
        }
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
