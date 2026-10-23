import { EventoDto } from "./EventoDto";

export interface FiltroTurnosProps {
  getByDate: (date: string) => Promise<EventoDto[]>;

  reload: () => void;
}
