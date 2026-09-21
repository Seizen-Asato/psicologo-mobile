import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// podemos separa la logica en las carpetas de cada funcionameinto para que sea mas ordenado, pero lo que pongamos en el nav
// al usar expo router lo que hay que hacer es que crear un archivo tsx en la carpeta app por cada link que se ghaga e importar
// la funciuonaldiad de cada carpeta

function Nav() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={styles.sideNav}>
      <View style={styles.sideNavList}>
        <View style={styles.sideNavItem}>
          <Link href="/" asChild>
            <Pressable>
              <Text style={styles.sideNavLink}>Inicio</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sideNavItem}>
          <Link href="/paciente" asChild>
            <Pressable>
              <Text style={styles.sideNavLink}>Paciente</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sideNavItem}>
          <Link href="/turnos" asChild>
            <Pressable>
              <Text style={styles.sideNavLink}>Turnos</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sideNavItem}>
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.sideNavLink}>Login</Text>
            </Pressable>
          </Link>
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
