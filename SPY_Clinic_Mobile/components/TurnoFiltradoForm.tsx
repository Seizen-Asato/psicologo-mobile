import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

interface TurnoFiltradoFormProps {
  onFilter: (filters: {
    date?: string;
    pacienteApellido?: string;
    pacienteNombre?: string;
  }) => void;
  onReset: () => void;
}

const TurnoFiltradoForm: React.FC<TurnoFiltradoFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [dateFilter, setDateFilter] = useState("");
  const [patientLastNameFilter, setPatientLastNameFilter] = useState("");
  const [patientNameFilter, setPatientNameFilter] = useState("");

  const handleSubmit = () => {
    onFilter({
      date: dateFilter,
      pacienteApellido: patientLastNameFilter,
      pacienteNombre: patientNameFilter,
    });
  };

  const handleReset = () => {
    setDateFilter("");
    setPatientLastNameFilter("");
    setPatientNameFilter("");
    onReset();
  };

  return (
    <View style={{ marginBottom: 20, padding: 10 }}>
      <TextInput
        placeholder="Paciente (apellido)"
        value={patientLastNameFilter}
        onChangeText={setPatientLastNameFilter}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Paciente (nombre)"
        value={patientNameFilter}
        onChangeText={setPatientNameFilter}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={dateFilter}
        onChangeText={setDateFilter}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Buscar" onPress={handleSubmit} />
      <Button title="Ver todos" color="gray" onPress={handleReset} />
    </View>
  );
};

export default TurnoFiltradoForm;
