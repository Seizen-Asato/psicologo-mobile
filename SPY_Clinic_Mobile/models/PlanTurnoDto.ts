import { PacienteDto } from "./PacienteDto";
import { PsicologoDto } from "./PsicolgoDto";

export interface PlanTurno {
  planTurnoId?: number;
  planTurnoNombre?: string;
  fechaInicio?: string;
  fechaFin?: string;
  cantidadTurno?: number;
  paciente?: PacienteDto | null;
  pacientes?: PacienteDto[];
  psicologo?: PsicologoDto | null;
}

export interface CreatePlanTurnoPayload {
  fechaInicio: string;
  fechaFin: string;
  cantidadTurno: number;
}

export type ServiceResult = {
  success: boolean;
  data?: unknown;
  error?: string;
};
