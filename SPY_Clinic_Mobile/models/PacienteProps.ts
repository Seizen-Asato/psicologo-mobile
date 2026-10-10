import { PacienteDto } from "./PacienteDto";

export interface PacienteProps {
  getAll: () => Promise<PacienteDto[]>;
  getById: (id: number) => Promise<PacienteDto>;
  create: (dto: PacienteDto) => Promise<PacienteDto>;
  update: (dto: PacienteDto) => Promise<PacienteDto>;
  remove: (id: number) => Promise<void>;
}
