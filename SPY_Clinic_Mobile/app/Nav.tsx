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
          <Link href="/home" asChild>
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

// aunque vamos a usar styled.components esto es provisorio ya que hay unos problemas al usar styled. components pero
// por ahora nos enfocaremso en otras coas antes que el diseño

const styles = StyleSheet.create({
  sideNav: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    elevation: 4,
  },
  sideNavList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sideNavItem: {
    marginHorizontal: 5,
    flexShrink: 1,
  },
  sideNavLink: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Nav;
