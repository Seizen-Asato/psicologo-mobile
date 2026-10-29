import { usePaciente } from "@/hooks/usePaciente";
import { StyleSheet, TextInput, View } from "react-native";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components/native";

type PacienteFilterProps = {
  filter: string;
  onFilterChange: (nombre: string) => void;
};

const PacienteFilter: React.FC<PacienteFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar paciente por nombre..."
        placeholderTextColor={theme.colors.textDisabled}
        value={filter}
        onChangeText={onFilterChange}
      />
    </View>
  );
};

const makeStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
      paddingHorizontal: 16,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      fontSize: 16,
      minHeight: 44,
      borderWidth: 1,
      borderColor: theme.colors.borderInput,
      color: theme.colors.textPrimary,
    },
  });

export default PacienteFilter;
