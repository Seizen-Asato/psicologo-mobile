import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import TurnoForm from "../components/TurnoForm";

export default function TurnoScreen() {
  const { saveTurno, fetchTurnoById } = useTurno();
  const [selectedTurno, setSelectedTurno] = useState<TurnoDto | null>(null);
  const { id } = useLocalSearchParams();

  const handleSave = async (turno: TurnoDto) => {
    await saveTurno(turno);
  };

  const handleReset = () => {
    console.log("Formulario reiniciado");
  };
  useEffect(() => {
    const loadTurno = async () => {
      if (!id) return;

      const turno = await fetchTurnoById(Number(id));

      if (turno) {
        setSelectedTurno(turno);
      }
    };

    loadTurno();
  }, [id]);

  return (
    <TurnoForm
      onSave={handleSave}
      onReset={handleReset}
      selectedTurno={selectedTurno ?? undefined}
    />
  );
}
