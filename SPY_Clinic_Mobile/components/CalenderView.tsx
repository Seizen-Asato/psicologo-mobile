import { AgendaDto } from "@/models/AgendaDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { LightColors } from "../style/layout/Colorors";
import { useColorMode } from "../context/Theme";
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

  // useColorMode es la única fuente de verdad del modo (preferencia guardada o sistema).
  const { isDark } = useColorMode();

  // Tema del Calendar de react-native-big-calendar a partir de los tokens del app.
  // gray.200 dibuja las líneas de la grilla; gray.800 los textos de día/hora.
  // En light los bordes usan grises reales (tokens light) para que la grilla
  // se note sobre el fondo; en dark se usa la paleta oscura.
  const calendarTheme = {
    palette: {
      primary: {
        main: theme.colors.actionPrimary,
        contrastText: theme.colors.onAction,
      },
      nowIndicator: theme.colors.actionSecondary,
      gray: isDark
        ? {
            100: theme.colors.surface,
            200: theme.colors.border,
            300: theme.colors.border,
            500: theme.colors.textSecondary,
            800: theme.colors.textPrimary,
          }
        : {
            100: LightColors.border,
            200: LightColors.borderInput,
            300: LightColors.borderInput,
            500: LightColors.textDisabled,
            800: LightColors.textPrimary,
          },
      moreLabel: theme.colors.textPrimary,
    },
  };

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
        onPressEvent={(event: EventoDto) =>
          console.log("Evento seleccionado:", event)
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
