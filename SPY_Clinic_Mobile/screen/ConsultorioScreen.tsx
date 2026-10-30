import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

import ConsultorioForm from "../components/ConsultorioForm";

export default function ConsultorioScreen() {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gestión de Consultorios</Text>
      <ConsultorioForm />
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.textPrimary,
    },
  });
