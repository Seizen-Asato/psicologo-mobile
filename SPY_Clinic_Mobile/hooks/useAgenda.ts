import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AgendaDto } from "../models/AgendaDto";
import {
  create,
  getAll,
  getByDate,
  getById,
  getByPatient,
  remove,
  update,
} from "../services/calendarService";

export function useAgenda() {
  const queryClient = useQueryClient();

  const {
    data: agenda = [],
    isLoading,
    error,
    refetch: reload,
  } = useQuery({
    queryKey: ["agenda"],
    queryFn: getAll,
  });

  const createAgenda = useMutation({
    mutationFn: (agenda: AgendaDto) => create(agenda),
    onSuccess: (newAgenda) => {
      queryClient.setQueryData(["agenda"], (old: AgendaDto[] = []) => [
        ...old,
        newAgenda,
      ]);
    },
  });

  const updateAgenda = useMutation({
    mutationFn: (agenda: AgendaDto) => update(agenda),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agenda"] });
    },
  });

  const removeAgenda = useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agenda"] });
    },
  });

  // 🔹 Filtrar por fecha
  const getAgendaByDate = async (date: string) => {
    const response = await getByDate(date);
    return Array.isArray(response) ? response : (response?.data ?? []);
  };

  const getAgendaByPatient = async (patientId: string) => {
    const response = await getByPatient(patientId);
    return Array.isArray(response) ? response : (response?.data ?? []);
  };

  const getAgendaById = async (id: number) => {
    return await getById(id);
  };

  return {
    agenda,
    isLoading,
    error,
    reload,
    createAgenda,
    updateAgenda,
    removeAgenda,
    getAgendaByDate,
    getAgendaByPatient,
    getAgendaById,
  };
}
