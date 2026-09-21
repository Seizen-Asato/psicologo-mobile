import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AgendaForm from "../components/AgendaForm";
import CalenderView from "../components/CalenderView";
import { AgendaDto } from "../models/AgendaDto";
import { create, getAll } from "../services/calendarService";

const AgendaScreen = () => {
  const [agenda, setAgenda] = useState<AgendaDto[]>([]);
  const [events, setEvents] = useState<
    { id: number; title: string; start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAll();
        if (!data || !Array.isArray(data)) return;

        setAgenda(data);
        const formattedEvents = data.map((a) => ({
          id: a.agendaId,
          title: `${a.psicologoNombre} ${a.psicologoApellido}`,
          start: new Date(`${a.fecha}T${a.horaInicio}`),
          end: new Date(`${a.fecha}T${a.horaFin}`),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error al cargar agendas:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleCreateAgenda = async (agenda: AgendaDto) => {
    const newAgenda = await create(agenda);
    setAgenda((prev) => [...prev, newAgenda]);
    setEvents((prev) => [
      ...prev,
      {
        id: newAgenda.agendaId,
        title: `${newAgenda.psicologoNombre} ${newAgenda.psicologoApellido}`,
        start: new Date(`${newAgenda.fecha}T${newAgenda.horaInicio}`),
        end: new Date(`${newAgenda.fecha}T${newAgenda.horaFin}`),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <AgendaForm onCreate={handleCreateAgenda} />
      {/*se apsan los meotods como props*/}
      <CalenderView events={events} />
      {/*se apsan los meotods como props*/}
    </View>
  );
};

export default AgendaScreen;
