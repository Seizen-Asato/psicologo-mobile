import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface CalendarFilterProps {
  onFilter: (filters: { date?: string; patientId?: string }) => void;
  onReset: () => void;
}

const CalendarFilter: React.FC<CalendarFilterProps> = ({
  onFilter,
  onReset,
}) => {
  const [dateFilter, setDateFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");

  const handleSubmit = () => {
    onFilter({ date: dateFilter, patientId: patientFilter });
  };

  return (
    <View style={styles.container}>
      <Text>Filtrado por fecha</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dateFilter}
          onChangeText={setDateFilter}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ID paciente</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 42"
          value={patientFilter}
          onChangeText={setPatientFilter}
        />
      </View>

      <View style={styles.actions}>
        <Button title="Buscar" onPress={handleSubmit} />
        <Button title="Ver todos" color="gray" onPress={onReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#f9f9f9" },
  field: { marginBottom: 10 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default CalendarFilter;
