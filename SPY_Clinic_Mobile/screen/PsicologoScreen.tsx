import PsicologoCard from "@/components/PsicologoCard";
import PsicologoForm from "@/components/PsicologoForm";
import { usePsicologo } from "@/hooks/usePsicologo";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function PsicologoScreen() {
  const { psicologos, loading, error } = usePsicologo();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Psicólogos
      </Text>

      <PsicologoForm />

      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={{ color: "red" }}>Error: {String(error)}</Text>}

      <FlatList
        data={psicologos}
        keyExtractor={(item) => String(item.psicologoId)}
        renderItem={({ item }) => <PsicologoCard psicologo={item} />}
      />
    </View>
  );
}
