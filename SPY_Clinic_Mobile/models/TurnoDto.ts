export interface TurnoDto {
  turnoID?: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
  asistencia: boolean;
  minutos: number;
  modalidadVirtual: boolean;
  url?: string | null;
  cantidadTurnos: number;
  psicologoID: string;
  pacienteID: string;
  planTurnoID: string;
  descripcion: string;
}
