import PacienteFilter from "@/components/PacienteFilter";
import PacienteForm from "@/components/PacienteForm";
import PacienteRemove from "@/components/PacienteRemove";
import { usePaciente } from "@/hooks/usePaciente";
import { usePacienteFilter } from "@/hooks/usePacienteFilter";
import { PacienteDto } from "@/models/PacienteDto";
import * as PacienteService from "@/services/PacienteService";
import { useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function PacienteScren() {
  const {
    createPacienteMutation,
    updatePacienteMutation,
    removePacienteMutation,
    pacientesData,
    isLoading,
    error,
  } = usePaciente({
    getAll: PacienteService.getAll,
    getById: PacienteService.getById,
    create: PacienteService.create,
    update: PacienteService.update,
    remove: PacienteService.remove,
  });
  const [selectedPaciente, setSelectedPaciente] = useState<
    PacienteDto | undefined
  >(undefined);

  const { pacienteNameFilter, filter, filterPaciente } =
    usePacienteFilter(pacientesData);
  console.log("Pacientes recibidos:", pacientesData);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }
  if (error) {
    return <Text style={{ color: "red" }}>Error al cargar pacientes</Text>;
  }
  return (
    <>
      <PacienteForm
        onSave={
          selectedPaciente
            ? updatePacienteMutation.mutate
            : createPacienteMutation.mutate
        }
        selected={selectedPaciente}
      />

      <PacienteFilter filter={filter} onFilterChange={pacienteNameFilter} />
      {filterPaciente.map((p) => (
        <View key={p.Id} style={{ marginVertical: 8 }}>
          <Button
            title={`Editar ${p.Nombre}`}
            onPress={() => setSelectedPaciente(p)}
          />
          <PacienteRemove
            pacienteId={p.Id!}
            pacienteNombre={p.Nombre}
            onRemove={removePacienteMutation.mutate}
            isLoading={removePacienteMutation.isPending}
            error={removePacienteMutation.error}
          />
        </View>
      ))}
    </>
  );
}
