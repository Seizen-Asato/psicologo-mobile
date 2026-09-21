import { View } from "react-native";
import LoginForm from "../components/LoginForm";
import Nav from "./Nav";

export default function Login() {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Nav />
      <View style={{ flex: 1 }}>
        <LoginForm />
      </View>
    </View>
  );
}
