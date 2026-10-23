import { AgendaDto } from "./AgendaDto";

export interface FiltroTurnosProps {
  getByDate: (date: string) => Promise<AgendaDto[]>;

  reload: () => void;
}
