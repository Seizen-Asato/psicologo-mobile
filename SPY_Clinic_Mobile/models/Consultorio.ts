export interface ConsultorioDto {
  consultorioId: number;
  nombre: string | null;
  calle: string | null;
  numero: number | null;
  tipoModalidadId?: number | null;
  tipoModalidadNombre?: string | null;
}
