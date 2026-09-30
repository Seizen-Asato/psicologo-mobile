import { EventoDto } from "@/models/EventoDto";
import { FiltroTurnosProps } from "@/models/FiltroTurnosProps";
import { TurnoFiltroDto } from "@/models/TurnoFiltradoDto";
import { isValidDate } from "@/utils/DateUtils";
import { useState } from "react";

export function useFiltroTurnos({
  getByDate,
  getByPatient,
  getByTurno,
  getByTurnoPaciente,
  getByTurnoPacienteId,
  reload,
}: FiltroTurnosProps) {
  const [filteredEvents, setFilteredEvents] = useState<EventoDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filterTurnos = async (filters: TurnoFiltroDto) => {
    try {
      let response: EventoDto[] = [];

      if (filters.date) {
        if (!isValidDate(filters.date)) {
          throw new Error("Formato de fecha inválido (YYYY-MM-DD)");
        }
        response = await getByDate(filters.date);
      } else if (filters.pacienteId) {
        response = await getByPatient(filters.pacienteId);
      } else if (filters.turnoId && getByTurno) {
        response = await getByTurno(filters.turnoId);
      } else if (filters.turnoPaciente && getByTurnoPaciente) {
        response = await getByTurnoPaciente(filters.turnoPaciente);
      } else if (filters.turnoPacienteId && getByTurnoPacienteId) {
        response = await getByTurnoPacienteId(filters.turnoPacienteId);
      } else {
        reload();
        response = [];
      }

      setFilteredEvents(response);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al filtrar turnos");
    }
  };

  const resetTurnos = () => {
    reload();
    setFilteredEvents([]);
    setError(null);
  };

  return { filteredEvents, filterTurnos, resetTurnos, error };
}
