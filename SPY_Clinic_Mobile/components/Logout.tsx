import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { useAuthStore } from "../context/Auth";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // por ahora redirige al login pero se hara un screen especial como "despedida de la app"
    router.replace("/login");
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text style={{ color: "red", fontWeight: "bold" }}>Cerrar sesión</Text>
    </Pressable>
  );
}
