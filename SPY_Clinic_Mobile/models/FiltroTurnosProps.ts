import { EventoDto } from "./EventoDto";

export interface FiltroTurnosProps {
  getByDate: (date: string) => Promise<EventoDto[]>;
  getByPatient: (id: string) => Promise<EventoDto[]>;
  getByTurno?: (id: string) => Promise<EventoDto[]>;
  getByTurnoPaciente?: (id: string) => Promise<EventoDto[]>;
  getByTurnoPacienteId?: (id: string) => Promise<EventoDto[]>;
  reload: () => void;
}
