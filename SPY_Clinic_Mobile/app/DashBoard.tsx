import DashboardScreen from "@/screen/DashBoardScreen";
import { ScrollView, View } from "react-native";

export default function DashBoard() {
  return (
    <ScrollView>
      <View>
        <DashboardScreen />
      </View>
    </ScrollView>
  );
}
