export interface ConsultorioDto {
  Id: string;
  Nombre: string;
  Calle: string | null;
  Numero: number | null;
  TipoModalidadId?: number | null;
  TipoModalidadNombre: string;
}
