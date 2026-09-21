import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { AgendaDto } from "../models/AgendaDto";

interface AgendaFormProps {
  onCreate: (agenda: AgendaDto) => Promise<void>;
}

const AgendaForm: React.FC<AgendaFormProps> = ({ onCreate }) => {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [psicologoId, setPsicologoId] = useState<number>(0);

  const handleSubmit = async () => {
    const newAgenda: AgendaDto = {
      agendaId: 0,
      psicologoId,
      psicologoNombre: "",
      psicologoApellido: "",
      consultorioId: 1,
      diaSemana: "",
      horaInicio,
      horaFin,
      fecha,
    };

    await onCreate(newAgenda);
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
    setPsicologoId(0);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Hora inicio (HH:mm)"
        value={horaInicio}
        onChangeText={setHoraInicio}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Hora fin (HH:mm)"
        value={horaFin}
        onChangeText={setHoraFin}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="ID Psicólogo"
        value={psicologoId.toString()}
        onChangeText={(text) => setPsicologoId(Number(text))}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Crear Agenda" onPress={handleSubmit} />
    </View>
  );
};

export default AgendaForm;
