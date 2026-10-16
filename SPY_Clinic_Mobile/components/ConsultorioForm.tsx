import { ConsultorioDto } from "@/models/Consultorio";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useConsultorio } from "../hooks/useConsultorio";

export default function ConsultorioForm() {
  const { consultorio, fetchAll, create, update, remove, loading, error } =
    useConsultorio();

  const [form, setForm] = useState({
    Id: "",
    nombre: "",
    calle: "",
    numero: "",
    presencial: false,
    virtual: false,
    tipoModalidadNombre: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async () => {
    setFormError(null);
    setSuccessMsg(null);

    // Nombre obligatorio
    if (!form.nombre.trim()) {
      setFormError(
        "El nombre del consultorio es obligatorio, si no tiene puede poner 'Consultorio de {su nombre}' ",
      );
      return;
    }

    // Calle y número opcionales, pero si se ingresan deben ser válidos
    if (
      form.numero !== "" &&
      (!Number.isInteger(Number(form.numero)) || Number(form.numero) <= 0)
    ) {
      setFormError("Ingresá un número de calle válido");
      return;
    }

    // Modalidad obligatoria
    if (!form.tipoModalidadNombre.trim()) {
      setFormError(
        "El nombre de la modalidad es obligatorio, tiene que agregar si es prescencial o vitrual",
      );
      return;
    }

    const payload: ConsultorioDto = {
      Id: form.Id,
      Nombre: form.nombre.trim(),
      Calle: form.calle.trim() === "" ? null : form.calle.trim(),
      Numero: form.numero === "" ? null : Number(form.numero),
      TipoModalidadId: null, // si no lo usás, podés dejarlo null
      TipoModalidadNombre: form.tipoModalidadNombre.trim(),
    };

    const result = await create(payload);
    if (result?.success) {
      setSuccessMsg("¡Consultorio creado con éxito!");
      setForm({
        Id: "",
        nombre: "",
        calle: "",
        numero: "",
        presencial: false,
        virtual: false,
        tipoModalidadNombre: "",
      });
    } else {
      setFormError(result?.error || "No se pudo crear el consultorio");
    }
  };

  const renderConsultorio = ({ item }: { item: ConsultorioDto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Nombre}</Text>
      <Text>
        {item.Calle} {item.Numero}
      </Text>
      <Text>Modalidad: {item.TipoModalidadNombre}</Text>
      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => {
            update(item.Id, {
              Id: item.Id,
              Nombre: form.nombre.trim(),
              Calle: form.calle.trim() === "" ? null : form.calle.trim(),
              Numero: form.numero === "" ? null : Number(form.numero),
              TipoModalidadId: null,
              TipoModalidadNombre: form.tipoModalidadNombre.trim(),
            });
          }}
        />

        <Button title="Eliminar" color="red" onPress={() => remove(item.Id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nuevo Consultorio</Text>

      <Text>Nombre</Text>

      <Text>{`Ingrese el nombre del consultorio o puede poner "Consultorio de (su nombre)"`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.nombre}
        onChangeText={(text) => setForm({ ...form, nombre: text })}
      />

      <Text>Calle</Text>
      <Text>Solo si su cosnultorio tiene dreccion prescencial</Text>
      <TextInput
        style={styles.input}
        placeholder="Calle"
        value={form.calle}
        onChangeText={(text) => setForm({ ...form, calle: text })}
      />
      <Text>Número</Text>

      <Text>Solo si su cosnultorio tiene dreccion prescencial</Text>
      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="numeric"
        value={form.numero}
        onChangeText={(text) => setForm({ ...form, numero: text })}
      />

      <View style={styles.inputGroup}>
        <Text>Tipo de modalidad</Text>
        <Picker
          selectedValue={form.tipoModalidadNombre}
          onValueChange={(value) =>
            setForm({ ...form, tipoModalidadNombre: value })
          }
        >
          <Picker.Item label="Seleccioná una modalidad" value="" />
          <Picker.Item label="Presencial" value="Presencial" />
          <Picker.Item label="Virtual" value="Virtual" />
        </Picker>
      </View>
      <Button
        title={loading ? "Guardando..." : "Crear Consultorio"}
        onPress={handleSubmit}
        disabled={loading}
      />

      {formError && <Text style={styles.error}>{formError}</Text>}
      {successMsg && <Text style={styles.success}>{successMsg}</Text>}
      {error && <Text style={styles.error}>Error: {String(error)}</Text>}

      <FlatList
        data={consultorio}
        keyExtractor={(item) => String(item.Id)}
        renderItem={renderConsultorio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  inputGroup: {
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  title: { fontWeight: "bold" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  error: { color: "red", marginTop: 8 },
  success: { color: "green", marginTop: 8 },
});
