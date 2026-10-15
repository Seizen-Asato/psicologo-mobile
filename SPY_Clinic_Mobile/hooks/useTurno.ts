import { TurnoDto } from "@/models/TurnoDto";
import * as turnosService from "@/services/TurnoService";
import { getWeekRange, isValidDate } from "@/utils/DateUtils";
import { useState } from "react";

export function useTurno() {
  const [turnos, setTurnos] = useState<TurnoDto[]>([]);
  const [apellido, setApellido] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTurnosALL = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await turnosService.getAll();
      setTurnos(data || []);
    } catch {
      setError("Error al cargar turnos");
    } finally {
      setLoading(false);
    }
  };

  const fetchTurnosSemana = async (date: Date = new Date()) => {
    setLoading(true);
    setError(null);
    try {
      const { desde, hasta } = getWeekRange(date);
      const data = await turnosService.getByRange(desde, hasta);
      setTurnos(data || []);
    } catch {
      setError("Error al cargar turnos de la semana");
    } finally {
      setLoading(false);
    }
  };

  const validateTurno = (turno: TurnoDto) => {
    if (!turno.fecha) throw new Error("La fecha es obligatoria");
    if (!isValidDate(turno.fecha))
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

  const filterTurnos = () => {
    let filtrados = turnos;
    if (apellido) {
      filtrados = filtrados.filter((t) =>
        (t.paciente?.Apellido ?? "")
          .toUpperCase()
          .startsWith(apellido.toUpperCase()),
      );
    }
    if (estado) {
      filtrados = filtrados.filter((t) => t.estado === estado);
    }
    return filtrados;
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

  // 🔹 Eliminar turno
  const removeTurno = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await turnosService.remove(id);
      await fetchTurnosSemana();
    } catch {
      setError("Error al eliminar turno");
    } finally {
      setLoading(false);
    }
  };

  return {
    turnos,
    loading,
    error,
    apellido,
    estado,
    setApellido,
    setEstado,
    fetchTurnosALL,
    fetchTurnosSemana,
    filterTurnos,
    saveTurno,
    removeTurno,
  };
}
