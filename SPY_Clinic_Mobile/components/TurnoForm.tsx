import { TurnoDto } from "@/models/TurnoDto";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

interface TurnoFormProps {
  onSave: (turno: any) => void;
  onRemove?: (id: string) => void;
  onReset?: () => void;
  selectedTurno?: any;
}

const TurnoForm: React.FC<TurnoFormProps> = ({
  onSave,
  onRemove,
  onReset,
  selectedTurno,
}) => {
  const [fecha, setFecha] = useState(selectedTurno?.fecha ?? "");
  const [hora, setHora] = useState(selectedTurno?.hora ?? "");
  const [estado, setEstado] = useState<TurnoDto["estado"]>("pendiente");
  const [asistencia, setAsistencia] = useState(
    selectedTurno?.asistencia ?? false,
  );
  const [minutos, setMinutos] = useState(selectedTurno?.minutos ?? 60);
  const [modalidadVirtual, setModalidadVirtual] = useState(
    selectedTurno?.modalidadVirtual ?? false,
  );
  const [url, setUrl] = useState(selectedTurno?.url ?? "");
  const [cantidadTurnos, setCantidadTurnos] = useState(
    selectedTurno?.cantidadTurnos ?? 1,
  );
  const [psicologoID, setPsicologoID] = useState(
    selectedTurno?.psicologoID ?? "",
  );
  const [pacienteID, setPacienteID] = useState(selectedTurno?.pacienteID ?? "");
  const [planTurnoID, setPlanTurnoID] = useState(
    selectedTurno?.planTurnoID ?? "",
  );
  const [descripcion, setDescripcion] = useState(
    selectedTurno?.descripcion ?? "",
  );

  const handleSubmit = () => {
    const turno = {
      fecha,
      hora,
      estado,
      asistencia,
      minutos,
      modalidadVirtual,
      url: modalidadVirtual ? url : null,
      cantidadTurnos,
      psicologoID,
      pacienteID,
      planTurnoID,
      descripcion,
    };
    onSave(turno);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {selectedTurno ? "Editar turno" : "Nuevo turno"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (HH:mm)"
        value={hora}
        onChangeText={setHora}
      />

      <Text style={styles.label}>Estado</Text>
      <Picker
        selectedValue={estado}
        onValueChange={(itemValue: TurnoDto["estado"]) => setEstado(itemValue)}
      >
        <Picker.Item label="Pendiente" value="pendiente" />
        <Picker.Item label="Confirmado" value="confirmado" />
        <Picker.Item label="Cancelado" value="cancelado" />
      </Picker>

      <View style={styles.switchRow}>
        <Text>Asistencia</Text>
        <Switch value={asistencia} onValueChange={setAsistencia} />
      </View>

      <View style={styles.switchRow}>
        <Text>Duración (en minutos)</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        keyboardType="numeric"
        value={String(minutos)}
        onChangeText={(val) => setMinutos(Number(val))}
      />
      <View style={styles.switchRow}>
        <Text>Modalidad virtual</Text>
        <Switch value={modalidadVirtual} onValueChange={setModalidadVirtual} />
      </View>

      {modalidadVirtual ? (
        <TextInput
          style={styles.input}
          placeholder="URL de sesión"
          value={url}
          onChangeText={setUrl}
        />
      ) : (
        <Text style={styles.label}>Modalidad presencial</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Cantidad de turnos"
        keyboardType="numeric"
        value={String(cantidadTurnos)}
        onChangeText={(val) => setCantidadTurnos(Number(val))}
      />

      <TextInput
        style={styles.input}
        placeholder="Psicólogo ID"
        value={psicologoID}
        onChangeText={setPsicologoID}
      />

      <TextInput
        style={styles.input}
        placeholder="Paciente ID"
        value={pacienteID}
        onChangeText={setPacienteID}
      />

      <TextInput
        style={styles.input}
        placeholder="Plan Turno ID"
        value={planTurnoID}
        onChangeText={setPlanTurnoID}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <View style={styles.actions}>
        <Button
          title={selectedTurno ? "Guardar cambios" : "Crear turno"}
          onPress={handleSubmit}
        />
        {selectedTurno && onRemove && (
          <Button
            title="Eliminar"
            color="red"
            onPress={() => onRemove(selectedTurno.turnoID)}
          />
        )}
        {selectedTurno && onReset && (
          <Button title="Nuevo" color="gray" onPress={onReset} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 10, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  actions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TurnoForm;
