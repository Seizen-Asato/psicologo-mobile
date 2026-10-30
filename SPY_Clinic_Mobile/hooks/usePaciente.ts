import { PacienteProps } from "@/models/PacienteProps";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PacienteDto } from "../models/PacienteDto";

export function usePaciente({
  getAll,
  getById,
  create,
  update,
  remove,
}: PacienteProps) {
  const queryClient = useQueryClient();

  const {
    data: pacientesData = [],
    isLoading,
    error,
  } = useQuery<PacienteDto[], Error>({
    queryKey: ["pacientes"],
    queryFn: getAll,
  });

  const FilterPacienteById = (id: number) =>
    useQuery<PacienteDto>({
      queryKey: ["pacienteById", id],
      queryFn: () => getById(id),
      enabled: !!id,
    });

  //logic of SavePaciente

  const createPacienteMutation = useMutation({
    mutationFn: (paciente: PacienteDto) => create(paciente),
    onSuccess: (newPaciente) => {
      queryClient.setQueryData(["pacientes"], (old: PacienteDto[] = []) => [
        ...old,
        newPaciente,
      ]);
    },
  });

  const updatePacienteMutation = useMutation({
    mutationFn: (paciente: PacienteDto) => update(paciente),
    onSuccess: (updatedPaciente: PacienteDto, pacienteId) => {
      queryClient.setQueryData(
        ["pacienteById", pacienteId],
        (old: PacienteDto[] = []) => updatedPaciente,
      );
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });

  const removePacienteMutation = useMutation({
    mutationFn: (pacienteId: number) => remove(pacienteId),
    onSuccess: (_, pacienteId) => {
      queryClient.setQueryData(["pacientes"], (old: PacienteDto[] = []) =>
        old.filter((p) => p.Id !== pacienteId),
      );
      queryClient.invalidateQueries({ queryKey: ["pacienteById", pacienteId] });
    },
  });

  return {
    FilterPacienteById,
    pacientesData,
    isLoading,
    error: error as unknown,
    createPacienteMutation,
    updatePacienteMutation,
    removePacienteMutation,
  };
}
