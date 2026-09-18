import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
//import LogoutForm from "./LogoutCard";//

function Nav({ navigation }: { navigation?: any }) {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={styles.sideNav}>
      <View style={styles.sideNavList}>
        <View style={styles.sideNavItem}>
          <Pressable onPress={() => navigation.navigate("Inicio")}>
            <Text style={styles.sideNavLink}>Inicio</Text>
          </Pressable>
        </View>

        <View style={styles.sideNavItem}>
          <Pressable onPress={() => navigation.navigate("Paciente")}>
            <Text style={styles.sideNavLink}>Paciente</Text>
          </Pressable>
        </View>

        <View style={styles.sideNavItem}>
          <Pressable onPress={() => navigation.navigate("Turnos")}>
            <Text style={styles.sideNavLink}>Turnos</Text>
          </Pressable>
        </View>

        <View style={styles.sideNavItem}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.sideNavLink}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.sideNavItem}>
          <Pressable onPress={() => setShowLogout(true)}>
            <Text style={styles.sideNavLink}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideNav: {
    // Reemplaza aquí los estilos de tu .side-nav original
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  sideNavList: {
    flexDirection: "column",
  },
  sideNavItem: {
    marginVertical: 10,
  },
  sideNavLink: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default Nav;
