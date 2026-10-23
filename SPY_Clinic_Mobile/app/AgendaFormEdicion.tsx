import AgendaFormEdicion from "@/components/AgendaFormEdicion";
import { useLocalSearchParams, useRouter } from "expo-router"; // O usa @react-navigation/native si prefieres
import { ScrollView, StyleSheet, View } from "react-native";
import { useAgenda } from "../hooks/useAgenda"; // Ajusta la ruta según tu estructura

export default function AgendaEdicion() {
  const router = useRouter();

  // Si usas Expo Router, recuperamos la agenda pasada por parámetros:
  const params = useLocalSearchParams();
  const agendaData = params.agenda ? JSON.parse(params.agenda as string) : null;

  const { updateAgenda } = useAgenda();

  const handleSave = async (agendaActualizada: any) => {
    try {
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <AgendaFormEdicion
          agendaInicial={agendaData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
