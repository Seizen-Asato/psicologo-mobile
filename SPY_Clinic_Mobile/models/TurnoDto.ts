import { PacienteDto } from "./PacienteDto";
import { PsicologoDto } from "./PsicolgoDto";

export interface TurnoDto {
  turnoId?: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
  asistencia?: boolean;
  minutos: number;
  modalidadVirtual: boolean;
  url?: string | null;
  cantidadTurnos: number;
  psicologoId: number | null;
  pacienteId: number | null;
  planTurnoId: number | null;
  descripcion: string;

  paciente?: PacienteDto;
  psicologo?: PsicologoDto;
}
