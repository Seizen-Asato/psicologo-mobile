import { PacienteDto } from "@/models/PacienteDto";
import { PsicologoDto } from "@/models/PsicolgoDto";
import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

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

export async function getAll(): Promise<PlanTurno[]> {
  return await fetchApi(`${BASE_URL}/planTurno`);
}

export async function getById(id: string | number) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`);
}

export async function getTurnosByPaciente(id: string | number) {
  return fetchApi(`${BASE_URL}/planTurno/${id}/paciente`);
}

export async function create(data: CreatePlanTurnoPayload) {
  return fetchApi(`${BASE_URL}/planTurno`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function update(
  id: string | number,
  data: Partial<CreatePlanTurnoPayload>,
) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function remove(id: string | number) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`, {
    method: "DELETE",
  });
}
