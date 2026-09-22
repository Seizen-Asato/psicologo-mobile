import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import AgendaScreen from "../screen/AgendaScreen";
import Nav from "./Nav";

export default function home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Nav />
        <View style={{ flex: 1 }}>
          <AgendaScreen />
        </View>
      </View>
    </QueryClientProvider>
  );
}
