export interface PsicologoDto {
  psicologoId: string; // en el back es int, acá lo tipás como string si viene así en JSON
  nombre: string;
  apellido: string;
  telefono?: string | null;
  email?: string | null;
}
