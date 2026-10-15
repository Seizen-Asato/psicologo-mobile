import { useTurno } from "@/hooks/useTurno";
import { TurnoDto } from "@/models/TurnoDto";
import * as pacientesService from "@/services/PacienteService";
import * as planesService from "@/services/PlanTurnoService";
import * as psicologosService from "@/services/PsicologoService";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

interface TurnoFormProps {
  selectedTurno?: TurnoDto | null;
  onReset?: () => void;
  onSave: (turno: TurnoDto) => void;
}

export default function TurnoForm({
  selectedTurno,
  onReset,
  onSave,
}: TurnoFormProps) {
  const { saveTurno } = useTurno();

  const [psicologos, setPsicologos] = useState<any[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [planes, setPlanes] = useState<any[]>([]);

  const [turno, setTurno] = useState<TurnoDto>({
    fecha: "",
    hora: "",
    estado: "pendiente",
    asistencia: false,
    minutos: 30,
    modalidadVirtual: false,
    cantidadTurnos: 1,
    psicologoId: "",
    pacienteId: "",
    planTurnoId: "",
    descripcion: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPsicologos(await psicologosService.getAll());
      setPacientes(await pacientesService.getAll());
      setPlanes(await planesService.getAll());
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload: TurnoDto = {
        ...turno,
        psicologoId: turno.psicologoId,
        pacienteId: turno.pacienteId,
        planTurnoId: turno.planTurnoId,
      };
      await saveTurno(payload);
      onSave(payload);
      onReset?.();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {selectedTurno ? "Editar turno" : "Nuevo turno"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={turno.fecha}
        onChangeText={(text) => setTurno({ ...turno, fecha: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:mm)"
        value={turno.hora}
        onChangeText={(text) => setTurno({ ...turno, hora: text })}
      />

      <Text style={styles.label}>Estado</Text>
      <Picker
        selectedValue={turno.estado}
        onValueChange={(val: TurnoDto["estado"]) =>
          setTurno({ ...turno, estado: val })
        }
      >
        <Picker.Item label="Pendiente" value="pendiente" />
        <Picker.Item label="Confirmado" value="confirmado" />
        <Picker.Item label="Cancelado" value="cancelado" />
      </Picker>

      <View style={styles.switchRow}>
        <Text>Asistencia</Text>
        <Switch
          value={turno.asistencia}
          onValueChange={(val) => setTurno({ ...turno, asistencia: val })}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        keyboardType="numeric"
        value={String(turno.minutos)}
        onChangeText={(val) =>
          setTurno({ ...turno, minutos: Number(val) || 0 })
        }
      />

      <View style={styles.switchRow}>
        <Text>Modalidad virtual</Text>
        <Switch
          value={turno.modalidadVirtual}
          onValueChange={(val) => setTurno({ ...turno, modalidadVirtual: val })}
        />
      </View>

      {turno.modalidadVirtual ? (
        <TextInput
          style={styles.input}
          placeholder="URL de sesión"
          value={turno.url ?? ""}
          onChangeText={(text) => setTurno({ ...turno, url: text })}
        />
      ) : (
        <Text style={styles.label}>Modalidad presencial</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Cantidad de turnos"
        keyboardType="numeric"
        value={String(turno.cantidadTurnos)}
        onChangeText={(val) =>
          setTurno({ ...turno, cantidadTurnos: Number(val) || 1 })
        }
      />

      <Text style={styles.label}>Psicólogo</Text>
      <Picker
        selectedValue={turno.psicologoId}
        onValueChange={(value) =>
          setTurno({ ...turno, psicologoId: String(value) })
        }
      >
        <Picker.Item label="Seleccione..." value="" />
        {psicologos.map((p) => (
          <Picker.Item
            key={p.psicologoId}
            label={`${p.nombre} ${p.apellido}`}
            value={p.psicologoId}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Paciente</Text>
      <Picker
        selectedValue={turno.pacienteId}
        onValueChange={(value) =>
          setTurno({ ...turno, pacienteId: String(value) })
        }
      >
        <Picker.Item label="Seleccione..." value="" />
        {pacientes.map((p) => (
          <Picker.Item
            key={p.pacienteId}
            label={`${p.nombre} ${p.apellido}`}
            value={p.pacienteId}
          />
        ))}
      </Picker>

      {/* 🔹 Picker de planes */}
      <Text style={styles.label}>Plan de Turno</Text>
      <Picker
        selectedValue={turno.planTurnoId}
        onValueChange={(value) =>
          setTurno({ ...turno, planTurnoId: String(value) })
        }
      >
        <Picker.Item label="Seleccione..." value="" />
        {planes.map((pl) => (
          <Picker.Item
            key={pl.planTurnoId}
            label={pl.planTurnoNombre}
            value={pl.planTurnoId}
          />
        ))}
      </Picker>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        multiline
        value={turno.descripcion}
        onChangeText={(text) => setTurno({ ...turno, descripcion: text })}
      />

      <View style={styles.actions}>
        <Button
          title={selectedTurno ? "Guardar cambios" : "Crear turno"}
          onPress={handleSubmit}
        />
        {selectedTurno && onReset && (
          <Button title="Nuevo" color="gray" onPress={onReset} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});
