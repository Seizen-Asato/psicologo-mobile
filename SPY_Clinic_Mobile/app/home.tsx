import { ScrollView, View } from "react-native";
import AgendaScreen from "../screen/AgendaScreen";

export default function Home() {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, width: "100%" }}>
          <AgendaScreen />
        </View>
      </View>
    </ScrollView>
  );
}
