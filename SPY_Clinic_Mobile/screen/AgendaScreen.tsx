import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Text, View } from "react-native";
import AgendaForm from "../components/AgendaForm";
import CalenderView from "../components/CalenderView";
import { AgendaDto } from "../models/AgendaDto";
import {
  create,
  getAll,
  getByDate,
  getByPatient,
} from "../services/calendarService";

const AgendaScreen = () => {
  const queryClient = useQueryClient();

  const {
    data: agenda = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agenda"],
    queryFn: getAll,
  });

  const createAgendaMutation = useMutation({
    mutationFn: (agenda: AgendaDto) => create(agenda),
    onSuccess: (newAgenda) => {
      //aca se  actualiza cache de agendas
      queryClient.setQueryData(["agenda"], (old: AgendaDto[] = []) => [
        ...old,
        newAgenda,
      ]);
    },
  });

  const handleCreateAgenda = async (agenda: AgendaDto) => {
    await createAgendaMutation.mutateAsync(agenda);
  };

  const mapAgendaToEvents = (items: AgendaDto[]) =>
    items.map((a) => ({
      id: a.agendaId,
      title: `${a.psicologoNombre} ${a.psicologoApellido}`,
      start: new Date(`${a.fecha}T${a.horaInicio}`),
      end: new Date(`${a.fecha}T${a.horaFin}`),
      descripcion: a.descripcion,
    }));

  const events = mapAgendaToEvents(agenda);

  const handleGetByDate = async (date: string) =>
    mapAgendaToEvents(await getByDate(date));

  const handleGetByPatient = async (patientId: string) =>
    mapAgendaToEvents(await getByPatient(patientId));

  if (isLoading)
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>Error al cargar agendas</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <AgendaForm onCreate={handleCreateAgenda} />
      {/*se apsan los meotods como props*/}
      <CalenderView
        events={events}
        getByDate={handleGetByDate}
        getByPatient={handleGetByPatient}
        reload={() => {
          void queryClient.invalidateQueries({ queryKey: ["agenda"] });
        }}
      />
      {/*se apsan los meotods como props*/}
    </View>
  );
};

export default AgendaScreen;
