export interface TurnoDto {
  turnoId?: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
  asistencia: boolean;
  minutos: number;
  modalidadVirtual: boolean;
  url?: string | null;
  cantidadTurnos: number;
  psicologoId: string;
  pacienteId: string;
  planTurnoId: string;
  descripcion: string;
}
