import { usePaciente } from "@/hooks/usePaciente";
import { PacienteProps } from "@/models/PacienteProps";
import { PacienteDto } from "@/models/PacienteDto";
import { calulateAge } from "@/utils/PacienteUtils";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

type PacienteFormProps = {
  create: (paciente: PacienteDto) => void;
  selected: PacienteDto;
};

const PacienteForm: React.FC<PacienteFormProps> = ({ create, selected }) => {
  const [nombre, setNombre] = useState(selected.Nombre ?? "");
  const [apellido, setApellido] = useState(selected.Apellido ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    selected.fechaNacimiento ?? Date,
  );
  const [Mail, setMail] = useState(selected.Mail ?? "");
  const [Dni, setDni] = useState(selected.Dni ?? "");
  const [telefono, setTelefono] = useState(selected.Telefono ?? "");

  const handleSubmite = () => {};
};

export default PacienteForm;
