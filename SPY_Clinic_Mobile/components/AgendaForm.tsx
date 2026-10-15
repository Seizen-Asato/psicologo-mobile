import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { AgendaDto } from "../models/AgendaDto";
import { PrimaryButton, PrimaryButtonLabel } from "../style/ui/Buttons";
import * as pacientesService from "../services/PacienteService";
import * as psicologosService from "../services/PsicologoService";

interface AgendaFormProps {
  onCreate: (agenda: AgendaDto) => Promise<void>;
}

const AgendaForm: React.FC<AgendaFormProps> = ({ onCreate }) => {
  const [psicologos, setPsicologos] = useState<any[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [agenda, setAgenda] = useState<AgendaDto>({
    agendaId: 0,
    psicologoId: 0,
    pacienteId: "",
    diaSemana: "",
    horaInicio: "",
    horaFin: "",
    fecha: "",
    descripcion: "",
    titulo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPsicologos(await psicologosService.getAll());
      setPacientes(await pacientesService.getAll());
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const horaInicioFormatted =
      agenda.horaInicio.length === 5
        ? `${agenda.horaInicio}:00`
        : agenda.horaInicio;
    const horaFinFormatted =
      agenda.horaFin.length === 5 ? `${agenda.horaFin}:00` : agenda.horaFin;

    const newAgenda: AgendaDto = {
      ...agenda,
      horaInicio: horaInicioFormatted,
      horaFin: horaFinFormatted,
      diaSemana: agenda.fecha
        ? new Date(agenda.fecha).toLocaleDateString("es-ES", {
            weekday: "long",
          })
        : "",
    };

    await onCreate(newAgenda);

    setAgenda({
      agendaId: 0,
      psicologoId: 0,
      pacienteId: "",
      diaSemana: "",
      horaInicio: "",
      horaFin: "",
      fecha: "",
      descripcion: "",
      titulo: "",
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={agenda.titulo}
        onChangeText={(text) => setAgenda({ ...agenda, titulo: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={agenda.fecha}
        onChangeText={(text) => setAgenda({ ...agenda, fecha: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Hora inicio (HH:mm)"
        value={agenda.horaInicio}
        onChangeText={(text) => setAgenda({ ...agenda, horaInicio: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Hora fin (HH:mm)"
        value={agenda.horaFin}
        onChangeText={(text) => setAgenda({ ...agenda, horaFin: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={agenda.descripcion}
        onChangeText={(text) => setAgenda({ ...agenda, descripcion: text })}
        style={styles.input}
      />

      <Picker
        selectedValue={agenda.psicologoId}
        onValueChange={(value) =>
          setAgenda({ ...agenda, psicologoId: Number(value) })
        }
      >
        <Picker.Item label="Seleccione psicólogo..." value={0} />
        {psicologos.map((p) => (
          <Picker.Item
            key={p.psicologoId}
            label={`${p.nombre} ${p.apellido}`}
            value={p.psicologoId}
          />
        ))}
      </Picker>

      {/* Picker de pacientes */}
      <Picker
        selectedValue={agenda.pacienteId}
        onValueChange={(value) => setAgenda({ ...agenda, pacienteId: value })}
      >
        <Picker.Item label="Seleccione paciente..." value="" />
        {pacientes.map((p) => (
          <Picker.Item
            key={p.pacienteId}
            label={`${p.nombre} ${p.apellido}`}
            value={p.pacienteId}
          />
        ))}
      </Picker>

      <PrimaryButton
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Crear agenda"
      >
        <PrimaryButtonLabel>Crear Agenda</PrimaryButtonLabel>
      </PrimaryButton>
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { marginBottom: 20 },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      borderRadius: 6,
      minHeight: 44,
      marginBottom: 10,
      padding: 12,
    },
  });

export default AgendaForm;
