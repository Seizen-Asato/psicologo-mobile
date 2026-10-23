// app/AgendaDetalle.tsx
import AgendaDetalleComponent from "@/components/AgendaDetalle";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useAgenda } from "../hooks/useAgenda";

export default function AgendaDetalleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { removeAgenda } = useAgenda();

  const agenda = params.agenda ? JSON.parse(params.agenda as string) : null;

  if (!agenda)
    return (
      <View>
        <Text>No se encontró la agenda</Text>
      </View>
    );

  return (
    <AgendaDetalleComponent
      agenda={agenda}
      onEdit={() =>
        router.push({
          pathname: "/AgendaFormEdicion",
          params: { agendaId: agenda.agendaId },
        })
      }
      onDelete={async () => {
        await removeAgenda.mutateAsync(agenda.agendaId);
        router.back();
      }}
    />
  );
}
