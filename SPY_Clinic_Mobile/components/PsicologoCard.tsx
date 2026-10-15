import { PsicologoDto } from "@/models/PsicolgoDto";
import { StyleSheet, Text, View } from "react-native";

interface PsicologoCardProps {
  psicologo: PsicologoDto;
}

export default function PsicologoCard({ psicologo }: PsicologoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {psicologo.nombre} {psicologo.apellido}
      </Text>
      <Text>
        <Text style={styles.bold}>Email:</Text> {psicologo.email}
      </Text>
      <Text>
        <Text style={styles.bold}>Teléfono:</Text> {psicologo.telefono}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  bold: { fontWeight: "600" },
});
