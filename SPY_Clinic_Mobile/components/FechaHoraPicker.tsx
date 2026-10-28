import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

const pad2 = (n: number) => String(n).padStart(2, "0");

const FECHA_RE = /^\d{4}-\d{2}-\d{2}/;
const HORA_RE = /^(\d{1,2}):(\d{2})/;

/** "YYYY-MM-DD" (o ISO con hora) -> "dd/mm/yyyy". */
export function fechaAMostrar(valor: string) {
  const iso = (valor ?? "").slice(0, 10);
  if (!FECHA_RE.test(iso)) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** "HH:mm" o "HH:mm:ss" -> "HH:mm". */
export function horaAMostrar(valor: string) {
  const m = HORA_RE.exec(valor ?? "");
  if (!m) return "";
  return `${pad2(Number(m[1]))}:${m[2]}`;
}

/** "YYYY-MM-DD..." -> Date local (evita el desfase de zona al usar new Date(iso)). */
function fechaValorADate(valor: string) {
  const iso = (valor ?? "").slice(0, 10);
  if (!FECHA_RE.test(iso)) return new Date();
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "HH:mm[:ss]" -> Date local (la parte de fecha es irrelevante en modo "time"). */
function horaValorADate(valor: string) {
  const m = HORA_RE.exec(valor ?? "");
  if (!m) return new Date();
  return new Date(2000, 0, 1, Number(m[1]), Number(m[2]));
}

interface PickerFieldProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export interface FechaPickerProps extends PickerFieldProps {
  /** Valor del formulario: "YYYY-MM-DD" (tolera también "YYYY-MM-DDTHH:mm..."). */
  value: string;
  /** Devuelve la fecha elegida como "YYYY-MM-DD". */
  onChange: (fecha: string) => void;
}

/**
 * Campo de solo fecha con el patrón amigable de PlanTurno:
 * un Pressable con look de input que abre el DateTimePicker nativo (modo date).
 */
export function FechaPicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha...",
  style,
}: FechaPickerProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [abierto, setAbierto] = useState(false);

  // Toggle: en iOS el picker queda montado y se cierra volviendo a tocar el campo.
  const alternar = () => setAbierto((v) => !v);

  const confirmar = (event: DateTimePickerEvent, date?: Date) => {
    // En Android el diálogo nativo se cierra solo: desmonto el picker.
    if (Platform.OS === "android") setAbierto(false);

    if (event.type === "dismissed" || !date) return;

    onChange(
      `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
        date.getDate(),
      )}`,
    );
  };

  return (
    <>
      <Pressable
        style={[styles.input, style]}
        onPress={alternar}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
      >
        <Text style={[styles.pickerText, !value && styles.pickerPlaceholder]}>
          {value ? fechaAMostrar(value) : placeholder}
        </Text>
      </Pressable>

      {abierto && (
        <DateTimePicker
          value={fechaValorADate(value)}
          mode="date"
          display="default"
          onChange={confirmar}
        />
      )}
    </>
  );
}

export interface HoraPickerProps extends PickerFieldProps {
  /** Valor del formulario: "HH:mm" o "HH:mm:ss". */
  value: string;
  /** Devuelve la hora elegida como "HH:mm" (24 hs). */
  onChange: (hora: string) => void;
}

/**
 * Campo de solo hora con el patrón amigable de PlanTurno:
 * un Pressable con look de input que abre el DateTimePicker nativo (modo time).
 */
export function HoraPicker({
  value,
  onChange,
  placeholder = "Seleccionar hora...",
  style,
}: HoraPickerProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [abierto, setAbierto] = useState(false);

  const alternar = () => setAbierto((v) => !v);

  const confirmar = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") setAbierto(false);

    if (event.type === "dismissed" || !date) return;

    onChange(`${pad2(date.getHours())}:${pad2(date.getMinutes())}`);
  };

  return (
    <>
      <Pressable
        style={[styles.input, style]}
        onPress={alternar}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
      >
        <Text style={[styles.pickerText, !value && styles.pickerPlaceholder]}>
          {value ? horaAMostrar(value) : placeholder}
        </Text>
      </Pressable>

      {abierto && (
        <DateTimePicker
          value={horaValorADate(value)}
          mode="time"
          is24Hour
          display="default"
          onChange={confirmar}
        />
      )}
    </>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      minHeight: 44,
      padding: 12,
      marginBottom: 10,
      borderRadius: 6,
      justifyContent: "center",
    },
    pickerText: {
      color: theme.colors.textPrimary,
    },
    pickerPlaceholder: {
      color: theme.colors.borderInput,
    },
  });
