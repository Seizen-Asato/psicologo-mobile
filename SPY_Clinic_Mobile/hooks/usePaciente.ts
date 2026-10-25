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
    queryFn: async () => {
      const data = await getAll();

      return data.map(
        (p: any): PacienteDto => ({
          pacienteId: p.pacienteId ?? p.Id,
          nombre: p.nombre ?? p.Nombre ?? "",
          apellido: p.apellido ?? p.Apellido ?? "",
          dni: p.dni ?? p.Dni ?? null,
          telefono: p.telefono ?? p.Telefono ?? null,
          email: p.email ?? p.Mail ?? p.Email ?? null,
          fechaNacimiento: p.fechaNacimiento
            ? String(p.fechaNacimiento).slice(0, 10)
            : null,
          numeroPaciente: p.numeroPaciente ?? null,
          planTurnoId: p.planTurnoId ?? null,
        }),
      );
    },
  });

  const FilterPacienteById = (id: number) =>
    useQuery<PacienteDto, Error>({
      queryKey: ["pacienteById", id],
      queryFn: async () => {
        const p: any = await getById(id);

        return {
          pacienteId: p.pacienteId ?? p.Id,
          nombre: p.nombre ?? p.Nombre ?? "",
          apellido: p.apellido ?? p.Apellido ?? "",
          dni: p.dni ?? p.Dni ?? null,
          telefono: p.telefono ?? p.Telefono ?? null,
          email: p.email ?? p.Mail ?? p.Email ?? null,
          fechaNacimiento: p.fechaNacimiento
            ? String(p.fechaNacimiento).slice(0, 10)
            : null,
          numeroPaciente: p.numeroPaciente ?? null,
          planTurnoId: p.planTurnoId ?? null,
        };
      },
      enabled: !!id,
    });

  const createPacienteMutation = useMutation({
    mutationFn: (paciente: PacienteDto) => create(paciente),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });
    },
  });

  const updatePacienteMutation = useMutation({
    mutationFn: (paciente: PacienteDto) => {
      if (paciente.pacienteId == null) {
        throw new Error("No se puede actualizar un paciente sin pacienteId.");
      }

      return update(paciente, paciente.pacienteId);
    },
    onSuccess: (_updatedPaciente, paciente) => {
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });

      if (paciente.pacienteId != null) {
        queryClient.invalidateQueries({
          queryKey: ["pacienteById", paciente.pacienteId],
        });
      }
    },
  });

  const removePacienteMutation = useMutation({
    mutationFn: (pacienteId: number) => remove(pacienteId),
    onSuccess: (_result, pacienteId) => {
      queryClient.setQueryData<PacienteDto[]>(["pacientes"], (old = []) =>
        old.filter((p) => p.pacienteId !== pacienteId),
      );

      queryClient.invalidateQueries({
        queryKey: ["pacienteById", pacienteId],
      });
    },
  });

  return {
    FilterPacienteById,
    pacientesData,
    isLoading,
    error,
    createPacienteMutation,
    updatePacienteMutation,
    removePacienteMutation,
  };
}
