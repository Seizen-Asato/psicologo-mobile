import { ConsultorioDto } from "@/models/Consultorio";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

import {
  DangerButton,
  DangerButtonLabel,
  PrimaryButton,
  PrimaryButtonLabel,
  SecondaryButton,
  SecondaryButtonLabel,
} from "../style/ui/Buttons";

import { useConsultorio } from "../hooks/useConsultorio";

interface ConsultorioFormState {
  consultorioId: number;
  nombre: string;
  calle: string;
  numero: string;
  tipoModalidadNombre: string;
}

const emptyForm: ConsultorioFormState = {
  consultorioId: 0,
  nombre: "",
  calle: "",
  numero: "",
  tipoModalidadNombre: "",
};

export default function ConsultorioForm() {
  const { consultorio, fetchAll, create, update, remove, loading, error } =
    useConsultorio();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [form, setForm] = useState<ConsultorioFormState>(emptyForm);

  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [buscando, setBuscando] = useState(false);
  const [ubicacion, setUbicacion] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  function abrirAjustesUbicacion() {
    if (Platform.OS === "android") {
      Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS").catch(
        () => Linking.openSettings(),
      );
    } else {
      Linking.openSettings();
    }
  }

  function pedirAjustes(titulo: string, mensaje: string) {
    Alert.alert(titulo, mensaje, [
      { text: "Ahora no", style: "cancel" },
      { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
    ]);
  }

  const handleSubmit = async () => {
    setFormError(null);
    setSuccessMsg(null);

    if (!form.nombre.trim()) {
      setFormError(
        "El nombre del consultorio es obligatorio, si no tiene puede poner 'Consultorio de {su nombre}'",
      );
      return;
    }

    if (
      form.numero !== "" &&
      (!Number.isInteger(Number(form.numero)) || Number(form.numero) <= 0)
    ) {
      setFormError("Ingresá un número de calle válido");
      return;
    }

    if (!form.tipoModalidadNombre.trim()) {
      setFormError(
        "El nombre de la modalidad es obligatorio, tiene que agregar si es presencial o virtual",
      );
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      calle: form.calle.trim() === "" ? null : form.calle.trim(),
      numero: form.numero === "" ? null : Number(form.numero),
      tipoModalidadId: null,
      tipoModalidadNombre: form.tipoModalidadNombre.trim(),
    };

    if (isEditing) {
      const result = await update(form.consultorioId, payload);
      if (result?.success) {
        setSuccessMsg("¡Consultorio actualizado con éxito!");
        resetForm();
        fetchAll();
      } else {
        setFormError(result?.error || "No se pudo actualizar el consultorio");
      }
    } else {
      const result = await create(payload);
      if (result?.success) {
        setSuccessMsg("¡Consultorio creado con éxito!");
        resetForm();
        fetchAll();
      } else {
        setFormError(result?.error || "No se pudo crear el consultorio");
      }
    }
  };

  const handleEditPress = (item: ConsultorioDto) => {
    setIsEditing(true);
    setForm({
      consultorioId: item.consultorioId,
      nombre: (item.nombre ?? "").trim(),
      calle: (item.calle ?? "").trim(),
      numero: item.numero != null ? String(item.numero) : "",
      tipoModalidadNombre: (item.tipoModalidadNombre ?? "").trim(),
    });
    setFormError(null);
    setSuccessMsg(null);
  };

  const resetForm = () => {
    setIsEditing(false);
    setForm(emptyForm);
  };

  const handleDeletePress = (item: ConsultorioDto) => {
    Alert.alert(
      "Eliminar consultorio",
      `¿Seguro que querés eliminar "${item.nombre ?? "este consultorio"}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setSuccessMsg(null);
            setFormError(null);
            if (isEditing && form.consultorioId === item.consultorioId) {
              resetForm();
            }
            const result = await remove(item.consultorioId);
            if (result?.success) {
              setSuccessMsg("Consultorio eliminado con éxito");
            } else {
              setFormError(
                result?.error ||
                  "No se pudo eliminar el consultorio. Si tiene agendas asociadas no se puede eliminar.",
              );
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const conseguirUbicacion = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        return pedirAjustes(
          "No se peude acceder a la ubicación",
          "necesitamos los permisos ",
        );
      }

      const servicio = await Location.hasServicesEnabledAsync();

      if (!servicio) {
        Alert.alert("GPS apagado", "Activa la ubicación para continuar", [
          {
            text: "Ir a ajustes",
            onPress: abrirAjustesUbicacion,
          },
        ]);

        return;
      }

      setBuscando(true);

      const ubi = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = ubi.coords;
      let lugar: string | undefined;
      try {
        const [dir] = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        lugar = [dir?.city ?? dir?.subregion, dir?.region, dir?.country]
          .filter(Boolean)
          .join(",");
      } catch {}

      setUbicacion(lugar ?? "Sin ubicación");
    } catch {
      Alert.alert(
        "No se pudo obtener la ubicación",
        "Probá de nuevo, cerca de una ventana o al aire libre.",
      );
    } finally {
      setBuscando(false);
    }
  };

  const renderConsultorio = ({ item }: { item: ConsultorioDto }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{(item.nombre ?? "").trim()}</Text>
      <Text style={styles.cardText}>
        {(item.calle ?? "").trim()
          ? `${(item.calle ?? "").trim()} ${item.numero ?? ""}`
          : "Sin dirección presencial"}
      </Text>
      <Text style={styles.cardText}>
        Modalidad: {(item.tipoModalidadNombre ?? "").trim() || "—"}
      </Text>
      <View style={styles.actions}>
        <View style={styles.actionBtn}>
          <SecondaryButton onPress={() => handleEditPress(item)}>
            <SecondaryButtonLabel>Editar</SecondaryButtonLabel>
          </SecondaryButton>
        </View>
        <View style={styles.actionBtn}>
          <DangerButton onPress={() => handleDeletePress(item)}>
            <DangerButtonLabel>Eliminar</DangerButtonLabel>
          </DangerButton>
        </View>
      </View>

      <View style={styles.actionsUbi}>
        <Text style={styles.cardTextUbi}>
          📍 {ubicacion || "Sin ubicación"}
        </Text>

        <SecondaryButton onPress={conseguirUbicacion}>
          <SecondaryButtonLabel>
            {buscando ? "Buscando..." : "Ver ubicación"}
          </SecondaryButtonLabel>
        </SecondaryButton>
      </View>
    </View>
  );

  const listHeader = (
    <View>
      <Text style={styles.heading}>
        {isEditing ? "Editar Consultorio" : "Nuevo Consultorio"}
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <Text
        style={styles.subtext}
      >{`Ingrese el nombre del consultorio o puede poner "Consultorio de (su nombre)"`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.nombre}
        onChangeText={(text) => setForm({ ...form, nombre: text })}
      />

      <Text style={styles.label}>Calle</Text>
      <Text style={styles.subtext}>
        Solo si su consultorio tiene dirección presencial
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Calle"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.calle}
        onChangeText={(text) => setForm({ ...form, calle: text })}
      />

      <Text style={styles.label}>Número</Text>
      <Text style={styles.subtext}>
        Solo si su consultorio tiene dirección presencial
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="numeric"
        placeholderTextColor={theme.colors.textDisabled}
        value={form.numero}
        onChangeText={(text) => setForm({ ...form, numero: text })}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de modalidad</Text>
        <Picker
          selectedValue={form.tipoModalidadNombre}
          onValueChange={(value) =>
            setForm({ ...form, tipoModalidadNombre: value })
          }
          dropdownIconColor={theme.colors.textSecondary}
          itemStyle={{ color: theme.colors.textPrimary }}
          style={{ color: theme.colors.textPrimary }}
        >
          <Picker.Item label="Seleccioná una modalidad" value="" />
          <Picker.Item label="Presencial" value="Presencial" />
          <Picker.Item label="Virtual" value="Virtual" />
        </Picker>
      </View>

      <PrimaryButton onPress={handleSubmit} disabled={loading}>
        <PrimaryButtonLabel>
          {loading
            ? "Guardando..."
            : isEditing
              ? "Actualizar Consultorio"
              : "Crear Consultorio"}
        </PrimaryButtonLabel>
      </PrimaryButton>

      {isEditing && (
        <View style={{ marginTop: 10 }}>
          <SecondaryButton onPress={resetForm} disabled={loading}>
            <SecondaryButtonLabel>Cancelar Edición</SecondaryButtonLabel>
          </SecondaryButton>
        </View>
      )}

      {formError && <Text style={styles.error}>{formError}</Text>}
      {successMsg && <Text style={styles.success}>{successMsg}</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <Text style={[styles.heading, { marginTop: 20 }]}>
        Consultorios Registrados
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={consultorio}
      keyExtractor={(item) => String(item.consultorioId)}
      renderItem={renderConsultorio}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={
        <Text style={styles.subtext}>No hay consultorios registrados.</Text>
      }
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={true}
    />
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: { flex: 1 },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.textPrimary,
    },
    label: { color: theme.colors.textPrimary, marginBottom: 2 },
    subtext: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      padding: 8,
      marginBottom: 10,
      borderRadius: theme.radius.small,
      minHeight: theme.touchMin,
    },
    inputGroup: {
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.small,
      overflow: "hidden",
    },
    card: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: 12,
      marginBottom: 10,
      borderRadius: theme.radius.small,
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    cardText: { color: theme.colors.textSecondary },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
      gap: 12,
    },
    actionsUbi: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },

    cardTextUbi: {
      flex: 1,
      color: theme.colors.textSecondary,
      marginRight: 10,
    },
    actionBtn: { flex: 1 },
    error: { color: theme.colors.error, marginTop: 8 },
    success: { color: theme.colors.success, marginTop: 8 },
  });
