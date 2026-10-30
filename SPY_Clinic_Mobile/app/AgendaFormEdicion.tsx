import AgendaFormEdicion from "@/components/AgendaFormEdicion";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAgenda } from "../hooks/useAgenda";

export default function AgendaEdicion() {
  const router = useRouter();

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
