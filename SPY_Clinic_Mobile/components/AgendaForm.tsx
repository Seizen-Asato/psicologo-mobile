import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { FechaPicker, HoraPicker } from "./FechaHoraPicker";
import { AgendaDto } from "../models/AgendaDto";
import * as consultorioService from "../services/ConsultorioService";
import * as pacientesService from "../services/PacienteService";
import * as psicologosService from "../services/PsicologoService";
import { PrimaryButton, PrimaryButtonLabel } from "../style/ui/Buttons";

interface AgendaFormProps {
  onCreate: (agenda: AgendaDto) => Promise<void>;
}

const AgendaForm: React.FC<AgendaFormProps> = ({ onCreate }) => {
  const [psicologos, setPsicologos] = useState<any[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [consultorio, setConsultorio] = useState<any[]>([]);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [agenda, setAgenda] = useState<AgendaDto>({
    agendaId: 0,
    psicologoId: 0,
    pacienteId: "",
    consultorioId: "",
    diaSemana: "",
    horaInicio: "",
    horaFin: "",
    fecha: "",
    descripcion: "",
    titulo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPsicologos(await psicologosService.getAll());
        setPacientes(await pacientesService.getAll());
        setConsultorio(await consultorioService.getAll());
      } catch (error) {
        console.error("Error al cargar datos del formulario", error);
      }
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
        ? /* Parse "YYYY-MM-DD" en zona local: new Date(iso) lo interpreta en
             UTC y desfasa el weekday en zonas horarias negativas. */
          (() => {
            const [y, m, d] = agenda.fecha.slice(0, 10).split("-").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
              weekday: "long",
            });
          })()
        : "",
    };

    await onCreate(newAgenda);

    setAgenda({
      agendaId: 0,
      psicologoId: 0,
      pacienteId: "",
      consultorioId: "",
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
        placeholderTextColor={theme.colors.textDisabled}
        value={agenda.titulo}
        onChangeText={(text) => setAgenda({ ...agenda, titulo: text })}
        style={styles.input}
      />

      <FechaPicker
        value={agenda.fecha}
        onChange={(fecha) => setAgenda({ ...agenda, fecha })}
      />

      <HoraPicker
        value={agenda.horaInicio}
        onChange={(hora) => setAgenda({ ...agenda, horaInicio: hora })}
        placeholder="Seleccionar hora inicio..."
      />

      <HoraPicker
        value={agenda.horaFin}
        onChange={(hora) => setAgenda({ ...agenda, horaFin: hora })}
        placeholder="Seleccionar hora fin..."
      />

      <TextInput
        placeholder="Descripción"
        placeholderTextColor={theme.colors.textDisabled}
        value={agenda.descripcion}
        onChangeText={(text) => setAgenda({ ...agenda, descripcion: text })}
        style={styles.input}
      />

      <Picker
        selectedValue={agenda.psicologoId}
        onValueChange={(value) =>
          setAgenda({ ...agenda, psicologoId: Number(value) })
        }
        dropdownIconColor={theme.colors.textSecondary}
        itemStyle={{ color: theme.colors.textPrimary }}
        style={{ color: theme.colors.textPrimary }}
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

      <Picker
        selectedValue={agenda.pacienteId}
        onValueChange={(value) => setAgenda({ ...agenda, pacienteId: value })}
        dropdownIconColor={theme.colors.textSecondary}
        itemStyle={{ color: theme.colors.textPrimary }}
        style={{ color: theme.colors.textPrimary }}
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

      <Picker
        selectedValue={agenda.consultorioId}
        onValueChange={(value) =>
          setAgenda({ ...agenda, consultorioId: value })
        }
        dropdownIconColor={theme.colors.textSecondary}
        itemStyle={{ color: theme.colors.textPrimary }}
        style={{ color: theme.colors.textPrimary }}
      >
        <Picker.Item label="Seleccione consultorio..." value="" />
        {consultorio.map((c) => (
          <Picker.Item
            key={c.consultorioId}
            label={`${c.nombre}`}
            value={c.consultorioId}
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
