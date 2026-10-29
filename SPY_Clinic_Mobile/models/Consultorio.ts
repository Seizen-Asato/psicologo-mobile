// Los nombres de propiedades coinciden con el JSON que serializa la API
// (ASP.NET Core serializa en camelCase por defecto).
export interface ConsultorioDto {
  consultorioId: number;
  nombre: string | null;
  calle: string | null;
  numero: number | null;
  tipoModalidadId?: number | null;
  tipoModalidadNombre?: string | null;
}
