import { TurnoDto } from "@/models/TurnoDto";
import * as turnosService from "@/services/TurnoService";
import { getWeekRange } from "@/utils/DateUtils";
import { useState } from "react";

export function useTurno() {
  const [turnos, setTurnos] = useState<TurnoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTurnosSemana = async (date: Date = new Date()) => {
    setLoading(true);
    setError(null);
    try {
      const { desde, hasta } = getWeekRange(date);
      const data = await turnosService.getByRange(desde, hasta);
      setTurnos(data);
    } catch (err: any) {
      setError("Error al cargar turnos de la semana");
    } finally {
      setLoading(false);
    }
  };
  //validacion provisoria, luego implementaremos un pop-up pero eso lo dejamos apra los siguientes sprint
  const validateTurno = (turno: TurnoDto) => {
    if (!turno.fecha) throw new Error("La fecha es obligatoria");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(turno.fecha))
      throw new Error("Formato de fecha inválido (YYYY-MM-DD)");
    if (!turno.hora) throw new Error("La hora es obligatoria");
    if (!/^\d{2}:\d{2}$/.test(turno.hora))
      throw new Error("Formato de hora inválido (HH:mm)");
    if (turno.minutos < 30)
      throw new Error("La duración mínima es de 30 minutos");
    if (turno.modalidadVirtual && !turno.url)
      throw new Error("Debe ingresar la URL de la sesión virtual");
    if (!turno.psicologoId) throw new Error("Debe seleccionar un psicólogo");
    if (!turno.pacienteId) throw new Error("Debe seleccionar un paciente");
  };

  const saveTurno = async (turno: TurnoDto) => {
    setLoading(true);
    setError(null);
    try {
      validateTurno(turno);
      if (turno.turnoId) {
        await turnosService.update(turno.turnoId, turno);
      } else {
        await turnosService.create(turno);
      }
      await fetchTurnosSemana();
    } catch (err: any) {
      setError(err.message || "Error al guardar turno");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTurno = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await turnosService.remove(id);
      await fetchTurnosSemana();
    } catch (err: any) {
      setError("Error al eliminar turno");
    } finally {
      setLoading(false);
    }
  };

  return {
    turnos,
    loading,
    error,
    fetchTurnosSemana,
    saveTurno,
    removeTurno,
  };
}
