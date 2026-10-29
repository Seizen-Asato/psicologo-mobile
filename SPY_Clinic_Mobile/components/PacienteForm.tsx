import { PacienteDto } from "@/models/PacienteDto";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { PrimaryButton, PrimaryButtonLabel } from "../style/ui/Buttons";

type PacienteFormProps = {
  onSave: (paciente: PacienteDto) => void;
  selected?: PacienteDto;
};

const PacienteForm: React.FC<PacienteFormProps> = ({ onSave, selected }) => {
  const [Nombre, setNombre] = useState(selected?.Nombre ?? "");
  const [Apellido, setApellido] = useState(selected?.Apellido ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    selected?.fechaNacimiento ?? new Date(),
  );
  const [Mail, setMail] = useState(selected?.Mail ?? "");
  const [Dni, setDni] = useState(selected?.Dni ?? "");
  const [Telefono, setTelefono] = useState(selected?.Telefono ?? "");
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleSubmit = () => {
    const paciente: PacienteDto = {
      Id: selected?.Id,
      Nombre,
      Apellido,
      Mail,
      Dni,
      Telefono,
      fechaNacimiento,
    };
    onSave(paciente);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Paciente</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={Nombre}
        onChangeText={setNombre}
        placeholder="Ingrese nombre"
        placeholderTextColor={theme.colors.textDisabled}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={Apellido}
        onChangeText={setApellido}
        placeholder="Ingrese apellido"
        placeholderTextColor={theme.colors.textDisabled}
      />

      <Text style={styles.label}>DNI</Text>
      <TextInput
        style={styles.input}
        value={Dni}
        onChangeText={setDni}
        placeholder="Ingrese DNI"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={Telefono}
        onChangeText={setTelefono}
        placeholder="Ingrese teléfono"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Mail</Text>
      <TextInput
        style={styles.input}
        value={Mail}
        onChangeText={setMail}
        placeholder="Ingrese correo electrónico"
        placeholderTextColor={theme.colors.textDisabled}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        value={fechaNacimiento.toISOString().split("T")[0]}
        onChangeText={(text) => setFechaNacimiento(new Date(text))}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={theme.colors.textDisabled}
      />

      <PrimaryButton
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Guardar paciente"
      >
        <PrimaryButtonLabel>Guardar</PrimaryButtonLabel>
      </PrimaryButton>
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { padding: 16, backgroundColor: theme.colors.background },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme.colors.textPrimary,
    },
    label: {
      marginBottom: 4,
      fontWeight: "600",
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      borderRadius: 6,
      minHeight: 44,
      padding: 12,
      marginBottom: 12,
    },
  });

export default PacienteForm;
