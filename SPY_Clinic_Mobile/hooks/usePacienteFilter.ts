import { PacienteDto } from "@/models/PacienteDto";
import { useMemo, useState } from "react";


export function usePacienteFilter(pacientesData: PacienteDto[]) {
  //logic of serch any paciente by name (nombre:string)

  const [filter, setFilter] = useState<string>("");

  const pacienteNameFilter = (nombre: string) => {
    setFilter(nombre);
  };

  const filterPaciente = useMemo(() => {
    if (!filter) return pacientesData;
    return pacientesData.filter((p) =>
      p.Nombre.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, pacientesData]);
  return {
    pacienteNameFilter,
    filter,
    filterPaciente,
  };
}
