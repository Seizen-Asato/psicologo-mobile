import { ConsultorioDto } from "@/models/Consultorio";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import ConsultorioForm from "../components/ConsultorioForm";
import { useConsultorio } from "../hooks/useConsultorio";

export default function ConsultorioScreen() {
  const { consultorio, fetchAll, remove, loading, error } = useConsultorio();

  useEffect(() => {
    fetchAll();
  }, []);

  const renderConsultorio = ({ item }: { item: ConsultorioDto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Nombre}</Text>
      <Text>
        {item.Calle} {item.Numero}
      </Text>
      <Text>Modalidad: {item.TipoModalidadNombre}</Text>
      <View style={styles.actions}>
        <Button title="Editar" onPress={() => console.log("Editar", item)} />
        <Button title="Eliminar" color="red" onPress={() => remove(item.Id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gestión de Consultorios</Text>

      <ConsultorioForm />

      <Text style={styles.heading}>Consultorios Registrados</Text>
      {loading && <Text>Cargando...</Text>}
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
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  error: { color: "red", marginTop: 8 },
});
