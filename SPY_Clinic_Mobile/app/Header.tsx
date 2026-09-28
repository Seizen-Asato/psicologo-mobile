import { StyleSheet, Text, View } from "react-native";
import LogoutButton from "../components/Logout";
import { useAuthStore } from "../context/Auth";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Psicólogos UI</Text>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{user?.name ?? "Invitado"}</Text>
          <Text style={styles.role}>{user ? "Psicólogo" : "Sin rol"}</Text>
        </View>
        {user && <LogoutButton />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profile: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: { color: "#fff", fontWeight: "bold" },
  info: { marginRight: 12 },
  name: { color: "#fff", fontSize: 14 },
  role: { color: "#ccc", fontSize: 12 },
  logout: { color: "red", fontWeight: "bold" },
});
