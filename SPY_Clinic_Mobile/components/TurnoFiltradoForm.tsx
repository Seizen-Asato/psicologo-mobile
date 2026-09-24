import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface TurnoFiltradoFormProps {
  onFilter: (filters: {
    date?: string;
    patientId?: string;
    turnoId?: string;
    turnoPaciente?: string;
    turnoPacienteId?: string;
  }) => void;
  onReset: () => void;
}

const TurnoFiltradoForm: React.FC<TurnoFiltradoFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [date, setDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [turnoId, setTurnoId] = useState("");
  const [turnoPaciente, setTurnoPaciente] = useState("");
  const [turnoPacienteId, setTurnoPacienteId] = useState("");

  const handleSubmit = () => {
    onFilter({ date, patientId, turnoId, turnoPaciente, turnoPacienteId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filtrado</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Paciente ID"
        value={patientId}
        onChangeText={setPatientId}
      />
      <TextInput
        style={styles.input}
        placeholder="Turno ID"
        value={turnoId}
        onChangeText={setTurnoId}
      />
      <TextInput
        style={styles.input}
        placeholder="Turno Paciente"
        value={turnoPaciente}
        onChangeText={setTurnoPaciente}
      />
      <TextInput
        style={styles.input}
        placeholder="Turno Paciente ID"
        value={turnoPacienteId}
        onChangeText={setTurnoPacienteId}
      />

      <View style={styles.actions}>
        <Button title="Filtrar" onPress={handleSubmit} />
        <Button title="Ver todos" color="gray" onPress={onReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  text: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default TurnoFiltradoForm;
