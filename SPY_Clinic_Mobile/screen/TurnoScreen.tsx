import { TurnoDto } from "@/models/TurnoDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import TurnoForm from "../components/TurnoForm";
import { create, remove, update } from "../services/TurnoService";
interface TurnoScreenProps {
  selectedTurno?: TurnoDto | null;
}

export default function TurnoScreen({ selectedTurno }: TurnoScreenProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: TurnoDto) => create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["turnos"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TurnoDto }) =>
      update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["turnos"] }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["turnos"] }),
  });

  const handleSave = (turno: TurnoDto) => {
    if (selectedTurno?.turnoID) {
      updateMutation.mutate({ id: selectedTurno.turnoID, data: turno });
    } else {
      createMutation.mutate(turno);
    }
  };

  const handleRemove = (id: string) => {
    removeMutation.mutate(id);
  };

  const handleReset = () => {
    console.log("Formulario reiniciado");
  };

  return (
    <TurnoForm
      onSave={handleSave}
      onRemove={handleRemove}
      onReset={handleReset}
      selectedTurno={selectedTurno}
    />
  );
}
