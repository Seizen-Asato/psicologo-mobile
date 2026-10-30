export interface PsicologoDto {
  psicologoId: string;
  nombre: string;
  apellido: string;
  telefono?: string | null;
  email?: string | null;
  role?: string;
}
