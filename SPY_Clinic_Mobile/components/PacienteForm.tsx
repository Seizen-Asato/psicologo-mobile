import { PacienteDto } from "@/models/PacienteDto";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { PrimaryButton, PrimaryButtonLabel } from "../style/ui/Buttons";

type PacienteFormProps = {
  onSave: (paciente: PacienteDto) => void;
  selected?: PacienteDto;
};

const PacienteForm: React.FC<PacienteFormProps> = ({ onSave, selected }) => {
  const [nombre, setNombre] = useState(selected?.nombre ?? "");
  const [apellido, setApellido] = useState(selected?.apellido ?? "");
  const [dni, setDni] = useState(selected?.dni ?? "");
  const [telefono, setTelefono] = useState(selected?.telefono ?? "");
  const [email, setEmail] = useState(selected?.email ?? "");

  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(() => {
    if (selected?.fechaNacimiento) {
      const fecha = new Date(`${selected.fechaNacimiento}T00:00:00`);
      if (!Number.isNaN(fecha.getTime())) return fecha;
    }

    return new Date();
  });

  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const handleSubmit = () => {
    const paciente: PacienteDto = {
      pacienteId: selected?.pacienteId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim() || null,
      telefono: telefono.trim() || null,
      email: email.trim() || null,
      fechaNacimiento: [
        fechaNacimiento.getFullYear(),
        String(fechaNacimiento.getMonth() + 1).padStart(2, "0"),
        String(fechaNacimiento.getDate()).padStart(2, "0"),
      ].join("-"),
      numeroPaciente: selected?.numeroPaciente ?? null,
      planTurnoId: selected?.planTurnoId ?? null,
    };

    onSave(paciente);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Paciente</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese nombre"
        placeholderTextColor={theme.colors.textDisabled}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Ingrese apellido"
        placeholderTextColor={theme.colors.textDisabled}
      />

      <Text style={styles.label}>DNI</Text>
      <TextInput
        style={styles.input}
        value={dni}
        onChangeText={setDni}
        placeholder="Ingrese DNI"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Ingrese teléfono"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese correo electrónico"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Fecha de nacimiento</Text>

      <Pressable
        style={styles.dateInput}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text style={styles.dateText}>
          {fechaNacimiento.toLocaleDateString("es-AR")}
        </Text>
      </Pressable>

      {mostrarCalendario && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={(_event, date) => {
            if (date) {
              setFechaNacimiento(date);
            }

            setMostrarCalendario(false);
          }}
          onDismiss={() => setMostrarCalendario(false)}
        />
      )}

      <View style={styles.saveButton}>
        <Button title="Guardar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    minHeight: 44,
    justifyContent: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    marginTop: 8,
  },
});

export default PacienteForm;
