import { usePaciente } from "@/hooks/usePaciente";
import { StyleSheet, TextInput, View } from "react-native";

type PacienteFilterProps = {
  filter: string;
  onFilterChange: (nombre: string) => void;
};

const PacienteFilter: React.FC<PacienteFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar paciente por nombre..."
        value={filter}
        onChangeText={onFilterChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default PacienteFilter;
