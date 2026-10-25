export interface PacienteDto {
  pacienteId?: number;
  nombre: string;
  apellido: string;
  dni?: string | null;
  telefono?: string | null;
  email?: string | null;
  fechaNacimiento: string | null;
  numeroPaciente?: number | null;
  planTurnoId?: number | null;
}
