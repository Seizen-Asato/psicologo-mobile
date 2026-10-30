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

export function fechaAMostrar(valor: string) {
  const iso = (valor ?? "").slice(0, 10);
  if (!FECHA_RE.test(iso)) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function horaAMostrar(valor: string) {
  const m = HORA_RE.exec(valor ?? "");
  if (!m) return "";
  return `${pad2(Number(m[1]))}:${m[2]}`;
}

function fechaValorADate(valor: string) {
  const iso = (valor ?? "").slice(0, 10);
  if (!FECHA_RE.test(iso)) return new Date();
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

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
  value: string;

  onChange: (fecha: string) => void;
}

export function FechaPicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha...",
  style,
}: FechaPickerProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [abierto, setAbierto] = useState(false);

  const alternar = () => setAbierto((v) => !v);

  const confirmar = (event: DateTimePickerEvent, date?: Date) => {
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
  value: string;

  onChange: (hora: string) => void;
}

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
