import { PacienteDto } from "@/models/PacienteDto";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

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
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={Apellido}
        onChangeText={setApellido}
        placeholder="Ingrese apellido"
      />

      <Text style={styles.label}>DNI</Text>
      <TextInput
        style={styles.input}
        value={Dni}
        onChangeText={setDni}
        placeholder="Ingrese DNI"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={Telefono}
        onChangeText={setTelefono}
        placeholder="Ingrese teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Mail</Text>
      <TextInput
        style={styles.input}
        value={Mail}
        onChangeText={setMail}
        placeholder="Ingrese correo electrónico"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        value={fechaNacimiento.toISOString().split("T")[0]}
        onChangeText={(text) => setFechaNacimiento(new Date(text))}
        placeholder="YYYY-MM-DD"
      />

      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});

export default PacienteForm;
