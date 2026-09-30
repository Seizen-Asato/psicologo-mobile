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
  onSave: (turno: TurnoDto) => void;
  onRemove?: (id: string) => void;
  onReset?: () => void;
  selectedTurno?: TurnoDto;
}

const TurnoForm: React.FC<TurnoFormProps> = ({
  onSave,
  onRemove,
  onReset,
  selectedTurno,
}) => {
  const [fecha, setFecha] = useState(selectedTurno?.fecha ?? "");
  const [hora, setHora] = useState(selectedTurno?.hora ?? "");
  const [estado, setEstado] = useState<TurnoDto["estado"]>(
    selectedTurno?.estado ?? "pendiente",
  );
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
  const [psicologoId, setPsicologoId] = useState(
    selectedTurno?.psicologoId ?? "",
  );
  const [pacienteId, setPacienteId] = useState(selectedTurno?.pacienteId ?? "");
  const [planTurnoId, setPlanTurnoId] = useState(
    selectedTurno?.planTurnoId ?? "",
  );
  const [descripcion, setDescripcion] = useState(
    selectedTurno?.descripcion ?? "",
  );

  const handleSubmit = () => {
    const turno: TurnoDto = {
      turnoId: selectedTurno?.turnoId,
      fecha,
      hora,
      estado,
      asistencia,
      minutos,
      modalidadVirtual,
      url: modalidadVirtual ? url : null,
      cantidadTurnos,
      psicologoId,
      pacienteId,
      planTurnoId,
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
        onValueChange={(val: TurnoDto["estado"]) => setEstado(val)}
      >
        <Picker.Item label="Pendiente" value="pendiente" />
        <Picker.Item label="Confirmado" value="confirmado" />
        <Picker.Item label="Cancelado" value="cancelado" />
      </Picker>

      <View style={styles.switchRow}>
        <Text>Asistencia</Text>
        <Switch value={asistencia} onValueChange={setAsistencia} />
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
        value={psicologoId}
        onChangeText={setPsicologoId}
      />
      <TextInput
        style={styles.input}
        placeholder="Paciente ID"
        value={pacienteId}
        onChangeText={setPacienteId}
      />
      <TextInput
        style={styles.input}
        placeholder="Plan Turno ID"
        value={planTurnoId}
        onChangeText={setPlanTurnoId}
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
            onPress={() => onRemove(selectedTurno.turnoId!)}
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
