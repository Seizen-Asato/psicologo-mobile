import { View } from "react-native";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <LoginForm />
      </View>
    </View>
  );
}
