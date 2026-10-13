import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import React from "react";
import TurnoForm from "../components/TurnoForm";

interface TurnoScreenProps {
  selectedTurno?: TurnoDto | null;
}

export default function TurnoScreen({ selectedTurno }: TurnoScreenProps) {
  const { saveTurno } = useTurno();

  const handleSave = async (turno: TurnoDto) => {
    await saveTurno(turno);
  };

  const handleReset = () => {
    console.log("Formulario reiniciado");
  };

  return (
    <TurnoForm
      onSave={handleSave}
      onReset={handleReset}
      selectedTurno={selectedTurno}
    />
  );
}
