import { ConsultorioDto } from "@/models/Consultorio";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";
import { useConsultorio } from "../hooks/useConsultorio";
import {
  DangerButton,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";
import { makeFeedbackStyles } from "../style/ui/Feedback";

export default function ConsultorioForm() {
  const { consultorio, fetchAll, create, update, remove, loading, error } =
    useConsultorio();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const errorFeedback = makeFeedbackStyles(theme, "error");
  const successFeedback = makeFeedbackStyles(theme, "success");

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
      <Text style={styles.body}>
        {formatDireccion(item)}
      </Text>
      <Text style={styles.body}>Modalidad: {item.TipoModalidadNombre}</Text>
      <View style={styles.actions}>
        <SecondaryButton
          style={styles.actionButton}
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
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.Nombre}`}
        >
          <SecondaryButtonLabel>Editar</SecondaryButtonLabel>
        </SecondaryButton>

        <DangerButton
          style={styles.actionButton}
          onPress={() => remove(item.Id)}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar ${item.Nombre}`}
        >
          <SecondaryButtonLabel>Eliminar</SecondaryButtonLabel>
        </DangerButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nuevo Consultorio</Text>

      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.hint}>
        {`Ingrese el nombre del consultorio o puede poner "Consultorio de (su nombre)"`}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.nombre}
        onChangeText={(text) => setForm({ ...form, nombre: text })}
        accessibilityLabel="Nombre del consultorio"
      />

      <Text style={styles.label}>Calle</Text>
      <Text style={styles.hint}>Solo si su cosnultorio tiene dreccion prescencial</Text>
      <TextInput
        style={styles.input}
        placeholder="Calle"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.calle}
        onChangeText={(text) => setForm({ ...form, calle: text })}
        accessibilityLabel="Calle"
      />

      <Text style={styles.label}>Número</Text>
      <Text style={styles.hint}>Solo si su cosnultorio tiene dreccion prescencial</Text>
      <TextInput
        style={styles.input}
        placeholder="Número"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.numero}
        keyboardType="numeric"
        onChangeText={(text) => setForm({ ...form, numero: text })}
        accessibilityLabel="Número"
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de modalidad</Text>
        <Picker
          selectedValue={form.tipoModalidadNombre}
          onValueChange={(value) =>
            setForm({ ...form, tipoModalidadNombre: value })
          }
          dropdownIconColor={theme.colors.textSecondary}
          style={styles.picker}
        >
          <Picker.Item label="Seleccioná una modalidad" value="" />
          <Picker.Item label="Presencial" value="Presencial" />
          <Picker.Item label="Virtual" value="Virtual" />
        </Picker>
      </View>
      <PrimaryButton
        onPress={handleSubmit}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={loading ? "Guardando" : "Crear Consultorio"}
      >
        <PrimaryButtonLabel>
          {loading ? "Guardando..." : "Crear Consultorio"}
        </PrimaryButtonLabel>
      </PrimaryButton>

      {formError && (
        <View style={errorFeedback.panel}>
          <Text style={errorFeedback.text}>{formError}</Text>
        </View>
      )}
      {successMsg && (
        <View style={successFeedback.panel}>
          <Text style={successFeedback.text}>{successMsg}</Text>
        </View>
      )}
      {error && (
        <View style={errorFeedback.panel}>
          <Text style={errorFeedback.text}>Error: {String(error)}</Text>
        </View>
      )}

      <FlatList
        data={consultorio}
        keyExtractor={(item) => String(item.Id)}
        renderItem={renderConsultorio}
      />
    </View>
  );
}

// Calle y Número son opcionales: sin esto se imprimía "null null".
const formatDireccion = (item: ConsultorioDto) => {
  const partes = [item.Calle, item.Numero].filter(
    (p) => p !== null && p !== undefined && p !== "",
  );
  return partes.length ? partes.join(" ") : "Sin dirección";
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { padding: 16 },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.textPrimary,
    },
    label: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    hint: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.textDisabled,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      minHeight: 44,
      padding: 10,
      marginBottom: 12,
      borderRadius: theme.radius.small,
    },
    inputGroup: {
      marginBottom: 12,
    },
    picker: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
    },
    card: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: 12,
      marginBottom: 10,
      borderRadius: theme.radius.small,
    },
    title: {
      fontWeight: "bold",
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    body: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.textSecondary,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 4,
    },
  });
