import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

type Props = {
  apellido: string;
  estado: string;
  setApellido: (value: string) => void;
  setEstado: (value: string) => void;
};

export default function TurnoFilterPicker({
  apellido,
  estado,
  setApellido,
  setEstado,
}: Props) {
  const letras = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={apellido}
        onValueChange={(value) => setApellido(value)}
        style={styles.picker}
      >
        <Picker.Item label="Todos los apellidos" value="" />
        {letras.map((letra) => (
          <Picker.Item key={letra} label={letra} value={letra} />
        ))}
      </Picker>

      <Picker
        selectedValue={estado}
        onValueChange={(value) => setEstado(value)}
        style={styles.picker}
      >
        <Picker.Item label="Todos los estados" value="" />
        <Picker.Item label="Activo" value="activo" />
        <Picker.Item label="Cancelado" value="cancelado" />
        <Picker.Item label="Pendiente" value="pendiente" />
      </Picker>

      <Button
        title="Limpiar filtros"
        onPress={() => {
          setApellido("");
          setEstado("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  picker: {
    marginBottom: 8,
  },
});
