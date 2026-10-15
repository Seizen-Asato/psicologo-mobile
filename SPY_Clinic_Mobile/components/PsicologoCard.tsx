import { PsicologoDto } from "@/models/PsicolgoDto";
import { StyleSheet, Text, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

interface PsicologoCardProps {
  psicologo: PsicologoDto;
}

export default function PsicologoCard({ psicologo }: PsicologoCardProps) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {psicologo.nombre} {psicologo.apellido}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.bold}>Email:</Text> {psicologo.email}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.bold}>Teléfono:</Text> {psicologo.telefono}
      </Text>
    </View>
  );
}

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    card: {
      padding: 12,
      marginVertical: 8,
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 6,
      color: theme.colors.textPrimary,
    },
    line: { color: theme.colors.textPrimary },
    bold: { fontWeight: "600" },
  });
