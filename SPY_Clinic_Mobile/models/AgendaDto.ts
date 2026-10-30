import { ConsultorioDto } from "./Consultorio";
import { PacienteDto } from "./PacienteDto";
import { PsicologoDto } from "./PsicolgoDto";

export interface AgendaDto {
  agendaId: number;
  psicologoId: number;
  pacienteId: string;
  consultorioId: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  fecha: string;
  descripcion: string;
  titulo: string;

  paciente?: PacienteDto;
  psicologo?: PsicologoDto;
  consultorio?: ConsultorioDto;
}
