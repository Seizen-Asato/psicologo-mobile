import { ScrollView, View } from "react-native";
import AgendaScreen from "../screen/AgendaScreen";
import Nav from "./Nav";

export default function Home() {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Nav />
        <View style={{ flex: 1, width: "100%" }}>
          <AgendaScreen />
        </View>
      </View>
    </ScrollView>
  );
}
